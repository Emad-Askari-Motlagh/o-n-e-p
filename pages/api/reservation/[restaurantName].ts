import { NextApiRequest, NextApiResponse } from "next";
import Reservation from "@/server/mongoSchema/reservationSchema";
import { Types } from "mongoose";

export const config = {
  api: {
    bodyParser: true,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const costumerId = req.cookies["costumerId"];
  const id = new Types.ObjectId(costumerId);
  const restaurantName = req.query.restaurantName as string;

  try {
    if (req.method === "POST") {
      const reservation = new Reservation({
        restaurant: restaurantName,
        costumer: id,
        date: new Date(),
        description: "okkokok",
      });
      await reservation.save();
      res.status(200).send(reservation);
    } else if (req.method === "GET") {
      const oldReservations = await Reservation.find({
        restaurant: restaurantName,
      }).populate("costumer");

      res.status(200).send(oldReservations);
    } else if (req.method === "DELETE") {
      await Reservation.findByIdAndDelete(req.query.bookId as string);
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.error("Error handling the request:", error);
    res.status(500).end();
  }
};

export default handler;
