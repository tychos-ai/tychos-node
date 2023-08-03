# Tychos Node.js Library

The Tychos Node.js library provides convenient access to the Tychos API from
applications written in JavaScript and TypeScript. The Tychos API allows you to query live, hosted vector datasets in your LLM application without needing to manage your own vector database / embedding pipelines.

To see the Tychos API in action, you can test out our [PubMed Demo App](https://tychos.ai/demo).

*Note: this library is meant for server-side usage only*

## Installation

You don't need this source code unless you want to modify the package. If you just want to use the package, just run:

```sh
npm install tychos
```


### Requirements

- Node.js 12 or higher

## Usage

The library needs to be configured with your account's secret key which is available via the [Tychos Website][api-keys]. Set `tychos.apiKey` to its value:

```javascript
const { VectorDataStore } = require('tychos');
const apiKey = "sk_test_12345";
```

Query live vector datasets:

```javascript
// initialize data store with API key
const tychos = new VectorDataStore(apiKey);

// query a single dataset from the data store object
const queryResults = await tychos.query({
    name: "pub-med-abstracts",
    queryString: "What is the latest research on molecular peptides",
    limit: 5
})

// query multiple datasets and return the global top results
const queryResults = await tychos.query({
    name: ["arxiv-abstracts", "pub-med-abstracts"],
    queryString: "What is the latest research on molecular peptides",
    limit: 5
})

// print the metadata associated with the first result
console.log(queryResults[0].payload);
```

## Datasets available
We currently support the full PubMed and ArXiv datasets and have plans to add additional sources in the coming weeks. If there's a particular dataset you'd like to incorporate into your LLM application, feel free to [reach out][twitter] or raise a GitHub issue.

### Vector datasets
| Dataset | Name | Size | Update Cadence | Update Time |
| --------------- | --------------- | --------------- | --------------- | --------------- |
| PubMed Abstracts ([source][pub-med]) | pub-med-abstracts | 35.5M documents | Daily | 07:00 UTC |
| Arxiv Abstracts ([source][arxiv]) | arxiv-abstracts | 2.3M documents | Weekly | 07:00 UTC on Sunday|

## Feedback and support

If you'd like to provide feedback, run into issues, or need support using embeddings, feel free to [reach out][twitter] or raise an issue via GitHub.

[api-keys]: https://tychos.ai/
[twitter]: https://twitter.com/etpuisfume
[pub-med]: https://pubmed.ncbi.nlm.nih.gov/download/
[arxiv]: https://info.arxiv.org/help/bulk_data/index.html
