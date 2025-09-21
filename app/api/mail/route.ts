//=====================================================================
// メール送信API
//=====================================================================

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  	const { name, email, message } = await req.json();

	const transporter = nodemailer.createTransport({
		host: 'CMM-COM-MILV',		// SMTPサーバーのホスト名
		port: 25,                	// 標準的なSMTPポート。認証なしの送信
		secure: false,            	// trueならSSL（465）、falseならSMTP(25)または STARTTLS(587)
		//auth: null,               // 認証なし
	});

	const mailOptions = {
		from: "kinzokuhaku1@nscm.nipponsteel.com",				// 送信元メールアドレス
		to: email,
		subject: `お問い合わせ: ${name}`,
		text: `これはnodemailerから送信されたテストメールです。 ${message}`,
	};

	try {
		await transporter.sendMail(mailOptions);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('メール送信エラー:', error);
		return NextResponse.json({ success: false, error: 'メール送信に失敗しました' }, { status: 500 });
	}
}
