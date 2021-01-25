import { useState, useEffect } from 'react';

const useCharacters = url => {
    const [charcaters, setCharacters] = useState([]);
    useEffect( 
        () => {
            fetch(url)
                .then(response => response.json())
                .then( data => setCharacters(data.results))
        }, 
        [url]
    )

    return charcaters;
}

export default useCharacters;