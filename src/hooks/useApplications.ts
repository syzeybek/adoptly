import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast'; // 1. IMPORT

export const useApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const storageKey = user ? `apps_${user.email}` : null;

  useEffect(() => {
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) setApplications(JSON.parse(saved));
    }
  }, [storageKey]);

  const applyForPet = (pet: any) => {
    if (!user) {
      toast.error("Başvuru için giriş yapmalısın! 😿");
      return;
    }
    
    if (applications.some(app => app.petId === pet.id)) {
      toast.error("Zaten başvurunuz bulunuyor! ❤️");
      return;
    }

    const updated = [...applications, { 
      petId: pet.id, 
      petName: pet.name, 
      petImage: pet.imageUrl, 
      date: new Date().toLocaleDateString('tr-TR'), 
      status: 'Beklemede' 
    }];

    setApplications(updated);
    if (storageKey) localStorage.setItem(storageKey, JSON.stringify(updated));
    
    // Şık başarı bildirimi
    toast.success(`${pet.name} için başvurunuz iletildi! 🚀`, {
      icon: '🐾',
      style: { border: '2px solid #FF8DA1' }
    });
  };

  return { applications, applyForPet };
};