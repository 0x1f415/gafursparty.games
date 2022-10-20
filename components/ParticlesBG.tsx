import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';

import styles from './ParticlesBG.module.scss';

export default function ParticlesBG() {
	const particlesInit = useCallback(async (engine: Engine) => {
		await loadFull(engine);
	}, []);

	return (
		<Particles
			id="tsparticles"
			init={particlesInit}
			options={{
				fpsLimit: 120,
				particles: {
					move: {
						speed: 0.5,
						out_mode: 'out',
						enable: true
					},
					number: {
						value: 7
					},
					line_linked: {
						enable: false
					},
					shape: {
						type: 'image',
						image: [
							{
								src: '/paw.png',
								height: 20,
								width: 20
							},
							{
								src: '/peach.png',
								height: 20,
								width: 20
							}
						]
					},
					color: {
						value: '#CCC'
					},
					size: {
						value: 15,
						random: false
					},
					opacity: {
						value: 0.1,
						anim: {
							enable: false
						}
					}
				}
			}}
			className={styles.ParticlesBG}
		/>
	);
}
