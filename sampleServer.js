'use strict';
const http = require('http');

const host = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    let body = [];
    res.on('error', (err) => {
        console.error(err.stack);
        res.statusCode = 500;
        res.end('Oh my bad bro; server error and shit');
    })
    req.on('error', (err) => {
        console.error(err.stack);
        res.statusCode = 400;
        res.end('Error dude');
    })
    .on('data', (chunk) => {
        body.push(chunk);
    })
    .on('end', () => {
        body = Buffer.concat(body).toString();
        const ip = req.socket.remoteAddress;
        const port = req.socket.remotePort;
        const family = req.socket.remoteFamily;
        const local = req.socket.localAddress;
        const {method, url} = req;
        const userAgent = req.headers['user-agent'];
        res.setHeader('X-Duh-Duh', 'bro brah');
        res.write('<html><body><p>LOL</p>');
        if(req.method === 'GET') {
            res.write('<h1>GET out of here brah</h1>');
        } else if(req.method === 'POST') {
            res.write('<h1>POST him up guy</h1>');
        } else if(req.method === 'PUT') {
            res.write('<h1>PUT away that nonsense homes</h1>');
        } else {
            res.write(`<h1>${req.method} - YOU craissy or someting?</h1>`)
        }
        res.write(`
            <h1>Your IP address: ${ip}</h1>
            <h2>Your source port: ${port}</h2> 
            <h2>Family: ${family}</h2>
            <h3>Local: ${local} </h3>
            <h3>Method: ${method}</h3>
            <h3>URL: ${url}</h3>
            <h3>User-Agent: ${userAgent}</h3>
            <p>Body: ${body}</p>`);
        res.end('</body></html>')
    });
});

server.listen(port, host, () => {
    console.log('listening bro on ', server.address());
});

server.on('listening', () => {
    console.log('Yo, so we\'re listening bro on ', server.address());
});