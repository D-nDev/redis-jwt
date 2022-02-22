import Redis from "ioredis";
import { promisify } from "util";
import handleError from "./WriteLog";

const redisClient = new Redis({
  port: 6379,
  host: "localhost",
  family: 4,
  db: 0,
  lazyConnect: true,
});

redisClient.on("error", function (error) {
  handleError(error, "RedisClient");
});

function getRedis(value: string) {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient);
  return syncRedisGet(value);
}

function setRedis(key: string, value: any) {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient);
  return syncRedisSet(key, value);
}

export { redisClient, getRedis, setRedis };
