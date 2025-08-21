import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  fontFamily: string;
  toggleTheme: () => void;
  setFontFamily: (font: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const availableFonts = [
  { name: 'Montserrat', value: 'Montserrat, sans-serif' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Open Sans', value: 'Open Sans, sans-serif' },
  { name: 'Poppins', value: 'Poppins, sans-serif' },
  { name: 'Inter', value: 'Inter, sans-serif' },
  { name: 'Lato', value: 'Lato, sans-serif' },
  { name: 'Source Sans Pro', value: 'Source Sans Pro, sans-serif' },
  { name: 'Ubuntu', value: 'Ubuntu, sans-serif' }
];

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [fontFamily, setFontFamilyState] = useState('Montserrat, sans-serif');

  useEffect(() => {
    // Cargar configuración guardada
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const savedFont = localStorage.getItem('fontFamily');
    
    if (savedTheme) setTheme(savedTheme);
    if (savedFont) setFontFamilyState(savedFont);
  }, []);

  useEffect(() => {
    // Aplicar tema al documento
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.fontFamily = fontFamily;
    
    // Guardar en localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('fontFamily', fontFamily);
  }, [theme, fontFamily]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const setFontFamily = (font: string) => {
    setFontFamilyState(font);
  };

  const value: ThemeContextType = {
    theme,
    fontFamily,
    toggleTheme,
    setFontFamily
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { availableFonts };
