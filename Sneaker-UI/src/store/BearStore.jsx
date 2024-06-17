import { create } from "zustand";
import { Controls } from "./Controls";

const useBearStore = create((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
}));

function BearCounter() {
    const bears = useBearStore((state) => state.bears);
    return (
        <div>
            <h1>{bears} around here ...</h1>;
        </div>
    );
}
