
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
    .get('/:site', (req, res) => {
        // Get jokes from specific service
        console.log(req.params.site);
        controller.getOtherSiteJokes(req.params.site)
            .then(result => res.json(result))
            .catch(err => {
                console.error("Error: " + err);
                if (err.stack) console.error(err.stack);
                res.status(500).send(err);
            });

    })

function sendStatus(e, response) {
    console.error("Exception: " + e);
    if (e.stack) console.error(e.stack);
    response.status(500).send(e);
}

module.exports = router;