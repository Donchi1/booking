import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import { createNewError } from "@/pages/api/utils/error";

export default async function handler(req: NextApiRequest,res:NextApiResponse){
    try {
        const updatedUser = await User.findByIdAndUpdate(
          req.query.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err:any) {
     const error = createNewError(err)
        res.status(error.status as number).json({error:error.message});;
    }
  }