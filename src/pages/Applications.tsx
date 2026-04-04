import { useApplications } from '../hooks/useApplications';
import { ClipboardList, Clock, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * BAŞVURULARIM SAYFASI
 * Kullanıcının hangi hayvan için ne zaman başvurduğunu 
 * ve başvurunun güncel durumunu takip ettiği sayfadır.
 */
export const Applications = () => {
  const { applications } = useApplications();

  // Durum renklerini ve ikonlarını belirleyen yardımcı fonksiyon
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Onaylandı':
        return { bg: 'bg-green-100', text: 'text-green-700', icon: <CheckCircle2 size={16} /> };
      case 'Reddedildi':
        return { bg: 'bg-red-100', text: 'text-red-700', icon: <XCircle size={16} /> };
      default: // 'Beklemede'
        return { bg: 'bg-brand-yellow/20', text: 'text-yellow-700', icon: <Clock size={16} /> };
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Sayfa Başlığı ve İkonu */}
      <header className="flex items-center gap-4 mb-12">
        <div className="p-4 bg-brand-cyan/10 rounded-3xl text-brand-cyan shadow-sm">
          <ClipboardList size={36} />
        </div>
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Başvurularım</h1>
          <p className="text-gray-500 font-bold italic">Sahiplenme sürecindeki tüm adımların burada.</p>
        </div>
      </header>

      {/* Başvuru Listesi */}
      {applications.length === 0 ? (
        // EĞER BAŞVURU YOKSA GÖRÜNECEK KISIM
        <div className="bg-white/40 backdrop-blur-sm p-20 rounded-4xl text-center border-2 border-dashed border-gray-200 flex flex-col items-center gap-4">
          <div className="text-6xl grayscale opacity-50">🐾</div>
          <p className="text-gray-400 font-black text-xl italic">Henüz bir dostumuz için başvuru yapmamışsın.</p>
          <Link to="/" className="mt-2 text-brand-purple font-black hover:underline underline-offset-4">
            Hadi, ilk adımı ana sayfada atalım!
          </Link>
        </div>
      ) : (
        // EĞER BAŞVURU VARSA LİSTELENECEK KISIM
        <div className="grid gap-6">
          {applications.map((app, index) => {
            const statusStyle = getStatusStyle(app.status);
            
            return (
              <div 
                key={index} 
                className="bg-white/80 backdrop-blur-md p-5 rounded-3xl border border-white shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 group"
              >
                {/* Hayvanın Küçük Resmi */}
                <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md shrink-0">
                  <img 
                    src={app.petImage} 
                    alt={app.petName} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>

                {/* Başvuru Detayları */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl font-black text-gray-800 leading-none mb-1">
                    {app.petName}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Başvuru Tarihi: {app.date}
                    </span>
                  </div>
                </div>

                {/* Durum Rozeti (Badge) */}
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className={`flex items-center gap-2 ${statusStyle.bg} ${statusStyle.text} px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-tight shadow-sm`}>
                    {statusStyle.icon}
                    {app.status}
                  </div>
                  
                  {/* Detaya Gitme İkonu */}
                  <Link to={`/pet/${app.petId}`} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-brand-purple hover:bg-white transition-all shadow-sm">
                    <ChevronRight size={20} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Alt Bilgi Notu */}
      <footer className="mt-12 text-center">
        <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">
          Adoptly • Bir Pati, Bir Mutluluk ❤️
        </p>
      </footer>
    </main>
  );
};