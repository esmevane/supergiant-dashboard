class OrbitingPlanet {
  constructor() {
    this.anchor = window.document.body
    this.canvas = this.createCanvas('#000000')
    this.target = null
  }

  start() {
    this.target = this.anchor.appendChild(this.canvas)
  }

  stop() {
    if (this.target) this.target.remove(true)
  }

  updatePlanet(planetColor) {
    let newCanvas = createCanvas(planetColor)
    if (this.target) this.target.remove(true)
    this.target = this.anchor.appendChild(this.canvas)
  }

  createCanvas(planetColor) {
    let canvas       = document.createElement('canvas')
    canvas.id        = 'context-canvas'
    canvas.className = 'context-canvas'
    canvas.width     = window.innerWidth
    canvas.height    = window.innerHeight

    if (canvas.getContext) {
      let context = canvas.getContext('2d')

      // Star
      let grad = context.createRadialGradient(
        canvas.width,
        canvas.height * 0.67,
        canvas.height * 0.55,
        canvas.width,
        canvas.height * 0.55,
        0)
      grad.addColorStop(0,'rgba(255,255,255,0)')
      grad.addColorStop(0.1,'rgba(255,255,255,0.2)')
      grad.addColorStop(0.1999,'rgba(255,255,255,0.7)')
      grad.addColorStop(0.20,'rgba(216,216,216,1)')
      grad.addColorStop(1.0,'rgba(255,255,255,1)')
      context.fillStyle = grad
      context.beginPath()
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.closePath()

      // Orbital Path
      context.beginPath()
      context.arc(
        canvas.width,
        canvas.height * 0.67,
        canvas.height * 0.67,
        0,
        2 * Math.PI)
      context.strokeStyle = '#dddddd'
      context.setLineDash([2, 5])
      context.stroke()
      context.closePath()

      // Planet
      context.beginPath()
      context.arc(
        canvas.width - (canvas.height * 0.57),
        canvas.height * 0.33,
        canvas.height * 0.05,
        0,
        2 * Math.PI)
      context.fillStyle = planetColor
      context.fill()
      context.lineWidth = 2
      context.setLineDash([])
      context.strokeStyle = '#ffffff'
      context.stroke()
      context.closePath()
    }

    return canvas
  }
}

export const orbitingPlanet = new OrbitingPlanet
