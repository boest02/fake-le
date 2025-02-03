

async function getWord() {
    const response = await fetch("https://random-word-api.herokuapp.com/word?length=5");
    const json = await response.json();
    console.log(json[0])
    return json[0];
}

export default getWord;