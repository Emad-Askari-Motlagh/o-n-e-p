import mongoose, { SchemaTypes } from "mongoose";

var userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    token: { type: String, unique: true },
    id: String,
    restaurant: { type: SchemaTypes.ObjectId, ref: "Restaurang" },
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
export default mongoose.models.User || mongoose.model("User", userSchema);
