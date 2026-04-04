# Web Frontend Görev Dağılımı

**Web Frontend Adresi:** (https://adoptly-liard.vercel.app/)

Bu dokümanda, web uygulamasının kullanıcı arayüzü (UI) ve kullanıcı deneyimi (UX) görevleri listelenmektedir.



## Genel Web Frontend Prensipleri



1. Responsive Tasarım
Mobile-First Approach: Tasarım süreci önce mobil cihazlar için optimize edilmiş, ardından md ve lg breakpointleri ile masaüstü görünüme genişletilmiştir.

Breakpoints: Tailwind CSS varsayılanları kullanılarak; Mobil (<768px), Tablet (768px-1024px) ve Desktop (>1024px) geçişleri sağlanmıştır.

Flexible Layouts: Sayfa yapısı ve ilan kartları için CSS Grid ve Flexbox mimarisi tercih edilerek esneklik sağlanmıştır.

Touch-Friendly: İlan ekleme formlarındaki butonlar ve navigasyon elemanları mobil kullanıcılar için minimum 44x44px dokunma alanına sahiptir.

2. Tasarım Sistemi
CSS Framework: Hızlı ve özelleştirilebilir bir arayüz için Tailwind CSS kullanılmıştır.

Renk Paleti: Evcil hayvan sahiplendirme ruhuna uygun soft ve güven veren renkler (Secondary, Accent, Danger) CSS değişkenleri ve Tailwind sınıfları ile tutarlı bir şekilde dağıtılmıştır.

Tipografi: Okunabilirliği yüksek modern fontlar (Inter/Roboto ailesi) hiyerarşik bir yapıda (H1-H6) kullanılmıştır.

Iconography: Minimalist ve vektörel ikonlar için Lucide-React kütüphanesi tercih edilmiştir.

3. Performans Optimizasyonu
Asset Management: Vite'in modern paketleme stratejisi kullanılarak JS ve CSS dosyaları minify edilmiştir.

Image Optimization: İlan görselleri için 5 MB sınırı ve client-side tip kontrolü uygulanarak gereksiz bant genişliği kullanımı engellenmiştir.

Lazy Loading: Sayfa geçişlerinde ve ağır bileşenlerde React'in performans optimizasyonları göz önünde bulundurulmuştur.

Dependency Control: .npmrc konfigürasyonu ile paketler arasındaki versiyon çatışmaları (Vite 8 - Tailwind 4) optimize edilmiştir.

4. SEO (Search Engine Optimization)
Semantic HTML: Sayfa yapısı header, main, section, article ve footer gibi anlamsal etiketlerle kurgulanmıştır.

Meta Tags: Her ilan ve sayfa için dinamik title ve description yapıları planlanmıştır.

Alt Text: Görme engelli kullanıcılar ve arama motorları için ilan görsellerinde betimleyici alt nitelikleri kullanılmıştır.

5. Erişilebilirlik (Accessibility)
Keyboard Navigation: Tüm form elemanları ve butonlar Tab tuşu ile erişilebilir durumdadır.

Focus Indicators: Etkileşimli elemanlarda görünür odaklanma (focus) durumları korunmuştur.

Color Contrast: Yazı ve arka plan renkleri arasında okunabilirliği artıran yüksek kontrast oranları tercih edilmiştir.

6. Browser Compatibility
Modern Browsers: Chrome, Firefox, Safari ve Edge'in güncel versiyonları hedef alınmıştır.

Vite Integration: Vite'in dahili Autoprefixer ve CSS prefixing desteği ile tarayıcılar arası stil uyumluluğu sağlanmıştır.

7. State Management
Global State: Kullanıcı oturum bilgileri (Auth State) ve genel uygulama durumu için Supabase Auth entegrasyonu ile merkezi bir yapı kurulmuştur.

Local State: Form verileri ve filtreleme işlemleri için React'in useState ve useReducer hookları kullanılmıştır.

Form State: İlan ekleme ve düzenleme süreçlerinde karmaşık form verileri dinamik olarak yönetilmektedir.

8. Routing
Client-Side Routing: Uygulama içi gezinti için React Router DOM kullanılmıştır.

Protected Routes: Sadece giriş yapmış kullanıcıların erişebileceği (İlan ekle, İlan düzenle) korumalı rotalar oluşturulmuştur.

404 Handling: Geçersiz URL'ler için kullanıcıyı ana sayfaya yönlendiren özel hata sayfaları mevcuttur.

9. API Entegrasyonu
Backend Service: Veritabanı, Auth ve Storage işlemleri için Supabase Client SDK'sı kullanılmıştır.

Error Handling: API isteklerinde oluşabilecek hatalar try-catch blokları ile yakalanarak React Hot Toast üzerinden kullanıcıya bildirilmektedir.

Loading States: Veri çekme işlemleri sırasında Loader2 bileşenleri ile görsel geri bildirim sağlanmaktadır.

10. Testing
Functional Testing: İlan ekleme, görsel yükleme sınırı (5MB) ve CRUD işlemleri manuel olarak farklı senaryolarda test edilmiştir.

Validation Testing: E-posta formatı, şifre uzunluğu ve zorunlu alanlar için form validasyon testleri uygulanmıştır.

11. Build ve Deployment
Build Tool: Proje geliştirme ve üretim aşamalarında yüksek performanslı Vite kullanılmıştır.

Environment Variables: Hassas API anahtarları .env dosyaları ile yönetilmiş ve Vercel üzerinde güvenli hale getirilmiştir.

CI/CD: GitHub entegrasyonu sayesinde her push işlemi sonrası Vercel üzerinden otomatik deployment gerçekleştirilmektedir.

