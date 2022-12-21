import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import Reservation from "@/server/mongoSchema/reservationSchrma";
import { Types } from "mongoose";

export const config = {
  api: {
    bodyParser: true,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const costumerId = req.cookies["costumerId"];
  const id = new Types.ObjectId(costumerId);
  const restaurantName = req.query.restaurantName;
  if (req.method === "POST") {
    // const { date } = req.body;

    const reservation = await new Reservation({
      restaurant: restaurantName,
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
      restaurant: restaurantName,
      costumer: id,
    }).populate("costumer");

    if (oldReservation.length) {
      res.status(200).send(oldReservation);
    } else {
      res.status(200).send([]);
    }
  } else if (req.method === "DELETE") {
    await Reservation.findByIdAndDelete({ _id: req.query.bookId });

    res.status(200).end();
  } else {
    res.end();
    return false;
  }
};
export default handler;
