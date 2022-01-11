import moment from 'moment';

const formatDate = (isoDateToDate) => {
  // date = new Date(date);
  // const year = date.getFullYear();
  // const month = date.getMonth() + 1;
  // const day = date.getDate();

  // return `${day}/${month}/${year}`;

  const dateComponent = moment
    .parseZone(isoDateToDate)
    .format('DD/MM/YYYY HH:mm a');
  return dateComponent;
};

export default formatDate;
