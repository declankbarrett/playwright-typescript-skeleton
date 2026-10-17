# Prerequisites

This document lists everything needed to set up and run the
`playwright-typescript-skeleton` repository, along with the exact commands
to install/verify each prerequisite.

## 1. Required Tooling

| Tool | Minimum Version | Why it's needed |
|---|---|---|
| **Git** | Any recent version | Clone the repository |
| **Node.js** | >= 18 (20.x LTS recommended) | Runs the test framework and npm |
| **npm** | >= 9 | Installs dependencies, bundled with Node.js |

### Check if already installed

```bash
git --version
node --version
npm --version
```

### Install if missing

**macOS (Homebrew):**
```bash
brew install git
brew install node@20
```

**Windows (winget):**
```bash
winget install --id Git.Git -e
winget install --id OpenJS.NodeJS.LTS -e
```

**Linux (Debian/Ubuntu):**
```bash
sudo apt update
sudo apt install -y git
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

## 2. IDE Installation (Recommended)

**Visual Studio Code** is the recommended editor — it has first-party
Playwright and TypeScript support.

**macOS (Homebrew):**
```bash
brew install --cask visual-studio-code
```

**Windows (winget):**
```bash
winget install --id Microsoft.VisualStudioCode -e
```

**Linux (Debian/Ubuntu):**
```bash
sudo apt update
sudo apt install -y wget gpg
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg
echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" | sudo tee /etc/apt/sources.list.d/vscode.list
sudo apt update
sudo apt install -y code
```

### Recommended Extensions

Install via the command line once VS Code is set up:

```bash
code --install-extension ms-playwright.playwright
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
```

| Extension | Purpose |
|---|---|
| `ms-playwright.playwright` | Run/debug Playwright tests, pick locators, view traces from the editor |
| `dbaeumer.vscode-eslint` | Lint TypeScript/JavaScript (if linting is added later) |
| `esbenp.prettier-vscode` | Code formatting |

## 3. Project Setup

Once Git and Node.js/npm are installed:

```bash
# Clone the repository
git clone <repo-url>
cd playwright-typescript-skeleton

# Install project dependencies (Playwright, TypeScript, dotenv, etc.)
npm install

# Install Playwright's browser binaries (Chromium, Firefox, WebKit/Edge)
npx playwright install
```

> On Linux, Playwright may also prompt for missing OS-level dependencies.
> If so, run:
> ```bash
> npx playwright install-deps
> ```

## 4. Verify the Setup

```bash
npm run test:local
```

This runs the suite against the public demo app
[saucedemo.com](https://www.saucedemo.com), so no local application or
database setup is required.

## Summary of Commands

```bash
# 1. Verify tooling
git --version
node --version
npm --version

# 2. Clone and install
git clone <repo-url>
cd playwright-typescript-skeleton
npm install
npx playwright install

# 3. Run tests
npm run test:local
```
