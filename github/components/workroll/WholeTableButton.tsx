
import { useState } from "react";


export function WholeTableButton(
    { id, presence, name }: { id: string; presence: string; name: string }
) {
    var [flag, setFlag] = useState(true);

    const doClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setFlag(!flag);
    };

    return (
        <div className="App">
            <button onClick={doClick} className={flag ? "bg-blue-500 w-30" : "bg-red-500 w-30"}
                style={{ color: "white", padding: "4px 8px", borderRadius: "4px" }}>
                {name}
            </button>
        </div>
    )
}
