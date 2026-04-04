import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, PawPrint, FileText, LogOut, Clock, CheckCircle, Loader2, Edit2, Trash2, X, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'listings' | 'applications'>('listings');
  
  const [applications, setApplications] = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingPet, setEditingPet] = useState<any | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoading(true);
      
      try {
        const { data: appData, error: appError } = await supabase
          .from('applications')
          .select(`id, status, created_at, pets (*)`)
          .eq('user_id', user.id);

        if (appError) console.error("Başvuru Çekme Hatası:", appError);
        else if (appData) setApplications(appData);

        const { data: listData, error: listError } = await supabase
          .from('pets')
          .select('*')
          .eq('user_id', user.id);

        if (listError) console.error("İlan Çekme Hatası:", listError);
        else if (listData) setListings(listData);

      } catch (err) {
        console.error("Genel Hata:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleDeleteListing = async (petId: string, petName: string) => {
    if (!window.confirm(`${petName} isimli dostumuzun ilanını silmek istediğine emin misin?`)) return;

    try {
      const { error } = await supabase.from('pets').delete().eq('id', petId);
      if (error) throw error;
      
      setListings(prev => prev.filter(pet => pet.id !== petId));
      toast.success(`${petName} ilanı başarıyla kaldırıldı.`);
    } catch (error: any) {
      toast.error("İlan silinirken bir hata oluştu.");
    }
  };

  const handleUpdateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);

    try {
      const { error } = await supabase
        .from('pets')
        .update({
          name: editingPet.name,
          breed: editingPet.breed,
          age: editingPet.age,
          location: editingPet.location,
          story: editingPet.story
        })
        .eq('id', editingPet.id);

      if (error) throw error;

      setListings(prev => prev.map(pet => pet.id === editingPet.id ? editingPet : pet));
      setEditingPet(null);
      toast.success(`${editingPet.name} ilanı başarıyla güncellendi! 🐾`);
    } catch (error: any) {
      toast.error("Güncelleme başarısız oldu.");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (!user) return null;

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 relative z-10">
      {/* ÜST BÖLÜM: Profil Kartı */}
      <div className="bg-white/90 backdrop-blur-3xl rounded-[48px] p-8 md:p-12 shadow-2xl border border-white/50 flex flex-col md:flex-row items-center justify-between gap-8 mb-10 relative overflow-hidden">
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-24 h-24 bg-gradient-to-br from-brand-pink to-brand-purple rounded-full p-1 flex items-center justify-center shadow-lg">
            <div className="bg-white w-full h-full rounded-full flex items-center justify-center">
              <User size={40} className="text-brand-purple" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight notranslate" translate="no">Kullanıcı Profili</h1>
            <p className="text-gray-500 font-bold">{user.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white px-6 py-3 rounded-2xl font-black transition-all flex items-center gap-2 shadow-sm">
          <LogOut size={20} /> Çıkış Yap
        </button>
      </div>

      {/* SEKME MENÜSÜ */}
      <div className="flex gap-4 mb-8 bg-white/50 p-2 rounded-[24px] backdrop-blur-md w-max shadow-sm border border-white mx-auto md:mx-0">
        <button onClick={() => setActiveTab('listings')} className={`px-8 py-3 rounded-2xl font-black text-sm flex items-center gap-2 transition-all ${activeTab === 'listings' ? 'bg-white text-brand-purple shadow-md' : 'text-gray-500 hover:bg-white/50'}`}>
          <PawPrint size={18} /> İlanlarım
        </button>
        <button onClick={() => setActiveTab('applications')} className={`px-8 py-3 rounded-2xl font-black text-sm flex items-center gap-2 transition-all ${activeTab === 'applications' ? 'bg-white text-brand-pink shadow-md' : 'text-gray-500 hover:bg-white/50'}`}>
          <FileText size={18} /> Başvurularım
        </button>
      </div>

      {/* İÇERİK ALANI */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 shadow-xl border border-white/50 min-h-[40vh]">
        
        {/* === İLANLARIM EKRANI === */}
        {activeTab === 'listings' && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Yayındaki İlanların</h2>
              {/* ✨ YENİ: İlan ekleme butonunu başlığın yanına sabitledik */}
              <button 
                onClick={() => navigate('/add-pet')}
                className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-brand-purple hover:scale-105 transition-all shadow-lg"
              >
                <Plus size={18} /> Yeni İlan Ekle 🐾
              </button>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12"><Loader2 className="animate-spin text-brand-purple" size={32} /></div>
            ) : listings.length === 0 ? (
              <div className="text-center py-20 bg-gray-50/50 rounded-[32px] border-2 border-dashed border-gray-200">
                <PawPrint className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500 font-bold">Henüz bir ilan açmadın.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {listings.map((pet) => (
                  <div key={pet.id} className="bg-white p-5 rounded-[32px] shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <img src={pet.imageUrl || pet.imageurl || pet.image_url} alt="" className="w-20 h-20 rounded-[24px] object-cover bg-gray-100 shadow-inner" />
                      <div>
                        <h3 className="font-black text-gray-900 text-xl tracking-tight">{pet.name}</h3>
                        <p className="text-xs font-bold text-brand-purple uppercase tracking-widest">{pet.breed}</p>
                        <p className="text-xs font-medium text-gray-400 mt-1">{pet.location}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-auto pt-2 border-t border-gray-50">
                      <button 
                        onClick={() => setEditingPet(pet)}
                        className="flex-1 bg-brand-cyan/10 text-cyan-700 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-cyan hover:text-white transition-colors"
                      >
                        <Edit2 size={16} /> Düzenle
                      </button>
                      <button 
                        onClick={() => handleDeleteListing(pet.id, pet.name)}
                        className="flex-1 bg-red-50 text-red-500 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={16} /> Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* === BAŞVURULARIM EKRANI === */}
        {activeTab === 'applications' && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Sahiplenme Başvuruların</h2>
            {loading ? (
              <div className="flex justify-center py-12"><Loader2 className="animate-spin text-brand-pink" size={32} /></div>
            ) : applications.length === 0 ? (
              <div className="text-center py-20 bg-gray-50/50 rounded-[32px] border-2 border-dashed border-gray-200">
                <FileText className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500 font-bold mb-4">Henüz hiçbir başvuruda bulunmadın.</p>
                <button onClick={() => navigate('/')} className="bg-brand-pink text-white px-6 py-3 rounded-2xl font-black shadow-lg transition-all">Dostları Keşfet ❤️</button>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="bg-white p-4 rounded-[28px] shadow-sm border border-gray-100 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                      <img src={app.pets?.imageUrl || app.pets?.imageurl || app.pets?.image_url} alt="" className="w-16 h-16 rounded-[20px] object-cover bg-gray-100" />
                      <div>
                        <h3 className="font-black text-gray-900 text-lg">{app.pets?.name || 'Bilinmeyen Dost'}</h3>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                          {new Date(app.created_at).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-xl flex items-center gap-2 font-black text-xs uppercase tracking-widest ${
                      app.status === 'pending' ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-500'
                    }`}>
                      {app.status === 'pending' ? <Clock size={16} /> : <CheckCircle size={16} />}
                      {app.status === 'pending' ? 'Değerlendirmede' : 'Onaylandı!'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* DÜZENLEME MODALI */}
      {editingPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[40px] p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setEditingPet(null)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 bg-gray-50 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">İlanı Düzenle</h3>
            <form onSubmit={handleUpdateListing} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-brand-purple tracking-widest ml-2 opacity-70">İsim</label>
                  <input required type="text" className="w-full p-3.5 rounded-[20px] bg-gray-50 border-2 border-gray-200 font-bold outline-none focus:border-brand-purple/40 text-sm" value={editingPet.name} onChange={e => setEditingPet({...editingPet, name: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-brand-purple tracking-widest ml-2 opacity-70">Cinsi</label>
                  <input required type="text" className="w-full p-3.5 rounded-[20px] bg-gray-50 border-2 border-gray-200 font-bold outline-none focus:border-brand-purple/40 text-sm" value={editingPet.breed} onChange={e => setEditingPet({...editingPet, breed: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-brand-purple tracking-widest ml-2 opacity-70">Yaş</label>
                  <input required type="text" className="w-full p-3.5 rounded-[20px] bg-gray-50 border-2 border-gray-200 font-bold outline-none focus:border-brand-purple/40 text-sm" value={editingPet.age} onChange={e => setEditingPet({...editingPet, age: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-brand-purple tracking-widest ml-2 opacity-70">Konum</label>
                  <input required type="text" className="w-full p-3.5 rounded-[20px] bg-gray-50 border-2 border-gray-200 font-bold outline-none focus:border-brand-purple/40 text-sm" value={editingPet.location} onChange={e => setEditingPet({...editingPet, location: e.target.value})} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-brand-purple tracking-widest ml-2 opacity-70">Hikayesi</label>
                <textarea rows={3} className="w-full p-3.5 rounded-[20px] bg-gray-50 border-2 border-gray-200 font-bold outline-none focus:border-brand-purple/40 text-sm resize-none" value={editingPet.story} onChange={e => setEditingPet({...editingPet, story: e.target.value})} />
              </div>
              <button 
                type="submit" 
                disabled={updateLoading}
                className="w-full bg-gray-900 text-white py-4 rounded-[20px] font-black text-sm shadow-xl hover:bg-brand-purple hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
              >
                {updateLoading ? <Loader2 className="animate-spin" size={20} /> : "Değişiklikleri Kaydet"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};