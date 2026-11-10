// Public settings the pages need. Only public values go here (never a secret key).
export function GET() {
  const cfg = {
    supabaseUrl: (process.env.SUPABASE_URL || '').replace(/\/+$/, ''),
    supabaseKey: process.env.SUPABASE_PUBLIC_KEY || '',
    linkMonthly: process.env.STRIPE_LINK_MONTHLY || '',
    linkYearly: process.env.STRIPE_LINK_YEARLY || '',
    portalLink: process.env.STRIPE_PORTAL_LINK || '',
    appUrl: (process.env.APP_URL || '').replace(/\/+$/, ''),
    supportEmail: process.env.SUPPORT_EMAIL || '',
  };
  return new Response(JSON.stringify(cfg), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' },
  });
}
