import dayjs from "dayjs";

export const getDate = () => {
  return `${dayjs().format("D MMM")}`;
};
