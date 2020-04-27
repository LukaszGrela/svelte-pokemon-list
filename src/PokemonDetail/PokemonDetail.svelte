<script>
  import {
    getPokemonDetail,
    API_GET_SPRITE_FRONT,
    API_GET_SPRITE_BACK
  } from "../api";
  import { parseIdFromUrl } from "../utils";

  import Spinner from "../Spinner/Spinner.svelte";
  import Image from "../Image/Image.svelte";
  import PokemonSpecies from "./PokemonSpecies.svelte";

  export let pokemonId;
  export let close;

  let loading = true;

  let name = "";
  let id = "";
  let weight = 0;
  let height = 0;
  let species;

  $: fetch(getPokemonDetail(pokemonId))
    .then(r => r.json())
    .then(data => {
      console.log(data);
      name = data.name;
      id = data.id;
      weight = data.weight;
      height = data.height;
      species = data.species;
      loading = false;
    });
</script>

<style>
  .pokemon-name {
    text-transform: capitalize;
    font-weight: 700;
    font-size: 1rem;
    font-family: sans-serif;
    margin: 0.8rem 0;

    font-size: 2rem;
    flex-basis: 2rem;
  }

  .PokemonDetail {
    display: flex;
    flex-direction: column;
  }

  .pokemon-details-wrapper {
    min-height: 20rem;
    display: flex;
  }

  :global([ref="spinner"]) {
    align-self: center;
    margin: 0 auto !important;
  }

  .column-left {
    display: flex;
    flex-direction: column;
    width: 12.8rem;
    flex-shrink: 0;
    margin-right: 0.5rem
  }

  .column-right {
    flex-grow: 2;
  }

  .pokemon-weight .label,
  .pokemon-height .label {
    font-weight: 700;
  }
  .pokemon-weight {
    margin-bottom: 0.5rem;
  }
  button {
    margin: 0;
  }
</style>

<div class="PokemonDetail">
  <main class="pokemon-details-wrapper">
    {#if loading}
      <Spinner ref="spinner" />
    {:else}
      <div class="pokemon-image column-left">
        <Image
          src={API_GET_SPRITE_FRONT(id)}
          fallback={API_GET_SPRITE_FRONT('default/0')}
          class="front"
          alt={`Image of ${name} pokemon.`} />
        <Image
          src={API_GET_SPRITE_BACK(id)}
          fallback={API_GET_SPRITE_FRONT('default/0')}
          class="back"
          alt={`Image of the back of the ${name} pokemon.`} />
      </div>
      <div class="column-right">
        <h2 class="pokemon-name">{name}</h2>
        <PokemonSpecies {species} />
        <div class="pokemon-weight">
          <span class="label">Weight:</span>
          <span class="value">{weight / 10 + 'kg'}</span>
        </div>
        <div class="pokemon-height">
          <span class="label">Height:</span>
          <span class="value">{height / 10 + 'm'}</span>
        </div>
        <!-- <PokemonStats {stats} /> -->
      </div>
      <!-- <PokemonEvolutionChainConnected {id} /> -->
    {/if}
  </main>
  <footer>
    <!-- svelte-ignore a11y-autofocus -->
    <button autofocus on:click={close}>close modal</button>
  </footer>
</div>
