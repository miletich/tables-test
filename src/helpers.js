export const formatTitle = string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`.replace('_', ' ');
