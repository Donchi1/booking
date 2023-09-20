// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Hotel from '../../../models/Hotel';
import Room from '../../../models/Room';
import { Document } from 'mongoose';
import { NextResponse } from 'next/server';
import { createNewError } from '@/pages/api/utils/error';



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        const hotel = await Hotel.findById(req.query.hotelId) as Document<unknown> &{rooms: string[]}
        const list = await Promise.all(
          hotel?.rooms.map((room) => {
            return Room.findById(room);
          })
        );
        res.status(200).json(list)
      } catch (err: any) {
        const error = createNewError(err)
        res.status(error.status as number).json({error:error.message});
      }
}
