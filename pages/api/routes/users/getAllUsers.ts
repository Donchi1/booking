


import { NextApiRequest, NextApiResponse } from "next";
import User from "../../models/User";
import { createNewError } from "../../utils/error";

export default async function handler(req: NextApiRequest,res:NextApiResponse){

    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err:any) {
     const error = createNewError(err)
        res.status(error.status as number).json({error:error.message});;
    }
  }

