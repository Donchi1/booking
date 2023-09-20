// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createError, createNewError } from '../../utils/error'
import User from '../../models/User'
import { NextResponse } from 'next/server'
import bcrypt from "bcryptjs"

import transporter from '../../components/transporter'
import emailData from '../../components/emailData'
import { verifyTokenReset } from '../../utils/verifyToken'


type NextApiRequestExt = NextApiRequest & {
    user: string
}

export default async function handler(
  req: NextApiRequestExt,
  res: NextApiResponse
) {
   verifyTokenReset(req, res)
  try {
    const userId = req.user
    const user = await User.findById(userId);
    if(!user) return NextResponse.next(createError(401, "User does not exist or incorrect email"))
    const hashPass = bcrypt.hash(req.body.password, 10)
    await user.updateOne({password: hashPass})
    await transporter.sendMail(emailData.passwordReset(user.email))

    res.status(200).json({message:"You have successfully changed your password"});
  } catch (err: any) {
    const error = createNewError(err)
        res.status(error.status as number).json({error:error.message});;
  }
}