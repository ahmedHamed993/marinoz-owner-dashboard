import React, { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import { Box, Button, Typography, Input, CardMedia } from "@mui/material";
// import UploadIcon from "@mui/icons-material/CloudUpload"; // Example icon
import { BiImageAdd } from "react-icons/bi";

const UploadImage = ({
  setValue,
  errorMsg,
  name,
  defaultValue,
  aspectRatio = 1,
  height = 200,
  width,
}) => {
  const [imagePreview, setImagePreview] = useState(defaultValue || "");

  const uploadBoxHeight = width ? undefined : height;
  const uploadBoxWidth = width || height * aspectRatio;

  useEffect(() => {
    if (defaultValue) {
      setImagePreview(defaultValue);
    }
  }, [defaultValue]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          onProgress: (progress) =>
            console.log(`Compression Progress: ${progress}%`),
        };

        let compressedFile = await imageCompression(file, options);

        if (compressedFile.size > 1 * 1024 * 1024) {
          const adjustedOptions = {
            ...options,
            maxSizeMB: 1,
            initialQuality: 0.8,
          };
          compressedFile = await imageCompression(file, adjustedOptions);
        }
        const previewURL = URL.createObjectURL(compressedFile);
        setImagePreview(previewURL);
        setValue(name, compressedFile);
      } catch (error) {
        console.error("Error during image compression:", error);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: width, margin: "auto" }}>
      <Box
        sx={{
          position: "relative",
          height: height,
          width: width,
          border: "2px solid #ccc",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          backgroundColor: "#fff",
          cursor: "pointer",
          aspectRatio: aspectRatio,
        }}
        onClick={() => document.getElementById(name).click()}
      >
        {!imagePreview && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#aaa",
            }}
          >
            <BiImageAdd size={64} />
          </Box>
        )}
        {imagePreview && (
          <CardMedia
            component="img"
            image={imagePreview}
            alt="Preview"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </Box>
      <Input
        id={name}
        type="file"
        inputProps={{ accept: "image/*" }}
        onChange={handleImageUpload}
        sx={{ display: "none" }}
      />
      {errorMsg && (
        <Typography color="error" variant="body2" sx={{ marginTop: "8px" }}>
          {errorMsg}
        </Typography>
      )}
    </Box>
  );
};

export default UploadImage;
