const sgMail = require('@sendgrid/mail')
const sendController = {}

sendController.sendValidationCode = async (email, code) => {
    sgMail.setApiKey(process.env.SG_KEY);
    let bodyMail = `<strong>Tu código de verificación es: ${code}</strong>`;
    const msg = {
        to: email,
        from: process.env.TEST_EMAIL,
        subject: 'Email Verification',
        html: bodyMail
    };
    let response = {};


    await (async function(){
        try {
            response = await sgMail.send(msg);
        }catch (err){
            response.state = 'ERROR';
            response.error = err;
        }
    })();

    return response;
}

module.exports = sendController