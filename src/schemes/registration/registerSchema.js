import * as yup from "yup";
import { imagesSchemes } from "../imagesSchemes";
export const registerSchema = yup.object().shape({
  // image:imagesSchemes.addRequiredImage,
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  phone_number: yup.string().required(),
  address: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
  city_id: yup.object().shape({
    id: yup.string().required(),
  }),
  country_id: yup.object().shape({
    id: yup.string().required(),
  }),
});
