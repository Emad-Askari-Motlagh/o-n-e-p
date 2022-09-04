import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ImPointUp } from "react-icons/im";

export default function Qestion() {
  const router = useRouter();

  const [activeQ, setActiveQ] = useState(Number(router.query.q));
  const [point, setPoint] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const questions = [
    { number: 1, answer: "Elephant", question: "World`s biggest animal" },
    { number: 2, answer: "Mouse", question: "World`s smallest animal" },
    { number: 3, answer: "Shapanzie", question: "World`s smartest animal" },
  ];
  // var value = null;
  useEffect(() => {
    if (router.query.q) setActiveQ(Number(router.query.q));

    typeof window !== "undefined" &&
      localStorage.setItem("qNumber", router.query.q);
  }, [router.query.q]);

  // useEffect(() => {
  //   if (router.query.q !== activeQ) {
  //     router.push(`/questions/${activeQ}`);
  //   }
  // }, [showAnswer]);
  if (!activeQ) return <div>Loading...</div>;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          padding: "20px",
        }}>
        <span>{`Points = ${activeQ}`}</span>
      </div>

      {questions.map((res, i) => {
        if (res.number === activeQ) {
          return (
            <div key={res.number || i}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  padding: "20px",
                }}>
                <span>{`Question number ${res.number} : ${res.question}?`}</span>{" "}
                <form>
                  <input placeholder="Answer here"></input>
                </form>
              </div>
              <span style={{ margin: "20px" }}>{`${res.question} = `}</span>
              {showAnswer && (
                <span style={{ margin: "20px" }}>{`${res.answer} `}</span>
              )}
            </div>
          );
        }
      })}
      <button
        onClick={() => {
          setShowAnswer(true);
          if (activeQ < questions.length) {
            setTimeout(() => {
              setShowAnswer(false);
              router.push(`/questions/${setActiveQ((q) => (q += 1))}`);
            }, 6000);
          }
        }}>
        Next
      </button>
      <button
        onClick={() => {
          setShowAnswer(true);
          setTimeout(() => {
            setActiveQ((activeQ) => (activeQ -= 1));
          }, 6000);
          localStorage.setItem("qNumber", activeQ);
        }}>
        Back
      </button>
    </div>
  );
}
