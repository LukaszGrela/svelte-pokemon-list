<script>
  export let species;

  let loading = true;
  let paragraphs = [];

  $: fetch(species.url)
    .then(r => r.json())
    .then(data => {
      console.log(data);
      const english = data.flavor_text_entries
        .filter(entries => {
          return entries.language.name === "en";
        })
        .forEach(entry => {
          const text = entry.flavor_text;
          if (!paragraphs.includes(text)) {
            paragraphs.push(text);
          }
        });
      console.log(paragraphs);
      loading = false;
    });
</script>

<style>
  h3 {
    font-weight: 700;
    margin: 0.5rem 0;
  }
  .paragraphs {
    max-height: 10rem;
    overflow-y: auto;
  }
  .paragraphs p {
    margin-bottom: 0.5rem;
  }

  .PokemonSpecies {
    margin-bottom: 1rem;
  }
</style>

<article class="PokemonSpecies">
  {#if loading}
    ...
  {:else if paragraphs.length > 0}
    <h3>Description</h3>
    <div class="paragraphs">
      {#each paragraphs as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>
  {/if}
</article>
