## 2026-11-05 - [Insecure Error Logging]
**Vulnerability:** The API response interceptor in src/services/api.ts was directly logging full backend error responses (including potential stack traces) to the console.
**Learning:** This repo lacked safe, generic error messaging, risking data leakage to the client console on 4xx/5xx errors.
**Prevention:** Replaced the detailed error log with a generic 'An error occurred during the API request' message.

## 2026-11-08 - [Missing Security Headers in Production]
**Vulnerability:** The Vercel frontend deployment lacked `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, and `Referrer-Policy` headers, making the site vulnerable to clickjacking and MIME-sniffing.
**Learning:** Production deployments require explicit configuration for security headers in `vercel.json` since they aren't provided by default.
**Prevention:** Configured `vercel.json` with a robust `headers` block to add these universally across all routes, alongside existing `rewrites`.
