const bufferOrigins = new Map([
  ['local', 'https://local.buffer.com'],
  ['production', 'https://buffer.com'],
]);

const bufferOriginRegex = /https?:\/\/(?:[^.]+\.)?buffer(?:app)?\.com/;

export { bufferOrigins, bufferOriginRegex };
