# 🎯 KHackBar — The Ultimate Web Security Auditor's Sidekick

> **Built for Firefox WebExtensions** • Red Team Ready • Lightweight & Professional • **v1.5.1 Pro**

**KHackBar** is a modular, toolbar popup-based web security testing extension for **Firefox / Firefox Developer Edition**. Designed for penetration testers, bug bounty hunters, and security researchers, it provides a comprehensive arsenal of payloads, encoders, request modifiers, and cookie manipulation tools — all within a sleek Red Team-themed interface. The extension follows a modular architecture where feature-specific logic is split into dedicated files, keeping the codebase maintainable and reducing the risk of large single-file bugs.

---

## 🔥 Key Features

### 📦 Advanced Payload Library
Categorized payloads for rapid injection testing across multiple attack vectors:

| Category | Description |
|----------|-------------|
| **SQLi** | Advanced DIOS & WAF bypass strings for database fingerprinting and exploitation |
| **XSS** | Cross-Site Scripting vectors (reflected, stored, DOM-based) |
| **LFI** | Local File Inclusion traversal sequences and wrappers |
| **SSRF** | Cloud metadata endpoints, protocol smuggling (Gopher / Dict) |
| **SSTI** | Server-Side Template Injection payloads (Jinja2, Twig, etc.) |
| **NoSQL** | NoSQL authentication bypass and injection vectors |
| **OSCI** | Operating System Command Injection payloads for RCE testing |

### 🧪 Custom Header Configuration
The **Headers** panel allows you to define and save custom headers for testing. Note: In the Firefox build, header injection via Chrome's `declarativeNetRequest` API is **not supported**. The panel is preserved for future compatibility — see the [Firefox Limitations](#firefox-limitations) section below.

### 🍪 Interactive Cookie Editor
View, edit, create, and delete cookies in real-time using the **`cookies`** API:
- Inspect all cookies for the current domain
- Modify cookie values, paths, expiration, and security flags
- Instantly apply changes to test session handling and authentication flows

### 🌐 Versatile POST Execution
Craft and send HTTP POST requests directly from the extension with support for:
- **JSON** (`application/json`)
- **URL-encoded** (`application/x-www-form-urlencoded`)
- **Multipart** (`multipart/form-data`)

### 🔐 Encoders & Decoders
Built-in encoding/decoding tools for quick payload transformation:
- **Hex** encode/decode
- **Base64** encode/decode
- **HTML Entity** encode/decode
- **Unicode** escape/unescape
- **URL** encode/decode

---

## 🚀 Pro Features (v1.5+)

### 🖱️ Right-Click Context Menu
Supercharge your workflow with instant right-click access:
- Right-click on **any input field** or **highlighted text** on a web page to open the KHackBar context menu
- **Inject Payloads** directly into input fields without manually copying/pasting
- **Base64 Encode/Decode** selected text on the fly
- Streamlines testing by eliminating context-switching between tabs

### ⚡ Automated Fuzzer / Repeater
The new **Fuzzer** tab turns KHackBar into a powerful automated testing engine:
- Use the `[FUZZ]` marker in your target URL to designate the injection point
- Paste multiple payloads (one per line) into the payloads text area
- Click **Start Fuzzing** to automatically fire each payload at the target
- **Real-time logs** display Status Code and Response Length for each request
- Instantly spot anomalies (different status codes, unusual response sizes) that signal vulnerabilities
- Click **Clear Results** to reset the output panel

### 🎯 Target Scoping & Safety
Prevent accidental testing on unauthorized domains with the new **Scoping** feature:
- Found under the **Settings** tab
- Add allowed domains to your scope list (e.g., `*.example.com`)
- Enable scoping to block requests to any domain not in your allowed list
- Adds a crucial safety layer during live engagements — no more embarrassing misfires on production systems
- Scope rules are persisted via the `storage` API and survive browser restarts

### 💾 Configuration Management
Backup and restore your entire KHackBar configuration with a single click:
- **Export** saves all your headers, scope rules, and settings as a downloadable **JSON** file
- **Import** restores a previously exported configuration from a JSON file
- Perfect for team collaboration — share standardized configs across your red team
- No more re-entering custom headers or scope rules between sessions

---

## 🎨 Enhanced Visual Identity (v1.5+)

The extension has been fully re-skinned with a **Red Team / Hacker aesthetic** and further optimized for a professional experience:
- 🔴 Dark red and black color palette (`#dc2626`, `#1a1a2e`, `#0f0f1a`)
- ⚡ Optimized **inline SVG icons** for a lightweight, crisp experience
- 🖥️ Distracted-font-style status indicators and terminal-inspired UI elements
- 🧩 **Dedicated panels** for Fuzzing, Headers, Cookies, and Settings — keeping the interface clean and organized
- 🚫 No external dependencies — all assets are bundled within the extension

---

## 🔥 Firefox Limitations

> **Important notes for Firefox users:**

* **Header Injection:** The Chrome `declarativeNetRequest` modifyHeaders API is **not supported** in Firefox WebExtensions. The Headers panel currently displays a Firefox compatibility notice and saves header configurations for future use. Header configuration data is preserved in storage, and applying headers will show a notice about this limitation.
* **Future Support:** Future Firefox versions may implement header modification differently via the `webRequest` and `webRequestBlocking` APIs. This extension is structured to support that path when it becomes available.
* All other features (payloads, fuzzer, cookies, encoders, scoping, context menus) work fully in Firefox.

---


## 🚀 How to Use

### Basic Usage
1. **Click the KHackBar icon** in your Firefox toolbar to open the popup.
2. **Navigate to a target website** — the extension will activate automatically.
3. **Select an attack vector** from the payload library dropdown.
4. **Inject, encode, or modify** requests using the built-in tools.
5. **Inspect and manipulate cookies** in the Cookie Editor tab.
6. **Execute POST requests** with custom headers and body types.

### 🔒 Setting Up Scope (Before Starting a Pentest)
1. Open the **Settings** tab in the KHackBar popup.
2. In the **Target Scope** section, add domains you are authorized to test (e.g., `*.example.com` or `https://testsite.local/*`).
3. Toggle scoping **ON** to activate the restriction.
4. Any request to a domain **not** in your scope list will be blocked — keeping your testing safe and compliant.
5. Scope rules are automatically saved and will persist across browser sessions.

### 🔁 Using the Fuzzer with `[FUZZ]` Syntax
1. Navigate to the **Fuzzer** tab.
2. In the **Target URL** field, enter your URL with `[FUZZ]` as the injection marker.  
   *Example:* `https://example.com/page?id=[FUZZ]&debug=false`
3. In the **Payloads** text area, enter one payload per line.  
   *Example:*  
   ```
   1' OR '1'='1
   1" OR 1=1--
   <script>alert(1)</script>
   ```
4. Click **Start Fuzzing** to begin. The results panel will show real-time logs with **Status Code** and **Response Length** for each payload.
5. Review the results — payloads that produce unique responses (different status codes or response sizes) are worth investigating further.
6. Click **Clear Results** to reset before your next round.

> ⚡ **Pro Tip:** Combine custom headers with payloads to bypass WAFs and test edge-case server logic. Note that header injection requires Chrome's `declarativeNetRequest` — see the [Firefox Limitations](#firefox-limitations) section.

---

## 💻 Technical Requirements

| Requirement | Details |
|-------------|---------|
| **Browser** | Firefox / Firefox Developer Edition |
| **Extension Format** | Firefox WebExtension (Manifest V3 compatible) |
| **Permissions** | `tabs`, `activeTab`, `storage`, `cookies`, `contextMenus`, `webRequest`, `webRequestBlocking` |
| **Permissions** | `storage` — for persisting scope rules, headers, and configuration data |
| **Permissions** | `contextMenus` — for right-click context menu integration |
| **Host Access** | `<all_urls>` — required for payload injection and network request modification |

---

## ⚠️ Professional Disclaimer

> **This tool is for authorized penetration testing and educational purposes only.**
>
> Unauthorized use of this extension against systems you do not own or have explicit written permission to test is **illegal** and **unethical**. The developers assume **no liability** for any misuse or damage caused by this software.
>
> By using KHackBar, you agree to:
> - Only test systems you own or have written authorization to test
> - Comply with all applicable local, state, and federal laws
> - Use the tool responsibly and ethically in accordance with industry best practices (e.g., OWASP, PTES)

---

## 🧬 Repository Structure

```
KHackBar/
├── manifest.json          # Firefox WebExtension manifest config
├── background.js          # Background script for event handling
├── popup.html             # Toolbar popup UI markup
├── popup.js               # Main initializer
├── payloads.js            # Payload library definitions
├── ui.js                  # UI rendering, menu switching, DOM helpers
├── scope.js               # Target scope validation
├── audit.js               # Audit log storage and rendering helpers
├── fuzzer.js              # Fuzzer / repeater logic
├── headers.js             # Custom header configuration management
├── cookies.js             # Cookie viewer/editor logic
├── settings.js            # Scope, config import/export, audit settings
└── README.md              # Documentation
```

---

## 🧩 Modular Architecture

KHackBar follows a clean modular architecture to keep the codebase organized and maintainable:

| Module | Responsibility |
|--------|---------------|
| **`popup.js`** | Application initializer — wires together all modules on startup |
| **`payloads.js`** | Defines the categorized payload library (SQLi, XSS, LFI, etc.) |
| **`ui.js`** | Handles UI rendering, menu switching, DOM manipulation helpers |
| **`scope.js`** | Validates target URLs against the allowed scope list |
| **`audit.js`** | Manages audit log storage and renders audit entries |
| **`fuzzer.js`** | Implements the automated fuzzer / repeater engine |
| **`headers.js`** | Manages custom header configuration (Firefox compatibility notice applies) |
| **`cookies.js`** | Provides cookie viewing, editing, and creation logic |
| **`settings.js`** | Handles scope configuration, config import/export, and audit settings |

Each module encapsulates a distinct feature domain and communicates through well-defined interfaces. This separation of concerns improves maintainability, makes testing easier, and significantly reduces the risk of large single-file bugs — such as the critical XSS vulnerability that was recently patched in the HTML encoder.

---

## 🔧 Building for Firefox Add-ons (AMO)

To distribute KHackBar as a signed add-on for Firefox:

1. Ensure the `manifest.json` contains the `browser_specific_settings` block with the correct Gecko ID.
2. Run a validation check using the [Mozilla Add-on Validator](https://addons.mozilla.org/en-US/developers/addon/validate/) or the `web-ext` CLI tool.
3. Package the extension by creating a ZIP of all source files (excluding `.git`, `node_modules`, etc.).
4. Submit the package to [Mozilla Add-ons (AMO)](https://addons.mozilla.org/).
5. After review, the signed `.xpi` will be available for installation.

---

<p align="center">
  <sub>Crafted with 🩸 for the Red Team community.</sub>
  <br>
  <sub>🔴 **KHackBar** — Audit hard. Stay legal.</sub>
</p>
