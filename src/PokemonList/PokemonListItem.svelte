<script>
  import { onMount, beforeUpdate, afterUpdate } from 'svelte'
  import { API_GET_SPRITE_FRONT } from '../api'
  import { parseIdFromUrl } from '../utils'

  export let i
  export let item

  let id
  let image
  let loading

  function preloadImage() {
    id = parseIdFromUrl(item.url)
    image = API_GET_SPRITE_FRONT(id)
    const timeout = setTimeout(() => {
      image = API_GET_SPRITE_FRONT('default/0')
      img.onerror = null
      img.onload = null
      loading = false
    }, 1000)

    const img = new Image()

    img.onload = () => {
      clearTimeout(timeout)
      loading = false
    }
    img.onerror = () => {
      image = API_GET_SPRITE_FRONT('default/0')
      loading = false
    }

    img.src = image
  }

  $: preloadImage(item)
</script>

<style>
  .pokemon-item {
    position: relative;
    list-style: none;
    width: 11.4rem;
    height: 13.9rem;
    background-color: #f7f7f7;
    margin: 1rem;
    border-radius: 0.8rem;
    display: inline-block;
    text-align: center;
    vertical-align: bottom;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);

    justify-self: center;
    align-self: center;

    cursor: pointer;
  }
  .pokemon-item:hover {
    position: relative;
  }
  .pokemon-item:hover img {
    position: relative;
    top: -2px;
    left: -2px;

    filter: url("data:image/svg+xml;utf8,<svg height='0' xmlns='http://www.w3.org/2000/svg'><filter id='drop-shadow'><feGaussianBlur in='SourceAlpha' stdDeviation='4'/><feOffset dx='1' dy='4' result='offsetblur'/><feFlood flood-color='rgba(0,0,0,0.5)'/><feComposite in2='offsetblur' operator='in'/><feMerge><feMergeNode/><feMergeNode in='SourceGraphic'/></feMerge></filter></svg>#drop-shadow");
    -webkit-filter: drop-shadow(1px 4px 2px rgba(0, 0, 0, 0.5));
    -ms-filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=1, OffY=4, Color='#444')";
    filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=1, OffY=4, Color='#444')";
  }
  .pokemon-name {
    text-transform: capitalize;
    font-weight: 700;
    font-size: 1rem;
    font-family: sans-serif;
    margin: 0.8rem 0;
  }
  .number {
    font-size: 1rem;
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
    opacity: 0.75;
    font-weight: 500;
  }

  .pokemon-item img {
    width: 9.6rem;
    height: 9.6rem;
    margin: 1.75rem 0.9rem 0.4rem 0.9rem;
    display: block;
  }
</style>

<li
  class="pokemon-item"
  on:click={() => {
    window.location.hash = `/item/${id}`
    console.log(window.location.hash)
  }}>
  <span class="number">#{i}</span>
  {#if loading}
    <p class="pokemon-image">loading</p>
  {:else}
    <img
      src={image}
      class="pokemon-image"
      alt={`Image of ${item.name} pokemon.`} />
  {/if}
  <div class="pokemon-name">{item.name}</div>
</li>
