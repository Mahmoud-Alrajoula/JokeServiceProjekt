
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')

async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

router
app.get('/', async (req, res) => {
    const aljoke = await jokeController.getAllJokes();
    const jokeData = {
        "jokeIterator": aljoke
    }
    console.log(aljoke);

    // read the file and use the callback to render
    fs.readFile('Jokeservice2/Views/index.hbs', function (err, data) {
        if (!err) {
            // make the buffer into a string
            var templateStringify = data.toString();
            // call the render function
            var template = handlebars.compile(templateStringify);
            res.send(template(jokeData));
        } else {
            // handle file read error
            console.log(err);
            res.status(500).send("Error 500: couldn't read template file");
        }
    })
});

function sendStatus(e, response) {
    console.error("Exception: " + e);
    if (e.stack) console.error(e.stack);
    response.status(500).send(e);
}

module.exports = router;