<script>
  import { onMount } from 'svelte'
  import PokemonList from './PokemonList/PokemonList.svelte'
  import Pagination from './Pagination/Pagination.svelte'
  import Modal from './Modal/Modal.svelte'
  import PokemonDetail from './PokemonDetail/PokemonDetail.svelte'

  const PAGE_SIZE = 30

  let page
  let item
  let showModal
  let pokemonId

  async function hashchange() {
    const path = window.location.hash.slice(1)
    console.log(path)
    if (path.startsWith('/item')) {
      showModal = true
      pokemonId = path.substr(path.lastIndexOf('/') + 1)
    } else if (path.startsWith('/top')) {
      page = +path.slice(5)
      showModal = false
      item = null
    } else {
      showModal = false
      window.location.hash = '/top/1'
    }
  }

  onMount(hashchange)
</script>

<style>
  .home-page {
    text-align: center;
    padding-top: 9rem;
    padding-bottom: 3rem;
  }
  header {
    height: 7rem;
    color: #fff;
    background-color: #e82323;
    text-align: center;
    font-size: 4.4rem;
    font-weight: 700;
    padding-top: 2rem;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    z-index: 1;
  }
</style>

<svelte:window on:hashchange={hashchange} />
<main>
  <article class="home-page">
    <header>Pokémon List</header>
    {#if page}
      <PokemonList {page} pageSize={PAGE_SIZE} />
      <Pagination {page} total={Math.ceil(964 / PAGE_SIZE)} />
    {/if}
  </article>

</main>

