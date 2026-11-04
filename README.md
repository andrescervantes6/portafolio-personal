# Portafolio Personal - Andrés Mauricio Cervantes

Portafolio personal de alto impacto visual, diseñado con estética minimalista oscura estilo Apple, animaciones fluidas con GSAP + ScrollTrigger y componentes interactivos inspirados en react-bits.

## 🚀 Stack Tecnológico
- **Framework:** Next.js (App Router) + TypeScript
- **Estilos:** Tailwind CSS con tokens semánticos y CSS Variables
- **Animaciones:** GSAP + ScrollTrigger (`@gsap/react` y `useGSAP`)
- **Interactividad React-Bits:** Spotlight Cards, CountUp, SplitText, RotatingText, Background Aurora/Particles
- **Tipografía & Media:** `next/font` (Inter y JetBrains Mono) y `next/image`
- **Iconografía:** Lucide React

---

## 📂 Estructura del Proyecto
```text
/public
  foto.png                  # Foto de perfil (reemplazable)
  cultivus/                 # Capturas del proyecto Cultivus
    cultivus-1.png
    cultivus-2.png
    cultivus-3.png
  og-image.png              # Imagen para Open Graph / Twitter Cards (1200x630)
  favicon.ico               # Favicon del sitio
/src
  /app
    layout.tsx              # Tipografías, SEO, Open Graph y lang="es"
    page.tsx                # Ensamblado de secciones en orden (y slot preparado para Servicios)
    globals.css             # Tokens de diseño Apple y estilos globales
  /components
    /sections
      Hero.tsx              # Hero con foto iluminada, SplitText y chips
      QuickFacts.tsx        # 3 tarjetas con CountUp
      Passions.tsx          # Lo que me mueve (4 tarjetas con foco)
      FeaturedProject.tsx   # Cultivus con galería y chips reutilizables
      TradingJourney.tsx    # Línea de tiempo vertical interactiva con ScrollTrigger
      Principles.tsx        # 4 valores con icono y descripción
      Contact.tsx           # Contacto con iconos magnéticos
    /ui
      Button.tsx            # Botón accesible con micro-física de resorte
      Chip.tsx              # Chips de categorías y tecnologías
      Card.tsx              # SpotlightCard interactiva
      SectionTitle.tsx      # Encabezado unificado de secciones
      IconLink.tsx          # Enlaces sociales con atracción magnética
    /animations
      Reveal.tsx            # Wrapper GSAP para revelado al hacer scroll
      Background.tsx        # Fondo sutil Aurora + Partículas (desactivable en móvil)
      CountUp.tsx           # Contador numérico animado
      SplitText.tsx         # Animación de texto por palabras
      RotatingText.tsx      # Rotación suave de especialidades
    Navbar.tsx              # Barra de navegación translúcida fija con menú móvil
    Footer.tsx              # Pie de página minimalista
  /data
    content.ts              # TODO el texto, datos y enlaces del sitio
  /lib
    gsap.ts                 # Registro de plugins de GSAP
    utils.ts                # Utilidades de clases Tailwind
```

---

## 🛠️ Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción (validado sin errores)
npm run build

# Iniciar servidor de producción
npm start
```

---

## 🚢 Despliegue en Vercel
1. Sube este repositorio a tu cuenta de GitHub (`andrescervantes6`).
2. Entra a [Vercel](https://vercel.com/) e importa el repositorio.
3. El proyecto no requiere variables de entorno ni bases de datos. Compilará automáticamente con `npm run build`.

