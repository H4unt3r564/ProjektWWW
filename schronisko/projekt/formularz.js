formularz.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("imie").value.trim();
  const lastName = document.getElementById("nazwisko").value.trim();
  const phoneNumber = document.getElementById("tel").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("adres").value.trim();

  const params = new URLSearchParams(window.location.search);
  const zwierzakId = params.get("id");

  if (!zwierzakId) {
    alert("Brakuje ID zwierzaka w adresie URL!");
    return;
  }

  const osoba = {
    firstName,
    lastName,
    address,
    city: "Brak danych",
    mail: email,
    phoneNumber,
  };

  try {
    // 1. Dodaj osobę
    const resPerson = await fetch(
      "https://test-production-d88d.up.railway.app/api/persons",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(osoba),
      }
    );

    if (!resPerson.ok) {
      const errText = await resPerson.text();
      throw new Error(`Błąd dodawania osoby: ${errText}`);
    }

    const nowaOsoba = await resPerson.json();

    // 2. Dodaj adopcję z personId i animalId
    const adoptionData = {
      personId: nowaOsoba.personId,
      animalId: parseInt(zwierzakId, 10),
    };

    const resAdoption = await fetch(
      "https://test-production-d88d.up.railway.app/api/adoptions",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adoptionData),
      }
    );

    if (!resAdoption.ok) {
      const errText = await resAdoption.text();
    }

    const nowaAdopcja = await resAdoption.json();

    window.location.href = "Strona Główna.html";

  } catch (err) {
    window.location.href = "Strona Główna.html";
  }
});

// MENU ROZWIJANE
const menu = document.getElementById("menuRozwijane");

function menuWysuwane() {
    const widokTelefon = window.matchMedia("(max-width: 768px)").matches;
    if(widokTelefon){
        menu.classList.toggle("pokazaneMenu");
        menu.classList.toggle("ukryteMenu");
    }       
}

window.addEventListener("resize", () =>{
    const widokTelefon = window.matchMedia("(max-width: 768px)").matches; //musi byc dwa razy bo sie aktualizuje
        if(!widokTelefon){
            menu.classList.remove("pokazaneMenu");
            menu.classList.add("ukryteMenu");
        }
})

// DARkMODE
const guzikDarkmode = document.querySelectorAll(".guzikDarkmode");
const logo = document.getElementById("logo").querySelector("img");

guzikDarkmode.forEach(guzik =>
    guzik.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        czyDark = document.body.classList.contains("dark-mode");

        //zmiana logo
        logo.src = czyDark ? "nowelogo_darkmode.jpg" : "logo.jpg";
        //localstorage na darkmode
        localStorage.setItem("darkmode", czyDark);
    })
)

//LOCALSTORAGE
window.onload = function(){
    if(localStorage.getItem("darkmode") === "true"){
        document.body.classList.add("dark-mode");
        logo.src = "nowelogo_darkmode.jpg";
    }else{
        document.body.classList.remove("dark-mode");
        logo.src = "logo.jpg";
    }
}
