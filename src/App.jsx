
import './App.css'

function App() {
  console.log(".env key is")
  console.log(import.meta.env.VITE_APPWRITE_URL)

  return (
    <>
      <h1>This is react with appwrite</h1>
    </>
  )
}

export default App
