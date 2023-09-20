import { NextApiRequest, NextApiResponse } from "next";
import Hotel from "../../../models/Hotel";
import { createNewError } from "../../../utils/error";


export default async function handler (req: NextApiRequest, res:NextApiResponse) {
    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(
        req.query.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedHotel);
    } catch (err:any) {
      const error = createNewError(err)
      res.status(error.status as number).json({error:error.message});
    }
  };