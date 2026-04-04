# REST API Metotları

**REST API Adresi:** 

**API Test Videosu:** [Link buraya eklenecek](https://example.com)


---
---

# 🐾 Adoptly REST API Gereksinimleri

### 1. Kullanıcı Kaydı (Register)

* **Uç nokta:** `POST /api/v1/auth/register`
* **İstek Metni:**

```json
{
  "email": "yigit@adoptly.com",
  "password": "Guvenli123!",
  "firstName": "Yiğit"
}

```

* **Yanıt:** `201 Created` - Kullanıcı başarıyla tamamlandı

### 2. Kullanıcı Girişi (Login)

* **Uç nokta:** `POST /api/v1/auth/login`
* **İstek Metni:**

```json
{
  "email": "yigit@adoptly.com",
  "password": "Guvenli123!"
}

```

* **Yanıt:** `200 OK` - Giriş Başarılı (Token döner)

### 3. Tüm İlanları Listeleme

* **Uç nokta:** `GET /api/v1/animals`
* **Yanıt:** `200 OK` - Tüm hayvan ilanları başarıyla listelendi

### 4. Yeni Hayvan İlanı Oluşturma

* **Uç nokta:** `POST /api/v1/animals`
* **İstek Metni:**

```json
{
  "name": "Fındık",
  "species": "Kuş",
  "age": 1,
  "gender": "Erkek",
  "city": "Ankara"
}

```

* **Yanıt:** `201 Created` - İlan başarıyla oluşturuldu

### 5. İlan Detaylarını Görüntüleme

* **Uç nokta:** `GET /api/v1/animals/{id}`
* **Yol Parametreleri:** `id` (Hayvan ID'si)
* **Yanıt:** `200 OK` - İlan detayları başarıyla getirildi

### 6. İlan Bilgilerini Güncelleme

* **Uç nokta:** `PUT /api/v1/animals/{id}`
* **İstek Metni:**

```json
{
  "age": 3,
  "name": "Pamuk (Güncellendi)"
}

```

* **Yanıt:** `200 OK` - İlan başarıyla güncellendi

### 7. Hayvan Filtreleme ve Arama

* **Uç nokta:** `GET /api/v1/animals/search`
* **Sorgu Parametreleri:** `species` (string), `city` (string)
* **Yanıt:** `200 OK` - Arama sonuçları başarıyla listelendi

### 8. Sahiplenme Başvurusu Yapma

* **Uç nokta:** `POST /api/v1/applications`
* **İstek Metni:**

```json
{
  "animalId": "1",
  "note": "Ona çok iyi bakacağım!"
}

```

* **Yanıt:** `201 Created` - Başvuru başarıyla alındı

### 9. Başvurularımı Listeleme

* **Uç nokta:** `GET /api/v1/applications/my`
* **Yanıt:** `200 OK` - Yapılan başvurular başarıyla listelendi

### 10. İlan Kaldırma / Silme

* **Uç nokta:** `DELETE /api/v1/animals/{id}`
* **Yanıt:** `204 No Content` - İlan başarıyla silindi

---



