// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Hotel from "../../models/Hotel";
import { createNewError } from "../../utils/error";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ct = req.query.cities as string
  const cities = ct?.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );

    res.status(200).json(list);
  } catch (err: any) {
    const error = createNewError(err)
    res.status(error.status as number).json({error:error.message});
  }
}
