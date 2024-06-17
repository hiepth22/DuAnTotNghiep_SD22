import React from "react";
import useBearStore from "../../../store/useBearStore";
import Controls from "../../../store/Controls";
function HomePage() {
    const bears = useBearStore((state) => state.bears);

    return (
        <div>
            <h1>Count: {bears}</h1>
            <Controls />
        </div>
    );
}

export default HomePage;
