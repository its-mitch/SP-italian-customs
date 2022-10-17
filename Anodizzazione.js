$('#Spedizione').click(function () {
  let prezzo = $('#prezzo').text();
  let totalVal = Number(prezzo.replace(/[\€,]/g, ''));

  let sum;
  if (document.getElementById('Spedizione').checked) {
    sum = totalVal + 15;
  } else {
    sum = totalVal - 15;
  }

  $('#prezzo').text('€' + sum);
  document.getElementById('prezzo-cerchi').value = sum;
});

$('.sel_servizio').change(function () {
  let sum = 0;

  let arrFamiglie = [
    'Cerchi',
    'Ciclistica',
    'PartiMotore',
    'Accessori/Minuteria',
  ];

  let famiglia = getOption('Famiglia');

  switch (famiglia) {
    case arrFamiglie[0]:
      sum = verniciaturaCerchi();
      break;
    case arrFamiglie[1]:
      sum = verniciaturaCiclistica();
      break;
    case arrFamiglie[2]:
      sum = verniciaturaMotore();
      break;
    case arrFamiglie[3]:
      sum = verniciaturaAccessori();
      break;
  }

  //sum = sum * 1.22;
  document.getElementById('prezzo').textContent = '€' + sum.toString();
  document.getElementById('prezzo-cerchi').value = sum;
});

function verniciaturaAccessori() {
  enableSelect('Componente');

  let prezzo = 0;

  let colors = [
    'Alluminio',
    'Arancione',
    'Blu',
    'Nero',
    'Rosso',
    'Verde',
    'Oro',
    'Fumè',
  ];
  let componenti = [
    'SPOSTAPINZA',
    'TAPPO_SERBATOIO',
    'LEVA_FRENO',
    'LEVA_FRIZIONE',
    'PEDANE',
    'CRUNA',
    'CORONA',
    'RADIATORI',
    'PARAMOTORE',
  ];
  let prezzi = [15, 15, 40, 50, 25, 17, 70, 200, 25, 25, 70];

  
  addOption('Colore', colors);
  
  addOption('Componente', componenti);
  
  let comp = getOption('Componente');
  if (comp != '') {
    for (let i = 0; i < componenti.length; i++) {
      if (comp == componenti[i]) {
        prezzo = prezzi[i];
      }
    }
  }

  return prezzo;
}

function verniciaturaMotore() {
  enableSelect('Componente');

  let prezzo = 0;

  let colors = [
    'Alluminio',
    'Arancione',
    'Blu',
    'Fumè',
    'Nero',
    'Oro',
    'Rosso',
    'Verde',
  ];
  let componenti = [
    'TESTA',
    'CARTER_VOLANO ',
    'TAPPO_OLIO_CARICO/SCARICO ',
    'CARTER_FRIZIONE ',
    'PARAPIGNONE ',
  ];
  let prezzi = [18, 22, 7, 27, 9];

  addOption('Colore', colors);
  
  addOption('Componente', componenti);
  
  let comp = getOption('Componente');
  if (comp != '') {
    for (let i = 0; i < componenti.length; i++) {
      if (comp == componenti[i]) {
        prezzo = prezzi[i];
      }
    }
  }

  return prezzo;
}

function verniciaturaCiclistica() {
  enableSelect('Componente');

  let prezzo = 0;

  let colors = [
    'Alluminio',
    'Arancione',
    'Blu',
    'Fumè',
    'Nero',
    'Oro',
    'Rosso',
    'Verde',
  ];
  let componenti = [
    'MANUBRIO',
    'RISER',
    'PIASTRE',
    'FODERO_FORCELLA',
    'MOZZO_RUOTA',
    'PIEDINO_FORCELLA',
    'FORCELLONE',
    'TELAIO',
    'PINZA_FRENO',
    'LEVARAGGIO_FORCELLONE',
    'TELAIETTO',
  ];
  let prezzi = [15, 15, 40, 50, 25, 17, 70, 200, 25, 25, 70];

 
  addOption('Colore', colors);
  
  addOption('Componente', componenti);
  
  let comp = getOption('Componente');
  if (comp != '') {
    for (let i = 0; i < componenti.length; i++) {
      if (comp == componenti[i]) {
        prezzo = prezzi[i];
      }
    }
  }

  return prezzo;
}

function verniciaturaCerchi() {
  disableSelect('Componente');

  let prezzo = 0;

  let colors = [
    'Alluminio Lucido',
    'Arancione Lucido',
    'Blu Lucido',
    'Fumè Lucido',
    'Nero Lucido',
    'Oro Lucido',
    'Rosso Lucido',
    'Verde Lucido',
    'Alluminio Opaco',
    'Arancione Opaco',
    'Blu Opaco',
    'Fumè Opaco',
    'Nero Opaco',
    'Oro Opaco',
    'Rosso Opaco',
    'Verde Opaco',
  ];
  let prezziColori = [
    110, 110, 110, 110, 110, 110, 110, 110, 60, 60, 60, 60, 60, 60, 60, 60,
  ];

  
  addOption('Colore', colors);
  

  let col = getOption('Colore');
  if (col != '') {
    for (let i = 0; i < colors.length; i++) {
      if (col == colors[i]) {
        prezzo = prezziColori[i];
      }
    }
  }

  return prezzo;
}

function getOption(id) {
  let input = document.getElementById(id);
  let output = input.options[input.selectedIndex].text;
  return output;
}

function addOption(select, options) {

  for (i = 0; i < document.getElementById(select).length; ++i) {
    document.getElementById(select).options[i].remove;
  }

  for (i = 0; i < options.length; i++) {
    var x = document.getElementById(select);
    var option = document.createElement('option');
    option.value = options[i];
    option.text = options[i];
    x.add(option);
  }
}

function disableSelect(ID) {
  document.getElementById(ID).disable = true;
}
function enableSelect(ID) {
  document.getElementById(ID).disable = false;
}

function enableAll(ID) {
  let i = document.getElementById(ID).options.length;
  for (let n = 1; n == i; n++) {
    document.getElementById(ID).options[n].disable = false;
  }
}
function disableAll(ID) {
  let i = document.getElementById(ID).options.length;
  for (let n = 1; n == i; n++) {
    document.getElementById('ID').options[n].disable = true;
  }
}

function disableOption(id, num) {
  document.getElementById(id).options[num].disabled = true;
}
function enableOption(id, num) {
  document.getElementById(id).options[num].disabled = false;
}
