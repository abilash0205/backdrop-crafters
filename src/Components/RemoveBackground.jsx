import { useState } from "react";
import { API_KEY } from "../../config";

const RemoveBackground = () => {
  const [result, setResult] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
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
          console.error("Error:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
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

  return (
    <div>
      {result && <img src={result} alt="Result" />}
      {result && <button onClick={handleDownload}>Download Image</button>}
      <input type="file" name="" id="" onChange={handleFileChange} />
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
