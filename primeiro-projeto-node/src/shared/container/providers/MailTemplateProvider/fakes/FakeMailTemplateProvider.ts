import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
    public async parse(): Promise<string> {
        return 'Mail provider';
    }
}

export default FakeMailTemplateProvider;
