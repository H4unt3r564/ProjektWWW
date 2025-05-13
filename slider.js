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