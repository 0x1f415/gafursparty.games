import React from "react";
import Particles from "react-particles-js";

import styles from "./ParticlesBG.module.scss";

export default function ParticlesBG() {
  return (
    <Particles
      params={{
        move: {
          speed: 1,
          out_mode: "out",
        },
        particles: {
          line_linked: {
            enable: false,
          },
          shape: {
            type: "image",
            image: [
              {
                src: "/paw.png",
                height: 20,
                width: 20,
              },
              {
                src: "/peach.png",
                height: 20,
                width: 20,
              },
            ],
          },
          color: {
            value: "#CCC",
          },
          size: {
            value: 30,
            random: true,
            anim: {
              enable: true,
              speed: 4,
              size_min: 10,
              sync: false,
            },
          },
        },
        retina_detect: false,
      }}
      className={styles.ParticlesBG}
    />
  );
}
