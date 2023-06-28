import { NextApiRequest, NextApiResponse } from "next";
import Reservation from "@/server/mongoSchema/reservationSchema";
import { Types } from "mongoose";

export const config = {
  api: {
    bodyParser: true,
  },
};

const getReservations = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const restaurantName = req.query.restaurantName as string;
    const oldReservations = await Reservation.find({
      restaurant: restaurantName,
    }).populate("costumer");
    res.status(200).json(oldReservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ error: "Error fetching reservations" });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      await getReservations(req, res);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.error("Error handling the request:", error);
    res.status(500).end();
  }
};

export default handler;
