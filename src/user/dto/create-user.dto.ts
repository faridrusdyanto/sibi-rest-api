import { IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsDate } from "class-validator";

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsNotEmpty()
  @IsNumber()
  roleId: number;
  
  @IsOptional()
  @IsBoolean()
  online?: boolean;

  @IsOptional()
  @IsBoolean()
  member?: boolean;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsDate()
  memberStartAt?: Date
  
  @IsOptional()
  @IsDate()
  memberEndAt?: Date
  
  @IsOptional()
  @IsDate()
  joinDate?: Date

}
