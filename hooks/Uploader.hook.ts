import axios from "axios";
import { ChangeEvent, useState } from "react";

const useUpload = (url: string) => {
  const [image, setImage] = useState<string>();

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const data = new FormData();
      data.append("file", e.target.files?.[0]);
      data.append("upload_preset", "zf8o4hzm");
      data.append("cloud_name", "dug3htihd");

      const resp = await axios.post(url, data);

      if (resp.data) {
        console.log(resp.data);
        setImage(resp.data.secure_url);
        return resp.data.secure_url;
      }
    }
  };
  return {
    uploadImage,
    image,
  };
};
export default useUpload;
