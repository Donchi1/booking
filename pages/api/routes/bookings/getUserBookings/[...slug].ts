// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Bookings from '../../../models/Booking';
import User from '../../../models/User';
import Hotel from '../../../models/Hotel';
import { createNewError } from '../../../utils/error';


type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const userId = req.query.slug && req.query.slug[0]
    const hotelId = req.query.slug && req.query.slug[1]
  
    try {
      const booking = await Bookings.find({userId});
      
      const mainbooking = await Promise.all(booking.map(async (each) => {
        const dbUser  = await User.findById(userId)
        const dbHotel  = await Hotel.findById(each.hotelId)
  
        return {user:dbUser, hotel:dbHotel, booking:each}
      }))
      res.status(200).json(mainbooking);
    } catch (err:any) {
     const error = createNewError(err)
        res.status(error.status as number).json({error:error.message});;
    }
}
