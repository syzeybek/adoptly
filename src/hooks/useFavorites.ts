import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast'; // 1. IMPORT

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<number[]>([]);
  const storageKey = user ? `favorites_${user.email}` : null;

  useEffect(() => {
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) setFavorites(JSON.parse(saved));
    } else { setFavorites([]); }
  }, [storageKey]);

  const toggleFavorite = (petId: number) => {
    if (!user) {
      toast.error("Favorilere eklemek için giriş yapmalısın! 🐾");
      return;
    }

    const isFav = favorites.includes(petId);
    let updated;

    if (isFav) {
      updated = favorites.filter(id => id !== petId);
      toast.success("Favorilerden çıkarıldı.");
    } else {
      updated = [...favorites, petId];
      toast.success("Favorilere eklendi! ❤️");
    }
    
    setFavorites(updated);
    localStorage.setItem(storageKey!, JSON.stringify(updated));
  };

  return { favorites, toggleFavorite, isFavorite: (id: number) => favorites.includes(id) };
};