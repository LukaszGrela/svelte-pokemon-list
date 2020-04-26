<script>
  export let page;
  export let total;
</script>

<style>
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    z-index: 1;

    color: #ffffff;
    font-size: 2rem;
    background-color: #e82323;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page {
    margin: 0 1rem;
  }
  button {
    color: white;
    background: none;
    border: none;
    margin: 0;
    cursor: pointer;
  }
  button:not(:disabled):active {
    color: #999;
    background: none;
    font-weight: 700;
    color: #999;
  }
  button:not(:disabled):hover {
    background: none;
    font-weight: 700;
  }
</style>

<footer>
  {#if page - 1 > 0}
    <button
      on:click={() => {
        window.scrollTo(0, 0);
        window.location.hash = `#/top/${page - 1}`;
      }}>
      &lt;&lt;
    </button>
  {/if}
  <span class="page">Page {page} of {total}</span>
  {#if page + 1 <= total}
    <button
      on:click={() => {
        window.scrollTo(0, 0);
        window.location.hash = `#/top/${page + 1}`;
      }}>
      &gt;&gt;
    </button>
  {/if}
</footer>
