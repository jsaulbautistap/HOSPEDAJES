import transporter from "../config/nodemailer.js";

export const enviarEmail = async (userMail, token) => {
  await transporter.sendMail({
    from: process.env.USER_MAIL_TRAP,
    to: userMail,
    subject: "Recuperación de contraseña",
    html: `
      <h2>Recuperación de contraseña</h2>
      <p>Este es tu código de recuperación para crear una nueva contraseña:</p>
        <p>Ingresa este código en la app para continuar con el proceso.</p>
      <p><strong>${token}</strong></p>
    `
  });
};
