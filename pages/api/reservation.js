import Reservation from "@/server/mongoSchema/reservationSchrma";
import mongoose from "mongoose";

export default handler = async (req, res) => {
  if (req.method === "POST") {
    const { restaurant, date, costumer } = req.body;
    const reservation = await new Reservation({ restaurant, costumer, date });
    await reservation.save();
    res.status(200).send(reservation);
  } else {
    const { restaurant, costumerId } = req.query;
    // Handle any other HTTP method
    const id = mongoose.Types.ObjectId(costumerId);
    const oldReservation = await Reservation.findOne({
      costumer: id,
      restaurant,
    });

    if (oldReservation) {
      res.status(200).send(oldReservation);
    } else {
      res.status(500).end();
    }
  }
};
