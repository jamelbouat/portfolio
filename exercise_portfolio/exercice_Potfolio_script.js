$(document).ready(function() {
    var element1 = document.getElementsByClassName("knowledge6");
    var element2 = document.getElementsByClassName("dot2");
    var x = document.querySelectorAll("div.percentage");
    $(window).on('scroll', function() {
        var scroll_pos = $(window).scrollTop() + $(window).height();
        var element_pos = $(element1).offset().top;
        if (scroll_pos > element_pos) {
            document.querySelector("div.knowledge1").style.width = "75%";
            document.querySelector("div.knowledge2").style.width = "65%";
            document.querySelector("div.knowledge3").style.width = "60%";
            document.querySelector("div.knowledge4").style.width = "65%";
            document.querySelector("div.knowledge5").style.width = "50%";
            document.querySelector("div.knowledge6").style.width = "45%";
            for (let i = 0; i < 6; i++) {
                x[i].style.opacity = "1"
            }
        }
    });

    var y = document.querySelectorAll("div.study");
    $(window).on('scroll', function() {
        var scroll_pos1 = $(window).scrollTop() + $(window).height();
        var element_pos1 = $(element2).offset().top;
        if (scroll_pos1 > element_pos1) {
            document.querySelector("div.line").style.height = "460px";

            for (let i = 0; i < 6; i++) {
                y[i].style.opacity = "1";
            }
        }
    });

    var m = document.getElementById("myid0");
    m.addEventListener("click", function() {
        m.classList.toggle("cross");
        var x = document.getElementById("myid1");
        if (x.className === "navigation") {
            x.className += " show";
        } else {
            x.className = "navigation";
        }
    });
});