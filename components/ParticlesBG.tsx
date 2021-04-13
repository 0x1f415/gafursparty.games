import React from 'react';
import Particles from 'react-particles-js';

import styles from './ParticlesBG.module.scss';

export default function ParticlesBG() {
	return (
		<Particles
			params={{
				move: {
					speed: 0.5,
					out_mode: 'out'
				},
				particles: {
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
				},
				retina_detect: false
			}}
			className={styles.ParticlesBG}
		/>
	);
}
