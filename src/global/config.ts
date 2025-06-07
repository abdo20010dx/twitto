export const config = {
    // ngrok http --domain=shiner-suited-only.ngrok-free.app 3000
    getHostname: () => typeof window !== 'undefined' ? window.location.hostname : '',
    hostname: 'https://free-growing-sailfish.ngrok-free.app',
    // hostname: 'http://localhost:4000',
    // hostname: "http://ec2-54-82-56-105.compute-1.amazonaws.com:4000",
    backPort: 4000,
    frontPort: 3000,
    google_client_id: "33909835907-54jtp8q6q8u615jd3neeahnr3nbqfcru.apps.googleusercontent.com"
}