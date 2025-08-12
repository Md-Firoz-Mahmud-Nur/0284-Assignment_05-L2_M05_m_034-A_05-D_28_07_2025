import { model, Schema } from "mongoose";
import { IParcel } from "./parcel.interface";

const ParcelSchema = new Schema<IParcel>(
  {
    trackingId: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    weight: { type: Number, required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fee: { type: Number, required: true },
    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    deliveryDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Requested", "Approved", "Dispatched", "In Transit", "Delivered"],
      required: true,
      default: "Requested",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Parcel = model<IParcel>("Parcel", ParcelSchema);
