const express        = require("express");
const app            = express();
const fs             = require('fs');
const path           = require("path");

app.use(express.static("./build"));

app.get("/", (req, res) => {

    let data = req.body.data

    const indexFile = path.resolve('./build/index.html');

    fs.readFile(indexFile, 'utf8', (err, data) => {

        if (err) {

            console.error('Something went wrong:', err);

            return res.status(500).send('Oops, better luck next time!');
        }

        return res.send(data, {data : data});
    });

})

app.listen(3003, () => {

    console.log("server run on port 3003")
})

