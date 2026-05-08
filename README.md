# Numerical Methods Web App (SPA)

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-6+-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-Premium_UI-88CE02?style=flat-square)](https://greensock.com/gsap/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](./LICENSE)

## 📌 Visión General

Modernización del proyecto *MacroExcel* (originalmente construido en VBA) a una **Aplicación Web Single Page (SPA)** puramente en React. 

Esta arquitectura está diseñada específicamente para ser **100% Client-Side**, permitiendo realizar cálculos de álgebra lineal y métodos numéricos directamente en el navegador del usuario sin necesidad de un servidor backend, haciéndola ideal para despliegue en hostings gratuitos y estáticos como **InfinityFree, GitHub Pages o Vercel**.

## 🚀 Métodos Implementados

1. **Gauss-Seidel (Sistemas de Ecuaciones Lineales)**
   - Dimensionamiento dinámico (matrices $n \times n$).
   - Configuración de Iteraciones Máximas y Tolerancia de Error.
   - Historial en tiempo real de iteraciones y convergencia de error.
2. **Operaciones Matriciales** *(Próximamente)*
   - Suma, Multiplicación, Transpuesta.
3. **Interpolación** *(Próximamente)*

## 🏗 Arquitectura y Estructura

```text
Proyecto__MacroExcel/
├── legacy_excel/          # Archivos originales en .xlsm y .xlsx (VBA)
└── frontend/              # Nueva Aplicación React SPA
    ├── src/
    │   ├── components/    # Componentes UI (MatrixInput)
    │   ├── pages/         # Vistas principales (GaussSeidelView)
    │   ├── utils/         # Motor matemático JS (numericalMethods.js)
    │   ├── App.jsx        # Routing y Layout (Sidebar)
    │   └── index.css      # Design System (Corporate Dark Theme)
    └── dist/              # Carpeta de producción (lista para InfinityFree)
```

## 🛠 Instalación Local

1. Instalar dependencias:
```bash
cd frontend
npm install
```

2. Levantar el entorno de desarrollo:
```bash
npm run dev
```

## 🌐 Preparación para Despliegue (InfinityFree / Estático)

Para generar los archivos listos para producción:
```bash
cd frontend
npm run build
```
Esto creará una carpeta `dist/`. El contenido de esta carpeta puede ser subido directamente a `htdocs` en InfinityFree vía FTP. No requiere Node.js ni PHP para funcionar.

---

**Desarrollado por [Diego Leobardo Diaz Hernandez](https://github.com/LeoDiaz-DataSc)**
