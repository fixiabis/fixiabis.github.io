function scaleFade(elem) {
    var views = document.querySelectorAll(".scale-fade-io-view"),
        viewPage = 0,
        scrollLength = 0;
    for (var i = 0; i < views.length; i++) {
        var view = views[i];
        view.style.zIndex = views.length - i;
        view.style.lineHeight = view.clientHeight + "px";
        view.style.fontSize = view.clientHeight * 0.3 + "px";
        view.style.textAlign = "center";
        view.innerHTML = i + 1;
    }
    views[0].style.transform = "scale(1)";
    views[0].style.opacity = 1;
    function toPage(p) {
        if (!views[p]) return;
        for (var i = 0; i < p; i++) {
            var view = views[i];
            view.style.transform = "scale(2)";
            view.style.opacity = 0;
            view.removeAttribute("show");
            setTimeout(function () {
                if (!view.getAttribute("show"))
                    view.style.display = "none";
            }, 500);
        }
        views[p].style.display = "";
        views[p].setAttribute("show", true);
        viewPage = p;
        setTimeout(function () {
            views[p].style.transform = "scale(1)";
            views[p].style.opacity = 1;
        }, 100);
        for (var i = p + 1; i < views.length; i++) {
            views[i].style.transform = "";
            views[i].style.opacity = "";
        }
    };
    elem.onclick = function () {
        toPage(viewPage + 1);
    };
    elem.oncontextmenu = function (event) {
        event.preventDefault();
        toPage(viewPage - 1);
    };
    elem.onmousewheel = function (event) {
        scrollLength += event.deltaY;
        var vector = Math.sign(scrollLength);
        if (viewPage == views.length - 1) scrollLength = scrollLength > 0 ? 0 : scrollLength;
        if (viewPage == 0) scrollLength = scrollLength < 0 ? 0 : scrollLength;
        if (Math.abs(scrollLength) > views[viewPage].scrollHeight / 2) {
            scrollLength = 0;
            toPage(viewPage + vector);
        }
    };
};