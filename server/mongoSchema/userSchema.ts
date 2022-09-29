import mongoose, { SchemaTypes, Schema } from "mongoose";
import restaurangSchema from "./restaurangSchema";

export interface I_UserDocument extends mongoose.Document {
  restaurant: Schema.Types.ObjectId | typeof restaurangSchema;
}

var userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    token: { type: String, unique: true },
    id: String,
    restaurant: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: restaurangSchema ?? "Restaurang",
    },
  },
  { timestamps: true }
);
// UserSchema.pre("save", function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return next(err);

//     bcrypt.hash(this.password, salt, (err, hash) => {
//       if (err) return next(err);
//       this.password = hash;

//       next();
//     });
//   });
// });
export default mongoose.models.User ||
  mongoose.model<I_UserDocument>("User", userSchema);
