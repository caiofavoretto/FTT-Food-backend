import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Attendance from '../models/Attendance';

class DeleteAttendanceService {
  public async execute(id: string): Promise<void> {
    const attendanceRepository = getRepository(Attendance);
    const attendanceExists = await attendanceRepository.findOne({ id });

    if (!attendanceExists) {
      throw new AppError('Presença não encontrada.', 404);
    }

    await attendanceRepository.remove(attendanceExists);
  }
}

export default DeleteAttendanceService;
