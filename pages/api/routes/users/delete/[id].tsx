import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import { imageDelete } from "../../../utils/cloudImage";
import { createNewError } from "@/pages/api/utils/error";

export default async function handler(req: NextApiRequest,res:NextApiResponse){

    const deleteId = req.query.file as string
 
    try {
      await User.findByIdAndDelete(req.query.id);
      const {errorData, data} = await imageDelete(deleteId)
      if(errorData.error) return res.status(500).json(errorData.message)
      res.status(200).json({message:"User has been deleted."});
    } catch (err:any) {
     const error = createNewError(err)
        res.status(error.status as number).json({error:error.message});;
    }
  }