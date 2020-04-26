export const API_GATEWAY = "https://pokeapi.co/api/v2/";

export const API_LIST_POKEMON = "pokemon/";

export const getPokemonDetail = (id) =>
  `${API_GATEWAY}${API_LIST_POKEMON + id}`;
export const getEvolutionChain = (id) => `${API_GATEWAY}evolution-chain/${id}`;

export const API_GET_SPRITE_FRONT = (id) => `./static/pokemon/${id}.png`;
export const API_GET_SPRITE_BACK = (id) => `./static/pokemon/back/${id}.png`;

export const PAGINATION = (page = 1, limit = 20) => {
  let params = {
    limit,
  };
  if (page < 1) page = 1;
  let offset = (page - 1) * limit;
  if (offset > 0) params["offset"] = offset;

  return params;
};

export const getPokemonList = (page = 1, limit = 20) => {
  const pagination = PAGINATION(page, limit);
  const params = Object.keys(pagination).reduce((acc, key) => {
    let output = `${acc}${acc === "" ? "?" : "&"}${key}=${pagination[key]}`;
    return output;
  }, "");
  return `${API_GATEWAY}${API_LIST_POKEMON}${params}`;
};
