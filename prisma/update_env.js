// // update_env.js
import dotenv from 'dotenv'
import variableExpansion from 'dotenv-expand'
import { exec } from "child_process";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { writeFile } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const base_env_file_path = join(__dirname, ".base.env")
const env_file_path = join(__dirname, ".env")
let env_data = dotenv.config({path: base_env_file_path})

exec(`heroku config:get DATABASE_URL -a ${env_data.parsed.HEROKU_DB_NAME}`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    env_data.parsed.DATABASE_URL = stdout

    variableExpansion(env_data)

    writeFile(env_file_path, `DATABASE_URL_WITH_SCHEMA=${env_data.parsed.DATABASE_URL_WITH_SCHEMA}`, function (err) {
        if (err) throw err;
     });    
});