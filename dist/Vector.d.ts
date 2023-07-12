declare class Vector {
    private apiKey;
    private baseUrl;
    constructor(apiKey: string);
    create({ type, inputText, model, modelProviderKey }: {
        type: string;
        inputText: string;
        model: string;
        modelProviderKey?: string;
    }): Promise<any>;
}
export default Vector;
