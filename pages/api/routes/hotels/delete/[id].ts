import { NextApiRequest, NextApiResponse } from "next";
import { imageDelete } from "../../../utils/cloudImage";
import Hotel from "../../../models/Hotel";
import { createNewError } from "../../../utils/error";

export default async function handle (req:NextApiRequest, res:NextApiResponse){
    const deleteId = req.query.file as string
    try {
      await Hotel.findByIdAndDelete(req.query.id);
      const info = await imageDelete(deleteId)
      if(info.error) return res.status(200).json(info.data)
      res.status(200).json({message:"Hotel has been deleted."});
    } catch (err:any) {
      const error = createNewError(err)
      res.status(error.status as number).json({error:error.message});
    }
  };