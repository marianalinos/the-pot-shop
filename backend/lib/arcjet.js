import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import "dotenv/config";

// init arcjet

export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.scr"],
  rules: [
    shield({ mode: "LIVE" }), // protege contra ataques como SQL injection, XSS, CSRF, etc
    deleteBot({ mode: "LIVE", allow: "CATEGORY:SEARCH_ENGINE" }), // remove bots exceto search engines
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});
