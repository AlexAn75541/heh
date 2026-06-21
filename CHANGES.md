# Dev branch update notes

This bundle contains the updated site. Files included:

- index.html (rewritten, payload base64 encoded inside)
- payload.source.js (readable source of the encoded payload, NOT used by the live site, keep for editing reference)
- index-old.html (unchanged)
- LICENSE (unchanged)
- AGENT.md (new)
- SECURITY.md (new)
- scripts/random.py (new, read-only reference script, not executed server side)

## What changed in index.html

- Added a CONFIG block at the top of payload.source.js with RM_RF_REDIRECT_URL,
  SUPERSEKRET_URL, OLD_WEBSITE_URL. Edit payload.source.js, then re-run the
  encode step below, do not edit the base64 blob directly.
- fastfetch now prints a fake mockup (fictional ASCII logo and fields), btop
  still trolls with the Arch line.
- New theme command: theme bg <color>, theme fg <color>, theme font
  <jetbrains|ubuntu|times|dosis>, theme reset.
- New sudo command, no password, plays a short beep, switches to a rainbow
  color cycle. sudo rm -rf / triggers the easter egg sequence, each line
  delayed 6 to 7 seconds except the last at 10 seconds, then redirects to
  RM_RF_REDIRECT_URL.
- theme reset returns to default colors and stops the rainbow cycle.
- New nano command, read-only viewer for files in the mock filesystem, exits
  on Ctrl+X only.
- New scripts/ directory in the mock filesystem containing random.py. cat
  scripts/random.py shows real source. run scripts/random.py simulates
  output with a random number, since static hosting cannot execute Python.
- Expanded keyboard support: Ctrl+A (start of line), Ctrl+E (end of line),
  Ctrl+U (clear line), Ctrl+L (clear screen), Ctrl+C (cancel line), Home.
  True OS level alt-codes cannot be intercepted from a browser, this is a
  hard platform limit, not something missing from the implementation.
- help command rewritten to match every available command.
- Core JS logic is base64 encoded and decoded at runtime. This is light
  obfuscation only, documented in SECURITY.md as not a real security
  boundary.

## Update 2 fixes

- fastfetch now uses a TempleOS-style cross glyph as the logo, properly
  centered in the terminal viewport based on actual column count. All spec
  values (OS, Host, Kernel, Uptime, Shell, Terminal, CPU, GPU, Memory) are
  randomized gibberish strings, max 20 characters, regenerated every run.
- nano now fills the full terminal viewport height (term.rows), with the
  title bar and footer bar pinned to the actual top and bottom rows. It
  re-renders on window resize so it keeps filling the viewport at any size.
- Removed the custom run command. Use python3 <file> or python <file>
  instead, matches the real CLI convention. Still simulation only, only
  random.py is supported, anything else errors like a missing file would.

## Re-encoding after edits

If you edit payload.source.js, regenerate the embedded blob with:

    base64 -w 0 payload.source.js > payload.b64.txt
    python3 -c "
    with open('index.html') as f:
        html = f.read()
    with open('payload.b64.txt') as f:
        b64 = f.read().strip()
    import re
    html = re.sub(r'(id=\"payload\"[^>]*>)(.*?)(</script>)', lambda m: m.group(1) + b64 + m.group(3), html, flags=re.S)
    with open('index.html', 'w') as f:
        f.write(html)
    "

## Applying this as a dev branch and opening a PR

Run from inside your local clone of the repo:

    git checkout -b dev-terminal-update
    # copy these files into the repo root, overwriting index.html, index-old.html, LICENSE
    # add AGENT.md, SECURITY.md, scripts/random.py as new files
    git add .
    git commit -m "Add sudo, theme, nano, fastfetch mockup, rm -rf easter egg, AGENT.md, SECURITY.md"
    git push origin dev-terminal-update

Then open a PR on GitHub from dev-terminal-update into your default branch.
