export class Entry {
	title: string = "";
	desc: string = "";
	start?: Date;
	due: Date;
	done?: Date;
	status: Status = Status.New;
	public constructor(title: string, desc: string, due: Date, status: Status= Status.New) {
		this.title = title;
		this.desc = desc;
		this.due = due;
        this.status = status;

	}
	public changeStatus(status: Status): void {
		switch (status) {
			case Status.Completed:
				this.done = new Date();
				break;
		}
		this.status = status;
	}
	public static hydrate(entry: Entry): Entry {
		return new Entry(entry.title, entry.desc, new Date(entry.due), entry.status);
	}
}
export enum Status {
	New,
	InProgress,
	Completed,
	OnHold,
	Cancelled,
}
