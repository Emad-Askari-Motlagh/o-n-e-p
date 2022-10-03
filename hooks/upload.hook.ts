import { ChangeEvent, useState } from "react";
import { AdvancedImage } from "@cloudinary/react";

const useUpload = (url: string) => {
  const [image, setImage] = useState<string | Blob>();

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target !== null) {
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", "zf8o4hzm");
      data.append("cloud_name", "dug3htihd");

      fetch(url, {
        method: "post",
        body: data,
      })
        .then((resp) => resp.json())
        .then((data) => {
          setImage(data);
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  };
  return {
    uploadImage,
    setImage,
    image: image as typeof image & { url: string },
  };
};
export default useUpload;
