// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Bookings from '../../../models/Booking';
import { createNewError } from '@/pages/api/utils/error';





export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        const updatedBooking = await Bookings.findByIdAndUpdate(
          req.query.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedBooking);
      } catch (err:any) {
        const error = createNewError(err)
        res.status(error.status as number).json({error:error.message});;
      }
}
