import React from "react";
import Literasi from "./Literasi";

export default async function Page({ params }) {
  const slug = await params.slug;
  return (
    <>
      <Literasi slug={slug} />
    </>
  );
}
