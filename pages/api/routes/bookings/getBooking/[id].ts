// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Bookings from '../../../models/Booking';
import { createNewError } from '../../../utils/error';




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    console.log(req.query)
  try {
    const booking = await Bookings.findById(req.query.id);
    res.status(200).json(booking);
  } catch (err:any) {
   const error = createNewError(err)
        res.status(error.status as number).json({error:error.message});;
  }
}
