import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import styles from './codeEditor.module.css';

interface CodeEditorProps {
  language: string;
  theme: string;
  value: string;
  onChange: (value: string | undefined) => void;
  height?: string;
}



const CodeEditor: React.FC<CodeEditorProps> = ({ language, theme, value, onChange , isAsideOpen, height }) => {
  const editorRef = useRef(null);

  
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
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
      defaultLanguage={language}
      defaultValue={value}
      theme={theme}
      onChange={onChange}
      options={{
        fontSize: 16,
        minimap: { enabled: true},
      }}
    />
    </div>
  );
};

export default CodeEditor;

