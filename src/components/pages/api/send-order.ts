// pages/api/send-order.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { customerInfo, orderItems } = req.body;

  // Create transporter (configure with your email service)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Format order details for email
  const orderDetails = orderItems
    .map(
      (item: any) => `
    Product: ${item.productName}
    Color: ${item.color}
    Quantity: ${item.quantity}
    Price: ${item.price} MAD
  `
    )
    .join("\n");

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL, // Your admin email
      subject: "New Order Received",
      text: `
        New order received:

        Customer Information:
        Name: ${customerInfo.name}
        Email: ${customerInfo.email}
        Phone: ${customerInfo.phone}
        Address: ${customerInfo.address}

        Order Details:
        ${orderDetails}

        Total Amount: ${orderItems.reduce(
          (acc: number, item: any) => acc + item.price * item.quantity,
          0
        )} MAD
      `,
    });

    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
}
