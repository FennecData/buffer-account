# buffer-accounts
🍥

## Sessions

The Buffer Account app is the only application that creates sessions. The sessions are created via the [session-service](https://github.com/bufferapp/session-service) and stored on the client using a cookie named `buffer_session` (or `local_buffer_session` in local dev).

1. Someone visits publish.buffer.com without a session cookie
2. The user is redirected to the Account login page with a parameter to redirect back  to the Publish app -- https://account.buffer.com/login/?redirect=https://publish.buffer.com
3. The user enters their credentials
4. The Account app creates a session and creates cookie that is visible on the buffer.com domain.
5. The Account app redirects back to publish

Other applications [Publish](https://github.com/bufferapp/buffer-publish) and [Analyze](https://github.com/bufferapp/buffer-analyze) pass the cookie to their own backend - which verifies and retrieves the session object as needed. This means that the session object is never exposed to the client, only the opaque session id embedded in the JWT.

```
  [Account App]
       |
  create session
       |
       ∨
[Session Service]
    |      |
    |      |_ get sesion _> [Analyze]
    |
    |____ get session _> [Publish]
```

When a user logs out they are redirected to the Account app:

https://account.buffer.com/logout/?redirect=https://publish.buffer.com/

Visiting this page deletes the session and the session cookie (including a buffer web session if that exists). Then it redirects to login page.
