import NextLink from "next/link";
import styles from './api-docs.module.css';

export default function ApiDocs() {

    return (
        <>
            <NextLink href={`/`}>
                <h1>estimation corgi</h1>
            </NextLink>
            <div className={styles.container}>
                <p>available endpoints:</p>
                <NextLink href={'/api/message'}>
                    <code className={styles.code}>[GET]: /api/message</code>
                </NextLink>
                <p>returns a random message with a random duration</p>
                <p>example return:</p>
                <pre>
                    <code>
                        {JSON.stringify({
                            durationInHours: 40,
                            message: "message",
                            suggestedBy: "name"
                        }, null, 2)}
                    </code>
                </pre>
                <p>note: the <code>suggestedBy</code> field can be <code>undefined</code></p>
                <NextLink href={'/api/messages'}>
                    <code className={styles.code}>[GET]: /api/messages</code>
                </NextLink>
                <p>returns all messages</p>
                <p>example return:</p>
                <pre>
                    <code>
                        {JSON.stringify([{
                            message: "message1",
                            suggestedBy: "name1",
                        }, {
                            message: "message2",
                            suggestedBy: "name2",
                        }], null, 2)}
                    </code>
                </pre>
                <p>note: the <code>suggestedBy</code> field can be <code>undefined</code></p>
            </div>
        </>
    )
}