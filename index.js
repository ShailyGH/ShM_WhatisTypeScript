"use strict";

function testingReload(event){
    event.preventDefault();
    clearPrev();
    console.log("in the function");
    const wordToSearch = document.getElementById('wordToSearch').value;
    console.log(wordToSearch);
    fetchWordDetail(wordToSearch);
    return false; // prevent reload
};
function fetchWordDetail(word)
{
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word).then(res => {return res.json()}).then(
        data => {
            console.log("fetch word - 1 ");
            console.log(data);
            console.log("fetch word - 2 ");
            console.log(data[0].meanings);
            console.log("fetch word - 3 ");
            console.log(word);
            document.getElementById('wordHeading').innerHTML = word;
            //console.log(data[0].word);
            data.forEach(
                result => {
                    const definition = result.meanings;
                    definition.forEach(
                        def => {
                            let defVar = def.definitions[0].definition;
                            if(document.getElementById(`definitions-${def.partOfSpeech}`) != null){
                                console.log("in if");
                                const defintionMarkUp = `<li id="${defVar}">${defVar}</li>`;
                                document.getElementById(`definitions-${def.partOfSpeech}`).insertAdjacentHTML("beforeend", defintionMarkUp);
                            }
                            else{
                                console.log("in else");
                                const posMarkUp = `<li id="pos" class="${def.partOfSpeech} mt-2"><i>${def.partOfSpeech}</i></li><ul id="definitions-${def.partOfSpeech}"></ul>`;
                                document.getElementById('definitionBody').insertAdjacentHTML("beforeend", posMarkUp);
                                const defintionMarkUp = `<li id="${defVar}">${defVar}</li>`;
                                document.getElementById(`definitions-${def.partOfSpeech}`).insertAdjacentHTML("beforeend", defintionMarkUp);
                            }
                            console.log(def.synonyms);
                            if(def.synonyms.length > 0){
                                const synonymMarkUp = `<li id="synonyms" class="list-last-no-bullet text-primary text-opacity-75">&ensp;&ensp;&ensp;&ensp;Synonyms: </li>`;
                                document.getElementById(`definitions-${def.partOfSpeech}`).insertAdjacentHTML("afterend", synonymMarkUp);
                                def.synonyms.forEach(
                                    syn => {
                                        const synMarkUp = `<span class="badge rounded-pill bg-secondary me-1">${syn} </span>`;
                                        document.getElementById(`synonyms`).insertAdjacentHTML("beforeend", synMarkUp);
                                    }
                                )
                            }
                        }
                    )
                }
            )
        });
};
function clearPrev(){
    console.log("1 - " + document.getElementById('definitionBody'.innerHTML));
    if(document.getElementById('pos') != null){
        const posList = document.getElementById('definitionBody');
        console.log("2 - " + posList);
        console.log("3 - " + "in clearPrev(): " + posList.hasChildNodes());
        while(posList.hasChildNodes()){
            if(posList.firstElementChild == null){
                break;
            }
            console.log("4 - " + posList.firstElementChild);
            posList.removeChild(posList.firstElementChild);
            console.log("5 - " + posList.firstElementChild);
        }
    }
}