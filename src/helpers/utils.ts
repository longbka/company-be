import { BadRequestException } from '@nestjs/common';

const bcrypt = require('bcrypt');
const saltRounds = 10;

export const hashPasswordUtil = async (plainPassword: string) => {
  try {
    return await bcrypt.hash(plainPassword, saltRounds);
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Error hashing password');
  }
};

export const comparePasswordUtil = async (
  plainPassword: string,
  hashedPassword: string,
) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new BadRequestException('Error comparing password');
  }
};
