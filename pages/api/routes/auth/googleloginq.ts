// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse} from 'next'
import { createError } from '../../utils/error'
import User from '../../models/User'
import { NextResponse } from 'next/server'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { OAuth2Client, TokenPayload } from 'google-auth-library'
import { Document } from 'mongoose'

type UserInfo = Document & {
  _doc?: any
}


const client = new OAuth2Client(process.env.GOOGLE_AUTH_CLIENT)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const { tokenId } = req.body
    try{
      const resToken = await client.verifyIdToken({idToken: tokenId, audience: process.env.GOOGLE_AUTH_CLIENT})
      const cred = resToken.getPayload() as TokenPayload
      const {  
      email,
      name,
      given_name,
      family_name,
      picture,
      email_verified
      } = cred
      const response = NextResponse.next()
       if(email_verified){
  
         const dbUser = await User.findOne({email}) as UserInfo
         if(dbUser) {
          const access_token = jwt.sign({id: dbUser._id}, process.env.JWT as string)
          const { password, isAdmin, ...otherDetails } = dbUser._doc;
         response.cookies.set("access_token", access_token, {
            httpOnly: true,
            
          })
         return res.status(200).json({
            message: "login success",
            data: {...otherDetails, isAdmin}
          })
    
         }else{
  
           const newPassword = process.env.GOOGLE_AUTH_CLIENT as string + name
           const hashedPassword = bcrypt.hashSync(newPassword, 10)
           const newUser = new User({
            username: given_name,
            email,
            password:hashedPassword, 
            firstname:family_name, 
            lastname: given_name,
            city: "New York",
            country: "USA",
            img:picture,
            phone: "+1234567867"
      
          })
    
          const user: UserInfo = await newUser.save() 
    
          const access_token = jwt.sign({id:user._id}, process.env.JWT as string)
          const { password, isAdmin, ...otherDetails } = user._doc;
      
          response.cookies.set("access_token", access_token, {
            httpOnly: true,
            expires: new Date(new Date().setDate(new Date().getDate() + 30))
          })
          res.status(200).json({
            data: {...otherDetails, isAdmin},
            message: "login success"
          })
         }
    
       }else{
        return NextResponse.next(createError(403, "Google login failed. Please try another email address."))
       }
    
    }catch(error){
      console.log(error)
    }
  
}
