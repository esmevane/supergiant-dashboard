class BackgroundPlanet {
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

      // Planet Atmosphere
      let atmosGrad = context.createRadialGradient(
        canvas.width * 0.5,
        canvas.width * 2,
        canvas.width * 1.75,
        canvas.width * 0.5,
        canvas.height,
        0)
      atmosGrad.addColorStop(0,'rgba(255, 255, 255, 0)')
      atmosGrad.addColorStop(1.0,'rgba(255, 255, 255, 0.2)')
      context.fillStyle = atmosGrad
      context.beginPath()
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.closePath()

      // Planet
      let planetGrad = context.createLinearGradient(0, 0, canvas.width, 0)
      planetGrad.addColorStop(0,'#5d32bd')
      planetGrad.addColorStop(1,'#954fcc')
      context.beginPath()
      context.arc(
        canvas.width * 0.5,
        canvas.width * 4.5,
        canvas.width * 4,
        0,
        2 * Math.PI)
      context.fillStyle = planetGrad
      context.fill()
      context.closePath()
    }

    return canvas
  }
}

export const backgroundPlanet = new BackgroundPlanet
