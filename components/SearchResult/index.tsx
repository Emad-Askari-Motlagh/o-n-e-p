import { AddMenuItemSubCategoryMutationFn } from "@/server/generated/graphql";
import Image from "next/image";
import React from "react";
import Button from "../Button";
import Button2 from "../Button2";
import styles from "./styles.module.scss";

interface SearchResultProps {
  id: string;
  imgSrc: string;
  name: string;
  onClick: AddMenuItemSubCategoryMutationFn;
  restaurant: string;
  category: string;
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
      <Button2 type="button" onClick={onClick}>
        Add
      </Button2>
    </div>
  );
}
