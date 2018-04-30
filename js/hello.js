var hello = document.getElementById("hello"),
    animation = "I'm fixiabis",
    duration = [
        8, 9, 10, 11, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
    ];
hello.focus();
hello.value += " ";
hello.addEventListener("keypress", function (event) { event.preventDefault(); })
for (var i = 0; i < animation.length; i++)
    (function (i) {
        setTimeout(() => {
            hello.value += animation[i]
        }, duration[i] * 100)
    })(i);
setTimeout(() => {
    hello.style.opacity = 0;
    setTimeout(() => {
        hello.style.display = "none";
    }, 2450)
}, 2400);
document.querySelector("#content").style.display = "none";
setTimeout(() => {
    document.querySelector("#content").style.display = "";
    document.querySelector("header").style.animation = "unset";
}, 3000);