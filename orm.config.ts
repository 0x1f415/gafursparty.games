import { Options, ConnectionOptions, Dictionary } from '@mikro-orm/core';
import { Vote } from './entities/votes.entity';

import dotenv from 'dotenv';

let connection: ConnectionOptions;
let driverOptions: Dictionary;

const { VERCEL } = process.env;

const entities = [Vote];

const appname = 'gafursparty-games';

dotenv.config({ path: '.env.local' });

const { POSTGRES_URL: clientUrl } = process.env;

connection = {
	clientUrl
};
driverOptions = {
	connection: {
		ssl: true
	}
};

const config: Options = {
	type: 'postgresql',
	entities,
	discovery: {
		disableDynamicFileAccess: true
	},
	...connection,
	driverOptions,
	baseDir: process.cwd(),
	migrations: {
		path: './migrations',
		dropTables: true,
		disableForeignKeys: false
	}
};

export default config;
export { connection };
