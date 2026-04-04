import { createClient } from '@supabase/supabase-js';

// Vite projelerinde .env değişkenlerine bu şekilde erişilir
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase anahtarları bulunamadı! .env dosyasını kontrol et.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);