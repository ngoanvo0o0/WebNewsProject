import { SequelizeAuto } from 'sequelize-auto';
import dotenv from 'dotenv';
import path from 'path';
import commandLineArgs from 'command-line-args';

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

    const auto = new SequelizeAuto(
        process.env.POSTGRES_DATABASE || ''
        , process.env.POSTGRES_USER || ''
        , process.env.POSTGRES_PASSWORD || ''
        , {
            schema: 'public',
            host: process.env.POSTGRES_HOST || '',
            port: Number.parseInt(process.env.POSTGRES_PORT || '5432'),
            dialect: 'postgres',
            directory: './src/models',
            caseModel: 'p',
            caseFile: 'p',
            caseProp: 'c',
            singularize: false,
            lang: 'ts',
            additional: {
                timestamps: false
            }

        })

    try {
        await auto.run();
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
