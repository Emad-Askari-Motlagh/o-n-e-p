import { NextApiRequest, NextApiResponse } from "next";
import Reservation from "@/server/mongoSchema/reservationSchema";
import mongoose, { Types } from "mongoose";

export const config = {
  api: {
    bodyParser: true,
  },
};

const createReservation = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const costumerId = req.cookies["costumerId"];
    if (!costumerId) {
      return res.status(404).end();
    }
    const customerId = new Types.ObjectId(costumerId);
    const restaurantName = req.query.restaurantName as string;
    const { description, quantity } = req.body;

    const reservation = await new Reservation({
      restaurant: restaurantName,
      customer: new mongoose.Types.ObjectId(customerId),
      date: new Date(),
      description,
      quantity,
    });
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    console.error("Error saving reservation:", error);
    res.status(500).json({ error: "Error saving reservation" });
  }
};

const getReservations = async (req: NextApiRequest, res: NextApiResponse) => {
  const costumerId = req.cookies["costumerId"];
  if (!costumerId) {
    return res.status(404).end();
  }
  const customerId = new Types.ObjectId(costumerId);
  try {
    const restaurantName = req.query.restaurantName as string;
    const oldReservations = await Reservation.find({
      restaurant: restaurantName,
      costumer: costumerId,
    });
    res.status(200).json(oldReservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ error: "Error fetching reservations" });
  }
};

const deleteReservation = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const bookId = req.query.bookId as string;
    await Reservation.findByIdAndDelete(bookId);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).json({ error: "Error deleting reservation" });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      await createReservation(req, res);
    } else if (req.method === "GET") {
      await getReservations(req, res);
    } else if (req.method === "DELETE") {
      await deleteReservation(req, res);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.error("Error handling the request:", error);
    res.status(500).end();
  }
};

export default handler;
