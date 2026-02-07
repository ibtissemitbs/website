import { useLanguage } from '../context/LanguageContext'
import './ApiIntegration.css'

function ApiIntegration() {
  const { t } = useLanguage()

  const codeExample = `fetch("https://hate-speech-api-486614.uc.r.appspot.com/api/analyze", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: "Votre texte à analyser ici" })
})
.then(res => res.json())
.then(data => console.log(data));`

  return (
    <section className="api-integration">
      <div className="integration-container">
        <div className="integration-header">
          <h2>{t('apiInt.title')}</h2>
          <p>{t('apiInt.subtitle')}</p>
        </div>

        <div className="integration-content">
          <div className="code-example">
            <div className="code-header">
              <span className="code-language">{t('apiInt.codeLabel')}</span>
              <button className="copy-btn">{t('apiInt.copy')}</button>
            </div>
            <pre>
              <code>{codeExample}</code>
            </pre>
          </div>

          <div className="response-example">
            <div className="response-example-header">
              <h3>{t('apiInt.responseTitle')}</h3>
            </div>
            <div className="response-box">
              <pre>
                <code>{`{
  "predictions": [
    {
      "label": "hate_speech",
      "confidence": 0.87,
      "categories": {
        "racism": 0.45,
        "sexism": 0.12,
        "homophobia": 0.03
      }
    }
  ]
}`}</code>
              </pre>
            </div>
            <p className="response-note">
              {t('apiInt.responseNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApiIntegration
