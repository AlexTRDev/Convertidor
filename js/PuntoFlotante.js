// PUNTO FLOTANTE BY JP
function PuntoFlotante(
  decimal,
  SPsigno,
  SPexpo,
  SPmantisa,
  DPsigno,
  DPexpo,
  DPmantisa,
  IEsigno,
  IEexpo,
  IEmantisa,
  IE64signo,
  IE64expo,
  IE64mantisa,
  InputExponCustom,
  InputMantisaCustom,
  Csigno,
  Cexpo,
  Cmantisa,
  SPp,
  DPp,
  IEp,
  IE64p,
  Cp
) {
    this.decimal = decimal;
    this.SPsigno = SPsigno;
    this.SPexpo = SPexpo;
    this.SPmantisa = SPmantisa;
    this.DPsigno = DPsigno;
    this.DPexpo = DPexpo;
    this.DPmantisa = DPmantisa;
    this.IEsigno = IEsigno;
    this.IEexpo = IEexpo;
    this.IEmantisa = IEmantisa;
    this.IE64signo = IE64signo;
    this.IE64expo = IE64expo;
    this.IE64mantisa = IE64mantisa;
    this.InputExponCustom = InputExponCustom;
    this.InputMantisaCustom = InputMantisaCustom;
    this.Csigno = Csigno;
    this.Cexpo = Cexpo;
    this.Cmantisa = Cmantisa;
    this.SPp = SPp;
    this.DPp = DPp;
    this.IEp = IEp;
    this.IE64p = IE64p;
    this.Cp = Cp;
    this.potencia = 0;
    this.Positivo = true;
    this.NumeroListo = 0;
    this.Cadena = "";

    this.Analizar = function () {
      if (this.Validar()) {
        this.Cadena = "<b><ins>PROCEDIMIENTO</ins></b><br/><br/><b>1.&nbspSIGNO:</b><br/>";
        this.SPp.innerHTML = this.Cadena;
        this.DPp.innerHTML = this.Cadena;
        if (parseFloat(this.decimal.value) != 0 ) {
          this.IEp.innerHTML = this.Cadena;
          this.IE64p.innerHTML = this.Cadena;
        }
        else {
          this.Cadena = "<b><ins>PROCEDIMIENTO</ins></b><br/><br/>LOS VALORES SON '0' DEBIDO A UNA REGLA DEL IEEE<br/>";
          this.IEp.innerHTML = this.Cadena;
          this.IE64p.innerHTML = this.Cadena;
        }
        this.Cp.innerHTML = this.Cadena;
        this.EsPositivo(this.decimal.value);
        this.Cadena = "<br/><b>2.&nbspNOTACIÓN CIENTÍFICA NORMALIZAR:</b><br/>";
        this.SPp.innerHTML = this.SPp.innerHTML + this.Cadena;
        this.DPp.innerHTML = this.DPp.innerHTML + this.Cadena;
        if (parseFloat(this.decimal.value) != 0 ) {
          this.IEp.innerHTML = this.IEp.innerHTML + this.Cadena;
          this.IE64p.innerHTML = this.IE64p.innerHTML + this.Cadena;
        }
        this.Cp.innerHTML = this.Cp.innerHTML + this.Cadena;
        this.Potencia(parseFloat(this.decimal.value));
        this.Cadena = "<br/><b>3.&nbspEXPONENTE:</b><br/>";
        this.SPp.innerHTML = this.SPp.innerHTML + this.Cadena;
        this.DPp.innerHTML = this.DPp.innerHTML + this.Cadena;
        this.Cp.innerHTML = this.Cp.innerHTML + this.Cadena;
        this.Cadena = "&nbsp&nbsp&nbsp&nbsp" + this.potencia.toString() + " + 2<sup>";
        this.SPp.innerHTML = this.SPp.innerHTML + this.Cadena + "(8-1)</sup> = " + this.Exponente(this.potencia,8,0).toString();
        this.DPp.innerHTML = this.DPp.innerHTML + this.Cadena + "(11-1)</sup> = " + this.Exponente(this.potencia,11,0).toString();
        this.Cp.innerHTML = this.Cp.innerHTML + this.Cadena + "("+this.InputExponCustom.value+"-1)</sup> = " + this.Exponente(this.potencia,parseFloat(this.InputExponCustom.value),0).toString();

        this.SPexpo.value = this.ToBinario(this.Exponente(this.potencia,8,0),8);
        this.DPexpo.value = this.ToBinario(this.Exponente(this.potencia,11,0),11);
        this.Cexpo.value = this.ToBinario(this.Exponente(this.potencia,parseFloat(this.InputExponCustom.value),0),parseFloat(this.InputExponCustom.value));

        this.Cadena = "<br/>&nbsp&nbsp&nbsp&nbsp";
        this.SPp.innerHTML = this.SPp.innerHTML + this.Cadena + this.Exponente(this.potencia,8,0).toString() + " = " + this.SPexpo.value + "<sub>(2)</sub>";
        this.DPp.innerHTML = this.DPp.innerHTML + this.Cadena + this.Exponente(this.potencia,11,0).toString() + "= " + this.DPexpo.value + "<sub>(2)</sub>";
        this.Cp.innerHTML = this.Cp.innerHTML + this.Cadena + this.Exponente(this.potencia,parseFloat(this.InputExponCustom.value),0).toString() + " = " + this.Cexpo.value + "<sub>(2)</sub>";

        this.Cadena = "<br/><br/><b>4.&nbspMANTISA:</b><br/>";
        this.SPp.innerHTML = this.SPp.innerHTML + this.Cadena;
        this.DPp.innerHTML = this.DPp.innerHTML + this.Cadena;
        this.Cp.innerHTML = this.Cp.innerHTML + this.Cadena;

        if (this.Positivo) {
          this.SPmantisa.value = this.Mantisa(this.NumeroListo, 23);
          this.DPmantisa.value = this.Mantisa(this.NumeroListo, 52);
          this.Cmantisa.value = this.Mantisa(this.NumeroListo, parseFloat(this.InputMantisaCustom.value));
          this.Cadena = "<br/>&nbsp&nbsp&nbsp&nbspMantisa: ";
          this.SPp.innerHTML = this.SPp.innerHTML + this.Cadena + this.SPmantisa.value;
          this.DPp.innerHTML = this.DPp.innerHTML + this.Cadena + this.DPmantisa.value;
          this.Cp.innerHTML = this.Cp.innerHTML + this.Cadena + this.Cmantisa.value;
        }
        else {

          this.SPmantisa.value = this.Complementar(this.Mantisa(this.NumeroListo, 23));
          this.DPmantisa.value = this.Complementar(this.Mantisa(this.NumeroListo, 52));
          this.Cmantisa.value = this.Complementar(this.Mantisa(this.NumeroListo, parseFloat(this.InputMantisaCustom.value)));

          this.Cadena = "<br/>&nbsp&nbsp&nbsp&nbsp<b>Se realiza Complemento a 1, a la Mantisa, debido a que el número es Negativo</b><br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspMantisa: ";
          this.SPp.innerHTML = this.SPp.innerHTML + this.Cadena + this.Mantisa(this.NumeroListo, 23);
          this.DPp.innerHTML = this.DPp.innerHTML + this.Cadena + this.Mantisa(this.NumeroListo, 52);
          this.Cp.innerHTML = this.Cp.innerHTML + this.Cadena + this.Mantisa(this.NumeroListo, parseFloat(this.InputMantisaCustom.value));
          this.Cadena = "<br/>&nbsp&nbsp&nbsp&nbspMantisa (C-1): ";
          this.SPp.innerHTML = this.SPp.innerHTML + this.Cadena + this.SPmantisa.value;
          this.DPp.innerHTML = this.DPp.innerHTML + this.Cadena + this.DPmantisa.value;
          this.Cp.innerHTML = this.Cp.innerHTML + this.Cadena + this.Cmantisa.value;
        }
        if (parseFloat(this.decimal.value) != 0 ) {
          this.IEEEAnalisis(this.decimal.value);
        }
        else {
          this.IEsigno.value = "0";
          this.IE64signo.value = "0";
          this.IEexpo.value = "00000000";
          this.IE64expo.value = "00000000000";
          this.IEmantisa.value = "00000000000000000000000";
          this.IE64mantisa.value = "00000000000000000000000000000000000000000";
        }
      }
    }

    this.Validar = function () {
      var TodoOk = true;
      var EsNegativo = false;
      var TienePunto = false;
      if (this.decimal.value == "") {
        this.decimal.value = "0";
      }
      if (this.InputExponCustom.value == "") {
        this.InputExponCustom.value = "1";
      }
      if (this.InputMantisaCustom.value == "") {
        this.InputMantisaCustom.value = "1";
      }
      if(this.decimal.value.substring(0,1) == "-") {
        if (this.decimal.value.length > 1) {
          if (this.decimal.value.substring(1,2) == "-") {
            this.decimal.value = this.decimal.value.substring(0,1);
            TodoOk = false;
          }else {
            TodoOk = true;
            EsNegativo = true;
          }
        } else {
          TodoOk = false;
        }
      }

      for (var i = 0; i < this.decimal.value.length; i++) {
        if (
          this.decimal.value.substring(i,i+1) !== "-" &&
          this.decimal.value.substring(i,i+1) !== "." &&
          this.decimal.value.substring(i,i+1) !== "1" &&
          this.decimal.value.substring(i,i+1) !== "2" &&
          this.decimal.value.substring(i,i+1) !== "3" &&
          this.decimal.value.substring(i,i+1) !== "4" &&
          this.decimal.value.substring(i,i+1) !== "5" &&
          this.decimal.value.substring(i,i+1) !== "6" &&
          this.decimal.value.substring(i,i+1) !== "7" &&
          this.decimal.value.substring(i,i+1) !== "8" &&
          this.decimal.value.substring(i,i+1) !== "9" &&
          this.decimal.value.substring(i,i+1) !== "0"
        ) {
          if (this.decimal.value.length == 1) {
            this.decimal.value = "0";
          }
          else {
            this.decimal.value = this.decimal.value.substring(0,i);
          }
        }
        else if(!TienePunto && this.decimal.value.substring(i,i+1) == ".") {
          TienePunto = true;
        }
        else if (TienePunto && this.decimal.value.substring(i,i+1) == ".") {
          this.decimal.value = this.decimal.value.substring(0,i);
        }

        if (i != 0 && EsNegativo && this.decimal.value.substring(i,i+1) == "-") {
          this.decimal.value = this.decimal.value.substring(0,i);
        }
      }
      return TodoOk;
    }

    this.EsPositivo = function (valor) {
        if(valor.substring(0,1) == "-") {
          this.Positivo = false;
          this.SPsigno.value = "1";
          this.DPsigno.value = "1";
          this.IEsigno.value = "1";
          this.IE64signo.value = "1";
          this.Csigno.value = "1";
          this.Cadena = "&nbsp&nbsp&nbsp&nbspEl Número es <b><em>Negativo</em></b>, por lo tanto el bit del Signo es '1'.<br/>";
          if (parseFloat(this.decimal.value) != 0) {
              this.IEp.innerHTML = this.IEp.innerHTML + this.Cadena;
              this.IE64p.innerHTML = this.IE64p.innerHTML + this.Cadena;
          }
          this.SPp.innerHTML = this.SPp.innerHTML + this.Cadena;
          this.DPp.innerHTML = this.DPp.innerHTML + this.Cadena;
          this.Cp.innerHTML = this.Cp.innerHTML + this.Cadena;
        }
        else {
          this.Positivo = true;
          this.SPsigno.value = "0";
          this.DPsigno.value = "0";
          this.IEsigno.value = "0";
          this.IE64signo.value = "0";
          this.Csigno.value = "0";
          if (parseFloat(this.decimal.value) != 0) {
              this.Cadena = "&nbsp&nbsp&nbsp&nbspEl Número es <b><em>Positivo</em></b>, por lo tanto el bit del Signo es '0'.<br/>";
              this.IEp.innerHTML = this.IEp.innerHTML + this.Cadena;
              this.IE64p.innerHTML = this.IE64p.innerHTML + this.Cadena;
          }
          this.SPp.innerHTML = this.SPp.innerHTML + this.Cadena;
          this.DPp.innerHTML = this.DPp.innerHTML + this.Cadena;
          this.Cp.innerHTML = this.Cp.innerHTML + this.Cadena;
        }
    }

    this.Potencia = function (valor) {
      this.potencia = 0;
      this.SPp.innerHTML = this.SPp.innerHTML + "&nbsp&nbsp&nbsp&nbsp" + "2<sup>"+this.potencia+"</sup>" + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + valor + "<br/>";
      this.DPp.innerHTML = this.DPp.innerHTML + "&nbsp&nbsp&nbsp&nbsp" + "2<sup>"+this.potencia+"</sup>" + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + valor + "<br/>";
      this.Cp.innerHTML = this.Cp.innerHTML + "&nbsp&nbsp&nbsp&nbsp" + "2<sup>"+this.potencia+"</sup>" + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + valor + "<br/>";
      if (valor < 0) {
        valor = valor * -1;
      }
      if (valor != 0 && valor < 0.1) {
        while (valor < 0.1) {
          valor = valor*2;
          this.potencia--;
          this.SPp.innerHTML = this.SPp.innerHTML + "&nbsp&nbsp&nbsp&nbsp" + "2<sup>"+this.potencia+"</sup>" + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + valor + "<br/>";
          this.DPp.innerHTML = this.DPp.innerHTML + "&nbsp&nbsp&nbsp&nbsp" + "2<sup>"+this.potencia+"</sup>" + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + valor + "<br/>";
          this.Cp.innerHTML = this.Cp.innerHTML + "&nbsp&nbsp&nbsp&nbsp" + "2<sup>"+this.potencia+"</sup>" + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + valor + "<br/>";
        }
      }
      else {
        while (valor >= 1) {
          valor = valor/2;
          this.potencia++;
          this.SPp.innerHTML = this.SPp.innerHTML + "&nbsp&nbsp&nbsp&nbsp" + "2<sup>"+this.potencia+"</sup>" + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + valor + "<br/>";
          this.DPp.innerHTML = this.DPp.innerHTML + "&nbsp&nbsp&nbsp&nbsp" + "2<sup>"+this.potencia+"</sup>" + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + valor + "<br/>";
          this.Cp.innerHTML = this.Cp.innerHTML + "&nbsp&nbsp&nbsp&nbsp" + "2<sup>"+this.potencia+"</sup>" + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + valor + "<br/>";
        }
      }
      this.NumeroListo = valor;
    }

    this.Exponente = function (potencia, bits, resta) {
      var resultado;
      if (potencia < 0 && -potencia>Math.pow(2, bits-1)) {
        resultado = Math.pow(2, bits)-1;
      }
      else {
        resultado = potencia + Math.pow(2, bits-1) - resta;
      }
      return resultado;
    }

    this.ToBinario = function (valor,bits) {
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

    this.Complementar = function (valor) {
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

    this.Mantisa = function (valor, bits) {
      var resultado = "";

      for (var i = 0; i < bits; i++) {
        if (valor != 0) {
          switch(bits) {
              case 23:
                  this.SPp.innerHTML = this.SPp.innerHTML + "&nbsp&nbsp&nbsp&nbsp" + "2 * " + valor.toString() + " = ";
                  break;
              case 52:
                  this.DPp.innerHTML = this.DPp.innerHTML + "&nbsp&nbsp&nbsp&nbsp" + "2 * " + valor.toString() + " = ";
                  break;
              case parseFloat(this.InputMantisaCustom.value):
                  this.Cp.innerHTML = this.Cp.innerHTML + "&nbsp&nbsp&nbsp&nbsp" + "2 * " + valor.toString() + " = ";
          }
        }
        valor = valor*2;
        if (valor != 0) {
          switch(bits) {
              case 23:
                  this.SPp.innerHTML = this.SPp.innerHTML + valor + "<br/>";
                  break;
              case 52:
                  this.DPp.innerHTML = this.DPp.innerHTML + valor + "<br/>";
                  break;
              case parseFloat(this.InputMantisaCustom.value):
                  this.Cp.innerHTML = this.Cp.innerHTML + valor + "<br/>";
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

    this. IEEEAnalisis = function (valor) {
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

      this.Cadena = "<br/>&nbsp&nbsp&nbsp&nbsp<b>Conversión a Binario</b><br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<em>Parte Entera: </em>";
      this.IEp.innerHTML = this.IEp.innerHTML + this.Cadena;
      this.IE64p.innerHTML = this.IE64p.innerHTML + this.Cadena;

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
          potencia = this.ToBinario(ParteEntera,1).length-1;
          Binario = this.ToBinario(ParteEntera,1) + "." + this.Mantisa(ParteDecimal, 23 + potencia);
          Binario2 = this.ToBinario(ParteEntera,1) + "." + this.Mantisa(ParteDecimal, 52 + potencia);
          this.Cadena = ParteEntera.toString() + " = " + this.ToBinario(ParteEntera,1) + "<sub>(2)</sub><br/>";
          this.IEp.innerHTML = this.IEp.innerHTML + this.Cadena;
          this.IE64p.innerHTML = this.IE64p.innerHTML + this.Cadena;
          this.Cadena = "&nbsp&nbsp&nbsp&nbsp&nbsp<em>Parte Decimal: </em>" + ParteDecimal.toString() + " = ";
          this.IEp.innerHTML = this.IEp.innerHTML + this.Cadena + this.Mantisa(ParteDecimal, 23 + potencia) + "<sub>(2)</sub><br/>";
          this.IE64p.innerHTML = this.IE64p.innerHTML + this.Cadena + this.Mantisa(ParteDecimal, 52 + potencia) + "<sub>(2)</sub><br/>";
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
            Binario = Binario + "0." + this.Mantisa(ParteDecimal2, 23 - potencia);
            Binario2 = Binario2 + "0." + this.Mantisa(ParteDecimal2, 52 - potencia);
            this.Cadena = " 0<br/>";
            this.IEp.innerHTML = this.IEp.innerHTML + this.Cadena;
            this.IE64p.innerHTML = this.IE64p.innerHTML + this.Cadena;
            this.Cadena = "&nbsp&nbsp&nbsp&nbsp&nbsp<em>Parte Decimal: </em>" + ParteDecimal2.toString() + " = .";
            this.IEp.innerHTML = this.IEp.innerHTML + this.Cadena + this.Mantisa(ParteDecimal2, 23 - potencia) + "<sub>(2)</sub><br/>";
            this.IE64p.innerHTML = this.IE64p.innerHTML + this.Cadena + this.Mantisa(ParteDecimal2, 52 - potencia) + "<sub>(2)</sub><br/>";
        }

      } else {
        potencia = this.ToBinario(ParteEntera,1).length-1;
        Binario = this.ToBinario(ParteEntera,1) + "." + this.Mantisa(0, 23 - potencia);
        Binario2 = this.ToBinario(ParteEntera,1) + "." + this.Mantisa(0, 52 - potencia);
        this.Cadena = ParteEntera.toString() + " = " + this.ToBinario(ParteEntera,1) + "<sub>(2)</sub><br/>";
        this.IEp.innerHTML = this.IEp.innerHTML + this.Cadena;
        this.IE64p.innerHTML = this.IE64p.innerHTML + this.Cadena;
        this.Cadena = "&nbsp&nbsp&nbsp&nbsp&nbsp<em>Parte Decimal:</em> 0<br/>";
        this.IEp.innerHTML = this.IEp.innerHTML + this.Cadena;
        this.IE64p.innerHTML = this.IE64p.innerHTML + this.Cadena;
      }
      this.IEexpo.value = this.ToBinario(this.Exponente(potencia,8,1),8);
      this.IE64expo.value = this.ToBinario(this.Exponente(potencia,11,1),11);
      var contador = 0;
      this.Cadena = "<br/>&nbsp&nbsp&nbsp&nbsp&nbsp<em> Número en Binario: </em><br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
      this.IEp.innerHTML = this.IEp.innerHTML + this.Cadena + "2<sup>"+contador+"</sup>&nbsp&nbsp&nbsp&nbsp&nbsp" + Binario + "<sub>(2)<sub/><br/>";
      this.IE64p.innerHTML = this.IE64p.innerHTML + this.Cadena + "2<sup>"+contador+"</sup>&nbsp&nbsp&nbsp&nbsp&nbsp" + Binario2 + "<sub>(2)<sub/><br/>";

      var potencia2 = potencia;

      while (potencia != 0) {
          if (potencia > 0) {
            Binario = Binario.substring(0,potencia)+"."+Binario.substring(potencia,potencia+1)+Binario.substring(potencia+2,Binario.length);
            Binario2 = Binario2.substring(0,potencia)+"."+Binario2.substring(potencia,potencia+1)+Binario2.substring(potencia+2,Binario2.length);
            contador++;
            this.IEp.innerHTML = this.IEp.innerHTML + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp2<sup>"+contador+"</sup>&nbsp&nbsp&nbsp&nbsp&nbsp" + Binario + "<sub>(2)<sub/><br/>";
            this.IE64p.innerHTML = this.IE64p.innerHTML + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp2<sup>"+contador+"</sup>&nbsp&nbsp&nbsp&nbsp&nbsp" + Binario2 + "<sub>(2)<sub/><br/>";
            potencia--;
          } else {
            Binario = Binario.substring(2,3)+"."+Binario.substring(3,Binario.length);
            Binario2 = Binario2.substring(2,3)+"."+Binario2.substring(3,Binario2.length);
            contador--;
            this.IEp.innerHTML = this.IEp.innerHTML + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp2<sup>"+contador+"</sup>&nbsp&nbsp&nbsp&nbsp&nbsp" + Binario + "<sub>(2)<sub/><br/>";
            this.IE64p.innerHTML = this.IE64p.innerHTML + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp2<sup>"+contador+"</sup>&nbsp&nbsp&nbsp&nbsp&nbsp" + Binario2 + "<sub>(2)<sub/><br/>";
            potencia++;
          }
      }

      this.Cadena = "<br/>&nbsp&nbsp&nbsp&nbsp&nbsp<em> Número Normalizado: </em>";
      this.IEp.innerHTML = this.IEp.innerHTML + this.Cadena + Binario + "<sub>(2)<sub/><br/>";
      this.IE64p.innerHTML = this.IE64p.innerHTML + this.Cadena + Binario2 + "<sub>(2)<sub/><br/>";

      this.IEmantisa.value = Binario.substring(2,Binario.length);
      this.IE64mantisa.value = Binario2.substring(2,Binario2.length);

      this.Cadena = "<br/><b>3.&nbspEXPONENTE:</b><br/>";
      this.IEp.innerHTML = this.IEp.innerHTML + this.Cadena;
      this.IE64p.innerHTML = this.IE64p.innerHTML + this.Cadena;

      this.Cadena = "&nbsp&nbsp&nbsp&nbsp" + potencia2.toString() + " + 2<sup>";
      this.IEp.innerHTML = this.IEp.innerHTML + this.Cadena + "(8-1)</sup> -1 = " + this.Exponente(potencia2,8,1).toString();
      this.IE64p.innerHTML = this.IE64p.innerHTML + this.Cadena + "(11-1)</sup> -1 = " + this.Exponente(potencia2,11,1).toString();

      this.Cadena = "<br/>&nbsp&nbsp&nbsp&nbsp";
      this.IEp.innerHTML = this.IEp.innerHTML + this.Cadena + this.Exponente(potencia2,8,1).toString() + " = " + this.IEexpo.value + "<sub>(2)</sub><br/>";
      this.IE64p.innerHTML = this.IE64p.innerHTML + this.Cadena + this.Exponente(potencia2,11,1).toString() + " = " + this.IE64expo.value + "<sub>(2)</sub><br/>";

      this.Cadena = "<br/><b>4.&nbspMANTISA:</b><br/>&nbsp&nbsp&nbsp&nbspLa Mantisa es Número en Binario sin la Parte Entera<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<em>Mantisa: </em>";
      this.IEp.innerHTML = this.IEp.innerHTML + this.Cadena + this.IEmantisa.value + "<br/>";
      this.IE64p.innerHTML = this.IE64p.innerHTML + this.Cadena + this.IE64mantisa.value + "<br/>";
    }
  }
