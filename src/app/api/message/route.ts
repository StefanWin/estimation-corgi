import {getApprovedMessages} from "@/db";
import {getRandomArrayElement, getRandomNumber} from "@/util";

export async function GET(_request: Request) {
    const messages = await getApprovedMessages();

    if (messages.length === 0) {
        return new Response(null, {status: 404, statusText: 'no messages found'});
    }

    const message = getRandomArrayElement(messages)!;

    const responseBody = {
        durationInHours: getRandomNumber(1, 40),
        message: message.message,
        ...message.suggestedBy && {
            suggestedBy: message.suggestedBy,
        }
    };

    return new Response(JSON.stringify(responseBody), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}