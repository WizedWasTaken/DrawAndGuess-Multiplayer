let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    console.log(e.clientX, e.clientY)
  cursorX = e.clientX;
  cursorY = e.clientY;
  mouseEffect();
});

export function mouseEffect() {
    console.log(cursorX, cursorY)
  const cursor = document.querySelector('.cursor') as HTMLElement;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
}