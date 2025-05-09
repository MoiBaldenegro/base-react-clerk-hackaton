import { create } from 'zustand';

const rustHelloWorld = `// proyecto inicial, para participar en el Hackathon de Midudev y Clerk
// Puedes escribir tu código aquí
// ¡Diviértete programando!
// 🦀🦀🦀

fn main() {
    println!("Adios mundo cruel!...   T-T");
}`;

interface EditorState {
    isLoading: boolean;
    error: null | Error;
    message: null | string;
    code: string;
    lenguage: string;
    setCode: (code: string) => void;
    setLenguage: (lenguaje: string) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
    isLoading: false,
    error: null,
    message: null,
    code: rustHelloWorld,
    lenguage: 'javascript',
    setCode: (value: string) => {
        set({ code: value });
},
setLenguage: (lenguage: string) => {
        set({ lenguage });
},
}
));


