import { blue, Bot, serve, webhookCallback } from "./deps.ts";
import "./config.ts";
import env from "./config.ts";
import delta from "./delta/mod.ts";

export const bot = new Bot(env["TOKEN"] || "");
export const handle = webhookCallback(bot, "std/http");

const initializer = async () => {
  await console.log(blue("[INFO]"), `bot is starting on ${env["HOST"]}`);
  await delta(bot);
};

const webhook = async () => {
  await console.log(blue("[INFO]"), `bot is starting on ${env["HOST"]}`);
  await serve(async (req) => {
    const url = new URL(req.url);

    if (req.method == "POST") {
      switch (url.pathname) {
        case "/bot":
          try {
            return await handle(req);
          } catch (err) {
            console.error(err);
            return new Response("Nope, not working...");
          }
        case "/github":
          const resp = await req.json();
          console.log(resp);
          return new Response(resp);
        default:
          return new Response("What you're trying to post?");
      }
    }

    switch (url.pathname) {
      case "/spotify":
        return new Response(req.url);
      case "/webhook":
        try {
          await bot.api.setWebhook(`https://${url.hostname}/bot`);
          return new Response("Done. Set");
        } catch (_) {
          return new Response("Couldn't succeed with installing webhook");
        }
      default:
        return Response.redirect("https://t.me/xinuxuz", 302);
    }
  });
};

const polling = async () => {
  await bot.start();
};

export const launch = async () => {
  switch (env["HOST"]) {
    case "WEBHOOK":
      await initializer();
      await webhook();
      break;
    case "POLLING":
      await initializer();
      await polling();
      break;
    default:
      throw new Error("Deploy method not validated!");
  }
};

await launch();
