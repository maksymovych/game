export const getTwoFields = (userId, fields) => {
  let opponent = [];
  let own = [];
  Object.values(fields).forEach((id) => {
    if (id[userId]) {
      own = id[userId];
    } else {
      opponent = Object.values(id)[0];
    }
  });

  return { opponent, own };
};
