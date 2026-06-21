# SECURITY.md

## Reporting a vulnerability

This is a static joke website with no backend, no authentication, and
no user data storage. There is no real attack surface beyond standard
client-side web risks.

If you find an actual issue (for example, a way to inject scripts via
unsanitized input), open an issue on the repository.

## Notes on this codebase

- Some JavaScript in `index.html` is base64-encoded before being
  decoded and executed at runtime. This is done for casual obfuscation
  of joke content only. It is not a security boundary and should not
  be treated as one.
- Terminal commands simulate a fake filesystem in memory. Nothing
  reads or writes to a real filesystem or server.
- `scripts/random.py` is never executed by the site. It is a static
  file shown for flavor only.
