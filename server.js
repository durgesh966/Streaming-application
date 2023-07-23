const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

app.get('/:id', (req, res) => {
    res.sendFile(path.join(publicPath, "about.html"));
});

app.use((req, res) => {
    res.json("404");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}......`);
});
