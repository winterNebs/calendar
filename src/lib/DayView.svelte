<script lang="ts">
    import { Type, type Entry } from './entry';
    import EntryComponent from './Entry.svelte';

    export let entries: Entry[];
    export let save: () => void;
    let day: Date = new Date();
    type GridX = number;
    type GridY = number;
    type SpanX = number;
    type SpanY = number;
    let filtered: [Entry, GridX, GridY, SpanX, SpanY][];
    $: filtered = entries
        .filter((e) => e.due.toDateString() === day.toDateString() && e.type === Type.Event)
        .map((e) => [e, 0, 0, 0, 0]);
    let start = 0;
    let end = 24;
    // divide time in to discrete bins (ie 5 mins?)
    // 60 / 5 min = 12 bins
    let interval = 12;
    let bins = (end - start) * interval;

    //contiguous things are thingy... (use grid css?}

    function render() {
        // We want something like this:
        // |time|____________|
        // |----|------------|
        // |0:00|............|
        // |0:05|............|
        // |0:10|............|
        // |0:15|............|
        // ...
        // |1:00|............|
        // |2:00|............|
        // calculate maximum width (#columns)
        let columns = 1;
        // need to create a temporary grid
        let grid: Number[] = new Array(bins).fill(0);
        for (let i = 0; i < filtered.length; i++) {
            // get item
            let entry = filtered[i][0];
        }
    }
</script>

<div>
    <div class="card time-div">
        {#each [...Array(bins)] as _, i}
            <div class="time">
                {Math.floor(i / interval) + start}:{String(
                    (i % interval) * (60 / interval)
                ).padStart(2, '0')}
            </div>
        {/each}
        {#each filtered as [entry, gridx, gridy, spanx, spany]}
            <div class="entry-pos">
                <EntryComponent {entry} on:save={save} />
            </div>
        {/each}
    </div>
</div>

<style>
    .entry-pos {
        left: 5rem;
        background-color: #ddd;
    }
    .time {
        display: inline-block;
        margin: 0.25rem;
        padding: 0.5rem;
        text-align: left;
        max-height: calc(100% / 24);
    }
    .time-div {
        display: grid;
        justify-items: left;
    }
</style>
