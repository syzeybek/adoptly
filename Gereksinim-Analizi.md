# Gereksinim Analizi
1. Hayvan İlanı Oluşturma

   API Metodu: POST /api/animals

   Açıklama: Barınak yetkililerinin sisteme yeni bir sahiplendirme ilanı eklemesini sağlar. Hayvanın adı, türü, yaşı, cinsiyeti ve açıklama gibi bilgilerinin           kaydedilmesini içerir.

2. İlanları Listeleme
   
   API Metodu: GET /api/animals

   Açıklama: Sistemdeki tüm sahiplendirilebilir hayvanların genel listesine erişilmesini sağlar. 

3. İlan Detaylarını Görüntüleme
 
   API Metodu: GET /api/animals/{animalId}

   Açıklama: Seçilen belirli bir hayvanın tüm detaylı bilgilerine ulaşılmasını sağlar. 

4. İlan Bilgilerini Güncelleme
 
   API Metodu: PUT /api/animals/{animalId}

   Açıklama: Mevcut bir hayvan ilanının bilgilerinin düzenlenmesini sağlar. Hayvanın büyümesi sonucu yaşının güncellenmesi, yeni fotoğraflar eklenmesi veya             sahiplendirilme durumunun değiştirilmesi gibi işlemleri kapsar.

5. İlan Kaldırma (Silme)

   API Metodu: DELETE /api/animals/{animalId}

   Açıklama: Bir ilanın sistemden kalıcı olarak silinmesini sağlar. Hatalı girilen ilanlar veya artık geçerli olmayan sahiplendirme duyuruları için kullanılır.

6. Sahiplenme Başvurusu Yapma
 
   API Metodu: POST /api/applications

   Açıklama: Kayıtlı kullanıcıların bir hayvanı sahiplenmek için başvuru talebi iletmesini sağlar.

7. Başvuruları Listeleme
 
   API Metodu: GET /api/applications/my

   Açıklama: Kullanıcının geçmişte yapmış olduğu tüm sahiplendirme başvurularını bir liste halinde görmesini sağlar. Başvurunun o anki durumu (Onaylandı,               Reddedildi, Bekliyor) bu ekran üzerinden takip edilir.

8. Hayvan Filtreleme ve Arama

   API Metodu: GET /api/animals/search

   Açıklama: Kullanıcıların belirli kriterlere (tür, şehir, yaş grubu) göre hayvan ilanlarını daraltmasını sağlar.

9. Üye Olma
 
   API Metodu: POST /api/auth/register

   Açıklama: Kullanıcıların ad, e-posta ve şifre bilgilerini girerek sisteme yeni hesap oluşturmasını sağlar.

10. Giriş Yapma
 
    API Metodu: POST /api/auth/login

    Açıklama: Kayıtlı kullanıcıların e-posta ve şifre bilgileriyle sisteme güvenli erişim sağlamasını sağlar. 
