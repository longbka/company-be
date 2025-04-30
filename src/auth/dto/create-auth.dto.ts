import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateAuthDto {
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;

  @IsOptional()
  name: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  address: string;
}

export class CodeAuthDto {
  @IsNotEmpty({ message: 'Id không được để trống' })
  _id: string;

  @IsNotEmpty({ message: 'Code không được để trống' })
  code: string;
}

export class ChangePasswordAuthDto {
  @IsNotEmpty({ message: 'Code không được để trống' })
  codeId: string;

  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Code không được để trống' })
  password: string;

  @IsNotEmpty({ message: 'Confirm password không được để trống' })
  confirmPassword: string;
}
