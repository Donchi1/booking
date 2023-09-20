
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Bookings from '../../models/Booking';
import { createNewError } from '../../utils/error';




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const {
        bookings,
        amount,
        parsedRooms,
        totalBookedDates,   
    } = req.body

    const newBooking = new Bookings({
        ...req.body,
          totalNights: totalBookedDates.length,
          bookedDates:totalBookedDates,
          bookedRoomsInfo:parsedRooms,
          totalPrice: amount,
          prices: bookings.map((each: any) => each.price),
          totalBookedRooms: bookings.reduce((acc:any, init:any ) => acc + init.totalBookings,0)
      });

      try {
        const savedBooking = await newBooking.save();
        res.status(200).json(savedBooking);
      } catch (err:any) {
        const error = createNewError(err)
        res.status(error.status as number).json({error:error.message});
      }

  
}


