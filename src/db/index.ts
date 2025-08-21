import {getCloudflareContext} from "@opennextjs/cloudflare";
import {PrismaD1} from "@prisma/adapter-d1";
import {PrismaClient} from "@prisma/client";
import {Resend} from 'resend';

const getPrismaClient = async () => {
    const ctx = await getCloudflareContext({async: true});
    const adapter = new PrismaD1(ctx.env.DB);
    return new PrismaClient({adapter});
}

export const getApprovedMessages = async (): Promise<CorgiMessage[]> => {
    const prismaClient = await getPrismaClient();
    return prismaClient.message.findMany({
        where: {isApproved: true},
    });
}

export const suggestMessage = async (message: string, suggestedBy: string | null) => {
    const prismaClient = await getPrismaClient();

    const suggestion = await prismaClient.message.create({
        data: {
            message,
            suggestedBy,
            isApproved: false,
            createdAt: new Date(),
        }
    });

    const resendApiKey = process.env.RESEND_API_KEY;
    const targetEmail = process.env.ON_SUGGEST_EMAIL;

    if (!resendApiKey || !targetEmail) {
        console.error("no RESEND_API_KEY or ON_SUGGEST_EMAIL env vars found");
        return;
    }

    const resend = new Resend(resendApiKey);

    const emailBody = [
        `Message: ${suggestion.message}`,
        `suggestedBy: ${suggestion.suggestedBy ?? '-'}`,
        `createdAt: ${suggestion.createdAt}`
    ].join('\n');

    const emailResult = await resend.emails.send({
        from: 'info@estimation-corgi.swinte.dev',
        to: [targetEmail],
        subject: 'new suggestion for estimation-corgi',
        text: emailBody,
    })

    if (emailResult.error) {
        console.error(`failed to send email to ${targetEmail}`);
        console.error(emailResult.error);
    } else {
        console.log(`successfully send email ${emailResult.data.id} to ${targetEmail}`);
    }


}