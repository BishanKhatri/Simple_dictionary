const inputEl = document.getElementById('input')
const infoTextEl = document.getElementById('info-text')
const meaningContainer = document.getElementById('meaning-container')
const title = document.getElementById('title')
const meaning = document.getElementById('meaning')
const audio = document.getElementById('audio')

async function fetchAPI(word) {


    try {
        infoTextEl.style.display = "block"
        meaningContainer.style.display = 'none'
        infoTextEl.innerText = `Searching the meaning of "${word}"`
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        const result = await fetch(url).then((res)=>res.json());

        if(result.title){
            infoTextEl.style.display = "none"
            meaningContainer.style.display = 'block'
            title.innerText = word;
            meaning.innerText = 'Word not-found'
            audio.style.display = 'none'
        } else {
            audio.style.display = 'inline-flex'
            infoTextEl.style.display = "none"
            meaningContainer.style.display = 'block'
            title.innerText = result[0].word
            meaning.innerText = result[0].meanings[0].definitions[0].definition;
            audio.src = result[0].phonetics[0].audio;
        }
        


    } catch (error) {
        infoTextEl.innerText = `an error happened, try again later`;
        
    }

}




inputEl.addEventListener("keyup", (e) =>{
    if(e.target.value && e.key ==="Enter"){
        fetchAPI(e.target.value);
    }
});