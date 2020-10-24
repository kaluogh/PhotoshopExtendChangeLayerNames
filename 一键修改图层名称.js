// target photoshop
app.bringToFront()
if (documents.length == 0) {
	alert("文件图层不对，稍后再试")
} else {
	var layers = activeDocument.layers;
	var groupStartWith = "素材_"
	if (layers.length == 1 && docRef.activeLayer.isBackgroundLayer == 1) {
		alert("The Background layer can not be hidden when it is the only layer in a document.");
	} else {
		// trivelGroup(layers, 'Main')
		for (var i = 0; i < layers.length; i++) {
			var tempItem = layers[i]
			if(tempItem.grouped === undefined || tempItem.grouped === true){
				if(tempItem.name.substring(0,groupStartWith.length) == groupStartWith){
					trivelGroup(tempItem.layers, tempItem.name.substring(groupStartWith.length))
				}
			}
		}
	}
}

function trivelGroup(layers, nameAfter){
    var count = 0
	for (var i = 0; i < layers.length; i++) {
		var tempItem = layers[i]
		if(tempItem.grouped === true || tempItem.grouped === undefined){
			if(tempItem && tempItem.layers && tempItem.layers.length > 0){
				trivelGroup(tempItem.layers, tempItem.name)
			}
		}else{
			if(!tempItem.isBackgroundLayer){
				tempItem.name = nameAfter + "_" + count
				count ++
			}
		}
	}
}