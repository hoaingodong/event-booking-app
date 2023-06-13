const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hoaingodong1@gmail.com',
        pass: 'mwseufdksnkwpuek\n'
    }
});

const sendEmail = async (email, otp) =>
{
    const mailOptions = {
        from: 'hoaingodong1@gmail.com',
        to: email,
        subject: 'OTP code - Event Booking Application',
        html: '<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">\n' +
            '  <div style="margin:50px auto;width:70%;padding:20px 0">\n' +
            '    <div style="border-bottom:1px solid #eee">\n' +
            '      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Event Booking application</a>\n' +
            '    </div>\n' +
            '    <p style="font-size:1.1em">Hi,</p>\n' +
            '    <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>\n' +
            '    <h2 style="background: #7ed3ff;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">'+otp+'</h2>\n' +
            '    <p style="font-size:0.9em;">Regards,<br />My Hoai</p>\n' +
            '    <hr style="border:none;border-top:1px solid #eee" />\n' +
            '    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">\n' +
            '      <p>Astraller</p>\n' +
            '      <p>271 Nguyen Van Linh</p>\n' +
            '      <p>Da Nang</p>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '</div>'

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(

            );
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

module.exports = {
    sendEmail
}