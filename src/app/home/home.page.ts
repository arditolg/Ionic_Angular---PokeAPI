import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe((response: Pokemon[]) => {
      this.pokemons = response;
    });
  }

  toggleFavorite(pokemon: Pokemon) {
    pokemon.isFavorite = !pokemon.isFavorite;
  }

  viewPokemonDetails(pokemon: Pokemon) {
    console.log('Navigating to details of Pokemon:', pokemon);
    this.router.navigate(['/pokemon', pokemon.name]);
  }
}
