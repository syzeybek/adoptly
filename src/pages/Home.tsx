import { useState, useMemo, useEffect } from 'react';
import { usePets } from '../hooks/usePets';
import { PetCard } from '../components/PetCard';
import { Search, MapPin, PawPrint, X, Loader2 } from 'lucide-react';

export const Home = () => {
  // Supabase'den tüm ilanları çekiyoruz
  const { data: pets, isLoading, error } = usePets();
  
  // Filtreleme State'leri
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Hepsi');
  const [selectedBreed, setSelectedBreed] = useState('Hepsi');

  // 🛠 DEBUG: Gelen veriyi konsolda kontrol etmek için (İşlem tamamlanınca silebilirsin)
  useEffect(() => {
    if (pets) {
      console.log("Victus Veri Kontrolü - Gelen İlanlar:", pets);
    }
  }, [pets]);

  // 🐾 DİNAMİK FİLTRE SEÇENEKLERİNİ OLUŞTURMA
  // Veritabanındaki ilanlardan benzersiz şehir ve cins listesini çıkarır
  const { uniqueLocations, uniqueBreeds } = useMemo(() => {
    if (!pets || !Array.isArray(pets)) return { uniqueLocations: [], uniqueBreeds: [] };

    // Şehirleri ayıkla (Boş olanları ve null değerleri temizle)
    const locations = Array.from(new Set(pets.map((p: any) => p.location || p.Location)))
      .filter(loc => loc && loc.trim() !== '')
      .sort();

    // Cinsleri ayıkla
    const breeds = Array.from(new Set(pets.map((p: any) => p.breed || p.Breed)))
      .filter(br => br && br.trim() !== '')
      .sort();

    return { uniqueLocations: locations, uniqueBreeds: breeds };
  }, [pets]);

  // 🔍 AKILLI FİLTRELEME MANTIĞI
  // Arama terimine, şehre ve cinse göre listeyi süzer
  const filteredPets = useMemo(() => {
    if (!pets || !Array.isArray(pets)) return [];
    
    return pets.filter((pet: any) => {
      // Güvenlik: Veriler null gelirse patlamaması için (Optional Chaining)
      const name = (pet.name || '').toLowerCase();
      const breed = (pet.breed || '').toLowerCase();
      const location = pet.location || '';
      const search = searchTerm.toLowerCase();

      const matchesSearch = name.includes(search) || breed.includes(search);
      const matchesLocation = selectedLocation === 'Hepsi' || location === selectedLocation;
      const matchesBreed = selectedBreed === 'Hepsi' || (pet.breed || '') === selectedBreed;

      return matchesSearch && matchesLocation && matchesBreed;
    });
  }, [pets, searchTerm, selectedLocation, selectedBreed]);

  // 1. Yüklenme Ekranı
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 text-brand-purple animate-spin" />
        <p className="font-black text-gray-400 uppercase tracking-widest animate-pulse">Dostlarımız Getiriliyor...</p>
      </div>
    );
  }

  // 2. Hata Durumu
  if (error) {
    return (
      <div className="p-20 text-center">
        <p className="text-red-500 font-bold text-xl">Bir hata oluştu! 😿</p>
        <p className="text-gray-400 mt-2">{(error as any).message}</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* ÜST BÖLÜM: ARAMA VE FİLTRELEME */}
      <section className="mb-12 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* Arama Kutusu */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="İsim veya cins ara..."
              className="w-full pl-12 pr-4 py-4 rounded-3xl bg-white shadow-sm border-none focus:ring-2 ring-brand-purple/20 font-bold transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Dinamik Şehir Seçici */}
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-pink" size={18} />
            <select 
              className="pl-12 pr-10 py-4 rounded-3xl bg-white shadow-sm border-none focus:ring-2 ring-brand-pink/20 font-bold appearance-none cursor-pointer min-w-[180px]"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="Hepsi">Tüm Şehirler</option>
              {uniqueLocations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Dinamik Cins Seçici */}
          <div className="relative">
            <PawPrint className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-purple" size={18} />
            <select 
              className="pl-12 pr-10 py-4 rounded-3xl bg-white shadow-sm border-none focus:ring-2 ring-brand-purple/20 font-bold appearance-none cursor-pointer min-w-[180px]"
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
            >
              <option value="Hepsi">Tüm Cinsler</option>
              {uniqueBreeds.map(breed => (
                <option key={breed} value={breed}>{breed}</option>
              ))}
            </select>
          </div>

          {/* Temizle Butonu (Filtre aktifse görünür) */}
          {(searchTerm || selectedLocation !== 'Hepsi' || selectedBreed !== 'Hepsi') && (
            <button 
              onClick={() => { setSearchTerm(''); setSelectedLocation('Hepsi'); setSelectedBreed('Hepsi'); }}
              className="p-4 bg-white hover:bg-red-50 text-red-400 rounded-3xl transition-all shadow-sm border border-red-50"
              title="Filtreleri Sıfırla"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </section>

      {/* ALT BÖLÜM: İLANLAR GRİDİ */}
      {filteredPets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in duration-700">
          {filteredPets.map((pet: any) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white/40 backdrop-blur-sm rounded-[40px] border-2 border-dashed border-gray-100">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <PawPrint className="text-gray-300" size={32} />
          </div>
          <p className="text-xl font-black text-gray-400 uppercase tracking-widest">
            {pets && pets.length === 0 
              ? "Henüz hiç ilan verilmemiş. İlk dostumuzu sen ekle! 🐾" 
              : "Aradığın kriterlerde bir dost bulamadık 😿"}
          </p>
        </div>
      )}
    </main>
  );
};