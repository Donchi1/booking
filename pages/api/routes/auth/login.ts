// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import bcrypt from "bcryptjs"
import jwt, { Secret } from "jsonwebtoken"
import { Document } from 'mongoose'
import dbConnect from '../../libs/dbConnect'
import cookie from 'cookie'
import User from '../../models/User' 
import { createNewError } from '../../utils/error'



type UserInfo = Document<any> & {
  _doc?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    await dbConnect()
    const{username,  rememberMe} = req.body

    const checkEmail = (username: string) => {
        if(
         username.includes("@gmail.com") || 
         username.includes("@hotmail.com") ||
         username.includes("@yahoomail.com")||
         username.includes("@")
        ) return true
        return false
       }

    try {
  
      const user = checkEmail(username)? await User.findOne({ email:username }) as UserInfo : await User.findOne({username }) as UserInfo
     
      if (!user) return res.status(400).json({message: "User not found"});
      const { password, isAdmin, ...otherDetails } = user._doc;
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        password
      );
      if (!isPasswordCorrect)
        return res.status(400).json({message : "Wrong password or username!"});
  
      const token = jwt.sign(
        { id: user._id, isAdmin },
        process.env.JWT as Secret,
         {expiresIn: rememberMe? "30d" : "7d"}
      );
  
    
       res.setHeader("Set-Cookie", cookie.serialize("access_token",token, {
          sameSite: "strict",
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          path: "/",
          
          expires: new Date(new Date().setDate(new Date().getDate() + 30))
        }))
        res.status(200)
        .json({ data: { ...otherDetails, isAdmin }, message: "login success"});
    } catch (err: any) {
      const error = createNewError(err)
        res.status(error.status as number).json({error:error.message});;
    }
}
