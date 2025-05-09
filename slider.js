obrazki = document.querySelectorAll(".obrazek");

obrazki[0].className = "obrazekNaSliderze";

function wLewo(){
    const obecnyObrazek = document.querySelector(".obrazekNaSliderze");
    const index = Array.from(obrazki).indexOf(obecnyObrazek);

    let nowyIndex;
    if (index === 0) {
        nowyIndex = obrazki.length - 1;
    } else {
        nowyIndex = index - 1;
    }
    obecnyObrazek.className = "obrazek";
    obrazki[nowyIndex].className= "obrazekNaSliderze";
}

function wPrawo(){
    const obecnyObrazek = document.querySelector(".obrazekNaSliderze");
    const index = Array.from(obrazki).indexOf(obecnyObrazek);

    let nowyIndex;
    if (index === obrazki.length - 1) {
        nowyIndex = 0;
    } else {
        nowyIndex = index + 1;
    }
    obecnyObrazek.className = "obrazek";
    obrazki[nowyIndex].className = "obrazekNaSliderze";
    
}

// setInterval(wPrawo, 3000);