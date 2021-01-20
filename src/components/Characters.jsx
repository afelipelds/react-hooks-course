import React, { useState, useEffect, useReducer } from 'react'

const initialState = {
    favoritesCharacters: []
};

const favoriteReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TO_FAVORITES':
            return {
                ...state,
                favoritesCharacters: [...state.favoritesCharacters, action.payload]
            };

        case 'DELETE_FROM_FAVORITES':
            return {
                ...state,
                favoritesCharacters: [
                    ...state.favoritesCharacters.filter( item => item.id !== action.payload.id )
                ]
            };
        
        default:
            return state;
    }
}

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState)

    const getCharacters = async () => {
        const response = await fetch('https://rickandmortyapi.com/api/character/');
        const data = await response.json();
        const results = data.results;
        setCharacters(results);
    }

    useEffect(() => {
        getCharacters();
    }, [])

    const handleClickOnFavorite = favorite => {
        dispatch({type: 'ADD_TO_FAVORITES', payload: favorite});
    }

    const handleClickOnDeleteFavorite = character => {
        dispatch({type: 'DELETE_FROM_FAVORITES', payload: character})
    }

    return (
        <div className="">
            <div className="Characters">
                {
                    favorites.favoritesCharacters.length > 0 && (
                        <>
                            <div className="Characters-title">
                                <h2>Favorites Characters</h2>
                            </div>
                            <div className="Characters-list">
                                {
                                    favorites.favoritesCharacters.map( favoriteCharacter => (
                                        <div className="Character" key={favoriteCharacter.id}>
                                            <h2>{ favoriteCharacter.name}</h2>
                                            <figure>
                                                <img src={favoriteCharacter.image} alt={favoriteCharacter.species} />
                                                <figcaption>
                                                    <p><b>Gender: </b> {favoriteCharacter.gender}</p>
                                                    <p><b>Origin: </b> {favoriteCharacter.origin.name}</p>
                                                    <p><b>Location: </b> {favoriteCharacter.location.name}</p>
                                                    <p><b>Specie: </b> {favoriteCharacter.species}</p>
                                                    <p><b>Status: </b> {favoriteCharacter.status}</p>
                                                    <p><button type="button" onClick={() => handleClickOnDeleteFavorite(favoriteCharacter)}>Delete</button></p>
                                                </figcaption>
                                            </figure>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    )
                }
            </div>
            <div className="Characters">
                <div className="Characters-title">
                    <h2>Characters</h2>
                </div>
                <div className="Characters-list">
                    {
                        characters.map( (character) => (
                            <div className="Character" key={character.name}>
                                <h2>{ character.name}</h2>
                                <figure>
                                    <img src={character.image} alt={character.species} />
                                    <figcaption>
                                        <p><b>Gender: </b> {character.gender}</p>
                                        <p><b>Origin: </b> {character.origin.name}</p>
                                        <p><b>Location: </b> {character.location.name}</p>
                                        <p><b>Specie: </b> {character.species}</p>
                                        <p><b>Status: </b> {character.status}</p>
                                        <p><button type="button" onClick={() => handleClickOnFavorite(character)}>Add to favorites</button></p>
                                    </figcaption>
                                </figure>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Characters;
