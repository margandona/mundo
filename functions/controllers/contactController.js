const db = require('../database/firebase');

const submitContactForm = async (req, res) => {
  const { fullName, phone, email, message } = req.body;

  if (!fullName || !phone || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newContactRef = db.collection('contacts').doc();
    await newContactRef.set({
      uid: newContactRef.id,
      fullName,
      phone,
      email,
      message,
      createdAt: new Date()
    });
    res.status(200).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting contact form' });
  }
};

module.exports = { submitContactForm };
