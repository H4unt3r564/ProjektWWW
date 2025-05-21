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
