import moment from "moment";

const getDateNow = () => {
  return moment().format("yyyy-MM-DD HH:mm:ss");
};

export const convertDate = (date) => {
  return moment(date).format("YYYY-MM-DD hh:mm:ss");
};

export default getDateNow;
