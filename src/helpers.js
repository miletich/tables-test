import moment from 'moment';

export const formatTitle = string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`.replace('_', ' ');

export const toIsoTime = dateObj =>
  moment(`${moment(dateObj.date, 'M/D/YYYY').format('YYYY-MM-DD')}T${moment(
    dateObj.time,
    'h:mm A',
  ).format('HH:mm')}`);

export const getUniqueVals = arr => Array.from(new Set(arr));
