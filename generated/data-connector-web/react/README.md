# Generated React README
This README will guide you through the process of using the generated React SDK package for the connector `data-connector-web`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `JavaScript README`, you can find it at [`data-connector-web/README.md`](../README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@generated/data-connector-web/react` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#react).

# Table of Contents
- [**Overview**](#generated-react-readme)
- [**TanStack Query Firebase & TanStack React Query**](#tanstack-query-firebase-tanstack-react-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-react-query-packages)
  - [*Configuring TanStack Query*](#configuring-tanstack-query)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListMyAccounts*](#listmyaccounts)
  - [*GetMyAccount*](#getmyaccount)
  - [*ListMyAccountContacts*](#listmyaccountcontacts)
  - [*ListQuestionnaireTemplates*](#listquestionnairetemplates)
  - [*GetQuestionnaireTemplate*](#getquestionnairetemplate)
  - [*GetMyUserSettings*](#getmyusersettings)
- [**Mutations**](#mutations)
  - [*CreateMyAccount*](#createmyaccount)
  - [*UpdateMyAccount*](#updatemyaccount)
  - [*SetMyAccountPrimaryContact*](#setmyaccountprimarycontact)
  - [*ClearMyAccountPrimaryContact*](#clearmyaccountprimarycontact)
  - [*DeleteMyAccount*](#deletemyaccount)
  - [*CreateMyAccountContact*](#createmyaccountcontact)
  - [*UpdateMyAccountContact*](#updatemyaccountcontact)
  - [*DeleteMyAccountContact*](#deletemyaccountcontact)
  - [*CreateQuestionnaireTemplate*](#createquestionnairetemplate)
  - [*CreateQuestionnaireTemplateQuestion*](#createquestionnairetemplatequestion)
  - [*UpdateQuestionnaireTemplateName*](#updatequestionnairetemplatename)
  - [*UpdateQuestionnaireTemplateQuestion*](#updatequestionnairetemplatequestion)
  - [*DeleteQuestionnaireTemplateQuestion*](#deletequestionnairetemplatequestion)
  - [*DeleteQuestionnaireTemplate*](#deletequestionnairetemplate)
  - [*UpsertMyUserSettings*](#upsertmyusersettings)

# TanStack Query Firebase & TanStack React Query
This SDK provides [React](https://react.dev/) hooks generated specific to your application, for the operations found in the connector `data-connector-web`. These hooks are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack React Query v5](https://tanstack.com/query/v5/docs/framework/react/overview).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated React SDK.

## Installing TanStack Query Firebase and TanStack React Query Packages
In order to use the React generated SDK, you must install the `TanStack React Query` and `TanStack Query Firebase` packages.
```bash
npm i --save @tanstack/react-query @tanstack-query-firebase/react
```
```bash
npm i --save firebase@latest # Note: React has a peer dependency on ^11.3.0
```

You can also follow the installation instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#tanstack-install), or the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react) and [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/installation).

## Configuring TanStack Query
In order to use the React generated SDK in your application, you must wrap your application's component tree in a `QueryClientProvider` component from TanStack React Query. None of your generated React SDK hooks will work without this provider.

```javascript
import { QueryClientProvider } from '@tanstack/react-query';

// Create a TanStack Query client instance
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <MyApplication />
    </QueryClientProvider>
  )
}
```

To learn more about `QueryClientProvider`, see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start) and the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/react#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `data-connector-web`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@generated/data-connector-web';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react-angular).

```javascript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@generated/data-connector-web';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the hooks provided from your generated React SDK.

# Queries

The React generated SDK provides Query hook functions that call and return [`useDataConnectQuery`](https://react-query-firebase.invertase.dev/react/data-connect/querying) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/querying).

TanStack React Query caches the results of your Queries, so using the same Query hook function in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query hooks execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, including how to make a query "lazy", see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries).

To learn more about TanStack React Query's Queries, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/queries).

## Using Query Hooks
Here's a general overview of how to use the generated Query hooks in your code:

- If the Query has no variables, the Query hook function does not require arguments.
- If the Query has any required variables, the Query hook function will require at least one argument: an object that contains all the required variables for the Query.
- If the Query has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Query's variables are optional, the Query hook function does not require any arguments.
- Query hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Query hooks functions can be called with or without passing in an `options` argument of type `useDataConnectQueryOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/query-options).
  - ***Special case:***  If the Query has all optional variables and you would like to provide an `options` argument to the Query hook function without providing any variables, you must pass `undefined` where you would normally pass the Query's variables, and then may provide the `options` argument.

Below are examples of how to use the `data-connector-web` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## ListMyAccounts
You can execute the `ListMyAccounts` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useListMyAccounts(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyAccountsData>): UseDataConnectQueryResult<ListMyAccountsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListMyAccounts(options?: useDataConnectQueryOptions<ListMyAccountsData>): UseDataConnectQueryResult<ListMyAccountsData, undefined>;
```

### Variables
The `ListMyAccounts` Query has no variables.
### Return Type
Recall that calling the `ListMyAccounts` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListMyAccounts` Query is of type `ListMyAccountsData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListMyAccountsData {
  accounts: ({
    id: UUIDString;
    ownerId: string;
    companyName: string;
    businessNumber?: string | null;
    phoneNumber?: string | null;
    primaryContactId?: UUIDString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Account_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListMyAccounts`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@generated/data-connector-web';
import { useListMyAccounts } from '@generated/data-connector-web/react'

export default function ListMyAccountsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListMyAccounts();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListMyAccounts(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListMyAccounts(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListMyAccounts(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.accounts);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetMyAccount
You can execute the `GetMyAccount` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useGetMyAccount(dc: DataConnect, vars: GetMyAccountVariables, options?: useDataConnectQueryOptions<GetMyAccountData>): UseDataConnectQueryResult<GetMyAccountData, GetMyAccountVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetMyAccount(vars: GetMyAccountVariables, options?: useDataConnectQueryOptions<GetMyAccountData>): UseDataConnectQueryResult<GetMyAccountData, GetMyAccountVariables>;
```

### Variables
The `GetMyAccount` Query requires an argument of type `GetMyAccountVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetMyAccountVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetMyAccount` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetMyAccount` Query is of type `GetMyAccountData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetMyAccountData {
  account?: {
    id: UUIDString;
    ownerId: string;
    companyName: string;
    businessNumber?: string | null;
    phoneNumber?: string | null;
    primaryContactId?: UUIDString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    contacts: ({
      id: UUIDString;
      accountId: UUIDString;
      name: string;
      email?: string | null;
      phoneNumber?: string | null;
      role?: string | null;
      createdAt: TimestampString;
      updatedAt: TimestampString;
    } & AccountContact_Key)[];
  } & Account_Key;
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetMyAccount`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetMyAccountVariables } from '@generated/data-connector-web';
import { useGetMyAccount } from '@generated/data-connector-web/react'

export default function GetMyAccountComponent() {
  // The `useGetMyAccount` Query hook requires an argument of type `GetMyAccountVariables`:
  const getMyAccountVars: GetMyAccountVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetMyAccount(getMyAccountVars);
  // Variables can be defined inline as well.
  const query = useGetMyAccount({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetMyAccount(dataConnect, getMyAccountVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetMyAccount(getMyAccountVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetMyAccount(dataConnect, getMyAccountVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.account);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListMyAccountContacts
You can execute the `ListMyAccountContacts` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useListMyAccountContacts(dc: DataConnect, vars: ListMyAccountContactsVariables, options?: useDataConnectQueryOptions<ListMyAccountContactsData>): UseDataConnectQueryResult<ListMyAccountContactsData, ListMyAccountContactsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListMyAccountContacts(vars: ListMyAccountContactsVariables, options?: useDataConnectQueryOptions<ListMyAccountContactsData>): UseDataConnectQueryResult<ListMyAccountContactsData, ListMyAccountContactsVariables>;
```

### Variables
The `ListMyAccountContacts` Query requires an argument of type `ListMyAccountContactsVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListMyAccountContactsVariables {
  accountId: UUIDString;
}
```
### Return Type
Recall that calling the `ListMyAccountContacts` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListMyAccountContacts` Query is of type `ListMyAccountContactsData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListMyAccountContactsData {
  accountContacts: ({
    id: UUIDString;
    accountId: UUIDString;
    name: string;
    email?: string | null;
    phoneNumber?: string | null;
    role?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & AccountContact_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListMyAccountContacts`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListMyAccountContactsVariables } from '@generated/data-connector-web';
import { useListMyAccountContacts } from '@generated/data-connector-web/react'

export default function ListMyAccountContactsComponent() {
  // The `useListMyAccountContacts` Query hook requires an argument of type `ListMyAccountContactsVariables`:
  const listMyAccountContactsVars: ListMyAccountContactsVariables = {
    accountId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListMyAccountContacts(listMyAccountContactsVars);
  // Variables can be defined inline as well.
  const query = useListMyAccountContacts({ accountId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListMyAccountContacts(dataConnect, listMyAccountContactsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListMyAccountContacts(listMyAccountContactsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListMyAccountContacts(dataConnect, listMyAccountContactsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.accountContacts);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListQuestionnaireTemplates
You can execute the `ListQuestionnaireTemplates` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useListQuestionnaireTemplates(dc: DataConnect, options?: useDataConnectQueryOptions<ListQuestionnaireTemplatesData>): UseDataConnectQueryResult<ListQuestionnaireTemplatesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListQuestionnaireTemplates(options?: useDataConnectQueryOptions<ListQuestionnaireTemplatesData>): UseDataConnectQueryResult<ListQuestionnaireTemplatesData, undefined>;
```

### Variables
The `ListQuestionnaireTemplates` Query has no variables.
### Return Type
Recall that calling the `ListQuestionnaireTemplates` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListQuestionnaireTemplates` Query is of type `ListQuestionnaireTemplatesData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListQuestionnaireTemplatesData {
  questionnaireTemplates: ({
    id: UUIDString;
    name: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & QuestionnaireTemplate_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListQuestionnaireTemplates`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@generated/data-connector-web';
import { useListQuestionnaireTemplates } from '@generated/data-connector-web/react'

export default function ListQuestionnaireTemplatesComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListQuestionnaireTemplates();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListQuestionnaireTemplates(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListQuestionnaireTemplates(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListQuestionnaireTemplates(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.questionnaireTemplates);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetQuestionnaireTemplate
You can execute the `GetQuestionnaireTemplate` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useGetQuestionnaireTemplate(dc: DataConnect, vars: GetQuestionnaireTemplateVariables, options?: useDataConnectQueryOptions<GetQuestionnaireTemplateData>): UseDataConnectQueryResult<GetQuestionnaireTemplateData, GetQuestionnaireTemplateVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetQuestionnaireTemplate(vars: GetQuestionnaireTemplateVariables, options?: useDataConnectQueryOptions<GetQuestionnaireTemplateData>): UseDataConnectQueryResult<GetQuestionnaireTemplateData, GetQuestionnaireTemplateVariables>;
```

### Variables
The `GetQuestionnaireTemplate` Query requires an argument of type `GetQuestionnaireTemplateVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetQuestionnaireTemplateVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetQuestionnaireTemplate` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetQuestionnaireTemplate` Query is of type `GetQuestionnaireTemplateData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetQuestionnaireTemplateData {
  questionnaireTemplate?: {
    id: UUIDString;
    ownerId: string;
    name: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    questions: ({
      id: UUIDString;
      label: string;
      description?: string | null;
      position: number;
    } & QuestionnaireTemplateQuestion_Key)[];
  } & QuestionnaireTemplate_Key;
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetQuestionnaireTemplate`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetQuestionnaireTemplateVariables } from '@generated/data-connector-web';
import { useGetQuestionnaireTemplate } from '@generated/data-connector-web/react'

export default function GetQuestionnaireTemplateComponent() {
  // The `useGetQuestionnaireTemplate` Query hook requires an argument of type `GetQuestionnaireTemplateVariables`:
  const getQuestionnaireTemplateVars: GetQuestionnaireTemplateVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetQuestionnaireTemplate(getQuestionnaireTemplateVars);
  // Variables can be defined inline as well.
  const query = useGetQuestionnaireTemplate({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetQuestionnaireTemplate(dataConnect, getQuestionnaireTemplateVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuestionnaireTemplate(getQuestionnaireTemplateVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuestionnaireTemplate(dataConnect, getQuestionnaireTemplateVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.questionnaireTemplate);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetMyUserSettings
You can execute the `GetMyUserSettings` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useGetMyUserSettings(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyUserSettingsData>): UseDataConnectQueryResult<GetMyUserSettingsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetMyUserSettings(options?: useDataConnectQueryOptions<GetMyUserSettingsData>): UseDataConnectQueryResult<GetMyUserSettingsData, undefined>;
```

### Variables
The `GetMyUserSettings` Query has no variables.
### Return Type
Recall that calling the `GetMyUserSettings` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetMyUserSettings` Query is of type `GetMyUserSettingsData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetMyUserSettingsData {
  userSettings?: {
    ownerId: string;
    quoteFollowUpEnabled: boolean;
    quoteFollowUpDays: number;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & UserSettings_Key;
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetMyUserSettings`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@generated/data-connector-web';
import { useGetMyUserSettings } from '@generated/data-connector-web/react'

export default function GetMyUserSettingsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetMyUserSettings();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetMyUserSettings(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetMyUserSettings(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetMyUserSettings(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.userSettings);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

# Mutations

The React generated SDK provides Mutations hook functions that call and return [`useDataConnectMutation`](https://react-query-firebase.invertase.dev/react/data-connect/mutations) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/mutations).

Mutation hooks do not execute their Mutations automatically when called. Rather, after calling the Mutation hook function and getting a `UseMutationResult` object, you must call the `UseMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack React Query's Mutations, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations).

## Using Mutation Hooks
Here's a general overview of how to use the generated Mutation hooks in your code:

- Mutation hook functions are not called with the arguments to the Mutation. Instead, arguments are passed to `UseMutationResult.mutate()`.
- If the Mutation has no variables, the `mutate()` function does not require arguments.
- If the Mutation has any required variables, the `mutate()` function will require at least one argument: an object that contains all the required variables for the Mutation.
- If the Mutation has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Mutation's variables are optional, the Mutation hook function does not require any arguments.
- Mutation hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Mutation hooks also accept an `options` argument of type `useDataConnectMutationOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations#mutation-side-effects).
  - `UseMutationResult.mutate()` also accepts an `options` argument of type `useDataConnectMutationOptions`.
  - ***Special case:*** If the Mutation has no arguments (or all optional arguments and you wish to provide none), and you want to pass `options` to `UseMutationResult.mutate()`, you must pass `undefined` where you would normally pass the Mutation's arguments, and then may provide the options argument.

Below are examples of how to use the `data-connector-web` connector's generated Mutation hook functions to execute each Mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## CreateMyAccount
You can execute the `CreateMyAccount` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateMyAccount(options?: useDataConnectMutationOptions<CreateMyAccountData, FirebaseError, CreateMyAccountVariables>): UseDataConnectMutationResult<CreateMyAccountData, CreateMyAccountVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateMyAccount(dc: DataConnect, options?: useDataConnectMutationOptions<CreateMyAccountData, FirebaseError, CreateMyAccountVariables>): UseDataConnectMutationResult<CreateMyAccountData, CreateMyAccountVariables>;
```

### Variables
The `CreateMyAccount` Mutation requires an argument of type `CreateMyAccountVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateMyAccountVariables {
  id: UUIDString;
  companyName: string;
  businessNumber?: string | null;
  phoneNumber?: string | null;
}
```
### Return Type
Recall that calling the `CreateMyAccount` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateMyAccount` Mutation is of type `CreateMyAccountData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateMyAccountData {
  account_insert: Account_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateMyAccount`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateMyAccountVariables } from '@generated/data-connector-web';
import { useCreateMyAccount } from '@generated/data-connector-web/react'

export default function CreateMyAccountComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateMyAccount();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateMyAccount(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateMyAccount(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateMyAccount(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateMyAccount` Mutation requires an argument of type `CreateMyAccountVariables`:
  const createMyAccountVars: CreateMyAccountVariables = {
    id: ..., 
    companyName: ..., 
    businessNumber: ..., // optional
    phoneNumber: ..., // optional
  };
  mutation.mutate(createMyAccountVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., companyName: ..., businessNumber: ..., phoneNumber: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createMyAccountVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.account_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateMyAccount
You can execute the `UpdateMyAccount` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateMyAccount(options?: useDataConnectMutationOptions<UpdateMyAccountData, FirebaseError, UpdateMyAccountVariables>): UseDataConnectMutationResult<UpdateMyAccountData, UpdateMyAccountVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateMyAccount(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateMyAccountData, FirebaseError, UpdateMyAccountVariables>): UseDataConnectMutationResult<UpdateMyAccountData, UpdateMyAccountVariables>;
```

### Variables
The `UpdateMyAccount` Mutation requires an argument of type `UpdateMyAccountVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateMyAccountVariables {
  id: UUIDString;
  companyName: string;
  businessNumber?: string | null;
  phoneNumber?: string | null;
}
```
### Return Type
Recall that calling the `UpdateMyAccount` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateMyAccount` Mutation is of type `UpdateMyAccountData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateMyAccountData {
  account_update?: Account_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateMyAccount`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateMyAccountVariables } from '@generated/data-connector-web';
import { useUpdateMyAccount } from '@generated/data-connector-web/react'

export default function UpdateMyAccountComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateMyAccount();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateMyAccount(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateMyAccount(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateMyAccount(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateMyAccount` Mutation requires an argument of type `UpdateMyAccountVariables`:
  const updateMyAccountVars: UpdateMyAccountVariables = {
    id: ..., 
    companyName: ..., 
    businessNumber: ..., // optional
    phoneNumber: ..., // optional
  };
  mutation.mutate(updateMyAccountVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., companyName: ..., businessNumber: ..., phoneNumber: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateMyAccountVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.account_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## SetMyAccountPrimaryContact
You can execute the `SetMyAccountPrimaryContact` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useSetMyAccountPrimaryContact(options?: useDataConnectMutationOptions<SetMyAccountPrimaryContactData, FirebaseError, SetMyAccountPrimaryContactVariables>): UseDataConnectMutationResult<SetMyAccountPrimaryContactData, SetMyAccountPrimaryContactVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useSetMyAccountPrimaryContact(dc: DataConnect, options?: useDataConnectMutationOptions<SetMyAccountPrimaryContactData, FirebaseError, SetMyAccountPrimaryContactVariables>): UseDataConnectMutationResult<SetMyAccountPrimaryContactData, SetMyAccountPrimaryContactVariables>;
```

### Variables
The `SetMyAccountPrimaryContact` Mutation requires an argument of type `SetMyAccountPrimaryContactVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SetMyAccountPrimaryContactVariables {
  accountId: UUIDString;
  contactId: UUIDString;
}
```
### Return Type
Recall that calling the `SetMyAccountPrimaryContact` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `SetMyAccountPrimaryContact` Mutation is of type `SetMyAccountPrimaryContactData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface SetMyAccountPrimaryContactData {
  account_update?: Account_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `SetMyAccountPrimaryContact`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, SetMyAccountPrimaryContactVariables } from '@generated/data-connector-web';
import { useSetMyAccountPrimaryContact } from '@generated/data-connector-web/react'

export default function SetMyAccountPrimaryContactComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useSetMyAccountPrimaryContact();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useSetMyAccountPrimaryContact(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSetMyAccountPrimaryContact(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSetMyAccountPrimaryContact(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useSetMyAccountPrimaryContact` Mutation requires an argument of type `SetMyAccountPrimaryContactVariables`:
  const setMyAccountPrimaryContactVars: SetMyAccountPrimaryContactVariables = {
    accountId: ..., 
    contactId: ..., 
  };
  mutation.mutate(setMyAccountPrimaryContactVars);
  // Variables can be defined inline as well.
  mutation.mutate({ accountId: ..., contactId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(setMyAccountPrimaryContactVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.account_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ClearMyAccountPrimaryContact
You can execute the `ClearMyAccountPrimaryContact` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useClearMyAccountPrimaryContact(options?: useDataConnectMutationOptions<ClearMyAccountPrimaryContactData, FirebaseError, ClearMyAccountPrimaryContactVariables>): UseDataConnectMutationResult<ClearMyAccountPrimaryContactData, ClearMyAccountPrimaryContactVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useClearMyAccountPrimaryContact(dc: DataConnect, options?: useDataConnectMutationOptions<ClearMyAccountPrimaryContactData, FirebaseError, ClearMyAccountPrimaryContactVariables>): UseDataConnectMutationResult<ClearMyAccountPrimaryContactData, ClearMyAccountPrimaryContactVariables>;
```

### Variables
The `ClearMyAccountPrimaryContact` Mutation requires an argument of type `ClearMyAccountPrimaryContactVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ClearMyAccountPrimaryContactVariables {
  accountId: UUIDString;
}
```
### Return Type
Recall that calling the `ClearMyAccountPrimaryContact` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ClearMyAccountPrimaryContact` Mutation is of type `ClearMyAccountPrimaryContactData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ClearMyAccountPrimaryContactData {
  account_update?: Account_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ClearMyAccountPrimaryContact`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ClearMyAccountPrimaryContactVariables } from '@generated/data-connector-web';
import { useClearMyAccountPrimaryContact } from '@generated/data-connector-web/react'

export default function ClearMyAccountPrimaryContactComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useClearMyAccountPrimaryContact();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useClearMyAccountPrimaryContact(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useClearMyAccountPrimaryContact(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useClearMyAccountPrimaryContact(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useClearMyAccountPrimaryContact` Mutation requires an argument of type `ClearMyAccountPrimaryContactVariables`:
  const clearMyAccountPrimaryContactVars: ClearMyAccountPrimaryContactVariables = {
    accountId: ..., 
  };
  mutation.mutate(clearMyAccountPrimaryContactVars);
  // Variables can be defined inline as well.
  mutation.mutate({ accountId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(clearMyAccountPrimaryContactVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.account_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteMyAccount
You can execute the `DeleteMyAccount` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteMyAccount(options?: useDataConnectMutationOptions<DeleteMyAccountData, FirebaseError, DeleteMyAccountVariables>): UseDataConnectMutationResult<DeleteMyAccountData, DeleteMyAccountVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteMyAccount(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteMyAccountData, FirebaseError, DeleteMyAccountVariables>): UseDataConnectMutationResult<DeleteMyAccountData, DeleteMyAccountVariables>;
```

### Variables
The `DeleteMyAccount` Mutation requires an argument of type `DeleteMyAccountVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteMyAccountVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteMyAccount` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteMyAccount` Mutation is of type `DeleteMyAccountData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteMyAccountData {
  accountContact_deleteMany: number;
  account_delete?: Account_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteMyAccount`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteMyAccountVariables } from '@generated/data-connector-web';
import { useDeleteMyAccount } from '@generated/data-connector-web/react'

export default function DeleteMyAccountComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteMyAccount();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteMyAccount(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteMyAccount(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteMyAccount(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteMyAccount` Mutation requires an argument of type `DeleteMyAccountVariables`:
  const deleteMyAccountVars: DeleteMyAccountVariables = {
    id: ..., 
  };
  mutation.mutate(deleteMyAccountVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteMyAccountVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.accountContact_deleteMany);
    console.log(mutation.data.account_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateMyAccountContact
You can execute the `CreateMyAccountContact` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateMyAccountContact(options?: useDataConnectMutationOptions<CreateMyAccountContactData, FirebaseError, CreateMyAccountContactVariables>): UseDataConnectMutationResult<CreateMyAccountContactData, CreateMyAccountContactVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateMyAccountContact(dc: DataConnect, options?: useDataConnectMutationOptions<CreateMyAccountContactData, FirebaseError, CreateMyAccountContactVariables>): UseDataConnectMutationResult<CreateMyAccountContactData, CreateMyAccountContactVariables>;
```

### Variables
The `CreateMyAccountContact` Mutation requires an argument of type `CreateMyAccountContactVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateMyAccountContactVariables {
  id: UUIDString;
  accountId: UUIDString;
  name: string;
  email?: string | null;
  phoneNumber?: string | null;
  role?: string | null;
}
```
### Return Type
Recall that calling the `CreateMyAccountContact` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateMyAccountContact` Mutation is of type `CreateMyAccountContactData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateMyAccountContactData {
  accountContact_insert: AccountContact_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateMyAccountContact`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateMyAccountContactVariables } from '@generated/data-connector-web';
import { useCreateMyAccountContact } from '@generated/data-connector-web/react'

export default function CreateMyAccountContactComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateMyAccountContact();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateMyAccountContact(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateMyAccountContact(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateMyAccountContact(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateMyAccountContact` Mutation requires an argument of type `CreateMyAccountContactVariables`:
  const createMyAccountContactVars: CreateMyAccountContactVariables = {
    id: ..., 
    accountId: ..., 
    name: ..., 
    email: ..., // optional
    phoneNumber: ..., // optional
    role: ..., // optional
  };
  mutation.mutate(createMyAccountContactVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., accountId: ..., name: ..., email: ..., phoneNumber: ..., role: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createMyAccountContactVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.accountContact_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateMyAccountContact
You can execute the `UpdateMyAccountContact` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateMyAccountContact(options?: useDataConnectMutationOptions<UpdateMyAccountContactData, FirebaseError, UpdateMyAccountContactVariables>): UseDataConnectMutationResult<UpdateMyAccountContactData, UpdateMyAccountContactVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateMyAccountContact(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateMyAccountContactData, FirebaseError, UpdateMyAccountContactVariables>): UseDataConnectMutationResult<UpdateMyAccountContactData, UpdateMyAccountContactVariables>;
```

### Variables
The `UpdateMyAccountContact` Mutation requires an argument of type `UpdateMyAccountContactVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateMyAccountContactVariables {
  accountId: UUIDString;
  contactId: UUIDString;
  name: string;
  email?: string | null;
  phoneNumber?: string | null;
  role?: string | null;
}
```
### Return Type
Recall that calling the `UpdateMyAccountContact` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateMyAccountContact` Mutation is of type `UpdateMyAccountContactData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateMyAccountContactData {
  accountContact_update?: AccountContact_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateMyAccountContact`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateMyAccountContactVariables } from '@generated/data-connector-web';
import { useUpdateMyAccountContact } from '@generated/data-connector-web/react'

export default function UpdateMyAccountContactComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateMyAccountContact();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateMyAccountContact(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateMyAccountContact(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateMyAccountContact(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateMyAccountContact` Mutation requires an argument of type `UpdateMyAccountContactVariables`:
  const updateMyAccountContactVars: UpdateMyAccountContactVariables = {
    accountId: ..., 
    contactId: ..., 
    name: ..., 
    email: ..., // optional
    phoneNumber: ..., // optional
    role: ..., // optional
  };
  mutation.mutate(updateMyAccountContactVars);
  // Variables can be defined inline as well.
  mutation.mutate({ accountId: ..., contactId: ..., name: ..., email: ..., phoneNumber: ..., role: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateMyAccountContactVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.accountContact_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteMyAccountContact
You can execute the `DeleteMyAccountContact` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteMyAccountContact(options?: useDataConnectMutationOptions<DeleteMyAccountContactData, FirebaseError, DeleteMyAccountContactVariables>): UseDataConnectMutationResult<DeleteMyAccountContactData, DeleteMyAccountContactVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteMyAccountContact(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteMyAccountContactData, FirebaseError, DeleteMyAccountContactVariables>): UseDataConnectMutationResult<DeleteMyAccountContactData, DeleteMyAccountContactVariables>;
```

### Variables
The `DeleteMyAccountContact` Mutation requires an argument of type `DeleteMyAccountContactVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteMyAccountContactVariables {
  accountId: UUIDString;
  contactId: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteMyAccountContact` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteMyAccountContact` Mutation is of type `DeleteMyAccountContactData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteMyAccountContactData {
  account_update?: Account_Key | null;
  accountContact_delete?: AccountContact_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteMyAccountContact`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteMyAccountContactVariables } from '@generated/data-connector-web';
import { useDeleteMyAccountContact } from '@generated/data-connector-web/react'

export default function DeleteMyAccountContactComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteMyAccountContact();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteMyAccountContact(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteMyAccountContact(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteMyAccountContact(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteMyAccountContact` Mutation requires an argument of type `DeleteMyAccountContactVariables`:
  const deleteMyAccountContactVars: DeleteMyAccountContactVariables = {
    accountId: ..., 
    contactId: ..., 
  };
  mutation.mutate(deleteMyAccountContactVars);
  // Variables can be defined inline as well.
  mutation.mutate({ accountId: ..., contactId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteMyAccountContactVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.account_update);
    console.log(mutation.data.accountContact_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateQuestionnaireTemplate
You can execute the `CreateQuestionnaireTemplate` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateQuestionnaireTemplate(options?: useDataConnectMutationOptions<CreateQuestionnaireTemplateData, FirebaseError, CreateQuestionnaireTemplateVariables>): UseDataConnectMutationResult<CreateQuestionnaireTemplateData, CreateQuestionnaireTemplateVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateQuestionnaireTemplate(dc: DataConnect, options?: useDataConnectMutationOptions<CreateQuestionnaireTemplateData, FirebaseError, CreateQuestionnaireTemplateVariables>): UseDataConnectMutationResult<CreateQuestionnaireTemplateData, CreateQuestionnaireTemplateVariables>;
```

### Variables
The `CreateQuestionnaireTemplate` Mutation requires an argument of type `CreateQuestionnaireTemplateVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateQuestionnaireTemplateVariables {
  id: UUIDString;
  name: string;
}
```
### Return Type
Recall that calling the `CreateQuestionnaireTemplate` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateQuestionnaireTemplate` Mutation is of type `CreateQuestionnaireTemplateData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateQuestionnaireTemplateData {
  questionnaireTemplate_insert: QuestionnaireTemplate_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateQuestionnaireTemplate`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateQuestionnaireTemplateVariables } from '@generated/data-connector-web';
import { useCreateQuestionnaireTemplate } from '@generated/data-connector-web/react'

export default function CreateQuestionnaireTemplateComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateQuestionnaireTemplate();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateQuestionnaireTemplate(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuestionnaireTemplate(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuestionnaireTemplate(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateQuestionnaireTemplate` Mutation requires an argument of type `CreateQuestionnaireTemplateVariables`:
  const createQuestionnaireTemplateVars: CreateQuestionnaireTemplateVariables = {
    id: ..., 
    name: ..., 
  };
  mutation.mutate(createQuestionnaireTemplateVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createQuestionnaireTemplateVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.questionnaireTemplate_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateQuestionnaireTemplateQuestion
You can execute the `CreateQuestionnaireTemplateQuestion` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateQuestionnaireTemplateQuestion(options?: useDataConnectMutationOptions<CreateQuestionnaireTemplateQuestionData, FirebaseError, CreateQuestionnaireTemplateQuestionVariables>): UseDataConnectMutationResult<CreateQuestionnaireTemplateQuestionData, CreateQuestionnaireTemplateQuestionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateQuestionnaireTemplateQuestion(dc: DataConnect, options?: useDataConnectMutationOptions<CreateQuestionnaireTemplateQuestionData, FirebaseError, CreateQuestionnaireTemplateQuestionVariables>): UseDataConnectMutationResult<CreateQuestionnaireTemplateQuestionData, CreateQuestionnaireTemplateQuestionVariables>;
```

### Variables
The `CreateQuestionnaireTemplateQuestion` Mutation requires an argument of type `CreateQuestionnaireTemplateQuestionVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateQuestionnaireTemplateQuestionVariables {
  id: UUIDString;
  templateId: UUIDString;
  label: string;
  position: number;
  description?: string | null;
}
```
### Return Type
Recall that calling the `CreateQuestionnaireTemplateQuestion` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateQuestionnaireTemplateQuestion` Mutation is of type `CreateQuestionnaireTemplateQuestionData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateQuestionnaireTemplateQuestionData {
  questionnaireTemplateQuestion_insert: QuestionnaireTemplateQuestion_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateQuestionnaireTemplateQuestion`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateQuestionnaireTemplateQuestionVariables } from '@generated/data-connector-web';
import { useCreateQuestionnaireTemplateQuestion } from '@generated/data-connector-web/react'

export default function CreateQuestionnaireTemplateQuestionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateQuestionnaireTemplateQuestion();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateQuestionnaireTemplateQuestion(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuestionnaireTemplateQuestion(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuestionnaireTemplateQuestion(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateQuestionnaireTemplateQuestion` Mutation requires an argument of type `CreateQuestionnaireTemplateQuestionVariables`:
  const createQuestionnaireTemplateQuestionVars: CreateQuestionnaireTemplateQuestionVariables = {
    id: ..., 
    templateId: ..., 
    label: ..., 
    position: ..., 
    description: ..., // optional
  };
  mutation.mutate(createQuestionnaireTemplateQuestionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., templateId: ..., label: ..., position: ..., description: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createQuestionnaireTemplateQuestionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.questionnaireTemplateQuestion_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateQuestionnaireTemplateName
You can execute the `UpdateQuestionnaireTemplateName` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateQuestionnaireTemplateName(options?: useDataConnectMutationOptions<UpdateQuestionnaireTemplateNameData, FirebaseError, UpdateQuestionnaireTemplateNameVariables>): UseDataConnectMutationResult<UpdateQuestionnaireTemplateNameData, UpdateQuestionnaireTemplateNameVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateQuestionnaireTemplateName(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateQuestionnaireTemplateNameData, FirebaseError, UpdateQuestionnaireTemplateNameVariables>): UseDataConnectMutationResult<UpdateQuestionnaireTemplateNameData, UpdateQuestionnaireTemplateNameVariables>;
```

### Variables
The `UpdateQuestionnaireTemplateName` Mutation requires an argument of type `UpdateQuestionnaireTemplateNameVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateQuestionnaireTemplateNameVariables {
  id: UUIDString;
  name: string;
}
```
### Return Type
Recall that calling the `UpdateQuestionnaireTemplateName` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateQuestionnaireTemplateName` Mutation is of type `UpdateQuestionnaireTemplateNameData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateQuestionnaireTemplateNameData {
  questionnaireTemplate_update?: QuestionnaireTemplate_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateQuestionnaireTemplateName`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateQuestionnaireTemplateNameVariables } from '@generated/data-connector-web';
import { useUpdateQuestionnaireTemplateName } from '@generated/data-connector-web/react'

export default function UpdateQuestionnaireTemplateNameComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateQuestionnaireTemplateName();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateQuestionnaireTemplateName(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateQuestionnaireTemplateName(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateQuestionnaireTemplateName(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateQuestionnaireTemplateName` Mutation requires an argument of type `UpdateQuestionnaireTemplateNameVariables`:
  const updateQuestionnaireTemplateNameVars: UpdateQuestionnaireTemplateNameVariables = {
    id: ..., 
    name: ..., 
  };
  mutation.mutate(updateQuestionnaireTemplateNameVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateQuestionnaireTemplateNameVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.questionnaireTemplate_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateQuestionnaireTemplateQuestion
You can execute the `UpdateQuestionnaireTemplateQuestion` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateQuestionnaireTemplateQuestion(options?: useDataConnectMutationOptions<UpdateQuestionnaireTemplateQuestionData, FirebaseError, UpdateQuestionnaireTemplateQuestionVariables>): UseDataConnectMutationResult<UpdateQuestionnaireTemplateQuestionData, UpdateQuestionnaireTemplateQuestionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateQuestionnaireTemplateQuestion(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateQuestionnaireTemplateQuestionData, FirebaseError, UpdateQuestionnaireTemplateQuestionVariables>): UseDataConnectMutationResult<UpdateQuestionnaireTemplateQuestionData, UpdateQuestionnaireTemplateQuestionVariables>;
```

### Variables
The `UpdateQuestionnaireTemplateQuestion` Mutation requires an argument of type `UpdateQuestionnaireTemplateQuestionVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateQuestionnaireTemplateQuestionVariables {
  id: UUIDString;
  templateId: UUIDString;
  label: string;
  position: number;
  description?: string | null;
}
```
### Return Type
Recall that calling the `UpdateQuestionnaireTemplateQuestion` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateQuestionnaireTemplateQuestion` Mutation is of type `UpdateQuestionnaireTemplateQuestionData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateQuestionnaireTemplateQuestionData {
  questionnaireTemplateQuestion_update?: QuestionnaireTemplateQuestion_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateQuestionnaireTemplateQuestion`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateQuestionnaireTemplateQuestionVariables } from '@generated/data-connector-web';
import { useUpdateQuestionnaireTemplateQuestion } from '@generated/data-connector-web/react'

export default function UpdateQuestionnaireTemplateQuestionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateQuestionnaireTemplateQuestion();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateQuestionnaireTemplateQuestion(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateQuestionnaireTemplateQuestion(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateQuestionnaireTemplateQuestion(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateQuestionnaireTemplateQuestion` Mutation requires an argument of type `UpdateQuestionnaireTemplateQuestionVariables`:
  const updateQuestionnaireTemplateQuestionVars: UpdateQuestionnaireTemplateQuestionVariables = {
    id: ..., 
    templateId: ..., 
    label: ..., 
    position: ..., 
    description: ..., // optional
  };
  mutation.mutate(updateQuestionnaireTemplateQuestionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., templateId: ..., label: ..., position: ..., description: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateQuestionnaireTemplateQuestionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.questionnaireTemplateQuestion_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteQuestionnaireTemplateQuestion
You can execute the `DeleteQuestionnaireTemplateQuestion` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteQuestionnaireTemplateQuestion(options?: useDataConnectMutationOptions<DeleteQuestionnaireTemplateQuestionData, FirebaseError, DeleteQuestionnaireTemplateQuestionVariables>): UseDataConnectMutationResult<DeleteQuestionnaireTemplateQuestionData, DeleteQuestionnaireTemplateQuestionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteQuestionnaireTemplateQuestion(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteQuestionnaireTemplateQuestionData, FirebaseError, DeleteQuestionnaireTemplateQuestionVariables>): UseDataConnectMutationResult<DeleteQuestionnaireTemplateQuestionData, DeleteQuestionnaireTemplateQuestionVariables>;
```

### Variables
The `DeleteQuestionnaireTemplateQuestion` Mutation requires an argument of type `DeleteQuestionnaireTemplateQuestionVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteQuestionnaireTemplateQuestionVariables {
  id: UUIDString;
  templateId: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteQuestionnaireTemplateQuestion` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteQuestionnaireTemplateQuestion` Mutation is of type `DeleteQuestionnaireTemplateQuestionData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteQuestionnaireTemplateQuestionData {
  questionnaireTemplateQuestion_delete?: QuestionnaireTemplateQuestion_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteQuestionnaireTemplateQuestion`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteQuestionnaireTemplateQuestionVariables } from '@generated/data-connector-web';
import { useDeleteQuestionnaireTemplateQuestion } from '@generated/data-connector-web/react'

export default function DeleteQuestionnaireTemplateQuestionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteQuestionnaireTemplateQuestion();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteQuestionnaireTemplateQuestion(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteQuestionnaireTemplateQuestion(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteQuestionnaireTemplateQuestion(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteQuestionnaireTemplateQuestion` Mutation requires an argument of type `DeleteQuestionnaireTemplateQuestionVariables`:
  const deleteQuestionnaireTemplateQuestionVars: DeleteQuestionnaireTemplateQuestionVariables = {
    id: ..., 
    templateId: ..., 
  };
  mutation.mutate(deleteQuestionnaireTemplateQuestionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., templateId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteQuestionnaireTemplateQuestionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.questionnaireTemplateQuestion_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteQuestionnaireTemplate
You can execute the `DeleteQuestionnaireTemplate` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteQuestionnaireTemplate(options?: useDataConnectMutationOptions<DeleteQuestionnaireTemplateData, FirebaseError, DeleteQuestionnaireTemplateVariables>): UseDataConnectMutationResult<DeleteQuestionnaireTemplateData, DeleteQuestionnaireTemplateVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteQuestionnaireTemplate(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteQuestionnaireTemplateData, FirebaseError, DeleteQuestionnaireTemplateVariables>): UseDataConnectMutationResult<DeleteQuestionnaireTemplateData, DeleteQuestionnaireTemplateVariables>;
```

### Variables
The `DeleteQuestionnaireTemplate` Mutation requires an argument of type `DeleteQuestionnaireTemplateVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteQuestionnaireTemplateVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteQuestionnaireTemplate` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteQuestionnaireTemplate` Mutation is of type `DeleteQuestionnaireTemplateData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteQuestionnaireTemplateData {
  questionnaireTemplateQuestion_deleteMany: number;
  questionnaireTemplate_delete?: QuestionnaireTemplate_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteQuestionnaireTemplate`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteQuestionnaireTemplateVariables } from '@generated/data-connector-web';
import { useDeleteQuestionnaireTemplate } from '@generated/data-connector-web/react'

export default function DeleteQuestionnaireTemplateComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteQuestionnaireTemplate();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteQuestionnaireTemplate(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteQuestionnaireTemplate(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteQuestionnaireTemplate(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteQuestionnaireTemplate` Mutation requires an argument of type `DeleteQuestionnaireTemplateVariables`:
  const deleteQuestionnaireTemplateVars: DeleteQuestionnaireTemplateVariables = {
    id: ..., 
  };
  mutation.mutate(deleteQuestionnaireTemplateVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteQuestionnaireTemplateVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.questionnaireTemplateQuestion_deleteMany);
    console.log(mutation.data.questionnaireTemplate_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpsertMyUserSettings
You can execute the `UpsertMyUserSettings` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpsertMyUserSettings(options?: useDataConnectMutationOptions<UpsertMyUserSettingsData, FirebaseError, UpsertMyUserSettingsVariables>): UseDataConnectMutationResult<UpsertMyUserSettingsData, UpsertMyUserSettingsVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpsertMyUserSettings(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertMyUserSettingsData, FirebaseError, UpsertMyUserSettingsVariables>): UseDataConnectMutationResult<UpsertMyUserSettingsData, UpsertMyUserSettingsVariables>;
```

### Variables
The `UpsertMyUserSettings` Mutation requires an argument of type `UpsertMyUserSettingsVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpsertMyUserSettingsVariables {
  quoteFollowUpEnabled: boolean;
  quoteFollowUpDays: number;
}
```
### Return Type
Recall that calling the `UpsertMyUserSettings` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpsertMyUserSettings` Mutation is of type `UpsertMyUserSettingsData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertMyUserSettingsData {
  userSettings_upsert: UserSettings_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpsertMyUserSettings`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpsertMyUserSettingsVariables } from '@generated/data-connector-web';
import { useUpsertMyUserSettings } from '@generated/data-connector-web/react'

export default function UpsertMyUserSettingsComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpsertMyUserSettings();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpsertMyUserSettings(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertMyUserSettings(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertMyUserSettings(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpsertMyUserSettings` Mutation requires an argument of type `UpsertMyUserSettingsVariables`:
  const upsertMyUserSettingsVars: UpsertMyUserSettingsVariables = {
    quoteFollowUpEnabled: ..., 
    quoteFollowUpDays: ..., 
  };
  mutation.mutate(upsertMyUserSettingsVars);
  // Variables can be defined inline as well.
  mutation.mutate({ quoteFollowUpEnabled: ..., quoteFollowUpDays: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(upsertMyUserSettingsVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.userSettings_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

