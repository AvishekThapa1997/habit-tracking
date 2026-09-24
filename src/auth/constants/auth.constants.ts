export const AUTH_CONSTANTS = {
  SESSION_TTL: 7 * 24 * 60 * 60, // in seconds
  SESSION_PREFIX: 'sess:',
};

export const REQUIRE_AUTH = Symbol('REQUIRE_AUTH');
export const SESSION_STORE = Symbol('SESSION_STORE');
