// SLIDER
const obrazki = document.querySelectorAll(".obrazek")
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

// MODALE
const modal = document.getElementById("modal");
const modalZdjecie = document.getElementById("modalZdjecie");
const modalImie = document.getElementById("modalImie");
const modalWiek = document.getElementById("modalWiek");
const modalOpis = document.getElementById("modalOpis");
const guzikX = document.getElementById("guzikX");

const zwierzaki = document.querySelectorAll(".row img");

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