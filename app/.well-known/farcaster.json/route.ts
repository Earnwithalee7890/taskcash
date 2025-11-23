import { NextResponse } from 'next/server';

export async function GET() {
    const manifest = {
        accountAssociation: {
            header: "eyJmaWQiOjEsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhmRjdENzE5NzhFNkI2MDhGQjlFNEU1RkM3MDcxMDQ4QTk2NTU3RjI4In0",
            payload: "eyJkb21haW4iOiJ0YXNrY2FzaC5hcHAifQ",
            signature: "MHg..."
        },
        frame: {
            version: "1",
            name: "TaskCash",
            homeUrl: process.env.NEXTAUTH_URL || "http://localhost:3000",
            iconUrl: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/logo.png`,
            splashImageUrl: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/logo.png`,
            splashBackgroundColor: "#1F2937",
            webhookUrl: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/webhook`
        }
    };

    return NextResponse.json(manifest);
}
