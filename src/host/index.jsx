
function changeLayer(valueStr){
    // target photoshop

    var valueStrArray = valueStr.split('&')
    var reciveValue = {
        paths: []
    }
    valueStrArray.forEach(item => {
        var tempArray = item.split('=')
        var tempKey = tempArray[0]
        var tempValue = tempArray[1]
        if(tempKey.indexOf('path') > -1){
            reciveValue.paths.push(tempValue)
        }else{
            reciveValue[tempKey] = tempValue
        }
    })

    app.bringToFront()

    function findTargetLayers(layers, deep, rpaths) {
        if(deep >= rpaths.length){
            return layers
        }else{
            var tempFlag = false
            var tempLayers = null
            for(var i = 0;i< layers.length;i++){
                var tempItem = layers[i]
                if(tempItem.grouped === undefined || tempItem.grouped === true){
                    if(tempItem.name === rpaths[deep]){
                        tempFlag = true
                        tempLayers = tempItem.layers
                        break
                    }
                }
            }
            if(tempFlag){
                var tempDeep = deep + 1
                findTargetLayers(tempLayers, tempDeep, rpaths)
            }else{
                return []
            }
        }
    }

    function dealTargetLayers (targetLayers, deepDeal, nameWayIsSystem, customName, fatherName) {
        var count = 0
        for (var i = 0; i < targetLayers.length; i++) {
            var tempItem = targetLayers[i]
            if(tempItem.grouped === true || tempItem.grouped === undefined){
                if(tempItem && tempItem.layers && tempItem.layers.length > 0){
                    if(deepDeal){
                        dealTargetLayers(tempItem.layers, deepDeal, nameWayIsSystem, customName, tempItem.name)
                    }
                }
            }else{
                if(!tempItem.isBackgroundLayer){
                    if(!nameWayIsSystem){
                        tempItem.name = customName + count
                    }else{
                        tempItem.name = fatherName + count
                    }
                    count ++
                }
            }
        }
    }

    if (documents.length == 0 || (activeDocument.layers.length == 1 && docRef.activeLayer.isBackgroundLayer == 1)) {
        alert("没有要处理的图层")
    } else {
        var targetLayers = findTargetLayers(activeDocument.layers, 0, reciveValue.paths)
        if(targetLayers && targetLayers.length > 0){
            var tempDeepDeal = reciveValue.changechildrens == "yes"
            var tempNameWayIsSystem = reciveValue.namemethods == "yes"
            var tempCustomName = tempNameWayIsSystem? reciveValue.namewayvalue: null
            var tempFatherName = "root"
            dealTargetLayers(targetLayers, tempDeepDeal, tempNameWayIsSystem, tempCustomName, tempFatherName)
        }
    }

}

