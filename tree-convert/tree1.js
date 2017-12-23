function tree1(nodes, relate) {
	var result = "",
		log = "";
	while(nodes.length > 2) {
		var minRelateNodes = [];
		for (var i = 0; i < nodes.length; i++)
			if (relate[i].length == 1)
				minRelateNodes.push(nodes[i]);
		var minRelateMinNode = minRelateNodes.sort()[0],
			minRelateMinNodeIndex = nodes.indexOf(minRelateMinNode);
		result += relate[minRelateMinNodeIndex][0];
		if (log != "") log += "\n";
		log += "最小關聯:" + minRelateNodes.sort().join(",");
		log += " 刪除:" + minRelateMinNode;
		log += "\n目前答案:" + result;
		nodes.splice(minRelateMinNodeIndex, 1);
		for (var i = 0; i < relate.length; i++)
			relate[i] = relate[i].filter((value) => value != minRelateMinNode);
		relate.splice(minRelateMinNodeIndex, 1);
	}
	return log;
}