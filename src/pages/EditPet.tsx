import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePet, useUpdatePet } from '../hooks/usePets';
import { useAuth } from '../context/AuthContext';
import { Camera, MapPin, Save, ArrowLeft, X } from 'lucide-react';
import { fileToBase64 } from '../utils/fileHelpers'; // Yazdığımız yardımcı fonksiyon
import toast from 'react-hot-toast';

export const EditPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: pet, isLoading } = usePet(id);
  const updatePetMutation = useUpdatePet();

  const [formData, setFormData] = useState<any>(null);

  // Veri yüklendiğinde formu doldur
  useEffect(() => {
    if (pet) setFormData(pet);
  }, [pet]);

  if (isLoading || !formData) return <div className="p-20 text-center font-black italic">Bilgiler getiriliyor... 🐾</div>;

  // Güvenlik Kontrolü
  if (pet.ownerEmail !== user?.email) {
    return <div className="p-20 text-center font-black text-red-500">Bu ilanı düzenleme yetkiniz yok! ⛔</div>;
  }

  // Fotoğraf Değiştirme Fonksiyonu
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB Sınırı
        toast.error("Resim çok büyük! (Max 1MB) 😿");
        return;
      }
      try {
        const base64 = await fileToBase64(file);
        setFormData({ ...formData, imageUrl: base64 });
        toast.success("Fotoğraf güncellendi! 📸");
      } catch (err) {
        toast.error("Yükleme başarısız.");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePetMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Değişiklikler kaydedildi! ✨");
        navigate('/profile');
      }
    });
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-brand-purple font-black mb-6 hover:-translate-x-1 transition-transform">
        <ArrowLeft size={20} /> Vazgeç
      </button>

      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-4xl shadow-2xl border border-white">
        <h1 className="text-4xl font-black text-gray-900 mb-8">İlanı Düzenle</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* FOTOĞRAF DÜZENLEME ALANI */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 ml-2">Dostunun Fotoğrafı</label>
            <div className="relative group">
              {/* Eğer formda bir resim varsa onu göster */}
              {formData.imageUrl ? (
                <div className="relative w-full h-64 rounded-3xl overflow-hidden shadow-md">
                  <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Önizleme" />
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, imageUrl: ''})}
                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                /* Resim yoksa yükleme alanını göster */
                <label className="flex flex-col items-center justify-center w-full h-64 bg-gray-50 border-4 border-dashed border-gray-200 rounded-3xl cursor-pointer hover:bg-gray-100 transition-all">
                  <Camera size={40} className="text-brand-purple mb-2" />
                  <p className="text-sm font-black text-gray-500">Yeni Fotoğraf Seç</p>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              )}
            </div>
          </div>

          {/* DİĞER BİLGİ ALANLARI */}
          <div className="grid grid-cols-2 gap-4">
            <input required value={formData.name} className="w-full p-4 rounded-2xl bg-gray-100 border-none font-bold" 
              onChange={e => setFormData({...formData, name: e.target.value})} />
            <input required value={formData.breed} className="w-full p-4 rounded-2xl bg-gray-100 border-none font-bold" 
              onChange={e => setFormData({...formData, breed: e.target.value})} />
          </div>

          <button type="submit" className="w-full bg-brand-cyan text-white py-5 rounded-3xl font-black text-lg shadow-xl hover:scale-[1.02] transition-all">
            Güncellemeleri Kaydet ✨
          </button>
        </form>
      </div>
    </main>
  );
};