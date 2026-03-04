# API Tasarımı - OpenAPI Specification Örneği

**OpenAPI Spesifikasyon Dosyası:** [openapi.yaml](openapi.yaml)

Bu doküman, OpenAPI Specification (OAS) 3.0 standardına göre hazırlanmış örnek bir API tasarımını içermektedir.

## OpenAPI Specification

```yaml
openapi: 3.0.3
info:
  title: Adoptly API
  description: |
    Barınak yönetimi ve evcil hayvan sahiplendirme platformu için RESTful API.
    
    ## Özellikler
    - Kullanıcı ve Barınak yönetimi
    - Hayvan ilan katalog yönetimi
    - Sahiplendirme başvuru işlemleri
    - JWT tabanlı kimlik doğrulama
  version: 1.0.0
  contact:
    name: Adoptly Destek Ekibi
    email: support@adoptly.com
    url: https://adoptly.com/support
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: https://api.adoptly.com/v1
    description: Production server
  - url: https://staging-api.adoptly.com/v1
    description: Staging server
  - url: http://localhost:8080/v1
    description: Development server (Spring Boot)

tags:
  - name: auth
    description: Kimlik doğrulama işlemleri
  - name: users
    description: Kullanıcı profili işlemleri
  - name: animals
    description: Hayvan ilan katalog işlemleri
  - name: applications
    description: Sahiplendirme başvuru işlemleri

paths:
  /auth/register:
    post:
      tags:
        - auth
      summary: Yeni kullanıcı kaydı
      description: Sisteme yeni bir kullanıcı veya barınak hesabı kaydeder.
      operationId: registerUser
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserRegistration'
            examples:
              example1:
                summary: Örnek kullanıcı kaydı
                value:
                  email: yigit@adoptly.com
                  password: Guvenli123!
                  firstName: Yiğit
                  lastName: Zeybek
      responses:
        '201':
          description: Kullanıcı başarıyla oluşturuldu
        '400':
          $ref: '#/components/responses/BadRequest'
        '409':
          description: Email adresi zaten kullanımda

  /auth/login:
    post:
      tags:
        - auth
      summary: Kullanıcı girişi
      description: Email ve şifre ile giriş yapar, JWT token döner.
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
      summary: Hayvan ilan listesi
      description: Sistemdeki tüm sahiplendirilebilir hayvanları listeler.
      operationId: listAnimals
      parameters:
        - $ref: '#/components/parameters/PageParam'
        - $ref: '#/components/parameters/LimitParam'
        - name: species
          in: query
          description: Türe göre filtrele (Kedi/Köpek)
          schema:
            type: string
      responses:
        '200':
          description: Başarılı
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AnimalList'

    post:
      tags:
        - animals
      summary: Yeni ilan ekle
      description: Barınak yetkilisi tarafından yeni bir hayvan ilanı oluşturur.
      operationId: createAnimal
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
      summary: İlan detayı
      description: Belirli bir hayvanın detaylı bilgilerini getirir.
      operationId: getAnimalById
      parameters:
        - $ref: '#/components/parameters/AnimalIdParam'
      responses:
        '200':
          description: Başarılı
        '404':
          $ref: '#/components/responses/NotFound'

    put:
      tags:
        - animals
      summary: İlan güncelle
      description: Hayvanın yaş, durum veya açıklama bilgilerini günceller.
      security:
        - bearerAuth: []
      parameters:
        - $ref: '#/components/parameters/AnimalIdParam'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AnimalUpdate'
      responses:
        '200':
          description: İlan başarıyla güncellendi

    delete:
      tags:
        - animals
      summary: İlanı sil
      description: İlanı sistemden kalıcı olarak kaldırır.
      security:
        - bearerAuth: []
      parameters:
        - $ref: '#/components/parameters/AnimalIdParam'
      responses:
        '204':
          description: İlan başarıyla silindi

  /applications:
    post:
      tags:
        - applications
      summary: Sahiplenme başvurusu yap
      description: Bir kullanıcı için sahiplenme talebi oluşturur.
      operationId: createApplication
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
          description: Başvuru başarıyla alındı

  /applications/my:
    get:
      tags:
        - applications
      summary: Başvurularımı listele
      description: Giriş yapan kullanıcının kendi başvurularını listeler.
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Başarılı
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApplicationList'

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  parameters:
    AnimalIdParam:
      name: animalId
      in: path
      required: true
      schema:
        type: string
        format: uuid
    PageParam:
      name: page
      in: query
      schema:
        type: integer
        default: 1
    LimitParam:
      name: limit
      in: query
      schema:
        type: integer
        default: 20

  schemas:
    User:
      type: object
      required: [id, email, firstName, lastName, role]
      properties:
        id: { type: string, format: uuid }
        email: { type: string, format: email }
        firstName: { type: string }
        lastName: { type: string }
        role: { type: string, enum: [admin, shelter, user] }
        createdAt: { type: string, format: date-time }

    UserRegistration:
      type: object
      required: [email, password, firstName, lastName]
      properties:
        email: { type: string, format: email }
        password: { type: string, minLength: 8 }
        firstName: { type: string }
        lastName: { type: string }

    LoginCredentials:
      type: object
      required: [email, password]
      properties:
        email: { type: string, format: email }
        password: { type: string, format: password }

    AuthToken:
      type: object
      required: [token, expiresIn, user]
      properties:
        token: { type: string }
        expiresIn: { type: integer }
        user: { $ref: '#/components/schemas/User' }

    Animal:
      type: object
      required: [id, name, species, status]
      properties:
        id: { type: string, format: uuid }
        name: { type: string }
        species: { type: string }
        age: { type: integer }
        status: { type: string, enum: [AVAILABLE, ADOPTED] }
        imageUrl: { type: string, format: uri }

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
        status: { type: string, enum: [AVAILABLE, ADOPTED] }
        description: { type: string }

    Application:
      type: object
      properties:
        id: { type: string, format: uuid }
        animalId: { type: string, format: uuid }
        status: { type: string, enum: [pending, approved, rejected] }
        message: { type: string }

    ApplicationCreate:
      type: object
      required: [animalId, message]
      properties:
        animalId: { type: string, format: uuid }
        message: { type: string }

    AnimalList:
      type: object
      properties:
        data: { type: array, items: { $ref: '#/components/schemas/Animal' } }
        pagination: { $ref: '#/components/schemas/Pagination' }

    ApplicationList:
      type: object
      properties:
        data: { type: array, items: { $ref: '#/components/schemas/Application' } }
        pagination: { $ref: '#/components/schemas/Pagination' }

    Pagination:
      type: object
      properties:
        page: { type: integer }
        limit: { type: integer }
        totalItems: { type: integer }

    Error:
      type: object
      required: [code, message]
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
