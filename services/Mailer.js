const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sendGridApi = sendgrid(keys.sendGridKey);
    this.body = new helper.Content('text/html', content);
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.recipients = this.formatAddresses(recipients);
    this.subject = subject;

    this.addContent(this.body);
    this.addClickTracker();
    this.addRecipients();
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  addClickTracker() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => new helper.Email(email));
  }

  async send() {
    const request = this.sendGridApi.emptyRequest({
      body: this.toJSON(),
      method: 'POST',
      path: '/v3/mail/send'
    });

    const response = await this.sendGridApi.API(request);

    return response;
  }
}

module.exports = Mailer;
