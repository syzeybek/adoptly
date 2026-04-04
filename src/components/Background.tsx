import { PawPrint, Cat, Dog, Rabbit, Fish, Bird, Heart } from 'lucide-react';

export const Background = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden select-none" style={{ zIndex: -1 }}>
      
      {/* ÜST BÖLÜM - Küçük ve Saydam Damgalar */}
      <div className="pet-stamp absolute top-[5%] left-[8%] text-white/20 animate-float-1"><Cat size={24} /></div>
      <div className="pet-stamp absolute top-[15%] left-[35%] text-white/10 animate-float-2"><Bird size={20} /></div>
      <div className="pet-stamp absolute top-[10%] right-[15%] text-white/20 animate-float-3"><Dog size={35} /></div>
      <div className="pet-stamp absolute top-[25%] right-[5%] text-white/20 animate-float-1"><PawPrint size={18} /></div>
      <div className="pet-stamp absolute top-[18%] left-[20%] text-white/10 animate-pulse"><Heart size={15} fill="currentColor" /></div>

      {/* ORTA BÖLÜM */}
      <div className="pet-stamp absolute top-[45%] left-[5%] text-white/20 animate-float-3"><Rabbit size={32} /></div>
      <div className="pet-stamp absolute top-[40%] right-[25%] text-white/10 animate-float-1"><Fish size={26} /></div>
      <div className="pet-stamp absolute top-[55%] left-[25%] text-white/10 animate-float-2"><PawPrint size={22} /></div>
      <div className="pet-stamp absolute top-[50%] right-[10%] text-white/20 animate-float-3"><Cat size={28} /></div>
      <div className="pet-stamp absolute top-[35%] left-[45%] text-white/10 animate-float-1"><Bird size={30} /></div>

      {/* ALT BÖLÜM */}
      <div className="pet-stamp absolute bottom-[10%] left-[12%] text-white/20 animate-float-2"><Dog size={34} /></div>
      <div className="pet-stamp absolute bottom-[20%] right-[15%] text-white/20 animate-float-1"><Rabbit size={30} /></div>
      <div className="pet-stamp absolute bottom-[15%] left-[40%] text-white/10 animate-float-3"><PawPrint size={24} /></div>
      <div className="pet-stamp absolute bottom-[25%] left-[20%] text-white/20 animate-float-2"><Fish size={22} /></div>
      <div className="pet-stamp absolute bottom-[5%] right-[40%] text-white/10 animate-pulse"><Heart size={18} fill="currentColor" /></div>

      {/* EKSTRA SERPİŞTİRMELER */}
      <div className="pet-stamp absolute top-[75%] left-[10%] text-white/10 animate-float-1"><PawPrint size={16} /></div>
      <div className="pet-stamp absolute top-[30%] right-[45%] text-white/10 animate-float-2"><Bird size={18} /></div>
      <div className="pet-stamp absolute bottom-[40%] right-[5%] text-white/10 animate-float-3"><PawPrint size={20} /></div>
      <div className="pet-stamp absolute top-[60%] right-[40%] text-white/10 animate-float-1"><Rabbit size={25} /></div>
      
    </div>
  );
};