const lists__pokemons = document.getElementById('lists__pokemons')
let url = 'https://pokeapi.co/api/v2/pokemon'
let templateHtml = '';
const buttons = document.getElementById('buttons')
let BtnNext;
let BtnPrevious;

const GetPokemons = async (url) => {
  lists__pokemons.innerHTML = `
  <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  `
  
  try {
    const response = await fetch(url)
    const results = await response.json();
    DataPokemons(results.results)
    BtnPrevious = results.previous ? `<button class="btn" data-url=${results.previous}>⏮</button>` : ''
    BtnNext = results.next ? `<button class="btn" data-url=${results.next}>⏩</button>` : ''
    buttons.innerHTML = BtnPrevious + " " + BtnNext;
  } catch (error) {
    console.log(error)
  }
}

const DataPokemons = async (urlPokemon) => {
  lists__pokemons.innerHTML = ''
  for (let index of urlPokemon) {
    try {
      const res = await fetch(index.url)
      const result = await res.json();
      templateHtml = `
    <div class="pokemon__img">
      <img src=${result.sprites.other.dream_world.front_default} alt=${result.name}/>
      <p>${result.name}</p>
    </div>
    `
      lists__pokemons.innerHTML += templateHtml
    } catch (error) {
      console.log(error)
    }
  }
}

GetPokemons(url)

buttons.addEventListener('click', (e) => {
  console.log(e.target.dataset.url)
  GetPokemons(e.target.dataset.url)
})