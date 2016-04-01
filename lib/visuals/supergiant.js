import { drawParticles, Particle } from './Particle'

class Supergiant {
  constructor() {
    let amount = 300
    let radius = () => window.innerHeight / 2
    let location = () => ({ x: window.innerWidth / 2, y: window.innerHeight })
    let speed = () => {
      let value = Math.random() * 0.5

      return Math.round(Math.random()) === 0 ? value : value * -1
    }

    this.id = null
    this.particles = Particle.create({ amount, location, speed, radius })
  }

  start() { this.id = setInterval(update, 65) }

  stop() {
    clearInterval(this.id)
    clear()
  }

  update(context) {
  	context.globalCompositeOperation = "source-over"
  	context.fillStyle = "rgba(255, 255, 255, 0)"
  	context.fillRect(0, 0, window.innerWidth, window.innerHeight)
  	context.globalCompositeOperation = "lighter"

    this.particles = drawParticles(this.particles, context)
  }
}

export const supergiant = new Supergiant

function clear() {
  var canvas = document.getElementById("supergiant")
  var context = canvas.getContext("2d")

  context.clearRect(0, 0, window.innerWidth, window.innerHeight)
}

function update() {
  var canvas = document.getElementById("supergiant")
  var context = canvas.getContext("2d")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  supergiant.update(context)
}
