import { useState } from 'react'
import { getWhatsAppUrl } from '../../config/contact'
import './FAQ.css'

const WHATSAPP_URL = getWhatsAppUrl()

const faqs = [
  {
    number: '01',
    question: '¿Qué tipo de soluciones desarrollan?',
    answer:
      'Creamos software a medida, sistemas de gestión, sitios web, landing pages, tiendas online y automatizaciones adaptadas a cada negocio.',
  },
  {
    number: '02',
    question: '¿Necesito tener conocimientos de tecnología?',
    answer:
      'No. Te acompañamos durante todo el proceso y explicamos cada decisión de manera clara.',
  },
  {
    number: '03',
    question: '¿Cómo comienza un proyecto?',
    answer:
      'Primero conversamos para entender tu negocio, el problema y los objetivos. Después proponemos una solución y definimos los próximos pasos.',
  },
  {
    number: '04',
    question: '¿Cuánto cuesta desarrollar un proyecto?',
    answer:
      'Depende de su alcance y complejidad. Después de una primera conversación preparamos una propuesta clara y adaptada a lo que realmente necesitás.',
  },
  {
    number: '05',
    question: '¿Puedo consultar aunque todavía sea solamente una idea?',
    answer:
      'Sí. No necesitás tener todo definido. Podemos ayudarte a ordenar la idea y evaluar si tiene sentido desarrollarla.',
  },
]

function FAQ() {
  // La primera pregunta (01) aparece abierta inicialmente
  const [openIndex, setOpenIndex] = useState(0)

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <section id="faq" className="faq" aria-labelledby="faq-title">
      <div className="faq__inner">
        {/* Columna Izquierda */}
        <div className="faq__sidebar">
          <p className="faq__eyebrow">PREGUNTAS FRECUENTES</p>

          <h2 id="faq-title" className="faq__title">
            Antes de empezar, <br />
            despejemos <br />
            <span className="faq__title-highlight">algunas dudas.</span>
          </h2>

          <p className="faq__description">
            ¿Tenés una idea, un problema por resolver o todavía no sabés
            exactamente qué necesitás? Escribinos.
          </p>

          <a
            className="faq__btn"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hablemos por WhatsApp (abre en una nueva pestaña)"
          >
            <span>Hablemos por WhatsApp</span>
            <span className="faq__btn-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>

        {/* Columna Derecha: Acordeón */}
        <div className="faq__accordion" role="region" aria-label="Acordeón de preguntas frecuentes">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            const contentId = `faq-content-${index}`
            const buttonId = `faq-trigger-${index}`

            return (
              <div
                key={faq.number}
                className={`faq__item${isOpen ? ' faq__item--open' : ''}`}
              >
                <button
                  id={buttonId}
                  className="faq__trigger"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="faq__number">{faq.number}</span>
                  <span className="faq__question">{faq.question}</span>
                  <span className="faq__toggle" aria-hidden="true">
                    <span className="faq__toggle-h" />
                    <span className="faq__toggle-v" />
                  </span>
                </button>

                <div
                  id={contentId}
                  className="faq__answer-wrapper"
                  role="region"
                  aria-labelledby={buttonId}
                >
                  <div className="faq__answer-inner">
                    <p className="faq__answer">{faq.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
