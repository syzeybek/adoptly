import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Heart } from 'lucide-react';

export const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 1. Mevcut kullanıcıları çek
    const allUsers = JSON.parse(localStorage.getItem('adoptly_all_users') || '[]');

    // 2. E-posta kontrolü
    const userExists = allUsers.find((u: any) => u.email === formData.email);
    if (userExists) {
      setError('Bu e-posta adresi zaten kayıtlı! 😿');
      return;
    }

    // 3. Yeni kullanıcıyı listeye ekle ve kaydet
    const updatedUsers = [...allUsers, formData];
    localStorage.setItem('adoptly_all_users', JSON.stringify(updatedUsers));

    // 4. Oturumu aç ve ana sayfaya git
    login(formData); 
    navigate('/');
  };

  return (
    <main className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-4xl shadow-2xl border border-white text-center">
        <div className="inline-block p-4 bg-brand-pink/10 rounded-full mb-4 text-brand-pink"><Heart size={32} fill="currentColor" /></div>
        <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Aramıza Katıl!</h1>
        <p className="text-gray-500 font-bold mb-8 italic">Bir canın hayatını değiştirmeye hazır mısın?</p>

        {error && <div className="mb-6 p-4 bg-red-100 text-red-600 rounded-2xl font-bold text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-3.5 text-brand-pink" size={20} />
            <input 
              type="text" placeholder="Adın Soyadın" required
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-gray-100 focus:border-brand-pink outline-none font-bold"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-brand-cyan" size={20} />
            <input 
              type="email" placeholder="E-posta Adresin" required
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-gray-100 focus:border-brand-cyan outline-none font-bold"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-brand-purple" size={20} />
            <input 
              type="password" placeholder="Şifren" required
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-gray-100 focus:border-brand-purple outline-none font-bold"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button className="w-full bg-brand-pink text-white py-4 rounded-2xl font-black shadow-lg shadow-brand-pink/20 hover:scale-[1.02] active:scale-95 transition-all mt-4">
            Üye Ol ve Başla! 🐾
          </button>
        </form>
        <p className="mt-6 text-xs font-black text-gray-400 uppercase tracking-widest">
          Zaten üye misin? <Link to="/login" className="text-brand-purple underline">Giriş Yap</Link>
        </p>
      </div>
    </main>
  );
};