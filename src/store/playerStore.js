import { create } from "zustand"; //El estado se puede leer desde un archivo .jsx, .svelte, etc

export const usePlayStore = create((set) =>({
    isPlaying: false,
    currentMusic: {playlist: null, song: null, songs:[]},//music/1/01.mp3
    volume: 1,
    setIsPlaying: (isPlaying) => set({isPlaying}),
    setCurrentMusic: (currentMusic) => set({currentMusic}),
    setVolume: (volume) => set({volume}),
}))