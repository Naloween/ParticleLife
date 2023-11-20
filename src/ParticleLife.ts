import { Particle } from "./Particle";

class ParticleLife {
  particles: Particle[];
  ctx: CanvasRenderingContext2D;
  repulse_radius = 100;
  repulse_scale = 0.05;
  attract_radius = 200;
  attract_scale = 0.01;

  constructor(ctx: CanvasRenderingContext2D) {
    this.particles = [];
    this.ctx = ctx;

    for (let k = 0; k < 100; k++) {
      this.particles.push(
        new Particle(
          Math.random() * ctx.canvas.width,
          Math.random() * ctx.canvas.height
        )
      );
    }
  }

  start() {
    const callback = () => {
      this.evolve();
      this.draw();
      window.requestAnimationFrame(callback);
    };
    window.requestAnimationFrame(callback);
  }

  evolve() {
    let d = 0;
    let dx = 0;
    let dy = 0;
    for (let particle of this.particles) {
      // Apply forces
      for (let particle2 of this.particles) {
        if (particle2 != particle) {
          dx = particle2.x - particle.x;
          dy = particle2.y - particle.y;
          d = Math.sqrt(dx ** 2 + dy ** 2);

          if (d < this.attract_radius) {
            particle.v_x +=
              (dx / d) * this.attract_scale * (1 - d / this.attract_radius);
            particle.v_y +=
              (dy / d) * this.attract_scale * (1 - d / this.attract_radius);
          }
          if (d < this.repulse_radius) {
            particle.v_x -=
              (dx / d) * this.repulse_scale * (1 - d / this.repulse_radius);
            particle.v_y -=
              (dy / d) * this.repulse_scale * (1 - d / this.repulse_radius);
          }
        }
      }
      // Move particles
      particle.x += particle.v_x;
      particle.y += particle.v_y;

      if (particle.x < 0) {
        particle.x = this.ctx.canvas.width;
      }
      if (particle.y < 0) {
        particle.y = this.ctx.canvas.height;
      }
      if (particle.x > this.ctx.canvas.width) {
        particle.x = 0;
      }
      if (particle.y > this.ctx.canvas.height) {
        particle.y = 0;
      }
    }
  }

  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = "red";
    for (let particle of this.particles) {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, 5, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }
}

export { ParticleLife };
