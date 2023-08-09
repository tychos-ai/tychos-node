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

### Query live vector datasets

```javascript
// initialize data store with API key
const dataStore = new VectorDataStore(apiKey)

// list available datasets
const datasets = tychos.list()

// get name of the first dataset's id
console.log(datasets.data[0].name)

// query a single dataset from the data store object
const queryResults = await dataStore.query({
    name: "pub-med-abstracts",
    queryString: "What is the latest research on molecular peptides",
    limit: 5
})

// query multiple datasets and return the global top results
const queryResults = await dataStore.query({
    name: ["arxiv-abstracts", "pub-med-abstracts"],
    queryString: "What is the latest research on molecular peptides",
    limit: 5
})

// print the metadata associated with the first result
console.log(queryResults[0].payload);
```

### Filter queries on metadata fields
You can filter queries of individual datasets by passing a queryFilter object that specifies the field, operator and condition to apply. The following operators are currently available:

| Operator | Checks if the field value is... |
| :--- | :--- |
| $eq | **equal to** the specified value|
| $ne | **not equal to** the specified value|
| $in | **within** the specified array|
| $nin | **not within** the specified array|

Example queries using filters:
```javascript
// filter PubMed query on articles within a particular journal
const queryResults = await dataStore.query({
    name: "pub-med-abstracts",
    queryString: "What is the latest research on molecular peptides",
    queryFilter: {"Journal": {"$gt":"New England Journal of Medicine"}}
    limit: 5
})

// filter ArXiv query on papers written by LeCun, Hinton and Bengio
const queryResults = await dataStore.query({
    name: "arxiv-abstracts",
    queryString: "What is the latest research on molecular peptides",
    queryFilter: {"authors": {"$in":["LeCun", "Hinton", "Bengio"]}}
    limit: 5
})

```

See the datasets table below for the metadata fields available on each. We are working on adding additional query operators and fields (e.g., date ranges). As we expand datasets, we also plan to make available a set of general filters (e.g., date, author, type) for queries across multiple datasets.

## Datasets available
We currently support the full PubMed and ArXiv datasets and have plans to add additional sources in the coming weeks. If there's a particular dataset you'd like to incorporate into your LLM application, feel free to [reach out][twitter] or raise a GitHub issue.

### Vector datasets
| Dataset | Name | Size | Syncs | Metadata Fields |
| :--------------- | :--------------- | :--------------- | :--------------- | :--------------------- | 
| PubMed ([source][pub-med]) | pub-med-abstracts | 35.5M documents | Daily at 07:00 UTC | **All fields:**  PMID, PMCID, Title, Abstract, Authors, Abstract_URL, PMC_URL, Journal, Publication Date <br> **Query filterable:** Authors, Journal |
| ArXiv ([source][arxiv]) | arxiv-abstracts | 2.3M documents | Weekly at 07:00 UTC (Sunday) | **All fields:** id, doi, paper_title, abstract, authors, categories, abstract_url, full_text_url, journal, pub_date, update_date <br> **Query filterable:** authors, categories, journal |

## Feedback and support

If you'd like to provide feedback, run into issues, or need support using embeddings, feel free to [reach out][twitter] or raise an issue via GitHub.

[api-keys]: https://tychos.ai/
[twitter]: https://twitter.com/etpuisfume
[pub-med]: https://pubmed.ncbi.nlm.nih.gov/download/
[arxiv]: https://info.arxiv.org/help/bulk_data/index.html
