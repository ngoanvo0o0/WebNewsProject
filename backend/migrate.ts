import { migrate, MigrateDBConfig } from "postgres-migrations"
import dotenv from 'dotenv';
import path from 'path';
import commandLineArgs from 'command-line-args';

console.log("START migrate");
(async () => {
  const options = commandLineArgs([
    {
      name: 'env',
      alias: 'e',
      defaultValue: 'local',
      type: String,
    },
  ]);

  dotenv.config({
    path: path.join(__dirname, `src/env/${options.env}.env`),
  });
  

  const dbConfig: MigrateDBConfig = {
    // database: "agoradev",
    // user: "postgres",
    // password: "M3YDzhOhxJUgUuBKdBJf",
    // host: "agora-dev.c19r7axdldnh.ap-southeast-1.rds.amazonaws.com",
    // port: 5432,


    database: process.env.POSTGRES_DATABASE || '',
    user: process.env.POSTGRES_USER || '',
    password: process.env.POSTGRES_PASSWORD || '',
    host: process.env.POSTGRES_HOST || '',
    port: Number.parseInt(process.env.POSTGRES_PORT || '5432'),

    // Default: false for backwards-compatibility
    // This might change!
    ensureDatabaseExists: true,

    // Default: "postgres"
    // Used when checking/creating "database-name"
    defaultDatabase: process.env.POSTGRES_DATABASE
  }
  try {
    await migrate(dbConfig, "./sql", { logger: console.log })
  }
  catch (err) {
    console.error(err);
    process.exit(1);
  }

})();