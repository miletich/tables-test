import moment from 'moment';
import removeAccents from 'remove-accents';

export const formatTitle = string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`.replace('_', ' ');

export const toIsoTime = dateObj =>
  moment(`${moment(dateObj.date, 'M/D/YYYY').format('YYYY-MM-DD')}T${moment(
    dateObj.time,
    'h:mm A',
  ).format('HH:mm')}`);

export const getUniqueVals = arr => Array.from(new Set(arr));

export const sortByKey = key => (a, b) => {
  if (typeof a[key] === 'string') {
    return a[key].localeCompare(b[key]);
  } else if (typeof a[key] === 'object') {
    return toIsoTime(b[key]).diff(toIsoTime(a[key]));
  }
  return a[key] - b[key];
};

export const processString = str => removeAccents(str).toLowerCase();

export const contains = (key, value) => obj =>
  processString(obj[key]).includes(processString(value));

export const isEqual = (key, value) => obj => obj[key] === value;

export const isInTimeRange = (key, value) => obj =>
  toIsoTime(obj[key])
    .fromNow()
    .includes(value);

// enables applying all active filters without requiring multiple array iterations
export const composePredicates = predicates =>
  predicates.reduce((acc, cur) => x => acc(x) && cur(x));
