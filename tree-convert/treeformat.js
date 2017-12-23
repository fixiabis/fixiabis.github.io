function treeFormat(text, relateTree){
	var nodes = text.replace(/\-| /g, "").split("\n"),
		nodesName = text.replace(/\+|\`|\-|\|| /g, "").split("\n"),
		nodesMethod = [],
		nodesLevel = [],
		nodesNewLevel = [],
		nodesRelate = [];
	for (var i = 0; i < nodes.length; i++) {
		var method = nodes[i].replace(nodesName[i], ""),
			level = 1;
		nodesMethod.push(method.replace(/\|/g, ""));
		nodesLevel.push(method.length);
		nodesNewLevel.push(0);
		nodesRelate.push([]);
	}
	for (var i = 0; i < nodes.length; i++) {
		for (var j = i - 1; j > -1; j--) {
			var related = false;
			if (nodesLevel[i] > nodesLevel[j])
				related = true;
			else if (nodesLevel[i] < nodesLevel[j])
				continue;
			else if (nodesMethod[j] != "+")
				related = true;
			if (related) {
				nodesRelate[j].push(nodesName[i]);
				if (relateTree) nodesRelate[i].push(nodesName[j]);
				else nodesRelate[i].push("^" + nodesName[j]);
				nodesNewLevel[i] = nodesNewLevel[j] + 1;
				break;
			} else if (!relateTree){
				nodesRelate[j].push("-" + nodesName[i]);
				nodesRelate[i].push("-" + nodesName[j]);
			}
		}
	}
	return {
		nodesName: nodesName,
		nodesRelate: nodesRelate,
		nodesLevel: nodesNewLevel
	}
}
function makeTree(nodesName, nodesRelate, rootName, parentName, level, last) {
	var rootIndex = 0, levelsym = "";
	if (!rootName) rootName = nodesName.sort()[0];
	if (!last) last = 0;
	if (typeof level == "undefined") level = 0;
	for (var i = 0; i < level; i++)
		levelsym += last != i ? " " : "|";
	rootIndex = nodesName.indexOf(rootName);
	var text = rootName;
	for (var i = 0; i < nodesRelate[rootIndex].length; i++) {
		if (nodesRelate[rootIndex][i] == parentName) continue;
		if (
			i == nodesRelate[rootIndex].length - 1 ||
			(i == nodesRelate[rootIndex].length - 2 &&
			nodesRelate[rootIndex][i + 1] == parentName)
		) {
			text += "\n" + levelsym + "`";
			text += makeTree(nodesName, nodesRelate, nodesRelate[rootIndex][i], rootName, level + 1, last + 1);
		} else {
			text += "\n" + levelsym + "+";
			text += makeTree(nodesName, nodesRelate, nodesRelate[rootIndex][i], rootName, level + 1, last);
		}
	}
	return text;
}