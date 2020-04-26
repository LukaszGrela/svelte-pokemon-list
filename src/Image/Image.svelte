<script>
  import Spinner from "../Spinner/Spinner.svelte";

  export let src;
  export let fallback;
  export let alt;

  let loading;
  let path;

  function preloadImage(image, fallback) {
    loading = true;
    path = image;
    const img = new Image();
    const timeout = setTimeout(() => {
      path = fallback;
      img.onerror = null;
      img.onload = null;
      loading = false;
    }, 10000);

    img.onload = () => {
      clearTimeout(timeout);
      loading = false;
    };
    img.onerror = () => {
      clearTimeout(timeout);
      path = fallback;
      loading = false;
    };

    img.src = path;
  }

  $: preloadImage(src, fallback);
</script>

{#if loading}
  <Spinner />
{:else}
  <img src={path} {alt} />
{/if}
