import dayjs from "dayjs";

export const dateMask = (v: string)=> {
  return dayjs(v).format('DD/MM/YYYY HH:mm')
}