import * as yup from "yup";
import { imagesSchemes } from "../imagesSchemes";

export const addRentalSchema = yup.object().shape({
  name: yup.string().required(),
  images: yup
    .array(imagesSchemes.addRentalSchema)
    .min(1, "upload at least one image")
    .required(),
  description: yup.string().required(),
  location: yup.string().required(),
  note: yup.string(),
  owner_id: yup.string().required(),
  city_id: yup.object().shape({
    id: yup.string().required(),
  }),
  country_id: yup.object().shape({
    id: yup.string().required(),
  }),
});
