import { Options, ConnectionOptions } from '@mikro-orm/core';
import { Vote } from './entities/votes.entity';

import dotenv from 'dotenv';

let connection: ConnectionOptions;

const { VERCEL } = process.env;

const entities = [Vote];

const appname = 'gafursparty-games';

if (VERCEL) {
	const { POSTGRES_URL } = process.env;

	connection = {
		clientUrl: POSTGRES_URL + '?sslmode=require'
	};
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
