import { Particle } from "./Particle";
import { ParticleKind } from "./ParticleKind";

class ParticleLife {
  particles: Particle[];
  ctx: CanvasRenderingContext2D;
  kinds: ParticleKind[];

  last_time = 0;

  constructor(
    ctx: CanvasRenderingContext2D,
    nb_particles: number,
    nb_particle_kinds: number
  ) {
    this.particles = [];
    this.ctx = ctx;
    this.kinds = [];
    for (let k = 0; k < nb_particle_kinds; k++) {
      this.kinds.push(new ParticleKind(nb_particle_kinds));
    }

    for (let k = 0; k < nb_particles; k++) {
      this.particles.push(
        new Particle(
          Math.random() * ctx.canvas.width,
          Math.random() * ctx.canvas.height,
          this.kinds[Math.floor(nb_particle_kinds * Math.random())]
        )
      );
    }
  }

  start() {
    const callback = (time_ms: number) => {
      const dt = time_ms / 1000 - this.last_time; // convert in seconds
      this.last_time = time_ms / 1000;
      this.evolve(dt);
      this.draw();
      window.requestAnimationFrame(callback);
    };
    window.requestAnimationFrame(callback);
  }

  evolve(dt: number) {
    let d = 0;
    let dx = 0;
    let dy = 0;
    let acceleration_x;
    let acceleration_y;
    for (let particle of this.particles) {
      acceleration_x = 0;
      acceleration_y = 0;

      // Apply inter particle forces
      for (let particle2 of this.particles) {
        if (particle2 != particle) {
          dx = particle2.x - particle.x;
          dy = particle2.y - particle.y;
          d = Math.sqrt(dx ** 2 + dy ** 2);

          const attract_radius =
            particle.kind.attract_radiuses[particle2.kind.id];
          const attract_scale = particle.kind.attract_scales[particle2.kind.id];
          const repulse_radius =
            particle.kind.repulse_radiuses[particle2.kind.id];
          const repulse_scale = particle.kind.repulse_scales[particle2.kind.id];

          if (d < repulse_radius) {
            acceleration_x -=
              dt * (dx / d) * repulse_scale * (1 - d / repulse_radius);
            acceleration_y -=
              dt * (dy / d) * repulse_scale * (1 - d / repulse_radius);
          } else if (d < attract_radius) {
            acceleration_x +=
              dt * (dx / d) * attract_scale * (1 - d / attract_radius);
            acceleration_y +=
              dt * (dy / d) * attract_scale * (1 - d / attract_radius);
          }
        }
      }

      // Apply fluid force
      const f = 0.2;
      acceleration_x -= f * particle.v_x;
      acceleration_y -= f * particle.v_y;

      // Update particle speed
      particle.v_x += acceleration_x * dt;
      particle.v_y += acceleration_y * dt;

      // Move particles
      particle.x += particle.v_x * dt;
      particle.y += particle.v_y * dt;

      if (particle.x < 0) {
        particle.x = 0;
        particle.v_x *= -1;

        // particle.x = this.ctx.canvas.width;
      }
      if (particle.y < 0) {
        particle.y = 0;
        particle.v_y *= -1;

        // particle.y = this.ctx.canvas.height;
      }
      if (particle.x > this.ctx.canvas.width) {
        particle.x = this.ctx.canvas.width;
        particle.v_x *= -1;
        // particle.x = 0;
      }
      if (particle.y > this.ctx.canvas.height) {
        particle.y = this.ctx.canvas.height;
        particle.v_y *= -1;
        // particle.y = 0;
      }
    }
  }

  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for (let particle of this.particles) {
      this.ctx.fillStyle = particle.kind.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, 5, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }
}

export { ParticleLife };
