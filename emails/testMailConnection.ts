import nodemailer from "nodemailer";

async function testSMTP() {
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "info@royoltech.com",
      pass: "e.c=kyA**Y84gh%",
    },
     tls: {
    // enforce TLS v1.2+ and ensure certificate is valid
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true,
  },
  });

  try {
    await transporter.verify();
    console.log("SMTP connection OK");
  } catch (err) {
    console.error("SMTP error:", err);
  }
}

testSMTP();
