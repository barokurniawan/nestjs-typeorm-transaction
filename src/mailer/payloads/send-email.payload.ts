interface SendEmailPayload {
    to: string,
    subject: string,
    attachments?: string[],
    html: string,
}

export default SendEmailPayload;