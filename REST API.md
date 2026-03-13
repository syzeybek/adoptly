# REST API Metotları

**REST API Adresi:** https://api.adoptly.com/v1

**API Test Videosu:** [Link buraya eklenecek](https://example.com)


---

## 1. Üye Olma

* **Endpoint:** `POST /auth/register`
* **Request Body:**
```json
{
  "email": "yigit@adoptly.com",
  "password": "Guvenli123!",
  "firstName": "Yiğit",
  "lastName": "Zeybek"
}

```


* **Response:** `201 Created` - Kullanıcı başarıyla oluşturuldu

## 2. Giriş Yapma

* **Endpoint:** `POST /auth/login`
* **Request Body:**
```json
{
  "email": "yigit@adoptly.com",
  "password": "Guvenli123!"
}

```


* **Response:** `200 OK` - Giriş başarılı, JWT token döndürüldü

## 3. Hayvan İlanı Oluşturma

* **Endpoint:** `POST /animals`
* **Authentication:** Bearer Token gerekli
* **Request Body:**
```json
{
  "name": "Pamuk",
  "species": "Kedi",
  "age": 2,
  "gender": "Dişi",
  "description": "Çok oyuncu ve sıcakkanlı bir kedi.",
  "imageUrl": "https://api.adoptly.com/images/pamuk.jpg"
}

```


* **Response:** `201 Created` - İlan başarıyla oluşturuldu

## 4. İlanları Listeleme

* **Endpoint:** `GET /animals`
* **Response:** `200 OK` - Tüm sahiplendirilebilir hayvanlar başarıyla listelendi

## 5. İlan Detaylarını Görüntüleme

* **Endpoint:** `GET /animals/{animalId}`
* **Path Parameters:**
* `animalId` (string, required) - Hayvanın benzersiz kimlik numarası


* **Response:** `200 OK` - Hayvanın detaylı bilgileri başarıyla getirildi

## 6. İlan Bilgilerini Güncelleme

* **Endpoint:** `PUT /animals/{animalId}`
* **Path Parameters:**
* `animalId` (string, required) - Hayvanın benzersiz kimlik numarası


* **Authentication:** Bearer Token gerekli
* **Request Body:**
```json
{
  "age": 3,
  "description": "Yeni fotoğraflar eklendi, sağlığı çok iyi.",
  "status": "ADOPTED"
}

```


* **Response:** `200 OK` - İlan bilgileri başarıyla güncellendi

## 7. İlan Kaldırma (Silme)

* **Endpoint:** `DELETE /animals/{animalId}`
* **Path Parameters:**
* `animalId` (string, required) - Hayvanın benzersiz kimlik numarası


* **Authentication:** Bearer Token gerekli
* **Response:** `204 No Content` - İlan başarıyla silindi

## 8. Sahiplenme Başvurusu Yapma

* **Endpoint:** `POST /applications`
* **Authentication:** Bearer Token gerekli
* **Request Body:**
```json
{
  "animalId": "animal-uuid-123",
  "message": "Bahçeli bir evim var, bu cana en iyi şekilde bakmak istiyorum."
}

```


* **Response:** `201 Created` - Başvuru talebi başarıyla oluşturuldu

## 9. Başvuruları Listeleme

* **Endpoint:** `GET /applications/my`
* **Authentication:** Bearer Token gerekli
* **Response:** `200 OK` - Kullanıcının geçmiş ve güncel başvuruları listelendi

## 10. Hayvan Filtreleme ve Arama

* **Endpoint:** `GET /animals/search`
* **Query Parameters:**
* `species` (string) - Kedi veya Köpek seçimi
* `city` (string) - İlanın bulunduğu şehir


* **Response:** `200 OK` - Belirlenen kriterlere uygun sonuçlar başarıyla getirildi

---


















Response: 200 OK - Belirlenen kriterlere uygun sonuçlar başarıyla getirildi
