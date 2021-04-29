// import * as dateFns from "date-fns";
// import _ from "lodash";

// const MonthDayYearFormat = "PP";
// const LongTimeFormat = "p";

// export function getPrettyTime(date) {
//   let formattedTime = dateFns.format(date, LongTimeFormat);
//   return formattedTime;
// }

// export function getRightTimeDate(selectedDate, time) {
//   let day = selectedDate.getDate();
//   let month = selectedDate.getMonth();
//   let year = selectedDate.getYear();

//   let h = time.getHours();
//   let m = time.getMinutes();

//   let date = new Date(year, month, day, h, m);

//   return date;
// }

// export function getRemindersOfDate(reminders, selectedDate) {
//   let filteredReminders = _.filter(reminders, { selectedDate: selectedDate });
//   return filteredReminders;
// }

// export function orderRemindersFromDateAsc(reminders) {
//   let sorted = reminders.sort((a, b) => dateFns.compareAsc(a.reminderDate, b.reminderDate));
//   return sorted;
// }

// export function orderRemindersFromDateDesc(reminders) {
//   let sorted = reminders.sort((a, b) => dateFns.compareDesc(a.reminderDate, b.reminderDate));
//   return sorted;
// }
