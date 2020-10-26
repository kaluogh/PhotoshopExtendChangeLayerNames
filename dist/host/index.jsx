
function changeLayer(valueStr){
    // target photoshop
    var valueStrArray = decodeURIComponent(valueStr).split('&')
    var reciveValue = {
        paths: []
    }

    for(var m = 0; m < valueStrArray.length; m++){
        var item = valueStrArray[m]
        var tempArray = item.split('=')
        var tempKey = tempArray[0]
        var tempValue = tempArray[1]
        if(tempKey.indexOf('path') > -1){
            reciveValue.paths.push(tempValue)
        }else{
            reciveValue[tempKey] = tempValue
        }
    }

    reciveValue.paths.unshift('root')
    reciveValue.changechildrens = reciveValue.changechildrens == 'yes'
    reciveValue.namemethods = reciveValue.namemethods == 'yes'  

    app.bringToFront()

    function findTargetLayers(layers, deep, rpaths) {
        var result = {
            list: [],
            listName: ''
        };
        if(deep >= rpaths.length){
            // alert('test length: ' + layers.length)
            result = {
                list: layers,
                listName: rpaths[rpaths.length - 1]
            }
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
                // alert(tempLayers.length)
                // alert(tempDeep)
                // alert(rpaths.length)
                result = findTargetLayers(tempLayers, tempDeep, rpaths)
            }else{
                result = {
                    list: [],
                    listName: ''
                }
            }
        }
        return result
    }

    function dealTargetLayers (targetLayers, deepDeal, nameWayIsSystem, customName, fatherName) {
        // alert(deepDeal)
        // alert(nameWayIsSystem)
        // alert(customName)
        // alert(fatherName)
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
                    if(nameWayIsSystem){
                        tempItem.name = fatherName + count
                    }else{
                        tempItem.name = customName + count
                    }
                    count ++
                }
            }
        }
    }

    if (documents.length == 0 || (activeDocument.layers.length == 1 && docRef.activeLayer.isBackgroundLayer == 1)) {
        alert("没有要处理的图层")
    } else {
        // alert('test6')
        var tempResult = findTargetLayers(activeDocument.layers, 1, reciveValue.paths)
        var targetLayers = tempResult.list
        var targetName = tempResult.listName
        // alert(targetLayers.length)
        // alert('test7')
        if(targetLayers && targetLayers.length > 0){
            var tempCustomName = reciveValue.namewayvalue ? reciveValue.namewayvalue : ''
            // alert('test8')
            dealTargetLayers(targetLayers, reciveValue.changechildrens, reciveValue.namemethods, tempCustomName, targetName)
            // alert('test9')
        }
    }

}

