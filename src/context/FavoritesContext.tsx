import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface FavoritesContextType {
  favorites: any[];
  toggleFavorite: (pet: any) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('adoptly_favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('adoptly_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pet: any) => {
    const exists = favorites.find((fav) => fav.id === pet.id);
    
    // ✨ Çözüm: Toast mesajlarına eşsiz bir ID (pet.id) vererek 
    // ardarda iki kere tetiklenmesini (duplicate) engelliyoruz.
    if (exists) {
      setFavorites((prev) => prev.filter((fav) => fav.id !== pet.id));
      toast.error(`${pet.name} favorilerden çıkarıldı 💔`, { id: `fav-${pet.id}` });
    } else {
      setFavorites((prev) => [...prev, pet]);
      toast.success(`${pet.name} favorilerine eklendi! ❤️`, { id: `fav-${pet.id}` });
    }
  };

  const isFavorite = (id: number) => favorites.some((fav) => fav.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
  return context;
};