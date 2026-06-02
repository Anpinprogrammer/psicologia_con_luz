import { useEffect } from "react";
import {
  BookOpen,
  Calendar,
  Clock,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import NavBar from "../../components/layout/NavBar";
import "./Blog.css";

type BlogContentType = "article" | "video";

type BlogContent = {
  id: string;
  type: BlogContentType;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
  image: string;
  duration?: string;
};

// Mock content - replace with admin/API uploaded articles and videos later.
const mockContent: BlogContent[] = [
  {
    id: "b1",
    type: "article",
    title: "Cómo manejar la ansiedad cuando todo se siente urgente",
    excerpt:
      "Herramientas sencillas para reconocer señales de ansiedad, regular el cuerpo y volver a tomar decisiones desde la calma.",
    date: "2026-05-18",
    category: "Ansiedad",
    readTime: "6 min lectura",
    author: "Psicología con Luz",
    image:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "b2",
    type: "video",
    title: "Respiración guiada para pausar antes de reaccionar",
    excerpt:
      "Una práctica breve para volver al presente, bajar la intensidad emocional y crear un espacio interno más amable.",
    date: "2026-05-11",
    category: "Mindfulness",
    readTime: "Video",
    author: "Manuela Molina",
    duration: "8:24",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "b3",
    type: "article",
    title: "Terapia online: cómo preparar un espacio seguro en casa",
    excerpt:
      "Pequeños ajustes antes de una sesión virtual que ayudan a cuidar la privacidad, la atención y la continuidad del proceso.",
    date: "2026-04-29",
    category: "Terapia online",
    readTime: "5 min lectura",
    author: "Equipo Clínico",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "b4",
    type: "video",
    title: "Cómo acompañar una crisis emocional en adolescentes",
    excerpt:
      "Ideas para escuchar sin invalidar, poner límites con cuidado y saber cuándo pedir apoyo profesional.",
    date: "2026-04-17",
    category: "Familia",
    readTime: "Video",
    author: "Psicología con Luz",
    duration: "12:06",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "b5",
    type: "article",
    title: "Pensamientos automáticos: identificarlos sin pelear con ellos",
    excerpt:
      "Una guía inicial para observar patrones de pensamiento y construir respuestas más conscientes desde el enfoque cognitivo conductual.",
    date: "2026-04-03",
    category: "Herramientas",
    readTime: "7 min lectura",
    author: "Equipo Clínico",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "b6",
    type: "article",
    title: "Cuándo pedir ayuda: señales que vale la pena escuchar",
    excerpt:
      "No hace falta tocar fondo para empezar un proceso. Estas señales pueden ayudarte a reconocer que necesitas acompañamiento.",
    date: "2026-03-21",
    category: "Bienestar",
    readTime: "4 min lectura",
    author: "Psicología con Luz",
    image:
      "https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=1200&q=80",
  },
];

const featuredContent = mockContent[0];
const contentItems = mockContent.slice(1);
const articleCount = mockContent.filter((item) => item.type === "article").length;
const videoCount = mockContent.filter((item) => item.type === "video").length;
const categories = Array.from(new Set(mockContent.map((item) => item.category)));

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const getContentLabel = (type: BlogContentType) =>
  type === "video" ? "Video" : "Artículo";

export default function Blog() {

  useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="blog-page">
      <NavBar />
      <main className="blog-main">
        <section className="blog-hero" aria-labelledby="blog-title">
          <div className="container blog-hero-grid">
            <div className="blog-hero-copy">
              <span className="blog-eyebrow">
                <Sparkles size={14} aria-hidden="true" />
                Recursos para tu proceso
              </span>
              <h1 id="blog-title" className="blog-title st">
                Lecturas y videos para <em>cuidar tu bienestar</em> emocional
              </h1>
              <p className="blog-intro">
                Un espacio de artículos, prácticas breves y reflexiones
                clínicas para acompañar tu día a día con claridad, calma y
                herramientas concretas.
              </p>
            </div>

            <div className="blog-stats" aria-label="Resumen del contenido">
              <div className="blog-stat">
                <strong>{articleCount}</strong>
                <span>artículos</span>
              </div>
              <div className="blog-stat">
                <strong>{videoCount}</strong>
                <span>videos</span>
              </div>
              <div className="blog-stat">
                <strong>{categories.length}</strong>
                <span>temas</span>
              </div>
            </div>
          </div>
        </section>

        <section className="blog-featured-section">
          <div className="container">
            <article className="blog-featured">
              <div className="blog-featured-media">
                <img src={featuredContent.image} alt={featuredContent.title} />
                <span className="blog-type-badge">
                  <BookOpen size={15} aria-hidden="true" />
                  {getContentLabel(featuredContent.type)}
                </span>
              </div>
              <div className="blog-featured-copy">
                <span className="blog-category">{featuredContent.category}</span>
                <h2>{featuredContent.title}</h2>
                <p>{featuredContent.excerpt}</p>
                <div className="blog-meta">
                  <span>
                    <Calendar size={15} aria-hidden="true" />
                    {formatDate(featuredContent.date)}
                  </span>
                  <span>
                    <Clock size={15} aria-hidden="true" />
                    {featuredContent.readTime}
                  </span>
                  <span>Por {featuredContent.author}</span>
                </div>
                <a href="#" className="blog-primary-link">
                  Leer recurso destacado
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="blog-content-section">
          <div className="container blog-layout">
            <div className="blog-feed">
              <div className="blog-section-heading">
                <span className="blog-kicker">Biblioteca</span>
                <h2>Últimos recursos</h2>
              </div>

              <div className="blog-grid">
                {contentItems.map((item) => (
                  <article className="blog-card" key={item.id}>
                    <div className="blog-card-media">
                      <img src={item.image} alt={item.title} />
                      <span className="blog-type-badge">
                        {item.type === "video" ? (
                          <PlayCircle size={15} aria-hidden="true" />
                        ) : (
                          <BookOpen size={15} aria-hidden="true" />
                        )}
                        {getContentLabel(item.type)}
                      </span>
                      {item.duration && (
                        <span className="blog-duration">{item.duration}</span>
                      )}
                    </div>

                    <div className="blog-card-body">
                      <span className="blog-category">{item.category}</span>
                      <h3>{item.title}</h3>
                      <p>{item.excerpt}</p>
                      <div className="blog-meta">
                        <span>
                          <Calendar size={14} aria-hidden="true" />
                          {formatDate(item.date)}
                        </span>
                        <span>
                          <Clock size={14} aria-hidden="true" />
                          {item.duration ?? item.readTime}
                        </span>
                        <span>Por {item.author}</span>
                      </div>
                      <a href="#" className="blog-card-link">
                        {item.type === "video" ? "Ver video" : "Leer artículo"}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="blog-sidebar" aria-label="Categorías y destacados">
              <div className="blog-side-panel">
                <h2>Temas</h2>
                <div className="blog-topic-list">
                  {categories.map((category) => (
                    <a href="#" key={category}>
                      {category}
                    </a>
                  ))}
                </div>
              </div>

              <div className="blog-side-panel blog-side-panel-accent">
                <span className="blog-kicker">Para empezar</span>
                <h2>Elige una práctica breve</h2>
                <p>
                  Si necesitas pausar hoy, empieza por un video corto y vuelve
                  a tu ritmo cuando te sientas lista.
                </p>
                <a href="#" className="blog-outline-link">
                  Explorar videos
                </a>
              </div>

              <div className="blog-side-panel">
                <h2>Recientes</h2>
                <div className="blog-recent-list">
                  {mockContent.slice(0, 3).map((item) => (
                    <a href="#" className="blog-recent-item" key={item.id}>
                      <span>{item.category}</span>
                      <strong>{item.title}</strong>
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
