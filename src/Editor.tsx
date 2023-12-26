// the editor only deal with the code
interface EditorProps {
  code: string;
  extension: string;
  onCodeUpdate: (code: string) => void;
}

export const Editor = () => {}