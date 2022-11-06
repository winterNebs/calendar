<script lang="ts">
    import type { Entry } from './entry';
    import EntryComponent from './Entry.svelte';

    export let entries: Entry[];
    export let save: () => void;
</script>

<div class="entry-div">
    {#each entries as entry}
        <EntryComponent {entry} on:save={save} />
    {/each}
</div>

<style>
    .entry-div {
        display: flex;
        flex-direction: column;
    }
</style>
