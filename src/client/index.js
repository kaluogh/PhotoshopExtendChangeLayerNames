$(document).ready(function () {
  /* 1) Create an instance of CSInterface. */
  let csInterface = null
  if (typeof CSInterface !== "undefined") {
    csInterface = new CSInterface();
  }

  /* 2) Make a reference to your HTML button and add a click handler. */


  let pathElements = [$('#rootPath')[0], $('#path1')[0]]

  $('#minuspath').click(function(){
    if(pathElements.length > 1){
      let tempElement =  pathElements.pop()
      $(tempElement).remove()
    }
  })

  $('#addpath').click(function(){
    if(pathElements.length < 5){
      let tempElement = $(`<input id="${'path' + pathElements.length}" name="${'path' + pathElements.length}" placeholder="${'Path ' + pathElements.length}" type="text" required>`)[0]
      $('.otherpaths').append(tempElement)
      pathElements.push(tempElement)
    }
  })

  $('input:radio[name="namemethods"]').change(function (e) { 
    e.preventDefault();
    if($(this).val() == "yes"){
      $('#namewayvalue').attr('required', false)
    }else{
      $('#namewayvalue').attr('required', true)
    }
    $('.customameway').toggle()
  });

  $('#form').submit(function (e) { 
    e.preventDefault();
    debugger
    let valueStr = $(this).serialize()
    let tempObj = {
      a: 1,
      b: 2
    }
    sendMessage(tempObj)
  });

  /* 3) Write a helper function to pass instructions to the ExtendScript side. */
  function sendMessage(tempObj) {
    if(csInterface){
      csInterface.evalScript("changeLayer('" + 'todo' + "')")
    }
    eval("testEval('" + JSON.stringify(tempObj) + "')")
  }

  function testEval(tempObj){
    console.log(tempObj)
    console.log(JSON.parse(tempObj))
  }
});