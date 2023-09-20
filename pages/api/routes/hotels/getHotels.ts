
import Hotel from "../../models/Hotel";
import { NextApiRequest, NextApiResponse } from "next";
import { createNewError } from "../../utils/error";





export default async function handler (req:NextApiRequest, res:NextApiResponse){
const { min, max,fromAdmin, city, featured, limit} = req.query;
  

const myLimit = limit ? Number(limit): 0
   
try {
  if(fromAdmin){
    const hotels = await Hotel.find()
    return res.status(200).json(hotels);
  }
  if(featured){
    const hotels = await Hotel.find({
      featured: true
      
    }).limit(myLimit);
    return res.status(200).json(hotels);
    
  }

  const hotels = await Hotel.find({
    $or:[{cheapestPrice: { $gt: min , $lt: max  }}, {city}],
    
  });
  
  res.status(200).json(hotels);
} catch (err:any) {
  const error = createNewError(err)
  res.status(error.status as number).json({error:error.message});
}
}