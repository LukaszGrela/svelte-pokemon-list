<script>
  import Spinner from "../Spinner/Spinner.svelte";

  export let src;
  export let fallback;
  export let alt;
  export let ref;

  let loading;
  let path;

  function preloadImage(image, fallback) {
    loading = true;
    path = image;
    const img = new Image();
    // const timeout = setTimeout(() => {
    //   path = fallback;
    //   img.onerror = null;
    //   img.onload = null;
    //   loading = false;
    // }, 10000);

    img.onload = () => {
      // clearTimeout(timeout);
      loading = false;
    };
    img.onerror = e => {
      // clearTimeout(timeout);
      console.error(e);
      path = fallback;
      loading = false;
    };

    img.src = path;
  }

  $: preloadImage(src, fallback);
</script>

<style>
  .Image {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<div class="Image" {ref}>
  {#if loading}
    <Spinner />
  {:else}
    <img src={path} {alt} />
  {/if}
</div>
