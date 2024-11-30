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
function resultShow(sec) {
  let index = 0
  const chars = getElement(".words")?.querySelectorAll(".char")
  chars?.forEach((char, i) => {
    if (char.classList.contains("current")) index = i
  })
  console.log(index)
  app.innerHTML = `
      <h1 >${(index
    ) / sec
    }

      </h1>
      <p>${chars.length, Array.from(chars).findIndex(element => element.classList.contains('current'))
    }<p>
`
}
function PlayGame() {
  const chars = generateChars(500)
  app.innerHTML = `
<div> <div class="timer">00:00</div>    
<div class="words-container">
      <pre class="words"></pre>
    </div>
</div>
`
  const words = getElement(".words")
  chars.forEach(char => {
    words.innerHTML += `<span class="char">${char}</span>`
  });
  words?.querySelectorAll(".char")[0].classList.add("current");
  startTimer(30)
}
function startTimer(seconds: number) {
  const timerElement = getElement(".timer")
  let remainingTime = seconds;

  const interval = setInterval(() => {
    const minutes = Math.floor(remainingTime / 60);
    const secs = remainingTime % 60;

    timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    remainingTime--;

    if (remainingTime < 0) {
      if (playing) {
        resultShow(seconds)
        playing = false
      } else {
        closeGame()
      }
      clearInterval(interval);
      timerElement.textContent = "Time's Up!";
    }
  }, 1000);
}
