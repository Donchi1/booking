// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Bookings from '../../models/Booking'
import { createNewError } from '../../utils/error'
import dbConnect from '../../libs/dbConnect'




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()
    const date = new Date()
    const lastSixMonths = new Date(new Date().setMonth(date.getMonth() - 6))
    

    try{

      const info = await Bookings.aggregate([
         {$match :{createdAt:{ $gte: lastSixMonths, $lt: date}}},
         {$project:{ 
          price: "$totalPrice", month: {$month: "$createdAt"}}},
         {$group:{
          _id: "$month",
          total: {$sum : "$price" }
         }}
        ]).sort({_id: 1})
        res.status(200).json(info)
    }catch(err: any){
      
      const error = createNewError(err)
      res.status(error.status as number).json({error:error.message});
    }
}
