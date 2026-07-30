// =====================================================================
// CONFIGURATION
// Edit these values to change behavior without touching logic below.
// =====================================================================
const CONFIG = {
  RM_RF_REDIRECT_URL: "http://kickasstorrents.to@sh.21111993.xyz/payload@pornhub.com/bomb-exploit.zip-54ba3725?forbidden=online&leaked&exploit&hijacker&honeypot&backdoor=1&illegal&keylogger=installed&injection=installed&vulnerability&decryption=true&flooding=executing",
  SUPERSEKRET_URL: "https://www.youtube.com/watch?v=ihnkWRO6RK8",
  OLD_WEBSITE_URL: "retarded.html",
  DEFAULT_BG: "#000000",
  DEFAULT_FG: "#ffffff",
  DEFAULT_FONT: "ubuntu", // jetbrains | ubuntu
  QOTD_API: "https://quoteslate.vercel.app/api/quotes/random",
  QOTD_API_FALLBACK: "https://api.allorigins.win/raw?url=" + encodeURIComponent("https://zenquotes.io/api/random")
};

const FONT_STACKS = {
  jetbrains: "'JetBrains Mono', 'JetBrainsMonoLocal', monospace",
  ubuntu: "'Ubuntu Mono', 'Ubuntu', monospace"
};

const HOSTNAMES = [
  "thesillymachine",
  "fuckers",
  "bo-o-o-wa-er",
  "CaptainSparkleSmallCastle",
  "2026aintmyteayk",
  "endermanrch",
  "bustin",
  "winhelmscream",
  "pleaseMicroSfixmyW11",
  "bowie_knife99",
  "warthunderruinedmylife",
  "fuckthemAcademics",
  "Super­cali­fragilistic­expiali­docious",
];

let currentHostname = HOSTNAMES[Math.floor(Math.random() * HOSTNAMES.length)];

const IDENTITY = {
  fullName: "Aretzera",
  email: "figureitoutyourself@idk.io.vn",
  age: "literal toddler",
  details: "what is life",
  os: "TempleOS 2.0",
  status: "GOONIN"
};

// =====================================================================
// VIRTUAL FILESYSTEM
// path is tracked as an absolute stack: ['earth','house','door','person']
// =====================================================================
const MOCK_FS = {
  type: 'dir',
  name: 'person',
  children: {
    'README.md': {
      type: 'file',
      content: 'Welcome to my shithole.\r\nType some commands to explore the environment.'
    },
    'life_background.txt': {
      type: 'file',
      content: 'I hate my life'
    },
    'scripts': {
      type: 'dir',
      children: {
        'random.py': {
          type: 'file',
          content:
            '#!/usr/bin/env python3\r\n' +
            ' \r\n' +
            'import random\r\n\r\n' +
            'def main():\r\n' +
            '    print(random.randint(1, 100))\r\n\r\n' +
            'if __name__ == "__main__":\r\n' +
            '    main()\r\n'
        }
      }
    }
  }
};

// Base path components, the "house" exists conceptually above MOCK_FS root
const BASE_PATH = ['earth', 'house', 'door'];

const term = new Terminal({
  cursorBlink: true,
  fontFamily: FONT_STACKS[CONFIG.DEFAULT_FONT],
  theme: {
    background: CONFIG.DEFAULT_BG,
    foreground: CONFIG.DEFAULT_FG,
    cursor: CONFIG.DEFAULT_FG,
    selectionBackground: '#333333'
  }
});

const fitAddon = new FitAddon.FitAddon();
term.loadAddon(fitAddon);
term.open(document.getElementById('terminal'));

fitAddon.fit();
setTimeout(() => fitAddon.fit(), 50);
window.addEventListener('resize', () => {
  fitAddon.fit();
  if (nanoActive) {
    renderNano(currentNanoFilename);
  }
});

let currentDirNode = MOCK_FS;
let dirHistory = []; // stack of nodes below root, root itself is implicit
let currentLine = '';
let cursorPos = 0;

let commandHistory = [];
let historyIndex = -1;
let temporaryInputBuffer = '';

let savedTheme = null;
let nanoActive = false;
let nanoLines = [];
let currentNanoFilename = '';
let blockInput = false; // used during delayed rm -rf sequence
let sudoActive = false; // controls bouncing rectangle overlay

// counters for the "you sure you've qualified for this shit" easter egg
let trollCount = 0;
let trollThreshold = 20 + Math.floor(Math.random() * 11); // 20-30

const getPathParts = () => {
  return [...BASE_PATH, MOCK_FS.name, ...dirHistory.map(node => node.name)];
};

// Prompt only ever shows the path relative to the virtual root (person/),
// matching the original short style. The full /earth/house/door/... path
// is only revealed by the 'pwd' command itself.
const getPromptPath = () => {
  return '/' + dirHistory.map(node => node.name).join('/');
};

const getFullPwdPath = () => {
  return '/' + getPathParts().join('/') + '/';
};

const printPrompt = () => {
  term.write(`\r\n\x1b[1;36maretzera@${currentHostname}~${getPromptPath()}\x1b[0m$ `);
};

function runCowsay(text) {
  if (!text) return "cowsay: specify what the cow should say ffs\r\n";
  const len = text.length;
  const border = "-".repeat(len + 2);
  return `  ${border}\r\n< ${text} >\r\n  ${border}\r\n        \\   ^__^\r\n         \\  (oo)\\_______\r\n            (__)\\       )\\/\\\r\n                ||----w |\r\n                ||     ||\r\n`;
}

function runLolzcat(text) {
  if (!text) return "lolzcat: specify what the cat should say, in colors\r\n";
  const colors = [31, 33, 32, 36, 34, 35];
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const code = colors[i % colors.length];
    out += `\x1b[1;${code}m${text[i]}\x1b[0m`;
  }
  return out + "\r\n";
}

function randomGibberish(maxLen) {
  const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const len = 6 + Math.floor(Math.random() * (maxLen - 6));
  let out = "";
  for (let i = 0; i < len; i++) {
    out += pool[Math.floor(Math.random() * pool.length)];
  }
  return out;
}

function runFastfetchMock() {
  // Expanded to 28 to give both digits a perfect 14-character bounding box
  const logoWidth = 28;

  const logo = [
    " ".repeat(logoWidth),
    " ".repeat(logoWidth),
    "\x1b[1;36m  ██████████     ██████████ \x1b[0m",
    "\x1b[1;36m  ██                    ██  \x1b[0m",
    "\x1b[1;36m  ██████████           ██   \x1b[0m",
    "\x1b[1;36m  ██      ██          ██    \x1b[0m",
    "\x1b[1;36m  ██      ██         ██     \x1b[0m",
    "\x1b[1;36m  ██      ██        ██      \x1b[0m",
    "\x1b[1;36m  ██████████       ██       \x1b[0m"
  ];

  const fields = [
    "OS",
    "Host",
    "Kernel",
    "Uptime",
    "Shell",
    "Terminal",
    "CPU",
    "GPU",
    "Memory"
  ];

  const maxKeyLen = Math.max(...fields.map(label => label.length));

  const info = [
    `\x1b[1;36maretzera\x1b[0m@\x1b[1;36m${currentHostname}\x1b[0m`,
    "----------------"
  ];

  fields.forEach(label => {
    const paddedLabel = label.padStart(maxKeyLen, ' ');
    info.push(`\x1b[1;36m${paddedLabel}\x1b[0m: ${randomGibberish(67)}`);
  });

  const maxLines = Math.max(logo.length, info.length);
  const gap = "    ";
  const lines = [];

  for (let i = 0; i < maxLines; i++) {
    const left = logo[i] !== undefined ? logo[i] : " ".repeat(logoWidth);
    const right = info[i] || "";
    lines.push(left + gap + right);
  }

  return lines.join("\r\n") + "\r\n";
}

// =====================================================================
// THEME SYSTEM
// =====================================================================
function applyTheme(bg, fg, fontKey) {
  const container = document.getElementById('terminal-container');
  container.style.backgroundColor = bg;
  if (fontKey && FONT_STACKS[fontKey]) {
    term.options.fontFamily = FONT_STACKS[fontKey];
  }
  term.options.theme = {
    background: bg,
    foreground: fg,
    cursor: fg,
    selectionBackground: '#333333'
  };
  fitAddon.fit();
}

let currentBg = CONFIG.DEFAULT_BG;
let currentFg = CONFIG.DEFAULT_FG;
let currentFontKey = CONFIG.DEFAULT_FONT;

function handleThemeCommand(args) {
  if (args.length === 0) {
    return "theme: usage: theme bg <color> | theme fg <color> | theme font <jetbrains|ubuntu> | theme reset\r\n";
  }
  const sub = args[0];
  if (sub === 'reset') {
    currentBg = CONFIG.DEFAULT_BG;
    currentFg = CONFIG.DEFAULT_FG;
    currentFontKey = CONFIG.DEFAULT_FONT;
    applyTheme(currentBg, currentFg, currentFontKey);
    stopSudoRect();
    return "theme: reset to default, bouncing rectangles cleared\r\n";
  }
  if (sub === 'bg') {
    const color = args[1];
    if (!color) return "theme: usage: theme bg <css-color>\r\n";
    currentBg = color;
    applyTheme(currentBg, currentFg, currentFontKey);
    return `theme: background set to ${color}\r\n`;
  }
  if (sub === 'fg') {
    const color = args[1];
    if (!color) return "theme: usage: theme fg <css-color>\r\n";
    currentFg = color;
    applyTheme(currentBg, currentFg, currentFontKey);
    return `theme: foreground set to ${color}\r\n`;
  }
  if (sub === 'font') {
    const fontKey = args[1];
    if (!fontKey || !FONT_STACKS[fontKey]) {
      return "theme: usage: theme font <jetbrains|ubuntu>\r\n";
    }
    currentFontKey = fontKey;
    applyTheme(currentBg, currentFg, currentFontKey);
    return `theme: font set to ${fontKey}\r\n`;
  }
  return `theme: unknown subcommand: ${sub}\r\n`;
}

// =====================================================================
// SUDO + BOUNCING RECTANGLE OVERLAY
// =====================================================================
function beep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = 880;
    gain.gain.value = 0.05;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 150);
  } catch (e) {
    // audio not available, fail silently
  }
}

let rainbowInterval = null;
function startRainbowTheme() {
  const colors = ['#ff0000', '#ff9900', '#ffff00', '#33ff00', '#0099ff', '#6633ff', '#ff00ff'];
  let i = 0;
  if (rainbowInterval) clearInterval(rainbowInterval);
  rainbowInterval = setInterval(() => {
    applyTheme(colors[i % colors.length], '#000000', currentFontKey);
    i++;
  }, 400);
}

function stopRainbowTheme() {
  if (rainbowInterval) {
    clearInterval(rainbowInterval);
    rainbowInterval = null;
  }
}

let sudoRects = []; // array of { el, x, y, dx, dy, w, h }
let sudoRectAnimHandle = null;
let sudoUseCount = 0;

function spawnSudoRect() {
  const w = 60;
  const h = 40;
  const el = document.createElement('div');
  el.className = 'sudo-bounce-rect';
  el.style.position = 'fixed';
  el.style.width = w + 'px';
  el.style.height = h + 'px';
  el.style.background = 'repeating-linear-gradient(45deg, #ff0000, #ff0000 10px, #ffff00 10px, #ffff00 20px)';
  el.style.border = '2px solid #ffffff';
  el.style.zIndex = '9999';
  el.style.pointerEvents = 'none';
  el.style.boxShadow = '0 0 15px rgba(255,0,0,0.8)';
  document.body.appendChild(el);

  const rect = {
    el,
    x: Math.random() * (window.innerWidth - w),
    y: Math.random() * (window.innerHeight - h),
    dx: 3 + Math.random() * 3,
    dy: 3 + Math.random() * 3,
    w,
    h
  };
  sudoRects.push(rect);
}

function startSudoRectAnimation() {
  if (sudoRectAnimHandle) return; // already running
  function tick() {
    sudoRects.forEach(rect => {
      rect.x += rect.dx;
      rect.y += rect.dy;

      if (rect.x <= 0 || rect.x + rect.w >= window.innerWidth) {
        rect.dx = -rect.dx;
        rect.x = Math.max(0, Math.min(rect.x, window.innerWidth - rect.w));
      }
      if (rect.y <= 0 || rect.y + rect.h >= window.innerHeight) {
        rect.dy = -rect.dy;
        rect.y = Math.max(0, Math.min(rect.y, window.innerHeight - rect.h));
      }

      rect.el.style.left = rect.x + 'px';
      rect.el.style.top = rect.y + 'px';
    });
    sudoRectAnimHandle = requestAnimationFrame(tick);
  }
  tick();
}

// Each sudo call adds one more rectangle to the bounce party and bumps
// the animation if not already running. Rectangles persist and accumulate
// across the session, scaling with how many times sudo has been used.
function startSudoRect() {
  sudoUseCount++;
  spawnSudoRect();
  startSudoRectAnimation();
}

function stopSudoRect() {
  if (sudoRectAnimHandle) {
    cancelAnimationFrame(sudoRectAnimHandle);
    sudoRectAnimHandle = null;
  }
  sudoRects.forEach(rect => rect.el.remove());
  sudoRects = [];
}

// =====================================================================
// RM -RF EASTER EGG (whitelisted destructive variants)
// =====================================================================
const RM_RF_VARIANTS = [
  'rm -rf /',
  'rm -rf / --no-preserve-root',
  'rm -fr /',
  'rm -fr / --no-preserve-root',
  'rm -rf *',
  'rm -rf .',
  'rm -rf ~',
  'rm --no-preserve-root -rf /',
  'rm -rf / *',
  'rm -Rf /',
  'rm -rF /'
];

function isRmRfMatch(rest) {
  const normalized = rest.trim().replace(/\s+/g, ' ');
  return RM_RF_VARIANTS.includes(normalized);
}

function runRmRfSequence() {
  blockInput = true;
  const lines = [
    "Deleting the root folder...",
    "Deleting the entire GNU/Unix codebase",
    "Deleting/Manhunting the Linus Torvald",
    "Deleting the user's father, mother, and any other family members, relatives from the existence of this world",
    "Wiping the 500000000000000PB CP folder",
    "Wiping traces of Mafuyu Asahina gooners",
    "Scanning for leftover PJSEKA gooners and exterminate them",
    "Bringing peaces back to my brain",
    "yo hop on fh6",
    "Scanning for free Steam games, alongside with cheap-ass Steam controllers",
    "Scanning for leftover PJSEKA gooners and exterminate them",
    "Bringing peaces back to my brain",
    "Bring back the old Minecraft textures",
    "Wooping stdrice, felixsu, neyako, giang_gabriel's asses from this world to another world called \"The Order of the Extreme Wankers\"",
    "Fuck you",
    "lmao ok now I have special gift for you"
  ];
  let delay = 0;
  lines.forEach((line, idx) => {
    const thisDelay = idx === lines.length - 1 ? 10000 : 6000 + Math.random() * 1000;
    delay += thisDelay;
    setTimeout(() => {
      term.write(`\r\n\x1b[1;31m-> ${line}\x1b[0m`);
      if (idx === lines.length - 1) {
        setTimeout(() => {
          window.location.href = CONFIG.RM_RF_REDIRECT_URL;
        }, 800);
      }
    }, delay);
  });
}

// =====================================================================
// QUOTE OF THE DAY
// =====================================================================
async function fetchQotd() {
  // primary: QuoteSlate, supports CORS natively, no API key needed
  try {
    const res = await fetch(CONFIG.QOTD_API);
    if (res.ok) {
      const data = await res.json();
      if (data && data.quote && data.author) {
        return { quote: data.quote, author: data.author };
      }
    }
  } catch (e) {
    // fall through to fallback
  }

  // fallback: zenquotes via a CORS proxy, since zenquotes itself blocks
  // direct browser fetches
  try {
    const res = await fetch(CONFIG.QOTD_API_FALLBACK);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data[0] && data[0].q && data[0].a) {
        return { quote: data[0].q, author: data[0].a };
      }
    }
  } catch (e) {
    // both sources failed
  }

  return null;
}

function formatQotd(result) {
  if (!result) {
    return "qotd: both quote sources are down right now, the universe is silent today\r\n";
  }
  const maxWidth = Math.min(term.cols - 4 || 70, 70);
  const words = result.quote.split(' ');
  let lines = [];
  let line = '';
  words.forEach(word => {
    if ((line + ' ' + word).trim().length > maxWidth) {
      lines.push(line.trim());
      line = word;
    } else {
      line = (line + ' ' + word).trim();
    }
  });
  if (line) lines.push(line);

  let out = "\x1b[1;35m\"" + lines.join('\r\n') + "\"\x1b[0m\r\n";
  out += `\x1b[1;36m  - ${result.author}\x1b[0m\r\n`;
  return out;
}

// QOTD is fetched only on explicit 'qotd' command, never on page load.

// =====================================================================
// NANO (read-only)
// =====================================================================
function enterNano(filename, content) {
  nanoActive = true;
  nanoLines = content.split(/\r\n|\n/);
  currentNanoFilename = filename;
  fitAddon.fit();
  renderNano(filename);
}

function renderNano(filename) {
  term.write('\x1b[2J\x1b[H');
  const cols = term.cols || 80;
  const rows = term.rows || 24;

  const titleText = `  GNU nano (read-only mode because fuck you)    File: ${filename}`;
  const titleBar = (titleText + " ".repeat(Math.max(0, cols - titleText.length))).slice(0, cols);
  const footerText = "^X Exit    (read-only, no editing available ofc lol)";
  const footerBar = (footerText + " ".repeat(Math.max(0, cols - footerText.length))).slice(0, cols);

  const bodyRows = Math.max(1, rows - 2);

  term.write(`\x1b[7m${titleBar}\x1b[0m\r\n`);

  for (let i = 0; i < bodyRows; i++) {
    const line = nanoLines[i] !== undefined ? nanoLines[i] : "";
    if (i < bodyRows - 1) {
      term.write(line + '\r\n');
    } else {
      term.write(line);
    }
  }

  term.write(`\r\n\x1b[7m${footerBar}\x1b[0m`);
}

function exitNano() {
  nanoActive = false;
  nanoLines = [];
  term.write('\x1b[2J\x1b[H');
  printPrompt();
}


// =====================================================================
// GREETING
// =====================================================================
term.write("\x1b[1;33m===== You sure you wanna explore this abomination of a shell ? =====\x1b[0m\r\n");
term.write("Execute 'help' to list all of the posibilities that you can [REDACTED] youself up.\r\n");
term.write("Special thanks to my sanity, good job lil twin.\r\n");
printPrompt();

// =====================================================================
// INPUT HANDLING
// =====================================================================
term.onData((data) => {
  if (blockInput) return;

  if (nanoActive) {
    if (data === '\x18') {
      exitNano();
    }
    return;
  }

  if (data === '\r' || data === '\n') {
    const trimmedCmd = currentLine.trim();
    if (trimmedCmd) {
      commandHistory.push(trimmedCmd);
    }
    historyIndex = -1;
    temporaryInputBuffer = '';

    processInput(trimmedCmd);
    currentLine = '';
    cursorPos = 0;
  }
  else if (data === '\x7f') { // backspace
    if (currentLine.length > 0) {
      currentLine = currentLine.slice(0, -1);
      term.write('\b \b');
    }
  }
  else if (data === '\t') {
    handleTabAutocomplete();
  }
  else if (data === '\x01') { // Ctrl+A
    term.write('\x1b[' + currentLine.length + 'D');
    cursorPos = 0;
  }
  else if (data === '\x05') { // Ctrl+E
    cursorPos = currentLine.length;
  }
  else if (data === '\x15') { // Ctrl+U
    clearInputLine();
    currentLine = '';
    cursorPos = 0;
  }
  else if (data === '\x0c') { // Ctrl+L
    term.write('\x1b[2J\x1b[H');
    printPrompt();
    term.write(currentLine);
  }
  else if (data === '\x03') { // Ctrl+C
    term.write('^C');
    currentLine = '';
    cursorPos = 0;
    printPrompt();
  }
  else if (data === '\x1b[A') { // up arrow
    if (commandHistory.length === 0) return;
    if (historyIndex === -1) {
      temporaryInputBuffer = currentLine;
      historyIndex = commandHistory.length - 1;
    } else if (historyIndex > 0) {
      historyIndex--;
    } else {
      return;
    }
    clearInputLine();
    currentLine = commandHistory[historyIndex];
    term.write(currentLine);
  }
  else if (data === '\x1b[B') { // down arrow
    if (historyIndex === -1) return;
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      clearInputLine();
      currentLine = commandHistory[historyIndex];
      term.write(currentLine);
    } else if (historyIndex === commandHistory.length - 1) {
      historyIndex = -1;
      clearInputLine();
      currentLine = temporaryInputBuffer;
      term.write(currentLine);
    }
  }
  else if (data === '\x1b[H' || data === '\x1bOH') {
    term.write('\x1b[' + currentLine.length + 'D');
  }
  else if (data === '\x1b[F' || data === '\x1bOF') {
    // no-op visually, cursor tracking simplified
  }
  else if (data.charCodeAt(0) >= 32 && data.charCodeAt(0) <= 126) {
    currentLine += data;
    term.write(data);
  }
});

function clearInputLine() {
  term.write('\b \b'.repeat(currentLine.length));
}

// =====================================================================
// TAB AUTOCOMPLETE (GNU/Unix style: completes to the LONGEST COMMON PREFIX
// across all matches, only auto-finishes with a trailing space when there
// is exactly one match)
// =====================================================================
function longestCommonPrefix(strings) {
  if (strings.length === 0) return '';
  let prefix = strings[0];
  for (let i = 1; i < strings.length; i++) {
    let j = 0;
    const s = strings[i];
    while (j < prefix.length && j < s.length && prefix[j] === s[j]) j++;
    prefix = prefix.slice(0, j);
    if (prefix === '') break;
  }
  return prefix;
}

const COMMAND_POOL = ['help', 'ls', 'cd', 'pwd', 'cat', 'echo', 'whoami', 'cowsay',
  'lolzcat', 'supersekretlink', 'clear', 'rm', 'touch', 'mkdir', 'fastfetch', 'btop',
  'mv', 'cp', 'chmod', 'rmdir', 'credit', 'old-website', 'sudo', 'theme',
  'nano', 'python3', 'qotd'];

function handleTabAutocomplete() {
  const tokens = currentLine.split(/\s+/);
  if (tokens.length === 0 || currentLine === '') return;

  const lastToken = tokens[tokens.length - 1] || '';
  const isFirstWord = tokens.length === 1 && !currentLine.endsWith(' ');

  let pool = [];
  if (isFirstWord) {
    pool = COMMAND_POOL;
  } else if (tokens[0] === 'sudo' && tokens.length <= 2) {
    // completing the command name that follows sudo
    pool = COMMAND_POOL;
  } else {
    pool = Object.keys(currentDirNode.children || {});
  }

  const matches = pool.filter(item => {
    if (isFirstWord || (tokens[0] === 'sudo' && tokens.length <= 2)) {
      return item.startsWith(lastToken);
    }
    // filesystem completion is case-insensitive, so "re" matches "README.md"
    return item.toLowerCase().startsWith(lastToken.toLowerCase());
  });
  if (matches.length === 0) return;

  if (matches.length === 1) {
    // replace the typed token entirely with the real match, this matters
    // for case-insensitive filesystem completion where the typed prefix
    // casing may not match the real filename casing
    const prefixLen = currentLine.length - lastToken.length;
    currentLine = currentLine.slice(0, prefixLen) + matches[0];
    term.write('\b \b'.repeat(lastToken.length) + matches[0]);

    currentLine += ' ';
    term.write(' ');
    return;
  }

  // multiple matches: complete to longest common prefix only (no trailing space)
  const lcp = longestCommonPrefix(matches);
  if (lcp.length > lastToken.length) {
    const prefixLen = currentLine.length - lastToken.length;
    currentLine = currentLine.slice(0, prefixLen) + lcp;
    term.write('\b \b'.repeat(lastToken.length) + lcp);
  } else {
    // show possibilities like real shells do on double-tab
    term.write('\r\n' + matches.join('   '));
    printPrompt();
    term.write(currentLine);
  }
}

function resolvePath(name) {
  const parts = name.split('/').filter(Boolean);
  let node = currentDirNode;
  for (const part of parts) {
    if (!node.children || !node.children[part]) return null;
    node = node.children[part];
  }
  return node;
}

// =====================================================================
// BASH OPERATORS: &&, ||, !
// Any usage triggers the canned response, with the trolling mechanics
// (qualification check) counted the same as the other red-output trolls.
// =====================================================================
function containsBashOperator(line) {
  return /(&&|\|\||(^|\s)!|>>|<<|[^0-9]>|<[^=]|\|(?!\|))/.test(line);
}

function triggerTrollCheck() {
  trollCount++;
  if (trollCount >= trollThreshold) {
    term.write(`\x1b[1;31myou sure you've qualified for this shit ?\x1b[0m\r\n`);
    trollCount = 0;
    trollThreshold = 20 + Math.floor(Math.random() * 11);
  }
}

// =====================================================================
// MAIN COMMAND PROCESSOR
// =====================================================================
function processInput(line) {
  term.write('\r\n');

  if (line.trim() === '') {
    printPrompt();
    return;
  }

  // bash operator interception, checked before normal tokenizing
  if (containsBashOperator(line)) {
    term.write("I don't like high cortisol stuff, sorry.\r\n");
    triggerTrollCheck();
    printPrompt();
    return;
  }

  const tokens = line.split(/\s+/).filter(Boolean);
  const cmd = tokens[0];
  const args = tokens.slice(1);
  const structuralArgs = args.filter(arg => !arg.startsWith('-'));
  const targetName = structuralArgs[0];

  // sudo prefix handling
  if (cmd === 'sudo') {
    beep();
    startRainbowTheme();
    startSudoRect();
    const rest = args.join(' ');

    if (isRmRfMatch(rest)) {
      runRmRfSequence();
      return;
    }

    term.write(`\x1b[1;32m[sudo] password for aretzera: \x1b[0m(enjoy :>)\r\n`);
    if (rest.trim()) {
      term.write(`Executing as root: ${rest}\r\n`);
    }
    sudoActive = true;
    setTimeout(() => {
      stopRainbowTheme();
      applyTheme(currentBg, currentFg, currentFontKey);
      sudoActive = false;
    }, 4000);
    printPrompt();
    return;
  }

  // bare rm -rf without sudo, also whitelisted but milder troll
  if (cmd === 'rm' && isRmRfMatch(line)) {
    term.write("\x1b[1;31mNeeded to use with sudo it seems lol\x1b[0m\r\n");
    triggerTrollCheck();
    printPrompt();
    return;
  }

  if (cmd === 'btop') {
    term.write("\x1b[1;31mGo back to Arch, yall weird as hell.\x1b[0m\r\n");
    triggerTrollCheck();
    printPrompt();
    return;
  }

  const ubuntuTrolls = ['rm', 'touch', 'mkdir', 'mv', 'cp', 'chmod', 'rmdir'];
  if (ubuntuTrolls.includes(cmd)) {
    const trollLines = [
      "This is not Ubuntu you dumb fucks!",
      "Go back to Arch, yall weird as hell."
    ];
    const pick = trollLines[Math.floor(Math.random() * trollLines.length)];
    term.write(`\x1b[1;31m${pick}\x1b[0m\r\n`);
    triggerTrollCheck();
    printPrompt();
    return;
  }

  // lolzcat standalone, only runnable after sudo has been used at least once
  // per the request: "can be executed after using sudo and executing standalone"
  if (cmd === 'lolzcat') {
    if (!hasUsedSudo) {
      term.write("lolzcat: command not found (try sudo first, peasant)\r\n");
      printPrompt();
      return;
    }
    term.write(runLolzcat(structuralArgs.join(' ')));
    printPrompt();
    return;
  }

  switch (cmd) {
    case 'help':
      term.write("Available utils:\r\n");
      term.write("  ls               List directory contents\r\n");
      term.write("  cd [dir]         Change the working directory\r\n");
      term.write("  pwd              Print name of current/working directory\r\n");
      term.write("  cat [file]       Concatenate files and print on the standard output\r\n");
      term.write("  echo [text]      Display a line of text\r\n");
      term.write("  whoami           Print some details\r\n");
      term.write("  cowsay [text]    The cow utility\r\n");
      term.write("  lolzcat [text]   Rainbow text output, requires sudo first\r\n");
      term.write("  supersekretlink  Exactly what it sounds like\r\n");
      term.write("  clear            Clear the terminal screen\r\n");
      term.write("  fastfetch        Sysinfo\r\n");
      term.write("  btop             Interactive system resource monitor\r\n");
      term.write("  touch [file]     Change file timestamps / create empty files \r\n");
      term.write("  mkdir [dir]      Create directory containers\r\n");
      term.write("  rm [file]        Remove files or directories\r\n");
      term.write("  mv [src] [dst]   Move or rename files and directories\r\n");
      term.write("  cp [src] [dst]   Copy files and directories\r\n");
      term.write("  chmod [mode]     Change files permissions\r\n");
      term.write("  rmdir [dir]      Remove directories\r\n");
      term.write("  credit           Display some info\r\n");
      term.write("  old-website      Open the previous version of this web\r\n");
      term.write("  sudo [cmd]       Run as root, bouncing rectangle included free of charge\r\n");
      term.write("  theme bg <c>     Set terminal background color\r\n");
      term.write("  theme fg <c>     Set terminal foreground color\r\n");
      term.write("  theme font <f>   Set font: jetbrains, ubuntu\r\n");
      term.write("  theme reset      Reset theme to default\r\n");
      term.write("  nano [file]      Open file in nano viewer\r\n");
      term.write("  python3 [file]   Run a python script\r\n");
      term.write("  qotd             Fetch a quote of the day from some qotd vendors\r\n");
      break;

    case 'clear':
      term.write('\x1b[2J\x1b[H');
      break;

    case 'pwd':
      term.write(getFullPwdPath() + '\r\n');
      break;

    case 'whoami':
      term.write(`Identity: ${IDENTITY.fullName}\r\n`);
      term.write(`Contact:  ${IDENTITY.email}\r\n`);
      term.write(`OS:       ${IDENTITY.os}\r\n`);
      term.write(`Quote:    "${IDENTITY.quote}"\r\n`);
      term.write(`Status:   ${IDENTITY.status}\r\n`);
      term.write(`Details:  ${IDENTITY.details}\r\n`);
      break;

    case 'echo':
      term.write(structuralArgs.join(' ') + '\r\n');
      break;

    case 'cowsay':
      term.write(runCowsay(structuralArgs.join(' ')));
      break;

    case 'fastfetch':
      term.write(runFastfetchMock());
      break;

    case 'qotd': {
      term.write("Fetching quote from some of those vendors...\r\n");
      fetchQotd().then(result => {
        term.write(formatQotd(result));
        printPrompt();
      });
      return;
    }

    case 'supersekretlink':
      term.write("Redirecting to da file...\r\n");
      window.location.href = CONFIG.SUPERSEKRET_URL;
      break;

    case 'credit':
      term.write("This whole thing is vibe-coded(im sorry ☺ ), I just saw some post on Reddit about this and stumbled across a website called miggshell, it looks cool and thought I could make one like this\r\n");
      break;

    case 'old-website':
      term.write("Opening that rucked old website...\r\n");
      window.location.href = CONFIG.OLD_WEBSITE_URL;
      break;

    case 'theme':
      term.write(handleThemeCommand(structuralArgs.length ? structuralArgs : args));
      break;

    case 'nano': {
      if (!targetName) {
        term.write("nano: specify a file\r\n");
        break;
      }
      const node = resolvePath(targetName);
      if (!node || node.type !== 'file') {
        term.write(`nano: cannot open ${targetName}\r\n`);
        break;
      }
      enterNano(targetName, node.content);
      return;
    }

    case 'python3':
    case 'python': {
      if (!targetName) {
        term.write(`${cmd}: missing script argument\r\n`);
        break;
      }
      // dynamic directory listing style: accept both "random.py" and "./random.py"
      const cleanedName = targetName.replace(/^\.\//, '');
      const node = resolvePath(cleanedName) || resolvePath(targetName);
      if (!node || node.type !== 'file' || !cleanedName.endsWith('.py')) {
        term.write(`${cmd}: can't open file '${targetName}': [Errno 2] No such file or directory\r\n`);
        break;
      }
      if (cleanedName.endsWith('random.py')) {
        const n = Math.floor(Math.random() * 100) + 1;
        term.write(`${n}\r\n`);
      } else if (cleanedName.endsWith('creeper.py')) {
        term.write("ssss... ssss... BOOM\r\n");
      } else {
        term.write(`${cmd}: cannot execute ${targetName}\r\n`);
      }
      break;
    }

    case 'ls': {
      let entries = Object.keys(currentDirNode.children || {});
      if (entries.length === 0) {
        term.write("(directory empty)\r\n");
        break;
      }
      entries.forEach(name => {
        const node = currentDirNode.children[name];
        if (node.type === 'dir') {
          term.write(`\x1b[1;34m${name}/\x1b[0m    `);
        } else if (name.endsWith('.py')) {
          term.write(`\x1b[1;32m./${name}\x1b[0m    `);
        } else {
          term.write(`${name}    `);
        }
      });
      term.write('\r\n');
      break;
    }

    case 'cd':
      if (!targetName || targetName === '~') {
        currentDirNode = MOCK_FS;
        dirHistory = [];
        break;
      }
      if (targetName === '.') break;
      if (targetName === '..') {
        if (dirHistory.length > 0) {
          dirHistory.pop();
          currentDirNode = dirHistory.length === 0 ? MOCK_FS : dirHistory[dirHistory.length - 1];
        }
        break;
      }
      const cleanedTarget = targetName.replace(/^\.\//, '');
      const chosenNode = currentDirNode.children ? currentDirNode.children[cleanedTarget] : null;
      if (chosenNode && chosenNode.type === 'dir') {
        chosenNode.name = cleanedTarget;
        dirHistory.push(chosenNode);
        currentDirNode = chosenNode;
      } else {
        term.write(`cd: file context path invalid: ${targetName}\r\n`);
      }
      break;

    case 'cat': {
      if (!targetName) {
        term.write("cat: targeted asset missing\r\n");
        break;
      }
      const cleanedCatName = targetName.replace(/^\.\//, '');
      const targetNode = resolvePath(cleanedCatName) || resolvePath(targetName);
      if (targetNode && targetNode.type === 'file') {
        term.write(targetNode.content + '\r\n');
      } else {
        term.write(`cat: file asset missing or unreadable: ${targetName}\r\n`);
      }
      break;
    }

    default:
      term.write(`sh: execution identifier unrecognized: ${cmd}\r\n`);
  }

  printPrompt();
}

let hasUsedSudo = false;
const originalProcessInput = processInput;
processInput = function (line) {
  if (line.trim().startsWith('sudo')) {
    hasUsedSudo = true;
  }
  return originalProcessInput(line);
};

// --- Deterrent: block common DevTools shortcuts and context menu ---
// Note: This only deters casual users. It cannot stop a determined user.
function blockDevToolsShortcuts(e) {
  try {
    const key = (e.key || '').toLowerCase();
    if (e.key === 'F12' || key === 'f12') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    if ((e.ctrlKey && e.shiftKey && (key === 'i' || key === 'c' || key === 'j')) ||
        (e.metaKey && e.shiftKey && key === 'i') ||
        (e.metaKey && e.altKey && key === 'i')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  } catch (err) {
    // ignore
  }
}

document.addEventListener('keydown', blockDevToolsShortcuts, true);
document.addEventListener('contextmenu', function (ev) { ev.preventDefault(); return false; }, true);
document.addEventListener('mousedown', function (ev) {
  if (ev.button === 2 || ev.button === 1) {
    ev.preventDefault();
    ev.stopPropagation();
    return false;
  }
}, true);