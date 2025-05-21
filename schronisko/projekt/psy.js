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