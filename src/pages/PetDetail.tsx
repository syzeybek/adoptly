import { useParams, useNavigate } from 'react-router-dom';
import { usePet } from '../hooks/usePets';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase'; // ✨ Veritabanı bağlantısı eklendi
import { 
  MapPin, Calendar, Dna, ArrowLeft, Heart, 
  MessageSquareQuote, Share2, Loader2 
} from 'lucide-react';
import toast from 'react-hot-toast';

export const PetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: pet, isLoading } = usePet(id);
  const { toggleFavorite, isFavorite } = useFavorites();

  if (isLoading) return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-4 relative z-10">
      <Loader2 className="animate-spin text-white" size={48} />
      <p className="font-black text-white uppercase tracking-widest animate-pulse">Yükleniyor...</p>
    </div>
  );

  if (!pet) return <div className="text-center py-20 font-bold text-white uppercase relative z-10">Dostumuz bulunamadı. 😿</div>;

  const favorited = isFavorite(pet.id);
  const pImg = pet.imageUrl || pet.imageurl;

  const handleFavoriteAction = () => {
    if (!user) {
      toast.error("Favorilere eklemek için giriş yapmalısın! 🐾", { id: 'auth-fav' });
      navigate('/login');
      return;
    }
    toggleFavorite(pet);
  };

  // ✨ Başvuruyu veritabanına kaydeden asıl fonksiyon
  const handleAdoptAction = async () => {
    if (!user) {
      toast.error("Başvuruda bulunmak için giriş yapmalısın! ❤️", { id: 'auth-adopt' });
      navigate('/login');
      return;
    }

    try {
      const { error } = await supabase
        .from('applications')
        .insert([
          { user_id: user.id, pet_id: pet.id }
        ]);

      if (error) {
        if (error.code === '23505') { 
          // 23505 Postgres'te "Unique Violation" hatasıdır (Aynı kayıttan varsa)
          toast.error("Bu dostumuz için zaten bir başvurunuz var! 🐾");
        } else {
          throw error;
        }
      } else {
        toast.success(`${pet.name} için başvurunuz alındı! Pati selamı iletildi! ❤️`, { id: 'adopt-success' });
      }
    } catch (error: any) {
      console.error("Başvuru Hatası:", error);
      toast.error("Başvuru sırasında bir hata oluştu.");
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 relative z-10">
      {/* ÜST BÖLÜM: Yönlendirme ve Aksiyonlar */}
      <div className="flex justify-between items-center mb-10">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 font-black text-white hover:text-white/80 transition-colors uppercase text-sm tracking-widest"
        >
          <ArrowLeft size={20}/> Geri Dön
        </button>
        <div className="flex gap-3">
          <button 
            onClick={handleFavoriteAction}
            className={`p-4 rounded-2xl shadow-lg transition-all active:scale-90 ${
              favorited ? 'bg-red-500 text-white' : 'bg-white text-gray-300 hover:text-red-500'
            }`}
          >
            <Heart size={24} fill={favorited ? "currentColor" : "none"} />
          </button>
          <button className="p-4 bg-white rounded-2xl shadow-lg text-gray-300 hover:text-brand-cyan transition-all">
            <Share2 size={24}/>
          </button>
        </div>
      </div>

      {/* İÇERİK KARTI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/95 backdrop-blur-3xl p-8 md:p-12 rounded-[56px] shadow-2xl border border-white/50">
        
        {/* GÖRSEL ALANI */}
        <div className="relative h-[450px] md:h-[550px] rounded-[40px] overflow-hidden bg-gray-950 flex items-center justify-center shadow-inner">
          <img src={pImg} className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-110" alt="" />
          <img src={pImg} className="relative z-10 max-h-full max-w-full object-contain p-4" alt={pet.name} />
        </div>

        {/* DETAY ALANI */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <span className="inline-block px-5 py-1.5 bg-brand-cyan/10 text-brand-cyan rounded-full font-black text-[10px] uppercase tracking-[0.2em] mb-4">
              Sahiplenilmeyi Bekliyor
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.85] mb-2 notranslate" translate="no">
              {pet.name}
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 p-6 rounded-[32px] text-center border border-white shadow-sm">
              <Dna className="mx-auto text-brand-purple mb-2" size={24}/>
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Cinsi</p>
              <p className="font-black text-gray-800 text-sm">{pet.breed}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-[32px] text-center border border-white shadow-sm">
              <Calendar className="mx-auto text-brand-yellow mb-2" size={24}/>
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Yaşı</p>
              <p className="font-black text-gray-800 text-sm">{pet.age}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-[32px] text-center border border-white shadow-sm">
              <MapPin className="mx-auto text-brand-pink mb-2" size={24}/>
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Konum</p>
              <p className="font-black text-gray-800 text-sm">{pet.location}</p>
            </div>
          </div>

          <div className="p-8 bg-brand-pink/5 rounded-[40px] border border-brand-pink/10 relative overflow-hidden">
            <MessageSquareQuote className="absolute -top-4 -left-4 text-brand-pink opacity-10" size={60} />
            <h3 className="text-[10px] font-black text-brand-pink uppercase tracking-widest mb-4">Onun Hikayesi</h3>
            <p className="italic text-gray-600 font-medium leading-relaxed text-lg relative z-10">
              "{pet.story || 'Bize anlatacak çok şeyi var ama önce sana alışması lazım!'}"
            </p>
          </div>

          <button 
            onClick={handleAdoptAction}
            className="w-full bg-gray-900 text-white py-7 rounded-[32px] font-black text-2xl shadow-2xl hover:bg-brand-purple hover:scale-[1.02] active:scale-95 transition-all"
          >
            Beni Ailene Kat 🏠
          </button>
        </div>
      </div>
    </main>
  );
};