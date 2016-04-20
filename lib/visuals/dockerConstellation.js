export class DockerConstellation {
  constructor() {
    this.anchor = window.document.body
    this.canvas = this.createCanvas()
    this.target = null
  }

  start() {
    this.target = this.anchor.appendChild(this.canvas)
  }

  stop() {
    if (this.target) this.target.remove(true)
  }

  createCanvas() {
    let canvas       = document.createElement('canvas')
    canvas.id        = 'context-canvas'
    canvas.className = 'context-canvas'
    canvas.width     = window.innerWidth
    canvas.height    = window.innerHeight

    if (canvas.getContext) {
      let constellationX = canvas.width
      let constellationY = canvas.height * 0.2
      let context       = canvas.getContext('2d')

      // Orbiting Satellite
      var constellation = new Image();
      constellation.onload = function () {
        context.drawImage(
          constellation,
          constellationX - constellation.width,
          constellationY
        )
      }
      constellation.src = "/images/docker-constellation.svg"
    }

    return canvas
  }
}
