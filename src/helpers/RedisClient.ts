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

async function getRedis(key: string) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function setRedis(key: string, value: any) {
  return new Promise((resolve, reject) => {
    redisClient.set(key, value, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function setRedisTime(key: string, value: any, time: string | number) {
  return new Promise((resolve, reject) => {
    redisClient.set(key, value, "ex", time, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export { redisClient, getRedis, setRedis, setRedisTime };
