function init() {
}

function mouse_f() {
  var degreeF = document.forms[0].elements[0].value;
  var degreeC = (degreeF-32) * 5.0 / 9.0;
  document.forms[0].elements[2].value = degreeC.toFixed(1);
  alert_fc();
}

function mouse_c() {
  var degreeC = document.forms[0].elements[2].value;
  var degreeF = degreeC * 9.0 / 5.0 + 32;
  document.forms[0].elements[0].value = degreeF.toFixed(1);
  alert_fc();
}

function alert_fc() {
  var txt = "F:" + degreeF + " C=" + degreeC;
  alert(txt);
}
