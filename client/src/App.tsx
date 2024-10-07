import { useEffect, useState } from 'react'
import './App.css'

function App() {
  

  const [quote, setQuote] = useState<{ text: string, author: string }>({ text: 'Today is Sunday omggggg', author: 'Dante' })

  return (
    <>
    {/* Daily Quote */}
    <div className="fixed w-full h-64 bg-red-200 -z-10"></div>
    <div className="max-w-screen-lg mx-auto">
      
      <div className="flex flex-col justify-center gap-2 w-2/5 mx-auto h-64">
        <h1 className="text-center text-4xl font-semibold text-wrap">
          {quote.text}
        </h1>
        <p className="text-right text-xl font-light">
          -{quote.author}
        </p>
      </div>
      
      {/* Your Wellness Overview */}
      <div>

      </div>
    </div>
    </>
  )
}

export default App
