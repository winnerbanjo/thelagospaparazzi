import { connectToDatabase } from './_lib/db.js';
import Contact from './_lib/Contact.js';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const { status, type } = req.query || {};
    const query = {};

    if (status) query.status = status;
    if (type) query.type = type;

    const contacts = await Contact.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  }

  if (req.method === 'POST') {
    try {
      const contact = await Contact.create({
        ...req.body,
        type: 'contact'
      });

      return res.status(201).json({
        success: true,
        message: 'Thank you for your message. We will get back to you soon.',
        data: contact
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
