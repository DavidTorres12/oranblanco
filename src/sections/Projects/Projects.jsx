import { useState } from 'react'
import projects from './projectsData'
import './Projects.css'

function Services({ items, compact = false }) {
  return (
    <div className={compact ? 'project-card__tags' : 'project__services'}>
      {items.map((service, index) => (
        <span key={service}>
          {service}
          {!compact && index < items.length - 1 && (
            <i aria-hidden="true">•</i>
          )}
        </span>
      ))}
    </div>
  )
}

function MobileProject({ project }) {
  return (
    <article className="project-mobile">
      <div className="project-mobile__media">
        <img src={project.image} alt={project.imageAlt} loading="lazy" />
      </div>

      <div className="project-mobile__info">
        <h3 className="project-mobile__name">{project.name}</h3>
        <p className="project-mobile__description">{project.description}</p>
        <Services items={project.services} compact />

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
          target="_blank"
          rel="noreferrer"
        >
          Ver proyecto <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  )
}

function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeProject = projects[activeIndex]

  return (
    <section
      id="proyectos"
      className="projects"
      aria-labelledby="projects-title"
    >
      <div className="projects__inner">
        <header className="projects__header">
          <p className="projects__eyebrow">Selección de trabajos</p>
          <h2 id="projects-title" className="projects__title">
            Proyectos destacados<span>.</span>
          </h2>
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
              <img src={activeProject.image} alt={activeProject.imageAlt} />
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

            <Services items={activeProject.services} compact />

            <div className="project-card__meta">
              <span>Proyecto</span>
              <strong>
                {activeProject.number} / {String(projects.length).padStart(2, '0')}
              </strong>
            </div>

            <a
              className="project-card__link"
              href={activeProject.href}
              target="_blank"
              rel="noreferrer"
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
