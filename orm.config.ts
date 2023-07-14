import { Options, ConnectionOptions } from '@mikro-orm/core';
import { Vote } from './entities/votes.entity';

import dotenv from 'dotenv';

let connection: ConnectionOptions;

const { VERCEL } = process.env;

const entities = [Vote];

const appname = 'gafursparty-games';

if (VERCEL) {
	const { VERCEL_GIT_COMMIT_REF: branch, VERCEL_ENV: stage } = process.env;

	const { POSTGRES_URL: clientUrl } = process.env;

	let dbName: string;
	if (stage === 'production') dbName = `${appname}-production`;
	else if (stage === 'preview') dbName = `${appname}-preview-${branch}`;
	else if (stage === 'development') dbName = `${appname}-dev-${branch}`;
	else throw new Error(`Unrecognized vercel deployment stage ${stage}`);

	connection = { clientUrl, dbName };
} else {
	dotenv.config({ path: '.env.local' });
	const { POSTGRES_URL: clientUrl } = process.env;
	connection = {
		clientUrl
	};
}

const config: Options = {
	type: 'postgresql',
	entities,
	discovery: {
		disableDynamicFileAccess: true
	},
	...connection,
	baseDir: process.cwd(),
	migrations: {
		path: './migrations',
		dropTables: true,
		disableForeignKeys: false
	}
};

export default config;
export { connection };
