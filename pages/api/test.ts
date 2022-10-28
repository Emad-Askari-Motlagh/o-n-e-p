import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import Restaurant from "../../server/mongoSchema/restaurangSchema";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const v = await Restaurant.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [11.9667, 57.78] },
          $minDistance: 1000,
          $maxDistance: 500000,
        },
      },
    });
    console.log(v);
    res.status(200).json("v");
  } else {
    res.end();
    return false;
  }
}
