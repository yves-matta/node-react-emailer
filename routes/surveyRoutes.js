const mongoose = require('mongoose');
const requireCredits = require('../middlewares/requireCredits');
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

// doing it this way for running tests
const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { body, recipients, subject, title } = req.body;

    const survey = new Survey({
      body,
      dateSent: Date.now(),
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      subject,
      title,
      _user: req.user.id
    });

    // great place to send email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.status(201).send(user);
    } catch (err) {
      res.status(422).send();
    }
  });
};
