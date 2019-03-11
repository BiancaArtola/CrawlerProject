import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Table from "./Table";


const el= <button onClick={listener}>Click me</button>
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(el, wrapper) : null;


const App = () => (
  <DataProvider endpoint="api/scrap/" 
                render={data => <Table data={data} />} />
);

function listener(){
	const wrapper = document.getElementById("app");
    wrapper ? ReactDOM.render(<App />, wrapper) : null;
}
