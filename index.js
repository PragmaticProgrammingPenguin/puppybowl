const puppyList = [
    {Name: "Bubbles", Breed: "Pyrenese", Team:"Unassigned"},
    {Name:"Timmy" , Breed: "Adorable", Team:"Unassigned"},
    {Name:"Floofy", Breed: "Hair", Team:"Unassigned"},
    {Name:"Scruffles", Breed: "Rat Terrier", Team:"Unassigned"},
    {Name:"Wally", Breed:"Waffle Retriever", Team:"Unassigned"},
];

var roster = [
];

const submit = document.querySelector("#Submit");

function renderPuppies() {
    const puppies = document.querySelector("#puppies");
    for(i in puppyList){
        const puppy = puppyList[i];
        const newItem = document.createElement("p");
        newItem.innerText = `Name:${puppy.Name} Breed:${puppy.Breed}`;
        newItem.setAttribute('id', `${puppy.Name}Data`);

        const newPic = document.createElement("img");
        createPic(puppy, newPic);

        const newModalButton = document.createElement('input');
        createModalButton(puppy, newModalButton);

        const removeButton = document.createElement('input');
        createRemoveButton(puppy, removeButton);

        puppies.appendChild(newItem);
        puppies.appendChild(newPic);
        puppies.appendChild(newModalButton);
        puppies.appendChild(removeButton);
    }
}

function addPuppy(){
    puppyName = document.querySelector("#Name").value;
    puppyBreed = document.querySelector("#Breed").value;
    roster.push({Name:puppyName, Breed:puppyBreed});
    renderRoster(puppyName, puppyBreed);
};

function renderRoster(puppyName, puppyBreed) {
    const puppyRoster = document.querySelector("#roster");
    const newItem = document.createElement("p");
    newItem.innerText = `Name:${puppyName} Breed:${puppyBreed}`;
    const newPic = document.createElement("img");
    newPic.setAttribute('src', `assets/${puppyName}.jpg`);
    newPic.setAttribute('height', '100px');
    newPic.setAttribute('width', '100px');
    puppyRoster.appendChild(newItem);
    puppyRoster.appendChild(newPic);
}

function refreshRoster(){
    const puppyRoster = document.querySelector("#roster");
    puppyRoster.replaceChildren();

}

function removeRoster(puppyName){
    roster = roster.filter((name) => name.Name !== puppyName)
    refreshRoster();
    for(i in roster){
        renderRoster(roster[i].Name, roster[i].Breed);
    }
}

function createPic(puppy, newPic){
    newPic.setAttribute('src', `assets/${puppy.Name}.jpg`);
        newPic.setAttribute('height', '100px');
        newPic.setAttribute('width', '100px');
        newPic.setAttribute('id',`${puppy.Name}img`);
}

function createModalButton(puppy, newModalButton){
    newModalButton.setAttribute('type', 'submit');
    newModalButton.setAttribute('id', puppy.Name);
    newModalButton.setAttribute('value', 'Enlarge');
    newModalButton.addEventListener("click", function(){
        enlargePicture(puppy.Name, puppy.Team);
    }, {once: true});
}

function ReduceButton(puppyName, puppyTeam, tagName, toggleButton){
    teamTag = document.getElementById(`${puppyName}Data`);
    teamTag.remove();

    tagName.setAttribute('height', '100px');
    tagName.setAttribute('width', '100px');
    
    toggleButton.setAttribute('value', 'Enlarge');
    toggleButton.addEventListener("click", function(){
        enlargePicture(puppyName, puppyTeam);
    }, {once: true});
}

function createRemoveButton(puppy, removeButton){
    removeButton.setAttribute('type', 'submit');
    removeButton.setAttribute('id', `remove${puppy.Name}`);
    removeButton.setAttribute('value', 'Remove');
    removeButton.addEventListener("click", function (){
        removeRoster(puppy.Name);
    });
}

function enlargePicture(puppyName, puppyTeam){
    tagName = document.querySelector(`#${puppyName}img`);
    tagName.setAttribute('height', '300px');
    tagName.setAttribute('width', '300px');
    team = document.createElement("p");
    team.setAttribute('id', `#${puppyName}team`);
    team.innerText = puppyTeam;
    document.querySelector(`#${puppyName}Data`).appendChild(team);
    toggleButton = document.querySelector(`#${puppyName}`);
    toggleButton.setAttribute('value', 'Reduce');
    toggleButton.addEventListener("click", function(){
        ReduceButton(puppyName, puppyTeam, tagName, toggleButton);
    }, {once: true});

}

submit.addEventListener("click", function (){
    addPuppy();
})

renderPuppies();

if(roster.length > 0){
    for(i in roster){
        renderRoster(roster[i].Name, roster[i].Breed);
    }
}