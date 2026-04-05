# REST API Metotları

**REST API Adresi:** https://adoptly-backend-wap7.onrender.com

**API Test Videosu:** https://youtu.be/abLBekQ3Eho




# 🐾 Adoptly REST API Gereksinimleri


## **Adoptly REST API Gereksinimleri**

### **1. Kullanıcı Kaydı (Üye Ol)**
* **Uç nokta:** `POST /api/auth/register`
* **İstek Metni:**
```json
{
  "firstName": "HP",
  "lastName": "Vıctus",
  "email": "victus@adoptly.com",
  "password": "Sifre123",
  "role": "USER"
}
```
* **Yanıt:** `201 Created` - Kullanıcı başarıyla tamamlandı

### **2. Kullanıcı Girişi (Giriş)**
* **Uç nokta:** `POST /api/auth/login`
* **İstek Metni:**
```json
{
  "email": "victus@adoptly.com",
  "password": "Sifre123"
}
```
* **Yanıt:** `200 OK` - Giriş Başarılı

### **3. Tüm İlanlar Listeleme**
* **Uç nokta:** `GET /api/animals`
* **Yanıt:** `200 OK` - Tüm hayvan ilanları başarıyla listelendi

### **4. Yeni Hayvan İlanı Oluşturma**
* **Uç nokta:** `POST /api/animals`
* **İstek Metni:**
```json
{
  "name": "Pamuk",
  "species": "Cat",
  "age": 2,
  "gender": "Female",
  "status": "AVAILABLE",
  "description": "Çok tatlı bir kedi",
  "imageUrl": "https://images.com/pamuk.jpg"
}
```
* **Yanıt:** `201 Created` - İlan başarıyla tamamlandı

### **5. İlan Detaylarını Görüntüleme**
* **Uç nokta:** `GET /api/animals/{id}`
* **Yol Parametreleri:** `id` (Örn: 1)
* **Yanıt:** `200 OK` - İlan ayrıntıları başarıyla getirildi

### **6. İlan Bilgilerini Güncelleme**
* **Uç nokta:** `PUT /api/animals/{id}`
* **İstek Metni:**
```json
{
  "name": "Pamuk Prenses",
  "species": "Cat",
  "age": 3,
  "status": "AVAILABLE"
}
```
* **Yanıt:** `200 OK` - İlan başarıyla güncellendi

### **7. Hayvan Filtreleme ve Arama**
* **Uç nokta:** `GET /api/animals/search`
* **Sorgu Parametreleri:** `species` (Örn: Cat)
* **Yanıt:** `200 OK` - Arama sonuçları başarıyla listelendi

### **8. Sahiplenme Başvurusu Yapma**
* **Uç nokta:** `POST /api/applications?userId=1&animalId=1`
* **İstek Metni (Text):**
`"Onu sahiplenmek istiyorum, çok heyecanlıyım!"`
* **Yanıt:** `201 Created` - Başvuru başarıyla alındı

### **9. Başvurularım Listeleme**
* **Uç nokta:** `GET /api/applications/my?userId=1`
* **Sorgu Parametreleri:** `userId` (Örn: 1)
* **Yanıt:** `200 OK` - Yapılan başvurular başarıyla listelendi

### **10. İlan Çekme / Silme**
* **Uç nokta:** `DELETE /api/animals/{id}`
* **Yanıt:** `204 No Content` - İlan başarıyla silindi

---





