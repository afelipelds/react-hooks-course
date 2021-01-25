import React, { useState, 
                useReducer, 
                useMemo, 
                useRef, 
                useCallback } from 'react';
import Search from './Search';
import useCharacters from '../hooks/useCharacters';

const initialState = {
    favoritesCharacters: []
};

const API = 'https://rickandmortyapi.com/api/character/';

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
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
    const [search, setSearch] = useState('');
    const searchInput = useRef(null);

    const characters = useCharacters(API)
    
    /** Call API 
     * Esto es reemplazado por un hook. GO TO: ../../hooks/useCharacters
    
    const getCharacters = async () => {
        const response = await fetch(API);
        const data = await response.json();
        const results = data.results;w/** 
        setCharacters(results);
    };
    
    //Review the characters
    useEffect(() => {
        getCharacters();
    }, []);

    */

    /** Action to add favorite character */
    const handleClickAddFavorite = favorite => {
        dispatch({type: 'ADD_TO_FAVORITES', payload: favorite});
    };
    /** Action to add favorite character */
    const handleClickOnDeleteFavorite = character => {
        dispatch({type: 'DELETE_FROM_FAVORITES', payload: character})
    };

    /** Set the value of the searching word */
    // const handleSearch = (event) => {
    //     setSearch(event.target.value);
    //     // console.log(searchInput)
    // }
    const handleSearchInput = useCallback( 
        () => {
            setSearch(searchInput.current.value);
        },
        []
    )
    
    /** Function to memoize the values (characters & search) when user is searching a character
     * Works like below:
     * const filteredCharacters = characters.filter( character => {
     *     return character.name.toLowerCase().includes(search.toLowerCase());
     * })
    */
    const filteredCharacters = useMemo(() => 
        characters.filter( character => {
            return character.name.toLowerCase().includes(search.toLowerCase());
        }), 
        [characters, search]
    )

    return (
        <div className="">
            <div className="Characters">
                <Search search={search} searchInput={searchInput} handleSearch={handleSearchInput} />
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
                        filteredCharacters.map( (character) => (
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
                                        <p><button type="button" onClick={() => handleClickAddFavorite(character)}>Add to favorites</button></p>
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
