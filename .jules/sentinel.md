## 2026-11-05 - [Insecure Error Logging]
**Vulnerability:** The API response interceptor in src/services/api.ts was directly logging full backend error responses (including potential stack traces) to the console.
**Learning:** This repo lacked safe, generic error messaging, risking data leakage to the client console on 4xx/5xx errors.
**Prevention:** Replaced the detailed error log with a generic 'An error occurred during the API request' message.

## 2024-11-07 - Inconsistent Password Strength Validation
**Vulnerability:** Weak passwords could be submitted on registration flows because strength validation only existed on the `ResetPassword` form, omitting `Signup` and `CatererSignup`. Furthermore, the strength logic was mismatched with its UI prompting.
**Learning:** Security validations (like password complexity) implemented purely on the client-side must be centralized and applied symmetrically across all relevant entry points (all auth forms).
**Prevention:** Always extract validation logic to shared utility functions (`src/utils/security.ts`) rather than implementing inline within single components.
