/**
 * Clase carro
 */
class Car {
  // Declaracion de variables y constructor de la clase
  constructor() {
    //Estados del carro
    this.isRunning = false; // Saber si el carro esta en movimiento
    this.speedUpState = 0; // 0 no acelera, 1 acelerando
    this.turnOn = false; // true carro encendido, false carro apagado
    this.handBrakeOn = true; // freno de mano activado = true, inactivo = false
    this.clutchOn = false; // Embrague. Presionado = true, no presionado = false
    this.breakOn = false; // el freno del carro. true si se encuentra presionado, false si no
    this.transmissionState = 0; // 0 Neutro, 1 primera, 2 segunda... etc, -1 reversa
    this.currentSpeed = 0; // Velocidad actual del vehiculo
    this.diretionalState = 0; // o apagado, 1 left, 2 right, 3 leftRight

    // datos
    this.tours = []; // Recorridos del vehiculo

    // Metodos //

    // Metodos de frenado

    // acelerar

    this.breakOn = function() {
      if (this.breakOn()) return;
    };

    // Fin metodos de frenado

    // Metodos de acelerar

    // Metodos de meter cambio

    // Metodos de encender y apagar

    // Metodos de girar

    // Metodos calcular trayectorias o tours

    // ejecucion del tour

    // Presionar clutch
    this.pressClutch = function() {
      // Verificar que el clutch no este presionado
      if (this.getClutchState()) return;

      setTimeout(() => {
        this.setClutchState(true);
      }, 2000);
    };

    // Soltar el clutch
    this.dropClutch = function() {
      // Retornamos si el clutch no se encuentra presionado
      if (!this.getClutchState()) return;

      // Cambiamos el estado del clutch despues de 2 segundos (simular trayectoria del angulo)
      setTimeout(() => {
        this.setClutchState(false);
      }, 2000);
    };

    // Getters - Settes

    // Me permite asignar un valor a el estado del clutch, true si se va a presionar el clutch, false si se va a levantar
    this.setClutchState = function(state) {
      // Si el tipo de dato de "state" no es booleano, retornar | y el estado del clutch es igual al estado enviado
      if (!typeof state == "boolean" || this.clutchOn == state) {
        alert("El clutch ya se encuentra presionado.");
        return;
      }

      // Cambiar el estado del clutch segun el parametro enviado
      this.clutchOn = state;
    };

    // Me permite obtener el estado del clutch, si es true es porque esta hundido o presionado, false es porque no
    this.getClutchState = function() {
      return this.clutchOn;
    };
  }
}
