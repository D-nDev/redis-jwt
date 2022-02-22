export interface IConfig {
  request: {
    rateLimit: {
      window: number;
      max: number;
    };
    slowDown: {
      window: number;
      delayAfter: number;
      delayMs: number;
    };
  };
}
