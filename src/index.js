import "./assets/css/index.css";

import { App } from "dhx-optimus";

import { CountriesGridView } from "./views/CountriesGridView";
import { SearchBox } from "./views/SearchBox";

export class MyApp extends App {
	init() {
		const countriesGridDiv = document.getElementById("countries-grid");
		
		this.show(countriesGridDiv, CountriesGridView);
		document.addEventListener("DOMContentLoaded", () => {
			new SearchBox("search-box");
		});
	}
}
