import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('App container not found')
}

app.innerHTML = `
  <h1>Beat Your Ghost</h1>
  <p>Your past moves will come back to haunt you.</p>
  <canvas id="game" width="800" height="500"></canvas>
  <p>Score: <span id="score">0</span></p>
`

const canvas = document.querySelector<HTMLCanvasElement>('#game')

if (!canvas) {
  throw new Error('Game canvas not found')
}

const context = canvas.getContext('2d')

if (!context) {
  throw new Error('Canvas drawing is unavailable')
}

const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
}

const scoreElement = document.querySelector<HTMLSpanElement>('#score')

if (!scoreElement) {
  throw new Error('Score display not found')
}

let score = 0

const target = {
  x: 0,
  y: 0,
  radius: 7,
}

const moveTarget = () => {
  target.x =
    target.radius + Math.random() * (canvas.width - target.radius * 2)

  target.y =
    target.radius + Math.random() * (canvas.height - target.radius * 2)
}

moveTarget()

const draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)

  context.fillStyle = '#facc15'
  context.beginPath()
  context.arc(target.x, target.y, target.radius, 0, Math.PI * 2)
  context.fill()

  context.fillStyle = '#38bdf8'
  context.beginPath()
  context.arc(player.x, player.y, player.radius, 0, Math.PI * 2)
  context.fill()
}

canvas.addEventListener('mousemove', (event) => {
  const bounds = canvas.getBoundingClientRect()

  const x = (event.clientX - bounds.left) * (canvas.width / bounds.width)
  const y = (event.clientY - bounds.top) * (canvas.height / bounds.height)

  player.x = Math.max(
    player.radius,
    Math.min(canvas.width - player.radius, x),
  )

  player.y = Math.max(
    player.radius,
    Math.min(canvas.height - player.radius, y),
  )

  const distance = Math.hypot(
    player.x - target.x,
    player.y - target.y,
  )

  if (distance <= player.radius + target.radius) {
    score += 1
    scoreElement.textContent = String(score)
    moveTarget()
  }

  draw()
})

draw()