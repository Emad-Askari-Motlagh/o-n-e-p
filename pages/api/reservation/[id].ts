import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import Reservation from "@/server/mongoSchema/reservationSchrma";
import mongoose, { Types } from "mongoose";
export const config = {
  api: {
    bodyParser: true,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const costumerId = req.cookies["costumerId"];
  const id = new Types.ObjectId(costumerId);
  if (req.method === "POST") {
    // const { date } = req.body;
    console.log(req.body);

    const reservation = await new Reservation({
      restaurant: req.query.id,
      costumer: id,
      date: new Date(),
      desription: "okkokok",
    });
    await reservation.save();
    res.status(200).send(reservation);
  } else if (req.method === "GET") {
    const date = [];
    // Handle any other HTTP method

    const oldReservation = await Reservation.find({
      restaurant: req.query.id,
      costumer: id,
    });
    oldReservation.map((res) => date.push(res.date));

    if (date.length) {
      res.status(200).send(date);
    } else {
      res.status(200).send([]);
    }
  }
};
export default handler;
