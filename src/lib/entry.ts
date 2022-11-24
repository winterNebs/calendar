export class Entry {
    title: string = '';
    desc: string = '';
    start?: Date;
    due: Date;
    done?: Date;
    status: Status = Status.New;
    category: string = '';
    effort: number = 0;
    type: Type;

    public constructor(
        title: string,
        desc: string,
        due: Date,
        status: Status = Status.New,
        category: string = '',
        effort: number = 0,
        type: Type = Type.Todo
    ) {
        this.title = title;
        this.desc = desc;
        this.due = due;
        this.status = status;
        this.category = category;
        this.effort = effort;
        this.type = type;
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
        return new Entry(
            entry.title,
            entry.desc,
            new Date(entry.due),
            entry.status,
            entry.category,
            entry.effort,
            entry.type
        );
    }
}
export enum Type {
    Todo,
    Event
}
export enum Status {
    New,
    InProgress,
    Completed,
    OnHold,
    Cancelled
}

// todo item:
// Category
// Dateless?
// order?
// - Store effort ? (maybe we can calculate it from start -due or sometihng ? )
// Do we want a visual taskboard?
//
// Entry:
// def important we want like dates start / end for work etc. (reoccuring? )
//
//
// Store everything as an entry but with type for entry / todo?
//
//
