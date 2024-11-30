import { useState } from "react";
import { API_KEY } from "../../config";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const RemoveBackground = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        setError(null);
        const form = new FormData();
        form.append("image_file", file);

        const response = await fetch(
          "https://clipdrop-api.co/remove-background/v1",
          {
            method: "POST",
            headers: {
              "x-api-key": API_KEY,
            },
            body: form,
          }
        );

        if (response.ok) {
          const buffer = await response.arrayBuffer();
          const dataUrl =
            "data:image/png;base64," + arrayBufferToBase64(buffer);
          setResult(dataUrl);
        } else {
          setError(`Error: ${response.status} - ${response.statusText}`);
          console.error("Error:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Error processing the image. Please try again.");
      }
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = result;
    link.download = "downloaded_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div>
      <p className="text-xl text-center p-3">
        This API task uses the Clipdrop API&apos;s - Remove Background API
      </p>
      <p className="uppercase text-2xl text-center font-semibold">Remove Background</p>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {result && (
        <img
          src={result}
          alt="Result"
          className="border mx-auto w-[50%] h-[50%] mt-3"
        />
      )}
      <div className="flex items-center justify-center mt-5 gap-4">
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onChange={handleFileChange}
        >
          Upload File
          <VisuallyHiddenInput type="file" />
        </Button>
        {result && (
          <Button onClick={handleDownload} variant="outlined">
            Download Image
          </Button>
        )}
      </div>
    </div>
  );
};

export default RemoveBackground;

// Function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer) {
  const binary = new Uint8Array(buffer);
  let base64 = "";
  for (let i = 0; i < binary.length; i++) {
    base64 += String.fromCharCode(binary[i]);
  }
  return btoa(base64);
}
