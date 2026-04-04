import { useFavorites } from '../context/FavoritesContext';
import { PetCard } from '../components/PetCard';
import { HeartCrack } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Favorites = () => {
  // 1. Context'ten favoriler listesini çekiyoruz
  const { favorites } = useFavorites();

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 relative z-10">
      <div className="mb-12">
        {/* Çeviri koruması burada da devrede */}
        <h1 
          className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter mb-4 notranslate" 
          translate="no"
        >
          Favorilerim
        </h1>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
          Kalbinde yer ayırdığın dostlar
        </p>
      </div>

      {/* 2. Liste boş mu dolu mu kontrolü */}
      {favorites.length === 0 ? (
        // Eğer hiç favori yoksa gösterilecek şık "Boş Durum" (Empty State) tasarımı
        <div className="bg-white/80 backdrop-blur-3xl rounded-[48px] p-16 text-center shadow-xl border border-white/50 flex flex-col items-center justify-center min-h-[40vh]">
          <HeartCrack size={64} className="text-brand-pink/40 mb-6" />
          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">
            Henüz bir dostu favorilemedin
          </h2>
          <p className="text-gray-500 font-medium mb-8 max-w-md">
            Görünüşe göre favori listen şu an boş. Anasayfaya dönüp kalbini çalacak o özel dostu bulabilirsin!
          </p>
          <Link 
            to="/" 
            className="bg-brand-pink text-white px-8 py-4 rounded-[28px] font-black shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            Dostları Keşfet 🐾
          </Link>
        </div>
      ) : (
        // 3. Favoriler varsa, grid yapısı içinde listeliyoruz
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </main>
  );
};