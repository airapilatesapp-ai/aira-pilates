# Aira Pilates

Site de vendas, app (PWA) e ligação com Stripe e Supabase. Sem pacotes externos: tudo roda com Node 20+.

## O que tem em cada pasta

| Pasta / arquivo | O que é |
| --- | --- |
| `public/index.html` | Página de vendas (inglês, com botão para português), quiz e planos |
| `public/welcome.html` | Página que a cliente vê logo depois de pagar |
| `public/login.html` | Entrar com o e-mail (recebe um link, sem senha) |
| `public/app/` | O app em si. `index.html` é gerado pelo `scripts/build.mjs` |
| `public/terms.html`, `public/privacy.html` | Termos de uso e política de privacidade |
| `api/stripe-webhook.js` | Recebe os avisos da Stripe e libera ou bloqueia o acesso |
| `api/config.js` | Entrega às páginas só as configurações públicas |
| `api/portal-session.js` | Abre o portal da Stripe já logado quando a cliente toca em "Gerenciar assinatura" |
| `api/checkout-session.js` | Mostra na página de boas-vindas para qual e-mail o link foi |
| `src/` | Código-fonte do app (o mesmo do protótipo + `prod.js` com login e assinatura) |
| `supabase/setup.sql` | Cria as tabelas no Supabase (cole no SQL Editor) |
| `supabase/email-magic-link.html` | Texto do e-mail de acesso (cole em Authentication → Emails → Templates) |

## Variáveis de ambiente (Vercel → Settings → Environment Variables)

| Nome | Valor |
| --- | --- |
| `STRIPE_SECRET_KEY` | `sk_test_…` (depois `sk_live_…`) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` do webhook |
| `STRIPE_LINK_MONTHLY` | Link de pagamento do plano mensal |
| `STRIPE_LINK_YEARLY` | Link de pagamento do plano anual |
| `STRIPE_PORTAL_LINK` | Link de login do portal (só usado se o acesso direto falhar) |
| `SUPABASE_URL` | `https://xxxx.supabase.co` |
| `SUPABASE_PUBLIC_KEY` | Chave pública (publishable ou anon) |
| `SUPABASE_SECRET_KEY` | Chave secreta (secret ou service_role) |
| `APP_URL` | Endereço do site, ex.: `https://airapilates.app` |
| `SUPPORT_EMAIL` | (opcional) e-mail de atendimento mostrado no rodapé |

## Comandos

- `node scripts/build.mjs`: gera o app a partir de `src/` (a Vercel roda sozinha a cada publicação).
- `node scripts/test-webhook.mjs`: testa o webhook com uma Stripe e um Supabase de mentira.

## Eventos que o webhook precisa receber

`checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`,
`customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`.
