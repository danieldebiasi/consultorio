function subtractHours(hour1, hour2) {
  let hh1 = hour1.split(":")[0];
  let mm1 = hour1.split(":")[1];
  let hh2 = hour2.split(":")[0];
  let mm2 = hour2.split(":")[1];

  if(hh1 > hh2 || (hh1 == hh2 && mm1 >= mm2)) {
    return false;
  }

  let total = Math.abs(((hh2 * 60) + mm2) - ((hh1 * 60) + mm1));
  let hh = Math.floor(total/6000);
  let mm = total%60;

  hh = (hh < 10) ? `0${hh}` : hh;
  mm = (mm < 10) ? `0${mm}` : mm;

  return `${hh}:${mm}`;
}

export { subtractHours };