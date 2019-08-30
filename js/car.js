/**
 * Clase carro
 */
class Car {
  // Declaracion de variables y constructor de la clase
  constructor(_brand,
    _btnEncenderApagar, 
    _btnAcelerar, 
    _btnFrenar, 
    _btnClutch,
    _btnGearBoxUp, 
    _btnGearBoxDown, 
    _btnHandBrake, 
    _btnLeftDirectional, 
    _btnRightDirectional, 
    _btnTurnLeft, 
    _btnTurnRight,
    _btnStationary,
    _tourMsg) {

    // La marca del carro
    this.brand = _brand;
    this.btnEncenderApagar = _btnEncenderApagar;
    this.btnAcelerar = _btnAcelerar;
    this.btnFrenar = _btnFrenar;
    this.btnClutch = _btnClutch;
    this.btnGearBoxUp = _btnGearBoxUp;
    this.btnGearBoxDown = _btnGearBoxDown;
    this.btnHandBrake = _btnHandBrake;
    this.btnLeftDirectional = _btnLeftDirectional;
    this.btnRightDirectional = _btnRightDirectional;
    this.btnTurnLeft = _btnTurnLeft;
    this.btnTurnRight = _btnTurnRight;
    this.btnStationary = _btnStationary;
    this.tourMsg = _tourMsg;

    //Estados del carro
    this.isRunning = false; // Saber si el carro esta en movimiento
    this.speedUpState = 0; // 0 no acelera, 1 acelerando
    this.currentSpeed = 0; // Velocidad actual del vehiculo
    this.turnOn = false; // true carro encendido, false carro apagado
    this.handBrakeOn = true; // freno de mano activado = true, inactivo = false
    this.clutchOn = false; // Embrague. Presionado = true, no presionado = false
    this.breakOn = false; // el freno del carro. true si se encuentra presionado, false si no
    this.transmissionState = 0; // 0 Neutro, 1 primera, 2 segunda... etc, -1 reversa
    this.diretionalState = 0; // o apagado, 1 left, 2 right, 3 leftRight
    this.directionalLeft = false;
    this.directionalRight = false;
    this.directionalRightLeft = false;

    this.speedCalculeInterval = null;

    this.turnLeftRight = 0; // 0 sin mover, 1 izquierda 2 derecha

    this.tourMode = false;

    this.secondsSpeedUp = 0;
    this.distanceSpeedUp = 0;
    this.distance = 0;

    // datos
    this.tours = [];  

    // Metodos //

    this.setCurrentSpeed = function (kmh) {
      this.currentSpeed = kmh;
    }

    this.inactiveSpeedUpCalculate = function () {
      clearInterval(this.speedCalculeInterval);
      this.setCurrentSpeed(0);
    };

    this.setIsRunning = function (value) {
      this.isRunning = value;
    }

    this.getIsRunning = function (value) {
      return this.isRunning;
    }

    this.activeSpeedUpCalculate = function () {
      
      this.speedCalculeInterval = setInterval(() => {
        // si esta acelerando
        if(this.getSpeedUpState() && !this.getClutchState()){

          this.setIsRunning(true);

          // Cambio actual del carro
          let transmission = this.getTransmissionState();
          let kmh = 0;

          switch (transmission) {
            case 1:
              kmh = this.getCurrentSpeed() + this.getRandom(5);
              this.setCurrentSpeed((kmh > 10) ? 10 : kmh)
              break;

            case 2:
                kmh = this.getCurrentSpeed() + this.getRandom(5);
                this.setCurrentSpeed((kmh > 20) ? 20 : kmh)
              break;

            case 3:
                kmh = this.getCurrentSpeed() + this.getRandom(5);
                this.setCurrentSpeed((kmh > 30) ? 30 : kmh)
              break;

            case 4:
                kmh = this.getCurrentSpeed() + this.getRandom(5);
                this.setCurrentSpeed((kmh > 40) ? 40 : kmh)
              break;

            case 5:
                kmh = this.getCurrentSpeed() + this.getRandom(5);
                this.setCurrentSpeed((kmh > 60) ? 60 : kmh)
              break;

            case 6:
                kmh = this.getCurrentSpeed() + this.getRandom(5);
                this.setCurrentSpeed((kmh > 80) ? 80 : kmh)
              break;
          
            default:
                this.setCurrentSpeed(0)
              break;
          }

          // Agregar segundo de acelerado
          this.secondsSpeedUp++;

          // Calcular distancia recorrida acelerando 
          this.distanceSpeedUp += (this.getCurrentSpeed() * (1 / 120));
        }

        // Asignar velocidad actual
        $("#currentSpeed").html(this.getCurrentSpeed());

        // si no esta caminando asignamos la pripiedad que indica que el carro no esta en movimiento
        if(this.getCurrentSpeed() == 0)
          this.setIsRunning(false);

        if(this.getIsRunning()){
          this.distance += (this.getCurrentSpeed() * (1 / 120))
          // Calcular distancia recorrida total 
          //this.distance += parseFloat(this.distanceSpeedUp) + this.distance;
        }

        $("#distance").html(this.distanceSpeedUp.toLocaleString() + " Km/h - Distancia Total: " + this.distance.toLocaleString() + " Km/h");
        
      }, 1000);
    }

    /**
     * Devuelve un numero aleatorio de 1 entre el numero que se envie como parametro
     */
    this.getRandom = function (beetwen) {
      let random = Math.ceil(Math.random() * beetwen);
      if(random != 0)
          return Math.ceil(Math.random() * beetwen);
      else
          return this.getRandom(beetwen);
    }

    //Interacturar directamente con los botones del tablero del carro
    // Estos metodos se usan principalmente por el tour ya que desde alli
    // se pueden modificar o hacer que el aspecto visual del carro y sus controles
    // cambien segun se vaya ejecutando el tour

    // Ejecutar evento click del boton encender
    this.viewBtnEncenderApagarClick = function () {
      $("#" + this.btnEncenderApagar).trigger("click");
    }

    this.viewBtnAcelerarClick = function () {
      $("#" + this.btnAcelerar).trigger("click");
    }

    this.viewBtnClutchClick = function () {
      $("#" + this.btnClutch).trigger("click");
    }

    this.viewBtnFrenarClick = function () {
      $("#" + this.btnFrenar).trigger("click");
    }
    
    this.viewBtnHandBrakeClick = function () {
      $("#" + this.btnHandBrake).trigger("click");
    }

    this.viewBtnGearBoxUpClick = function () {
      $("#" + this.btnGearBoxUp).trigger("click");
    }

    this.viewBtnGearBoxUpClick = function () {
      $("#" + this.btnGearBoxUp).trigger("click");
    }



    this.setDirectionalRightLeft = function (state) {
      this.directionalRightLeft = state;
    }

    this.getDirectionalRightLeftState = function () {
      return this.directionalRightLeft;
    }

    this.setTurnLeftRight = function (value) {

      if(value == 1){
        if(!this.getDirectionalLeftState()){
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Debe de encender la direccional izquierda para poder dar el giro.'
          });
          return false;
        }
      }

      if(value == 2){
        if(!this.getDirectionalRightState()){
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Debe de encender la direccional derecha para poder dar el giro.'
          });
          return false;
        }
      }

      this.turnLeftRight = value;
      return true;
    }
    this.getTurnLeftRightState = function () {
      return this.turnLeftRight;
    }

    // Direccionales

    this.setDirectionalRightOnOff = function () {
      let state = this.getTurnLeftRightState();
      if(state != 0 && state == 2){
        if(!this.tourMode){
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Debe de terminar el gito para poder apagar la direccional derecha.'
          });
        }
        return false;
      }
      this.directionalRight = !this.directionalRight;
      return true;
    }

    this.getDirectionalRightState = function () {
      return this.directionalRight;
    }

    this.setDirectionalLeftOnOff = function () {
      let state = this.getTurnLeftRightState();
      if(state != 0 && state == 1){
        if(!this.tourMode){
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Debe de terminar el gito para poder apagar la direccional izquierda.'
          });
        }
        return false;
      }
      this.directionalLeft = !this.directionalLeft;
      return true;
    }

    this.getDirectionalLeftState = function () {
      return this.directionalLeft;
    }

    this.getCurrentSpeed = function () {
      return this.currentSpeed;
    }

    // Metodos de frenado

    this.setHandBrakeOnOff = function (action) {
      
      // si se encuentra ya presionado y la accion es presionar (action = true)
      if(this.getHandBrakeState() && action){
        if(!this.tourMode){
          Swal.fire({
            type: 'info',
            title: 'Oops...',
            text: 'Ya se encuentra presionado el freno de mano'
          });
        }
        return false;
      }

      if(this.getCurrentSpeed() > 0){
        if(!this.tourMode){
          Swal.fire({
            type: 'info',
            title: 'Oops...',
            text: 'El vehiculo debe de estar parqueado para activar el freno de mano'
          });
        }
        return false;
      }

      if(this.getSpeedUpState()){
        if(!this.tourMode){
          Swal.fire({
            type: 'info',
            title: 'Oops...',
            text: 'El vehiculo se encuentra acelerando'
          });
        }
        return false;
      }

      if(action){
        this.handBrakeOn = true;
      }
      else{
        this.handBrakeOn = false;
      }

    }

    this.getHandBrakeState = function () {
      return this.handBrakeOn;
    }

    /**
     * Presionar freno
     */
    this.setBrakeOnOff = function (action) {
      
      // Si el carro esta en movimiento, el comportamiento del freno varia
      if(this.getCurrentSpeed() > 0){

        // verificar que el carro se encuentre en netro
        if(this.getTransmissionState() !== 0){
          if(!this.tourMode){
            Swal.fire({
              type: 'info',
              title: 'Oops...',
              text: 'Para el frenado, el vehiculo debe de estar en neutro.'
            });
          }
          return false;
        }
        
        this.breakOn = action;
        return true;
      }
      else{

        // si no esta en movimiento el freno se puede presionar sin otro tipo de validaciones
        this.breakOn = action;
        return true;

      }
    }
    this.getBrakeState = function () {
      return this.breakOn;
    }
    // fin frenado

    // acelerar 
    this.setSpeedUp = function (action) {
      
      // verificar que el carro este encendido
      if(!this.getTurnOnOffState()){
        if(!this.tourMode){
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'El vehiculo no encuentra encendido'
          });
        }
        return false;
      }

      // Verificar que el carro se encuentre al menos en un cambio diferente a neutro
      if(this.getTransmissionState() == 0){
        if(!this.tourMode){
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'El vehiculo no encuentra engranado'
          });
        }
        return false;
      }

      // Verificar que el carro no este frenado y se quiera acelerar (action = true)
      if(this.getBrakeState() && action){
        if(!this.tourMode){
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Por favor suelta el freno para poder acelerar'
          });
        }
        return false;
      }

      // verificar el freno de mano
      if(this.getHandBrakeState()){
        if(!this.tourMode){
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Por favor suelta el freno de mano para poder acelerar'
          });
        }
        return false;
      }

      // si se quiere acelerar
      if(action){

        // verificar que no este acelerando
        if(!this.getSpeedUpState()){
          this.speedUpState = 1; // asignar 1 para acelerar
          return true;
        }
        else{
          if(!this.tourMode){
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'El vehiculo ya se encuentra acelerando'
            });
          }
          return false;
        }
      }
      else{
        // si se quiere dejar de acelerar
        if(this.getSpeedUpState()){
          this.speedUpState = 0; // asignar 0 para dejar de acelerar
          return true;
        }
        else{
          // si el vehiculo no se encuentra acelerando
          if(!this.tourMode){
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'El vehiculo no encuentra acelerando'
            });
          }
          return false;
        }
      }
    };

    this.getSpeedUpState = function () {
      return (this.speedUpState === 1); // true si es = a 1
    }
    // Fin acelerar


    // Metodos de meter cambio

    this.setTransmissionUp = function () {
      
      // Verificar estado del clutch
      // Si NO esta presionado
      if(!this.getClutchState()){
        if(!this.tourMode){
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'El clutch debe de estar presionado para meter cambio.'
          });
        }
        return false;
      }

      if(this.getTransmissionState() < 6){
        this.transmissionState++;
      }

      return true;
    }
    this.setTransmissionDown = function () {

      // Si NO esta presionado
      if(!this.getClutchState()){
        if(!this.tourMode){
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'El clutch debe de estar presionado para meter cambio.'
          });
        }
        return false;
      }

      // No se puede retroceder mas allá de reversa
      if(this.getTransmissionState() > -1){
        this.transmissionState--;
      }

      return true;
    }

    this.getTransmissionState = function () {
      return this.transmissionState;
    }

    // fin meter cambio

    // Metodos de encender y apagar
    this.setTurnOnOff = function(action){

      // Validaciones

      // Si se quiere encender el vehiculo
      if(action){

        // Si el estado del encendido del vehiculo es apagado (!) = negacion
        // si(no esta encendido)
        if(!this.getTurnOnOffState()){

          // Otras validaciones (que no este caminando, que no este en cambio, que tenga el freno de manos activo)

          // Verificar que el carro se encuentre en neutro
          if(this.getTransmissionState() != 0){
            if(!this.tourMode){
              Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'El vehiculo no encuentra desengranado o en neutro'
              });
            }
            return false;
          }

          // verificar el freno de mano
          if(!this.getHandBrakeState()){
            if(!this.tourMode){
              Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Por favor active el freno de mano para poder poder encender el vehiculo'
              });
            }
            return false;
          }


          // Demoramos 1 segundo simulando que esta encendiendo
          //setTimeout(() => {
            this.turnOn = true;
            /*Swal.fire(
              'Muy bien!',
              'El vehiculo ahora esta encendido!',
              'success'
            )*/
            return true;
          //}, 1000);
        }
        else{

          // Alertamos y decimos que ya esta encendido
          if(!this.tourMode){
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'El vehiculo ya se encuentra encendido'
            });
          }
          return false;
        }
      }
      else{
        // Si se quiere apagar

        // Verificar que el vehiculo este encendido
        if(this.getTurnOnOffState()){

          // Otras validaciones (freno de mano activo, no este en movimiento, que no se este acelerando)

          //setTimeout(() => {
            this.turnOn = false;
            /*Swal.fire(
              'Muy bien!',
              'El vehiculo ahora esta apagado!',
              'success'
            )*/
            return true;
          //}, 1000);
        }
        else{
          // Alertamos y decimos que ya esta encendido
          if(!this.tourMode){
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'El vehiculo no se encuentra encendido'
            });
          }
          return false;
        }
      }
    };

    this.getTurnOnOffState = function(){
      return this.turnOn;
    }
    // Fin encender apagar

    // Metodos de girar

    // Metodos calcular trayectorias o tours

    // ejecucion del tour

    // Presionar clutch
    this.pressClutch = function() {
      // Verificar que el clutch no este presionado
      if (this.getClutchState()) return;

      //setTimeout(() => {
        return this.setClutchState(true);;
      //}, 2000);
    };

    // Soltar el clutch
    this.dropClutch = function() {
      // Retornamos si el clutch no se encuentra presionado
      if (!this.getClutchState()) return;

      // Cambiamos el estado del clutch despues de 2 segundos (simular trayectoria del angulo)
      //setTimeout(() => {
        return this.setClutchState(false);
      //}, 2000);
    };

    // Getters - Settes

    // Me permite asignar un valor a el estado del clutch, true si se va a presionar el clutch, false si se va a levantar
    this.setClutchState = function(state) {
      // Si el tipo de dato de "state" no es booleano, retornar | y el estado del clutch es igual al estado enviado
      if (!typeof state == "boolean" || this.clutchOn == state) {
        if(!this.tourMode){
          Swal.fire(
            'Oops!',
            'El clutch ya se encuentra presionado.',
            'info'
          )
        }
        return false;
      }

      // Cambiar el estado del clutch segun el parametro enviado
      this.clutchOn = state;
      return true;
    };

    // Me permite obtener el estado del clutch, si es true es porque esta hundido o presionado, false es porque no
    this.getClutchState = function() {
      return this.clutchOn;
    };
  }
}
