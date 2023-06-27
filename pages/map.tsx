import Button from "@/components/Button";
import Map from "@/components/Map";
import PrimaryLayout from "@/components/PrimaryLayout";
import { useRouter } from "next/router";

import React from "react";

export default function MapPage() {
  const { query, push } = useRouter();
  return (
    <div>
      <Button
        style={{ backgroundColor: "red" }}
        onClick={() => push("/restaurant")}>
        Back to home
      </Button>
      <Map lat={query.lat} lng={query.lng} />
    </div>
  );
}

MapPage.Layout = PrimaryLayout;
