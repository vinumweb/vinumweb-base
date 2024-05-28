import nodemailer from 'nodemailer'
import { useCompiler } from '#vue-email'

export default defineEventHandler(async (event) => {
  const { mailTo, mailFromPassword } = useRuntimeConfig(event)
  const { name, email, phone, subject, message, turnstileToken } = await readBody(event)

  if (!turnstileToken) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Turnstile token not provided.',
    })
  }

  if (!name || !email || !subject || !message) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Not enough provided fields',
    })
  }

  try {
    const turnstileData = await verifyTurnstileToken(turnstileToken)

    if (turnstileData.success == true) {
    const transporter = nodemailer.createTransport({
      host: 'smtppro.zoho.eu',
      port: 587,
      secure: false,
      auth: {
        user: 'cms@vinumweb.com',
        pass: mailFromPassword,
      },
    })
  
    const options = {
      from: 'VinumWeb CMS <cms@vinumweb.com>',
      to: mailTo,
      subject: 'Ny besked fra din hjemmesides kontaktformular',
      html: `
      <!DOCTYPE html>
      <html lang="da" xmlns:v="urn:schemas-microsoft-com:vml">
      <head>
        <meta charset="utf-8">
        <meta name="x-apple-disable-message-reformatting">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
        <style>
          td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
        </style>
        <![endif]-->
        <title>Ny besked fra din hjemmesides kontaktformular</title>
        <style>
          @media (max-width: 600px) {
            .sm-my-8 {
              margin-top: 32px !important;
              margin-bottom: 32px !important
            }
            .sm-px-4 {
              padding-left: 16px !important;
              padding-right: 16px !important
            }
            .sm-px-6 {
              padding-left: 24px !important;
              padding-right: 24px !important
            }
            .sm-leading-8 {
              line-height: 32px !important
            }
          }
        </style>
      </head>
      <body style="margin: 0; width: 100%; background-color: #f8fafc; padding: 0; -webkit-font-smoothing: antialiased; word-break: break-word">
        <div role="article" aria-roledescription="email" aria-label="Ny besked fra din hjemmesides kontaktformular" lang="en">
          <div class="sm-px-4" style="background-color: #f8fafc; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif">
            <table align="center" cellpadding="0" cellspacing="0" role="none">
              <tr>
                <td style="width: 552px; max-width: 100%">
                  <div class="sm-my-8" style="margin-top: 48px; margin-bottom: 48px; text-align: center">
                    <a href="https://vinumweb.com">
                      <img src="https://link.vinumweb.com/logo" width="70" alt="Maizzle" style="max-width: 100%; vertical-align: middle; line-height: 1">
                    </a>
                  </div>
                  <table style="width: 100%;" cellpadding="0" cellspacing="0" role="none">
                    <tr>
                      <td class="sm-px-6" style="border-radius: 4px; background-color: #fff; padding: 48px; font-size: 16px; color: #334155; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)">
                        <h1 class="sm-leading-8" style="margin: 0 0 24px; font-size: 24px; font-weight: 600; color: #000">
                          Ny indsendelse:
                        </h1>
                        <p style="margin: 0; line-height: 24px">
                          <b>Navn:</b> ${name}<br>
                          <b>E-mail:</b> ${email}<br>
                          <b>Telefon:</b> ${phone}<br>
                          <b>Emne:</b> ${subject}<br>
                          <b>Besked:</b> ${message}<br>
                        </p>
                        <div role="separator" style="line-height: 24px">&zwj;</div>
                        <div>
                          <a href="mailto:${email}" style="display: inline-block; border-radius: 4px; background-color: #4338ca; padding: 16px 24px; font-size: 16px; font-weight: 600; line-height: 1; color: #f8fafc; text-decoration: none">
                            <!--[if mso]>
            <i style="mso-font-width: 150%; mso-text-raise: 30px" hidden>&emsp;</i>
          <![endif]-->
                            <span style="mso-text-raise: 16px">
                        Send e-mail til person &rarr;
                      </span>
                            <!--[if mso]>
            <i hidden style="mso-font-width: 150%;">&emsp;&#8203;</i>
          <![endif]-->
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr role="separator">
                      <td style="line-height: 48px">&zwj;</td>
                    </tr>
                    <tr>
                      <td style="padding-left: 24px; padding-right: 24px; text-align: center; font-size: 12px; color: #475569">
                        <p style="margin: 0 0 16px; text-transform: uppercase">
                          VINUMWEB
                        </p>
                        <p style="margin: 0 0 20px; font-style: italic">
                          Denne e-mail er sendt af VinumWeb på vegne af formularens sender
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </body>
      </html>
      `,
    }
  
    await transporter.sendMail(options)

    return {
      success: true
    }
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: 'Token not valid',
      })
    }
  } catch(error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Something went wrong when processing the turnstile token',
      })
  }
})

