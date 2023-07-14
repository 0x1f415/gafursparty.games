import knex from 'knex';

import { connection } from '../orm.config';

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function main() {
	const { POSTGRES_URL, POSTGRES_DATABASE: dbName } = process.env;

	if (!dbName) throw new Error('Expected dbName in connection');

	const k = knex({
		client: 'pg',
		connection: {
			connectionString: POSTGRES_URL,
			ssl: true
		}
	});

	const dbs = await k.raw(
		`SELECT * from pg_database WHERE datname = '${dbName}';`
	);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	if (dbs.rows.some((r: any) => r.datname === dbName)) {
		console.log(`found ${dbName} database`);
	} else {
		await k.raw(`CREATE DATABASE "${dbName}";`);
		console.log(`${dbName} database created`);
	}

	await k.destroy();
}

main().then(
	() => process.exit(0),
	err => {
		console.error(err);
		process.exit(1);
	}
);
