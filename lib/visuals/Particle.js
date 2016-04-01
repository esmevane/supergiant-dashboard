export function drawParticles(particles, context) {
  let newParticles = particles.map(particle => {
    let newParticle = particle.dwindle()

    particle.draw(context)

    return newParticle.isDead() ? newParticle.regenerate() : newParticle
  })

  return newParticles
}

export class Particle {
  constructor({ location, radius, speed, life }) {
  	this.speed = { x: speed(), y: speed() }
  	this.location = typeof location === 'function' ? location() : location
  	this.radius = Math.random() * radius()
  	this.life = Math.random() * (life || 100)
  	this.remainingLife = this.life
    this.settings = { location, radius, speed }
  }

  copy() {
    let newParticle = this.regenerate()
    let attributes = [
      `speed`,
      `location`,
      `radius`,
      `life`,
      `remainingLife`,
      `settings`
    ]

    attributes.forEach(attribute => newParticle[attribute] = this[attribute])

    return newParticle
  }

  draw(context) {
		context.beginPath()

		this.opacity = Math.round(this.remainingLife / this.life * 100) / 100

		var gradient = context.createRadialGradient(
      this.location.x,
      this.location.y,
      0,
      this.location.x,
      this.location.y,
      this.radius
    )

    gradient.addColorStop(0, "rgba(175, 175, 205, " + this.opacity + ")")
    gradient.addColorStop(0.5, "rgba(175, 175, 205, " + this.opacity + ")")
    gradient.addColorStop(1, "rgba(175, 175, 205, 0)")

    context.fillStyle = gradient
		context.arc(
      this.location.x,
      this.location.y,
      this.radius,
      Math.PI * 2, false
    )

		context.fill()
  }

  dwindle() {
    let newParticle = this.copy()

		newParticle.remainingLife--
		newParticle.radius--
		newParticle.location.x += this.speed.x
		newParticle.location.y += this.speed.y

    return newParticle
  }

  isDead() { return this.remainingLife < 0 || this.radius < 0 }
  regenerate() { return new Particle(this.settings) }

  static create({ amount, location, radius, speed, life }) {
    let particles = []

    for (var i = 0; i < amount; i++) {
      particles.push(new Particle({ location, radius, speed, life }))
    }

    return particles
  }
}
