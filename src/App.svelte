<script lang="ts">
    import { Entry, Status } from './lib/entry';
    import EntryList from './lib/EntryList.svelte';
    import DayView from './lib/DayView.svelte';

    enum Mode {
        List,
        Day,
        Week,
        Month
    }
    let mode: Mode = Mode.List;
    let entries: Entry[] = [];
    let title: string = '';
    let desc: string = '';
    let date: HTMLInputElement;
    function addItem(): void {
        entries.push(new Entry(title, desc, new Date(date.value)));
        entries.sort(sort);
        entries = entries;
        title = '';
        desc = '';
        date.value = '';
        save();
    }
    function save(): void {
        console.log(entries);
        entries.sort(sort);
        entries = entries;
        localStorage.setItem('calendar', JSON.stringify(entries));
    }
    function load(): void {
        let storage = localStorage.getItem('calendar');
        if (storage) {
            entries = <Entry[]>JSON.parse(storage);
            entries = entries.map((e) => Entry.hydrate(e));
            entries.sort(sort);
        }
    }
    function sort(a: Entry, b: Entry) {
        if (a.status == b.status) {
            return a.due.getTime() - b.due.getTime();
        }
        if (a.status == Status.Completed) {
            return 1;
        }
        return -1;
    }
    load();
</script>

<main>
    <nav id="nav">
        <button on:click={() => (mode = Mode.List)}>List View</button>
        <button on:click={() => (mode = Mode.Day)}>Day View</button>
    </nav>
    <div id="entry-modal">
        <input type="text" id="entry-modal-title" placeholder="Title" bind:value={title} />
        <textarea id="entry-modal-desc" placeholder="Description" bind:value={desc} />
        <input type="datetime-local" id="entry-modal-due" bind:this={date} />
        <button id="entry-modal-submit" on:click={addItem}>add</button>
    </div>
    <div id="entry-body">
        {#if mode === Mode.List}
            <EntryList {entries} {save} />
        {:else if mode === Mode.Day}
            <DayView {entries} {save} />
        {/if}
    </div>
</main>

<style>
    #entry-modal {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-left: 20vw;
        margin-right: 20vw;
    }
</style>
