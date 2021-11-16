import dotenv from "dotenv";

import { send } from "./src/discord/webhook/discord.js";

dotenv.config();

let msg = "gm FREE MINT NOW MINT NOW";

send(process.env.DISCORD_WEBHOOK_TEST_URL, msg);
