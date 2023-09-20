import { NextApiRequest, NextApiResponse } from "next";
import Room from "../../../models/Room";
import Hotel from "../../../models/Hotel";
import { createNewError } from "@/pages/api/utils/error";

export default async function handler (req:NextApiRequest, res:NextApiResponse) {
    const {slugs} = req.query;
    const id = slugs && slugs[0]
    const hotelId = slugs && slugs[1]
    try {
      await Room.findByIdAndDelete(id);
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: id },
        });
      } catch (err:any) {
        const error = createNewError(err)
        res.status(error.status as number).json({error:error.message});
      }
      res.status(200).json("Room has been deleted.");
     
    } catch (err:any) {
      const error = createNewError(err)
      res.status(error.status as number).json({error:error.message});
    }
  };