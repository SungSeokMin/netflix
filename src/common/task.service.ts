import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class TasksService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  logEverySecond() {
    // 에러 로그 작성
    this.logger.error('ERROR 레벨 로그', null, TasksService.name);
    // 일반적으로 좋지 않은 상황이나 냅둬도 상관없는 로그 작성
    this.logger.warn('WARN 레벨 로그', TasksService.name);
    // 정보성 로그 작성
    this.logger.log('LOG 레벨 로그', TasksService.name);
    // 개발 환경에서 중요한 로그 작성
    this.logger.debug('DEBUG 레벨 로그', TasksService.name);
    // 중요하지 않은 내용 작성
    this.logger.verbose('VERBOSE 레벨 로그', TasksService.name);
  }
}
