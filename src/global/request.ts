import { headers } from "next/headers";
import { config } from "./config";
const ip3country = require("ip3country");
ip3country.init();
export async function ssrRequest(query: any) {

    const header = headers()
    const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
    const userAgent: any = header.get("user-agent")
    // cookies().set("country", JSON.stringify({ code: ip3country.lookupStr(ip).toLowerCase(), name: "" }))

    return await (await fetch(`${config.hostname}/posts?${new URLSearchParams(query)}`, {
        cache: 'no-cache', headers: {
            fingerPrint: userAgent,
            clientIp: ip
        }
    })).json()
}