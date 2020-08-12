const sgMail = require("@sendgrid/mail");
const keys = require("../config/keys");

class Mailer {
  constructor({ subject, recipients }, content) {
    sgMail.setApiKey(keys.sendGridKey);
    this.msg = {
      to: recipients.map(({ email }) => email),
      from: "travisldunn@gmail.com",
      subject: subject,
      html: content,
      trackingSettings: { enable_text: true, enabled: true },
    };
  }

  async send() {
    const response = await sgMail.send(this.msg);
    return response;
  }
}

module.exports = Mailer;

// const sendgrid = require("sendgrid");
// const helper = sendgrid.mail;
// const keys = require("../config/keys");
// const { response } = require("express");

// class Mailer extends helper.Mail {
//   constructor({ subject, recipients }, content) {
//     super();
//     this.sgApi = sendgrid(keys.sendGridKey);
//     this.from_email = new helper.Email("travisldunn@gmail.com");
//     this.subject = subject;
//     this.body = new helper.Content("text/html", content);
//     this.recipients = this.formatAddresses(recipients);
//     this.addContent(this.body);
//     this.addClickTracking();
//     this.addRecipients();
//   }

//   formatAddresses(recipients) {
//     return recipients.map(({ email }) => {
//       return new helper.Email(email);
//     });
//   }

//   addClickTracking() {
//     const trackingSettings = new helper.TrackingSettings();
//     const clickTracking = new helper.ClickTracking(true, true);

//     trackingSettings.setClickTracking(clickTracking);
//     this.addTrackingSettings(trackingSettings);
//   }

//   addRecipients() {
//     const personalize = new helper.Personalization();
//     this.recipients.forEach((recipient) => {
//       personalize.addTo(recipient);
//     });
//     this.addPersonalization(personalize);
//   }

//   async send() {
//     const request = this.sgApi.emptyRequest({
//       method: "POST",
//       path: "/v3/mail/send",
//       body: this.toJSON(),
//     });
//     this.sgApi.API(request);
//     return response;
//   }
// }

// module.exports = Mailer;
