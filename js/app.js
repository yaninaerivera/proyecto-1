
document.getElementById("alertPassword").addEventListener("load", loadAlert);

function loadAlert(){
    document.getElementById("alertPassword").style.display="none";
}


function cambiarAEstiloNegro(){
    document.getElementById('estilos').href = 'css/blackstyle.css';
    
}

function cambiarAEstiloBlanco(){
    document.getElementById('estilos').href = 'css/whitestyle.css';

}

document.getElementById("botonWhite").onclick = function(){
    cambiarAEstiloBlanco();
}


document.getElementById("botonBlack").onclick = function(){
    cambiarAEstiloNegro();
}

function mostrarAlert() {
    var alertMensaje = document.getElementById("alertPassword");
    if(alertMensaje.style.display == "none") {
        alertMensaje.style.display = "block";
        
    }
    else {
        alertMensaje.style.display = "none";
    }

}

function ocultarAlert() {
    var alertMensaje = document.getElementById("alertPassword");
    if(alertMensaje.style.display == "block") {
        alertMensaje.style.display = "none";
    }
    else {
        alertMensaje.style.display = "none";
    }

}

function mostrarContrasenia(){
    var passwordType = document.getElementById("inputPassword");
    if(passwordType.type == "password"){
        passwordType.type = "text";
    }else{
        passwordType.type = "password";
    }
}

function analizarContrasenia(){
    
    var password = document.getElementById('inputPassword');
    var error = document.getElementById('error');

    if(password.value === null || password.value === '' ){
        error.innerHTML = ("La contrasenia ingresada es vacia");
        mostrarAlert();
    }
    else{
        error.innerHTML = (" se ha ingresado una contrasenia valida ");
        ocultarAlert();
       analizarSecuencia();
    }
    
    return false;
}


function esNumero(caracter){
    var esNum=false;
    var codCaracter=caracter.charCodeAt();

    if(codCaracter >= 48 && codCaracter <=57)
        esNum=true;

    return esNum;
}

function analizarSecuencia(){
    var secuenciaArmada=armarEstructuraCadena();
    verificarSeguridadPasword(secuenciaArmada);
    //contarNumeros(secuenciaArmada);
    //contarLetras(secuenciaArmada);
    //contarCaracteresEspeciales(secuenciaArmada);
}
function armarEstructuraCadena(){

     var cadenaIngresada= document.getElementById("inputPassword").value;
     var caracter,secuencia=[];
     var i=0; 
    
     while (i < cadenaIngresada.length){
         caracter=cadenaIngresada.charAt(i);
         secuencia.push(caracter);         
         i++;
     }
     
     return secuencia;
     
 }
function contarNumeros(cadenaIngresada){

    var contAparicionesNumeros=0;
    var i=0; 
    //analizarPass.innerHTML=(cadenaIngresada.join(" : "));
    
    while (i < cadenaIngresada.length){
         if(esNumero(cadenaIngresada[i]))
            contAparicionesNumeros++;
        
        i++;
    }
    
    analizarPass.innerHTML=("La cantidad de numerso de la pass es " +contAparicionesNumeros);

}



function contarLetras(cadenaIngresada){
    var contAparicionesLetras=0;
    var i=0; 
    
    while (i < cadenaIngresada.length){
         if(esLetra(cadenaIngresada[i]))
            contAparicionesLetras++;
        
        i++;
    }
    analizarPass.innerHTML=("La cantidad de letras de la pass es " +contAparicionesLetras);

}


function verificarSeguridadPasword(secuenciaArmada){
    var i=0,cantIguales=0,cantConsecutivos=0,cantDistintos=0;
    var cantLetras=0,cantNum=0,cantCaracteresEspeciales=0;
    var cantLetrasMayusculas=0, cantLetrasMinusculas=0;
    var cantCaracteres=secuenciaArmada.length;
    while( i < cantCaracteres -1){
        if(sonIguales(secuenciaArmada[i],secuenciaArmada[i+1])){
            cantIguales++;
        }
        else{
            if(sonConsecutivos(secuenciaArmada[i],secuenciaArmada[i+1])){
                console.log("Los elementos " + secuenciaArmada[i] + secuenciaArmada[i+1]+ " son consecutivos");
                cantConsecutivos++;
            }
            else{
                //son distintos ??? NO SE SI DEBERIA CONTARLO
                cantDistintos++;
                console.log("Los elementos " + secuenciaArmada[i] + secuenciaArmada[i+1]+ " son distintos");
            }

        }
        if(esLetra(secuenciaArmada[i])){
            if(esLetraMayuscula(secuenciaArmada[i]))
                cantLetrasMayusculas++;
            else
                cantLetrasMinusculas++;
            cantLetras++;
        }
        else{
            if(esNumero(secuenciaArmada[i])){
                cantNum++;
            }
            else
                cantCaracteresEspeciales++;
        }
        i++;
    }
    //analizar el ultimo elemento del arreglo
    if(i==cantCaracteres-1){ //TENGFO QUE HACER EL IF ???
        if(esLetra(secuenciaArmada[i])){
            if(esLetraMayuscula(secuenciaArmada[i]))
                cantLetrasMayusculas++;
            else
                cantLetrasMinusculas++;
            cantLetras++;
        }
        else{
            if(esNumero(secuenciaArmada[i])){
                cantNum++;
            }
            else
                cantCaracteresEspeciales++;
        }

    }

    analizarUnTipoSecuencia(cantNum,cantLetras,cantCaracteres);
    console.log("La cantidad de numeros es "+ cantNum );
    console.log("La cantidad de letras es "+ cantLetras );
    console.log("La cantidad de letras MAYUS es "+ cantLetrasMayusculas );
    console.log("La cantidad de letras MINUS es "+ cantLetrasMinusculas );
    console.log("La cantidad de especiales es "+ cantCaracteresEspeciales );
    console.log("La cantidad de distintos es "+ cantDistintos );
    console.log("La cantidad de iguales es "+ cantIguales );
    console.log("La cantidad de consecutivos es "+ cantConsecutivos );
}

function sonIguales(elem1,elem2){
    var iguales=false;
    if(elem1 == elem2)
        iguales=true;

    return iguales;
}

function sonConsecutivos(elem1,elem2){
    var consecutivos=false;
    
    if( esNumero(elem1) && esNumero(elem2)){
        console.log("Los elementos " + elem1+ elem2 + " son numeros consecutivos??");
        if(consecutivosNumericos(elem1,elem2))
        { 
            console.log("Los elementos SIIII " + elem1+ elem2 + " son numeros consecutivos");
            consecutivos=true;
        }
    }
    else{
        if(esLetra(elem1) && esLetra(elem2))
            if(consecutivosLetras(elem1,elem2)){
                console.log("Los elementos " + elem1+ elem2 + " son letras consecutivas??");
            
                consecutivos=true;
            }
        
    }

    return consecutivos;

}

function consecutivosNumericos(elem1,elem2){
    var esConsecutivo=false;
    if( elem1 !=  9){
        console.log("Los elementos " + elem1 +""+elem2 + "son consecutivos??? y elem1 es != 9");
        if(elem1.charCodeAt() + 1 == elem2.charCodeAt())
            esConsecutivo=true;
    }
    return esConsecutivo;
}

function consecutivosLetras(elem1,elem2){

    var esConsecutivo=false;
        if( elem1.charCodeAt() + 1 == elem2.charCodeAt()){
            esConsecutivo=true;
        }
    return esConsecutivo;

}

function esLetra(caracter){
    var codCaracter=caracter.charCodeAt();
    var letra=false;
    if((codCaracter >= 65 && codCaracter <=90) || ( codCaracter >= 97 && codCaracter <=122))
    {
        console.log("El caracter es letra Mayus o Min " +caracter );
        letra=true;
    }

    return letra;

}

function esLetraMayuscula(caracter){
    var codCaracter=caracter.charCodeAt();
    var esMayus=false;

    if(codCaracter >= 65 && codCaracter <=90)
        esMayus=true;

   return esMayus;
}

function analizarUnTipoSecuencia(cantNum,cantLetras,cantCaracteres){
    if(cantLetras == cantCaracteres)
    {
        console.log("Solo se ingresaron letras");
    }
    else
    {
        if(cantNum == cantCaracteres)
            console.log("Solo se ingresaron numeros");

    }

}