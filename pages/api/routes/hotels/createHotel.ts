import { NextApiRequest, NextApiResponse } from "next";
import { imageDeleteMultiple, imageUploaderMultiple } from "../../utils/cloudImage";
import Hotel from "../../models/Hotel";
import { createNewError } from "../../utils/error";



export default async function handler (req:NextApiRequestExt, res:NextApiResponse) {

    const {error, data} =  await imageUploaderMultiple(req)
     if(error) return res.status(200).json(error)
    const newHotel = new Hotel({...data.fields, photos: data?.imgInfo.map((each) => each.secure_url)});
    try {
      const savedHotel = await newHotel.save();
      res.status(200).json(savedHotel);
    } catch (err:any) {
      await imageDeleteMultiple(data?.imgInfo)
      const error = createNewError(err)
      res.status(error.status as number).json({error:error.message});
    }
  };
  