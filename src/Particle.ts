import { ParticleKind } from "./ParticleKind";

class Particle {
  x: number;
  y: number;
  v_x: number;
  v_y: number;
  kind: ParticleKind;

  constructor(x: number, y: number, particle_kind: ParticleKind) {
    this.x = x;
    this.y = y;
    this.v_x = 0;
    this.v_y = 0;
    this.kind = particle_kind;
  }
}

export { Particle };
