import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User"
import { verifyUser } from "../../../utils/verifyToken";
import { createNewError } from "@/pages/api/utils/error";

export default async function handler(req: NextApiRequest,res:NextApiResponse){
  verifyUser(req, res)

    try {
      const user = await User.findById(req.query.id);
      res.status(200).json({user});
    } catch (err:any) {
      const error = createNewError(err)
       res.status(error.status as number).json({error:error.message});
    }
  }