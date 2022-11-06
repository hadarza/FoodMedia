
const SendMessage = async (req,res)=>{
    const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    client.verify.services(process.env.VERIFY_SERVICE_SID)
    .verifications
    .create({to: `+${req.body.Phone}`, channel: 'sms'})
    .then(verification => console.log(verification.status))
    .catch(e => {
    res.status(500).send(e);
    });
res.sendStatus(200);
}

const VerifyCode = async (req,res)=>{
    client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    const check = await client.verify.services(process.env.VERIFY_SERVICE_SID)
    .verificationChecks
    .create({to: `+${req.body.Phone}`, code: req.body.code})
    .catch(e => {
      res.status(500).send(e);
    });
  res.status(200).send(check);
}
      
  module.exports={
    SendMessage,
    VerifyCode
  }

