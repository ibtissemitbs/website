import { useLanguage } from '../context/LanguageContext'
import './Guide.css'

function Guide() {
  const { t } = useLanguage()

  return (
    <section className="guide">
      <div className="guide-container">
        <div className="guide-header">
          <h2>{t('guide.title')}</h2>
          <p>{t('guide.subtitle')}</p>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>{t('guide.step1Title')}</h3>
              <p>{t('guide.step1')}</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>{t('guide.step2Title')}</h3>
              <p>{t('guide.step2')}</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>{t('guide.step3Title')}</h3>
              <p>{t('guide.step3')}</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>{t('guide.step4Title')}</h3>
              <p>{t('guide.step4')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Guide
