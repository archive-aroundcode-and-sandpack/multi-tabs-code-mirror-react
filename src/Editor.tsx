import { useEffect, useRef, useState } from "react";

import {
  EditorState
} from '@codemirror/state'

import {
  EditorView
} from '@codemirror/view'

import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { basicSetup } from "codemirror";

// the editor only deal with the code
interface EditorProps {
  code: string;
  extension: keyof typeof languageExtensionMap;
  onCodeUpdate: (code: string) => void;
}

export const languageExtensionMap = {
  'tsx': 'typescript',
  'ts': 'typescript',
  'js': 'javascript',
  'jsx': 'javascript',
  'html': 'html',
  'css': 'css'
} as const

export const Editor = ({ code, extension, onCodeUpdate }: EditorProps) => {
  const [internalCode, setInternalCode] = useState(code);
  const wrapper = useRef<HTMLDivElement>(null);
  const cmView = useRef<EditorView | null>(null);

  useEffect(() => { 
    const languagueExtension = languageExtensionMap[extension];

    const languagesSupport = {
      javascript: javascript({ jsx: true, typescript: false }),
      typescript: javascript({ jsx: true, typescript: true }),
      html: html(),
      css: css(),
    }

    const editorState = EditorState.create({
      doc: code,
      extensions:[
        basicSetup,
        languagesSupport[languagueExtension]
      ]
    });

    // you could also use a ref here
    const view = new EditorView({
      state: editorState,
      parent: document.querySelector('#editor')!,
      dispatch: (tr) => {
        view.update([tr]);

        if (tr.docChanged) {
          const newCode = tr.newDoc.sliceString(0, tr.newDoc.length);
          setInternalCode(newCode);
          onCodeUpdate(newCode);
        }
      },
    });

    cmView.current = view;

    return () => {
      view.destroy();
    };
  }, [])

  useEffect(() => {
    // this only run when updating the active file
    const isSameCode = code === internalCode;
    if (cmView.current && !isSameCode) {
      const view = cmView.current;
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: code },
      });
    }
  }, [code])

  return (
    <div ref={wrapper}>
      <div id="editor"></div>
    </div>
  )
}