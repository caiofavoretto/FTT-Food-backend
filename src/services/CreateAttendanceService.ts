import { getRepository, Between } from 'typeorm';
import { startOfDay, endOfDay } from 'date-fns';

import Attendance from '../models/Attendance';
import AppError from '../errors/AppError';
import parseDateTimeZone from '../utils/parseDateTimeZone';

interface Request {
  user_id: string;
}

class CreateAttendancesService {
  public async execute({ user_id }: Request): Promise<Attendance> {
    const attendanceRepository = getRepository(Attendance);

    const parsedDate = parseDateTimeZone(new Date());

    const attendanceExists = await attendanceRepository.find({
      where: {
        user_id,
        date: Between(startOfDay(parsedDate), endOfDay(parsedDate)),
      },
    });

    if (attendanceExists.length) {
      throw new AppError('Você já marcou presença para este dia');
    }

    const attendance = attendanceRepository.create({
      user_id,
    });

    await attendanceRepository.save(attendance);

    return attendance;
  }
}

export default CreateAttendancesService;
