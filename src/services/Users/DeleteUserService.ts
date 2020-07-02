import { getRepository } from 'typeorm';
import { utcToZonedTime } from 'date-fns-tz';

import path from 'path';
import fs from 'fs';

import User from '../../models/User';
import uploadConfig from '../../config/upload';
import AppError from '../../errors/AppError';

class DeleteUserService {
  public async execute(id: string): Promise<void> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ id });

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    if (user.avatar_url) {
      const userAvatarFilePath = path.join(
        uploadConfig.directory,
        user.avatar_url
      );

      const userAvatarFileExists = fs.existsSync(userAvatarFilePath);

      if (userAvatarFileExists) {
        fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.deleted_at = utcToZonedTime(new Date(), 'America/Sao_Paulo');

    await usersRepository.save(user);
  }
}
export default DeleteUserService;
