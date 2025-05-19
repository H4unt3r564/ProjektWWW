// SLIDER
obrazki = document.querySelectorAll(".obrazek")

obrazki[0].className = "obrazekAktywny"

function zmianaObrazka(kierunek){
    const obecnyObrazek = document.querySelector(".obrazekAktywny");
    const index = Array.from(obrazki).indexOf(obecnyObrazek);
    let nowyIndex;

    switch(kierunek){
        case "lewo":
            nowyIndex = index === 0 ? obrazki.length - 1 : index - 1;
            break;
        case "prawo":
            nowyIndex = index === obrazki.length - 1 ? 0 : index + 1;
            break;
    }
    obecnyObrazek.className = "obrazek";
    obrazki[nowyIndex].className = "obrazekAktywny";
    obrazki[nowyIndex].style.animationName = kierunek === "lewo" ? "przewijanieZLewej" : "przewijanieZPrawej";
}


// MENU ROZWIJANE
function menuWysuwane() {
    const menu = document.getElementById("menuRozwijane");
    menu.classList.toggle("pokazaneMenu");
    menu.classList.toggle("ukryteMenu");
}

// MODALE
modal = document.getElementById("modal");
modalZdjecie = document.getElementById("modalZdjecie");
modalImie = document.getElementById("modalImie");
modalWiek = document.getElementById("modalWiek");
modalOpis = document.getElementById("modalOpis");
guzikX = document.getElementById("guzikX");

zwierzaki = document.querySelectorAll(".row img");

zwierzaki.forEach(img => {
    img.addEventListener("click", () => {
        modalImie.innerHTML = "imie";
        modalWiek.innerHTML = "wiek";
        modalOpis.innerHTML = "opis";
        modal.style.display = "block";
    })
});

function zamknijModal(){
    modal.style.display = "none";
}