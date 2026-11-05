## 2026-11-05 - [Insecure Error Logging]
**Vulnerability:** The API response interceptor in src/services/api.ts was directly logging full backend error responses (including potential stack traces) to the console.
**Learning:** This repo lacked safe, generic error messaging, risking data leakage to the client console on 4xx/5xx errors.
**Prevention:** Replaced the detailed error log with a generic 'An error occurred during the API request' message.
