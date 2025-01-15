import * as yup from "yup";
import { imagesSchemes } from "../imagesSchemes";

export const addYachtSchema = yup.object().shape({
  photos: yup.array().of(imagesSchemes.addRequiredImage),
  yacht_type_id: yup.object().shape({
    id: yup.string().required(),
  }),
  country_id: yup.object().shape({
    id: yup.string().required(),
  }),
  city_id: yup.object().shape({
    id: yup.string().required(),
  }),
  capacity: yup.string().required(),
  cabins: yup.number().required(),
  bedrooms: yup.number().required(),
  bed: yup.number().required(),
  adults: yup.number().required(),
  children: yup.number().required(),
  name: yup.string().required(),
  model: yup.string().required(),
  manufacturer: yup.string().required(),
  build_year: yup.number().required(),
  renewal_date: yup.string().required(),
  length: yup.number().required(),
  width: yup.number().required(),
  depth: yup.number().required(),
  location: yup.string().required(),
  engine_type: yup.string().required(),
  fuel_type: yup.string().required(),
  recent_upgrades: yup.string().required(),
  condition: yup.string().required(),
  description: yup.string().required(),
});
