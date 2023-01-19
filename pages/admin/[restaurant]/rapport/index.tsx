import PrimaryLayout from "@/components/Primary-layout";
import { useAuth, useProvideAuth } from "hooks/Context.hook";
import React, { RefObject, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import Chart from "components/Chart";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ANALISTICS,
  GET_RAPPORT,
} from "@/server/graphql/querys/mutations.graphql";
import SelectInput from "@/components/SelectInput";
import React_Calendar from "components/Calendar";
import jsPDF from "jspdf";
import Button from "@/components/Button";
import TableHeader from "@/components/Table/TableHeader";
import TableData from "@/components/Table/TableData";
import { TableBody } from "@mui/material";
import {
  GetRapportMutation,
  GetRapportMutationVariables,
} from "@/server/generated/graphql";

export default function Rapport() {
  const [sortType, setSortType] = useState("year");
  const [doc, setDoc] = useState<string>();
  const [beginDate, seBeginDate] = useState(new Date());
  const [finishDate, seFinishDate] = useState(new Date());
  const reff = useRef();
  const htmlRef = useRef<HTMLElement>();
  const embedRef = useRef();

  const {
    user: { data: userData },
  } = useProvideAuth();
  const [getAnalistics, { data: raportData }] = useMutation<
    GetRapportMutation,
    GetRapportMutationVariables
  >(GET_RAPPORT);

  useEffect(() => {
    getAnalistics({
      variables: {
        beginDate: beginDate,
        finishDate: finishDate,
      },
    });
    // doc.text("Hello world!", 10, 10);
    // doc.save("a4.pdf");
  }, [beginDate, finishDate, getAnalistics]);

  const exportPDF = async () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(150);
    doc.setFillColor("#383838");
    const title = "My Awesome Report";
    const headers = [["NAME", "PROFESSION"]];
    doc.setFontSize(5);
    doc.setTextColor(200, 25, 50);
    doc.setLineDashPattern([40, 20], 33);

    setDoc(doc.output("datauristring"));

    // doc.save("report.pdf");
  };

  return (
    <div className={styles.dash_container}>
      <h1>Rapport</h1>

      <div className={styles.rapport}>
        <div className={styles.calendar_parent}>
          <React_Calendar
            label="Begin Date"
            value={beginDate}
            handleChange={(val) => seBeginDate(val)}
          />
          <React_Calendar
            label="Finish Date"
            value={finishDate}
            handleChange={(val) => seFinishDate(val)}
          />
        </div>

        <div className={styles.rapport_container}>
          <div>
            <h3>{userData?.CurrentUser?.restaurant.name}</h3>
            <br />
            {typeof beginDate === new Date() && (
              <div className={styles.date_description}>
                <span>{`From: ${beginDate?.toLocaleString()}`}</span>
                <br />
                <span>{`Untill: ${finishDate?.toDateString()}`}</span>
              </div>
            )}
          </div>

          {raportData?.GetRapport.flatMap((res, i) => {
            return (
              <div className={styles.rapport_wraper} key={i}>
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
              type="application/pdf"
              height="800px"
              width="80%"
              src={doc}></iframe>
          </>
        )}

        <Button width="80%" onClick={exportPDF}>
          Z Rapport
        </Button>
      </div>
    </div>
  );
}

function RapportItem({ val, sum, moms }) {
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