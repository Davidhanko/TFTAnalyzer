import { useEffect, useState } from 'react'
import {API_KEY} from "./assets/API.ts";

function App() {
  const [data, setData] = useState<never[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const apiKey = API_KEY

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/tft/summoner/v1/summoners/by-account/{encryptedAccountId}', {
          headers: {
            'X-API-Key': apiKey || '', // Add the API key to the headers
          },
        })
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        const result = await response.json()
        setData(result)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [apiKey])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
      <div>
        <h1>API Results</h1>
        <ul>
          {data.map((item, index) => (
              <li key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      </div>
  )
}

export default App
