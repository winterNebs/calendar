<script lang="ts">
    import { Type, type Entry } from './entry';
    import EntryComponent from './Entry.svelte';

    export let entries: Entry[];
    export let save: () => void;
    $: filtered = entries.filter((e) => e.type == Type.Todo);
</script>

<div class="entry-div">
    {#each filtered as entry}
        <EntryComponent {entry} on:save={save} />
    {/each}
</div>

<style>
    .entry-div {
        display: flex;
        flex-direction: column;
    }
</style>
