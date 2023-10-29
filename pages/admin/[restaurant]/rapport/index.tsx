import PrimaryLayout from "@/components/PrimaryLayout";
import useAuth from "hooks/Auth.hook";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { useMutation } from "@apollo/client";
import { GET_RAPPORT } from "@/server/graphql/querys/mutations.graphql";
import React_Calendar from "components/Calendar";
import Button from "@/components/Button";
import {
  GetRapportMutation,
  GetRapportMutationVariables,
} from "@/server/generated/graphql";
import Info from "@/components/Info";
import Head from "next/head";
import ErrorCard from "@/components/ErrorCard";
import AnimatedHeader from "@/components/AnimatedHeader";
import { ImParagraphJustify } from "react-icons/im";

export default function Rapport() {
  const [sortType, setSortType] = useState("year");
  const [doc, setDoc] = useState<string>();
  const [beginDate, seBeginDate] = useState(new Date());
  const [finishDate, seFinishDate] = useState(new Date());
  const embedRef = useRef();

  const {
    user: { data: userData },
  } = useAuth();
  const [
    getAnalistics,
    { data: rapportData, loading: rapportLoading, error: rapportError },
  ] = useMutation<GetRapportMutation, GetRapportMutationVariables>(GET_RAPPORT);

  useEffect(() => {
    getAnalistics({
      variables: {
        beginDate: beginDate as any,
        finishDate: finishDate as any,
      },
    });
    // doc.text("Hello world!", 10, 10);
    // doc.save("a4.pdf");
  }, [beginDate, finishDate, getAnalistics]);

  const exportPDF = () => {
    return null;
  };
  if (rapportError && !rapportLoading)
    return <ErrorCard>There is an error</ErrorCard>;
  return (
    <div className={styles.dash_container}>
      <Head>
        <title>Restaurant rapport page</title>
        <meta name="description" content="Restaurant rapport page" />
      </Head>
      <AnimatedHeader Logo={<ImParagraphJustify />}>Rapport</AnimatedHeader>
      <div className={styles.rapport}>
        <div className={styles.calendar_parent}>
          <React_Calendar
            label="Begin Date"
            value={beginDate}
            handleChange={(val: Date) => seBeginDate(val)}
          />
          <React_Calendar
            label="Finish Date"
            value={finishDate}
            handleChange={(val: Date) => seFinishDate(val)}
          />
        </div>
        <Info>OBS! Rapport on pdf is not available yet.</Info>
        <div className={styles.rapport_container}>
          <div>
            {typeof beginDate == Date() && (
              <div className={styles.date_description}>
                <span>{`From: ${beginDate?.toLocaleString()}`}</span>
                <br />
                <span>{`Untill: ${
                  finishDate?.toLocaleString()
                    ? finishDate?.toLocaleString()
                    : finishDate.toDateString()
                }`}</span>
              </div>
            )}
          </div>

          {rapportData?.GetRapport?.length &&
            rapportData?.GetRapport.flatMap((res, i) => {
              return (
                <div className={styles.rapport_wraper} key={i}>
                  {res.categorizedByDate?.length ? (
                    <div>
                      <h3>{userData.CurrentUser.restaurant.name}</h3>
                      <div className={styles.dates}>
                        <span>From :{beginDate?.toLocaleString()}</span>
                        <span>Untill: {finishDate?.toLocaleString()}</span>
                      </div>
                    </div>
                  ) : null}
                  {res.categorizedByTags.map((re, i) => (
                    <RapportItem
                      key={re._id}
                      val={re._id}
                      sum={re.sum}
                      moms={Math.round(re.sum * 0.3)}
                    />
                  ))}

                  {res.categorizedByName.map((re, i) => (
                    <RapportItem
                      key={re._id}
                      val={re._id}
                      sum={re.sum}
                      moms={Math.round(re.sum * 0.3)}
                    />
                  ))}

                  {res.categorizedByDate.map((re, i) => (
                    <RapportItem
                      key={re._id}
                      val={"Total sale:"}
                      sum={re.sum}
                      moms={Math.round(re.sum * 0.3)}
                    />
                  ))}
                </div>
              );
            })}
        </div>
        {doc && (
          <>
            <iframe
              ref={embedRef}
              itemType="application/pdf"
              height="800px"
              width="80%"
              src={doc}></iframe>
          </>
        )}

        <Button width="80%">Z Rapport</Button>
      </div>
    </div>
  );
}

function RapportItem({
  val,
  sum,
  moms,
}: {
  val: number;
  sum: number;
  moms: number;
}) {
  return (
    <div key={val} className={styles.rapport_row}>
      <div>{val}</div>
      <div className={styles.sell_item}>
        <div>Sell:</div>
        <div>{`${sum} kr`}</div>
      </div>
      <div className={styles.sell_item}>
        <div>Moms:</div>
        <div>{`${moms} kr`}</div>
      </div>
    </div>
  );
}
Rapport.Layout = PrimaryLayout;
