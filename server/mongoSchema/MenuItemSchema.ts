import mongoose, { Document, Schema, Types } from "mongoose";
import menuCategorySchema, {
  i_MenuCategoryDocument,
} from "./menuCategorySchema";
import restaurangSchema, { IRestaurant } from "./restaurangSchema";

// Define the interface for the MenuItem document
export interface I_MenuItemDocument extends Document {
  category: Types.ObjectId | i_MenuCategoryDocument;
  restaurant: Types.ObjectId | IRestaurant;
  extra: {
    name: string;
    quantity: number;
    id: Types.ObjectId;
    price: number;
  }[];
  name: string;
  itemsType: string;
  price: number;
  description: string;
  quantity: number;
  availability: boolean;
  subCat: string[];
  images: any[];
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<I_MenuItemDocument>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "MenuCategory",
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurang",
    },
    extra: [
      {
        name: String,
        quantity: Schema.Types.Number,
        id: Schema.Types.ObjectId,
        price: Schema.Types.Number,
      },
    ],
    name: String,
    itemsType: String,
    price: Schema.Types.Number,
    description: String,
    quantity: Schema.Types.Number,
    availability: Boolean,
    subCat: { type: [String], default: [] },
    images: [],
  },
  { timestamps: true }
);

export default mongoose.models.MenuItem ||
  mongoose.model<I_MenuItemDocument>("MenuItem", MenuItemSchema);
