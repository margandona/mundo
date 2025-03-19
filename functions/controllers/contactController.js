const db = require('../database/firebase');

const submitContactForm = async (req, res) => {
  const { fullName, countryCode, phone, email, message } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || null;
  const userAgent = req.get('User-Agent');
  const referer = req.get('Referer') || 'Referer not available';
  const acceptLanguage = req.get('Accept-Language') || 'Accept-Language not available';
  const host = req.get('Host') || 'Host not available';
  const connection = req.get('Connection') || 'Connection not available';
  const cookies = req.headers['cookie'] || 'Cookies not available';
  const method = req.method;
  const url = req.originalUrl;
  const protocol = req.protocol;
  const queryParams = req.query;
  const headers = req.headers;

  if (!fullName || !countryCode || !phone || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const metadata = {
    ip: ip || 'IP address not available',
    userAgent,
    referer,
    acceptLanguage,
    host,
    connection,
    cookies,
    method,
    url,
    protocol,
    queryParams,
    headers
  };

  try {
    const newContactRef = db.collection('contacts').doc();
    await newContactRef.set({
      uid: newContactRef.id,
      fullName,
      phone: `${countryCode} ${phone}`, // Combine country code and phone number
      email,
      message,
      metadata,
      createdAt: new Date()
    });
    res.status(200).json({ message: 'Contact form submitted successfully', ipWarning: ip ? null : 'IP address not available' });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting contact form' });
  }
};

module.exports = { submitContactForm };
