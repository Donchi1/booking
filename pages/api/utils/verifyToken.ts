import jwt, { GetPublicKeyOrSecret, Secret } from "jsonwebtoken";

import type { NextApiRequest, NextApiResponse } from "next";
import  { NextResponse } from "next/server.js";
import { createError } from "./error";


type NextApiRequestExt = NextApiRequest & {
   user?: any
}

export async function checkToken (req: NextApiRequestExt, res: NextApiResponse) {

  const {access_token} = req.cookies ;

  if (!access_token) {
    return res.status(401).json({error: "You are not authenticated!"});
  }

  jwt.verify(access_token , process.env.JWT as Secret | GetPublicKeyOrSecret, (err, user) => {
    if (err) return res.status(403).json({error: "Token is not valid!"});
    req.user = user;
    return
  });
      
  }

export const verifyTokenReset = (req: NextApiRequestExt, res:NextApiResponse) => {

  const {token} = req.query;
  if (!token) {
    return res.status(401).json({error : "You are not allowed"});
  }
  jwt.verify(token as string, process.env.JWTRESET as Secret | GetPublicKeyOrSecret, (err, user) => {
    if (err) return res.status(403).json({error :"Invalid or expired token. Please request for new token"});
    req.user = user
    return
  });
};


export const verifyUser = (req: NextApiRequestExt, res:NextApiResponse) => {
   checkToken(req, res)
  const {id} = req.query as any
  if (req.user?.id === id   || req.user?.isAdmin) {
    return
  } else {
    return res.status(401).json({error :"You are not authorized!"});
  }

  
};

export const verifyAdmin = (req: NextApiRequestExt, res: NextApiResponse) => {
    if (req.user?.isAdmin) {
      return
    } else {
      return res.status(401).json({error : "You are not authorized!"});
      //return NextResponse.(createError(403, "You are not authorized!"));
    }
  
};
