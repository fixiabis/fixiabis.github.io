function tree1rv(result, nodes) {
	var relate = [],
		lastSym = result[result.length - 1],
		log = "";
	for (var i = 0; i < nodes.length; i++)
		relate.push([]);
	while (result.indexOf(lastSym) > -1) {
		var notInResult = [];
		for (var i = 0; i < nodes.length; i++)
			if (result.indexOf(nodes[i]) == -1)
				notInResult.push(nodes[i]);
		var minRelateMinNode = notInResult.sort()[0],
			minRelateMinNodeIndex = nodes.indexOf(minRelateMinNode),
			minRelateMinNodeRelateNode = result[0],
			minRelateMinNodeRelateNodeIndex = nodes.indexOf(minRelateMinNodeRelateNode);
		if (log != "") log += "\n";
		log += "未於結果:" + notInResult.join(",");
		log += "\n結果:" + result.join(",");
		log += " 取得" + minRelateMinNodeRelateNode + "與" + minRelateMinNode + "關聯";
		relate[minRelateMinNodeIndex].push(minRelateMinNodeRelateNode);
		relate[minRelateMinNodeRelateNodeIndex].push(minRelateMinNode);
		result.shift();
		result.push(minRelateMinNode);
	}
	var notInResult = [];
	for (var i = 0; i < nodes.length; i++)
		if (result.indexOf(nodes[i]) == -1)
			notInResult.push(nodes[i]);
	var minRelateMinNode = notInResult.sort()[0],
		minRelateMinNodeIndex = nodes.indexOf(minRelateMinNode),
		minRelateMinNodeRelateNode = notInResult.sort()[1],
		minRelateMinNodeRelateNodeIndex = nodes.indexOf(minRelateMinNodeRelateNode);
	if (log != "") log += "\n";
	log += "未關聯:" + notInResult.join(",");
	log += "\n結果:" + result.join(",");
	log += " 取得" + minRelateMinNodeRelateNode + "與" + minRelateMinNode + "關聯";
	relate[minRelateMinNodeIndex].push(minRelateMinNodeRelateNode);
	relate[minRelateMinNodeRelateNodeIndex].push(minRelateMinNode);
	return {
		nodes: nodes,
		relate: relate,
		log: log + "\n最終結果:\n"
	}
}