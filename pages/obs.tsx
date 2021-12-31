import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Winner from '../components/Winner';
import VoteContext from '../contexts/VoteContext';
import getGames from '../functions/getGames';

import styles from './obs.module.scss';

export async function getStaticProps(ctx: GetStaticPropsContext) {
	const games = await getGames();
	console.log('games:', games);

	return { props: { games } };
}

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function OBSWidget({ games }: HomeProps) {
	return (
		<VoteContext.Provider value={{ games: games as any }}>
			<div
				className={styles.OBSWidget}
				style={{
					width: '80vw',
					height: '80vh',
					position: 'relative',
					padding: 30,
					margin: 'auto'
				}}
			>
				<Winner />
			</div>
		</VoteContext.Provider>
	);
}
