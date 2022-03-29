import { $, $$ } from "../utils/dom.js";

export const onToggleIssuanceResult = (e) => {
  $("#issuance-lotto-tickets").classList.toggle("flex-col");
  [...$$(".lotto-detail")].forEach((item) =>
    item.style.display == "none"
      ? (item.style.display = "inline")
      : (item.style.display = "none")
  );
};
