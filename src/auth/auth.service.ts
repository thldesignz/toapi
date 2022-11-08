import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService, private configService: ConfigService){ }

    async validateUserByPassword(loginAttempt: LoginUserDto): Promise<any> {
        let userToAttempt: any = await this.usersService.findOneByEmail(loginAttempt.email);
        
        return new Promise((resolve) => {
            if (!userToAttempt) {
                resolve({success: false, msg: 'User not found'});
            }
            userToAttempt.checkPassword(loginAttempt.password, async (err, isMatch) => {
                if(err) resolve({success: false, msg: 'Unexpected error. Please try again later.'});
    
                if(isMatch){
                    const data = await this.createJwtPayload(userToAttempt);
                    resolve({success: true, data });
                } else {
                    resolve({success: false, msg: 'Wrong password'})
                }
            });
        });
    }

    async createJwtPayload(user){
        let accessToken = this.getAccessToken(user._id, user.email);
        return {
            token: accessToken         
        }
    }

    getAccessToken(id, email) {
        return this.jwtService.sign({ id, email }, { expiresIn: '30d' });
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        const user = await this.usersService.findOne(payload.id);
        return user;
    }
}