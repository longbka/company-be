import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import mongoose, { Model } from 'mongoose';
import { hashPasswordUtil } from '@/helpers/utils';
import aqp from 'api-query-params';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import * as dayjs from 'dayjs';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly mailerService: MailerService,
  ) {}

  async isEmailExist(email: string) {
    const user = await this.userModel.exists({ email });
    if (user) {
      return true; // Email exists
    }
    return false; // Email does not exist
  }

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address, image } = createUserDto;

    //check if email already exists
    const emailExists = await this.isEmailExist(email);
    if (emailExists) {
      throw new BadRequestException(
        'Email đã tồn tại, vui lòng chọn email khác!',
      );
    }

    //hash password hashing logic here
    const hashedPassword = await hashPasswordUtil(password);
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      image,
    });
    return {
      _id: user._id,
    };
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;
    if (!current) current = 1;
    if (!pageSize) pageSize = 10;
    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * pageSize;
    const results = await this.userModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .select('-password')
      .sort(sort as any);
    return { results, totalPages };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      { _id: updateUserDto._id },
      {
        ...updateUserDto,
      },
    );
  }

  remove(id: string) {
    if (mongoose.isValidObjectId(id)) {
      return this.userModel.deleteOne({ _id: id });
    }
    throw new BadRequestException('ID không hợp lệ!');
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async register(registerDto: CreateAuthDto) {
    const { name, email, password } = registerDto;

    //check if email already exists
    const emailExists = await this.isEmailExist(email);
    if (emailExists) {
      throw new BadRequestException(
        'Email đã tồn tại, vui lòng chọn email khác!',
      );
    }

    //hash password hashing logic here
    const hashedPassword = await hashPasswordUtil(password);
    const codeId = uuidv4();
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      isActive: false,
      codeId,
      codeExpired: dayjs().add(15, 'minute'),
    });

    this.mailerService
      .sendMail({
        to: user.email,
        subject: 'Kích hoạt tài khoản của bạn',
        text: 'Welcome',
        template: 'register',
        context: {
          logoUrl: 'https://lotustse.vn/uploads/sdfsa.png',
          name: user?.name ?? user?.email,
          activationCode: codeId,
          expireMinutes: 15,
          companyName: 'Lotus TSE',
          year: new Date().getFullYear(),
        },
      })
      .then((data) => {
        console.log('Email sent successfully', data);
      })
      .catch((e) => {
        console.log('Error occurred while sending email', e);
      });
    //return response
    return {
      _id: user._id,
    };
  }
}
