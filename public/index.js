// index.js

// const joke = require("../Model/joke");

// const { text } = require("express");

// const joke = require("../Model/joke");

let setupInput = document.getElementById("setup");
let punchlineInput = document.getElementById("punchline");
let opretButton = document.getElementById('sendButton');
let selector = document.querySelector('#selector');
let textarea = document.getElementById('jokes');
let deletebutton = document.getElementById('deleteButton');

async function get(url) {
    console.log(url);
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

async function getText(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.text();
}

async function generateJokesTable(jokes) {
    let template = await getText('/jokes.hbs');
    let compiledTemplate = Handlebars.compile(template);
    return compiledTemplate({ jokes });
}

async function post(url, objekt) {
    const respons = await fetch(url, {
        method: "POST",
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    });
    if (respons.status !== 200) // Created
        throw new Error(respons.status);
    return await respons.json();
}

async function main() {
    post('https://krdo-joke-registry.herokuapp.com/api/services', { name: "Max jokes", address: "https://jokeservice-mahmoud.herokuapp.com/", secret: "Ok" });
    try {
        let jokes = await get('/api/jokes');
        console.log(jokes);
        let generateJokes = await generateJokesTable(jokes);
        console.log(generateJokes);
        textarea.value = generateJokes;

        let othersites = await get('https://krdo-joke-registry.herokuapp.com/api/services');
        for (sites of othersites) {
            let option = document.createElement('option');
            option.innerHTML = sites.name;
            selector.appendChild(option);

        }
    } catch (e) {
        console.log(e.name + ": " + e.message);
    }
}


opretButton.onclick = async () => {
    let setup = setupInput.value;
    let punchline = punchlineInput.value;
    console.log(setup + " " + punchline);
    if (setup && punchline) {
        try {
            await post("/api/jokes", { setup, punchline });
        } catch (e) {
            console.log(e);
        }
        setupInput.value = '';
        punchlineInput.value = '';
        main();
    }
}
selector.addEventListener('change', async () => {
    textarea.value = "";
    let jokes = await get('/api/otherjokes/' + selector.value);
    try {

        console.log(selector.value);
        let generateJokes = await generateJokesTable(jokes);
        console.log(generateJokes);
        textarea.value = generateJokes;
    } catch (e) {
        console.log(e.name + ": " + e.message);
    }


})
deletebutton.addEventListener('click', async () => {


})



// rydButton.onclick = () => {
//     setupInput.value = '';
//     punchlineInput.value = '';
// }

// async function getSites() {
//     try {
//         let result = await get('https://krdo-joke-registry.herokuapp.com/api/services');
//         createSelect(result)
//     }
//     catch (e) {
//         console.log(e);
//     }
// }

// function createSelect(result) {
//     let siteArray = []
//     for (let i = 0; i < result.length; i++) {
//         siteArray.push(result[i].address)
//         let option = document.createElement('option')
//         option.text = siteArray[i]
//         selectSite.add(option, i)
//     }
// }
// getSites()

main();