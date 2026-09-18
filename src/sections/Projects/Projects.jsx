import { useEffect, useRef, useState } from 'react'
import projects from './projectsData'
import './Projects.css'

function ProjectTags({ items }) {
  return (
    <div className="project-card__tags">
      {items.map((service) => (
        <span key={service}>{service}</span>
      ))}
    </div>
  )
}

function MobileProject({ project }) {
  return (
    <article className="project-mobile">
      <div className="project-mobile__media">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="project-mobile__info">
        <h3 className="project-mobile__name">{project.name}</h3>
        <p className="project-mobile__description">{project.description}</p>
        <ProjectTags items={project.services} />

        <div className="project-mobile__meta">
          {project.category && (
            <p>
              <span>Categoría</span>
              <strong>{project.category}</strong>
            </p>
          )}
          <p>
            <span>Proyecto</span>
            <strong>
              {project.number} / {String(projects.length).padStart(2, '0')}
            </strong>
          </p>
        </div>

        <a
          className="project__link"
          href={project.href}
          target={project.href && project.href !== '#' ? '_blank' : undefined}
          rel={project.href && project.href !== '#' ? 'noopener noreferrer' : undefined}
          onClick={project.href === '#' ? (e) => e.preventDefault() : undefined}
        >
          Ver proyecto <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  )
}

function Projects() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeProject = projects[activeIndex]

  useEffect(() => {
    const node = sectionRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      className={`projects${inView ? ' projects--visible' : ''}`}
      aria-labelledby="projects-title"
    >
      <div className="projects__inner">
        <header className="projects__header">
          <h2 id="projects-title" className="projects__title">
            PROYECTOS DESTACADOS<span>.</span>
          </h2>
          <p className="projects__subtitle">
            Una selección de trabajos premium — webs de alta conversión pensadas para marcas que quieren verse como la autoridad que son.
          </p>
        </header>

        <div className="projects__desktop-grid">
          <nav className="projects__selector" aria-label="Seleccionar proyecto">
            {projects.map((project, index) => (
              <button
                className={`projects__selector-button${activeIndex === index ? ' projects__selector-button--active' : ''}`}
                type="button"
                key={project.number}
                aria-pressed={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              >
                <span>{project.number}</span>
                {project.name}
              </button>
            ))}
          </nav>

          <div className="project-stage" aria-live="polite">
            <div className="project-stage__content" key={activeProject.number}>
              <img
                src={activeProject.image}
                alt={activeProject.imageAlt}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <article className="project-card" key={activeProject.name}>
            <div className="project-card__heading">
              <span className="project-card__number">{activeProject.number}</span>
              <h3>{activeProject.name}</h3>
            </div>

            <p className="project-card__description">
              {activeProject.description}
            </p>

            {activeProject.category && (
              <p className="project-card__category">{activeProject.category}</p>
            )}

            <ProjectTags items={activeProject.services} />

            <div className="project-card__meta">
              <span>Proyecto</span>
              <strong>
                {activeProject.number} / {String(projects.length).padStart(2, '0')}
              </strong>
            </div>

            <a
              className="project-card__link"
              href={activeProject.href}
              target={activeProject.href && activeProject.href !== '#' ? '_blank' : undefined}
              rel={activeProject.href && activeProject.href !== '#' ? 'noopener noreferrer' : undefined}
              onClick={activeProject.href === '#' ? (e) => e.preventDefault() : undefined}
            >
              Ver proyecto <span aria-hidden="true">↗</span>
            </a>
          </article>
        </div>

        <div className="projects__mobile-list">
          {projects.map((project) => (
            <MobileProject project={project} key={project.number} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
