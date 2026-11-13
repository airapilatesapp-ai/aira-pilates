// Runs every hour (see "crons" in vercel.json). Sends the follow-up e-mails that are due
// and stops for anyone who already started her trial.
import { dueLeads, updateLead, isMember } from '../lib/supabase.js';
import { sendMail } from '../lib/mail.js';
import { leadEmail, FOLLOW_UP_HOURS } from '../lib/lead-emails.js';

const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const hoursFromNow = (h) => new Date(Date.now() + h * 3600e3).toISOString();

export async function GET(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) return json(401, { error: 'unauthorized' });
  const appUrl = (process.env.APP_URL || new URL(request.url).origin).replace(/\/+$/, '');
  const report = { sent: 0, converted: 0, failed: 0 };
  let leads;
  try { leads = await dueLeads(40); } catch (err) { console.error('cron-leads', err); return json(500, { error: 'query_failed' }); }
  for (const lead of leads) {
    try {
      if (await isMember(lead.email)) {
        await updateLead(lead.email, { converted_at: new Date().toISOString(), next_email_at: null });
        report.converted++;
        continue;
      }
      // E-mail 0 that failed earlier is only worth sending within a day; otherwise go to the next one.
      let n = lead.emails_sent || 0;
      if (n === 0 && Date.now() - new Date(lead.created_at).getTime() > 20 * 3600e3) n = 1;
      const m = leadEmail(n, lead, appUrl);
      await sendMail({ to: lead.email, ...m });
      const sent = n + 1;
      await updateLead(lead.email, { emails_sent: sent, next_email_at: sent < 3 ? hoursFromNow(FOLLOW_UP_HOURS[sent - 1]) : null });
      report.sent++;
    } catch (err) {
      console.error('cron-leads lead', lead.email, err);
      report.failed++;
    }
  }
  return json(200, report);
}
