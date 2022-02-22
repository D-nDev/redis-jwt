import { getRedis, setRedis, setRedisTime } from "./RedisClient";

export async function firstTry(id: number) {
  await setRedis(`user-${id}`, JSON.stringify({ blocked: 1 }));
  throw {
    name: "invalidpass",
    userid: id,
    tries: 1,
    remaining: "Your account will be blocked in 2 trie(s)",
  };
}

export async function afterFirstTry(id: number, triesObject: any) {
  const currentTriesObject = JSON.parse(triesObject);

  currentTriesObject["blocked"] = currentTriesObject["blocked"] + 1;

  await setRedisTime(
    `user-${id}`,
    JSON.stringify({ blocked: currentTriesObject["blocked"] }),
    180
  );

  if (currentTriesObject["blocked"] >= 3) {
    const newtriesObject: any = await getRedis(`user-${id}`);
    const newtries = JSON.parse(newtriesObject);
    throw {
      name: "invalidpass",
      userid: id,
      tries: newtries["blocked"],
      remaining: `Your account is blocked. If you stop to try your account will be unlocked in 3 minutes`,
    };
  }

  throw {
    name: "invalidpass",
    userid: id,
    tries: currentTriesObject["blocked"],
    remaining: `Your account will be blocked in ${
      3 - currentTriesObject["blocked"]
    } trie(s)`,
  };
}

export async function correctPasswordButThreeTries(
  id: number,
  triesObject: any
) {
  const currentTriesObject = JSON.parse(triesObject);

  if (currentTriesObject["blocked"] <= 2) {
    return;
  }

  currentTriesObject["blocked"] = currentTriesObject["blocked"] + 1;

  await setRedisTime(
    `user-${id}`,
    JSON.stringify({ blocked: currentTriesObject["blocked"] }),
    180
  );

  const newtriesObject: any = await getRedis(`user-${id}`);
  const newtries = JSON.parse(newtriesObject);
  throw {
    name: "invalidpass",
    userid: id,
    tries: newtries["blocked"],
    remaining: `Your account is blocked. If you stop to try your account will be unlocked in 3 minutes`,
  };
}
