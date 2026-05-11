# 📅 Tracker Estudio

**Tracker Estudio** es una aplicación móvil desarrollada con React Native y Expo, diseñada para ayudar a los desarrolladores y estudiantes a gestionar su tiempo de estudio, organizar proyectos de programación por lenguajes, y llevar un registro detallado del progreso diario.

## 🚀 Características Principales

- **Gestión de Perfil:** Crea y edita tu perfil de usuario, incluyendo una fotografía (con soporte persistente local).
- **Proyectos y Lenguajes:** Registra nuevos lenguajes de programación y asócialos a proyectos de estudio.
- **Agenda Semanal:** Asigna días específicos de la semana para trabajar en tus proyectos y mantén tu enfoque.
- **Seguimiento de Tiempo:** Registra las horas invertidas por día y visualiza el progreso y total de horas acumuladas en cada proyecto.
- **Comentarios y Notas:** Añade notas o comentarios a cada proyecto para no perder el hilo de tus avances.
- **Modo Oscuro/Claro:** Interfaz de usuario adaptativa impulsada por NativeWind (TailwindCSS) con soporte completo para temas del sistema.
- **100% Offline:** Persistencia de datos local utilizando SQLite, sin depender de conexión a internet.

## 🛠️ Tecnologías y Herramientas

Este proyecto está construido sobre el ecosistema moderno de React Native:

- **Framework:** [Expo](https://expo.dev/) (SDK 52+) / [React Native](https://reactnative.dev/)
- **Navegación:** [Expo Router](https://docs.expo.dev/router/introduction/) (Enrutamiento basado en archivos) junto con React Navigation (Drawer & Tabs).
- **Estilos:** [NativeWind v4](https://www.nativewind.dev/) (TailwindCSS para React Native).
- **Manejo de Estado Remoto / Asíncrono:** [TanStack React Query v5](https://tanstack.com/query/latest)
- **Formularios:** [React Hook Form](https://react-hook-form.com/)
- **Base de Datos:** [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- **Manejo de Imágenes:** `expo-image` y `expo-image-picker` para manejo optimizado de fotos locales y UI.

## 📦 Instalación y Configuración

Sigue estos pasos para correr el proyecto localmente:

1. **Clonar el repositorio** (si aplica) o descargar el código fuente.
2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Iniciar el servidor de desarrollo de Expo:**
   ```bash
   npm start
   # o
   npx expo start
   ```
4. **Ejecutar en el dispositivo:**
   - Presiona `a` para abrir en un emulador Android.
   - Presiona `i` para abrir en el simulador de iOS.
   - O escanea el código QR desde la aplicación **Expo Go** en tu dispositivo físico.

> **Nota:** Para compilar el APK de producción, asegúrate de utilizar EAS Build o la configuración nativa de Expo, las configuraciones de imágenes y SQLite ya están optimizadas en `app.json`.

## 📁 Estructura del Proyecto

```text
TrackerEstudio/
├── app/                  # Rutas principales y pantallas (Expo Router)
│   ├── (tabs)/           # Navegación principal
│   ├── auth/             # Flujo de registro y perfil
│   └── ...
├── components/           # Componentes UI reutilizables
├── constants/            # Variables de estado, colores y datos por defecto
├── infraestructure/      # Acceso a datos (DAO), Mappers y Migraciones de SQLite
├── interfaces/           # Modelos de datos y tipados de TypeScript
├── presentation/         # Hooks personalizados, Acciones (Actions) y Componentes de Vistas
├── utils/                # Funciones auxiliares y formateadores
└── app.json              # Configuración general de la app de Expo
```

## 👨‍💻 Autor

Desarrollado con ❤️ por **keiner-code**.
