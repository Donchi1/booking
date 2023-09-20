import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie"




export default function handler(req: NextApiRequest, res: NextApiResponse){
    res.setHeader("Set-Cookie", cookie.serialize("access_token","", {
        sameSite: "strict",
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        path: "/",
        maxAge: 0
      }))
    res.status(200).json({message: "logout success"})
}