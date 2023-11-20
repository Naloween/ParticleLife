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

  const particle_life = new ParticleLife(ctx);
  particle_life.start();
}

main();
