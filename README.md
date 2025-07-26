# Leetcode-Focus-Lock
LeetCode Focus Lock is a productivity-focused Chrome extension that helps you stay fully engaged while solving coding problems on LeetCode. It prevents distractions, detects tab switches, blocks websites like YouTube or StackOverflow, and discourages cheating by locking you into a fullscreen, focused experience.

# 🚫 LeetCode Focus Lock 🧠

> A Chrome Extension to enforce 100% focus while solving LeetCode problems — no distractions, no cheating.

## 📌 Features

- ✅ **Fullscreen Lock Mode**: Automatically enables fullscreen mode when a LeetCode problem is opened.
- ❌ **Block Distractions**: Prevents access to sites like YouTube, StackOverflow, ChatGPT, and Gemini.
- 🚫 **Disable Cheating Tools**: Hides solution tabs, disables copying, right-click, and DevTools access.
- ⚠️ **Violation Tracking**: Counts tab switches, fullscreen exits, and other cheating attempts.
- 🔒 **Cheater Detection Overlay**: Locks the screen if violations exceed a limit.
- ♻️ **Auto-Reset on Reload**: Resets violation status when the extension is restarted or disabled.

## 🛠 Technologies Used

- Manifest V3
- JavaScript (Vanilla)
- Chrome Extension APIs:
  - `tabs`
  - `storage`
  - `scripting`
  - `webNavigation`
  - `runtime`

## 🧩 How It Works

1. When you open any LeetCode problem:
   - The extension activates fullscreen mode.
   - It hides the “Solution” and “Discuss” tabs.
   - It listens for user violations (e.g., tab switching, exiting fullscreen).

2. If the user tries to:
   - Visit restricted sites (YouTube, StackOverflow, etc.) → the tab is **closed**.
   - Leave fullscreen or switch tabs → **violation count increases**.

3. If the violation count exceeds the limit:
   - The user is marked a **cheater**.
   - A fullscreen overlay is displayed and interaction is blocked.

## 🚀 Getting Started (Development)

1. **Clone this repo**:
   ```bash
   git clone https://github.com/yourusername/leetcode-focus-lock.git
   cd leetcode-focus-lock
