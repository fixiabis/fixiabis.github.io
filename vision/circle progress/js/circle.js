class Circle {
    constructor() {
        var createDiv = (attrs, execs) => createElement("div", attrs, execs);
        var content = createDiv({ className: "circle-content", innerHTML: "0%" }),
            leftCover = createDiv({ className: "circle-left-cover" }),
            left = createDiv({ className: "circle-left" }),
            right = createDiv({ className: "circle-right" }),
            circle = createDiv({ className: "circle" }, {
                appendChild: [left, right]
            }),
            container = createDiv({ className: "circle-container" }, {
                appendChild: [circle, leftCover, content]
            });
        this.view = container;
        this.circleView = {
            leftCover: leftCover,
            left: left,
            right: right,
            content: content
        };
        this._ = {
            size: 0,
            lineWidth: 0
        };
    }
    progress(per) {
        if (per > 100) per = 100;
        setAttrs.bind(this.circleView)({
            left: { style: { transform: `rotate(${per / 100 * 360}deg)` } },
            right: { style: { transform: `rotate(${per > 50 ? 180 : per / 100 * 360}deg)` } },
            leftCover: {
                style: {
                    display: per > 75 ? "none" : "",
                    height: per > 50 && per < 75 ? "50%" : ""
                }
            },
            content: { innerHTML: per + "%" }
        });
        if (per == 100) this.oncomplete();
    }
    set container(elem) {
        elem.appendChild(this.view);
    }
    set size(size) {
        setAttrs.bind(this.view.style)({
            width: size + "px",
            height: size + "px",
            lineHeight: size - this._.lineWidth * 2 + "px",
            textAlign: "center",
            fontSize: size * 0.3 + "px"
        });
        this._.size = size;
    }
    set lineWidth(size) {
        var viewSize = this.view.clientWidth;
        setAttrs.bind(this.circleView.content.style)({
            width: viewSize - size * 2 + "px",
            height: viewSize - size * 2 + "px",
            top: size + "px", left: size + "px"
        });
        this.view.style.lineHeight = this._.size - size * 2 + "px";
        this._.lineWidth = size;
    }
    set lineColor(color) {
        this.circleView.left.style.background = color;
        this.circleView.right.style.background = color;
    }
    set fontColor(color) {
        this.view.style.color = color;
    }
    set background(background) {
        this.view.style.background = background;
    }
}