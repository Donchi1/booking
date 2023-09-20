import { NextApiRequest, NextApiResponse } from "next";
import Room from "../../../models/Room";
import { createNewError } from "@/pages/api/utils/error";

export default async function handler (req:NextApiRequest, res:NextApiResponse) {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
          req.query.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedRoom);
    } catch (err:any) {
      const error = createNewError(err)
      res.status(error.status as number).json({error:error.message});
    }
  };