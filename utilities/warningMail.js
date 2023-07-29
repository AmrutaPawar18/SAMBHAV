const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: 'VJTIlibrary@outlook.com',
        pass: 'vjtiLib2023'
    }
});

module.exports = async(recipients) => {
    transporter.sendMail({
        from: "VJTIlibrary@outlook.com",
        to: recipients,
        subject: "Warning!",
        html: "<p>Dear Student,<br>This is to inform that your VJTI Hostel Mess Dopsit amount is exhausted. Kindly pay the mess fees at the earliest.</p><p>Regards,<br>VJTI Hostel Mess</p>",
    }, function (err, info) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Sent"+info.response);
        }
    })
}