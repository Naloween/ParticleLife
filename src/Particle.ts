class Particle {
  x: number;
  y: number;
  v_x: number;
  v_y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.v_x = 0;
    this.v_y = 0;
  }
}

export { Particle };
