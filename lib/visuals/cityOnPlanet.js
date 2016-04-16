export class CityOnPlanet {
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

  createCanvas(planetColor) {
    let canvas       = document.createElement('canvas')
    canvas.id        = 'context-canvas'
    canvas.className = 'context-canvas'
    canvas.width     = window.innerWidth
    canvas.height    = window.innerHeight

    if (canvas.getContext) {
      let planetX      = canvas.width
      let planetY      = canvas.height * 0.67
      let planetRadius = canvas.height * 0.40
      let context      = canvas.getContext('2d')
      let city         = new Image()

      // City
      city.onload = function () {
        context.save()
        context.translate(planetX, planetY)
        context.rotate(-10 * (Math.PI / 180))
        context.drawImage(
          city,
          0 - (city.width * 0.5),
          0 - (city.height) - (planetRadius * 0.99)
        )
          context.restore()


        // Planet Atmosphere
        let atmosGrad = context.createRadialGradient(
          planetX,
          planetY,
          planetRadius * 1.33,
          planetX,
          planetY,
          planetRadius)
        atmosGrad.addColorStop(0,'rgba(255, 255, 255, 0)')
        atmosGrad.addColorStop(0.7,'rgba(255, 255, 255, 0.1)')
        atmosGrad.addColorStop(1.0,'rgba(255, 255, 255, 0.25)')
        context.fillStyle = atmosGrad
        context.beginPath()
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.closePath()

        // Planet
        context.beginPath()
        context.arc(
          planetX,
          planetY,
          planetRadius,
          0,
          2 * Math.PI)
        context.fillStyle = planetColor
        context.fill()
        context.closePath()

        // Planet Shade - darken horizon
        let planetGrad = context.createRadialGradient(
          planetX,
          planetY,
          planetRadius * 0.3,
          planetX,
          planetY,
          planetRadius)
        planetGrad.addColorStop(0,'rgba(255, 255, 255, 0.2)')
        planetGrad.addColorStop(1.0,'rgba(0, 0, 0, 0.67)')
        context.beginPath()
        context.arc(planetX, planetY, planetRadius, 0, 2 * Math.PI)
        context.fillStyle = planetGrad
        context.fill()
        context.closePath()
      }
      city.src = "/images/city.png"
    }

    return canvas
  }
}
