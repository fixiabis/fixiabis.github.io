class ViewableBoard extends Board {
    constructor(w, h, container) {
        super(w, h);
        var view = document.createElement("canvas"),
            painter = view.getContext("2d"),
            gridSizeFromHeight = Math.floor((container.clientHeight - h - 1) / h),
            gridSizeFromWidth = Math.floor((container.clientWidth - w - 1) / w),
            gridSize = Math.min(gridSizeFromHeight, gridSizeFromWidth);
        view.height = (gridSize + 1) * h + 1;
        view.width = (gridSize + 1) * w + 1;
        view.style.margin =
            `${(container.clientHeight - view.height) / 2}px ${(container.clientWidth - view.width) / 2}px`;
        painter.imageSmoothingEnabled = false;
        painter.setTransform(1, 0, 0, 1, 0.5, 0.5);
        container.style.overflow = "hidden";
        container.appendChild(view);
        for (var i = 0; i < w; i++)
            for (var j = 0; j < h; j++)
                (function (x, y) {
                    var crd = String.fromCharCode(x + 65) + (y + 1);
                    view.addEventListener("click", function (event) {
                        var pX = event.offsetX,
                            pY = event.offsetY;
                        if (
                            pX >= x * (this.gridSize + 1) + 2 &&
                            pX <= (x + 1) * (this.gridSize + 1) &&
                            pY >= y * (this.gridSize + 1) + 2 &&
                            pY <= (y + 1) * (this.gridSize + 1)
                        ) this.ongridclick && this.ongridclick(this.grids[crd]);
                    }.bind(this));
                    view.addEventListener("mousemove", function (event) {
                        var pX = event.offsetX,
                            pY = event.offsetY;
                        if (
                            pX >= x * (this.gridSize + 1) + 2 &&
                            pX <= (x + 1) * (this.gridSize + 1) &&
                            pY >= y * (this.gridSize + 1) + 2 &&
                            pY <= (y + 1) * (this.gridSize + 1)
                        ) this.ongridhover && this.ongridhover(this.grids[crd]);
                    }.bind(this));
                    this.grids[crd].x = x * (gridSize + 1);
                    this.grids[crd].y = y * (gridSize + 1);
                    this.grids[crd].setStatus = function (statusName, status) {
                        this.setStatusToGrid(statusName, this.grids[crd], status);
                    }.bind(this);
                    this.grids[crd].getStatus = function (statusName) {
                        return this.getStatusFromGrid(statusName, this.grids[crd]);
                    }.bind(this);
                }).bind(this)(i, j);
        this.view = view;
        this.container = container;
        this.painter = painter;
        this.gridSize = gridSize;
        this.gridHeight = h;
        this.gridWidth = w;
        this._ = {
            gridMark: [],
            statusOrder: []
        };
        this.refresh();
        window.addEventListener("resize", function () {
            this.refresh();
        }.bind(this));
    }
    refresh() {
        var h = this.gridHeight,
            w = this.gridWidth,
            painter = this.painter,
            container = this.container,
            gridSizeFromHeight = Math.floor((container.clientHeight - h - 1) / h),
            gridSizeFromWidth = Math.floor((container.clientWidth - w - 1) / w),
            gridSize = Math.min(gridSizeFromHeight, gridSizeFromWidth),
            view = this.view;
        view.height = (gridSize + 1) * h + 1;
        view.width = (gridSize + 1) * w + 1;
        view.style.margin =
            `${(container.clientHeight - view.height) / 2}px ${(container.clientWidth - view.width) / 2}px`;
        painter.imageSmoothingEnabled = false;
        painter.setTransform(1, 0, 0, 1, 0.5, 0.5);
        this.gridSize = gridSize;
        for (var i = 0; i < h + 1; i++) {
            painter.beginPath();
            painter.moveTo(0, i * (gridSize + 1));
            painter.lineTo(view.width, i * (gridSize + 1));
            painter.stroke();
            painter.closePath();
        }
        for (var i = 0; i < w + 1; i++) {
            painter.beginPath();
            painter.moveTo(i * (gridSize + 1), 0);
            painter.lineTo(i * (gridSize + 1), view.height);
            painter.stroke();
            painter.closePath();
        }
        for (var i = 0; i < w; i++)
            for (var j = 0; j < h; j++)
                (function (x, y) {
                    var crd = String.fromCharCode(x + 65) + (y + 1);
                    this.grids[crd].x = x * (gridSize + 1) + 2;
                    this.grids[crd].y = y * (gridSize + 1) + 2;
                }).bind(this)(i, j);
        for (var crd in this.grids)
            for (var i = 0; i < this._.statusOrder.length; i++) {
                var statusName = this._.statusOrder[i],
                    status = this.grids[crd]._[statusName],
                    grid = this.grids[crd];
                if (this._.gridMark[statusName] && this._.gridMark[statusName][status])
                    this._.gridMark[statusName][status](this.painter, this.gridSize - 1, grid.x, grid.y, grid);
            }
    }
    clean() {
        if (this.onclean) this.onclean();
    }
    gameStart() {
        if (this.onclean) this.onclean();
        if (this.ongamestart) this.ongamestart();
    }
    clickGrid(crd) {
        if (typeof crd != "string") return this.clickGrid(crd.crd);
        this.ongridclick(this.grids[crd]);
    }
    getStatusFromGrid(statusName, grid) {
        return grid._[statusName];
    }
    setStatusToGrid(statusName, grid, status) {
        grid._[statusName] = status;
        this.refresh();
    }
    setStatusMark(statusName, status, mark) {
        if (!this._.gridMark[statusName]) {
            this._.gridMark[statusName] = {};
            this._.statusOrder.push(statusName);
        }
        this._.gridMark[statusName][status] = mark;
    }
    setStatusOrder() {
        this._.statusOrder = [];
        for (var i = 0; i < arguments.length; i++)
            this._.statusOrder.push(arguments[i]);
    }
}