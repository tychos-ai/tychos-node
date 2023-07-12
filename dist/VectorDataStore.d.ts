declare class VectorDataStore {
    private apiKey;
    private baseUrl;
    private vector;
    constructor(apiKey: string);
    query({ name, queryString, limit }: {
        name: string;
        queryString: string;
        limit: number;
    }): Promise<any>;
    list(): Promise<any>;
}
export default VectorDataStore;
