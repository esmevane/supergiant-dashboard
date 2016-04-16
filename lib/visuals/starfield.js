import { drawParticles, Particle } from './Particle'

const randomLocation = () => (
  {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight
  }
)

export const starfield = () => {
  let canvas = document.getElementById("starfield")
  let context = canvas.getContext("2d")
  let starsystems = []

  for (var i = 0; i < 100; i++) {
    starsystems.push(Particle.create({
      amount: 10,
      location: randomLocation(),
      speed: () => 0,
      radius: () => Math.random() * (Math.max(10 - i, 1))
    }))
  }

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // gradient(#{$deg}, #0D2B5A, #2D223C, #000102)
  let spaceGrad = context.createLinearGradient(0, 0, canvas.width, canvas.height)
  spaceGrad.addColorStop(0, '#0D2B5A')
  spaceGrad.addColorStop(0.5, '#2D223C')
  spaceGrad.addColorStop(1, '#000102')

	context.globalCompositeOperation = "source-over"
	context.fillStyle = spaceGrad // "rgba(255, 255, 255, 0)"

	context.fillRect(0, 0, window.innerWidth, window.innerHeight)
	context.globalCompositeOperation = "lighter"

  starsystems.forEach(starsystem => drawParticles(starsystem, context))
}
