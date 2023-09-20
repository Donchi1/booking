// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createNewError } from '../../utils/error'
import User from '../../models/User'
import bcrypt from "bcryptjs"
import { imageUploader} from '../../utils/cloudImage'



export  const config ={
  api: {
    bodyParser: false
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {


  try {
    
    const {error, data} = await imageUploader(req)
     const user = await User.findOne({ email: data?.fields.email });
    if(user) return res.status(401).json("User already exist with this email")
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data?.fields.password as string, salt);

   if(error) return res.status(500).json(data)

    const newUser = new User({
        ...data?.fields,
      password: hash,
      img:data?.imgInfo.secure_url,
      imgId: data?.imgInfo.public_id
    });

    await newUser.save();
    res.status(200).json({message:"You are successfully register"});
  } catch (err: any) {
    const error = createNewError(err)
        res.status(error.status as number).json({error:error.message});;
  }
}
