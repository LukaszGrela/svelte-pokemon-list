<script>
  import { getPokemonList } from "../api";
  import PokemonListItem from "./PokemonListItem.svelte";
  import Spinner from "../Spinner/Spinner.svelte";

  export let page;
  export let pageSize;

  let loading = true;
  let results = [];
  let total;
  let offset;

  $: ((p, s) => {
    loading = true;
  })(page, pageSize);
  $: ((p, s) => {
    fetch(getPokemonList(p, s))
      .then(r => r.json())
      .then(data => {
        console.log(data);
        total = +data.count;
        results = data.results;
        offset = (p - 1) * s;
        loading = false;
      })
      .catch(e => {
        loading = false;
      });
  })(page, pageSize);
</script>

<style>
  .pokemon-list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
  }
  p.no-items {
    font-size: 3rem;
    opacity: 0.75;
    padding-top: 2rem;
  }
  .loading {
    display: flex;
    justify-items: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>

{#if !loading}
  {#if results.length > 0}
    <ul class="pokemon-list">
      {#each results as item, i}
        <PokemonListItem {item} i={i + offset + 1} />
      {/each}
    </ul>
  {:else}
    <p class="no-items">No Pokémons found :(</p>
  {/if}
{:else}
  <div class="loading">
    <Spinner ref="spinner" />
  </div>
{/if}
