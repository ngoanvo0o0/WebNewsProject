/**
 * Pre-start is where we want to place things that must run BEFORE the express server is started.
 * This is useful for environment variables, command-line arguments, and cron-jobs.
 */

import commandLineArgs from 'command-line-args';
import dotenv from 'dotenv';
import path from 'path';



(() => {
    // Setup command line options
    const options = commandLineArgs([
        {
            name: 'env',
            alias: 'e',
            defaultValue: 'production',
            type: String,
        },
    ], { partial: true });
    // Set the env file
    const result2 = dotenv.config({
        path: path.join(__dirname, `${options.env as string}.env`),
    });
    if (result2.error) {
        throw result2.error;
    }
})();
