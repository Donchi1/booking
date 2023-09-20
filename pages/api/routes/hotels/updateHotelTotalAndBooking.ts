
import Hotel from "../../models/Hotel"
import { NextApiRequest, NextApiResponse } from "next"
import { createNewError } from "../../utils/error"


export  default async function handler (req:NextApiRequest, res:NextApiResponse) {
    try{
 
    
   await Promise.all(req.body.bookings.map(async (each:any) => {
   const dbHotel =  await Hotel.findOne({rooms: {$in:[each.id]}})
   return  await dbHotel?.updateOne({
           $set:{
               totalBookings: Number(dbHotel.totalBookings) + Number(each.totalBookings),
               totalBookPrice: Number(dbHotel.totalBookPrice) + Number(each.totalBookPrice)
           
           }
         })
       }))
       res.status(200).json("hotel updated")
    }catch(error:any){
      const errd = createNewError(error)
      res.status(errd.status as number).json(errd.message)
    }   
   
 }