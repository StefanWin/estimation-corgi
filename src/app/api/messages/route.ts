import {getApprovedMessages} from "@/db";

export async function GET(_request: Request) {
    const messages = await getApprovedMessages();

    const responseBody = messages.map((message) => ({
        message: message.message,
        ...message.suggestedBy && {suggestedBy: message.suggestedBy},
    }))

    return new Response(JSON.stringify(responseBody), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}