function pokemonTemplate(imageSrc, name, id) {
  return $(`
    <div class="pokemon">
        <div class="image">
          <img src="${imageSrc}" alt="${name}" />
        </div>
        <div class="info">
            <div class="id">${id}</div>
            <div class="name">${name}</div>
        </div>
     </div>
    `);
}

function loadPokemons(condition) {
  return $.getJSON("https://pokeapi.co/api/v2/pokemon", (request, state) => {
    $("#pokemons").html("");
    if (state == "success") {
      request.results.filter(condition).forEach((pokemon) => {
        $.getJSON(pokemon.url, (pokemonData) => {
          $("#pokemons").append(
            pokemonTemplate(
              pokemonData.sprites.back_default,
              pokemonData.name,
              pokemonData.id
            )
          );
        });
      });
    }
  });
}

loadPokemons(() => true);

$("#search").on("input", (event) => {
  let value = event.target.value;

  loadPokemons((item) => {
    return item.name.slice(0, value.length) == value;
  });
});
