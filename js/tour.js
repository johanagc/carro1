class tour {

    constructor(_car){

        this.averageSpeed = 0; // Velocidad promedio
        this.time = 0; // tiempo del recorrido
        this.kmEnd = 20; // por defecto
        this.stops = 0; // por defecto
        this.stopsCount = 0; // contador de paradas
        this.stopTime = []; // Vector que contiene el tiempo de cada parada [tiempo0, tiempo1, tiempo2] en segundos
        this.stopKms = []; // saber a los cuantos kms de recorrido se hara cada parada [km0, km1, km2]
        this.turnLeft = 2; // por defecto 2 giros a la izquierda
        this.turnRight = 3; // por defecto 3 giros a la derecha
        this.turnLeftCount = 0; // nro de gitos a la izquierda
        this.turnRightCount = 0; // nro de giros a la derecha
        this.car = _car;
        this.dataInverval = null;
        

        /**
         * Obtener un numero de kilometos aleatorio de 0 a 5 kms
         * NOTA:    si se devuelven muchos kms el carro tardaria mucho en hacer el recorrido
         *          no es practico para el ejemplo o exposicion.
         */
        this.generateTravelDistance = function () {
            this.kmEnd = this.getRandom(5);
        }

        /**
         * Obtiene el numero aleatorio de paradas
         */
        this.generateStopNumber = function () {
            this.stops = this.getRandom(4);
        }
        
        /**
         * Genera numero de giros (izquierdos y derechos)
         */
        this.generateTurnLeftRight = function () {
            this.turnLeft = this.getRandom(3);
            this.turnRight = this.getRandom(3);
        }

        /** 
         * Genera el tiempo de cada parada
        */
        this.generateTimeByStop = function () {
            
            // Si no se han agrado paradas, salimos
            if(this.stops == 0)
                return;

            for(var i = 0; i < this.stops; i++){
                // Asignamos los tiempos de cada parada de hasta 5 seg
                this.stopTime[i] = this.getRandom(5);
            }

        }

        /** 
         * Genera a cuantos kms se hara cada parada
        */
       this.generateKmByStop = function () {
            
        // Si no se han agrado paradas, salimos
        if(this.stops == 0)
            return;

        for(var i = 0; i < this.stops; i++){
            // Asignamos a los kms de recorrido hacer cada parada
            this.stopKms[i] = this.getRandom(2);
        }

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

        /**
         * Inicializar el recorrido con datos aleatorios
         */
        this.initTour = function () {
            
            this.averageSpeed = 0; // Velocidad promedio
            this.time = 0; // tiempo del recorrido
            this.stopsCount = 0; // contador de paradas
            this.turnLeftCount = 0; // nro de gitos a la izquierda
            this.turnRightCount = 0; // nro de giros a la derecha

            this.generateTravelDistance();
            this.generateStopNumber();
            this.generateKmByStop();
            this.generateTurnLeftRight();
            this.generateTimeByStop();

        }



        this.setMsg = function (msg) {
            $("#" + this.car.tourMsg).html(msg);
        }

        this.startCalculeData = function () {
            
            this.dataInverval = setInterval(() => {
                
                // calcular las paradas y ejecutarlas en lo kilometros asignados
                if(this.car.getCurrentSpeed()){

                }

            }, 1000);

        }

        /**
         * Comenzar tours
         * Ejecutar uno a uno los tours configurados aleatoriamente.
         */
        this.startTour = function (car) {
            
            try {

                //Inicializar
                this.initTour();
                
                if(this.stops == 0)
                    return;

                if(this.stopTime.length == 0)
                    return;

                if(this.turnLeft == 0)
                    return;
                
                if(this.turnRight == 0)
                    return;
                    
                this.setMsg("Iniciando recorrido...");
                

                // El vehiculo cambia de estado a tour
                this.car.tourMode = true;
                setTimeout(() => {
                    // Encender
                    this.car.viewBtnEncenderApagarClick();  
                    setTimeout(() => {
                        // Presionar clutch
                        this.car.viewBtnClutchClick();    
                        setTimeout(() => {
                            // Presionar freno
                            this.car.viewBtnFrenarClick();    
                            setTimeout(() => {
                                // quitar freno de mano
                                this.car.viewBtnHandBrakeClick();    
                                setTimeout(() => {
                                    // poner primera
                                    this.car.viewBtnGearBoxUpClick();    
                                    setTimeout(() => {
                                        // Quitar freno de pie
                                        this.car.viewBtnFrenarClick(); 
                                        setTimeout(() => {
                                            // Acelerar
                                            this.car.viewBtnAcelerarClick();
                                            setTimeout(() => {
                                                // soltar clucth
                                                this.car.viewBtnClutchClick();
                                                
                                                this.setMsg("En curso...");
                                                // Activar kilometraje del carro mientras acelera y segun el cambio en el que se encuentre
                                                this.car.activeSpeedUpCalculate();



                                            }, 1000);     
                                        }, 1000);  
                                    }, 1000);
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1000);
                
            
                /*else{
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'No se ha podido encender el vehiculo.'
                        });
                }*/

            } catch (err) {
            }

            this.car.tourMode = false;
        }
    }
}