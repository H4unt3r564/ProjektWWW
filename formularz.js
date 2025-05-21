document.addEventListener("DOMContentLoaded", () => {
  const formularz = document.getElementById("formularzRejestracji");

  if (!formularz) {
    console.error("Nie znaleziono formularza o id 'formularzRejestracji'");
    return;
  }

  formularz.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Formularz wysłany");

    // Pobieranie wartości z formularza
    const firstName = document.getElementById("imie").value.trim();
    const lastName = document.getElementById("nazwisko").value.trim();
    const phoneNumber = document.getElementById("tel").value.trim();
    const mail = document.getElementById("email").value.trim();
    const address = document.getElementById("adres").value.trim();

    // Pobranie animalId z URL
    const params = new URLSearchParams(window.location.search);
    const zwierzakId = params.get("id");

    if (!zwierzakId) {
      alert("Brakuje ID zwierzaka w adresie URL!");
      return;
    }

    // Przygotowanie obiektu osoby
    const osoba = {
      firstName,
      lastName,
      address,
      city: "Brak danych",
      email: mail,
      phoneNumber,
    };

    try {
      // Wysłanie danych osoby
      const res = await fetch(
        "https://test-production-d88d.up.railway.app/api/persons",
        {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(osoba),
        }
      );

      if (!res.ok) throw new Error("Nie udało się dodać osoby");

      const data = await res.json();
      const personId = data.id; // Zakładamy, że backend zwraca ID osoby

      // Przygotowanie obiektu adopcji
      const adopcja = {
        personId,
        animalId: parseInt(zwierzakId, 10),
      };

      // Wysłanie powiązania adopcji
      const res2 = await fetch(
        "https://test-production-d88d.up.railway.app/api/adoptions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(adopcja),
        }
      );

      if (!res2.ok) throw new Error("Nie udało się powiązać osoby z adopcją");

      alert("Zgłoszenie zostało zapisane! ❤️");
      window.location.href = "Strona Główna.html"; // przekierowanie po sukcesie
    } catch (err) {
      console.error("Błąd:", err);
      alert("Wystąpił błąd podczas zapisu.");
    }
  });

    
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