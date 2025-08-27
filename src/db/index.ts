import {getCloudflareContext} from "@opennextjs/cloudflare";
import {PrismaD1} from "@prisma/adapter-d1";
import {PrismaClient} from "@prisma/client";
import {Resend} from 'resend';
import {env} from "@/env";

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

    const resendApiKey = env.RESEND_API_KEY;
    const targetEmail = env.ON_SUGGEST_EMAIL;

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