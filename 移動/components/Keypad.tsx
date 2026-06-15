type KeypadProps = {
    onPress: (key: string) => void;
};

export function Keypad({ onPress }: KeypadProps) {
    const numberKeys = ["0","1","2","3","4","5","6","7","8","9",".","-","DEL"];
    const alphaKeys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    return (
        <div className="mt-3">
            {/* 数字キー */}
            <div className="grid grid-cols-5 gap-2">
                {numberKeys.map(k => (
                    <button
                        key={k}
                        type="button"
                        onClick={() => onPress(k)}
                        className="bg-gray-200 py-3 rounded text-2xl font-bold"
                    >
                        {k}
                    </button>
                ))}
            </div>

            {/* アルファベットキー */}
            <div className="grid grid-cols-6 gap-2 mt-3">
                {alphaKeys.map(k => (
                    <button
                        key={k}
                        type="button"
                        onClick={() => onPress(k)}
                        className="bg-gray-200 py-3 rounded text-2xl font-bold"
                    >
                        {k}
                    </button>
                ))}
            </div>
        </div>
    );
}
