'use client'

import { useState, useEffect } from "react";

export function CurrentTime() {
	const [currentTime, setCurrentTime] = useState<string>("")

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString("ja-JP", {
				month: "long",
				day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            });
            setCurrentTime(timeString);
        };

        updateClock(); // 初回実行
        const intervalId = setInterval(updateClock, 1000); // 毎秒更新

        return () => clearInterval(intervalId); // クリーンアップ
    }, []);

	return (
		<div>
			{currentTime}
		</div>
	)
}
