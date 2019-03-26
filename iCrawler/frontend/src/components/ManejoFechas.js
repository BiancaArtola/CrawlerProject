import React from "react";
import ReactDOM from "react-dom";
import swal from 'sweetalert';

export function chequeoFechas(llegada, salida){
	if (llegada == "" && salida == "")
		return 0;
	else if ((llegada == "" && salida != "") || (llegada != "" && salida == "")){
		swal ( "Error" ,  "Debe completar tanto la fecha de llegada como la fecha de salida." ,  "error" );
		return 1	
	}
	return compararLlegadaySalida(llegada, salida);		
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
	    swal ( "Error" ,  "La fecha de salida no debe ser menor que la fecha de ingreso. " ,  "error" );
	    return 1;
	}
	else 
		return 2;
}

export function armarFechaHoy() {
	var Hoy = new Date();

	var AnoHoy = Hoy.getFullYear();
	var MesHoy = Hoy.getMonth()+1;
	var DiaHoy = Hoy.getDate();

	if (MesHoy.toString().length == 1)
		MesHoy = '0'+MesHoy;

	return AnoHoy+'-'+MesHoy+'-'+DiaHoy;
}

export function rearmarFecha(fecha){ //Cambia del formato de fecha anio/mes/dia --> dia/mes/anio
	var date = new Date(fecha);
	var year, month, day;

	if ( !!date.valueOf() ) { 
	    year = date.getFullYear();
	    month = date.getMonth()+1;
	    day = date.getDate()+1;
	}

	var fecha = day+"-"+month+"-"+year+"";
	return fecha
}
