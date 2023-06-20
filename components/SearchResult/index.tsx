import { AddMenuItemSubCategoryMutationFn } from "@/server/generated/graphql";
import Image from "next/image";
import React, { MouseEventHandler } from "react";
import Button from "../Button";
import Button2 from "../ButtonSecoundary";
import styles from "./styles.module.scss";

interface SearchResultProps {
  id: string;
  imgSrc: string;
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  restaurant?: string;
  category?: string;
}
export default function SearchResult({
  id,
  imgSrc,
  name,
  onClick,
  restaurant,
  category,
}: SearchResultProps) {
  return (
    <div className={styles.container}>
      <Image width={50} height={50} src={imgSrc} alt={name} />
      <span>{name}</span>
      <button type="button" onClick={onClick}>
        Add
      </button>
    </div>
  );
}
