// ==============================================================
// MongoDB接続設定
// ==============================================================

import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI || '')
    } catch (error) {
        console.log("DB接続に失敗しました", error);
        throw new Error();
    };
}