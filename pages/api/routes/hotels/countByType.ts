// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Hotel from '../../models/Hotel';
import { createNewError } from '../../utils/error';




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    
        res.status(200).json([
          { type: "hotel", count: hotelCount },
          { type: "apartments", count: apartmentCount },
          { type: "resorts", count: resortCount },
          { type: "villas", count: villaCount },
          { type: "cabins", count: cabinCount },
        ]);
      } catch (err: any) {
        const error = createNewError(err)
        res.status(error.status as number).json({error:error.message});
      }
}
