// ============================================================
// background.js - KHackBar Firefox Edition
// ============================================================

// ---- Compatibility wrapper ----
const api = window.browser || window.chrome;

// ---------- Context Menus on Install ----------
api.runtime.onInstalled.addListener(() => {
  // ---------- Context Menus ----------
  api.contextMenus.create({
    id: 'khackbar_parent',
    title: 'KHackBar',
    contexts: ['editable']
  });

  api.contextMenus.create({
    id: 'inject_sqli',
    parentId: 'khackbar_parent',
    title: "Inject SQLi (' OR 1=1-- -)",
    contexts: ['editable']
  });

  api.contextMenus.create({
    id: 'inject_xss',
    parentId: 'khackbar_parent',
    title: "Inject XSS (<script>alert(1)</script>)",
    contexts: ['editable']
  });

  api.contextMenus.create({
    id: 'b64_encode',
    parentId: 'khackbar_parent',
    title: 'Base64 Encode',
    contexts: ['editable']
  });

  api.contextMenus.create({
    id: 'b64_decode',
    parentId: 'khackbar_parent',
    title: 'Base64 Decode',
    contexts: ['editable']
  });
});

// ---------- Context Menu Click Handler ----------
api.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab || !tab.id) return;

  switch (info.menuItemId) {
    case 'inject_sqli':
      api.tabs.executeScript(tab.id, {
        code: '(' + function(payload) {
          const el = document.activeElement;
          if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) {
            const start = el.selectionStart;
            const end = el.selectionEnd;
            const val = el.value || el.textContent || '';
            el.value = val.substring(0, start) + payload + val.substring(end);
            el.selectionStart = el.selectionEnd = start + payload.length;
            el.focus();
          }
        } + ')("' + "' OR 1=1-- -" + '")'
      }).catch(err => console.error('KHackBar: inject_sqli error', err));
      break;

    case 'inject_xss':
      api.tabs.executeScript(tab.id, {
        code: '(' + function(payload) {
          const el = document.activeElement;
          if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) {
            const start = el.selectionStart;
            const end = el.selectionEnd;
            const val = el.value || el.textContent || '';
            el.value = val.substring(0, start) + payload + val.substring(end);
            el.selectionStart = el.selectionEnd = start + payload.length;
            el.focus();
          }
        } + ')("<script>alert(1)<\/script>")'
      }).catch(err => console.error('KHackBar: inject_xss error', err));
      break;

    case 'b64_encode':
      api.tabs.executeScript(tab.id, {
        code: '(' + function() {
          const el = document.activeElement;
          if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) {
            const start = el.selectionStart;
            const end = el.selectionEnd;
            const val = el.value || el.textContent || '';
            const selectedText = val.substring(start, end);
            if (selectedText) {
              const encoded = btoa(unescape(encodeURIComponent(selectedText)));
              el.value = val.substring(0, start) + encoded + val.substring(end);
              el.selectionStart = el.selectionEnd = start + encoded.length;
              el.focus();
            }
          }
        } + ')()'
      }).catch(err => console.error('KHackBar: b64_encode error', err));
      break;

    case 'b64_decode':
      api.tabs.executeScript(tab.id, {
        code: '(' + function() {
          const el = document.activeElement;
          if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) {
            const start = el.selectionStart;
            const end = el.selectionEnd;
            const val = el.value || el.textContent || '';
            const selectedText = val.substring(start, end);
            if (selectedText) {
              try {
                const decoded = decodeURIComponent(escape(atob(selectedText)));
                el.value = val.substring(0, start) + decoded + val.substring(end);
                el.selectionStart = el.selectionEnd = start + decoded.length;
                el.focus();
              } catch (e) {
                console.error('KHackBar: Base64 decode failed', e);
              }
            }
          }
        } + ')()'
      }).catch(err => console.error('KHackBar: b64_decode error', err));
      break;
  }
});

// ---------- Message Handler (POST execution) ----------
api.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'execute_post') {
    fetch(message.url, {
      method: 'POST',
      headers: { 'Content-Type': message.contentType },
      body: message.data
    })
      .then(async (response) => {
        const responseText = await response.text();
        sendResponse({
          success: true,
          status: response.status,
          statusText: response.statusText,
          length: responseText.length
        });
      })
      .catch((err) => {
        sendResponse({ success: false, error: err.message });
      });
    return true; // keep channel open for async sendResponse
  }

  // Headers message handler — Firefox support notice
  if (message.type === 'apply_headers' || message.type === 'clear_headers') {
    sendResponse({ success: false, error: 'Header injection via declarativeNetRequest is not supported in Firefox. Firefox support coming soon.' });
    return true;
  }
});
