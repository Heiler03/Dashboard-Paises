# Dashboard Global de Países y Geografía

Aplicación web interactiva desarrollada en **React** con **TypeScript** y empaquetada con **Vite**. Consume la API pública de `REST Countries` para mostrar indicadores demográficos globales, permitiendo realizar búsquedas en tiempo real, filtrar por continentes y analizar métricas detalladas por cada nación.

## 🚀 Tecnologías Utilizadas

- **React 18** & **TypeScript**
- **Vite** (Entorno de desarrollo rápido)
- **Axios** (Consumo de API optimizado con selección de campos)
- **Material UI (MUI)** (Componentes interactivos avanzados: Filtros de texto/región, barra de progreso `LinearProgress` y panel lateral `Drawer`)
- **Bootstrap / Bootswatch (Tema Materia)** (Estructura de grilla responsive con estética inspirada en Material Design)

## 🛠️ Características Principales

- **Filtros Cruzados Avanzados:** Búsqueda por texto en tiempo real combinada con filtro por continente o región.
- **Rendimiento Optimizado:** Uso de `useMemo` en React para gestionar el filtrado en el cliente y evitar renderizados innecesarios.
- **Panel de Detalle Lateral:** Vista deslizable que calcula de forma porcentual la población del país seleccionado frente al más poblado del mundo.
- **Arquitectura Limpia:** Separación estricta de lógica y UI mediante el uso de servicios centralizados y Custom Hooks (`useCountries`).

## 📦 Instalación y Configuración

Sigue estos pasos para clonar y ejecutar el proyecto localmente en tu entorno:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/Heiler03/Dashboard-Paises.git](https://github.com/Heiler03/Dashboard-Paises.git)
   cd Dashboard-Paises