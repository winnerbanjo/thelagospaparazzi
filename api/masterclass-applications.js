import { connectToDatabase } from './_lib/db.js';
import MasterclassApplication from './_lib/MasterclassApplication.js';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    try {
      const application = await MasterclassApplication.create(req.body);

      return res.status(201).json({
        success: true,
        message: 'Application received successfully.',
        data: application
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  if (req.method === 'GET') {
    const applications = await MasterclassApplication.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({
    success: false,
    error: 'Method not allowed'
  });
}
