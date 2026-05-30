import { FORYOU, FOR_ITEMS } from '../../utils';
import { Link } from 'react-router-dom';
import './styles/ForYou.css';
import { useEffect, useRef } from 'react';

const ForYou = () => {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ul = listRef.current;
    if (!ul) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    ul.querySelectorAll('.fy-item').forEach((el) => observer.observe(el));
    // Fallback for desktop: ensure animation runs even if observer doesn't trigger
    if (window.innerWidth > 760) {
      setTimeout(() => {
        ul.querySelectorAll('.fy-item').forEach((el) => el.classList.add('visible'));
      }, 100);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="fy-bg" id="foryou">
      <div className="container">
        <div className="fy-g">
          <div>
            <div className="fy-c">
              <span className="tag-light">¿Es para mí?</span>
              <h2 className="st" style={{ marginBottom: "2rem" }}>
                El acompañamiento psicológico<br />
                <em>puede ayudarte si…</em>
              </h2>
            </div>
            <ul className="fy-list" ref={listRef}>
              {FOR_ITEMS.map((x, i) => (
                <li className="fy-item" key={i}>
                  <div>
                    <strong>{x.t}</strong>
                  </div>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "2.5rem" }}>
              <Link to="/agendar-cita" className="bg">
                Comenzar mi proceso →
              </Link>
            </div>
          </div>
          <div className="fy-img">
            <img src={FORYOU} alt="Para ti" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForYou;
