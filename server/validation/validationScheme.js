module.exports = {
  user(user) {
    if (!(user.email && user.password && user.nickname)) {
      return 'All input is required';
    };
    return user;
  },
  email(email) {
    return email.email;
  },
};
