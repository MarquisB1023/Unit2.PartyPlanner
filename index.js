const COHORT = "2109-CPU-RM-WEB-PT"

const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/guest"

const state = {
    guest: [],
}


const GUESTLIST = document.querySelector("#Guest");

const ADDGUESTLISTFORUM = document.querySelector("#addGuest");

async function render(){
    awaitGuest();
    renderGuests();

}

render();

async function  getGuests(){ 
try{
    const response = await fetch(API_URL);
    const json = await response.json();
    state.guest = json.data;
}catch (error){
    console.error(error);
}
}

function renderGuests(){

if (!state.guests.length){
    GUESTLIST.innerHTML = "<li?No Guests.</li>";
    return;
}
const guestListing = state.guests.map((guest) => {
 const li = document.createElement(("lil"));
 li.innerHTML = `
   <h2>${guest.name}</h2>
   <h2>${guest.email}</h2>
   <h2>${guest.location}</h2>
   <h2>${guest.date}</h2>
   <h2>${guest.time}</h2>
   <p>${guest.decription}</p>
   `;
   return li;
    });
    guestListing.replaceChildren(...guestListing)
 }

// @param {Event}

async function addGuest(Event){
    event.preventDefault();

    try {
        const response = await fetch(API_URL,{
            method:"POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                name:ADDGUESTLISTFORUM.name.value,
                email:ADDGUESTLISTFORUM.email.value,
                date:ADDGUESTLISTFORUM.date.value,
                time:ADDGUESTLISTFORUM.time.value,
                location:ADDGUESTLISTFORUM.location.value,
                description:ADDGUESTLISTFORUM.description.value,
            }),
        });
        if (!response.ok){
            throw newError("Failed to create guest");
        }
        render();
    }catch (error){
        console.error(error);
    }
}