const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  metadata: {
    ip: { type: String, required: true },
    userAgent: { type: String },
    referer: { type: String },
    acceptLanguage: { type: String },
    host: { type: String },
    connection: { type: String },
    cookies: { type: String },
    method: { type: String },
    url: { type: String },
    protocol: { type: String },
    queryParams: { type: Object },
    headers: { type: Object }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('Contact', contactSchema);
