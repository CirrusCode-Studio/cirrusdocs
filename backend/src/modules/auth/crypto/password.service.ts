import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {
  async hash(password: string): Promise<string> {
    return await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });
  }

  async compare(password: string, hash: string): Promise<boolean> {
    try {
      if (!hash || !hash.startsWith('$argon2')) {
        return false;
      }
      
      return await argon2.verify(hash, password);
    } catch (err) {
      return false;
    }
    
  }
}

