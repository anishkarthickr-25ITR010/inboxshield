// Privacy Gate Content Script - Canvas & WebGL Anti-Fingerprinting Trap

(function() {
  console.log('[Privacy Gate Content Script] Active on:', window.location.hostname);

  // Trap Canvas HTML5 API readout
  const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
  HTMLCanvasElement.prototype.toDataURL = function() {
    console.warn('[Privacy Gate] Intercepted HTMLCanvasElement.toDataURL() call.');
    try {
      chrome.runtime.sendMessage({ type: 'FINGERPRINT_DETECTED', details: 'Canvas toDataURL' });
    } catch(e) {}
    return originalToDataURL.apply(this, arguments);
  };
})();
