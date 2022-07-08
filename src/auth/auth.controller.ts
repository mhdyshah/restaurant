import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { GetUser } from './decorator';
import { AuthDto, EmployeeDto } from './dto';
import { JwtGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup/employee')
  signupEmployees(@Body() dto: EmployeeDto) {
    return this.authService.signupEmployees(dto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin/employee')
  signinEmployee(@Body() dto: EmployeeDto) {
    return this.authService.signinEmployee(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('logout/:id')
  logout(@Body() dto: AuthDto, @Param('id', ParseIntPipe) userId: number) {
    return this.authService.logout(userId, dto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Get('users')
  getUsers(@GetUser('id') userId: number) {
    return this.authService.getUsers(userId);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Get('users/:id')
  getUser(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) personId: number,
  ) {
    return this.authService.getUser(userId, personId);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('photo', {
      dest: './uploads',
    }),
  )
  uploadSingle(@UploadedFile() file) {
    console.log(file);
  }
}
