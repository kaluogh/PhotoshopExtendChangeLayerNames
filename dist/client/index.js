"use strict";

$(document).ready(function () {
  /* 1) Create an instance of CSInterface. */
  var csInterface = null;

  if (typeof CSInterface !== "undefined") {
    csInterface = new CSInterface();
  }
  /* 2) Make a reference to your HTML button and add a click handler. */


  var pathElements = [$('#rootPath')[0], $('#path1')[0]];
  $('#minuspath').click(function () {
    if (pathElements.length > 1) {
      var tempElement = pathElements.pop();
      $(tempElement).remove();
    }
  });
  $('#addpath').click(function () {
    if (pathElements.length < 5) {
      var tempElement = $("<input id=\"".concat('path' + pathElements.length, "\" name=\"").concat('path' + pathElements.length, "\" placeholder=\"").concat('Path ' + pathElements.length, "\" type=\"text\" required>"))[0];
      $('.otherpaths').append(tempElement);
      pathElements.push(tempElement);
    }
  });
  $('input:radio[name="namemethods"]').change(function (e) {
    e.preventDefault();

    if ($(this).val() == "yes") {
      $('#namewayvalue').attr('required', false);
    } else {
      $('#namewayvalue').attr('required', true);
    }

    $('.customameway').toggle();
  });
  $('#form').submit(function (e) {
    e.preventDefault();
    debugger;
    var valueStr = $(this).serialize();
    sendMessage(valueStr);
  });
  /* 3) Write a helper function to pass instructions to the ExtendScript side. */

  function sendMessage(valueStr) {
    if (csInterface) {
      csInterface.evalScript("changeLayer('" + valueStr + "')");
    } // eval("testEval('" + JSON.stringify(tempObj) + "')")

  }

  function testEval(tempObj) {
    console.log(tempObj);
    console.log(JSON.parse(tempObj));
  }
});