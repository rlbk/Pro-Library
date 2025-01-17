import config from "@/lib/config";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: config.env.upstash.redishUrl,
  token: config.env.upstash.redishToken,
});

export default redis;
