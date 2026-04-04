import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, UserPlus, LogIn, Loader2, User as UserIcon, Calendar, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

export const Login = ({ isRegister = false }: { isRegister?: boolean }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const cleanEmail = email.trim();

    try {
      if (isRegister) {
        await register(cleanEmail, password, { firstName, lastName, age, address });
        toast.success("Aramıza hoş geldin! 🚀");
      } else {
        await login(cleanEmail, password);
        toast.success("Tekrar seni görmek harika! ❤️");
      }
      navigate('/');
    } catch (error: any) {
      if (error.message.includes("invalid")) {
        toast.error("Lütfen e-posta adresini doğru yazdığından emin ol. 🐾", { id: 'auth-error' });
      } else {
        toast.error(error.message || "Bir hata oluştu.", { id: 'auth-error' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`${isRegister ? 'max-w-lg' : 'max-w-md'} mx-auto px-4 py-12 md:py-20 relative z-10 transition-all duration-500`}>
      <div className="bg-white/95 backdrop-blur-3xl p-8 md:p-12 rounded-[56px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] border border-white/50">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-purple/10 rounded-[24px] flex items-center justify-center mx-auto mb-5">
            {isRegister ? <UserPlus className="text-brand-purple" size={32} /> : <LogIn className="text-brand-purple" size={32} />}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter leading-none mb-3 notranslate" translate="no">
            {isRegister ? "Kaydol" : "Giriş Yap"}
          </h1>
          <p className="text-gray-400 font-black uppercase text-[9px] tracking-[0.25em]">Adoptly Dünyası</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {isRegister && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-brand-purple tracking-widest ml-4 opacity-70">Ad</label>
                  <div className="relative">
                    <UserIcon className="absolute left-6 top-4.5 text-gray-400" size={20} />
                    <input required type="text" placeholder="Adınız" className="w-full pl-16 p-4.5 rounded-[28px] bg-gray-50 border-2 border-gray-200 font-bold outline-none focus:border-brand-purple/40 focus:bg-white transition-all text-sm shadow-inner" value={firstName} onChange={e => setFirstName(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-brand-purple tracking-widest ml-4 opacity-70">Soyad</label>
                  <div className="relative">
                    <UserIcon className="absolute left-6 top-4.5 text-gray-400" size={20} />
                    <input required type="text" placeholder="Soyadınız" className="w-full pl-16 p-4.5 rounded-[28px] bg-gray-50 border-2 border-gray-200 font-bold outline-none focus:border-brand-purple/40 focus:bg-white transition-all text-sm shadow-inner" value={lastName} onChange={e => setLastName(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2 col-span-1">
                  <label className="text-[10px] font-black uppercase text-brand-purple tracking-widest ml-4 opacity-70">Yaş</label>
                  <div className="relative">
                    <Calendar className="absolute left-6 top-4.5 text-gray-400" size={20} />
                    {/* ✨ DEĞİŞİKLİK: Okları (spinners) gizleyen özel Tailwind sınıfları eklendi */}
                    <input 
                      required 
                      type="number" 
                      min="18" 
                      placeholder="18" 
                      className="w-full pl-16 p-4.5 rounded-[28px] bg-gray-50 border-2 border-gray-200 font-bold outline-none focus:border-brand-purple/40 focus:bg-white transition-all text-sm shadow-inner [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                      value={age} 
                      onChange={e => setAge(e.target.value)} 
                    />
                  </div>
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-black uppercase text-brand-purple tracking-widest ml-4 opacity-70">Şehir / Semt</label>
                  <div className="relative">
                    <MapPin className="absolute left-6 top-4.5 text-gray-400" size={20} />
                    <input required type="text" placeholder="Örn: Kadıköy" className="w-full pl-16 p-4.5 rounded-[28px] bg-gray-50 border-2 border-gray-200 font-bold outline-none focus:border-brand-purple/40 focus:bg-white transition-all text-sm shadow-inner" value={address} onChange={e => setAddress(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-brand-purple tracking-widest ml-4 opacity-70">E-Posta</label>
            <div className="relative">
              <Mail className="absolute left-6 top-4.5 text-gray-400" size={20} />
              <input 
                required 
                type="email" 
                placeholder="merhaba@adoptly.com" 
                className="w-full pl-16 p-4.5 rounded-[28px] bg-gray-50 border-2 border-gray-200 font-bold outline-none focus:border-brand-purple/40 focus:bg-white transition-all text-sm shadow-inner" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-brand-purple tracking-widest ml-4 opacity-70">Şifre</label>
            <div className="relative">
              <Lock className="absolute left-6 top-4.5 text-gray-400" size={20} />
              <input 
                required 
                type="password" 
                placeholder="••••••••" 
                className="w-full pl-16 p-4.5 rounded-[28px] bg-gray-50 border-2 border-gray-200 font-bold outline-none focus:border-brand-purple/40 focus:bg-white transition-all text-sm shadow-inner" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-gray-900 text-white py-5.5 rounded-[28px] font-black text-lg shadow-2xl hover:bg-brand-purple hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 mt-4"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : (isRegister ? "Hemen Başla" : "Pati At 🐾")}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-gray-400 font-bold text-xs">
            {isRegister ? "Hesabın var mı?" : "Hesabın yok mu?"}
            <Link to={isRegister ? "/login" : "/register"} className="block mt-2 text-brand-pink text-[10px] font-black uppercase tracking-widest hover:scale-110 transition-transform">
              {isRegister ? "Giriş Yap" : "Hemen Kaydol"}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};