import React from "react";                                                                                                                    
  import NavBar from "../../components/layout/NavBar";                                                                                          
  import "./Blog.css";                                                                                                                          
                                                                                                                                              
  // Mock posts – replace with real data / API later
  const mockPosts = [
    {
      id: "b1",
      title: "Cómo manejar la ansiedad en tiempos de crisis",
      excerpt:
        "Consejos prácticos para reducir la ansiedad diaria y recuperar el equilibrio emocional.",
      date: "2026-05-10",
    },
    {
      id: "b2",
      title: "Los beneficios de la terapia online",
      excerpt:
        "Exploramos por qué cada vez más personas eligen la terapia virtual y cómo funciona.",
      date: "2026-04-22",
    },
    {
      id: "b3",
      title: "Mindfulness para principiantes",
      excerpt:
        "Guía paso a paso para iniciar una práctica de atención plena y reducir el estrés.",
      date: "2026-03-15",
    },
  ];

  export default function Blog() {
    return (
      <div className="blog-page">
        <NavBar />
        <main className="blog-content">
          <h1 className="blog-title">Blog</h1>
          <ul className="post-list">
            {mockPosts.map((post) => (
              <li key={post.id} className="post-item">
                <h2 className="post-title">{post.title}</h2>
                <p className="post-date">
                  {new Date(post.date).toLocaleDateString("es-CO")}
                </p>
                <p className="post-excerpt">{post.excerpt}</p>
                <button className="read-more btn btn-primary">Leer más</button>
              </li>
            ))}
          </ul>
        </main>
      </div>
    );
  }