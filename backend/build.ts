/**
 * Remove old files, copy front-end ones.
 */

import fs from 'fs-extra';
import Logger from 'jet-logger';
import childProcess from 'child_process';

// Setup logger
const logger = new Logger();
logger.timestamp = false;

(async () => {
    try {
        console.log('move assets')
        // warning: this avoids losing the images which are uploaded by users
        // so it will occur a error when the assets folder exists some files such as: js, css, ...
        await move('./dist/assets', './assets');
        console.log('remove dist')
        await remove('./dist/');
        // Copy production env file
        await copy('./src/env', './dist/env');
        // Copy back-end files
        await exec('tsc --build tsconfig.prod.json', './')
        await move('./assets', './dist/assets');

    } catch (err) {
        logger.err(err);
    }
})();

function move (src: string, dest: string): Promise<void> {
    return new Promise((res, rej) => {
        if(!fs.existsSync(src)) return res();
        return fs.move(src, dest, (err) => {
            return (!!err ? rej(err) : res());
        });
    });
}

function remove(loc: string): Promise<void> {
    return new Promise((res, rej) => {
        return fs.remove(loc, (err) => {
            return (!!err ? rej(err) : res());
        });
    });
}

function copy(src: string, dest: string): Promise<void> {
    return new Promise((res, rej) => {
        return fs.copy(src, dest, (err) => {
            return (!!err ? rej(err) : res());
        });
    });
}

function exec(cmd: string, loc: string): Promise<void> {
    return new Promise((res, rej) => {
        return childProcess.exec(cmd, { cwd: loc }, (err, stdout, stderr) => {
            if (!!stdout) {
                logger.info(stdout);
            }
            if (!!stderr) {
                logger.warn(stderr);
            }
            return (!!err ? rej(err) : res());
        });
    });
}
