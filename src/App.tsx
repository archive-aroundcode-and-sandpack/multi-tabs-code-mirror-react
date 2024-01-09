import { useState } from 'react'
import { Editor, languageExtensionMap } from './Editor'

type CodeFiles =  Record<string, { code: string, active?: boolean }>
const startingFiles: CodeFiles = {
  'index.js': {
    code: `console.log('Hello World')`,
    active: true
  },
  'index.html': {
    code: `<h1>Hello World</h1>`
  },
  'index.css': {
    code: `h1 { color: red; }`
  }
}

function App() {
  const [files, setFiles] = useState<CodeFiles>(startingFiles);
  const activeFile = Object.keys(files).find((file) => files[file].active) || '';
  const code = files[activeFile].code;
  const languageExtension = activeFile.split('.').pop() as keyof typeof languageExtensionMap;

  const handleCodeUpdate = (code: string) => {
    setFiles((files) => ({
      ...files,
      [activeFile]: {
        ...files[activeFile],
        code,
      }
    }))
  }

  const updateActiveFile = (filename: string) => {
    setFiles((files) => ({
      ...files,
      [activeFile]: {
        ...files[activeFile],
        active: false
      },
      [filename]: {
        ...files[filename],
        active: true
      }
    }))
  }

  return (
    <>
      <div data-is="tabs">
      {Object.keys(files).map((filename) => (
        <button key={filename} onClick={() => updateActiveFile(filename)}>
          {filename}
        </button>
      ))}
      </div>
      <Editor 
        code={code} 
        extension={languageExtension} 
        onCodeUpdate={handleCodeUpdate}  
        key={activeFile}
      />
    </>
  )
}

export default App
