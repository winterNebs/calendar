import { Entry } from "./entry";

export class Model {
	entries: Entry[] = [];
	title: HTMLInputElement;
	desc: HTMLTextAreaElement;
	date: HTMLInputElement;
	body: HTMLDivElement;
	public constructor() {
		this.title = <HTMLInputElement>document.getElementById("entry-modal-title");
		this.desc = <HTMLTextAreaElement>(
			document.getElementById("entry-modal-desc")
		);
		this.date = <HTMLInputElement>document.getElementById("entry-modal-due");
		(<HTMLButtonElement>document.getElementById("entry-modal-submit")).onclick =
			this.addItem.bind(this);
		this.body = <HTMLDivElement>document.getElementById("entry-body");
	}
	public addItem(): void {
		this.entries.push(
			new Entry(
				this.title.value,
				this.desc.value,
				this.date.valueAsDate || new Date()
			)
		);
		this.title.value = "";
		this.desc.value = "";
		this.date.value = "";
		this.save();
		this.update();
	}
	public save(): void {
		localStorage.setItem("calendar", JSON.stringify(this.entries));
	}
	public load(): void {
		let storage = localStorage.getItem("calendar");
		if (storage) {
			this.entries = <Entry[]>JSON.parse(storage);
			this.entries = this.entries.map((e) => Entry.hydrate(e));
		}
		this.update();
	}
	public update(): void {
		console.log(this.entries);
		let temp = this.entries.map((e) => e.html);
		this.body.replaceChildren(...temp);
	}
}
