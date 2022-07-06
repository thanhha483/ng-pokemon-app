import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {

  constructor(private http : HttpClient) {}

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap({
        next: response => { this.log(response); },
        error: error => { this.handleError(error, []); }
      })
    );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap({
        next: response => { this.log(response); },
        error: error => { this.handleError(error, undefined); }
      })
    );
  }

  searchPokemonList(term: string): Observable<Pokemon[]> {

    if (term.length <= 1) {
      return of([]);
    }

    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap({
        next: response => { this.log(response); },
        error: error => { this.handleError(error, []); }
      })
    )
  }

  updatePokemon(pokemon: Pokemon): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(
      tap({
        next: response => { this.log(response); },
        error: error => { this.handleError(error, undefined); }
      })
    );
  }

  deletePokemonById(pokemonId: number): Observable<any> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap({
        next: response => { this.log(response); },
        error: error => { this.handleError(error, undefined); }
      })
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap({
        next: response => { this.log(response); },
        error: error => { this.handleError(error, undefined); }
      })
    );

  }

  private log(response: any) {
    if (response != null)
      console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.log(error);
    return of(errorValue);
  }

  getPokemonTypeList() : string[] {
    return [
      'Plante', 
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy'
    ];
  }
}
