const subtractSeconds = (date: Date, seconds: number) => {
  date.setSeconds(date.getSeconds() - seconds);
  return date;
};


export default {
  subtractSeconds,
};