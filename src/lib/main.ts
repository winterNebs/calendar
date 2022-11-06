import { Model } from "./model";
import "./style.css";
let model: Model;
console.log("main loaded");
window.onload = () => {
	model = new Model();
	model.load();
	console.log("model loaded");
};
