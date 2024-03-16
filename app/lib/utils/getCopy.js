function getCopy(collection) {
  return JSON.parse(JSON.stringify(collection));
}

export default getCopy;