openapi: 3.0.3
info:
  title: Adoptly API
  description: |
    Sahiplendirilebilir hayvan ilanları ve başvuru süreçlerini yöneten RESTful API.
    
    ## Özellikler
    - Kullanıcı Kayıt ve Kimlik Doğrulama
    - Hayvan İlanı Yönetimi (CRUD)
    - Sahiplendirme Başvuruları ve Takibi
    - Hayvan Filtreleme ve Arama
  version: 1.0.0
  contact:
    name: Adoptly Labs - Yiğit
    email: support@adoptly.com
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: http://localhost:8080/api/v1
    description: Yerel Geliştirme Sunucusu (Spring Boot)

tags:
  - name: auth
    description: Üye olma ve giriş işlemleri
  - name: animals
    description: Hayvan ilanları ile ilgili tüm işlemler
  - name: applications
    description: Sahiplendirme başvuru süreçleri

paths:
  /auth/register:
    post:
      tags:
        - auth
      summary: Üye Olma
      description: Kullanıcıların ad, e-posta ve şifre ile sisteme kayıt olmasını sağlar.
      operationId: registerUser
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserRegistration'
      responses:
        '201':
          description: Kullanıcı başarıyla oluşturuldu
        '400':
          $ref: '#/components/responses/BadRequest'

  /auth/login:
    post:
      tags:
        - auth
      summary: Giriş Yapma
      description: E-posta ve şifre ile sisteme giriş yapar ve JWT token döner.
      operationId: loginUser
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoginCredentials'
      responses:
        '200':
          description: Giriş başarılı
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthToken'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /animals:
    get:
      tags:
        - animals
      summary: İlanları Listeleme
      description: Sistemdeki tüm sahiplendirilebilir hayvanları listeler.
      operationId: listAnimals
      responses:
        '200':
          description: Başarılı
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Animal'

    post:
      tags:
        - animals
      summary: Hayvan İlanı Oluşturma
      description: Barınak yetkilisi tarafından yeni bir ilan eklenmesini sağlar.
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AnimalCreate'
      responses:
        '201':
          description: İlan başarıyla oluşturuldu

  /animals/{animalId}:
    get:
      tags:
        - animals
      summary: İlan Detaylarını Görüntüleme
      description: Belirli bir hayvanın tüm detay bilgilerini getirir.
      parameters:
        - name: animalId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Başarılı
        '404':
          $ref: '#/components/responses/NotFound'

    put:
      tags:
        - animals
      summary: İlan Bilgilerini Güncelleme
      description: Mevcut ilanın yaş, açıklama veya sahiplendirilme durumunu günceller.
      security:
        - bearerAuth: []
      parameters:
        - name: animalId
          in: path
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AnimalUpdate'
      responses:
        '200':
          description: İlan güncellendi

    delete:
      tags:
        - animals
      summary: İlan Kaldırma (Silme)
      description: İlanı sistemden kalıcı olarak siler.
      security:
        - bearerAuth: []
      parameters:
        - name: animalId
          in: path
          required: true
          schema:
            type: string
      responses:
        '204':
          description: Başarıyla silindi

  /animals/search:
    get:
      tags:
        - animals
      summary: Hayvan Filtreleme ve Arama
      description: Tür, şehir veya yaş grubuna göre ilanları daraltır.
      parameters:
        - name: species
          in: query
          schema:
            type: string
        - name: city
          in: query
          schema:
            type: string
      responses:
        '200':
          description: Filtrelenmiş sonuçlar

  /applications:
    post:
      tags:
        - applications
      summary: Sahiplenme Başvurusu Yapma
      description: Kullanıcının bir hayvan için başvuru talebi iletmesini sağlar.
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ApplicationCreate'
      responses:
        '201':
          description: Başvuru alındı

  /applications/my:
    get:
      tags:
        - applications
      summary: Başvuruları Listeleme
      description: Kullanıcının geçmişteki tüm başvurularını listeler.
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Başvurular getirildi

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  schemas:
    UserRegistration:
      type: object
      required: [firstName, lastName, email, password]
      properties:
        firstName: { type: string, example: "Yiğit" }
        lastName: { type: string, example: "Zeybek" }
        email: { type: string, format: email, example: "yigit@example.com" }
        password: { type: string, format: password, example: "Guvenli123!" }

    LoginCredentials:
      type: object
      required: [email, password]
      properties:
        email: { type: string, format: email }
        password: { type: string, format: password }

    AuthToken:
      type: object
      properties:
        token: { type: string }
        expiresIn: { type: integer }

    Animal:
      type: object
      properties:
        id: { type: string }
        name: { type: string }
        species: { type: string }
        age: { type: integer }
        status: { type: string, enum: [AVAILABLE, ADOPTED] }

    AnimalCreate:
      type: object
      required: [name, species, age, gender]
      properties:
        name: { type: string }
        species: { type: string }
        age: { type: integer }
        gender: { type: string }
        description: { type: string }

    AnimalUpdate:
      type: object
      properties:
        age: { type: integer }
        description: { type: string }
        status: { type: string, enum: [AVAILABLE, ADOPTED] }

    ApplicationCreate:
      type: object
      required: [animalId, message]
      properties:
        animalId: { type: string }
        message: { type: string }

    Error:
      type: object
      properties:
        code: { type: string }
        message: { type: string }

  responses:
    BadRequest:
      description: Geçersiz istek
      content:
        application/json:
          schema: { $ref: '#/components/schemas/Error' }
    Unauthorized:
      description: Yetkisiz erişim
    NotFound:
      description: Kaynak bulunamadı
    Forbidden:
      description: Erişim reddedildi
