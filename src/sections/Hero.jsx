import { useLanguage } from '../context/LanguageContext'
import './Hero.css'

function Hero({ onGetStarted }) {
  const { t } = useLanguage()

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">{t('hero.badge')}</div>
        <h1>{t('hero.title')}</h1>
        <p className="hero-subtitle">
          {t('hero.subtitle')}
        </p>
        
        <div className="cta-buttons">
          <button className="btn btn-primary btn-large" onClick={onGetStarted}>
            {t('hero.btnStart')}
          </button>
          <button className="btn btn-secondary btn-large">
            {t('hero.btnDoc')}
          </button>
        </div>

        <div className="hero-features">
          <div className="hero-feature">
            <span className="feature-icon">⚡</span>
            <span>{t('hero.feature1')}</span>
          </div>
          <div className="hero-feature">
            <span className="feature-icon">🆓</span>
            <span>{t('hero.feature2')}</span>
          </div>
        </div>
      </div>
      <div className="hero-decoration">
        <div className="decoration-circle"></div>
        <div className="decoration-wave"></div>
      </div>
    </section>
  )
}

export default Hero
