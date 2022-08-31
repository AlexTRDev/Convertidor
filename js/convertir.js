
var decimal               =  document.getElementById('txtIngresoNumero');
var SPsigno               =  document.getElementById('txtSignoSP');
var SPexpo                =  document.getElementById('txtExponenteSP');
var SPmantisa             =  document.getElementById('txtMantisaSP');
var DPsigno               =  document.getElementById('txtSignoDP');
var DPexpo                =  document.getElementById('txtExponenteDP');
var DPmantisa             =  document.getElementById('txtMantisaDP');
var IEsigno               =  document.getElementById('txtSignoIEEE');
var IEexpo                =  document.getElementById('txtExponenteIEEE');
var IEmantisa             =  document.getElementById('txtMantisaIEEE');
var IE64signo             =  document.getElementById('txtSignoIEEE64');
var IE64expo              =  document.getElementById('txtExponenteIEEE64');
var IE64mantisa           =  document.getElementById('txtMantisaIEEE64');
var SPp                   =  document.getElementById('pSP');
var DPp                   =  document.getElementById('pDP');
var IEp                   =  document.getElementById('pIE');
var IE64p                 =  document.getElementById('pIE64');


var potencia = 0;
var Positivo = true;
var NumeroListo = 0;
var Cadena = "";


var btnConvertir = document.getElementById('btn-convertir');

btnConvertir.addEventListener('click', function(){
    NProgress.start( );
    LimpiarProceso();
    Analizar();
    NProgress.done();
});

decimal.addEventListener('focus', function(){
  var msgSpan =  document.getElementById('msg-span');
  msgSpan.style.display = "none";
  decimal.style.borderColor = "#CCC";
});

function Analizar() {
  if (Validar()) {
    
    if (parseFloat(decimal.value) != 0 ) {
      Cadena = "<b>> NÚMERO : </b>"+ decimal.value+"<br/><br/><br/>"+"<b><ins>PROCEDIMIENTO</ins></b><br/><br/><b>1.&nbspSIGNO:</b><br/>";
      SPp.innerHTML = Cadena;
      DPp.innerHTML = Cadena;
      IEp.innerHTML = Cadena;
      IE64p.innerHTML = Cadena;

      GeneraAnalisis(decimal.value);
      IEEEAnalisis(decimal.value);
    }
    else {
      Cadena = "<b><ins>EXCEPCIÓN A LA REGLA </ins></b><br/><br/>Los valores son '0'<br/>";
      SPp.innerHTML = Cadena;
      DPp.innerHTML = Cadena;
      IEp.innerHTML = Cadena;
      IE64p.innerHTML = Cadena;

      SPsigno.value = "0";
      DPsigno.value = "0";
      SPexpo.value = "00000000";
      DPexpo.value = "00000000000";
      SPmantisa.value = "00000000000000000000000";
      DPmantisa.value = "00000000000000000000000000000000000000000";

      IEsigno.value = "0";
      IE64signo.value = "0";
      IEexpo.value = "00000000";
      IE64expo.value = "00000000000";
      IEmantisa.value = "00000000000000000000000";
      IE64mantisa.value = "00000000000000000000000000000000000000000";
    }
    
  }
}

function Validar() {
  var TodoOk = false;
  var EsNegativo = false;
  var TienePunto = false;
  
  if(decimal.value == ""){
    let msgSpan =  document.getElementById('msg-span');
    msgSpan.innerHTML = "Complete el campo para continuar";
    msgSpan.style.display = "block";
    decimal.style.borderColor = "red";
  }else{
    if(!isNaN(decimal.value)){
      if(parseFloat(decimal.value) < 0){
        EsNegativo = true;
      }else if(parseFloat(decimal.value) > 0){
        EsNegativo = false;
      }
      

      if (!Number.isInteger(Number(decimal.value))) {
        TienePunto = true;
      }

      TodoOk = true;
    }else{
      let msgSpan =  document.getElementById('msg-span');
      msgSpan.innerHTML = "El valor ingresado no es valido";
      msgSpan.style.display = "block";
      decimal.style.borderColor = "red";
    }

  }
  return TodoOk;
}

function EsPositivo(valor) {
    if(parseFloat(valor) < 0) {
      Positivo = false;
      SPsigno.value = "1";
      DPsigno.value = "1";
      IEsigno.value = "1";
      IE64signo.value = "1";
      Cadena = "&nbsp&nbsp&nbsp&nbspEl Número es <b><em>Negativo</em></b>, por lo tanto el bit del Signo es '1'.<br/>";
      if (parseFloat(decimal.value) != 0) {
          IEp.innerHTML = IEp.innerHTML + Cadena;
          IE64p.innerHTML = IE64p.innerHTML + Cadena;
      }
      SPp.innerHTML = SPp.innerHTML + Cadena;
      DPp.innerHTML = DPp.innerHTML + Cadena;
    }
    else {
      Positivo = true;
      SPsigno.value = "0";
      DPsigno.value = "0";
      IEsigno.value = "0";
      IE64signo.value = "0";
      if (parseFloat(decimal.value) != 0) {
          Cadena = "&nbsp&nbsp&nbsp&nbspEl Número es <b><em>Positivo</em></b>, por lo tanto el bit del Signo es '0'.<br/>";
          IEp.innerHTML = IEp.innerHTML + Cadena;
          IE64p.innerHTML = IE64p.innerHTML + Cadena;
      }
      SPp.innerHTML = SPp.innerHTML + Cadena;
      DPp.innerHTML = DPp.innerHTML + Cadena;
    }
}

function Potencia(valor) {

  potencia = 0;

  if (valor < 0) {
    valor = valor * -1;
  }

  SPp.innerHTML = SPp.innerHTML + "&nbsp&nbsp&nbsp&nbsp" + "2<sup>"+potencia+"</sup> *" + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + valor + "<br/>";
  DPp.innerHTML = DPp.innerHTML + "&nbsp&nbsp&nbsp&nbsp" + "2<sup>"+potencia+"</sup> *" + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + valor + "<br/>";

  if (valor != 0 && valor < 0.1) {
    while (valor < 0.1) {
      valor = valor*2;
      potencia--;
      SPp.innerHTML = SPp.innerHTML + "&nbsp&nbsp&nbsp&nbsp" + "2<sup>"+potencia+"</sup> *" + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + valor + "<br/>";
      DPp.innerHTML = DPp.innerHTML + "&nbsp&nbsp&nbsp&nbsp" + "2<sup>"+potencia+"</sup> *" + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + valor + "<br/>";
    }
  }
  else {
    while (valor >= 1) {
      valor = valor/2;
      potencia++;
      SPp.innerHTML = SPp.innerHTML + "&nbsp&nbsp&nbsp&nbsp" + "2<sup>"+potencia+"</sup> *" + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + valor + "<br/>";
      DPp.innerHTML = DPp.innerHTML + "&nbsp&nbsp&nbsp&nbsp" + "2<sup>"+potencia+"</sup> *" + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + valor + "<br/>";
    }
  }
  NumeroListo = valor;
}

function Exponente(potencia, bits, resta) {
  var resultado;
  if (potencia < 0 && -potencia>Math.pow(2, bits-1)) {
    resultado = Math.pow(2, bits)-1;
  }
  else {
    resultado = potencia + Math.pow(2, bits-1) - resta;
  }
  return resultado;
}

function ToBinario(valor,bits) {
  var resultado = "";
  while (valor != 1 && valor != 0) {
    if (valor%2 == 0) {
      valor = valor/2;
      resultado = "0" + resultado;
    }
    else {
      valor--
      valor = valor/2;
      resultado = "1" + resultado;
    }
  }
  resultado = "1" + resultado;
  while (resultado.length < bits) {
    resultado = "0" + resultado;
  }
  return resultado;
}

function Complementar(valor) {
  var resultado = "";

  for(i = 0; i < valor.length; i++) {
    if(valor.substring(i,i + 1) == "0") {
      resultado = resultado + "1";
    }
    else {
      resultado = resultado + "0";
    }
  }

  return resultado;
}

function Mantisa(valor, bits) {
  var resultado = "";

  for (var i = 0; i < bits; i++) {
    if (valor != 0) {
      switch(bits) {
        case 23:
          SPp.innerHTML = SPp.innerHTML + "&nbsp&nbsp&nbsp&nbsp" + "2 * " + valor.toString() + " = ";
          break;
        case 52:
          DPp.innerHTML = DPp.innerHTML + "&nbsp&nbsp&nbsp&nbsp" + "2 * " + valor.toString() + " = ";
      }
    }
    valor = valor*2;
    if (valor != 0) {
      switch(bits) {
        case 23:
          SPp.innerHTML = SPp.innerHTML + valor + "<br/>";
          break;
        case 52:
          DPp.innerHTML = DPp.innerHTML + valor + "<br/>";
      }
    }
    if (valor >= 1) {
      resultado = resultado + "1";
      valor--;
    } else {
      resultado = resultado + "0";
    }
  }

  return resultado;
}

function GeneraAnalisis(valor){

  EsPositivo(valor);
  Cadena = "<br/><b>2.&nbspNOTACIÓN CIENTÍFICA NORMALIZADA:</b><br/>";

  SPp.innerHTML = SPp.innerHTML + Cadena;
  DPp.innerHTML = DPp.innerHTML + Cadena;
  IEp.innerHTML = IEp.innerHTML + Cadena;
  IE64p.innerHTML = IE64p.innerHTML + Cadena;
  

  Potencia(parseFloat(valor));
  Cadena = "<br/><b>3.&nbspEXPONENTE:</b><br/>";
  SPp.innerHTML = SPp.innerHTML + Cadena;
  DPp.innerHTML = DPp.innerHTML + Cadena;
  Cadena = "&nbsp&nbsp&nbsp&nbsp" + potencia.toString() + " + 2<sup>";
  SPp.innerHTML = SPp.innerHTML + Cadena + "(8-1)</sup> = " + Exponente(potencia,8,0).toString();
  DPp.innerHTML = DPp.innerHTML + Cadena + "(11-1)</sup> = " + Exponente(potencia,11,0).toString();

  SPexpo.value = ToBinario(Exponente(potencia,8,0),8);
  DPexpo.value = ToBinario(Exponente(potencia,11,0),11);

  Cadena = "<br/>&nbsp&nbsp&nbsp&nbsp";
  SPp.innerHTML = SPp.innerHTML + Cadena + Exponente(potencia,8,0).toString() + " = " + SPexpo.value + "<sub>(2)</sub>";
  DPp.innerHTML = DPp.innerHTML + Cadena + Exponente(potencia,11,0).toString() + "= " + DPexpo.value + "<sub>(2)</sub>";

  Cadena = "<br/><br/><b>4.&nbspMANTISA:</b><br/>";
  SPp.innerHTML = SPp.innerHTML + Cadena;
  DPp.innerHTML = DPp.innerHTML + Cadena;

  if (Positivo) {
    SPmantisa.value = Mantisa(NumeroListo, 23);
    DPmantisa.value = Mantisa(NumeroListo, 52);
    Cadena = "<br/>&nbsp&nbsp&nbsp&nbspMantisa: ";
    SPp.innerHTML = SPp.innerHTML + Cadena + SPmantisa.value;
    DPp.innerHTML = DPp.innerHTML + Cadena + DPmantisa.value;
  }
  else {

    SPmantisa.value = Complementar(Mantisa(NumeroListo, 23));
    DPmantisa.value = Complementar(Mantisa(NumeroListo, 52));

    Cadena = "<br/>&nbsp&nbsp&nbsp&nbsp<b>Se realiza Complemento a 1, a la Mantisa, debido a que el número es Negativo</b><br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspMantisa: ";
    SPp.innerHTML = SPp.innerHTML + Cadena + Mantisa(NumeroListo, 23);
    DPp.innerHTML = DPp.innerHTML + Cadena + Mantisa(NumeroListo, 52);
    Cadena = "<br/>&nbsp&nbsp&nbsp&nbspMantisa (C-1): ";
    SPp.innerHTML = SPp.innerHTML + Cadena + SPmantisa.value;
    DPp.innerHTML = DPp.innerHTML + Cadena + DPmantisa.value;
  }
}

function IEEEAnalisis(valor) {
  if (parseFloat(valor) < 0) {
    valor = (parseFloat(valor)*(-1)).toString();
  }
  var ParteEntera = parseFloat(valor);
  var ParteDecimal = 0;
  var Binario = "";
  var Binario2 = "";
  var HayPunto = false;
  var potencia = 0;
  var EncontreUno = false;

  Cadena = "<br/>&nbsp&nbsp&nbsp&nbsp<b>Conversión a Binario</b><br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<em>Parte Entera: </em>";
  IEp.innerHTML = IEp.innerHTML + Cadena;
  IE64p.innerHTML = IE64p.innerHTML + Cadena;

  for(i = 0; i < valor.length; i++) {
      if(valor.substring(i,i + 1) == ".") {
        ParteEntera = parseFloat(valor.substring(0,i));
        if (i!=valor.length-1) {
          HayPunto = true;
          ParteDecimal = parseFloat("0"+valor.substring(i,valor.length));
        }
        break;
      }
  }
  if (HayPunto && ParteDecimal!=0) {
    if (ParteEntera > 0) {
      potencia = ToBinario(ParteEntera,1).length-1;
      Binario = ToBinario(ParteEntera,1) + "." + Mantisa(ParteDecimal, 23 + potencia);
      Binario2 = ToBinario(ParteEntera,1) + "." + Mantisa(ParteDecimal, 52 + potencia);
      Cadena = ParteEntera.toString() + " = " + ToBinario(ParteEntera,1) + "<sub>(2)</sub><br/>";
      IEp.innerHTML = IEp.innerHTML + Cadena;
      IE64p.innerHTML = IE64p.innerHTML + Cadena;
      Cadena = "&nbsp&nbsp&nbsp&nbsp&nbsp<em>Parte Decimal: </em>" + ParteDecimal.toString() + " = ";
      IEp.innerHTML = IEp.innerHTML + Cadena + Mantisa(ParteDecimal, 23 + potencia) + "<sub>(2)</sub><br/>";
      IE64p.innerHTML = IE64p.innerHTML + Cadena + Mantisa(ParteDecimal, 52 + potencia) + "<sub>(2)</sub><br/>";
    } else {
      var ParteDecimal2 = ParteDecimal;
      while(!EncontreUno) {
        ParteDecimal = ParteDecimal*2;
        if (ParteDecimal >= 1) {
          EncontreUno = true;
          potencia--;
        } else {
          potencia--;
        }
      }
        Binario = Binario + "0." + Mantisa(ParteDecimal2, 23 - potencia);
        Binario2 = Binario2 + "0." + Mantisa(ParteDecimal2, 52 - potencia);
        Cadena = " 0<br/>";
        IEp.innerHTML = IEp.innerHTML + Cadena;
        IE64p.innerHTML = IE64p.innerHTML + Cadena;
        Cadena = "&nbsp&nbsp&nbsp&nbsp&nbsp<em>Parte Decimal: </em>" + ParteDecimal2.toString() + " = .";
        IEp.innerHTML = IEp.innerHTML + Cadena + Mantisa(ParteDecimal2, 23 - potencia) + "<sub>(2)</sub><br/>";
        IE64p.innerHTML = IE64p.innerHTML + Cadena + Mantisa(ParteDecimal2, 52 - potencia) + "<sub>(2)</sub><br/>";
    }

  } else {
    potencia = ToBinario(ParteEntera,1).length-1;
    Binario = ToBinario(ParteEntera,1) + "." + Mantisa(0, 23 - potencia);
    Binario2 = ToBinario(ParteEntera,1) + "." + Mantisa(0, 52 - potencia);
    Cadena = ParteEntera.toString() + " = " + ToBinario(ParteEntera,1) + "<sub>(2)</sub><br/>";
    IEp.innerHTML = IEp.innerHTML + Cadena;
    IE64p.innerHTML = IE64p.innerHTML + Cadena;
    Cadena = "&nbsp&nbsp&nbsp&nbsp&nbsp<em>Parte Decimal:</em> 0<br/>";
    IEp.innerHTML = IEp.innerHTML + Cadena;
    IE64p.innerHTML = IE64p.innerHTML + Cadena;
  }
  IEexpo.value = ToBinario(Exponente(potencia,8,1),8);
  IE64expo.value = ToBinario(Exponente(potencia,11,1),11);
  var contador = 0;
  Cadena = "<br/>&nbsp&nbsp&nbsp&nbsp&nbsp<em> Número en Binario: </em><br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
  IEp.innerHTML = IEp.innerHTML + Cadena + "2<sup>"+contador+"</sup>&nbsp&nbsp&nbsp&nbsp&nbsp" + Binario + "<sub>(2)<sub/><br/>";
  IE64p.innerHTML = IE64p.innerHTML + Cadena + "2<sup>"+contador+"</sup>&nbsp&nbsp&nbsp&nbsp&nbsp" + Binario2 + "<sub>(2)<sub/><br/>";

  var potencia2 = potencia;

  while (potencia != 0) {
      if (potencia > 0) {
        Binario = Binario.substring(0,potencia)+"."+Binario.substring(potencia,potencia+1)+Binario.substring(potencia+2,Binario.length);
        Binario2 = Binario2.substring(0,potencia)+"."+Binario2.substring(potencia,potencia+1)+Binario2.substring(potencia+2,Binario2.length);
        contador++;
        IEp.innerHTML = IEp.innerHTML + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp2<sup>"+contador+"</sup>&nbsp&nbsp&nbsp&nbsp&nbsp" + Binario + "<sub>(2)<sub/><br/>";
        IE64p.innerHTML = IE64p.innerHTML + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp2<sup>"+contador+"</sup>&nbsp&nbsp&nbsp&nbsp&nbsp" + Binario2 + "<sub>(2)<sub/><br/>";
        potencia--;
      } else {
        Binario = Binario.substring(2,3)+"."+Binario.substring(3,Binario.length);
        Binario2 = Binario2.substring(2,3)+"."+Binario2.substring(3,Binario2.length);
        contador--;
        IEp.innerHTML = IEp.innerHTML + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp2<sup>"+contador+"</sup>&nbsp&nbsp&nbsp&nbsp&nbsp" + Binario + "<sub>(2)<sub/><br/>";
        IE64p.innerHTML = IE64p.innerHTML + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp2<sup>"+contador+"</sup>&nbsp&nbsp&nbsp&nbsp&nbsp" + Binario2 + "<sub>(2)<sub/><br/>";
        potencia++;
      }
  }

  Cadena = "<br/>&nbsp&nbsp&nbsp&nbsp&nbsp<em> Número Normalizado: </em>";
  IEp.innerHTML = IEp.innerHTML + Cadena + Binario + "<sub>(2)<sub/><br/>";
  IE64p.innerHTML = IE64p.innerHTML + Cadena + Binario2 + "<sub>(2)<sub/><br/>";

  IEmantisa.value = Binario.substring(2,Binario.length);
  IE64mantisa.value = Binario2.substring(2,Binario2.length);

  Cadena = "<br/><b>3.&nbspEXPONENTE:</b><br/>";
  IEp.innerHTML = IEp.innerHTML + Cadena;
  IE64p.innerHTML = IE64p.innerHTML + Cadena;

  Cadena = "&nbsp&nbsp&nbsp&nbsp" + potencia2.toString() + " + 2<sup>";
  IEp.innerHTML = IEp.innerHTML + Cadena + "(8-1)</sup> -1 = " + Exponente(potencia2,8,1).toString();
  IE64p.innerHTML = IE64p.innerHTML + Cadena + "(11-1)</sup> -1 = " + Exponente(potencia2,11,1).toString();

  Cadena = "<br/>&nbsp&nbsp&nbsp&nbsp";
  IEp.innerHTML = IEp.innerHTML + Cadena + Exponente(potencia2,8,1).toString() + " = " + IEexpo.value + "<sub>(2)</sub><br/>";
  IE64p.innerHTML = IE64p.innerHTML + Cadena + Exponente(potencia2,11,1).toString() + " = " + IE64expo.value + "<sub>(2)</sub><br/>";

  Cadena = "<br/><b>4.&nbspMANTISA:</b><br/>&nbsp&nbsp&nbsp&nbspLa Mantisa es Número en Binario sin la Parte Entera<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<em>Mantisa: </em>";
  IEp.innerHTML = IEp.innerHTML + Cadena + IEmantisa.value + "<br/>";
  IE64p.innerHTML = IE64p.innerHTML + Cadena + IE64mantisa.value + "<br/>";
}

function LimpiarProceso(){
  SPsigno.value           = ""; 
  SPexpo.value            = ""; 
  SPmantisa.value         = ""; 
  DPsigno.value           = ""; 
  DPexpo.value            = ""; 
  DPmantisa.value         = ""; 
  IEsigno.value           = ""; 
  IEexpo.value            = ""; 
  IEmantisa.value         = ""; 
  IE64signo.value         = ""; 
  IE64expo.value          = ""; 
  IE64mantisa.value       = ""; 
  SPp.innerHTML           = "";    
  DPp.innerHTML           = "";    
  IEp.innerHTML           = "";    
  IE64p.innerHTML         = "";  
}