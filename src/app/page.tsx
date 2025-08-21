import NextLink from "next/link";
import {connection} from 'next/server';
import {MessageContainer} from "@/components/message-container";
import {getApprovedMessages} from "@/db";

export default async function Home() {
    await connection();
    const messages = await getApprovedMessages();
    return (
        <>
            <NextLink href={`/`}>
                <h1>estimation corgi</h1>
            </NextLink>
            <MessageContainer approvedMessages={messages}/>
            <NextLink style={{marginBottom: '0.25rem'}} href={'/suggest'}>suggest a message</NextLink>
            <NextLink href={'/meta'}>show available messages</NextLink>
            <NextLink href={'/api-docs'}>checkout the API</NextLink>
        </>
    );
}
