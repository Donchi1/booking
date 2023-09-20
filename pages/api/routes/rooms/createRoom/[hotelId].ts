import { NextApiRequest, NextApiResponse } from "next";
import Room from "../../../models/Room";
import Hotel from "../../../models/Hotel";
import { createNewError } from "@/pages/api/utils/error";

export default async function handler (req:NextApiRequest, res:NextApiResponse) {
    const hotelId = req.query.hotelId;
    const newRoom = new Room(req.body);
  
    try {
      const savedRoom = await newRoom.save();
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $push: { rooms: savedRoom._id },
        });
      } catch (err:any) {
        const error = createNewError(err)
        res.status(error.status as number).json({error:error.message});
      }
      res.status(200).json(savedRoom);
    } catch (err:any) {
      const error = createNewError(err)
      res.status(error.status as number).json({error:error.message});
    }
  };