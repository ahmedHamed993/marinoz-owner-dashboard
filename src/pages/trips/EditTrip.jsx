import React from "react";
// mui
import {
  Stack,
  MenuItem,
  FormControl,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
  Button,
  Typography,
} from "@mui/material";
// components
import UploadImage from "../../components/upload-image/UploadImage";
import InputField from "../../components/input-field/InputField";
import SubmitButton from "../../components/buttons/SubmitButton";
import Select from "../../components/select/Select";
// forms
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTripSchema } from "../../schemes/trips/addTripSchema";
// icons
import { FaPlus } from "react-icons/fa";
const EditTrip = () => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      trip_image: null,
      tour_title: "",
      destination: ["first"],
      tour_type: "single_day",
      duration: 0,
      tour_brief: "",
      day: [],
      inclusion: "",
      exclusion: "",
      cancellation_policy: "",
      yacht_type: "",
      cabins: 0,
      total_price: 0,
      activities: "",
      from: "",
      to: "",
    },
    resolver: yupResolver(addTripSchema),
  });
  const { fields: dayFields } = useFieldArray({
    control,
    name: "day",
  });
  const {
    fields: destinationFields,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
  } = useFieldArray({
    control,
    name: "destination",
  });
  const submit = (values) => {
    console.log("values", values);
  };
  return (
    <Stack
      width="100%"
      gap="16px"
      component="form"
      onSubmit={handleSubmit(submit)}
    >
      <Stack direction="row" gap="16px">
        {/* left image  */}
        <Stack flex="1" gap="16px">
          {/* tour title  */}
          <InputField
            label="Tour Title"
            errorMsg={errors?.tour_title?.message}
            register={{ ...register("tour_title") }}
          />
          {/* destination fields  */}
          <Stack gap="8px">
            {destinationFields.map((field, index) => (
              <Select
                {...field}
                label="Destination"
                {...register(`destination.${index}`)}
                value={watch(`destination.${index}`)}
                errorMsg={errors?.destination?.[index]?.message}
              >
                <MenuItem value="first">First</MenuItem>
                <MenuItem value="second">Second</MenuItem>
              </Select>
            ))}
            <Button
              onClick={() => append("")}
              sx={{ ml: "auto", color: "#fff" }}
              variant="contained"
            >
              <FaPlus />
            </Button>
          </Stack>
          {/* type of tour */}
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              name="radio-buttons-group"
              {...register("tour_type")}
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
              }}
            >
              <FormControlLabel
                value="single_day"
                control={<Radio />}
                label="Single Day Tour"
              />
              <FormControlLabel
                value="daily"
                control={<Radio />}
                label="Daily"
              />
              <FormControlLabel
                value="weekly"
                control={<Radio />}
                label="Weekly"
              />
              <FormControlLabel
                value="multi_day"
                control={<Radio />}
                label="Multi Day Tour"
              />
            </RadioGroup>
          </FormControl>
          {/* duration  */}
          <InputField
            label="Duration"
            errorMsg={errors?.duration?.message}
            register={{ ...register("duration") }}
            onChange={(e) => {
              console.log(
                e.target.value,
                typeof e.target.value,
                parseInt(e.target.value),
              );
              setValue("duration", Number(e.target.value));
              setValue("day", [...Array(Number(e.target.value)).fill("")]);
            }}
            type="number"
          />
        </Stack>
        <UploadImage
          setValue={setValue}
          errorMsg={errors?.image?.message}
          name="trip_image"
          aspectRatio={16 / 9}
          height={382}
        />
      </Stack>
      <Stack gap="16px">
        {/* tour brief  */}
        <InputField
          label="Tour Brief"
          errorMsg={errors?.tour_brief?.message}
          register={{ ...register("tour_brief") }}
          multiline={true}
          rows={4}
        />
        {/* days  */}
        <Stack gap="16px">
          {dayFields.map((dayField, index) => (
            <InputField
              label={`Day ${index + 1}`}
              {...register(`day.${index}.value`)}
              errorMsg={errors?.day?.[index]?.message}
              multiline={true}
              rows={4}
            />
          ))}
        </Stack>
        {/* inclustion & exclusion  */}
        <Stack
          direction="row"
          gap="16px"
          width="100%"
          sx={{ "& > div": { flex: "1" } }}
        >
          {/* inclusion  */}
          <InputField
            label="Inclusion"
            errorMsg={errors?.inclusion?.message}
            register={{ ...register("inclusion") }}
            multiline={true}
            rows={4}
          />
          {/* exclusion  */}
          <InputField
            label="Exclusion"
            errorMsg={errors?.exclusion?.message}
            register={{ ...register("exclusion") }}
            multiline={true}
            rows={4}
          />
        </Stack>
        {/* cancellation_policy  */}
        <Stack>
          <Typography fontSize="16px">Cancelation Policy</Typography>
          <Stack direction="row" gap="2ch" alignItems="center">
            <Typography fontSize="16px" color="#627293">
              The Travller can cancel and refund within
            </Typography>
            <InputField
              label={``}
              {...register(`cancellation_policy`)}
              errorMsg={errors?.cancellation_policy?.message}
              type="number"
            />
            <Typography fontSize="16px" color="#627293">
              days{" "}
            </Typography>
          </Stack>
        </Stack>
        <Typography fontSize="16px">Availability</Typography>
        <Stack
          gap="16px"
          direction="row"
          flex="1"
          sx={{ "& > div": { flex: "1" } }}
        >
          <InputField
            label={`From`}
            {...register(`from`)}
            errorMsg={errors?.from?.message}
            type="date"
          />
          <InputField
            label={`To`}
            {...register(`to`)}
            errorMsg={errors?.to?.message}
            type="date"
          />
        </Stack>

        <Stack
          gap="16px"
          flex="1"
          sx={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}
        >
          <Select
            label="Yacht Type"
            {...register(`yacht_type`)}
            errorMsg={errors?.yacht_type?.message}
          >
            <MenuItem value="first">First</MenuItem>
            <MenuItem value="second">Second</MenuItem>
          </Select>
          <Select
            label="Cabins"
            {...register(`cabins`)}
            errorMsg={errors?.cabins?.message}
          >
            <MenuItem value="first">First</MenuItem>
            <MenuItem value="second">Second</MenuItem>
          </Select>
          <InputField
            label={`Total Price`}
            {...register(`total_price`)}
            errorMsg={errors?.total_price?.message}
            type="date"
          />
          <Select
            label="Activities"
            {...register(`activities`)}
            errorMsg={errors?.activities?.message}
          >
            <MenuItem value="first">First</MenuItem>
            <MenuItem value="second">Second</MenuItem>
          </Select>
        </Stack>
      </Stack>
      <SubmitButton label="Submit" />
    </Stack>
  );
};

export default EditTrip;
