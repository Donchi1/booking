import { NextApiRequest, NextApiResponse } from "next";
import Room from "../../models/Room";
import {createNewError} from "../../utils/error"

export default async function handler (req:NextApiRequest, res:NextApiResponse) {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (err:any) {
     const error = createNewError(err)
        res.status(error.status as number).json({error:error.message});;
    }
  };

