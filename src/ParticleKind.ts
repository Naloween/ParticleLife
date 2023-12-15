class ParticleKind {
  static next_id = 0;

  id: number;
  repulse_radiuses: number[];
  repulse_scales: number[];
  attract_radiuses: number[];
  attract_scales: number[];
  color: string;
  color_rgb: number[];

  constructor(
    nb_particle_kinds: number,
    repulse_radius_bounds = [20, 20],
    repulse_scale_bounds = [10000, 10000],
    attract_radius_bounds = [100, 500],
    attract_scale_bounds = [-1000, 1000]
  ) {
    this.id = ParticleKind.next_id;
    ParticleKind.next_id += 1;

    this.color_rgb = [];
    for (let k = 0; k < 3; k++) {
      this.color_rgb.push(Math.floor(200 * Math.random()));
    }

    this.color =
      "rgb(" +
      this.color_rgb[0] +
      "," +
      this.color_rgb[1] +
      "," +
      this.color_rgb[2] +
      ")";

    this.repulse_radiuses = [];
    this.repulse_scales = [];
    this.attract_radiuses = [];
    this.attract_scales = [];

    for (let k = 0; k < nb_particle_kinds; k++) {
      this.repulse_radiuses.push(
        repulse_radius_bounds[0] +
          Math.random() * (repulse_radius_bounds[1] - repulse_radius_bounds[0])
      );
      this.repulse_scales.push(
        repulse_scale_bounds[0] +
          Math.random() * (repulse_scale_bounds[1] - repulse_scale_bounds[0])
      );
      this.attract_radiuses.push(
        attract_radius_bounds[0] +
          Math.random() * (attract_radius_bounds[1] - attract_radius_bounds[0])
      );
      this.attract_scales.push(
        attract_scale_bounds[0] +
          Math.random() * (attract_scale_bounds[1] - attract_scale_bounds[0])
      );
    }
  }
}

export { ParticleKind };
