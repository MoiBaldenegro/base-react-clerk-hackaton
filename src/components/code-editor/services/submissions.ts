export async function createSubmission(code: string, languageId: number, apiKey: string): Promise<string> {
    const response = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      },
      body: JSON.stringify({
        language_id: languageId,
        source_code: code,
      }),
    });
  
    if (!response.ok) {
      throw new Error('Error al crear submission');
    }
  
    const data = await response.json();
    return data.token; // Token para consultar resultado
  }
  

  interface Judge0Result {
    status: { id: number; description: string };
    stdout: string | null;
    stderr: string | null;
    compile_output: string | null;
    message: string | null;
  }
  
 export  async function getSubmissionResult(token: string, apiKey: string): Promise<Judge0Result> {
    const response = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      },
    });
  
    if (!response.ok) {
      throw new Error('Error al obtener resultado');
    }
  
    const data: Judge0Result = await response.json();
    return data;
  }
  