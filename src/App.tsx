import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { Navbar } from './components/Navbar';
import { Background } from './components/Background';
import { Home } from './pages/Home';
import { PetDetail } from './pages/PetDetail';
import { AddPet } from './pages/AddPet';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Favorites } from './pages/Favorites';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <div className="min-h-screen relative"> 
              <Background /> {/* 🐾 Mühür ikonlu damgalı arka planın burada */}
              <Navbar />
              <div className="relative z-10">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/pet/:id" element={<PetDetail />} />
                  <Route path="/add-pet" element={<AddPet />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/login" element={<Login isRegister={false} />} />
                  <Route path="/register" element={<Login isRegister={true} />} />
                </Routes>
              </div>
              <Toaster position="bottom-right" />
            </div>
          </BrowserRouter>
        </FavoritesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;