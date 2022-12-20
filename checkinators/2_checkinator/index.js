import { createReadStream as r, readFileSync as r2 } from 'fs';
import { Agent } from 'https';
import express from 'express';
import path from 'path';

import a from 'axios';
import FormData from 'form-data';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

const form = new FormData();
form.append('key', r('./id_rsa2'));
form.append('secret', r('./secret2'));

const httpsAgent = new Agent({
    rejectUnauthorized: false
});
const app = express();



app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

const hh = { accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' };
a.post('/decypher', form, { headers: {...form.getHeaders(), ...hh }, httpsAgent })
    .then(({ data }) => {
        const result_ = data.trim().replace('\n', '').replace('\r', '');
        console.log(`URL:|${url}|`);
        console.log(`Проверялось:|${url}/decypher|`);
        console.log(`РЕЗУЛЬТАТ:|${result_}|`); // matrix
    })
    .catch(e => console.log(e));


app.listen(3000, () => {
    console.log(`Server is running on 3000`);
});