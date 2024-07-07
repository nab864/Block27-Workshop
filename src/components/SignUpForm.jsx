import { useState } from "react"


function SignUpForm({ setToken }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup',
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        }
      )
      const result = await response.json()
      console.log(result)
      setToken(result.token)
      setSuccess(result.message)
    } catch (error) {
      setError(error.message)
    }
    
  }

  return (
    <>
      <h2>Sign Up</h2>
      { success && <p>{success}</p> }
      { error ? <p>{error}</p> : <p>No Error</p> }
      <form onSubmit={handleSubmit}>
        <label>Username:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} required minLength={8}/>
        </label>
        <label>Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8}/>
        </label>
        <button>Submit</button>
      </form>
    </>
  )
}

export default SignUpForm