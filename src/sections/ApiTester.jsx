import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './ApiTester.css'

function ApiTester() {
  const { t } = useLanguage()
  const apiUrl = 'http://localhost:5000/api'
  const endpoint = '/analyze'
  const method = 'POST'

  const [textToAnalyze, setTextToAnalyze] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendRequest = async () => {
    if (!apiUrl || !endpoint) {
      setResponse(t('apiTester.errorURL'))
      return
    }

    if (!textToAnalyze.trim()) {
      return
    }

    setIsLoading(true)
    setResponse(t('apiTester.sending'))

    try {
      const fullUrl = new URL(endpoint, apiUrl).toString()
      
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        }
      }

      options.body = JSON.stringify({ text: textToAnalyze })

      const res = await fetch(fullUrl, options)
      const data = await res.json()

      const formattedResponse = {
        status: res.status,
        statusText: res.statusText,
        headers: {
          'content-type': res.headers.get('content-type'),
          'content-length': res.headers.get('content-length')
        },
        body: data
      }

      setResponse(JSON.stringify(formattedResponse, null, 2))
    } catch (error) {
      setResponse(t('apiTester.errorRequest') + error.message + t('apiTester.errorCheck'))
    } finally {
      setIsLoading(false)
    }
  }

  const copyResponse = () => {
    navigator.clipboard.writeText(response).then(() => {
      alert(t('apiTester.copied'))
    }).catch(err => {
      console.error('Erreur lors de la copie:', err)
      alert(t('apiTester.errorCopy'))
    })
  }

  return (
    <section className="api-tester">
      <div className="api-container">
        <div className="agent-card">
          <div className="agent-header">
            <span className="agent-badge">{t('apiTester.title')}</span>
          </div>
          
          <p className="agent-greeting">
            {t('apiTester.greeting')}
          </p>

          <div className="agent-input-wrapper">
            <div className="agent-input-container">
              <textarea
                id="text-to-analyze"
                rows="3"
                placeholder={t('apiTester.placeholder')}
                value={textToAnalyze}
                onChange={(e) => setTextToAnalyze(e.target.value)}
              />
              <button
                className="send-btn"
                onClick={sendRequest}
                disabled={isLoading}
                aria-label="Send"
              >
                {isLoading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {response ? (
            <div className="agent-response">
              <h4>{t('apiTester.response')}</h4>
              <div className="response-container">
                <pre>{response}</pre>
              </div>
              <button className="btn btn-secondary" onClick={copyResponse}>
                {t('apiTester.copy')}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default ApiTester
