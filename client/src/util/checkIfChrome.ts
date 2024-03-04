export const isChrome = checkBrowser()

/**
 * Check if the browser is Chrome
 * @returns {boolean} - Whether the browser is Chrome or not
 * @description - This function checks if the browser is Chrome and adds a class to the body if it's not
 */
function checkBrowser() {
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)

  if (!isChrome) {
    document.body.classList.add('fast-blink')
  }
  return isChrome
}
