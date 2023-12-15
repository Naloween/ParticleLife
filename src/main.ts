import { ParticleLife } from "./ParticleLife";
import "./style.css";

function main() {
  const app = document.getElementById("app");
  const canvas = document.createElement("canvas");
  if (app == undefined || canvas == undefined) {
    return;
  }
  app.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (ctx == undefined) {
    return;
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const nb_particles = 200;
  const nb_particle_kinds = 7;
  const particle_life = new ParticleLife(ctx, nb_particles, nb_particle_kinds);
  particle_life.start();
}

main();
