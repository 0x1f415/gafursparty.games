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
				background: {},
				particles: {
					color: { value: '#fff' },
					move: {
						direction: 'bottom',
						enable: true,
						outModes: 'out',
						speed: 2
					},
					number: {
						density: {
							enable: true,
							area: 800
						},
						value: 100
					},
					opacity: {
						value: 0.7
					},
					shape: {
						type: 'circle'
					},
					size: {
						value: 10
					},
					wobble: {
						enable: true,
						distance: 10,
						speed: 10
					},
					zIndex: {
						value: { min: 0, max: 100 }
					}
				}
			}}
			className={styles.ParticlesBG}
		/>
	);
}
