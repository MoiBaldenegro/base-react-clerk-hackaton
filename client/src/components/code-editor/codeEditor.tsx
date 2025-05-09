import React, { useEffect, useRef } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import styles from './codeEditor.module.css';

interface CodeEditorProps {
  language: string;
  code: string;
  setCode: (value: string) => void;
  height?: string;
  isAsideOpen: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  code,
  setCode,
  isAsideOpen,
  height,
}) => {
  const monaco = useMonaco();
  const editorRef = useRef(null);

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('customTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '008800', fontStyle: 'italic' },
        ],
        colors: {
          'editor.background': '#000000',
          'editor.foreground': '#d4d4d4',
        },
      });
    }
  }, [monaco]);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    monaco.editor.setTheme('customTheme');
  }

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  }, [isAsideOpen]);

 

  return (
    <div className={styles.onlyEditorContainer}>
      <Editor
        onMount={handleEditorDidMount}
        height={height || "100%"}
        language='javascript'
        value={code}
         onChange={(newValue) => {
        if(newValue) setCode(newValue);
      }}
        options={{
          fontSize: 16,
          minimap: { enabled: true },
        }}
      />
    </div>
  );
};

export default CodeEditor;