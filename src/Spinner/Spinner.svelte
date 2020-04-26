<script>
  export let ref;
</script>

<style>
  @keyframes spinner {
    0% {
      stroke-dashoffset: calc(0.66 * 40px);
      transform: rotate(0deg);
    }
    50% {
      stroke-dashoffset: calc(3.14 * 40px);
      transform: rotate(720deg);
    }
    100% {
      stroke-dashoffset: calc(0.66 * 40px);
      transform: rotate(1080deg);
    }
  }

  .loading-spinner {
    margin: 1rem auto;
  }

  .loading-spinner svg.spinner {
    width: 40px;
    height: 40px;
  }
  .loading-spinner svg.spinner circle {
    fill: transparent;
    stroke-linecap: round;
  }
  .loading-spinner svg.spinner circle#bg {
    stroke-width: calc(2px - 1px);
    stroke: #b6b6b6;
  }
  .loading-spinner svg.spinner circle#fg {
    stroke-width: 2px;
    stroke: #e82323;
    stroke-dasharray: calc(3.14 * 40px);

    transform-origin: calc(0.5 * 40px) calc(0.5 * 40px) 0;
    animation: spinner 4s linear infinite;
  }
</style>

<div class="loading-spinner" {ref}>
  <svg version="1" class="spinner" width="40" height="40" viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="18" id="bg" />
    <circle cx="20" cy="20" r="18" id="fg" />
  </svg>
</div>
