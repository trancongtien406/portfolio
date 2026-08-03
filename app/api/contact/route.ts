import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: [{ createdAt: "desc" }],
    });

    return NextResponse.json(messages);
  } catch {
    return NextResponse.json(
      { error: "Không thể tải danh sách liên hệ." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, type, message } = body;

    // Validate dữ liệu cơ bản
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ tên, email và nội dung." },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email không hợp lệ." },
        { status: 400 },
      );
    }

    await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        type: type?.trim() || null,
        message: message.trim(),
      },
    });

    // Tạo transporter gửi email qua Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Nội dung email gửi cho chủ portfolio
    const htmlToOwner = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e4e4e7; border-radius: 16px; overflow: hidden;">
        <div style="background: #18181b; padding: 24px 28px;">
          <h2 style="color: #fff; margin: 0; font-size: 20px;">📩 Liên hệ mới từ Portfolio</h2>
        </div>
        <div style="padding: 24px 28px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
            <tr>
              <td style="padding: 10px 0; color: #71717a; width: 130px;">Họ tên</td>
              <td style="padding: 10px 0; font-weight: 600; color: #18181b;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #71717a;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #71717a;">Số điện thoại</td>
              <td style="padding: 10px 0; color: #18181b;">${escapeHtml(phone || "Không cung cấp")}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #71717a;">Loại hợp tác</td>
              <td style="padding: 10px 0;"><span style="background: #f4f4f5; padding: 4px 12px; border-radius: 99px; font-size: 13px; color: #3f3f46;">${escapeHtml(type || "Không rõ")}</span></td>
            </tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #fafafa; border-radius: 12px; border: 1px solid #e4e4e7;">
            <p style="margin: 0 0 8px; color: #71717a; font-size: 13px;">Nội dung:</p>
            <p style="margin: 0; color: #18181b; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #a1a1aa;">
            Gửi từ portfolio tiendev.id.vn lúc ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}
          </p>
        </div>
      </div>
    `;

    // Nội dung email xác nhận gửi cho khách
    const htmlToSender = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e4e4e7; border-radius: 16px; overflow: hidden;">
        <div style="background: #18181b; padding: 24px 28px;">
          <h2 style="color: #fff; margin: 0; font-size: 20px;">✅ Đã nhận thông tin của bạn!</h2>
        </div>
        <div style="padding: 24px 28px;">
          <p style="color: #3f3f46; line-height: 1.7; font-size: 15px;">
            Xin chào <strong>${escapeHtml(name)}</strong>,
          </p>
          <p style="color: #3f3f46; line-height: 1.7; font-size: 15px;">
            Cảm ơn bạn đã liên hệ! Tôi đã nhận được thông tin của bạn và sẽ phản hồi
            trong vòng <strong>24 giờ</strong> (ngày làm việc).
          </p>
          <div style="margin: 20px 0; padding: 16px; background: #fafafa; border-radius: 12px; border: 1px solid #e4e4e7;">
            <p style="margin: 0 0 4px; font-size: 13px; color: #71717a;">Nội dung bạn đã gửi:</p>
            <p style="margin: 0; color: #3f3f46; white-space: pre-wrap; font-size: 14px;">${escapeHtml(message)}</p>
          </div>
          <p style="color: #3f3f46; line-height: 1.7; font-size: 15px;">
            Trân trọng,<br/>
            <strong>Trần Công Tiến</strong><br/>
            Full-stack Web & App Developer
          </p>
          <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
          <p style="font-size: 12px; color: #a1a1aa;">
            Email này được gửi tự động từ <a href="https://tiendev.id.vn" style="color: #71717a;">tiendev.id.vn</a>. Vui lòng không trả lời email này.
          </p>
        </div>
      </div>
    `;

    // Gửi song song: email cho chủ + email xác nhận cho khách
    const ownerEmail = process.env.CONTACT_RECEIVE_EMAIL || process.env.SMTP_EMAIL;

    await Promise.all([
      // 1. Email thông báo cho chủ portfolio
      transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_EMAIL}>`,
        to: ownerEmail,
        subject: `[Portfolio] Liên hệ mới từ ${name} — ${type || "Không rõ loại"}`,
        html: htmlToOwner,
        replyTo: email,
      }),
      // 2. Email xác nhận cho người gửi
      transporter.sendMail({
        from: `"Trần Công Tiến" <${process.env.SMTP_EMAIL}>`,
        to: email,
        subject: "Đã nhận thông tin liên hệ — Trần Công Tiến",
        html: htmlToSender,
      }),
      // 3. Gửi Telegram (nếu có config)
      sendTelegram(name, email, phone, type, message),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Gửi thất bại. Vui lòng thử lại sau." },
      { status: 500 },
    );
  }
}

/** Gửi thông báo qua Telegram Bot (nếu đã cấu hình) */
async function sendTelegram(
  name: string,
  email: string,
  phone: string,
  type: string,
  message: string,
) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return;

  const text = [
    `📩 *Liên hệ mới từ Portfolio*`,
    ``,
    `👤 *Tên:* ${escapeMarkdown(name)}`,
    `📧 *Email:* ${escapeMarkdown(email)}`,
    `📱 *SĐT:* ${escapeMarkdown(phone || "Không cung cấp")}`,
    `🏷 *Loại:* ${escapeMarkdown(type || "Không rõ")}`,
    ``,
    `💬 *Nội dung:*`,
    escapeMarkdown(message),
    ``,
    `🕐 ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}`,
  ].join("\n");

  try {
    await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "Markdown",
        }),
      },
    );
  } catch {
    // Không throw lỗi để không ảnh hưởng email
    console.error("Telegram notification failed");
  }
}

/** Escape HTML để tránh XSS */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Escape Markdown special chars */
function escapeMarkdown(str: string): string {
  return str.replace(/[_*[\]()~`>#+=|{}.!-]/g, "\\$&");
}
