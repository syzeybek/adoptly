import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const PetCard = ({ pet }: { pet: any }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();
  const favorited = isFavorite(pet.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Favorilere eklemek için önce giriş yapmalısın! 🐾", { id: 'auth-error' });
      navigate('/login');
      return;
    }

    toggleFavorite(pet);
  };

  return (
    <div className="group bg-gradient-to-br from-white to-brand-pink/20 rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(255,102,161,0.08)] hover:shadow-[0_20px_40px_rgb(255,102,161,0.15)] transition-all duration-500 border-none flex flex-col h-full relative transform hover:-translate-y-2">
      
      <button 
        onClick={handleFavoriteClick}
        className={`absolute top-4 right-4 z-20 p-3 rounded-2xl shadow-lg transition-all duration-300 ${
          favorited 
            ? 'bg-red-500 text-white scale-110' 
            : 'bg-white/90 backdrop-blur-md text-brand-pink hover:bg-brand-pink hover:text-white hover:scale-110'
        }`}
      >
        <Heart size={20} fill={favorited ? "currentColor" : "none"} />
      </button>

      <Link to={`/pet/${pet.id}`} className="flex flex-col h-full w-full">
        <div className="w-full p-3 pb-0 shrink-0">
          {/* ✨ KESİN ÇÖZÜM: h-60 yerine aspect-[4/3] kullanarak kutunun esnemesini/kaymasını sonsuza dek engelledik */}
          <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-gray-50">
            <img 
              src={pet.imageUrl || pet.imageurl || pet.image_url} 
              /* will-change-transform eklendi: Animasyon sırasında oluşan milimetrik titremeleri engeller */
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 will-change-transform" 
              alt={pet.name} 
              loading="lazy"
            />
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-3xl font-black text-gray-900 mb-3 tracking-tighter group-hover:text-brand-purple transition-colors notranslate" translate="no">
            {pet.name}
          </h3>
          
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {pet.age && (
              <span className="px-3 py-1 bg-brand-yellow/20 text-yellow-600 rounded-xl text-[10px] font-black uppercase tracking-widest">
                {pet.age}
              </span>
            )}
            {pet.breed && (
              <span className="px-3 py-1 bg-brand-cyan/15 text-cyan-700 rounded-xl text-[10px] font-black uppercase tracking-widest truncate max-w-[120px]">
                {pet.breed}
              </span>
            )}
          </div>

          <div className="flex items-center text-gray-500 gap-1.5 mt-auto pt-4">
            <MapPin size={18} className="text-brand-pink" />
            <span className="text-xs font-bold uppercase tracking-tight">{pet.location}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};