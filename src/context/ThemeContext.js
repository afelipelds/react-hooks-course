import React, { useContext } from 'react'

const ThemeContext = React.createContext(null);

export const useThemeContext = () => {
    return useContext(ThemeContext);
}

export default ThemeContext;
