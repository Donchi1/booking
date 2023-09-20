

import { NextApiRequest, NextApiResponse } from "next";
import Room from "../../models/Room";
import { NextResponse } from "next/server";
import { createNewError } from "../../utils/error";

export default async function handler (req:NextApiRequest, res:NextApiResponse) {
    try {
        const room = await Room.findById(req.query.id);
        res.status(200).json(room);
     
    } catch (err:any) {
        const error = createNewError(err)
        res.status(error.status as number).json({error:error.message});
    }
  };