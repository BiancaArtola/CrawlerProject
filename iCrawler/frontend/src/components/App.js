import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import RentalPage from "./RentalPage";
import WaitPage from "./WaitPage";

const botonBuscar = <a class="btn btn-primary btn-xl text-uppercase js-scroll-trigger" onClick={obtenerInformacion}>Buscar</a>
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(botonBuscar, wrapper) : null;

let urlParairnos = "";
let urlRentalugar = "";

const urlBaseParaIrnos = "https://www.parairnos.com/alquileres-en-";
const urlBaseRental = "http://www.rentalugar.com/alquileres-en-la-costa/";

function obtenerInformacion(){
	var ciudad = document.getElementById('ciudad').value;
	var llegada = document.getElementById('llegada').value;
	var salida = document.getElementById('salida').value;
	var cantPersonas = document.getElementById('cantPersonas').value;

	var validaFecha = chequeoFechas(llegada, salida);

	var hayPersonas = (cantPersonas!= "");

	if (validaFecha == 0 && hayPersonas){
		urlParairnos = armarUrlSinFechaParaIrnos(ciudad, cantPersonas);
		urlRentalugar = armarUrlSinFechaRental(ciudad, cantPersonas);
	}
	else if (validaFecha == 0 && !hayPersonas){
		urlParairnos = armarUrlParaIrnosBasica(ciudad);
		urlRentalugar = armarUrlRentalBasica(ciudad);
	}
	else if (validaFecha == 2) {
		var llegadaPI = rearmarFecha(llegada);
		var salidaPI = rearmarFecha(salida);

		if (hayPersonas){
		 	urlParairnos = armarUrlParaIrnosCompleta(ciudad, cantPersonas, llegadaPI, salidaPI);
			urlRentalugar = armarUrlRentalCompleta(ciudad, cantPersonas, llegada, salida);	
		}
		else {
			urlParairnos = armarUrlParaIrnosConFechaSinPersonas(ciudad, llegadaPI, salidaPI);
			urlRentalugar = armarUrlRentalConFechaSinPersonas(ciudad, llegada, salida);
		}
 	}
 	else{
 		alert("Debe ingresar correctamente los datos");
 		return ;
 	}

	const wrapper = document.getElementById("ppal");
	wrapper ? ReactDOM.render(<App />, wrapper) : null;	
}

function armarUrlParaIrnosConFechaSinPersonas(ciudad, llegada, salida){
	var urlConCiudad= urlBaseParaIrnos.concat(ciudad);
	var urlFinal = urlConCiudad+"-del-"+llegada+"-al-"+salida;
	return urlFinal;
}

function armarUrlRentalConFechaSinPersonas(ciudad, llegada, salida){
	var urlConCiudad = urlBaseRental.concat(ciudad);
	if (ciudad == "monte-hermoso")
		urlRentalugar = urlRentalugar.concat("-buenos-aires");
	var urlFecha = urlConCiudad+"/?&from="+llegada+"&to="+salida;
	return urlFecha;
}

function armarUrlParaIrnosBasica(ciudad){
	return urlBaseParaIrnos.concat(ciudad);
}

function armarUrlRentalBasica(ciudad){
	return urlBaseRental.concat(ciudad);
}

function armarUrlSinFechaParaIrnos(ciudad, cantPersonas){
	var urlConCiudad= urlBaseParaIrnos.concat(ciudad);
	var urlFinal= urlConCiudad+"-para-"+cantPersonas+"-personas";
	return urlFinal;
}

function armarUrlSinFechaRental(ciudad, cantPersonas){
	var urlConCiudad = urlBaseRental.concat(ciudad);
	if (ciudad == "monte-hermoso")
		urlRentalugar = urlRentalugar.concat("-buenos-aires");
	var urlFinal = urlConCiudad+"/?capacidad_hasta="+armarArregloCapacidad(cantPersonas);
	return urlFinal;
}

function chequeoFechas(llegada, salida){
	if (llegada == "" && salida == "")
		return 0;
	else if ((llegada == "" && salida != "") || (llegada != "" && salida == ""))
		return 1	

	var validaLlegada = esAnteriorAHoy(llegada);
	if (validaLlegada == 2){
		var validaSalida = esAnteriorAHoy(salida);	
		if (validaSalida == 2)
			return compararLlegadaySalida(llegada, salida);
	}
	return 1;		
}

function compararLlegadaySalida(llegada, salida){
	var fechaLlegada = new Date(llegada);

	var AnoLlegada = fechaLlegada.getFullYear();
	var MesLlegada = fechaLlegada.getMonth();
	var DiaLlegada = fechaLlegada.getDate();

	var fechaSalida = new Date(salida);

	var AnoSalida= fechaSalida.getFullYear();
	var MesSalida = fechaSalida.getMonth();
	var DiaSalida = fechaSalida.getDate();

	if ((AnoSalida < AnoLlegada) || (AnoSalida == AnoLlegada && MesSalida < MesLlegada) || (AnoSalida == AnoLlegada && MesSalida == MesLlegada && DiaSalida < DiaLlegada)){
	    alert ("La fecha de salida no debe ser menor que la fecha de ingreso. ");
	    return 1;
	}
	else 
		return 2;
}

function esAnteriorAHoy(fecha){
	var date = new Date(fecha);

	var AnoFecha = date.getFullYear();
	var MesFecha = date.getMonth();
	var DiaFecha = date.getDate();

	var Hoy = new Date();
	 
	var AnoHoy = Hoy.getFullYear();
	var MesHoy = Hoy.getMonth();
	var DiaHoy = Hoy.getDate();

	if ((AnoFecha < AnoHoy) || (AnoFecha == AnoHoy && MesFecha < MesHoy) || (AnoFecha == AnoHoy && MesFecha == MesHoy && DiaFecha < DiaHoy)){
	    alert ("La fecha introducida es anterior a Hoy");
	    return 1;
	}
	else 
		return 2;
}

function rearmarFecha(fecha){
	var date = new Date(fecha);
	var year, month, day;

	if ( !!date.valueOf() ) { // Valid date
	    year = date.getFullYear();
	    month = date.getMonth()+1;
	    day = date.getDate()+1;
	}

	var fecha = day+"-"+month+"-"+year+"";
	return fecha
}


function armarUrlParaIrnosCompleta(ciudad, cantPersonas, llegada, salida){
	var urlConCiudad= urlBaseParaIrnos.concat(ciudad);
	var urlCiudadPersonas= urlConCiudad+"-para-"+cantPersonas+"-personas-";
	var urlFinal = urlCiudadPersonas+"del-"+llegada+"-al-"+salida;
	return urlFinal;
}

function armarUrlRentalCompleta(ciudad, cantPersonas, llegada, salida){
	var urlConCiudad = urlBaseRental.concat(ciudad);
	if (ciudad == "monte-hermoso")
		urlRentalugar = urlRentalugar.concat("-buenos-aires");
	var urlCapacidad = urlConCiudad+"/?capacidad_hasta="+armarArregloCapacidad(cantPersonas);
	var urlFecha = urlCapacidad+"&from="+llegada+"&to="+salida;
	return urlFecha;
}

function armarArregloCapacidad(cantPersonas){
	var numeroPrincipal = [262,261,260,259,258,257,256,255,254,253,252,251,250,249,248];
	var stringCapacidad = "";
	for (var i=cantPersonas-1; i<15; i++)
		stringCapacidad= stringCapacidad+""+numeroPrincipal[i]+",";

	//Elimino ultimo elemento del string porque es una coma
	stringCapacidad = stringCapacidad.slice(0, -1);
	return stringCapacidad;
}

const App = () => (

  <DataProvider endpoint="api/scrap/" 
                render={data => <RentalPage data={data} />}
                render2={data2 => <WaitPage data2={data2} />} 
                urlParairnosDP= {urlParairnos} 
                urlRentalDP= {urlRentalugar} />
);

