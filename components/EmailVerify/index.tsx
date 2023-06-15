import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./styles.module.scss";
import Link from "next/link";

const EmailVerify = () => {
  const router = useRouter();
  const { id, token } = router.query;
  const [validUrl, setValidUrl] = useState(false);

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:8080/api/users/${id}/verify/${token}`;
        await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };

    if (id && token) {
      verifyEmailUrl();
    }
  }, [id, token]);

  return (
    <>
      {validUrl ? (
        <div className={styles.container}>
          {/* <img src={success} alt="success_img" className={styles.success_img} /> */}
          <h1>Email verified successfully</h1>
          <Link href="/login">
            <a className={styles.green_btn}>Login</a>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </>
  );
};

export default EmailVerify;
