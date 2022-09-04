// import Booking from "@/components/Booking";
// import PrimaryLayout from "@/components/Primary-layout";
// import useRedirect from "@/hooks/Redirect.hook";
// import { useRouter } from "next/router";

function Reservation({ COSTUMER, RESERVATION }) {
  return <div></div>;
  //   const router = useRouter();
  //   const { redirect } = useRedirect({
  //     error: "You need to register",
  //     endPoint: "/restaurant",
  //   });
  //   if (!COSTUMER) {
  //     redirect();
  //   }
  //   return <Booking COSTUMER={COSTUMER} RESERVATION={RESERVATION} />;
  // }
}
export default Reservation;
// Reservation.Layout = PrimaryLayout;

// export async function getServerSideProps({ req }) {
//   try {
//     //Get the cookie from the req
//     const { costumerId } = req.cookies;
//     var reservation = null;

//     //If there was a cookie then find the costumer in DB and return it
//     if (costumerId) {
//       reservation = await ReservationDocument.findOne({
//         _id: costumerId,
//       }).populate("reservation");
//       return {
//         props: {
//           COSTUMER: costumerId,
//           RESERVATION: reservation,
//         },
//       };
//     } else {
//       return {
//         props: {
//           COSTUMER: null,
//         },
//       };
//     }
//   } catch (err) {
//     return {
//       props: {
//         COSTUMER: null,
//       },
//     };
//   }
// }
