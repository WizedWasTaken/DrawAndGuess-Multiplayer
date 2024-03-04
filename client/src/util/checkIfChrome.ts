export const isChrome = checkBrowser()

function checkBrowser() {
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)

  if (!isChrome) {
    document.body.classList.add('fast-blink')
  }
  return isChrome
}