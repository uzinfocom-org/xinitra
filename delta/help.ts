import { Composer, Context } from "../deps.ts";
import * as start from "./start.ts";

const composer = new Composer();

export const message = `<b>Mavjud komandalar:</b>` +
  `\n` +
  `\n` +
  `/help - <code>shu habarni ko'rsatish</code>` +
  `\n`;

export const keyboard = start.keyboard;

composer.command("help", async (ctx: Context): Promise<void> => {
  await ctx.reply(message, {
    parse_mode: "HTML",
    reply_markup: keyboard,
  });
});

export default composer;
