import * as yup from "yup";
export const imagesSchemes = {
  addRequiredImage: yup
    .mixed()
    .required("Image is required")
    .test("fileType", "Unsupported file type", (value) => {
      console.log(value);
      if (!value) return false; // Required field, so value must be present
      const supportedFormats = ["image/jpeg", "image/png"];
      return value instanceof File && supportedFormats.includes(value?.type);
    }),
  editRequiredImage: yup
    .mixed()
    .required("Image is required")
    .test("fileType", "Unsupported file type", (value) => {
      if (!value) return false; // Required field, so value must be present
      if (typeof value === "string") return true; // Allow strings (URLs)
      const supportedFormats = ["image/jpeg", "image/png"];
      return value instanceof File && supportedFormats.includes(value.type);
    }),
  addOptionalImage: yup
    .mixed()
    .nullable()
    .notRequired()
    .test("fileType", "Unsupported file type", (value) => {
      if (!value) return true; // Optional field, skip validation if not provided
      const supportedFormats = ["image/jpeg", "image/png"];
      return value instanceof File && supportedFormats.includes(value.type);
    }),
  editOptionalImage: yup
    .mixed()
    .nullable() // Allow null explicitly
    .notRequired() // Allow undefined explicitly
    .test("fileType", "Unsupported file type", (value) => {
      if (!value) return true; // Optional field, skip validation if not provided
      const supportedFormats = ["image/jpeg", "image/png"];
      return value instanceof File && supportedFormats.includes(value.type);
    }),
};
