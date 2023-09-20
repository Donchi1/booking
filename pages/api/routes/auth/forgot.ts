// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createError } from '../../utils/error'
import User from '../../models/User'
import { NextResponse } from 'next/server'

import jwt from "jsonwebtoken"

import transporter from '../../components/transporter'
import emailData from '../../components/emailData'




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    const {email} = req.body
    const user = await User.findOne({ email });
    if(!user) return NextResponse.next(createError(401, "User does not exist or incorrect email"))
    
    const token = jwt.sign(user._id , process.env.JWT_RESET as string);
    
     await transporter.sendMail(emailData.passwordforgot(email, token))

    res.status(200).json({message:`A password set instruction was sent to ${email}`});
  } catch (err: any) {
    const error = createNewError(err)
        res.status(error.status as number).json({error:error.message});;
  }
}