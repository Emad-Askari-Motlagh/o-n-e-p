import React, { useState, ChangeEvent, FC } from "react";
import styles from "./styles.module.scss";

interface TextAreaProps {
  placeholder: string;
  width?: string;
  height?: string;
}

const TextArea: FC<TextAreaProps> = ({ placeholder, width, height }) => {
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.container}>
      <textarea
        className={styles.text_area}
        value={value}
        style={{ width, height }}
        onChange={handleChange}
        placeholder={placeholder}></textarea>
    </div>
  );
};

export default TextArea;
