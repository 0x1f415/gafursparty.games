import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import gameOrder from '../gameorder.json';

import styles from './index.module.scss';

import Image from 'next/image';
import ParticlesBG from '../components/ParticlesBG';
import { GameCard } from '../components/GameCard';
import VoteContext from '../contexts/VoteContext';
import Winner from '../components/Winner';
import MyVote from '../components/MyVote';
import VoteExpiration from '../components/Expiration';
import React from 'react';
import { NextSeo } from 'next-seo';
import getGames from '../functions/getGames';

export async function getStaticProps(ctx: GetStaticPropsContext) {
	const { VERCEL_URL } = process.env;
	const absoluteUrl = VERCEL_URL
		? `https://${VERCEL_URL}`
		: 'http://localhost:3000';

	const games = await getGames();

	return { props: { games, absoluteUrl } };
}

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home({ games, absoluteUrl }: HomeProps) {
	return (
		<>
			<NextSeo
				title="Party Game Night!"
				description="Voting for Jackbox and other party games!"
				openGraph={{
					images: [
						{
							url: `${absoluteUrl}/opengraph-image.png`
						}
					]
				}}
				twitter={{
					cardType: 'summary_large_image'
				}}
			/>
			<VoteContext.Provider value={{ games: games as any }}>
				{/* <ParticlesBG /> */}
				<video
					className={styles.HauntedHouseBG}
					src="/haunted-house.mp4"
					autoPlay
					muted
					loop
				/>
				<div className={styles.Content}>
					<h1 className={styles.Header}>Party Game Night</h1>
					<div className={styles.VoteSection}>
						<Winner />
						<div className={styles.Spacer} />
						<MyVote />
					</div>
					<VoteExpiration className={styles.VoteExpiration} />
					<h2 className={styles.AvailableGames}>Available Games</h2>
					<div className={styles.GameList}>
						{gameOrder.map(appId => {
							const data = games[appId];

							return (
								<GameCard
									key={appId}
									game={data.steamInfo}
									subGames={data.metadata.subGames}
									new={data.metadata.new}
								/>
							);
						})}
					</div>
					<div className={styles.Footer}>
						<span>
							Built with{' '}
							<a href="https://nextjs.org">
								<div
									style={{
										width: '50px',
										height: '2em',
										marginTop: '-.25em',
										marginBottom: '-.25em'
									}}
									className={styles.FooterLogo}
								>
									<Image
										objectFit="contain"
										layout="fill"
										src="/nextjs.png"
									/>
								</div>
							</a>
						</span>
						<span>
							Hosted on{' '}
							<a href="https://vercel.app">
								<div
									style={{ width: '65px' }}
									className={styles.FooterLogo}
								>
									<Image
										objectFit="contain"
										layout="fill"
										src="/vercel.png"
									/>
								</div>
							</a>
						</span>
						<span>
							Data from{' '}
							<a href="https://store.steampowered.com">
								<div
									style={{
										width: '65px',
										position: 'relative',
										bottom: '1px'
									}}
									className={`${styles.FooterLogo} ${styles.Invert}`}
								>
									<Image
										objectFit="contain"
										layout="fill"
										src="/steam.png"
									/>
								</div>
							</a>
						</span>
					</div>
				</div>
			</VoteContext.Provider>
		</>
	);
}
