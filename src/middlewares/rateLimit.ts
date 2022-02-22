import SlowDown from "express-slow-down";
import rateLimit from "express-rate-limit";
import { config } from "@config/Config";

const slower = SlowDown({
  windowMs: config.request.slowDown.window,
  delayAfter: config.request.slowDown.delayAfter,
  delayMs: config.request.slowDown.delayMs,
});

const limiter = rateLimit({
  windowMs: config.request.rateLimit.window,
  max: config.request.rateLimit.max,
});

export { slower, limiter };
