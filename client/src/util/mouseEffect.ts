let cursorX = 0
let cursorY = 0

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX
  cursorY = e.clientY
  mouseEffect()
})

/**
 * @returns {void}
 * @description - This function moves the cursor
 */
export function mouseEffect(): void {
  const cursor = document.querySelector('.cursor') as HTMLElement
  cursor.style.left = cursorX + 'px'
  cursor.style.top = cursorY + 'px'
}
