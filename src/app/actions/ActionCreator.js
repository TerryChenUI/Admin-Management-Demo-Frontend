export const makeActionCreator = (type, payload) => {
  return (payload) => {
    return { type, payload };
  }
}