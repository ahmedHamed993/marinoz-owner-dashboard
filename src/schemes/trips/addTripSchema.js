import * as yup from "yup";
import { imagesSchemes } from "../imagesSchemes";

export const addTripSchema = yup.object().shape({
  trip_image: imagesSchemes.addRequiredImage,
  tour_title: yup.string().required(),
  destination: yup.array().of(yup.string().required()).required(),
  tour_type: yup.string().required(),
  duration: yup.number().min(1).required(),
  tour_brief: yup.string().required(),
  day: yup.array().of(yup.string().required()).required(),
  inclusion: yup.string().required(),
  exclusion: yup.string().required(),
  cancellation_policy: yup.string().required(),
  yacht_type: yup.string().required(),
  cabins: yup.number().min(1).required(),
  total_price: yup.number().min(1).required(),
  activities: yup.string().required(),
  from: yup.string().required(),
  to: yup.string().required(),
});
