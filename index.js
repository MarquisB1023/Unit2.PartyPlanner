// const COHORT = "2109-CPU-RM-WEB-PT";

// const API_URL =
//   "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/guest";

// const state = {
//   guest: [],
// };

// const GUESTLIST = document.querySelector("#Guest");

// const ADDGUESTLISTFORUM = document.querySelector("#addGuest");

// {
//     id: 1,
//     fullName: "event name",
//     description: "this is a description of the event",
//     date: "2022-09-30T00:00:00.000z",
//     loaction: "670 Maysberry Alv",
//   },

//   {
//     id: 1,
//     fullName: "event name",
//     description: "this is a description of the event",
//     date: "2022-09-30T00:00:00.000z",
//     loaction: "670 Maysberry Alv",
//   },
//   {
//     id: 1,
//     fullName: "event name",
//     description: "this is a description of the event",
//     date: "2022-09-30T00:00:00.000z",
//     loaction: "670 Maysberry Alv",
//   },

{
  /* <h1>Party List</h1>

<!-- List of parties -->
<ul id="partyList"></ul>

<!-- Form to add a new party -->
<form id="partyForm" method="POST">
  <input
    type="text"
    name="partyName"
    id="partyName"
    placeholder="Party Name"
    required
  />
  <input type="date" id="partyDate" required />
  <input type="time" id="partyTime" required />
  <input type="text" id="partyLocation" placeholder="Location required" />
  <textarea
    name=""
    id="partyDescription"
    placeholder="Party Description"
    cols="5"
    rows="5"
    required
  ></textarea>
  <button type="submit">Schedule Party</button>
</form> */
}

const BASE_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-acc-et-web-pt-b`;
const EVENTS = `${BASE_URL}/events`;

const FORM = document.querySelector("form");
FORM.addEventListener("submit", async function (event) {
  event.preventDefault();
  const elements = FORM.elements;
  const partyName = elements["partyName"].value;
  const partyDate = elements["partyDate"].value;
  const partyTime = elements["partyTime"].value;
  const partyLocation = elements["partyLocation"].value;
  const partyDescription = elements["partyDescription"].value;

  const newPartyData = {
    name: partyName,
    date: `${partyDate}T${partyTime}:00Z`,
    location: partyLocation,
    description: partyDescription,
  };
  console.log(newPartyData);
  await createEvent(newPartyData);
  fetchEvents();
});

function createPartyCard(tittle, fullName, date, address, description) {
  const PARTY_CARDS = document.querySelector("#cards");
  const PARTY_CARD = document.createElement("div");
  PARTY_CARD.classList.add("card");
  const PARTY_CARD_TITTLE = document.createElement("div");
  PARTY_CARD_TITTLE.textContent = tittle;
  PARTY_CARD_TITTLE.classList.add("tittle");
  const PARTY_CARD_NAME = document.createElement("p");
  PARTY_CARD_NAME.textContent = fullName;
  PARTY_CARD_NAME.classList.add("fullName");
  const PARTY_CARD_DATE = document.createElement("p");
  PARTY_CARD_DATE.textContent = date;
  PARTY_CARD_DATE.classList.add("date");
  const PARTY_CARD_ADDRESS = document.createElement("p");
  PARTY_CARD_ADDRESS.textContent = address;
  PARTY_CARD_ADDRESS.classList.add("address");
  const PARTY_CARD_DESCRIPTION = document.createElement("p");
  PARTY_CARD_DESCRIPTION.textContent = description;
  PARTY_CARD_DESCRIPTION.classList.add("description");

  PARTY_CARD.append(
    PARTY_CARD_TITTLE,
    PARTY_CARD_NAME,
    PARTY_CARD_DATE,
    PARTY_CARD_ADDRESS,
    PARTY_CARD_DESCRIPTION
  );

  PARTY_CARDS.append(PARTY_CARD);
}

function renderPartyCards(parties) {
  for (const party of parties) {
    createPartyCard(party.name, party.date, party.address, party.description);
  }
}

async function fetchEvents() {
  try {
    //pausing to get a response
    const response = await fetch(EVENTS);
    if (!response.ok) {
      console.log(`API error`, response.status);
      return;
    }
    const jsonResponse = await response.json();
    const parties = jsonResponse.data;
    renderPartyCards(parties);
  } catch (err) {
    console.error(err);
  }
}

async function createEvent(event) {
  try {
    //pausing to get a response
    const response = await fetch(EVENTS, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      console.log(`API error`, response);

      return;
    }
    const jsonResponse = await response.json();
    const parties = jsonResponse.data;

    console.log(parties);
  } catch (err) {
    console.error(err);
  }
}
fetchEvents();

// async function render() {
//   awaitGuest();
//   renderGuests();
// }

// render();

// async function getGuests() {
//   try {
//     const response = await fetch(API_URL);
//     const json = await response.json();
//     state.guest = json.data;
//   } catch (error) {
//     console.error(error);
//   }
// }

// function renderGuests() {
//   if (!state.guests.length) {
//     GUESTLIST.innerHTML = "<li?No Guests.</li>";
//     return;
//   }
//   const guestListing = state.guests.map((guest) => {
//     const li = document.createElement("lil");
//     li.innerHTML = `
//    <h2>${guest.name}</h2>
//    <h2>${guest.email}</h2>
//    <h2>${guest.location}</h2>
//    <h2>${guest.date}</h2>
//    <h2>${guest.time}</h2>
//    <p>${guest.decription}</p>
//    `;
//     return li;
//   });
//   guestListing.replaceChildren(...guestListing);
// }

// // @param {Event}

// async function addGuest(Event) {
//   event.preventDefault();

//   try {
//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name: ADDGUESTLISTFORUM.name.value,
//         email: ADDGUESTLISTFORUM.email.value,
//         date: ADDGUESTLISTFORUM.date.value,
//         time: ADDGUESTLISTFORUM.time.value,
//         location: ADDGUESTLISTFORUM.location.value,
//         description: ADDGUESTLISTFORUM.description.value,
//       }),
//     });
//     if (!response.ok) {
//       throw newError("Failed to create guest");
//     }
//     render();
//   } catch (error) {
//     console.error(error);
//   }
// }
