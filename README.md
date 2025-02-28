# HRIS - HP

HRIS-HP is a Human Resource Information System designed to manage employee data efficiently. The initial implementation includes core functionalities like adding, editing, deleting, searching, and filtering employee records. The system also features an analytics dashboard with various visualizations, including donut charts, bar charts, and other statistical representations, to provide insights into workforce metrics.

More details => https://bloom-zoo-98d.notion.site/HRIS-HP-196d8896dcab80f18c6ff636638edf6a

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hris-hp/hris-hp.git
   cd hris-hp
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn dev
   ```

## Running JSON Server

To simulate a backend API, you can use `json-server`. The JSON data is already provided in the `db.json` file located in the root of the project. Follow these steps to run it:

1. **Run the `json-server` using the following command:**

   ```bash
   yarn json-server
   ```

   This command will start a server at `http://localhost:8080` using the existing `db.json` file.

2. **If the command does not work, you may need to install `json-server` globally:**

   ```bash
   npm install -g json-server
   ```

   After installing globally, try running the `yarn json-server` command again.

## Testing

To run the tests, use the following command:

```bash
yarn test
```

To run the tests with coverage, use the following command:

```bash
yarn test:coverage
```
