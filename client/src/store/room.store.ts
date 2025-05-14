import {create} from "zustand";

interface State{
    room: string | null;
    setRoom: (value: string | null) => void;
    }


    export const useRoomStore = create<State>((set) => ({
    room: null,
    setRoom: (value)=> {
        set({room: value});

    }}))
    