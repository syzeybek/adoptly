 Mobil Backend Görevleri

**Rest API Adresi:** https://adoptly-mobilbackend.onrender.com/api

**Mobil Front-end ile Back-end Bağlanmış Test Videosu:** [Link buraya eklenecek](https://example.com)

## 1. Hayvan İlanı Oluşturma Servisi

* **API Endpoint:** `POST /api/animals`
* **Görev:** Mobil uygulamadan girilen yeni ilan verilerini sunucuya iletme ve kayıt işlemini gerçekleştirme.
* **İşlevler:**
* Form üzerinden alınan bilgilerin (isim, cins, lokasyon, yaş) toplanması.
* Yaş (age) gibi sayısal verilerin String'den Integer formatına (parse) dönüştürülmesi.
* Resim dosya yolunun (URL) veritabanı şemasına uygun şekilde hazırlanması.
* Başarılı kayıt durumunda kullanıcıya görsel geri bildirim (Toast) sunulması.


* **Teknik Detaylar:**
* HTTP POST isteği oluşturma ve Request Body (Payload) yönetimi.
* Axios ile asenkron iletişim.
* İşlem sonrası React Query `invalidateQueries` metodu ile Ana Sayfa listesinin anında (Optimistic) güncellenmesi.



## 2. İlanları Listeleme Servisi

* **API Endpoint:** `GET /api/animals`
* **Görev:** Sistemdeki tüm sahiplendirilebilir hayvanların API'den çekilip ana ekranda (Home) listelenmesi.
* **İşlevler:**
* Spring Security tarafında anonim erişime (PermitAll) izin verilmiş bu uca yetkisiz (Ziyaretçi) istek atılması.
* Gelen JSON verisinin parse edilip mobil UI (FlatList) bileşenine aktarılması.
* Veri yüklenirken Loading State (ActivityIndicator) yönetimi.


* **Teknik Detaylar:**
* TanStack React Query (`useQuery`) ile Response caching stratejisi.
* Gereksiz ağ (Network) isteklerini engellemek için `staleTime` yönetimi.
* HTTP 200 OK başarılı yanıt ve boş liste (Empty State) hata kontrolleri.



## 3. İlan Detaylarını Görüntüleme Servisi

* **API Endpoint:** `GET /api/animals/{animalId}`
* **Görev:** Kullanıcının seçtiği belirli bir ilanın detaylı verisini API'den çekip UI'da gösterme.
* **İşlevler:**
* Liste ekranından gelen benzersiz `animalId` değerini Path Variable olarak API uç noktasına ekleme.
* Gelen detaylı veriyi (büyük resim, detaylı açıklama vb.) render etme.
* Eğer ilan yayından kaldırılmışsa 404 Not Found durumunu yönetme.


* **Teknik Detaylar:**
* `usePet(id)` custom hook'u aracılığıyla izole veri çekme mimarisi.
* Ağ (Network) gecikmelerine karşı Skeleton/Loading screen yönetimi.



## 4. İlan Bilgilerini Güncelleme Servisi

* **API Endpoint:** `PUT /api/animals/{animalId}` 
* **Görev:** Mevcut hayvan ilanının bilgilerini kısmi veya tam olarak güncelleme.
* **İşlevler:**
* Form alanlarına mevcut ilan verilerinin doldurulması.
* Değişen verilerin veritabanı formatıyla birebir eşleştirilmesi.
* Güncelleme sonrasında lokal önbelleğin (Cache) temizlenip yeni verinin anında gösterilmesi.


* **Teknik Detaylar:**
* Conflict resolution (Hata durumunda) 400 Bad Request / PGRST (Sütun bulunamadı) hatalarının yakalanıp loglanması.



## 5. İlan Kaldırma (Silme) Servisi

* **API Endpoint:** `DELETE /api/animals/{animalId}`
* **Görev:** Kullanıcının kendi açtığı ilanı veritabanından kalıcı olarak silmesi.
* **İşlevler:**
* Silme eylemi öncesinde Destructive Action (Kritik İşlem) onayı alınması.
* Onay sonrası ilgili ID için silme isteği fırlatılması.
* Başarılı işlem sonrası ilanın mobil uygulamadaki lokal listeden anında çıkartılması.


* **Teknik Detaylar:**
* Optimistic UI Update (`setListings(prev => prev.filter(...))`) ile sunucu yanıtı beklemeden akıcı kullanıcı deneyimi.



## 6. Sahiplenme Başvurusu Yapma Servisi

* **API Endpoint:** `POST /api/applications`
* **Görev:** Doğrulanmış kullanıcıların sahiplenme taleplerini sisteme iletmesi.
* **İşlevler:**
* Yalnızca oturumu açık (Logged In) kullanıcıların bu servise istek atabilmesi.
* Seçilen ilan ID'si ve kullanıcı bilgilerinin birleştirilerek Request Body oluşturulması.
* Başarılı başvuru sonrası yönlendirme işlemi.


* **Teknik Detaylar:**
* Authentication header ekleme (Bearer Token).
* API'ye POST isteği atılarak veritabanında "Kullanıcı-İlan" (User-Pet Application) ilişkisinin kurulması.
* HTTP 403 Forbidden (Yetkisiz başvuru) yönetimi.



## 7. Başvuruları Listeleme Servisi

* **API Endpoint:** `GET /api/applications/my`
* **Görev:** Oturumu açık kullanıcının geçmiş sahiplenme başvurularının durumlarıyla birlikte çekilmesi.
* **İşlevler:**
* JWT Token ile korunan bu endpoint'e güvenli istek atılması.
* "Onaylandı", "Reddedildi", "Bekliyor" durumlarının (Status) parse edilip ekrana basılması.


* **Teknik Detaylar:**
* Axios Interceptor üzerinden giden isteklere otomatik cihaz kimliğinin (Token) enjekte edilmesi.
* Profil sayfasındaki sekmeler (Tabs) arasında gezinirken arka planda Lazy Loading ile verilerin getirilmesi.



## 8. Hayvan Filtreleme ve Arama Servisi

* **API Endpoint:** `GET /api/animals/search`
* **Görev:** Kullanıcı arama kriterlerine (Cins, Lokasyon, İsim) göre ilanların filtrelenmesi.
* **İşlevler:**
* API'ye sürekli istek atıp sunucuyu yormak (Server Load) yerine, çekilen ana listenin cihaz belleğinde ayrıştırılması.
* Filtre paneli üzerinden seçilen kategorilere göre liste sonuçlarının anlık daraltılması.


* **Teknik Detaylar:**
* Frontend üzerinde `useMemo` kancası (Hook) kullanılarak Zero-Latency (Sıfır Gecikmeli) arama algoritmasının yazılması.
* Benzersiz (Unique) şehir ve cins listelerinin API'den gelen Array verisinden türetilmesi.



## 9. Üye Olma (Kayıt) Servisi

* **API Endpoint:** `POST /api/auth/register`
* **Görev:** Yeni kullanıcıları Supabase (Veritabanı ve Yetkilendirme) servisine kaydetme.
* **İşlevler:**
* Kullanıcı bilgilerini (email, şifre, ad, soyad, yaş, şehir) toplama ve temizleme.
* Güvenli API POST isteği gönderme.
* Başarılı kayıt sonrası kullanıcıyı anında uygulamanın ana akışına dahil etme.


* **Teknik Detaylar:**
* Supabase Auth entegrasyonu.
* Error handling: Şifre kısalığı veya "Zaten kullanılıyor" (409 Conflict) durumlarının yakalanıp UI üzerinde Toast ile gösterilmesi.
* Request sırasında Loading State (Buton kilitleme) yönetimi.



## 10. Giriş Yapma Servisi

* **API Endpoint:** `POST /api/auth/login`
* **Görev:** Mevcut kullanıcıların kimlik doğrulamasını (Authentication) yapıp oturum anahtarı (JWT) temin etmesi.
* **İşlevler:**
* Email ve şifre ile credentials doğrulama.
* Dönen JWT Access Token'ın parse edilmesi.
* Token'ın uygulamanın diğer sayfalarında kullanılmak üzere cihazda kalıcı hale getirilmesi.


* **Teknik Detaylar:**
* `SecureStore` (iOS/Android) ve `LocalStorage` (Web) melez mimarisi ile Token'ın şifrelenerek saklanması.
* React Context API (`AuthContext`) ile kullanıcı oturum state'inin (Global State) uygulamanın her yerine yayılması.
* Hata durumlarında (Yanlış şifre / Kullanıcı bulunamadı) 400 Bad Request yönetimi.



---
