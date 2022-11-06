<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    import { Status, type Entry } from './entry';
    export let entry: Entry;
    const dispatch = createEventDispatcher();
    function compelete() {
        entry.changeStatus(Status.Completed);
        dispatch('save');
        entry = entry;
    }
</script>

<div class="card entry-item" class:completed={entry.status == Status.Completed}>
    <h2>{entry.title || '(empty)'}</h2>
    <p>{entry.desc}</p>
    <p>{entry.due.toLocaleString()}</p>
    <button on:click={compelete}> Done </button>
</div>

<style>
    .completed {
        text-decoration: line-through;
    }
    .entry-item {
        border-radius: 1rem;
        display: inline-block;
        width: 50vw;
    }
</style>
