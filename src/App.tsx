import { useState } from 'react'

type CodeFiles =  Record<string, { code: string, active?: boolean }>
const startingFiles: CodeFiles = {
  'index.js': {
    code: `console.log('Hello World')`
  },
  'index.html': {
    code: `<h1>Hello World</h1>`
  },
  'index.css': {
    code: `h1 { color: red; }`
  }
}

function App() {
  const [files, setFiles] = useState<CodeFiles>(startingFiles)
  const activeFile = Object.keys(files).find((file) => files[file].active) || ''
  const code = files[activeFile].code
  const languageExtension = activeFile.split('.').pop() || ''

  return (
    <>
    </>
  )
}

export default App
