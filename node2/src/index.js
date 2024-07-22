import { createServer } from 'http';
import { readFile, readdir } from 'fs';
import { config } from 'dotenv';
import { createLink } from './util.js';
config({ path:`.env.${process.env.NODE_ENV}`});

const PORT = process.env.PORT ?? 80;

const server = createServer((req, res) => {
    const folderPath = process.argv[2];

    if (!folderPath) {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Por favor, forneça o caminho da pasta como argumento ao iniciar o servidor.');
    }

    const reqFile = decodeURIComponent(req.url.substring(1));

    if(reqFile) {
        const filePath = `${folderPath}/${reqFile}`;

        readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                return res.end('Arquivo não encontrado.');
            }

            const html = `
                <a href="/">Voltar</a><br>\n
                <div>${data}</div>
            `

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(html);
        });
    }
    else{
        readdir(folderPath, (err, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                return res.end('Erro ao ler a pasta.');
            }

            const html = files.map(file => createLink(file)).join('');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write(html);
            res.end();
        });
    }
});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});