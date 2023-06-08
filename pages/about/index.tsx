import PrimaryLayout from "@/components/Primary-layout";
import React from "react";
import styles from "./styles.module.scss";
type Props = {};

export default function about({}: Props) {
  return (
    <div className={styles.about}>
      <h1 className={styles.about__header}>About Beställät App</h1>
      <div className={styles.about__paragraph}>
        Welcome to our React-based food ordering app! The app uses Nextjs, Scss,
        Typescript, Graphql and websockets and it`s only for testing
        purposes.The app designed to show all ability in one app, thats because
        it uses different techniques. The app is 70% done and there is lots of
        error handling still left in this project to be done. is right now just
        for testing purposes and is not in commercial level.
      </div>
    </div>
  );
}
about.Layout = PrimaryLayout;
