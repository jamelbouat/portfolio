
function ShowHidePreloader() {
    // Show preloader container
    let preloader=document.getElementsByClassName("preloader_container")[0];
    setTimeout(function(){preloader.style.display="none";}, 2500);
    // Hide preloader container
}

window.onload=function(){

    ShowHidePreloader();

    // Get the 4 buttons à propos, contact, experience, portfolio
    let button1=document.querySelector("a.top_cont");
    let button2=document.querySelector("a.right_cont");
    let button3=document.querySelector("a.bottom_cont");
    let button4=document.querySelector("a.left_cont");

    // Get the accueil container
    let accueilContainer=document.querySelector("div.accueil_container");

    // Get the 4 container elements, à propos, contact, portfolio, et experience
    let propos_content=document.getElementById("propos_slide");
    let contact_content=document.getElementById("contact_slide");
    let experience_content=document.getElementById("experience_slide");
    let portfolio_content=document.getElementById("portfolio_slide");

    // Get the 4 close container buttons
    let Close_button1=document.querySelector("div.a_propos_close_button");
    let Close_button2=document.querySelector("div.contact_close_button");
    let Close_button3=document.querySelector("div.experience_close_button");
    let Close_button4=document.querySelector("div.portfolio_close_button");

    // media screen: condition pour l'affichage d'un container
    let x = window.matchMedia("(max-height: 730px)");
    let y = window.matchMedia("(min-width: 1368px)");

    // Add a event click on Close_button1
    Close_button1.addEventListener("click",function () {
        propos_content.style.top="-100%";
        propos_content.classList.add("a_propos_close_class");
        propos_content.classList.remove("a_propos_container");
        setTimeout(function(){propos_content.style.display="none";}, 500);

        // Closing the container, come back to the initial padding
        if (x.matches) {
            setTimeout(function(){accueilContainer.style.padding="340px 0";}, 500);
        }
        if (y.matches) {
            setTimeout(function(){accueilContainer.style.padding="490px 0";}, 500);
        }
    });

    // Add a event click on Close_button2
    Close_button2.addEventListener("click",function () {
        contact_content.style.left="100%";
        contact_content.classList.add("contact_close_class");
        contact_content.classList.remove("contact_container");
        setTimeout(function(){contact_content.style.display="none";}, 500);

        // Closing the container, come back to the initial padding
        if (x.matches) {
            setTimeout(function(){accueilContainer.style.padding="340px 0";}, 500);
        }
        if (y.matches) {
            setTimeout(function(){accueilContainer.style.padding="490px 0";}, 500);
        }
    });

    // Add a event click on Close_button3
    Close_button3.addEventListener("click",function () {
        experience_content.style.top="100%";
        experience_content.classList.add("experience_close_class");
        experience_content.classList.remove("experience_container");
        setTimeout(function(){experience_content.style.display="none";}, 500);

        // Closing the container, come back to the initial padding
        if (x.matches) {
            setTimeout(function(){accueilContainer.style.padding="340px 0";}, 500);
        }
        if (y.matches) {
            setTimeout(function(){accueilContainer.style.padding="490px 0";}, 500);
        }
    });

    // Add a event click on Close_button4
    Close_button4.addEventListener("click",function () {
        portfolio_content.style.right="100%";
        portfolio_content.classList.add("portfolio_close_class");
        portfolio_content.classList.remove("portfolio_container");
        setTimeout(function(){portfolio_content.style.display="none";}, 500);

        // Closing the container, come back to the initial padding
        if (x.matches) {
            setTimeout(function(){accueilContainer.style.padding="340px 0";}, 500);
        }
        if (y.matches) {
            setTimeout(function(){accueilContainer.style.padding="490px 0";}, 500);
        }
    });

    // Add events onclick button1
    button1.addEventListener("click",function () {
        propos_content.style.display="block";
        propos_content.style.top="0";
        propos_content.classList.remove("a_propos_close_class");
        propos_content.classList.add("a_propos_container");
        // Changement de padding du background pour couvrir le fond,
        // à la fermeture de a_propos_container (au lieu d'avoir un fond blanc)
        if ((x.matches)||(y.matches)) {
            accueilContainer.style.padding = "700px 0";
        }
    });

    // Add events onclick button2
    button2.addEventListener("click",function () {
        contact_content.style.display="block";
        contact_content.style.left="0";
        contact_content.classList.remove("contact_close_class");
        contact_content.classList.add("contact_container");
        // Changement de padding du background pour couvrir le fond,
        // à la fermeture de contact_container (au lieu d'avoir un fond blanc)
        if ((x.matches)||(y.matches)) {
            accueilContainer.style.padding = "640px 0";
        }
    });

    // Add events onclick button3
    button3.addEventListener("click",function () {
        experience_content.style.display="block";
        experience_content.style.top="0";
        experience_content.classList.remove("experience_close_class");
        experience_content.classList.add("experience_container");
        // Changement de padding du background pour couvrir le fond,
        // à la fermeture de experience_container (au lieu d'avoir un fond blanc)
        if ((x.matches)||(y.matches)) {
            accueilContainer.style.padding = "700px 0";
        }
    });

    // Add events onclick button4
    button4.addEventListener("click",function () {
        portfolio_content.style.display="block";
        portfolio_content.style.right="0";
        portfolio_content.classList.remove("portfolio_close_class");
        portfolio_content.classList.add("portfolio_container");
        // Changement de padding du background pour couvrir le fond,
        // à la fermeture de portfolio_container (au lieu d'avoir un fond blanc)
        if (x.matches) {
            accueilContainer.style.padding = "615px 0";
        }
        if (y.matches) {
            accueilContainer.style.padding = "755px 0";
        }
    });
};

$(document).ready(function() {
    $(".bottom_cont").click(function(){

        // Changement opacity de 0 à l'origine à 1
        // pour les pourcentages dans les balises p dans savoirs_container
        $(".knowledge_container p").fadeTo(4000, 1);

        // Animations des 8 svg du savoirs_container,
        // changement de stroke-dashoffset pour les différents svg.
        // Durée d'animation 2000ms
        $(".html_circle").animate({
            "stroke-dashoffset":["142px","linear"],
        },2000);

        $(".css_circle").animate({
            "stroke-dashoffset":["198px","linear"],
        },2000);

        $(".bootstrap_circle").animate({
            "stroke-dashoffset":["310px","linear"],
        },2000);

        $(".js_circle").animate({
            "stroke-dashoffset":["339px","linear"],
        },2000);

        $(".jquery_circle").animate({
            "stroke-dashoffset":["395px","linear"],
        },2000);

        $(".php_circle").animate({
            "stroke-dashoffset":["423px","linear"],
        },2000);

        $(".mysql_circle").animate({
            "stroke-dashoffset":["339px","linear"],
        },2000);

        $(".react_circle").animate({
            "stroke-dashoffset":["310px","linear"],
        },2000);

        $(".graphQL_circle").animate({
            "stroke-dashoffset":["395px","linear"],
        },2000);

        $(".java_circle").animate({
            "stroke-dashoffset":["339px","linear"],
        },2000);

        $(".git_circle").animate({
            "stroke-dashoffset":["339px","linear"],
        },2000);

        $(".wordpress_circle").animate({
            "stroke-dashoffset":["339px","linear"],
        },2000);
    });
});
