import moment from 'moment';

export function convert(time, foramt = 'YYYY-MM-DD HH:mm:ss') {
  return moment(time).format(foramt);
};