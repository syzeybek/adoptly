import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, User, LogOut } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="max-w-7xl mx-auto px-4 py-10 flex justify-between items-center relative z-20">
      {/* 🛡️ notranslate ve translate="no" eklendi, tasarım aynı */}
      <Link 
        to="/" 
        className="text-5xl md:text-7xl font-black text-white tracking-tighter hover:scale-105 transition-transform duration-500 select-none notranslate"
        translate="no"
      >
        Adoptly<span className="text-brand-yellow">.</span>
      </Link>

      <div className="flex items-center gap-6">
        {user ? (
          <>
            <Link to="/favorites" className="p-4 bg-white/20 backdrop-blur-xl rounded-[24px] text-white hover:bg-white/30 transition-all shadow-lg border border-white/20">
              <Heart size={28} />
            </Link>
            <Link to="/profile" className="p-4 bg-white/20 backdrop-blur-xl rounded-[24px] text-white hover:bg-white/30 transition-all shadow-lg border border-white/20">
              <User size={28} />
            </Link>
            <button onClick={logout} className="p-4 bg-red-500/80 backdrop-blur-xl rounded-[24px] text-white hover:bg-red-600 transition-all shadow-lg">
              <LogOut size={28} />
            </button>
          </>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="px-8 py-4 bg-white/20 backdrop-blur-xl text-white rounded-[28px] font-black text-lg hover:bg-white/30 transition-all border border-white/20 shadow-xl">
              Giriş Yap
            </Link>
            <Link to="/register" className="px-8 py-4 bg-brand-pink text-white rounded-[28px] font-black text-lg shadow-2xl hover:scale-105 hover:bg-brand-pink/90 transition-all">
              Kaydol
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};