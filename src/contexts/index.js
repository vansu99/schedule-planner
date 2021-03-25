import React from "react";
import { BoardProvider } from "./board-context";
import { GlobalProvider } from "./global-context";

export function StoreProviderContext(props) {
  return (
    <>
      {[BoardProvider].reduce((ProviderNested, ProviderCurrent) => {
        return <ProviderCurrent>{ProviderNested}</ProviderCurrent>;
      }, props.children)}
    </>
  );
}
