You are a senior TypeScript engineer working on @vivekcsein's Next.js project.

BEFORE WRITING ANY CODE, internalize these absolute rules from the project SKILL.md:
Skills:
1. Frontend Personal Skill

═══════════════════════════════════════════════════════
HARD RULES (violations break the build or ESLint):

- No `any`. Use `unknown` + narrowing. ESLint rule: error.
- No `function` keyword for components. Arrow functions only.
- No `../../` relative imports across feature boundaries. Path aliases only.
- No `process.env.X` outside `src/packages/env/app.env.ts`.
- No raw API data without Zod `.parse()` first.
- All types in `src/types/*.d.ts` — never scattered in component files.
- Prefer `type` over `interface` unless declaration merging is needed.
  ═══════════════════════════════════════════════════════

---

## BACKEND CONTRACT (already built — do not modify)

### POST /api/auth/signin

Request: `{ email: string, password: string }`
Response (200):
{
"success": true,
"message": "Login successful",
"user": {
"id": "3f46f51a-81cf-4023-b5c8-7b12411fcb33",
"email": "johndoe@gmail.com",
"fullname": "john doe",
"role": "USER",
"is_verified": false,
"created_at": "2026-06-26T07:54:13.799Z",
"updated_at": "2026-06-26T07:54:13.799Z"
},
"session": {
"expires_at": 1782460460000,
"expires_in": 365
}
}

### POST /api/auth/signup

Request: `{ email: string, password: string, fullname: string, agreeToTerms: boolean }`
Response: same shape as signin

### POST /api/auth/signout

Clears session server-side. No body needed. Cookies auto-sent.

### POST /api/auth/refresh

Rotates access_token using refresh_token from httpOnly cookie.
Returns new session. Used silently — user never sees this.

### GET /api/auth/me

Returns the authenticated user object.
Requires valid access_token cookie.

AUTH STRATEGY:

- Backend sets `access_token` (15 min) and `refresh_token` (365 days) as httpOnly cookies.
- Frontend never reads/writes tokens. All requests use `withCredentials: true`.
- On 401: silently call /refresh once, retry original request.
- On refresh failure: clear auth state → redirect to /login.
- Use `isRefreshing` flag + promise queue to prevent race condition
  when multiple requests fail simultaneously during token refresh.

---

## YOUR FILE STRUCTURE MAP

Place every file exactly here — no deviations:

src/
├── types/
│ └── auth.d.ts ← all auth types
│
├── packages/
│ ├── env/
│ │ └── app.env.ts ← Zod env (already exists, extend it)
│ ├── schemas/
│ │ └── auth.schema.ts ← Zod schemas for API responses + forms
│ ├── forms/
│ │ ├── SigninForm.form.ts ← useSignInForm hook
│ │ └── SignupForm.form.ts ← useSignUpForm hook
│ ├── api/
│ │ └── axios.api.ts ← singleton apiClient (already exists, extend it)
│ └── hooks/
│ └── useAuthActions.ts ← useSignIn, useSignOut action hooks
│
├── app/
│ ├── api/
│ │ └── auth/
│ │ ├── route.ts ← Next.js proxy route handlers if needed
│ │ └── auth.service.ts ← pure async functions wrapping apiClient
│ ├── (auth)/
│ │ ├── signin/
│ │ │ └── page.tsx
│ │ └── signup/
│ │ └── page.tsx
│ ├── (protected)/
│ │ └── dashboard/
│ │ └── page.tsx
│ └── layout.tsx ← wraps with AuthProvider
│
├── components/
│ ├── providers/
│ │ └── AuthProvider.tsx ← Context + useReducer, exports useAuth()
│ └── features/
│ │ └── auth/
│ │ │  ├── index.ts ← barrel export
│ │ │  ├── SignInForm.tsx
│ │ │  ├── SignUpForm.tsx
│ │ │  └── AuthGuard.tsx
└── middleware.ts ← route protection

---

## DELIVERABLES — build in this exact order:

### 1. `src/types/auth.d.ts`

Define (all using `type`, not `interface`):

- `UserRole = 'USER' | 'ADMIN'` (literal union)
- `User` — exact backend shape: id, email, fullname, role: UserRole,
  is_verified, created_at, updated_at (ISO strings)
- `Session` — expires_at: number, expires_in: number
- `AuthApiResponse<T>` — generic: { success: boolean; message: string; } & T
- `SignInResponse` = AuthApiResponse<{ user: User; session: Session }>
- `SignUpResponse` = AuthApiResponse<{ user: User; session: Session }>
- `ApiError` — { success: false; message: string; statusCode?: number }
- `AuthState` — { user: User | null; isLoading: boolean; isAuthenticated: boolean }
- `AuthAction` — discriminated union:
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }

### 2. `src/packages/env/app.env.ts`

Extend existing Zod schema to include:

- `NEXT_PUBLIC_API_URL: z.string().url()`
  Keep all existing vars. Export `env` as validated singleton.

### 3. `src/packages/schemas/auth.schema.ts`

Zod schemas for:

- `userSchema` — mirrors User type exactly, with z.coerce.date() for date fields
- `sessionSchema`
- `signInResponseSchema` — parses full backend signin/signup response
- `signUpResponseSchema`
- `apiErrorSchema`
- Form-level schemas:
  - `signInFormSchema` — email() + password min(8)
  - `signUpFormSchema` — email() + fullname min(2) + password min(8)
    - confirmPassword with .refine() check
- Exported inferred types: `SignInFormValues`, `SignUpFormValues`

### 4. `src/packages/forms/SigninForm.form.ts`

Export `useSignInForm` — useForm<SignInFormValues> with zodResolver.
File is .ts only — no JSX.

### 5. `src/packages/forms/SignupForm.form.ts`

Export `useSignUpForm` — useForm<SignUpFormValues> with zodResolver.
File is .ts only — no JSX.

### 6. `src/packages/api/axios.api.ts`

Extend the existing singleton:

- baseURL: env.NEXT_PUBLIC_API_URL
- withCredentials: true (required for httpOnly cookie transport)
- timeout: 10_000
- Response interceptor with silent token refresh:
  - On 401 response:
    - If `isRefreshing` is false: call /api/auth/refresh, set flag
    - Queue all concurrent 401s with a promise resolver list
    - On refresh success: resolve all queued requests, retry original
    - On refresh failure: reject all queued, clear auth state, redirect to /login
  - Use `axios.isAxiosError(error)` type guard — never `any` in catch
  - Type the config override: extend `InternalAxiosRequestConfig` with
    `_retry?: boolean` to prevent infinite retry loops

### 7. `@packages/services/auth.service.ts`

Pure async functions (no React, no hooks — .ts only):

- `signIn(data: SignInFormValues): Promise<SignInResponse>`
- `signUp(data: SignUpFormValues): Promise<SignUpResponse>`
- `signOut(): Promise<void>`
- `refreshToken(): Promise<void>`
- `getMe(): Promise<User>`

Every function:

- Calls `apiClient` from `@packages/api/axios.api`
- Parses response with the matching Zod schema
- Uses `axios.isAxiosError(error)` in catch blocks — types error as `unknown`
- Throws a typed `ApiError` on failure — never throws raw axios errors to callers

### 8. `src/components/providers/AuthProvider.tsx`

'use client' — React Context + useReducer:

- Reducer handles SET_USER, LOGOUT, SET_LOADING
- On mount: call `getMe()` to hydrate from cookie session
  - On success: dispatch SET_USER
  - On failure (401 or network): dispatch LOGOUT (user not logged in — not an error)
- Export `useAuth(): AuthState` hook — throws descriptive error if used outside provider
- Export `useAuthDispatch()` separately for action-only consumers
- Wrap children in <AuthContext.Provider> and <AuthDispatchContext.Provider>

### 9. `src/packages/hooks/useAuthActions.ts`

'use client' — action hooks:

- `useSignIn()`:
  Returns `{ signIn: (data: SignInFormValues) => Promise<void>, isPending: boolean, error: string | null }`
  - Calls authService.signIn
  - On success: dispatch SET_USER with response.user
  - On failure: set error string from ApiError.message
- `useSignOut()`:
  Returns `{ signOut: () => Promise<void>, isPending: boolean }`
  - Calls authService.signOut
  - dispatch LOGOUT
  - redirect to /login

### 10. `src/middleware.ts`

- Protected matcher: `/dashboard/:path*`, `/profile/:path*`, `/settings/:path*`
- Auth matcher: `/login`, `/signup`
- Read `access_token` from `request.cookies`
- If protected route + no cookie → redirect to /login
- If auth route + has cookie → redirect to /dashboard
- Use NextResponse.redirect — never import from React

### 11. `src/components/features/auth/SignInForm.tsx`

'use client' arrow component:

- Uses `useSignInForm()` from `@packages/forms/SigninForm.form`
- Uses `useSignIn()` from `@packages/hooks/useAuthActions`
- On success: router.push('/dashboard')
- Shows field-level validation errors from react-hook-form
- Disables submit + shows loading state while isPending
- Shows API error string if sign-in fails
- Imports: lucide-react for icons only

### 12. `src/components/features/auth/SignUpForm.tsx`

Same pattern as SignInForm — adds fullname + confirmPassword fields.
On success: router.push('/login') with success query param.

### 13. `src/components/features/auth/AuthGuard.tsx`

'use client' arrow component:

- type AuthGuardProps = { children: React.ReactNode }
- Reads from `useAuth()`
- isLoading → render skeleton (use .skeleton CSS class from animation.css)
- !isAuthenticated → router.replace('/login') (replace not push)
- isAuthenticated → render children

### 14. `src/components/features/auth/index.ts`

Barrel: export { SignInForm } from './SignInForm', etc.

### 15. `src/app/(auth)/signin/page.tsx`

Server Component (no 'use client').
Renders <SignInForm /> imported from @components/features/auth.

### 16. `src/app/(protected)/dashboard/page.tsx`

Server Component wrapped in <AuthGuard> client boundary.
Shows user greeting using useAuth().user?.fullname.

---

## IMPORT ALIAS ENFORCEMENT

Every cross-boundary import must use aliases:
@types/_ → src/types/
@packages/_ → src/packages/
@components/_ → src/components/
@app/_ → src/app/

Never use ../../ across feature boundaries.

---

## ERROR HANDLING PATTERN

In every catch block:

```typescript
} catch (error: unknown) {
  if (axios.isAxiosError<ApiError>(error)) {
    const message = error.response?.data?.message ?? 'Request failed'
    throw new Error(message)
  }
  throw new Error('Unexpected error occurred')
}
```

Never: `catch (error: any)` or `catch (e)` without typing.

---

## OUTPUT FORMAT

For each file:

- Full path as heading
- Complete, runnable TypeScript — no placeholders, no TODOs
- Inline comments only on non-obvious logic
- Build all 16 deliverables in order, no skipping
