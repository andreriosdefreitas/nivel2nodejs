import ISendEmailDTO from '../dtos/ISendEmailDTO';
import IMailProvider from '../models/IMailProvider';

interface IMessage {
    to: string;
    body: string;
}

export default class FakeMailProvider implements IMailProvider {
    private messages: ISendEmailDTO[] = [];

    public async sendMail(message: ISendEmailDTO): Promise<void> {
        this.messages.push(message);
    }
}
