
// This is a client component 👈🏽
import Profile from "@/components/profile/profile"
import { config } from "@/global/config"
import { headers } from "next/headers"
export default async function ProfilePage({ params, searchParams }: any) {
    const header = headers()
    const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
    const userAgent: any = header.get("user-agent")

    const theDirename = __dirname.split("/")

    const response = await (await fetch(`${config.hostname}/users/whoami`, {
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            fingerPrint: userAgent,
            clientIp: ip

        },
        method: "POST",
    })).json()
    const user = response.data
    return (
        <Profile user={user} />
    )
}