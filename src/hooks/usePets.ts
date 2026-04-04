import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

// 🐾 1. TÜM İLANLARI ÇEK (Ana Sayfa İçin)
export const usePets = () => {
  return useQuery({
    queryKey: ['pets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Supabase Çekme Hatası:", error);
        throw error;
      }
      return data;
    },
  });
};

// 🐾 2. TEK BİR İLANI ÇEK (Detay Sayfası İçin)
export const usePet = (id: string | undefined) => {
  return useQuery({
    queryKey: ['pet', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error("Tekil İlan Çekme Hatası:", error);
        throw error;
      }
      return data;
    },
    enabled: !!id, // ID yoksa sorgu atma
  });
};

// 🐾 3. KULLANICIYA ÖZEL İLANLARI ÇEK (Profil Sayfası İçin)
export const useMyPets = (email: string | undefined) => {
  return useQuery({
    queryKey: ['my-pets', email],
    queryFn: async () => {
      if (!email) return [];
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('ownerEmail', email) // Veritabanındaki ownerEmail sütunu ile eşleştir
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Profil İlanları Çekme Hatası:", error);
        throw error;
      }
      return data;
    },
    enabled: !!email, // Kullanıcı girişi yoksa sorgu atma
  });
};

// 🐾 4. YENİ İLAN EKLE
export const useAddPet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newPet: any) => {
      const { data, error } = await supabase
        .from('pets')
        .insert([newPet])
        .select();
      
      if (error) {
        console.error("İlan Ekleme Hatası:", error);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      // İlan listelerini geçersiz kıl ki sayfalar güncellensin
      queryClient.invalidateQueries({ queryKey: ['pets'] });
      queryClient.invalidateQueries({ queryKey: ['my-pets'] });
    },
  });
};

// 🐾 5. İLANI GÜNCELLE
export const useUpdatePet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedPet: any) => {
      const { data, error } = await supabase
        .from('pets')
        .update(updatedPet)
        .eq('id', updatedPet.id)
        .select();
      
      if (error) {
        console.error("Güncelleme Hatası:", error);
        throw error;
      }
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
      queryClient.invalidateQueries({ queryKey: ['pet', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['my-pets'] });
    },
  });
};

// 🐾 6. İLANI SİL
export const useDeletePet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('pets')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error("Silme Hatası:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
      queryClient.invalidateQueries({ queryKey: ['my-pets'] });
    },
  });
};