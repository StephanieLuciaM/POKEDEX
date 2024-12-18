import { Pokemon } from './pokemon-model.js';
import { Team } from './team-model.js';
import { Type } from './type-model.js';


// Association many-to-many entre Pokémon et Team
Pokemon.belongsToMany(Team, {
    through: "team_pokemon",
    foreignKey: 'pokemon_id',
    as: 'teams', // Alias pour accéder aux équipes auxquelles appartient un Pokémon
    timestamps: false
});

Team.belongsToMany(Pokemon, {
    through: "team_pokemon",
    foreignKey: 'team_id',
    as: 'pokemons',  // Alias pour accéder aux Pokémon d'une équipe
    timestamps: false
});

// Pokémon peut avoir plusieurs types via la table pokemon_type
Pokemon.belongsToMany(Type, {
    through: "pokemon_type",  // Table de liaison
    foreignKey: 'pokemon_id',  // Clé étrangère pour Pokémon
    as: 'types',  // Alias pour accéder aux types d'un Pokémon
    timestamps: false
});

// Type peut être associé à plusieurs Pokémon via la table pokemon_type
Type.belongsToMany(Pokemon, {
    through: "pokemon_type",  // Table de liaison
    foreignKey: 'type_id',  // Clé étrangère pour Type
    as: 'pokemons',  // Alias pour accéder aux Pokémon d'un Type
    timestamps: false
});

export {Pokemon, Type, Team};