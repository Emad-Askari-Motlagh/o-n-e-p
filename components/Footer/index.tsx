import React, { useState } from "react";
import styles from "./footer.module.scss";
import { GrFacebook } from "react-icons/gr";
import { AiFillTwitterCircle } from "react-icons/ai";
import { ImMail4 } from "react-icons/im";
import Link from "next/link";

export default function PageTwo() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_wrapper}>
        <div className={styles.footer__col1}>
          <div className={styles.footer__col2}>
            <Link href="www.google.com">
              <a href="www.google.com">
                <GrFacebook size={16} color="gray" />
              </a>
            </Link>

            <Link href="www.google.com">
              <a href="www.google.com">
                <AiFillTwitterCircle
                  size={16}
                  color="gray"></AiFillTwitterCircle>
              </a>
            </Link>

            <Link href="www.google.com">
              <a>
                <ImMail4 size={16} color="gray" />
              </a>
            </Link>
          </div>
          <Link href="/terms/terms">
            <a className={styles.footer__terms}>Term and Conditions</a>
          </Link>

          <div className={styles.footer__invention}>
            <div> AllianceCodes ©2021</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
