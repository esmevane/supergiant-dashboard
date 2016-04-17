export class BackgroundPlanet {
  constructor(planetColor) {
    this.planetColor = planetColor
    this.anchor = window.document.body
    this.canvas = this.createCanvas(this.planetColor)
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

  createCanvas(color) {
    let canvas       = document.createElement('canvas')
    canvas.id        = 'context-canvas'
    canvas.className = 'context-canvas'
    canvas.width     = window.innerWidth
    canvas.height    = window.innerHeight

    if (canvas.getContext) {
      let planetColor  = this.planetColor
      let planetX      = canvas.width * 0.5
      let planetY      = canvas.width * 4.5
      let planetRadius = canvas.width * 4
      let context = canvas.getContext('2d')

      // Planet Atmosphere
      let atmosGrad = context.createRadialGradient(
        planetX,
        canvas.width * 2,
        canvas.width * 1.75,
        canvas.width * 0.5,
        canvas.height,
        0)
      atmosGrad.addColorStop(0,'rgba(255, 255, 255, 0)')
      atmosGrad.addColorStop(1.0,'rgba(255, 255, 255, 0.25)')
      context.fillStyle = atmosGrad
      context.beginPath()
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.closePath()

      // Planet
      context.beginPath()
      context.arc(planetX, planetY, planetRadius, 0, 2 * Math.PI)
      context.fillStyle = planetColor
      context.fill()
      context.closePath()

      // Planet Shade I - darken and desaturate, left-to-right
      let planetGrad1 = context.createLinearGradient(0, 0, canvas.width, 0)
      planetGrad1.addColorStop(0, 'rgba(0,0,0,0.2)')
      planetGrad1.addColorStop(1, 'rgba(255, 255, 255, 0.2)')
      context.beginPath()
      context.arc(planetX, planetY, planetRadius, 0, 2 * Math.PI)
      context.fillStyle = planetGrad1
      context.fill()
      context.closePath()

      // Planet Shade II - darken horizon
      let planetGrad2 = context.createRadialGradient(
        planetX,
        planetY,
        planetRadius * 0.97,
        planetX,
        planetY,
        planetRadius + 1)
      planetGrad2.addColorStop(0,'rgba(255, 255, 255, 0.2)')
      planetGrad2.addColorStop(0.8,'rgba(0, 0, 0, 0.5)')
      planetGrad2.addColorStop(1.0,'rgba(0, 0, 0, 0.67)')
      context.beginPath()
      context.arc(planetX, planetY, (planetRadius + 1), 0, 2 * Math.PI)
      context.fillStyle = planetGrad2
      context.fill()
      context.closePath()
    }

    return canvas
  }
}
