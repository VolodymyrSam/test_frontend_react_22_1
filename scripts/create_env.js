
/* eslint-disable @typescript-eslint/no-var-requires */
// позволяет генерировать .env файл динамически из объекта ENV_VARIABLES

const fs = require('fs');
const os = require('os');
const path = require('path');

const ENV_VARIABLES = {
    REACT_APP_BUILD_NOTE: Date.now(),
};
const pathToEnvFile = path.join(__dirname, '..', '.env');

fs.writeFileSync(pathToEnvFile, envJsonToText(ENV_VARIABLES));

function envJsonToText(envJson) {
    let result = '';
    for (const prop in envJson) {
        result += `${prop}=${envJson[prop]}${os.EOL}`;
    }
    return result;
}