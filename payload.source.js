// =====================================================================
// CONFIGURATION
// Edit these values to change behavior without touching logic below.
// =====================================================================
const CONFIG = {
  RM_RF_REDIRECT_URL: "https://youtu.be/ihnkWRO6RK8?si=wBPTIpC5OUhaAoj4",
  SUPERSEKRET_URL: "https://www.youtube.com/watch?v=ihnkWRO6RK8",
  OLD_WEBSITE_URL: "retarded.html",
  DEFAULT_BG: "#000000",
  DEFAULT_FG: "#ffffff",
  DEFAULT_FONT: "ubuntu" // jetbrains | ubuntu | times | dosis
};

const FONT_STACKS = {
  jetbrains: "'JetBrains Mono', 'JetBrainsMonoLocal', monospace",
  ubuntu: "'Ubuntu Mono', 'Ubuntu', monospace",
  times: "'Times New Roman', Times, serif",
  dosis: "'Dosis', sans-serif"
};

const IDENTITY = {
  fullName: "Aretzera",
  email: "figureitoutyourself@idk.io.vn",
  quote: "You should have never come here.",
  details: "I hate being in this place"
};

const MOCK_FS = {
  type: 'dir',
  name: 'root',
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
            '"""Prints a random integer between 1 and 100.\r\n' +
            'NOTE: not actually executed by this site, output is simulated."""\r\n' +
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


function runFastfetchMock() {
  // ASCII art logo of "7" aligned to left (default fastfetch style)
  const logo = [
    "      \x1b[1;32m     _\x1b[0m",
    "      \x1b[1;32m    /|\x1b[0m",
    "      \x1b[1;32m   /_\\\x1b[0m",
    "  \x1b[1;32m██████\x1b[0m ",
    "  \x1b[1;32m██████\x1b[0m ",
    "      \x1b[1;32mgit\x1b[0m"
  ];

  const fields = [
    "\x1b[7mHost:\t\tlocalhost\x1b[0m",
    "\x1b[7mOS:\t\tSome dudes with HolyC or smth idk\x1b[0m",
    "Kernel: \tx.x.x-x (fake)",
    "Uptime: \tup 42 min, load avg. 35 / - / -"
  ];

  fields.forEach(label => {
    label += "\x1b[7mCPU:\t\t\x1b[0mIntel Core i9-9800XK".repeat(3);
    for (let j = 0; j < Math.random() * 5 + 2; j++) {
      label += " ".repeat(Math.random() * 4 + 1) + randomGibberish(36 - label.length, true);
    }

    fields.push(label);
  });
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
let dirHistory = [];
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

const getPromptPath = () => {
  if (dirHistory.length === 0) return '';
  return '/' + dirHistory.map(node => node.name).join('/');
};

const printPrompt = () => {
  term.write(`\r\n\x1b[1;36maretzera@fuckyou~${getPromptPath()}\x1b[0m$ `);
};

function runCowsay(text) {
  if (!text) return "cowsay: specify what the cow should say ffs\r\n";
  const len = text.length;
  const border = "-".repeat(len + 2);
  return `  ${border}\r\n< ${text} >\r\n  ${border}\r\n        \\   ^__^\r\n         \\  (oo)\\_______\r\n            (__)\\       )\\/\\\r\n                ||----w |\r\n                ||     ||\r\n`;
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
  // TempleOS or smth
  const logo = [
    "      \x1b[1;33m██\x1b[0m      ",
    "      \x1b[1;33m██\x1b[0m      ",
    "      \x1b[1;33m██\x1b[0m      ",
    "  \x1b[1;33m██████████\x1b[0m  ",
    "  \x1b[1;33m██████████\x1b[0m  ",
    "      \x1b[1;33m██\x1b[0m      ",
    "      \x1b[1;33m██\x1b[0m      ",
    "      \x1b[1;33m██\x1b[0m      "
  ];
  const logoWidth = 14; // visible character width of each logo line above

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

  const info = [
    `\x1b[1;36maretzera\x1b[0m@\x1b[1;36mfuckyou\x1b[0m`,
    "-".repeat(17)
  ];
  fields.forEach(label => {
    info.push(`${label}: ${randomGibberish(20)}`);
  });

  const maxLines = Math.max(logo.length, info.length);
  const gap = "    ";
  const lines = [];
  for (let i = 0; i < maxLines; i++) {
    const left = logo[i] !== undefined ? logo[i] : " ".repeat(logoWidth);
    const right = info[i] || "";
    lines.push(left + gap + right);
  }

  // center the whole block horizontally based on current terminal column count
  // const termCols = term.cols || 80;
  // visible width estimate, ignoring ansi escapes, using logoWidth + gap + longest info line
  const longestInfo = info.reduce((m, s) => Math.max(m, s.replace(/\x1b\[[0-9;]*m/g, '').length), 0);
  const blockWidth = logoWidth + gap.length + longestInfo;
  const padLeft = Math.max(0, Math.floor((termCols - blockWidth) / 2));
  const padStr = " ".repeat(padLeft);

  return lines.map(l => padStr + l).join("\r\n") + "\r\n";
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
    return "theme: usage: theme bg <color> | theme font <jetbrains|ubuntu|times|dosis> | theme reset\r\n";
  }
  const sub = args[0];
  if (sub === 'reset') {
    currentBg = CONFIG.DEFAULT_BG;
    currentFg = CONFIG.DEFAULT_FG;
    currentFontKey = CONFIG.DEFAULT_FONT;
    applyTheme(currentBg, currentFg, currentFontKey);
    return "theme: reset to default\r\n";
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
      return "theme: usage: theme font <jetbrains|ubuntu|times|dosis>\r\n";
    }
    currentFontKey = fontKey;
    applyTheme(currentBg, currentFg, currentFontKey);
    return `theme: font set to ${fontKey}\r\n`;
  }
  return `theme: unknown subcommand: ${sub}\r\n`;
}

// =====================================================================
// SUDO
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

// =====================================================================
// RM -RF EASTER EGG
// =====================================================================
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
    "Scanning for leftover PJSEKA gooners and exterminate them",
    "Bringing peaces back to my brain",
    "yo hop on fh6",
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

  // body area is everything between title bar and footer bar
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

  // move cursor to last row and print footer bar, anchors it to viewport bottom
  term.write(`\r\n\x1b[7m${footerBar}\x1b[0m`);
}

function exitNano() {
  nanoActive = false;
  nanoLines = [];
  term.write('\x1b[2J\x1b[H');
  printPrompt();
}

// =====================================================================
// INPUT HANDLING
// =====================================================================
term.write("\x1b[1;33m===== You sure you wanna explore this abomination of a shell ? =====\x1b[0m\r\n");
term.write("Execute 'help' to list all of the posibilities that you can [REDACTED] youself up.\r\n");
printPrompt();

term.onData((data) => {
  if (blockInput) return;

  if (nanoActive) {
    // only Ctrl+X (0x18) exits, everything else ignored, read only
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
  else if (data === '\x01') { // Ctrl+A, start of line
    term.write('\x1b[' + currentLine.length + 'D');
    cursorPos = 0;
  }
  else if (data === '\x05') { // Ctrl+E, end of line
    cursorPos = currentLine.length;
  }
  else if (data === '\x15') { // Ctrl+U, clear line
    clearInputLine();
    currentLine = '';
    cursorPos = 0;
  }
  else if (data === '\x0c') { // Ctrl+L, clear screen
    term.write('\x1b[2J\x1b[H');
    printPrompt();
    term.write(currentLine);
  }
  else if (data === '\x03') { // Ctrl+C, cancel current line
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
  else if (data === '\x1b[H' || data === '\x1bOH') { // Home
    term.write('\x1b[' + currentLine.length + 'D');
  }
  else if (data === '\x1b[F' || data === '\x1bOF') { // End
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

function handleTabAutocomplete() {
  const tokens = currentLine.split(/\s+/);
  if (tokens.length === 0 || currentLine === '') return;

  const lastToken = tokens[tokens.length - 1] || '';
  const isFirstWord = tokens.length === 1 && !currentLine.endsWith(' ');

  let pool = [];
  if (isFirstWord) {
    pool = ['help', 'ls', 'cd', 'pwd', 'cat', 'echo', 'whoami', 'cowsay',
      'supersekretlink', 'clear', 'rm', 'touch', 'mkdir', 'fastfetch', 'btop',
      'mv', 'cp', 'chmod', 'rmdir', 'credit', 'old-website', 'sudo', 'theme',
      'nano', 'python3'];
  } else {
    pool = Object.keys(currentDirNode.children || {});
  }

  const matches = pool.filter(item => item.startsWith(lastToken));

  if (matches.length === 1) {
    const completion = matches[0].slice(lastToken.length);
    currentLine += completion;
    term.write(completion);

    const itemInstance = (currentDirNode.children || {})[matches[0]];
    if (isFirstWord || (itemInstance && itemInstance.type === 'dir')) {
      currentLine += ' ';
      term.write(' ');
    }
  }
}

function resolvePath(name) {
  // supports simple relative paths
  const parts = name.split('/').filter(Boolean);
  let node = currentDirNode;
  for (const part of parts) {
    if (!node.children || !node.children[part]) return null;
    node = node.children[part];
  }
  return node;
}

function processInput(line) {
  const tokens = line.split(/\s+/).filter(Boolean);
  term.write('\r\n');

  if (tokens.length === 0) {
    printPrompt();
    return;
  }

  const cmd = tokens[0];
  const args = tokens.slice(1);
  const structuralArgs = args.filter(arg => !arg.startsWith('-'));
  const targetName = structuralArgs[0];

  // sudo prefix handling
  if (cmd === 'sudo') {
    beep();
    startRainbowTheme();
    const rest = args.join(' ');
    if (rest.trim() === 'rm -rf /') {
      runRmRfSequence();
      return;
    }
    term.write(`\x1b[1;32m[sudo] password for aretzera: \x1b[0m(enjoy :>)\r\n`);
    if (rest.trim()) {
      term.write(`Executing as root: ${rest}\r\n`);
    }
    printPrompt();
    return;
  }

  if (cmd === 'btop') {
    term.write("\x1b[1;31mGo back to Arch, yall weird as hell.\x1b[0m\r\n");
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
      term.write("  sudo [cmd]       Run as root\r\n");
      term.write("  theme bg <c>     Set terminal background color\r\n");
      term.write("  theme fg <c>     Set terminal foreground color\r\n");
      term.write("  theme font <f>   Set font: jetbrains, ubuntu, times, dosis\r\n");
      term.write("  theme reset      Reset theme to default\r\n");
      term.write("  nano [file]      Open file in nano viewer\r\n");
      term.write("  python3 [file]   Run a python script\r\n");
      break;

    case 'clear':
      term.write('\x1b[2J\x1b[H');
      break;

    case 'pwd':
      term.write('/' + dirHistory.map(node => node.name).join('/') + '\r\n');
      break;

    case 'whoami':
      term.write(`Identity: ${IDENTITY.fullName}\r\n`);
      term.write(`Contact:  ${IDENTITY.email}\r\n`);
      term.write(`Quote:    "${IDENTITY.quote}"\r\n`);
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

    case 'supersekretlink':
      term.write("Redirecting to da file...\r\n");
      window.location.href = CONFIG.SUPERSEKRET_URL;
      break;

    case 'credit':
      term.write("This whole thing is vibe-coded(im sorry 🥀 ), I just saw some post on Reddit about this and stumbled across a website called miggshell, it looks cool and thought I could make one like this\r\n");
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
      return; // nano takes over screen, skip printPrompt
    }

    case 'python3':
    case 'python': {
      if (!targetName) {
        term.write(`${cmd}: missing script argument\r\n`);
        break;
      }
      const node = resolvePath(targetName);
      if (!node || node.type !== 'file' || !targetName.endsWith('.py')) {
        term.write(`${cmd}: can't open file '${targetName}': [Errno 2] No such file or directory\r\n`);
        break;
      }
      if (targetName.endsWith('random.py')) {
        const n = Math.floor(Math.random() * 100) + 1;
        term.write(`${n}\r\n`);
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
      const chosenNode = currentDirNode.children ? currentDirNode.children[targetName] : null;
      if (chosenNode && chosenNode.type === 'dir') {
        chosenNode.name = targetName;
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
      const targetNode = resolvePath(targetName);
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
