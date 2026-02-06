import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './ApiTester.css'

function ApiTester() {
  const { t } = useLanguage()
  const [apiUrl, setApiUrl] = useState('http://localhost:5000/api')
  const [endpoint, setEndpoint] = useState('/analyze')
  const [method, setMethod] = useState('POST')
  const [requestBody, setRequestBody] = useState('{\n  "text": "Analysez ce texte pour le hatespeech"\n}')
  const [response, setResponse] = useState('En attente de réponse...')
  const [isLoading, setIsLoading] = useState(false)

  const sendRequest = async () => {
    if (!apiUrl || !endpoint) {
      setResponse(t('apiTester.errorURL'))
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

      if (method !== 'GET' && requestBody) {
        try {
          JSON.parse(requestBody)
          options.body = requestBody
        } catch (e) {
          setResponse('❌ Erreur JSON: ' + e.message)
          setIsLoading(false)
          return
        }
      }

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
        <div className="api-header">
          <h2>{t('apiTester.title')}</h2>
          <p>{t('apiTester.subtitle')}</p>
        </div>

        <div className="api-content">
          {/* Configuration */}
          <div className="api-config">
            <h3>Configuration</h3>
            <div className="form-group">
              <label htmlFor="api-url">{t('apiTester.url')} :</label>
              <input
                type="text"
                id="api-url"
                placeholder="http://localhost:5000/api"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="api-endpoint">{t('apiTester.endpoint')} :</label>
              <input
                type="text"
                id="api-endpoint"
                placeholder="/analyze"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="request-method">{t('apiTester.method')} :</label>
              <select
                id="request-method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
          </div>

          {/* Request Body */}
          <div className="api-request">
            <h3>{t('apiTester.textToAnalyze')}</h3>
            <div className="form-group">
              <label htmlFor="request-body">{t('apiTester.body')} :</label>
              <textarea
                id="request-body"
                rows="10"
                placeholder='{"text": "Votre texte ici"}'
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
              />
            </div>

            <button
              className="btn btn-pink"
              onClick={sendRequest}
              disabled={isLoading}
            >
              {isLoading ? t('apiTester.analyzing') : t('apiTester.send')}
            </button>
          </div>

          {/* Response */}
          <div className="api-response">
            <h3>{t('apiTester.response')}</h3>
            <div className="response-container">
              <pre>{response}</pre>
            </div>
            <button className="btn btn-secondary" onClick={copyResponse}>
              {t('apiTester.copy')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApiTester
