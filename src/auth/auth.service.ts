import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, EmployeeDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signupEmployees(dto: EmployeeDto) {
    const hash = await argon.hash(dto.password);
    // below code will send to user's phone number
    const authCode = await Math.floor(Math.random() * 100000);
    const introCode = await Math.floor(Math.random() * 100000);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          address: dto.address,
          phone: dto.phone,
          createdBy: dto.createdBy,
          fullName: dto.fullName,
          role: dto.role,
          authCode,
          introCode,
        },
        select: {
          id: true,
          email: true,
          address: true,
          phone: true,
          createdAt: true,
          fullName: true,
          createdBy: true,
          role: true,
          authCode: true,
          introCode: true,
        },
      });
      return { user };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signinEmployee(dto: EmployeeDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    const phone = await this.prisma.user.findUnique({
      where: { phone: dto.phone },
    });
    if (!user || !phone) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const matchPwd = await argon.verify(user.hash, dto.password);
    if (!matchPwd) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.signToken(user.id, user.email, user.role);
  }

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    // below code will send to user's phone number
    const authCode = await Math.floor(Math.random() * 100000);
    const introCode = await Math.floor(Math.random() * 100000);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          address: dto.address,
          phone: dto.phone,
          fullName: dto.fullName,
          authCode,
          introCode,
          isAdmin: false,
        },
        select: {
          id: true,
          email: true,
          address: true,
          phone: true,
          createdAt: true,
          fullName: true,
          createdBy: true,
          authCode: true,
          introCode: true,
        },
      });
      return { user };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    const phone = await this.prisma.user.findUnique({
      where: { phone: dto.phone },
    });
    if (user && phone) {
      user.isAdmin === false;
    }
    if (!user || !phone) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const matchPwd = await argon.verify(user.hash, dto.password);
    if (!matchPwd) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.signToken(user.id, user.email, user.role);
  }

  async signToken(
    userId: number,
    email: string,
    role: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, email, role };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret: secret,
    });
    return { access_token: token };
  }

  async logout(userId: number, dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const matchPwd = await argon.verify(user.hash, dto.password);
    if (!matchPwd) {
      throw new ForbiddenException('Credentials incorrect');
    }
    try {
      await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2014' || error.code === 'P2003') {
          console.log(error.message);
        }
      }
      return { message: 'Your account successfully deleted' };
    }
  }

  async getUsers(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user.isAdmin === true) {
      return this.prisma.user.findMany();
    }
  }

  async getUser(userId: number, personId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user.isAdmin === true) {
      const person = await this.prisma.user.findUnique({
        where: { id: personId },
      });
      if (!person) {
        throw new ForbiddenException('access to resource denied!');
      }
      return { person };
    }
  }
}
