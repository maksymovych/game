const { AuthUser } = require('../models');
const bcrypt = require('bcrypt');
const createToken = require('../config/createToken');
const nodemailer = require('nodemailer');
const {
  NODEMAILER_PASS,
  NODEMAILER_USER,
  NODEMAILER_HOST,
  NODEMAILER_SERVICE,
} = require('../config/config');

module.exports = class ServiceUser {
  hash(password) {
    return bcrypt.hash(password, 10);
  }

  compare(password, hash) {
    return bcrypt.compare(password, hash);
  }

  async recoveryPassword(email, newPassword) {
    const userData = await AuthUser.query()
      .select('nickname', 'password')
      .where('email', '=', email);

    if (!userData[0]?.nickname) {
      return { status: 0, message: 'Invalid email' };
    }

    const transporter = nodemailer.createTransport({
      service: NODEMAILER_SERVICE,
      host: NODEMAILER_HOST,
      auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS,
      },
    });

    const mailOptions = {
      from: NODEMAILER_USER,
      to: email,
      subject: 'New password from Battleship',
      text: 'Your new password: ' + newPassword,
    };

    const sendEmail = async () => {
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        const password = await this.hash(newPassword);
        await AuthUser.query().where({ email }).update({ password });
        return {
          status: 1,
          nickname: userData[0].nickname,
          message: 'your password confirmation send to email: ' + email,
        };
      } catch (error) {
          console.log(error);
          return { status: 0, message: 'Invalid email, try again' };
      }
    };

    const response = await sendEmail();
    return response;
  }

  async addUser(user) {
    user.password = await this.hash(user.password);
    user.token = createToken(user);
    user.rate = 10;
    await AuthUser.query().insert(user);

    return {
      success: true,
      message: 'You successfully registered',
    };
  }

  async getUser(id) {
    return await AuthUser.query().select('nickname', 'rate').findById(id);
  }

  async login(userEmail, password) {
    try {
      const result = await AuthUser.query()
        .select('id', 'token', 'password', 'nickname')
        .where('email', '=', userEmail)
        .first();

      if (result.id && (await this.compare(password, result.password))) {
        return {
          message: '',
          success: true,
          userData: {
            id: result.id,
            nickname: result.nickname,
          },
        };
      }
      return { success: false, userData: {}, message: 'Incorrect login data' };
    } catch (error) {
      return { success: false, message: error };
    }
  }

  async logout(id) {
    const result = await AuthUser.query().select('nickname').findById(id);
    return { status: 1, result };
  }
};
