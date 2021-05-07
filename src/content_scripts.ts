const injectScript = (file: string, node: string): HTMLScriptElement => {
  const th = document.getElementsByTagName(node)[0];
  const s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  return th.appendChild(s);
};

injectScript(chrome.runtime.getURL('injected.js'), 'body');
