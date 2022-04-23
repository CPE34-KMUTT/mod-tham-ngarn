import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { LoginException } from '@/exceptions/service/LoginException';
import { RegexUtil } from '@/utils/RegexUtil';
import { Cookie } from '@/utils/cookie/Cookie';
import { StaffRepository } from '@/repositories/staff/StaffRepository';
import { Staff } from '@/entities/Staff';
import { SessionRepository } from '@/repositories/session/SessionRepository';
import { Session } from '@/entities/Session';

export class AuthService {

  private readonly staffRepository: StaffRepository;
  private readonly sessionRepository: SessionRepository;

  public constructor(staffRepository: StaffRepository, sessionRepository: SessionRepository) {
    this.staffRepository = staffRepository;
    this.sessionRepository = sessionRepository;
  }

  public async login(username: string, password: string): Promise<Cookie> {
    if (!RegexUtil.DIGIT_ONLY.test(username)) {
      throw new LoginException('Username must be contain only numbers (staff id)');
    }

    if (password.length < 8) {
      throw new LoginException('Password must be at least 8 characters');
    }

    const expectedStaff = new Staff().setStaffId(Number(username));
    const [staff] = await this.staffRepository.read(expectedStaff);

    if (!staff) {
      throw new LoginException('Username or password is incorrect');
    }

    const isCorrectPassword = await bcrypt.compare(password, staff.getPassword());
    if (!isCorrectPassword) {
      throw new LoginException('Username or password is incorrect');
    }

    const sessionId = crypto.randomUUID();
    const cookie = new Cookie('sid', sessionId)
      .setMaxAge(1000 * 60 * 60 * 24 * 15)
      .setHttpOnly(true);
    const session = new Session()
      .setSessionId(sessionId)
      .setStaffId(Number(username))
      .setExpiryDate(cookie.getExpiryDate());

    await this.sessionRepository.create(session);
    return cookie;
  }

  public async logout(sessionId: string): Promise<void> {
    const expectedSession = new Session().setSessionId(sessionId);
    this.sessionRepository.delete(expectedSession);
  }

}
