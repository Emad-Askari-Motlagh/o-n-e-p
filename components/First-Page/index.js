import React, { useEffect, useRef } from "react";
import FirstPage_description from "components/caption";
import styles from "./FirstPage.module.scss";
import Image from "next/image";
export const FirstPageContent = () => {
  const containerRef = useRef();

  return (
    <div className={styles.pageOne} ref={containerRef}>
      <div className={styles.categorysContainer}>
        <svg
          viewBox="0 0 1440 400"
          style={{
            top: "0",
            left: 0,
          }}
          className={styles.svgWave}
          fillRule="evenodd"
          clipRule="evenodd"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1921.06 203.593l-46.03-18.719c-45.03-18.721-137.08-56.16-228.12-78.335-92.03-22.566-183.04-29.867-275.04-25.815-90.99 3.658-181.97 19.06-273.95 34.071-90.97 15.01-182.95 30.412-273.928 45.422-91.977 15.403-182.955 30.413-273.982 11.76-92.028-18.65-183.107-70.965-275.146-97.444-91.039-26.09-183.04-25.952-228.04-25.885l-46 .069L.759 3.703l46-.068 227.999-.34 275-.411 274-.409 274.003-.409 274-.409 275-.41c91-.136 183-.274 228-.34l46-.07.3 202.756z"
            fill="#09F"
          />
          <defs>
            <radialGradient
              id="Vector__paint0_radial"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(-.15128 -101.37789 959.99893 -1.43257 960.908 103.648)">
              <stop stopColor="#09F" />
              <stop offset="1" stopColor="#09F" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
        <svg
          width="1920"
          height="207"
          fill="none"
          className={styles.svgWave2}
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1921.06 203.593l-46.03-18.719c-45.03-18.721-137.08-56.16-228.12-78.335-92.03-22.566-183.04-29.867-275.04-25.815-90.99 3.658-181.97 19.06-273.95 34.071-90.97 15.01-182.95 30.412-273.928 45.422-91.977 15.403-182.955 30.413-273.982 11.76-92.028-18.65-183.107-70.965-275.146-97.444-91.039-26.09-183.04-25.952-228.04-25.885l-46 .069L.759 3.703l46-.068 227.999-.34 275-.411 274-.409 274.003-.409 274-.409 275-.41c91-.136 183-.274 228-.34l46-.07.3 202.756z"
            fill="url(#Vector__paint0_radial)"
          />
          <defs>
            <radialGradient
              id="Vector__paint0_radial"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(-.15128 -101.37789 959.99893 -1.43257 960.908 103.648)">
              <stop stopColor="#09F" />
              <stop offset="1" stopColor="#09F" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <FirstPage_description styles={styles} />

      <div className={styles.blobContainer}>
        <div className={styles.searviceExplain}>
          <div className={styles.outerDiv}>
            <header className={styles.searviceExplain_header}>
              Premier Website Services
            </header>
            <p className={styles.searviceExplain_description}>
              Premier Website Services We create long-term partnerships with
              businesses to enhance their growth and productivity leveraging the
              latest web technologies. Our custom web solutions cover every
              aspect of Web & Mobile Applications.
            </p>

            <button className="noselect">Learn more</button>
          </div>
        </div>
        <Image alt="" src="./web1.png" className={styles.imageTheme}></Image>
      </div>

      <div>
        <div className={styles.categorysContainer}>
          <svg
            viewBox="0 0 1440 100"
            className={styles.svgWave_down}
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#0099ff"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 106.145l80-28c80-29 240-87 400-77 160 9 320 86 480 96 160 9 320-48 480-48s320 57 400 86l80 29v288H0v-346z"
              fillOpacity="#09F"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
