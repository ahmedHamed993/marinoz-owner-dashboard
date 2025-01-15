import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import Compressor from "compressorjs";
import { FaCloudUploadAlt } from "react-icons/fa";

const MultiImageUploader = ({ setValue, name, errorMsg = "" }) => {
  const [previews, setPreviews] = useState([]);
  const [images, setImages] = useState([]); // Persistent state for all images

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const updatedPreviews = [];
    const newImages = [];

    files.forEach((file) => {
      if (file.size <= 1024 * 1024) {
        newImages.push(file);
        updatedPreviews.push(URL.createObjectURL(file));
      } else {
        new Compressor(file, {
          quality: 0.8,
          maxWidth: 1920,
          maxHeight: 1080,
          success: (compressedFile) => {
            const newFile = new File([compressedFile], file.name, {
              type: file.type,
            });
            newImages.push(newFile);
            updatedPreviews.push(URL.createObjectURL(newFile));

            // Update state and react-hook-form when all files are processed
            if (newImages.length === files.length) {
              const allImages = [...images, ...newImages];
              setImages(allImages);
              setPreviews((prev) => [...prev, ...updatedPreviews]);
              setValue(name, allImages);
            }
          },
          error: (err) => {
            console.error("Compression error:", err);
          },
        });
      }
    });

    if (newImages.length === files.length) {
      const allImages = [...images, ...newImages];
      setImages(allImages);
      setPreviews((prev) => [...prev, ...updatedPreviews]);
      setValue("images", allImages);
    }
  };

  return (
    <Stack
      sx={{
        backgroundColor: "#fff",
        width: "462px",
        boxShadow: "0px 8px 16px #00000009",
        p: 2,
        borderRadius: "8px",
      }}
    >
      <Stack
        flex="1"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
          gap: "10px",
          marginTop: "20px",
          marginBottom: "20px",
          backgroundColor: "#fff",
        }}
      >
        {errorMsg ? <Typography color="error">{errorMsg}</Typography> : null}
        {previews.map((preview, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "5px",
              overflow: "hidden",
              width: "100px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              setPreviews(previews.filter((_, i) => i !== index));
              setImages(images.filter((_, i) => i !== index));
            }}
          >
            <img
              src={preview}
              alt={`Preview ${index}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </Stack>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          width: "100%",
          height: "60px",
          border: "2px solid #ccc",
          borderRadius: "10px",
          cursor: "pointer",
          textAlign: "center",
        }}
      >
        <FaCloudUploadAlt size={32} color="#666" />
        <span style={{ fontSize: "14px", color: "#666" }}>Upload Media</span>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
      </label>
    </Stack>
  );
};

export default MultiImageUploader;
