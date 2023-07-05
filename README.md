# Tychos Node.js Library

The Tychos Node.js library provides convenient access to the Tychos API from
applications written in JavaScript and TypeScript. The Tychos API allows you to query live, hosted vector datasets in your LLM application without needing to manage your own vector database / embedding pipelines.

You can find usage examples for the Tychos Node.js library in our [BioMed Demo App](https://demo.tychos.ai/) and the [/demo repo folder](https://github.com/tychos-lab/tychos).

## Installation

You don't need this source code unless you want to modify the package. If you just want to use the package, just run:

```sh
npm install tychos
```


### Requirements

- Node.js 12.0.0 or higher

## Usage

The library needs to be configured with your account's secret key which is available via the [Tychos Website][api-keys]. Set `tychos.apiKey` to its value:

```javascript
const tychos = require('tychos');
tychos.apiKey = "sk_a9adji08...";
```

Query live vector datasets:

```javascript
// initialize data store with API key
const dataStore = new tychos.VectorDataStore("sk_a9adji08...");

// query the data store object
const queryResults = dataStore.query({
    name: "pub-med-abstracts",
    queryString: "What is the latest research on molecular peptides",
    limit: 5
})

// print the metadata associated with the first result
console.log(queryResults[0].payload);
```

## Command-line interface

This library additionally provides a tychos command-line utility to make it easy to interact with the API from your terminal. Run `tychos-cli -h` for usage.

```sh
tychos-cli query --api-key <YOUR-API-KEY> --name pub-med-abstracts --query-string <"Your query string"> --limit 5
```

## Datasets available

We currently support a handful of research article datasets. If there's a particular dataset you'd like to incorporate into your LLM application, feel free to [reach out][twitter].

### Vector datasets

- PubMed abstracts ([source][pub-med]): 33.2M documents, updated daily at 07:00 UTC.

## Feedback and support

If you'd like to provide feedback, run into issues, or need support using embeddings, feel free to [reach out][twitter] or raise issues via GitHub.

[api-keys]: https://tychos.ai/
[twitter]: https://twitter.com/etpuisfume
[pub-med]: https://pubmed.ncbi.nlm.nih.gov/download/
```