import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
})
export class PokemonDetailsPage implements OnInit {
  pokemon!: Pokemon;
  abilities: string[] = [];
  weight!: number;
  types: string[] = [];
  stats: { name: string; base_stat: number }[] = [];
  species!: string;
  moves: string[] = [];
  heldItems: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const pokemonName = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Pokemon Name:', pokemonName);
    if (pokemonName) {
      this.pokemonService.getPokemonDetails(pokemonName).subscribe((response: any) => {
        console.log('Pokemon Details Response:', response);
        this.pokemon = {
          id: response.id,
          name: response.name,
          url: `https://pokeapi.co/api/v2/pokemon/${response.id}/`,
          isFavorite: false,
          image: response.sprites.front_default
        };
        this.abilities = response.abilities.map((abilityObj: any) => abilityObj.ability.name);
        this.weight = response.weight;
        this.types = response.types.map((typeObj: any) => typeObj.type.name);
        this.stats = response.stats.map((statObj: any) => ({
          name: statObj.stat.name,
          base_stat: statObj.base_stat
        }));
        this.species = response.species.name;
        this.moves = response.moves.map((moveObj: any) => moveObj.move.name);
        this.heldItems = response.held_items.map((itemObj: any) => itemObj.item.name);
        console.log('Pokemon Details Response:', response);
      });
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }

}
