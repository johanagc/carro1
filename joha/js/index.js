var swHideLoading = false;
var car;
var intervalDirectionalRight = null;
var intervalDirectionalLeft = null;
var intervalDirectionalLeftRight = null;

$(document).ready(function(e){
    
    init();
    
    showLoading("Inicializando... por favor espere.")

    /*
            // Ejemplo de funcionamiento de clutch del carro
            // Verifica el estado inmediatamente se presiona el cluch, pero como el clutch se tarda 2 seg para activarse
            // la siguiente instruccion alert "alert(carro.getClutchState());" retorna false, pero si verificamos 3
            // segundos despues veremos que el alert nos data true ya que en ese lapso de tiempo el clutch ta esta activo

            var carro = new Car("Renault");
            carro.pressClutch();
            alert(carro.getClutchState());
            setTimeout(() => {
                alert(carro.getClutchState());
            }, 3000);

        */

    
    
    $("#btnEncenderApagar").click(function(e){
        
        //e.preventDefault();
        /*if($(this).attr("class").includes("active")){
            alert("El carro esta encendido");
        }
        else{
            alert("El carro esta apagado");
        }*/

        var boton = this;
        // Activar o inactivar el boton
        $(boton).toggleClass("active");

        /**
         *  
         * this es el contexto o el control como tal, e este caso es la etiqueta <a></a> que contiene el boton
         * 
         * $(this).attr("class") devuelve cadena de texto con el valor del atributo Class del control
         * btn btnEncender button active
         * 
         * Es lo mismo
         * $("#btnEncenderApagar") == document.getElementById("btnEncenderApagar")
         * 
         */
        let claseDelBoton = $(boton).attr("class");

        //Verificar si esta activo o no
        /**
         * Includes busca en la cadena de texto que contiene claseDelBoton la palabra "active", si la encuentra devuelve true, si no la encuentra devuelve false
         */
        if(claseDelBoton.includes("active")){
            if(!car.setTurnOnOff(true)){
                e.preventDefault();
                return false;
            }
        }
        else{
            // intentar apagar el vehiculo
            if(!car.setTurnOnOff(false)){
                e.preventDefault();
                return false;
            }
        }

        return false;
    });

    $("#btnAcelerar").click(function(e){

        // Poner boton presionado
        $(this).toggleClass("active");

        if($(this).attr("class").includes("active")){
            // Si no se puede acelerar quitar el boton presionado
            if(!car.setSpeedUp(true))
                $(this).toggleClass("active");
        }
        else{
            // Si no se puede acelerar quitar el boton presionado
            if(!car.setSpeedUp(false))
                $(this).toggleClass("active");
        }
        

    });

    $("#btnFrenar").click(function(e){

        // Poner boton presionado
        $(this).toggleClass("active");
        
        if($(this).attr("class").includes("active")){
            // Si no se puede frenar quitar el boton presionado
            if(!car.setBrakeOnOff(true))
                $(this).toggleClass("active");
        }
        else{
             // Si no se puede frenar quitar el boton presionado
            if(!car.setBrakeOnOff(false))
                $(this).toggleClass("active");
        }
       

    });


    $("#btnClutch").click(function(e){

        // Poner boton presionado
        $(this).toggleClass("active");

        // verificar si se esta presionando o quitando el clutch
        if($(this).attr("class").includes("active")){
            if(!car.pressClutch())
                $(this).toggleClass("active");
        }
        else{
            if(!car.dropClutch())
                $(this).toggleClass("active");
        }
    });

    // caja de cambios
    $("#btnGearBoxUp").click(function(e){
        // Poner boton presionado
        $(this).toggleClass("active");

        // Intentar subir cambio
        car.setTransmissionUp(true);
        $("#currentGearBox").html(car.getTransmissionState())
        setTimeout(() => {
            $(this).toggleClass("active");    
        }, 150);
    });

    // caja de cambios
    $("#btnGearBoxDown").click(function(e){
        // Poner boton presionado
        $(this).toggleClass("active");

        // Intentar bajar cambio
        car.setTransmissionDown(true);
        $("#currentGearBox").html(car.getTransmissionState())
        setTimeout(() => {
            $(this).toggleClass("active");    
        }, 150);
    });

    $("#btnHandBrake").click(function(e){

        // activar o inactivar freno de mano
        if(!$(this).attr("class").includes("active")){
            if(!car.setHandBrakeOnOff(true))
                $(this).toggleClass("active");    
        }
        else{
            if(!car.setHandBrakeOnOff(false))
                $(this).toggleClass("active");    
        }
    });

    $("#btnLeftDirectional").click(function(e){

        if(car.setDirectionalLeftOnOff()){
            $(this).toggleClass("active");
            if(intervalDirectionalLeft != null){
                clearInterval(intervalDirectionalLeft);
                intervalDirectionalLeft = null;
                $(this).removeClass("active");
            }
            else{
                intervalDirectionalLeft = setButtonIntermittent(this);
            }
        }
    });

    $("#btnRightDirectional").click(function(e){
        
        if(car.setDirectionalRightOnOff()){
            $(this).toggleClass("active");
            if(intervalDirectionalRight != null){
                clearInterval(intervalDirectionalRight);
                intervalDirectionalRight = null;
                $(this).removeClass("active");
            }
            else{
                intervalDirectionalRight = setButtonIntermittent(this);
            }
        }
    });

    $("#btnTurnLeft").click(function(e){

        $(this).toggleClass("active");    
        // realizar giro izquierda
        if($(this).attr("class").includes("active")){
            if(!car.setTurnLeftRight(1))
                $(this).toggleClass("active");    
        }
        else{
            if(!car.setTurnLeftRight(0))
                $(this).toggleClass("active");    
        }
    });

    $("#btnTurnRight").click(function(e){

        $(this).toggleClass("active");    
        // realizar giro derecho
        if($(this).attr("class").includes("active")){
            if(!car.setTurnLeftRight(2))
                $(this).toggleClass("active");    
        }
        else{
            if(!car.setTurnLeftRight(0))
                $(this).toggleClass("active");    
        }
    });

    $("#btnStationary").click(function(e){

        // encender direccionales
        $(this).toggleClass("active");
        if(intervalDirectionalLeftRight != null){
            clearInterval(intervalDirectionalLeftRight);
            intervalDirectionalLeftRight = null;
            $(this).removeClass("active");
        }
        else{
            intervalDirectionalLeftRight = setButtonIntermittent(this);
        }
        
        if($(this).attr("class").includes("active")){
            car.setDirectionalRightLeft(true);
        }
        else{
            car.setDirectionalRightLeft(false)   
        }
    });
    


    //


    hideLoading();
});


function init(){
    car = new Car("Renault");

    if(car.getHandBrakeState());
        $("#btnHandBrake").toggleClass("active");
}

function setButtonIntermittent(element){

    return setInterval(() => {
        $(element).toggleClass("active");
    }, 500);

}

function hideLoading(){
    swHideLoading = true;
    swal.close();

    // para la proxima vez que se ejecute el loading
    swHideLoading = false;
}

function showLoading(text){
    let timerInterval
    Swal.fire({
    title: '',
    html: text,
    timer: 30000,
    onBeforeOpen: () => {
        Swal.showLoading()
    },
    onClose: () => {
        if(!swHideLoading){
            showLoading(text);
        }
    }
    });
}