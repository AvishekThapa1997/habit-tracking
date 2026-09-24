import { Injectable } from '@nestjs/common';
import { Redis } from '@upstash/redis';
import { InjectRedis } from '@/redis/redis.decorator.js';
import { AUTH_CONSTANTS } from '../constants/auth.constants.js';
import { type SessionData, Store } from 'express-session';

@Injectable()
export class SessionStoreService extends Store {
  private readonly prefix = AUTH_CONSTANTS.SESSION_PREFIX;
  private readonly ttl = AUTH_CONSTANTS.SESSION_TTL;

  constructor(@InjectRedis() private readonly redis: Redis) {
    super();
  }

  private createSessionId(sid: string) {
    return `${this.prefix}${sid}`;
  }

  get(
    sid: string,
    callback: (err: any, session?: SessionData | null) => void,
  ): void {
    this.redis
      .get<SessionData>(this.createSessionId(sid))
      .then((data) => callback(null, data ?? null))
      .catch((err) => callback(err));
  }

  set(
    sid: string,
    sessionData: SessionData,
    callback?: (err?: any) => void,
  ): void {
    try {
      const maxAge = sessionData?.cookie?.maxAge;
      const ttlSeconds =
        typeof maxAge === 'number' && maxAge > 0
          ? Math.ceil(maxAge / 1000)
          : this.ttl;

      this.redis
        .set(this.createSessionId(sid), sessionData, { ex: ttlSeconds })
        .then(() => callback?.(null))
        .catch((err) => callback?.(err));
    } catch (err) {
      callback?.(err);
    }
  }

  destroy(sid: string, callback?: (err?: any) => void): void {
    this.redis
      .del(this.createSessionId(sid))
      .then(() => callback?.(null))
      .catch((err) => callback?.(err));
  }

  touch(sid: string, sessionData: SessionData, callback?: () => void): void {
    const maxAge = sessionData?.cookie?.maxAge;
    if (typeof maxAge === 'number' && maxAge > 0) {
      const ttlSeconds = Math.ceil(maxAge / 1000);
      this.redis
        .expire(this.createSessionId(sid), ttlSeconds)
        .then(() => callback?.())
        .catch(() => callback?.());
    } else {
      callback?.();
    }
  }
}
