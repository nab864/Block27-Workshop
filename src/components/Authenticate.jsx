import { useState } from "react"


function Authenticate({ token }) {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [authData, setAuthData] = useState(null)

  const handleOnClick = async () => {
    try {
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      )
      const result = await response.json()
      console.log(result)
      setSuccess(result.message)
      setAuthData(result.data.username)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
      <h2>Authenticate</h2>
      { success && <p>{success}</p> }
      { error ? <p>{error}</p> : <p>No Error</p> }
      <button onClick={handleOnClick}>Authenticate Token</button>
      { authData && <p>Current Username: {authData}</p> }
    </>
  )
}

export default Authenticate