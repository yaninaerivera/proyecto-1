imprimirPassGuardadas();

setEstiloGuardado();

function setEstiloGuardado(){

    var colorEstilo= localStorage.getItem('Estilo Boton');

    if(colorEstilo == null){
        cambiarAEstiloBlanco();
    }
    else{
        if(colorEstilo == "Black")
            cambiarAEstiloNegro();
        else
            cambiarAEstiloBlanco();

    }
    
}

function mostrarMensajePassVacia(){
   
   document.getElementById('mensajePasswordEmpty').style.opacity="1.0";
   document.getElementById('mensajePasswordEmpty').innerHTML= ("No se ha ingresado contraseña. Por favor, ingrese una contraseña");
}

function quitarMensajePassVacia(){

    document.getElementById('mensajePasswordEmpty').style.opacity="0.0";

    document.getElementById('mensajePasswordEmpty').innerHTML= ("No se ha ingresado contraseña.Por favor, vuelva a ingresar la contraseña");
   
}

function cambiarAEstiloNegro(){
    document.getElementById('estilos').href = 'css/blackstyle.css';
    guardarBotonEstilo("Black");
    
}

function cambiarAEstiloBlanco(){
    document.getElementById('estilos').href = 'css/whitestyle.css';
    guardarBotonEstilo("White");

}

function guardarBotonEstilo(color){

    const almacenamiento= localStorage.getItem('Estilo Boton');   

    if(almacenamiento == null){
        const estilo_saved=[];
    
        localStorage.setItem('Estilo Boton', color);
    }
    else{
        localStorage.removeItem('Estilo Boton');
        localStorage.setItem('Estilo Boton',color);
        
    }

}


document.getElementById("botonWhite").onclick = function(){
    cambiarAEstiloBlanco();
}


document.getElementById("botonBlack").onclick = function(){
    cambiarAEstiloNegro();
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
   
    

    if(password.value === null || password.value === '' ){
       
        limpiarVisualizacionAnalisisPassword();
        mostrarMensajePassVacia();
        
    }
    else{
        
        quitarMensajePassVacia();
        guardarPasswordsIngresadas(password.value);
        analizarSecuencia();
    }
    
    return false;
}

function limpiarVisualizacionAnalisisPassword(){

    document.getElementById("cantTotalCaracteres").innerHTML="";
    
    document.getElementById("cantEspeciales").innerHTML="";
    document.getElementById("cantConsecutivos").innerHTML="";
    document.getElementById("cantDistintos").innerHTML="";
    document.getElementById("cantIguales").innerHTML="";
        
    document.getElementById("cantLetras").innerHTML="";
    document.getElementById("cantLetrasMayus").innerHTML="";
    document.getElementById("cantLetrasMinus").innerHTML="";

    document.getElementById("cantNum").innerHTML="";

   
    document.getElementById("secTipoNums").innerHTML = ("");
    document.getElementById("secTipoLetras").innerHTML = ("");
    document.getElementById("secTipoEspeciales").innerHTML = ("");

    document.getElementById("seguridadPassword").innerHTML=("");

    
    
    document.getElementById("porcentajeEspeciales").style.width="0%";
    document.getElementById("porcentajeLetras").style.width="0%";       
    document.getElementById("porcentajeNums").style.width="0%";   
    
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
    var infoPasswordAnalizada=verificarSeguridadPasword(secuenciaArmada);
    mostrarInfoAnalisisPassword(infoPasswordAnalizada);
    
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

    var infoPassword={
        cantTotalCaracteres : 0,
        cantCaracteresEspeciales:0,
        cantConsecutivos:0,
        cantDistintos:0,
        cantIguales:0,
        
        cantLetras:0,
        cantLetrasMayusculas:0,
        cantLetrasMinusculas:0,

        cantNum:0,
    }


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
                
                cantConsecutivos++;
            }
            else{
                
                cantDistintos++;
                
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
    if(i==cantCaracteres-1){ 
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

    
    infoPassword.cantTotalCaracteres = cantCaracteres;
    infoPassword.cantCaracteresEspeciales= cantCaracteresEspeciales;
    infoPassword.cantConsecutivos= cantConsecutivos;
    infoPassword.cantDistintos= cantDistintos;
    infoPassword.cantIguales= cantIguales;
        
    infoPassword.cantLetras= cantLetras;
    infoPassword.cantLetrasMayusculas=cantLetrasMayusculas;
    infoPassword.cantLetrasMinusculas=cantLetrasMinusculas;

    infoPassword.cantNum=cantNum;

    return infoPassword;
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
        
        if(consecutivosNumericos(elem1,elem2))
        { 
            
            consecutivos=true;
        }
    }
    else{
        if(esLetra(elem1) && esLetra(elem2))
            if(consecutivosLetras(elem1,elem2)){

                consecutivos=true;
            }
        
    }

    return consecutivos;

}

function consecutivosNumericos(elem1,elem2){
    var esConsecutivo=false;
    if( elem1 !=  9){
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

function analizarUnTipoSecuencia(cantNum,cantLetras,cantEspeciales,cantCaracteres){

    var tipoSecuencia={
        tipoLetras : false,
        tipoNumeros:false,
        tipoEspeciales:false,
    }

    if(cantLetras == cantCaracteres)
    {
        tipoSecuencia.tipoLetras=true;
    }
    else
    {
        if(cantNum == cantCaracteres)
            tipoSecuencia.tipoNumeros=true;
        else
            if(cantEspeciales == cantCaracteres)
            tipoSecuencia.tipoEspeciales=true;
    }

    return tipoSecuencia;

}

function guardarPasswordsIngresadas(passwordNueva){
    
    const almacenamiento= localStorage.getItem('Passwords ingresadas');

    if(almacenamiento == null){
        const pass_ingresadas=[];
        pass_ingresadas.push(passwordNueva);
        localStorage.setItem('Passwords ingresadas', JSON.stringify( pass_ingresadas));
    }
    else{
        const pass_saved=JSON.parse(almacenamiento);
        if(pass_saved.length === 5){
            pass_saved.shift(); //eliminamos la primer pass guardada
        }
        
        pass_saved.push(passwordNueva);
        localStorage.removeItem('Passwords ingresadas');
        localStorage.setItem('Passwords ingresadas', JSON.stringify(pass_saved));
        
    }

    imprimirPassGuardadas();
   

}

function imprimirPassGuardadas(){
    const almacenamiento= localStorage.getItem('Passwords ingresadas');

    const pass_saved=JSON.parse(almacenamiento);
   
    if(pass_saved != null){
        chequearExistenciaPassGuardada(pass_saved,0,"primeraPass");
        chequearExistenciaPassGuardada(pass_saved,1,"segundaPass");
        chequearExistenciaPassGuardada(pass_saved,2,"terceraPass");
        chequearExistenciaPassGuardada(pass_saved,3,"cuartaPass");
        chequearExistenciaPassGuardada(pass_saved,4,"quintaPass");
    }
}

function chequearExistenciaPassGuardada(pass_saved,pos,elemDoc){
    if(pass_saved[pos] != null)
    document.getElementById(elemDoc).innerHTML=pass_saved[pos];
}

function mostrarInfoAnalisisPassword(infoPassword){

    mostrarCantidadesAnalisis(infoPassword);

    var tipoSecuencia=analizarUnTipoSecuencia(infoPassword.cantNum,infoPassword.cantLetras,
        infoPassword.cantCaracteresEspeciales,infoPassword.cantTotalCaracteres);

    mostrarInfoTipoSecuencia(tipoSecuencia);

    var porcentajes=calcularPorcentaje(infoPassword);
    mostrarPorcentaje(porcentajes);

    var escala=determinarSeguridadPassword(calculoSeguridadPassword(infoPassword));
    mostrarSeguridadPassword(escala);
    
}

function mostrarCantidadesAnalisis(infoPassword){

    document.getElementById("cantTotalCaracteres").innerHTML=infoPassword.cantTotalCaracteres;
    
    document.getElementById("cantEspeciales").innerHTML=infoPassword.cantCaracteresEspeciales;
    document.getElementById("cantConsecutivos").innerHTML=infoPassword.cantConsecutivos;
    document.getElementById("cantDistintos").innerHTML=infoPassword.cantDistintos;
    document.getElementById("cantIguales").innerHTML=infoPassword.cantIguales;
        
    document.getElementById("cantLetras").innerHTML=infoPassword.cantLetras;
    document.getElementById("cantLetrasMayus").innerHTML=infoPassword.cantLetrasMayusculas;
    document.getElementById("cantLetrasMinus").innerHTML=infoPassword.cantLetrasMinusculas;

    document.getElementById("cantNum").innerHTML=infoPassword.cantNum;
}

function mostrarInfoTipoSecuencia(tipoSecuencia){
    if(tipoSecuencia.tipoNumeros == true)
    document.getElementById("secTipoNums").innerHTML = ("Si");
    else
        document.getElementById("secTipoNums").innerHTML = ("No");
    if(tipoSecuencia.tipoLetras == true)
        document.getElementById("secTipoLetras").innerHTML = ("Si");
    else
        document.getElementById("secTipoLetras").innerHTML = ("No");
    if(tipoSecuencia.tipoEspeciales == true)
        document.getElementById("secTipoEspeciales").innerHTML = ("Si");
    else
        document.getElementById("secTipoEspeciales").innerHTML = ("No");
}

function calcularPorcentaje(infoPassword){

    var porcentajesPassword={
        porcLetras : 0,
        porcNumeros: 0,
        porcEspeciales: 0,
    }

    var cantNums=infoPassword.cantNum,
    cantLetras=infoPassword.cantLetras,
    cantEspeciales=infoPassword.cantCaracteresEspeciales,
    cantCaracteres=infoPassword.cantTotalCaracteres;
    
    porcentajesPassword.porcNumeros=porcentaje(cantNums,cantCaracteres);    
    porcentajesPassword.porcLetras=porcentaje(cantLetras,cantCaracteres);
    porcentajesPassword.porcEspeciales=porcentaje(cantEspeciales,cantCaracteres);

    return porcentajesPassword; 

}

function porcentaje(parcial,total){
     var porcentajeCompleto=(parcial*100)/total;
     
     return dejarDosDigitosDecimales(porcentajeCompleto);
}

function dejarDosDigitosDecimales(number){
    return (Math.round(number * 100)/100).toFixed(2);
}
function mostrarPorcentaje(porcentajes){
   
    document.getElementById("porcentajeEspeciales").innerHTML=(porcentajes.porcEspeciales+"%");
    document.getElementById("porcentajeEspeciales").style.width=porcentajes.porcEspeciales+"%";
    document.getElementById("porcentajeLetras").innerHTML=(porcentajes.porcLetras+"%");
    document.getElementById("porcentajeLetras").style.width=porcentajes.porcLetras+"%";       
    document.getElementById("porcentajeNums").innerHTML=(porcentajes.porcNumeros+"%");
    document.getElementById("porcentajeNums").style.width=porcentajes.porcNumeros+"%";                  
    
}

function calculoSeguridadPassword(infoPassword){

    var promedio=0;

     var cantTotalCaracteres=infoPassword.cantTotalCaracteres;
     
     promedio = promedio + cantTotalCaracteres*4;
     promedio = promedio + infoPassword.cantNum*4;
     promedio = promedio + infoPassword.cantCaracteresEspeciales*6;   

     promedio= promedio - (infoPassword.cantConsecutivos*2);
     promedio= promedio - (infoPassword.cantIguales*2);
       
     var tipoSecuencia=analizarUnTipoSecuencia(infoPassword.cantNum,infoPassword.cantLetras,
        infoPassword.cantCaracteresEspeciales,infoPassword.cantTotalCaracteres);
     
    if(tipoSecuencia.tipoLetras == true){
        promedio= promedio - infoPassword.cantLetras;
    }    
    if(tipoSecuencia.tipoNumeros == true){
        promedio= promedio - infoPassword.cantNum;
    }
    else{
        promedio= promedio + ( (cantTotalCaracteres - infoPassword.cantLetrasMayusculas)*2 );
        promedio= promedio + ( (cantTotalCaracteres - infoPassword.cantLetrasMinusculas)*2 );
     
    }

    return promedio;
     
}



function determinarSeguridadPassword(promedioPassword){

    var promedio= dejarDosDigitosDecimales(promedioPassword);
    var escalaItensidad="Muy débil";
    if(promedio >=0 && promedio <= 30){
        escalaItensidad="Muy débil";
    }
    else
    {
        if(promedio >30 && promedio <= 50){
            escalaItensidad="Débil";
        }
        else
        {
            if(promedio >50 && promedio <= 75){
                escalaItensidad="Fuerte";
            }
            else
                escalaItensidad="Muy fuerte";

        }
    }

    return escalaItensidad;

}

function mostrarSeguridadPassword(escalaItensidad){

    document.getElementById("seguridadPassword").innerHTML=escalaItensidad;

}


function mostrarAclaraciones(){
    document.getElementById('aclaraciones').innerHTML=
    "<p>"+
     "<ol>"+
        "<li>Los caracteres son los numeros, letras y simbolos ( ! #  %  & ; , .). Los simbolos son todo aquello "+
        "que no son numeros y no son letras. </li>"+
        "<li>La cantidad de caracteres se refiere a la longitud de la contraseña ingresada. </li>"+
        "<li> Los caraceteres especiales son aquellos que definimos previamente como simbolos.</li>"+
        "<li>La cantidad de iguales es la cantidad de veces que se repite un caracter de forma consecutiva.<br>"+
         " Por ejemplo si ingresamos la siguiente contraseña:<br>aaa  en este caso hay dos cantidades de iguales "+
          "porque entre el primer par de aa es una cantidad de iguales y en el segundo par hay otra cantidad de iguales."+
          " En total hay dos cantidades de iguales.</li>"+
        "<li>La cantidad de distintos son la cantidad de pares de caracteres que son diferentes entre si.</li>"+
        "<li>La cantidad de consecutivos son la cantidad de pares consecutivos. En el caso de los numeros, seria los numeros "+
        "consecutivos(no en orden) como por ejemplo 1234 son 3 pares de consecutivos pero 149 no son consecutivos. En el caso"+ 
        "de las letras, seria son letras en orden alfabetico pero teniendo en cuenta "+
        "abc son letras consecutivas pero aez no son consecutivas.</li>"+

    "</ol>"+
    "</p>";
  
}

mostrarAclaraciones();

