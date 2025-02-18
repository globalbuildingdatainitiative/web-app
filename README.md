# Global Building Data Initiative (GBDI)

The [Global Building Data Initiative (GBDI)](www.gbdi.io) addresses the urgent need for open building data to inform action for reducing resource use as well as embodied and whole life carbon (WLC) emissions within the built environment. GBDI aims to fill prevalent gaps by encouraging collaboration with diverse stakeholders and advancing the adoption of sustainable building practices worldwide, with the development of a global network of stakeholders, the Open Building Data Format (openBDF) and the [Open Building Data Platform](https://www.gbdi.io/platform) for building data collection and management, enabling visualization, benchmarking, and target-setting to support the development of specific pathways for WLC reduction. Learn more about GBDI via [www.gbdi.io](www.gbdi.io).

# GBDI Web App

This repository contains the source code for the [GBDI Web App](https://app.gbdi.io), necessary to run an instance of the [Open Building Data Platform](https://www.gbdi.io/platform). It enables collection and analysis of building material data, including for component and whole building LCA data on a global scale to provide benchmarks and analytics of whole life cycle carbon (CO2e) emissions of buildings. Interested parties can use this code to build their own instance of the platform under the open source license, described in the [LICENSE](LICENSE) file. When building on this code, consider carrying forward the open science approach by sharing back any valuable features or customizations you may develop. Thank you!

## Features

- Global collection of building component and whole building LCA data
- Benchmarking and analytics of whole building LCA
- Built with TypeScript, [Vite](https://vitejs.dev), [React](https://react.dev), and [MantineUI](https://mantine.dev)
- Authentication using [SuperTokens](https://supertokens.com/)
- Data fetching with [Apollo Client](https://www.apollographql.com/)

## Installation

To install the dependencies, use npm:

```bash
npm install
```

Rename the `.env.example` file to `.env` and fill in the required environment variables.

# Development

To start the app in hot reload mode on http://localhost:8000, run the following command:

```bash
npm run dev
```

# Repository Structure

The repository structure is as follows:

```
├── src
│   ├── components    # React components
│   ├── context       # React context providers
│   ├── lib           # Utility functions
│   ├── pages         # Page components
│   ├── queries       # GraphQL queries, mutations, and fragments
│   └── main.tsx      # Entry point of the application
├── public            # Public assets
├── package.json      # Project dependencies and scripts
└── README.md         # Project documentation
```

# GraphQL Queries and Mutations

GraphQL queries and mutations are stored in `src/queries/queries.graphql`.
Changes to data fetching queries and mutations should be made in this file.

The repository uses GraphQL code generation to generate TypeScript types and React hooks for the queries and mutations.

To run GraphQL code generation, use the following command:

```bash
npm run codegen
```

# License

This project is licensed under the terms of Apache v2.0, described in the [LICENSE](LICENSE) file.
