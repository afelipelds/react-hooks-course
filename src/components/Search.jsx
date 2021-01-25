import React from 'react'

const Search = ({ search, searchInput, handleSearch }) => {
    
    return (
        <div className="Characters">
            <input type="text" 
                    id="search-input" 
                    ref={searchInput} 
                    placeholder="Realiza una búsqueda para agregar a tus favoritos" 
                    value={search} 
                    onChange={handleSearch} />
        </div>
    )
}

export default Search
