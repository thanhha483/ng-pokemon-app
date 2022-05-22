import { Component, OnInit } from '@angular/core';
import { POKEMONS } from './mock-pokemons';
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  pokemonList : Pokemon[] = POKEMONS;

  ngOnInit() {
    console.table(this.pokemonList);
    this.selectPokemon(this.pokemonList[3]);
  }

  selectPokemon(pokemon : Pokemon) {
    console.log(`Vous avez cliqué sur le pokémon ${pokemon.name}`);
  }

}
