const http = require("http");
const fs = require("fs");
const path = require("path");

// Palvelimen luonti
const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
        // Lue HTML-tiedosto
        const filePath = path.join(__dirname, "combined.html");
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Palvelimella tapahtui virhe");
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Sivua ei löydy");
    }
});

// Käynnistä palvelin
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Palvelin käynnissä osoitteessa http://localhost:${PORT}`);
});
