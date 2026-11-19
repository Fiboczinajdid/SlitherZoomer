# SlitherZoomer

A userscript for [slither.io](http://slither.io) that lets you **zoom out**, **reduce lag**, **hide small food** and **keep your nickname**, all from a clean in-game menu.

It runs in your browser through **Tampermonkey** and only changes what *you* see on your screen. It doesn't send anything to the game server.

## Features

- **Zoom on start**: zoom from 0.15x to 2x with a slider, the mouse wheel or hotkeys. Your zoom is remembered, so every new round starts with it. Set it back to *auto* to use the game's normal zoom.
- **Render resolution (100% / 75% / 50%)**: the game draws a smaller image and stretches it to your screen. The view stays the same, but your computer has fewer pixels to draw. The picture gets a bit softer, and the game usually runs smoother on weaker PCs.
- **Hide small food**: hides the small dots and shows only the big mass left by dead snakes. Hidden food still exists, and you still eat it when you pass over it.
- **Hide menu in game**: the menu disappears while you play. A small **SZ** button in the top-left corner brings it back.
- **Fixed nickname**: the game sometimes forgets your nickname. SlitherZoomer fills it in for you.
- **Custom hotkeys**: change any hotkey in the settings.
- **9 languages**: English, Polski, Русский, Español, Português, Français, Deutsch, Türkçe, Bahasa Indonesia.

## Installation

### Step 1: Install Tampermonkey

Tampermonkey is a free browser extension that runs userscripts like this one. Get it for your browser:

| Browser | Where to get it |
|---|---|
| Chrome | [Chrome Web Store](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) |
| Microsoft Edge | [Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) |
| Firefox | [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/tampermonkey/) |
| Opera / Opera GX | Use the Chrome Web Store link above. Opera may first ask you to add *Install Chrome Extensions*, accept it. |
| Safari (Mac) | [Mac App Store](https://apps.apple.com/app/tampermonkey/id1482490089) (paid) |
| Brave, Vivaldi and other Chromium browsers | Use the Chrome Web Store link above |

You can also find all versions on [tampermonkey.net](https://www.tampermonkey.net/).

### Step 2: Allow userscripts (Chrome, Edge, Opera, Brave and other Chromium browsers)

Newer versions of Chromium-based browsers block userscripts until you allow them. If Tampermonkey shows a message like *"Please enable the 'Allow User Scripts' option"*, do **one** of these:

- **Option A (Chrome 138 and newer):** right-click the Tampermonkey icon → **Manage extension** → turn on **Allow User Scripts**.
- **Option B (any Chromium browser):** open your extensions page (`chrome://extensions`, `edge://extensions`, `opera://extensions`, `brave://extensions`) and turn on **Developer mode** in the top-right corner.

Then **restart the browser**. Firefox and Safari don't need this step.

More details: [Tampermonkey FAQ](https://www.tampermonkey.net/faq.php#Q209)

### Step 3: Install SlitherZoomer

**[Click here to install SlitherZoomer](https://raw.githubusercontent.com/Fiboczinajdid/SlitherZoomer/main/SlitherZoomer.user.js)**

Tampermonkey will open an install page. Click **Install**. That's it.

<details>
<summary>The install page didn't open? Add it manually</summary>

1. Open [SlitherZoomer.user.js](SlitherZoomer.user.js) and copy all of the code.
2. Click the Tampermonkey icon → **Create a new script**.
3. Delete everything in the editor, paste the code and press **Ctrl+S** (or **Cmd+S** on Mac).

</details>

### Step 4: Play

Open [slither.io](http://slither.io) (or refresh it if it was already open). The **SlitherZoomer** menu appears in the top-left corner.

## Controls

| Action | Default key |
|---|---|
| Zoom | Mouse wheel |
| Zoom in | `+` |
| Zoom out | `-` |
| Default zoom | `0` |
| Show / hide menu | `M` |
| Small food on / off | `F` |
| Change resolution | `R` |

To change a hotkey, click the **⚙ gear** in the menu, click the key next to an action and press the new key. **Esc** cancels, **Backspace** removes the hotkey. The mouse wheel zoom can't be changed (that's what the 🔒 lock means).

## Troubleshooting

**Nothing shows up on slither.io**
- Check that Tampermonkey is turned on and SlitherZoomer is enabled in its menu.
- On Chromium browsers, check that you did [Step 2](#step-2-allow-userscripts-chrome-edge-opera-brave-and-other-chromium-browsers) and restarted the browser.

**The menu looks broken or appears twice**
- Open the Tampermonkey dashboard and make sure you have only **one** copy of SlitherZoomer (and no older zoom scripts for slither.io). Delete the extra ones.

**When I zoom out far, the edges of the screen are empty**
- That's normal. The game server only sends you what's near your snake, so no script can show more than that. A zoom of about 0.4x–0.5x is usually the sweet spot.

**Still laggy**
- Set **Render resolution** to 50%.
- Click **Graphics** in the top-right corner of the slither.io start screen to switch the game to low quality. SlitherZoomer doesn't change this for you.
- If snakes jump around or react late, that's your connection to the server, not your PC. Try another server with **Choose Server**.

## Additional info

- **Unofficial project.** SlitherZoomer is a fan-made script. It is not affiliated with, endorsed by or connected to slither.io or its developers. "slither.io" is a name owned by its respective owners and is used here only to describe what this script works with.
- **Visual changes only.** The script only changes how the game looks on your own screen (zoom, render resolution, hiding small food) and fills in your nickname. It doesn't play for you, doesn't automate anything and doesn't send anything to the game server.
- **Use at your own risk.** Using browser scripts with online games may go against a game's rules. Please check the game's terms yourself before using SlitherZoomer. The authors are not responsible for any consequences of using it.
- **Game updates.** If a slither.io update changes the game's code, some features may stop working until the script is updated. The script is written so that the game itself keeps working.

## License

SlitherZoomer is released under the [MIT License](LICENSE). You're free to use, change and share it. It comes with no warranty.
