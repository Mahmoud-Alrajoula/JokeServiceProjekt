// index.js
let setupInput = document.querySelector("#setup");
let punchlineInput = document.querySelector("#punchline");
let opretButton = document.querySelector('#addButton');
let rydButton = document.querySelector('#deleteButton');
let selectSite = document.querySelector('#siteSelector');
let othersitesObjects = [];

selectSite.onchange = async () => {
    try {
        let id;
        for (site of othersitesObjects) {
            if (site.name === selectSite.value) {
                id = site._id
                break;
            }
        }
        if (selectSite.value !== 'gruppeseks') {
            document.getElementById('create').style.visibility = 'hidden';
        } else {
            document.getElementById('create').style.visibility = 'visible';
        }
        visJokes("/api/otherjokes/" + id);
    }
    catch (e) {
        alert("jokeservice Not available")
    }
}


async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

async function post(url, objekt) {
    const respons = await fetch(url, {
        method: "POST",
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    });
    if (respons.status !== 201) // Created
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
    let template = await getText('/index.hbs');
    let compiledTemplate = Handlebars.compile(template);
    return compiledTemplate({ jokes });
}

async function visJokes(url) {
    try {
        let jokes = await get(url);
        let textarea = document.querySelector('#jokes')
        textarea.innerHTML = await generateJokesTable(jokes);
    } catch (e) {
        console.log(e.name + ": " + e.message);
    }
}

async function getSites() {
    try {
        let result = await get('/api/othersites');
        othersitesObjects = result
        createSelect(result)
    }
    catch (e) {
        console.log(e);
    }
}



async function main() {
    try {
        let jokes = await get('/joke/api/jokes');
        let textarea = document.getElementById('jokes')
        textarea.innerHTML = await generateJokesTable(jokes);
    } catch (e) {
        console.log(e.name + ": " + e.message);
    }
}
main();

addButton.onclick = async () => {
    if (setupField.value && punchlineField.value) {
        try {
            await post("/api/jokes", { setup: setupField.value, punchline: punchlineField.value });
        } catch (e) {
        }
        setupField.value = ""
        punchlineField.value = ""
        visJokes('/api/jokes')
    }
}

deleteButton.onclick = () => {
    setupInput.value = '';
    punchlineInput.value = '';
}

async function getSites() {
    try {
        let result = await get('https://krdo-joke-registry.herokuapp.com/api/services');
        createSelect(result)
    }
    catch (e) {
        console.log(e);
    }
}

function createSelect(result) {
    let siteArray = []
    for (let i = 0; i < result.length; i++) {
        siteArray.push(result[i].name)
        let option = document.createElement('option')
        option.text = siteArray[i]
        selectSite.add(option, i)

        if (option.text == 'gruppeseks') {
            option.selected = 'selected';
        }
    }

}

visJokes('/api/jokes');
getSites()