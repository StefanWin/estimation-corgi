import NextLink from "next/link";
import {connection} from 'next/server';
import {MessageContainer} from "@/components/message-container";
import {getApprovedMessages} from "@/db";

const linkStyles = {marginBottom: '0.25rem'};

export default async function Home() {
    await connection();
    const messages = await getApprovedMessages();
    return (
        <>
            <NextLink href={`/`}>
                <h1>estimation corgi</h1>
            </NextLink>
            <MessageContainer approvedMessages={messages}/>
            <NextLink style={linkStyles} href={'/suggest'}>suggest a message</NextLink>
            <NextLink style={linkStyles} href={'/meta'}>show available messages &amp; images</NextLink>
            <NextLink style={linkStyles} href={'/api-docs'}>checkout the API</NextLink>
        </>
    );
}
