# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# Adoptly



## Proje Hakkında

<img width="2816" height="1536" alt="adoptly" src="https://github.com/user-attachments/assets/f6c53ee7-654a-49c7-b0e7-71877678d032" />


**Proje Tanımı:** 
Adoptly, kalplerini açmaya hazır aileler ile yuva bekleyen minik dostlarımızı sevgi dolu bir köprüde buluşturur. Her canlının sıcak bir yuvayı hak ettiği inancıyla yola çıkan bu platform, barınaklardaki kedi ve köpeklerin sesini daha gür duyurmalarına, hayvanseverlerin ise hayallerindeki yol arkadaşına zahmetsizce ulaşmalarına yardımcı olur. Bir canı sahiplenme sürecini karmaşadan uzak, güvenli ve sevgi odaklı bir yolculuğa dönüştüren Adoptly, sokaktaki masum gözlerin sıcak bir aileye kavuştuğu o ilk ana ortak olmayı hedefler.



**Proje Kategorisi:** 
Sosyal Sorumluluk ve Yardımlaşma

**Referans Uygulama:** 
> [Örnek Referans Uygulama](https://patilen.com)
  ---> Patilen

---

## Proje Linkleri

- **REST API Adresi:**
- **Web Frontend Adresi:** 
---

## Proje Ekibi

**Grup Adı:** 
ADOPTLY LABS

**Ekip Üyeleri:** 
- Süleyman Yiğit Zeybek

---

## Dokümantasyon

Proje dokümantasyonuna aşağıdaki linklerden erişebilirsiniz:

1. [Gereksinim Analizi](Gereksinim-Analizi.md)
2. [REST API Tasarımı](API-Tasarimi.md)
3. [REST API](Rest-API.md)
4. [Web Front-End](WebFrontEnd.md)
5. [Mobil Front-End](MobilFrontEnd.md)
6. [Mobil Backend](MobilBackEnd.md)
7. [Video Sunum](Sunum.md)

---


