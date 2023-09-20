// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Bookings from '../../models/Booking'
import Users from '../../models/User'
import Hotels from '../../models/Hotel'
import { createNewError } from '../../utils/error'
import { BookingType, HotelType, UserType } from '@/pages/admin/utils/types'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
   
     const limit =  Number(req.query?.limit) || 1000
     
    try { 
        const bookings:BookingType[] | null = await Bookings.find().limit(limit)
        const mainbooking = await Promise.all(bookings?.map(async (each) => {
          const dbUser:UserType | null  = await Users.findById(each.userId)
          const dbHotel:HotelType | null  = await Hotels.findById(each.hotelId)
    
          return {user:dbUser, hotel:dbHotel, booking:each}
        }))
  
        return res.status(200).json(mainbooking);
    } catch (err:any) {
      const error = createNewError(err)
        res.status(error.status as number).json({error:error.message});
    }
}
