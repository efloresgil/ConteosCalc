var groupCount = 1;
var pmultiCount = 2;

function factorial(n) {
  fact = BigInteger(1);
  for (var i = n; i > 1; i--) {
    fact = fact.multiply(i);
    //alert('fact: '+fact.multiply(i).toString());
  }
  return fact;
}

function responder_guia(n) {
  var num = BigInteger(n.n);
  var content = $('#resultado-guiado').html()
  content = content.replace(/\,/g, '');
  content = parseInt(content, 10);

  if (n != content) {
    //alert('Respuesta: ' + n.n.toString());
    $('#resultado-guiado').html(num.toString());
    $('#tipo-guiado').html(n.type);
    //alert((""+num.valueOf()).indexOf("e"));
    if ((""+num.valueOf()).indexOf("e") == -1) {
      var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
      $('#resultado-guiado').animateNumber({
        number: n.n.toString(),
        numberStep: comma_separator_number_step
      });
    }
  }

}

function responder_particion(n) {
  var num = BigInteger(n);
  var content = $('#resultado-particion').html()
  content = content.replace(/\,/g, '');
  content = parseInt(content, 10);
  if (n != content) {
    //alert('Respuesta: ' + n);
    $('#resultado-particion').html(num.toString());
    //$('#tipo-guiado').html(n.type);
    if ((""+num.valueOf()).indexOf("e") == -1) {
      var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
      $('#resultado-particion').animateNumber({
        number: n,
        numberStep: comma_separator_number_step
      });
    }
  }
}

function responder_pmulti(n) {
  var num = BigInteger(n);
  var content = $('#resultado-pmulti').html()
  content = content.replace(/\,/g, '');
  content = parseInt(content, 10);
  if (n != content) {
    //alert('Respuesta: ' + n);
    $('#resultado-pmulti').html(num.toString());
    //$('#tipo-guiado').html(n.type);

    if ((""+num.valueOf()).indexOf("e") == -1) {
      var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
      $('#resultado-pmulti').animateNumber({
        number: n,
        numberStep: comma_separator_number_step
      });
    }
  }
}

//Permutaciones
function Pn(n) {
  return factorial(n);
}

function Pnr(repeticion, n, r) {
  //alert(factorial);
  if (repeticion) {
    //alert(factorial);
    return {
      'n': BigInteger(n).pow(r),
      'type': ' - Permutación con Repetición'
    };
  } else {
    //alert(factorial(n).toString());
    return {
      'n': ((factorial(n)).divide(factorial((n - r)))),
      'type': ' - Permutación sin Repetición'
    };
  }
}

//Combinaciones
function Cnr(repeticion, n, r) {
  //alert(factorial);
  if (repeticion) {
    //alert(factorial);
    //alert('rep: '+repeticion+' n: '+n+' r: '+r);
    return {
      'n': (factorial(n + (r - 1)).divide((factorial(r).multiply(factorial(n - 1))))),
      type: ' - Combinacion con Repetición'
    }
  } else {
    //alert(factorial);
    return {
      'n': (factorial(n).divide((factorial(r).multiply(factorial(n - r))))),
      'type': ' - Conbinación sin Repetición'
    };
  }
}


$('#calcular-guiado').click(function() {
  //alert($('#agrupar').is(':checked'));
  if ($('#agrupar').is(':checked')) {
    if ($('#n').val().length == 0 || $('#r').val().length == 0) {
      alert("Completa los valores numéricos");
      return false;
    }
  }
  else {

    if ($('#n').val().length == 0) {
      alert("Completa el valor numérico");
      return false;
    }
  }

  repeticion = $('#repeticion').is(':checked');
  orden_importa = $('#orden_importa').is(':checked');
  n = parseInt($('#n').val());
  if (!$('#agrupar').is(':checked')) {
    r = n;
  } else {
    r = parseInt($('#r').val());
  }

  //alert(repeticion + ' ,' + orden_importa + ' ,' + n + ' ,' + r);
  if (orden_importa) {
    //Permutaciones
    responder_guia(Pnr(repeticion, n, r));
  } else {
    responder_guia(Cnr(repeticion, n, r));
  }
});

$('#calcular-particion').click(function() {
  if (!validarParticion()) {
    alert("Completa los valores numéricos");
    return false;
  }

  res = BigInteger(1);
  for (var i = groupCount; i >= 1; i--) {
    var n = parseInt($('#n' + i + '').val());
    var r = parseInt($('#r' + i + '').val());
    res = Cnr(false, n, r).n.multiply(res);
    //alert('fact: '+fact.multiply(i).toString());
  }
  responder_particion(res);
});

$('#calcular-pmulti').click(function() {
  if (!validarPmulti()) {
    alert("Completa los valores numéricos");
    return false;
  }

  var denominador = BigInteger(1);
  var numerador = 0;
  for (var i = pmultiCount; i >= 1; i--) {
    var n = parseInt($('#pm' + i + '').val());
    numerador += n;
    denominador = denominador.multiply(factorial(n));
    //alert(factorial(n).toString());
  }
  responder_pmulti(factorial(numerador) / denominador);
});

$('#addGroup').click(function() {
  groupCount++;
  var html = "<li class='mdl-list__item mdl-grid'><span id='title1'>Grupo " + groupCount + ":</span><span class='mdl-cell mdl-cell--6 mdl-list__item-primary-content'><div class='mdl-textfield mdl-js-textfield'><input class=mdl-textfield__input pattern=-?[0-9]*(\.[0-9]+)? id='n" + groupCount + "'><label class=mdl-textfield__label for='n" + groupCount + "'>Total</label></span><span class=mdl-textfield__error>Debe ser un número!</span></div><span class='mdl-cell mdl-cell--6 mdl-list__item-secondary-action'></span><div class='mdl-textfield mdl-js-textfield'><input class=mdl-textfield__input pattern=-?[0-9]*(\.[0-9]+)? id='r" + groupCount + "'><label class=mdl-textfield__label for='r" + groupCount + "'>Deseados</label><span class=mdl-textfield__error>Debe ser un número!</span></div></li><hr>"
  $('#groupRepeater').append(html);
  componentHandler.upgradeDom();
});

$('#addPmulti').click(function() {
  pmultiCount++;
  var html = "<span id=''>Grupo " + pmultiCount + ":</span><div class='mdl-cell mdl-cell--12-col mdl-textfield mdl-js-textfield'><input class='mdl-textfield__input' type='text' pattern='-?[0-9]*(\.[0-9]+)?' id='pm" + pmultiCount + "'><label class='mdl-textfield__label' for='pm" + pmultiCount + "'>Repeticiones por Grupo</label><span class='mdl-textfield__error'>Debe ser un número!</span></div>"
  $('#pmultiRepeater').append(html);
  componentHandler.upgradeDom();
});

$('#resetGroup').click(function() {
  groupCount = 1;
  var html = "<li class='mdl-list__item mdl-grid'><span id='title1'>Grupo " + groupCount + ":</span><span class='mdl-cell mdl-cell--6 mdl-list__item-primary-content'><div class='mdl-textfield mdl-js-textfield'><input class=mdl-textfield__input pattern=-?[0-9]*(\.[0-9]+)? id='n" + groupCount + "'><label class=mdl-textfield__label for='n" + groupCount + "'>Total</label></span><span class=mdl-textfield__error>Debe ser un número!</span></div><span class='mdl-cell mdl-cell--6 mdl-list__item-secondary-action'></span><div class='mdl-textfield mdl-js-textfield'><input class=mdl-textfield__input pattern=-?[0-9]*(\.[0-9]+)? id='r" + groupCount + "'><label class=mdl-textfield__label for='r" + groupCount + "'>Deseados</label><span class=mdl-textfield__error>Debe ser un número!</span></div></li><hr>"
  $('#groupRepeater').html(html);
  componentHandler.upgradeDom();
});

$('#resetPmulti').click(function() {
  pmultiCount = 2;
  var html = "<span id=''>Grupo 1:</span><div class='mdl-cell mdl-cell--12-col mdl-textfield mdl-js-textfield'><input class='mdl-textfield__input' type='text' pattern='-?[0-9]*(\.[0-9]+)?' id='pm1'><label class='mdl-textfield__label' for='pm1'>Repeticiones por Grupo</label><span class='mdl-textfield__error'>Debe ser un número!</span></div><span id=''>Grupo 2:</span><div class='mdl-cell mdl-cell--12-col mdl-textfield mdl-js-textfield'><input class='mdl-textfield__input' type='text' pattern='-?[0-9]*(\.[0-9]+)?' id='pm2'><label class='mdl-textfield__label' for='pm2'>Repeticiones por Grupo</label><span class='mdl-textfield__error'>Debe ser un número!</span></div>";
  $('#pmultiRepeater').html(html);
  componentHandler.upgradeDom();
});

$('#agrupar').change(function() {
  $('#r').prop('disabled', function(i, v) {
    return !v;
  });
  if (!$('#agrupar').is(":checked")) {
    $('#r').val("");
  }
  componentHandler.upgradeDom();
});

function validarParticion() {
  var con = 1;
  for (var i = groupCount; i >= 1; i--) {
    var n = $('#n' + i + '').val().length;
    var r = $('#r' + i + '').val().length;
    con = con * n * r;
    //alert(con);
    return (con != 0);
    //alert('fact: '+fact.multiply(i).toString());
  }
}

function validarPmulti() {
  var con = 1;
  for (var i = pmultiCount; i >= 1; i--) {
    var n = $('#pm' + i + '').val().length;
    con = con * n;
    //alert(con);
    return (con != 0);
    //alert('fact: '+fact.multiply(i).toString());
  }
}
