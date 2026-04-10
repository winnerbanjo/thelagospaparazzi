import { connectToDatabase } from './_lib/db.js';
import Booking from './_lib/Booking.js';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const { status, eventType } = req.query || {};
    const query = {};

    if (status) query.status = status;
    if (eventType) query.eventType = eventType;

    const bookings = await Booking.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  }

  if (req.method === 'POST') {
    try {
      const booking = await Booking.create(req.body);

      return res.status(201).json({
        success: true,
        message: 'Booking request received. We will contact you shortly.',
        data: booking
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
