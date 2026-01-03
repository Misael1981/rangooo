function serializeDecimal(value) {
  return value !== null && value !== undefined ? Number(value) : 0;
}
export { serializeDecimal };
