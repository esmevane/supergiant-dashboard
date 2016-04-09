class OrbitingSatellite {
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

      // Planet
      context.beginPath()
      context.arc(
        canvas.width,
        canvas.height * 0.67,
        canvas.height * 0.40,
        0,
        2 * Math.PI)
      context.fillStyle = planetColor
      context.fill()
      context.lineWidth = 2
      context.setLineDash([])
      context.strokeStyle = '#ffffff'
      context.stroke()
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

      // Orbiting Planet
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

export const orbitingSatellite = new OrbitingSatellite
