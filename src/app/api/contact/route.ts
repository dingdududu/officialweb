import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  
  // 将用户提交的信息保存到数据库
  await prisma.contact.create({ data });

    // 配置nodemailer
  const transporter = nodemailer.createTransport({
    service: "qq", // 直接写邮箱服务商
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "365718287@qq.com",
    to: "lyn668@gmail.com",
    subject: "New Contact Form BizWeb Submission",
    // text: JSON.stringify(data, null, 2),
    text: `
    Name: ${data.name}
    Email: ${data.email}
    Company: ${data.company}
    Address: ${data.address}
    Phone: ${data.phone}
    Website: ${data.website}
    Message: ${data.message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("邮件发送成功");
  } catch (error) {
    console.error("邮件发送失败:", error);
  }

  // 返回响应
  return NextResponse.json({ ok: true });
}