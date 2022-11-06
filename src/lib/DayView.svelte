<script lang="ts">
    import type { Entry } from './entry';
    import EntryComponent from './Entry.svelte';

    export let entries: Entry[];
    export let save: () => void;
    let day: Date = new Date();
    $: filtered = entries.filter((e) => e.due.toDateString() === day.toDateString());
    let w: number;
    let h: number;
    let entry_comps: [typeof EntryComponent, Entry, number][];
    $: entry_comps = filtered.map((e) => [EntryComponent, e, 0]);
    $: reposition(w, h);
    let start = 0;
    let end = 24;
    function reposition(w: number, h: number) {
        const total = end - start;
        for (let i = 0; i < entry_comps.length; i++) {
            let e = entry_comps[i][1];
            let hours = e.due.getHours();
            let mins = e.due.getMinutes();
            console.log(hours, mins);
            let p = hours + mins / 60;

            let pos = (p / total) * h;
            entry_comps[i][2] = pos;
            console.log(h, pos, p);
        }
    }
    // divide time in to discrete bins (ie 5 mins?)

    //contiguous things are thingy... (use grid css? flexbox?
</script>

<div>
    <div class="card time-div" bind:clientWidth={w} bind:clientHeight={h}>
        {#each [...Array(24)] as _, i}
            <div class="time">{i}:00</div>
        {/each}
        {#each entry_comps as [comp, entry, pos]}
            <div class="entry-pos" style:top="{pos}px">
                <svelte:component this={comp} {entry} on:save={save} />
            </div>
        {/each}
    </div>
</div>

<style>
    .entry-pos {
        position: absolute;
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
        display: flex;
        flex-direction: column;
        justify-items: left;
    }
</style>
