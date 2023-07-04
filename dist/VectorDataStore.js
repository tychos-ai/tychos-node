"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Vector_1 = __importDefault(require("./Vector"));
class VectorDataStore {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://www.tychos.ai/api/';
        // this.baseUrl = 'http://localhost:3000/api/';
        this.vector = new Vector_1.default(apiKey);
    }
    query(name, queryString, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            // Vectorize query string
            const queryVector = yield this.vector.create("text_embedding", queryString, "text-embedding-ada-002");
            // Send query request to vector data store
            const url = `${this.baseUrl}/query-vector-store`;
            const headers = { 'api_key': this.apiKey };
            const payload = {
                'name': name,
                'query_vector': queryVector,
                'top': limit,
            };
            try {
                const response = yield axios_1.default.post(url, payload, { headers: headers });
                return response.data;
            }
            catch (e) {
                console.error(e);
                return null;
            }
        });
    }
}
exports.default = VectorDataStore;
