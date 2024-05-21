import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      mergeMap(response => {
        const requests = response.results.map((pokemon: any) =>
          this.http.get<any>(pokemon.url).pipe(
            map(details => ({
              id: details.id,
              name: details.name,
              url: details.url,
              isFavorite: false,
              image: details.sprites.front_default
            }))
          )
        );
        return forkJoin(requests) as Observable<Pokemon[]>;
      }),
      catchError((error: any) => {
        console.error('Error fetching Pokemons:', error);
        return throwError('Error fetching Pokemons');
      })
    );
  }

  getPokemonDetails(name: string): Observable<any> {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return this.http.get(apiUrl).pipe(
      catchError((error: any) => {
        console.error('Error fetching Pokemon details:', error);
        return throwError('Error fetching Pokemon details');
      })
    );
  }
}
