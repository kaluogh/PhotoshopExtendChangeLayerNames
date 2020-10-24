
function changeLayer(valueStr){
    // var fileRef = new File("~/Downloads/myFile.jpg");
    // var docRef = app.open(fileRef);
    // alert('test success')

    // target photoshop

    // alert(valueStr)
    var ruleValue = valueStr.split(',')[0]
    var nameValue = valueStr.split(',')[1]

    // alert('recive ruleValue: ' + ruleValue)
    // alert('recive nameValue: ' + nameValue)

    app.bringToFront()
    //alert(1)
    if (documents.length == 0) {
        alert("文件图层不对，稍后再试")
    } else {
        //alert(2)
        var layers = activeDocument.layers;
        // var groupStartWith = "Group "
        var groupStartWith = ruleValue
        if (layers.length == 1 && docRef.activeLayer.isBackgroundLayer == 1) {
            alert("The Background layer can not be hidden when it is the only layer in a document.");
        } else {
            // trivelGroup(layers, 'Main')
            for (var i = 0; i < layers.length; i++) {
                var tempItem = layers[i]
                if(tempItem.grouped === undefined || tempItem.grouped === true){
                    if(tempItem.name.substring(0,groupStartWith.length) == groupStartWith){
                        // trivelGroup(tempItem.layers, tempItem.name.substring(groupStartWith.length))
                        trivelGroup(tempItem.layers, nameValue)
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
                    // tempItem.name = nameAfter + "_" + count
                    tempItem.name = nameAfter + count
                    count ++
                }
            }
        }
    }
}

