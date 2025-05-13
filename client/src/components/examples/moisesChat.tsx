import styles from "./moisesChat.module.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { internalPromt } from "./internalPromt";
import { Button, makeStyles } from "@fluentui/react-components";
import { SendRegular } from "@fluentui/react-icons";

export const MoisesChat = ({ onClose }) => {

  const useClasses = makeStyles({
    
  icon24: { fontSize: "24px", color: "#fff" },
});
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const apiUrl = import.meta.env.VITE_OPENAI_API_URL;

  const [respuestaCompleta, setRespuestaCompleta] = useState("");
  const [respuestaVisible, setRespuestaVisible] = useState("");
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [userPrompt, setUserPrompt] = useState(""); // Estado para almacenar el prompt del usuario

  const indexRef = useRef(0);
  const typingTimeoutRef = useRef(null);
  const responseContainerRef = useRef(null); // Referencia para el contenedor de respuesta

  // Función para limpiar texto y evitar caracteres invisibles
  const limpiarTexto = (text) => {
    if (!text) return "";
    return text
      .replace(/\r\n/g, "\n")
      .replace(/\u200B/g, "")
      .trim();
  };

  // Efecto para mostrar la respuesta con efecto de tipeo
  useEffect(() => {
    if (!respuestaCompleta) {
      setRespuestaVisible("");
      return;
    }

    const textoLimpio = limpiarTexto(respuestaCompleta);
    const textoArray = Array.from(textoLimpio);

    setRespuestaVisible("");
    indexRef.current = 0;

    const typeNextChar = () => {
      setRespuestaVisible((prev) => {
        // Hacer scroll al contenedor después de añadir un carácter
        if (responseContainerRef.current) {
          setTimeout(() => {
            responseContainerRef.current.scrollTop = responseContainerRef.current.scrollHeight;
          }, 0);
        }
        return prev + textoArray[indexRef.current - 1];
      });
      
      indexRef.current++;

      if (indexRef.current < textoArray.length) {
        typingTimeoutRef.current = setTimeout(typeNextChar, 3); // velocidad 3ms por carácter
      }
    };

    typeNextChar();

    return () => clearTimeout(typingTimeoutRef.current);
  }, [respuestaCompleta]);

  // Función para manejar cambios en el input del prompt
  const handlePromptChange = (e) => {
    setUserPrompt(e.target.value);
  };

  // Función para manejar la pulsación de Enter en el input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !cargando && userPrompt.trim()) {
      handleButtonClick();
    }
  };

  const handleButtonClick = () => {
    // Verificar que haya un prompt
    if (!userPrompt.trim()) {
      setError("Por favor, escribe una pregunta primero");
      return;
    }

    setCargando(true);
    setError(null);
    setRespuestaCompleta("");
    setRespuestaVisible("");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    const data = {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content:  `${internalPromt} La solicitud del es: ${userPrompt}`}],
    };

    axios
      .post(`${apiUrl}/chat/completions`, data, { headers })
      .then((response) => {
        if (
          response.data &&
          response.data.choices &&
          response.data.choices[0] &&
          response.data.choices[0].message &&
          typeof response.data.choices[0].message.content === "string"
        ) {
          setRespuestaCompleta(response.data.choices[0].message.content);
        } else {
          setError("Respuesta inesperada");
        }
        setCargando(false);
      })
      .catch(() => {
        setError("Error al obtener respuesta");
        setCargando(false);
      });
  };

    const classes = useClasses();


  return (
    <div className={styles.container}>
      <header>
        <h1>Moises AI</h1>
        <Button apearance="primary" onClick={onClose} >
          x
        </Button>
      </header>
       <div ref={responseContainerRef} className={styles.responseContainer}>
        <p className={styles.response}>{respuestaVisible}</p>
      </div>
      
      {/* Campo de entrada para el prompt */}
      <div className={`${styles.promptContainer} ${styles.promptInput}`}>
        <input
          type="text"
          value={userPrompt}
          onChange={handlePromptChange}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu pregunta aquí..."
          className={styles.promptInput}
          disabled={cargando}
        />
        <button onClick={handleButtonClick} disabled={cargando} className={styles.button}>
        <SendRegular
          className={classes.icon24}
          aria-label="SendRegular size 24"
        />
      </button>
      </div> 
      {error && <p className={styles.error}>{error}</p>}
     
    </div>
  );
};