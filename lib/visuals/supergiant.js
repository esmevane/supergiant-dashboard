import { drawParticles, Particle } from './Particle'

export class BackgroundSupergiant {
  constructor() {
    let amount      = 300
    let location    = () => ({ x: window.innerWidth / 2, y: window.innerHeight })
    let speed       = this.setSpeed
    let radius      = () => window.innerHeight / 2
    this.intervalId = null
    this.anchor     = window.document.body
    this.canvas     = this.createCanvas()
    this.target     = null
    this.particles  = Particle.create({ amount, location, speed, radius })
  }

  start() {
    this.target = this.anchor.appendChild(this.canvas)
    this.intervalId = setInterval(
      (function(self) {
        return function() {
          self.updateOnInterval()
        }
      })(this),
      65
    )
  }

  stop() {
    clearInterval(this.intervalId)
    if (this.target) this.target.remove(true)
  }

  setSpeed() {
    let value = Math.random() * 0.5
    return Math.round(Math.random()) === 0 ? value : value * -1
  }

  createCanvas() {
    let canvas       = document.createElement('canvas')
    canvas.id        = 'context-canvas'
    canvas.className = 'context-canvas'
    canvas.width     = window.innerWidth
    canvas.height    = window.innerHeight

    if (canvas.getContext) {
    }

    return canvas
  }

  update(context) {
  	context.globalCompositeOperation = "source-over"
  	context.fillStyle = "rgba(255, 255, 255, 0)"
  	context.fillRect(0, 0, window.innerWidth, window.innerHeight)
  	context.globalCompositeOperation = "lighter"

    this.particles = drawParticles(this.particles, context)
  }

  updateOnInterval() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    let context = this.canvas.getContext("2d")

    this.update(context)
  }
}
