import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-blue-500 text-white text-center p-4 rounded-md'>
        Tailwind CSS is working! 🎉
      </div>
    </>
  )
}

export default App
