import CodeEditor from '../../code-editor/codeEditor';
import React, { useEffect, useState } from 'react';
import styles from './mainCodeWindow.module.css';
import { AvatarGroup, Button, makeStyles } from '@fluentui/react-components';
import { SplitButtonComponent } from '../../ui/splitButton';
import { AvatarGroupComponent } from '../../ui/avatarGroup';
import { RectangleLandscapeSparkleFilled } from "@fluentui/react-icons";


const API_KEY = import.meta.env.VITE_RAPIDAPI_API_KEY; // Asegúrate de que la variable de entorno esté definida

interface LanguageOption {
  id: number;
  name: string;
}

const languageOptions: LanguageOption[] = [
  { id: 63, name: 'javascript' },
  {
    id:74, name: 'typescript'
  },
  { id: 71, name: 'python' },
  { id: 73, name: 'rust' },
  {id:51, name: "C#"},
  {id: 62, name: 'java 13.0.1' },
];


interface Props{
  users?: any[];
  code: string;
  setCode: (value: string) => void;
  openChat: (value: string) => void;
  isAsideOpen: boolean;

}

const MainCodeWindow: React.FC = ({ users, code, setCode, openChat, isAsideOpen }: Props) => {
  const [language, setLanguage] = useState<LanguageOption>(languageOptions[3]);
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

   const useClasses = makeStyles({
      
    icon24: { fontSize: "24px", color: "#fff", marginLeft: "8px" },
  });

  // Función para crear submission y obtener token
  async function createSubmission(code: string, languageId: number): Promise<string> {
    const response = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      },
      body: JSON.stringify({
        language_id: languageId,
        source_code: code, 
      }),
    });

    if (!response.ok) {
        console.log(response);
      throw new Error('Error al crear submission');
    }

    const data = await response.json();
    return data.token;
  }

  // Función para obtener resultado con polling
  async function getSubmissionResult(token: string): Promise<any> {
    while (true) {
      const response = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener resultado');
      }

      const data = await response.json();

      // status.id: 1 = In Queue, 2 = Processing, otros = terminado
      if (data.status.id === 1 || data.status.id === 2) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // esperar 1s y volver a consultar
      } else {
        return data;
      }
    }
  }

  // Función principal para ejecutar código
  const runCode = async () => {
    setLoading(true);
    setOutput('Ejecutando...');
    try {
      const token = await createSubmission(code, language.id);
      const result = await getSubmissionResult(token);

      if (result.stdout) {
        setOutput(result.stdout);
      } else if (result.compile_output) {
        setOutput(result.compile_output);
      } else if (result.stderr) {
        setOutput(result.stderr);
      } else if (result.message) {
        setOutput(result.message);
      } else {
        setOutput('Sin salida');
      }
    } catch (error) {
      setOutput('Error al ejecutar el código');
      console.error(error);
    }
    setLoading(false);
  };
    const classes = useClasses();


useEffect(() => {
  console.log(users);
}, [users]); // Agregar users como dependencia para que se ejecute cada vez que cambie
 
  return (
    <div className={styles.container}>
      <header>
       { users?.length && 
        <div className={styles.onlineUsers}>
          <AvatarGroupComponent type='stack' size='36' users={users}/>
        </div >}
      <select
        value={language.id}
        onChange={(e) => {
          const lang = languageOptions.find((l) => l.id === parseInt(e.target.value));
          if (lang) setLanguage(lang);
        }}
        className={styles.selectOutline}
        id='selectOutline'
      >
        {languageOptions.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.name}
          </option>
        ))}
      </select>
      </header>
      
      

      <CodeEditor language={language.name} code={code} setCode={setCode}  isAsideOpen={isAsideOpen}/>
      <div className={styles.console}>
    <section>
    <Button appearance="primary" onClick={runCode} disabled={loading} className={styles.runButton} >{loading ? 'Ejecutando...' : 'Ejecutar Código'}</Button>
    <Button appearance="outline" onClick={()=> setOutput("")} disabled={loading} className={styles.runButton} >Limpiar consola</Button>
    <Button appearance="outline" shape="circular" onClick={openChat} disabled={loading} className={styles.runButton} >Moises AI <RectangleLandscapeSparkleFilled className={classes.icon24} /></Button>

    </section>
      <pre className="mt-4 p-4 bg-gray-100 rounded h-40 overflow-auto whitespace-pre-wrap">{output}</pre>

      </div>
    </div>
  );
};

export default MainCodeWindow;
