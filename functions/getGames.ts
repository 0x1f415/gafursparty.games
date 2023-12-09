import ownedGames from '../games.json';
import SteamAPI from 'steamapi';
import { GameDetail } from '../types';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export default async function getGames() {
	const { STEAM_WEB_KEY } = process.env;

	if (!STEAM_WEB_KEY)
		throw new Error('Please add a STEAM_WEB_KEY environment variable');

	const steam = new SteamAPI(STEAM_WEB_KEY);

	const gameDetails = await await Promise.all(
		ownedGames.map(metadata =>
			(steam.getGameDetails(metadata.appId) as Promise<GameDetail>).then(
				steamInfo => ({
					steamInfo,
					metadata
				})
			)
		)
	);

	const games = gameDetails.reduce(
		(map, game) => ({ ...map, [game.steamInfo.steam_appid]: game }),
		{} as {
			[key: string]: {
				steamInfo: GameDetail;
				metadata: typeof ownedGames[0];
			};
		}
	);

	return games;
}
