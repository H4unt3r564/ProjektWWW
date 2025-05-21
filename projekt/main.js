// --- SLIDER ---
console.log("main.js działa!");
const obrazki = document.querySelectorAll(".obrazek");

if (obrazki.length > 0) {
  obrazki[0].className = "obrazekAktywny";
}

function zmianaObrazka(kierunek) {
  const obecnyObrazek = document.querySelector(".obrazekAktywny");
  if (!obecnyObrazek) return;

  const index = Array.from(obrazki).indexOf(obecnyObrazek);
  let nowyIndex;

  switch (kierunek) {
    case "lewo":
      nowyIndex = index === 0 ? obrazki.length - 1 : index - 1;
      break;
    case "prawo":
      nowyIndex = index === obrazki.length - 1 ? 0 : index + 1;
      break;
    default:
      return;
  }

  obecnyObrazek.className = "obrazek";
  obrazki[nowyIndex].className = "obrazekAktywny";
  obrazki[nowyIndex].style.animationName =
    kierunek === "lewo" ? "przewijanieZLewej" : "przewijanieZPrawej";
}

// --- MENU ROZWIJANE ---
const menu = document.getElementById("menuRozwijane");

function menuWysuwane() {
  const widokTelefon = window.matchMedia("(max-width: 768px)").matches;
  if (widokTelefon) {
    menu.classList.toggle("pokazaneMenu");
    menu.classList.toggle("ukryteMenu");
  }
}

window.addEventListener("resize", () => {
  const widokTelefon = window.matchMedia("(max-width: 768px)").matches;
  if (!widokTelefon) {
    menu.classList.remove("pokazaneMenu");
    menu.classList.add("ukryteMenu");
  }
});

// --- MODALE ---
const modal = document.getElementById("modal");
const modalZdjecie = document.querySelector("#modalZdjecie img");
const modalImie = document.getElementById("modalImie");
const modalWiek = document.getElementById("modalWiek");
const modalOpis = document.getElementById("modalOpis");
const guzikX = document.getElementById("guzikX");
const adoptuj = document.getElementById("adoptuj");
let aktualneZwierzId = null;

const zwierzaki = document.querySelectorAll(".row img");

zwierzaki.forEach((img) => {
  img.addEventListener("click", async () => {
    const id = parseInt(img.dataset.id);
    if (isNaN(id)) return;

    aktualneZwierzId = id + 1;
    const nextId = id + 1;

    try {
      const res = await fetch(
        `https://test-production-d88d.up.railway.app/api/animal?id=${nextId}`
      );
      if (!res.ok) throw new Error("Błąd sieci");
      const data = await res.json();

      const photoPath = data.photos?.[0]?.photoPath || "";
      const photoUrl = photoPath.startsWith("http") ? photoPath : photoPath;

      modalZdjecie.src = photoUrl;
      modalZdjecie.alt = data.animalName || "Zdjęcie zwierzaka";

      modalImie.textContent = data.animalName || "Brak danych";
      modalWiek.textContent = `Wiek: ${data.animalAge || "brak"} lat`;
      modalOpis.textContent =
        `Futro: ${data.animalFur || "brak"}\n` +
        `W schronisku od: ${data.animalTimeInShelter || "brak"} lat\n` +
        `Wielkość: ${data.animalSize || "brak"}`;

      modal.style.display = "block";
    } catch (err) {
      console.error("Błąd pobierania danych zwierzaka:", err);
      alert("Nie udało się pobrać danych zwierzaka.");
    }
  });
});

guzikX.addEventListener("click", () => {
  modal.style.display = "none";
});

adoptuj.addEventListener("click", () => {
  if (aktualneZwierzId !== null) {
    window.location.href = `rejestracja?id=${aktualneZwierzId}`;
  } else {
    alert("Nie wybrano zwierzaka!");
  }
});

// --- DARKMODE ---
const guzikDarkmode = document.querySelectorAll(".guzikDarkmode");

guzikDarkmode.forEach((guzik) =>
  guzik.addEventListener("click", () => {
    document.querySelector("body").classList.toggle("dark-mode");
  })
);

// --- SEKWENCYJNE FETCHOWANIE ZDJĘĆ Z RETRY I FALLBACKIEM ---
document.addEventListener("DOMContentLoaded", async () => {
  const images = document.querySelectorAll(".zwierzakImg");

  async function fetchWithRetry(url, retries = 10, delay = 500) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      return await res.json();
    } catch (err) {
      if (retries > 0) {
        await new Promise((r) => setTimeout(r, delay));
        return fetchWithRetry(url, retries - 1, delay);
      } else {
        throw err;
      }
    }
  }

  for (const img of images) {
    const id = img.dataset.id;
    try {
      const data = await fetchWithRetry(
        `https://test-production-d88d.up.railway.app/api/photos?id=${id}`
      );
      if (data.photoPath) {
        img.src = data.photoPath;
      } else {
        console.warn(`Brak photoPath dla id ${id}, wstawiono domyślne`);
        img.src = "default-image.jpg"; // ścieżka do obrazka domyślnego
      }
    } catch (err) {
      console.error(`Błąd pobierania dla id ${id}:`, err);
      img.src = "default-image.jpg"; // fallback
    }
  }
});

