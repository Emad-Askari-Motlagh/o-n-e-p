import React, { useState } from "react";
import styles from "./footer.module.scss";
import { GrFacebook } from "react-icons/gr";
import { AiFillTwitterCircle } from "react-icons/ai";
import { ImMail4 } from "react-icons/im";
import Link from "next/link";
export default function PageTwo() {
  return (
    <footer className={styles.pagetwocontainer}>
      <div className={styles.firstDiv}>
        <div className={styles.secound_part}>
          <div className={styles.social_part}>
            <Link href="www.google.com">
              <a href="www.google.com">
                <GrFacebook size={14} color="gray" />
              </a>
            </Link>

            <Link href="www.google.com">
              <a href="www.google.com">
                <AiFillTwitterCircle
                  size={14}
                  color="gray"></AiFillTwitterCircle>
              </a>
            </Link>

            <Link href="www.google.com">
              <a>
                <ImMail4 size={14} color="gray" />
              </a>
            </Link>
          </div>
          <Link href="/terms/terms">
            <a className={styles.term}>Term and Conditions</a>
          </Link>

          <div className={styles.companyDiv}>
            <div> AllianceCodes © 2021</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
