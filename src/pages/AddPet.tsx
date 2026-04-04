import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { generateUniqueStory } from '../utils/storyGenerator';
import { Camera, Type, Info, MapPin, Loader2, BookOpen, PawPrint } from 'lucide-react';
import toast from 'react-hot-toast';

export const AddPet = () => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [story, setStory] = useState('');
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      const MAX_FILE_SIZE = 5 * 1024 * 1024; 

      if (file.size > MAX_FILE_SIZE) {
        toast.error("Fotoğraf boyutu çok yüksek! Lütfen en fazla 5 MB olan bir görsel seç. 📸", { id: 'file-size-error' });
        e.target.value = ''; 
        setImageFile(null);
        return;
      }

      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("İlan vermek için önce giriş yapmalısın! 🐾", { id: 'auth-error' });
      navigate('/login');
      return;
    }

    if (!imageFile) {
      toast.error("Lütfen dostumuzun bir fotoğrafını seç! 📸");
      return;
    }

    setLoading(true);

    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `pet-images/${fileName}`; 

      const { error: uploadError } = await supabase.storage
        .from('pets') 
        .upload(filePath, imageFile);

      if (uploadError) {
        throw new Error("Fotoğraf yüklenemedi: " + uploadError.message);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('pets')
        .getPublicUrl(filePath);

      const finalStory = story.trim() === '' ? generateUniqueStory(name) : story;

      const { error: dbError } = await supabase
        .from('pets')
        .insert([
          { 
            name, 
            breed, 
            age, 
            location, 
            imageUrl: publicUrl, 
            story: finalStory,
            // ✨ KRİTİK EKLENTİ BURASI: İlanın sahibinin kim olduğunu veritabanına yazıyoruz!
            user_id: user.id 
          }
        ]);

      if (dbError) throw dbError;
      
      toast.success(`${name} başarıyla sisteme eklendi! Yeni yuvası onu bekliyor! 🐾`);
      navigate('/'); 
    } catch (error: any) {
      console.error("İlan Ekleme Hatası:", error);
      toast.error(error.message || "İlan eklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-12 md:py-20 relative z-10 transition-all duration-500">
      <div className="bg-white/95 backdrop-blur-3xl p-8 md:p-12 rounded-[56px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] border border-white/50">
        
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-brand-pink/10 rounded-[28px] flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform">
            <PawPrint className="text-brand-pink" size={40} />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none mb-3 notranslate" translate="no">
            Yeni İlan Ver
          </h1>
          <p className="text-gray-400 font-black uppercase text-[10px] tracking-[0.25em]">Bir Dostumuza Yuva Ol</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-brand-purple tracking-widest ml-4 opacity-70">İsim</label>
              <div className="relative">
                <Type className="absolute left-6 top-4.5 text-gray-400" size={20} />
                <input 
                  required 
                  type="text" 
                  placeholder="Örn: Tarçın" 
                  className="w-full pl-16 p-4.5 rounded-[28px] bg-gray-50 border-2 border-gray-200 font-bold outline-none focus:border-brand-purple/40 focus:bg-white transition-all text-sm shadow-inner" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-brand-purple tracking-widest ml-4 opacity-70">Cinsi</label>
              <div className="relative">
                <Info className="absolute left-6 top-4.5 text-gray-400" size={20} />
                <input 
                  required 
                  type="text" 
                  placeholder="Örn: Tekir" 
                  className="w-full pl-16 p-4.5 rounded-[28px] bg-gray-50 border-2 border-gray-200 font-bold outline-none focus:border-brand-purple/40 focus:bg-white transition-all text-sm shadow-inner" 
                  value={breed} 
                  onChange={e => setBreed(e.target.value)} 
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2 col-span-1">
              <label className="text-[10px] font-black uppercase text-brand-purple tracking-widest ml-4 opacity-70">Yaş</label>
              <div className="relative">
                <input 
                  required 
                  type="text" 
                  placeholder="Örn: 2 Aylık" 
                  className="w-full pl-6 p-4.5 rounded-[28px] bg-gray-50 border-2 border-gray-200 font-bold outline-none focus:border-brand-purple/40 focus:bg-white transition-all text-sm shadow-inner text-center" 
                  value={age} 
                  onChange={e => setAge(e.target.value)} 
                />
              </div>
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-[10px] font-black uppercase text-brand-purple tracking-widest ml-4 opacity-70">Konum</label>
              <div className="relative">
                <MapPin className="absolute left-6 top-4.5 text-gray-400" size={20} />
                <input 
                  required 
                  type="text" 
                  placeholder="Örn: Kadıköy, İstanbul" 
                  className="w-full pl-16 p-4.5 rounded-[28px] bg-gray-50 border-2 border-gray-200 font-bold outline-none focus:border-brand-purple/40 focus:bg-white transition-all text-sm shadow-inner" 
                  value={location} 
                  onChange={e => setLocation(e.target.value)} 
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-4 mr-2">
              <label className="text-[10px] font-black uppercase text-brand-purple tracking-widest opacity-70">Fotoğraf Yükle</label>
              <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest bg-gray-100 px-2 py-1 rounded-lg">Maks 5MB</span>
            </div>
            <div className="relative">
              <Camera className="absolute left-6 top-4.5 text-gray-400" size={20} />
              <input 
                required 
                type="file" 
                accept="image/*"
                className="w-full pl-16 p-3.5 rounded-[28px] bg-gray-50 border-2 border-gray-200 font-bold outline-none focus:border-brand-purple/40 focus:bg-white transition-all text-sm shadow-inner file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-brand-purple/10 file:text-brand-purple hover:file:bg-brand-purple/20 file:cursor-pointer cursor-pointer" 
                onChange={handleImageChange} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-4 mr-2">
              <label className="text-[10px] font-black uppercase text-brand-purple tracking-widest opacity-70">Onun Hikayesi</label>
              <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest bg-gray-100 px-2 py-1 rounded-lg">Opsiyonel</span>
            </div>
            <div className="relative">
              <BookOpen className="absolute left-6 top-5 text-gray-400" size={20} />
              <textarea 
                rows={4}
                placeholder="Bu alanı boş bırakırsanız, akıllı sistemimiz onun için harika bir Türkçe hikaye yazacaktır..." 
                className="w-full pl-16 p-4.5 rounded-[32px] bg-gray-50 border-2 border-gray-200 font-bold outline-none focus:border-brand-purple/40 focus:bg-white transition-all text-sm shadow-inner resize-none leading-relaxed" 
                value={story} 
                onChange={e => setStory(e.target.value)} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-brand-pink text-white py-6 rounded-[32px] font-black text-xl shadow-2xl hover:bg-brand-purple hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 mt-6"
          >
            {loading ? <Loader2 className="animate-spin" size={28} /> : "Dostumuzu Sisteme Ekle 🐾"}
          </button>
        </form>

      </div>
    </main>
  );
};