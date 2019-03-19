import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import RentalPage from "./RentalPage";
import WaitPage from "./WaitPage";
import {armarUrlSinFechaParaIrnos, armarUrlParaIrnosBasica, armarUrlParaIrnosCompleta, armarUrlParaIrnosConFechaSinPersonas} from "./ParaIrnosUrl";
import {armarUrlRentalBasica, armarUrlSinFechaRental, armarUrlRentalCompleta, armarUrlRentalConFechaSinPersonas} from './RentaLugarUrl';


const botonBuscar = <a class="btn btn-primary btn-xl text-uppercase js-scroll-trigger" onClick={obtenerInformacion}>Buscar</a>
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(botonBuscar, wrapper) : null;

let urlParairnos = "";
let urlRentalugar = "";

const urlBaseParaIrnos = "https://www.parairnos.com/alquileres-en-";
const urlBaseRental = "http://www.rentalugar.com/alquileres-en-la-costa/";
const mapeoClima = new Map();


var ciudad = "";
var llegada = "";
var salida = "";
var cantPersonas = "";
var ciudadConEspacios ="";

export{ciudadConEspacios, llegada, salida, cantPersonas, mapeoClima};

export default function obtenerInformacion(){
	ciudad = document.getElementById('ciudad').value;
	llegada = document.getElementById('llegada').value;
	salida = document.getElementById('salida').value;
	cantPersonas = document.getElementById('cantPersonas').value;

	replaceCiudad();
	var validaFecha = chequeoFechas();

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

 	cargarArreglo();

	const wrapper = document.getElementById("ppal");
	wrapper ? ReactDOM.render(<App />, wrapper) : null;	
}

function replaceCiudad(){
	ciudadConEspacios = ciudad.replace(/-/g,' ');
	ciudadConEspacios = ciudadConEspacios.replace(/\b\w/g, l => l.toUpperCase());
}

function chequeoFechas(){
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

function compararLlegadaySalida(){
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



function cargarArreglo(){
 	mapeoClima.set("Mar Del Plata", "https://forecast7.com/en/n38d01n57d54/mar-del-plata/");
 	mapeoClima.set("Monte Hermoso", "https://forecast7.com/en/n38d99n61d29/monte-hermoso/");
 	mapeoClima.set("Pinamar", "https://forecast7.com/en/n37d11n56d86/pinamar/");
 	mapeoClima.set("Miramar", "https://forecast7.com/en/n38d27n57d84/miramar/");
 	mapeoClima.set("Mar De Ajo", "https://forecast7.com/en/n36d72n56d68/mar-de-ajo/");
 	mapeoClima.set("Villa Gesell", "https://forecast7.com/en/n37d26n56d97/villa-gesell/");
 	mapeoClima.set("Mar De Las Pampas", "https://forecast7.com/en/n37d33n57d02/mar-de-las-pampas/");
}

const App = () => (
  <DataProvider endpoint="api/scrap/" 
                render={data => <RentalPage data={data} />}
                render2={data2 => <WaitPage data2={data2} />} 
                urlParairnosDP= {urlParairnos} 
                urlRentalDP= {urlRentalugar} />
);

