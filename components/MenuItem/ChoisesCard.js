import React from "react";
import styled from "styled-components";

export default function ChoisesCard({ costumerExtra }) {
  return (
    <div className={parent}>
      {["s", "l"].map((res, i) => (
        <div key={i}>
          <span className={parent}>Pommes</span>
        </div>
      ))}
    </div>
  );
}
