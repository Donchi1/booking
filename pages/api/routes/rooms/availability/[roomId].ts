import { NextApiRequest, NextApiResponse } from "next";
import Room from "../../../models/Room";
import { createNewError } from "@/pages/api/utils/error";


export default async function handler (req:NextApiRequest, res:NextApiResponse) {
       
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.query.roomId },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      },
      

    );

    res.status(200).json("Room status has been updated.");
    } catch (err:any) {
      const error = createNewError(err)
      res.status(error.status as number).json({error:error.message});
    }
  };