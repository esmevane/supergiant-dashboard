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

	context.globalCompositeOperation = "source-over"
	context.fillStyle = "rgba(255, 255, 255, 0)"
	context.fillRect(0, 0, window.innerWidth, window.innerHeight)
	context.globalCompositeOperation = "lighter"

  starsystems.forEach(starsystem => drawParticles(starsystem, context))
}
