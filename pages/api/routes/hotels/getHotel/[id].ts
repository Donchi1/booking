import { NextApiRequest, NextApiResponse } from "next";

import Hotel from "../../../models/Hotel";
import { createNewError } from "@/pages/api/utils/error";



export default async function handler (req: NextApiRequest, res:NextApiResponse){
 
    try {
        const hotel = await Hotel.findById(req.query.id);
        res.status(200).json(hotel);
      } catch (err:any) {
        const error = createNewError(err)
       res.status(error.status as number).json({error:error.message});
      }
}