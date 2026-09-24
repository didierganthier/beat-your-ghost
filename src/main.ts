import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('App container not found')
}

app.innerHTML = `
  <h1>Beat Your Ghost</h1>
  <p>Your past moves will come back to haunt you.</p>
  <canvas id="game" width="800" height="500"></canvas>
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

const draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)

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

  draw()
})

draw()