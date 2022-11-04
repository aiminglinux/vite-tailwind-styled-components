import moment from "moment";

export const capitalFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatDate = (timestamp, momented) => {
  const date = new Date(timestamp).toLocaleDateString("en-us", {
    month: "short",
    day: "numeric",
    year: momented ? undefined : "numeric",
  });
  return momented
    ? `${date} (${moment(timestamp).startOf("seconds").fromNow()})`
    : date;
};
