import './style.css'

const app = document.querySelector<HTMLElement>('#app')
const getElement = (element: string) => app?.querySelector(element)
let playing = false;

window.addEventListener("keyup", (event: KeyboardEvent) => {
  console.log(event)
  if (playing === false && event.key === "Enter") {
    PlayGame()
    playing = true
  } else if (playing === true && event.key === "Escape") {
    closeGame()
    playing = false
  } else if (playing && event.key === "Backspace") {
    getElement(".words")?.querySelector(".current")?.previousSibling?.classList.remove("incorrect")
    getElement(".words")?.querySelector(".current")?.previousSibling?.classList.remove("correct")
    getElement(".words")?.querySelector(".current")?.previousSibling?.classList.add("current")
    getElement(".words")?.querySelector(".current")?.nextSibling?.classList.remove("current")

  } else if (playing) {
    if (getElement(".words")?.querySelector(".current")?.textContent === event.key)
      getElement(".words")?.querySelector(".current")?.classList.add("correct")
    else
      getElement(".words")?.querySelector(".current")?.classList.add("incorrect")
    getElement(".words")?.querySelector(".current")?.nextSibling?.classList.add("current")
    getElement(".words")?.querySelector(".current")?.classList.remove("current")
  }
})
function generateChars(length: number) {
  let output = []
  const chars = "  1234567890"
  for (let i = 0; i < length; i++) {
    output.push(chars[Math.floor(Math.random() * chars.length)])
  }
  return output;
}

function closeGame() {
  app.innerHTML = `
      <h1 >Start Game</h1>
`
}

function PlayGame() {
  const chars = generateChars(500)
  app.innerHTML = `
    <div class="words-container">
      <pre class="words"></pre>
    </div>
`
  const words = getElement(".words")
  chars.forEach(char => {
    words.innerHTML += `<span class="char">${char}</span>`
  });
  words?.querySelectorAll(".char")[0].classList.add("current");
}
