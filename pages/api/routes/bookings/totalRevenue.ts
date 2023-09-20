// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Bookings from '../../models/Booking'
import dbConnect from '../../libs/dbConnect'
import { createNewError } from '../../utils/error'





export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()
    const date = new Date()
    const tomorrow = new Date(new Date().setDate(date.getDate() + 1))
    const yesterday = new Date(new Date().setDate(date.getDate() - 1))

    try{

      const info = await Bookings.aggregate([
         {$match :{createdAt:{ $gt: yesterday, $lt: tomorrow}}},
         {$project:{ 
          price: "$totalPrice"}},
         {$group:{
          _id: "$_id",
          revenue: {$sum : "$price" }
         }}
        ])
        console.log(info)
       return res.status(200).json(info)
    }catch(err: any){
      const error = createNewError(err)
      res.status(error.status as number).json({error:error.message});
    }
}
