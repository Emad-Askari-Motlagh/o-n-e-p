import PrimaryLayout from "@/components/PrimaryLayout";
import React from "react";
import styles from "./styles.module.scss";
type Props = {};

export default function about({}: Props) {
  return (
    <div className={styles.about}>
      <h1 className={styles.about__header}>About Beställät App</h1>
      <div className={styles.about__paragraph}>
        Welcome to our React-based food ordering app! The app uses Nextjs, Scss,
        Typescript, Graphql and websockets and it is only for testing purposes
        and show some skills. The portfolio designed to show different ability
        and skills all in one place. The app is 70% done and there is lots of
        error handling and performance optimzation still left to be done.
      </div>
    </div>
  );
}
about.Layout = PrimaryLayout;
