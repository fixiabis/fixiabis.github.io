var allWins = [], //所有贏法
    IGrids = board.getGridsByCrd("A1:K7"), //直向贏法範圍
    HGrids = board.getGridsByCrd("A1:G11"), //橫向贏法範圍
    XLGrids = board.getGridsByCrd("A1:G7"), //斜向贏法範圍
    XRGrids = board.getGridsByCrd("E1:K7"); //反斜向贏法範圍
for (var grid of IGrids) allWins.push([grid, ...grid.getGridsByRelCrd("~4B")]); //直向
for (var grid of HGrids) allWins.push([grid, ...grid.getGridsByRelCrd("~4R")]); //橫向
for (var grid of XLGrids) allWins.push([grid, ...grid.getGridsByRelCrd("~4BR")]); //斜向
for (var grid of XRGrids) allWins.push([grid, ...grid.getGridsByRelCrd("~4BL")]); //反斜向
function turnToComputer(piece) {
    var atk = [[], [], []],
        def = [[], [], []],
        spaceCrds = [],
        randomCrd = crds => crds[(Math.random() * crds.length) | 0];
    function mostRepeatCrd(crds) {
        function counter(crd) {
            var count = 0;
            for (mCrd of crds) mCrd == crd && count++;
            return count;
        }
        var result = [],
            search = {},
            total = 0,
            max = 1;
        for (var crd of crds)
            if (search[crd] == undefined)
                search[crd] = counter(crd);
        for (var crd in search) {
            if (search[crd] > max) {
                max = search[crd];
                result = [crd];
            } else if (search[crd] == max)
                result.push(crd);
            total++;
        }
        if (total == result.length && max > 1) return [];
        return result;
    }
    for (var gridLine of allWins) {
        var count = 0,
            crds = {
                "": [],
                "B": [],
                "W": []
            },
            linePiece = "";
        for (var grid of gridLine) {
            var gridPiece = grid._.piece;
            if (gridPiece == "")
                spaceCrds.push(grid.crd);
            crds[gridPiece].push(grid.crd);
        }
        if (crds.W.length > 0 && crds.B.length > 0) continue;
        linePiece = crds.W.length > 0 ? "W" : "B";
        for (var i = 0; i < 3; i++) {
            var spaceCount = crds[""].length;
            if (spaceCount != i + 1) continue;
            if (linePiece == piece)
                atk[i] = atk[i].concat(crds[""]);
            else
                def[i] = def[i].concat(crds[""]);
        }
    }
    for (var i = 0; i < 3; i++) {
        atk[i] = mostRepeatCrd(atk[i]);
        def[i] = mostRepeatCrd(def[i]);
        if (atk[i].length > 0) {
            console.log(piece, "方", ["必攻", "活四", "雙三"][i]);
            return board.clickGrid(randomCrd(atk[i]));
        }
        if (def[i].length > 0) {
            console.log(piece, "方", ["必防", "防四", "防雙"][i]);
            return board.clickGrid(randomCrd(def[i]));
        }
    }
    var lastRecordCrd = board.record[board.record.length - 1],
        nearCrds = board.grids[lastRecordCrd].getCrdsByRelCrd("O");
    nearCrds = nearCrds.filter(crd => board.grids[crd] && board.grids[crd]._.piece == "");
    if (nearCrds.length > 0) {
        console.log(piece, "方", "附近放放");
        return board.clickGrid(randomCrd(nearCrds));
    }
    console.log(piece, "方", "隨便放放");
    return board.clickGrid(randomCrd(spaceCrds));
}