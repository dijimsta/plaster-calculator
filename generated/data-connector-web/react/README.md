# Generated React README
This README will guide you through the process of using the generated React SDK package for the connector `data-connector`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

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
  - [*ListAccountsByOwner*](#listaccountsbyowner)
  - [*GetAccountById*](#getaccountbyid)
  - [*ListAccountContactsByAccountId*](#listaccountcontactsbyaccountid)
  - [*GetAccountContactById*](#getaccountcontactbyid)
  - [*ListProjectsByOwnerAndSalesStatus*](#listprojectsbyownerandsalesstatus)
  - [*ListProjectsByAccount*](#listprojectsbyaccount)
  - [*GetProjectDetailsById*](#getprojectdetailsbyid)
  - [*GetProjectById*](#getprojectbyid)
  - [*GetFloorplanPageById*](#getfloorplanpagebyid)
  - [*ListQuestionnaireTemplates*](#listquestionnairetemplates)
  - [*GetQuestionnaireTemplate*](#getquestionnairetemplate)
  - [*ListDueReminders*](#listduereminders)
  - [*ListProjectReminders*](#listprojectreminders)
  - [*GetReminderById*](#getreminderbyid)
  - [*GetUserSettings*](#getusersettings)
- [**Mutations**](#mutations)
  - [*CreateAccount*](#createaccount)
  - [*UpdateAccount*](#updateaccount)
  - [*DeleteAccountContacts*](#deleteaccountcontacts)
  - [*DeleteAccount*](#deleteaccount)
  - [*CreateAccountContact*](#createaccountcontact)
  - [*UpdateAccountContact*](#updateaccountcontact)
  - [*DeleteAccountContact*](#deleteaccountcontact)
  - [*CreateProjectFromUpload*](#createprojectfromupload)
  - [*UpdateProject*](#updateproject)
  - [*RenameProject*](#renameproject)
  - [*TouchProject*](#touchproject)
  - [*DeleteFloorplanPages*](#deletefloorplanpages)
  - [*DeleteProject*](#deleteproject)
  - [*CreateFloorplanPage*](#createfloorplanpage)
  - [*UpdateFloorplanPageAnalysis*](#updatefloorplanpageanalysis)
  - [*UpdateFloorplanPage*](#updatefloorplanpage)
  - [*UpdateFloorplanPages*](#updatefloorplanpages)
  - [*CreateQuestionnaireTemplate*](#createquestionnairetemplate)
  - [*CreateQuestionnaireTemplateQuestion*](#createquestionnairetemplatequestion)
  - [*UpdateQuestionnaireTemplateName*](#updatequestionnairetemplatename)
  - [*UpdateQuestionnaireTemplateQuestion*](#updatequestionnairetemplatequestion)
  - [*DeleteQuestionnaireTemplateQuestion*](#deletequestionnairetemplatequestion)
  - [*DeleteQuestionnaireTemplate*](#deletequestionnairetemplate)
  - [*CreateProjectQuestionnaire*](#createprojectquestionnaire)
  - [*CreateProjectQuestionnaireAnswer*](#createprojectquestionnaireanswer)
  - [*CreateQuantitySource*](#createquantitysource)
  - [*CreateQuoteItemTemplate*](#createquoteitemtemplate)
  - [*UpdateQuoteItemTemplate*](#updatequoteitemtemplate)
  - [*DeleteQuoteItemTemplate*](#deletequoteitemtemplate)
  - [*UpsertQuoteItemTemplateConfig*](#upsertquoteitemtemplateconfig)
  - [*CreateSupplier*](#createsupplier)
  - [*UpdateSupplier*](#updatesupplier)
  - [*DeleteSupplier*](#deletesupplier)
  - [*UpsertSupplierQuoteItemPrice*](#upsertsupplierquoteitemprice)
  - [*DeleteSupplierQuoteItemPrice*](#deletesupplierquoteitemprice)
  - [*CreateQuote*](#createquote)
  - [*UpdateQuote*](#updatequote)
  - [*DeleteQuoteItems*](#deletequoteitems)
  - [*CreateQuoteItem*](#createquoteitem)
  - [*UpdateQuoteItem*](#updatequoteitem)
  - [*CreateReminder*](#createreminder)
  - [*UpdateReminder*](#updatereminder)
  - [*UpsertUserSettings*](#upsertusersettings)

# TanStack Query Firebase & TanStack React Query
This SDK provides [React](https://react.dev/) hooks generated specific to your application, for the operations found in the connector `data-connector`. These hooks are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack React Query v5](https://tanstack.com/query/v5/docs/framework/react/overview).

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
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `data-connector`.

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

Below are examples of how to use the `data-connector` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## ListAccountsByOwner
You can execute the `ListAccountsByOwner` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useListAccountsByOwner(dc: DataConnect, vars: ListAccountsByOwnerVariables, options?: useDataConnectQueryOptions<ListAccountsByOwnerData>): UseDataConnectQueryResult<ListAccountsByOwnerData, ListAccountsByOwnerVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListAccountsByOwner(vars: ListAccountsByOwnerVariables, options?: useDataConnectQueryOptions<ListAccountsByOwnerData>): UseDataConnectQueryResult<ListAccountsByOwnerData, ListAccountsByOwnerVariables>;
```

### Variables
The `ListAccountsByOwner` Query requires an argument of type `ListAccountsByOwnerVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListAccountsByOwnerVariables {
  ownerId: string;
}
```
### Return Type
Recall that calling the `ListAccountsByOwner` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListAccountsByOwner` Query is of type `ListAccountsByOwnerData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListAccountsByOwnerData {
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

### Using `ListAccountsByOwner`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListAccountsByOwnerVariables } from '@generated/data-connector-web';
import { useListAccountsByOwner } from '@generated/data-connector-web/react'

export default function ListAccountsByOwnerComponent() {
  // The `useListAccountsByOwner` Query hook requires an argument of type `ListAccountsByOwnerVariables`:
  const listAccountsByOwnerVars: ListAccountsByOwnerVariables = {
    ownerId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListAccountsByOwner(listAccountsByOwnerVars);
  // Variables can be defined inline as well.
  const query = useListAccountsByOwner({ ownerId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListAccountsByOwner(dataConnect, listAccountsByOwnerVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListAccountsByOwner(listAccountsByOwnerVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListAccountsByOwner(dataConnect, listAccountsByOwnerVars, options);

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

## GetAccountById
You can execute the `GetAccountById` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useGetAccountById(dc: DataConnect, vars: GetAccountByIdVariables, options?: useDataConnectQueryOptions<GetAccountByIdData>): UseDataConnectQueryResult<GetAccountByIdData, GetAccountByIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetAccountById(vars: GetAccountByIdVariables, options?: useDataConnectQueryOptions<GetAccountByIdData>): UseDataConnectQueryResult<GetAccountByIdData, GetAccountByIdVariables>;
```

### Variables
The `GetAccountById` Query requires an argument of type `GetAccountByIdVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetAccountByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetAccountById` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetAccountById` Query is of type `GetAccountByIdData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetAccountByIdData {
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

### Using `GetAccountById`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetAccountByIdVariables } from '@generated/data-connector-web';
import { useGetAccountById } from '@generated/data-connector-web/react'

export default function GetAccountByIdComponent() {
  // The `useGetAccountById` Query hook requires an argument of type `GetAccountByIdVariables`:
  const getAccountByIdVars: GetAccountByIdVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetAccountById(getAccountByIdVars);
  // Variables can be defined inline as well.
  const query = useGetAccountById({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetAccountById(dataConnect, getAccountByIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetAccountById(getAccountByIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetAccountById(dataConnect, getAccountByIdVars, options);

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

## ListAccountContactsByAccountId
You can execute the `ListAccountContactsByAccountId` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useListAccountContactsByAccountId(dc: DataConnect, vars: ListAccountContactsByAccountIdVariables, options?: useDataConnectQueryOptions<ListAccountContactsByAccountIdData>): UseDataConnectQueryResult<ListAccountContactsByAccountIdData, ListAccountContactsByAccountIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListAccountContactsByAccountId(vars: ListAccountContactsByAccountIdVariables, options?: useDataConnectQueryOptions<ListAccountContactsByAccountIdData>): UseDataConnectQueryResult<ListAccountContactsByAccountIdData, ListAccountContactsByAccountIdVariables>;
```

### Variables
The `ListAccountContactsByAccountId` Query requires an argument of type `ListAccountContactsByAccountIdVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListAccountContactsByAccountIdVariables {
  accountId: UUIDString;
}
```
### Return Type
Recall that calling the `ListAccountContactsByAccountId` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListAccountContactsByAccountId` Query is of type `ListAccountContactsByAccountIdData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListAccountContactsByAccountIdData {
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

### Using `ListAccountContactsByAccountId`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListAccountContactsByAccountIdVariables } from '@generated/data-connector-web';
import { useListAccountContactsByAccountId } from '@generated/data-connector-web/react'

export default function ListAccountContactsByAccountIdComponent() {
  // The `useListAccountContactsByAccountId` Query hook requires an argument of type `ListAccountContactsByAccountIdVariables`:
  const listAccountContactsByAccountIdVars: ListAccountContactsByAccountIdVariables = {
    accountId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListAccountContactsByAccountId(listAccountContactsByAccountIdVars);
  // Variables can be defined inline as well.
  const query = useListAccountContactsByAccountId({ accountId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListAccountContactsByAccountId(dataConnect, listAccountContactsByAccountIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListAccountContactsByAccountId(listAccountContactsByAccountIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListAccountContactsByAccountId(dataConnect, listAccountContactsByAccountIdVars, options);

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

## GetAccountContactById
You can execute the `GetAccountContactById` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useGetAccountContactById(dc: DataConnect, vars: GetAccountContactByIdVariables, options?: useDataConnectQueryOptions<GetAccountContactByIdData>): UseDataConnectQueryResult<GetAccountContactByIdData, GetAccountContactByIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetAccountContactById(vars: GetAccountContactByIdVariables, options?: useDataConnectQueryOptions<GetAccountContactByIdData>): UseDataConnectQueryResult<GetAccountContactByIdData, GetAccountContactByIdVariables>;
```

### Variables
The `GetAccountContactById` Query requires an argument of type `GetAccountContactByIdVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetAccountContactByIdVariables {
  accountId: UUIDString;
  contactId: UUIDString;
}
```
### Return Type
Recall that calling the `GetAccountContactById` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetAccountContactById` Query is of type `GetAccountContactByIdData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetAccountContactByIdData {
  accountContact?: {
    id: UUIDString;
    accountId: UUIDString;
    name: string;
    email?: string | null;
    phoneNumber?: string | null;
    role?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & AccountContact_Key;
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetAccountContactById`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetAccountContactByIdVariables } from '@generated/data-connector-web';
import { useGetAccountContactById } from '@generated/data-connector-web/react'

export default function GetAccountContactByIdComponent() {
  // The `useGetAccountContactById` Query hook requires an argument of type `GetAccountContactByIdVariables`:
  const getAccountContactByIdVars: GetAccountContactByIdVariables = {
    accountId: ..., 
    contactId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetAccountContactById(getAccountContactByIdVars);
  // Variables can be defined inline as well.
  const query = useGetAccountContactById({ accountId: ..., contactId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetAccountContactById(dataConnect, getAccountContactByIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetAccountContactById(getAccountContactByIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetAccountContactById(dataConnect, getAccountContactByIdVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.accountContact);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListProjectsByOwnerAndSalesStatus
You can execute the `ListProjectsByOwnerAndSalesStatus` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useListProjectsByOwnerAndSalesStatus(dc: DataConnect, vars: ListProjectsByOwnerAndSalesStatusVariables, options?: useDataConnectQueryOptions<ListProjectsByOwnerAndSalesStatusData>): UseDataConnectQueryResult<ListProjectsByOwnerAndSalesStatusData, ListProjectsByOwnerAndSalesStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListProjectsByOwnerAndSalesStatus(vars: ListProjectsByOwnerAndSalesStatusVariables, options?: useDataConnectQueryOptions<ListProjectsByOwnerAndSalesStatusData>): UseDataConnectQueryResult<ListProjectsByOwnerAndSalesStatusData, ListProjectsByOwnerAndSalesStatusVariables>;
```

### Variables
The `ListProjectsByOwnerAndSalesStatus` Query requires an argument of type `ListProjectsByOwnerAndSalesStatusVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListProjectsByOwnerAndSalesStatusVariables {
  ownerId: string;
  salesStatus: string;
}
```
### Return Type
Recall that calling the `ListProjectsByOwnerAndSalesStatus` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListProjectsByOwnerAndSalesStatus` Query is of type `ListProjectsByOwnerAndSalesStatusData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListProjectsByOwnerAndSalesStatusData {
  projects: ({
    id: UUIDString;
    ownerId: string;
    accountId?: UUIDString | null;
    name: string;
    address?: string | null;
    originalFileName: string;
    uploadType: string;
    originalPath: string;
    status: string;
    salesStatus: string;
    processingError?: string | null;
    pageCount: number;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Project_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListProjectsByOwnerAndSalesStatus`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListProjectsByOwnerAndSalesStatusVariables } from '@generated/data-connector-web';
import { useListProjectsByOwnerAndSalesStatus } from '@generated/data-connector-web/react'

export default function ListProjectsByOwnerAndSalesStatusComponent() {
  // The `useListProjectsByOwnerAndSalesStatus` Query hook requires an argument of type `ListProjectsByOwnerAndSalesStatusVariables`:
  const listProjectsByOwnerAndSalesStatusVars: ListProjectsByOwnerAndSalesStatusVariables = {
    ownerId: ..., 
    salesStatus: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListProjectsByOwnerAndSalesStatus(listProjectsByOwnerAndSalesStatusVars);
  // Variables can be defined inline as well.
  const query = useListProjectsByOwnerAndSalesStatus({ ownerId: ..., salesStatus: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListProjectsByOwnerAndSalesStatus(dataConnect, listProjectsByOwnerAndSalesStatusVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListProjectsByOwnerAndSalesStatus(listProjectsByOwnerAndSalesStatusVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListProjectsByOwnerAndSalesStatus(dataConnect, listProjectsByOwnerAndSalesStatusVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.projects);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListProjectsByAccount
You can execute the `ListProjectsByAccount` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useListProjectsByAccount(dc: DataConnect, vars: ListProjectsByAccountVariables, options?: useDataConnectQueryOptions<ListProjectsByAccountData>): UseDataConnectQueryResult<ListProjectsByAccountData, ListProjectsByAccountVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListProjectsByAccount(vars: ListProjectsByAccountVariables, options?: useDataConnectQueryOptions<ListProjectsByAccountData>): UseDataConnectQueryResult<ListProjectsByAccountData, ListProjectsByAccountVariables>;
```

### Variables
The `ListProjectsByAccount` Query requires an argument of type `ListProjectsByAccountVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListProjectsByAccountVariables {
  accountId: UUIDString;
}
```
### Return Type
Recall that calling the `ListProjectsByAccount` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListProjectsByAccount` Query is of type `ListProjectsByAccountData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListProjectsByAccountData {
  projects: ({
    id: UUIDString;
    ownerId: string;
    accountId?: UUIDString | null;
    name: string;
    address?: string | null;
    originalFileName: string;
    uploadType: string;
    originalPath: string;
    status: string;
    salesStatus: string;
    processingError?: string | null;
    pageCount: number;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Project_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListProjectsByAccount`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListProjectsByAccountVariables } from '@generated/data-connector-web';
import { useListProjectsByAccount } from '@generated/data-connector-web/react'

export default function ListProjectsByAccountComponent() {
  // The `useListProjectsByAccount` Query hook requires an argument of type `ListProjectsByAccountVariables`:
  const listProjectsByAccountVars: ListProjectsByAccountVariables = {
    accountId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListProjectsByAccount(listProjectsByAccountVars);
  // Variables can be defined inline as well.
  const query = useListProjectsByAccount({ accountId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListProjectsByAccount(dataConnect, listProjectsByAccountVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListProjectsByAccount(listProjectsByAccountVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListProjectsByAccount(dataConnect, listProjectsByAccountVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.projects);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetProjectDetailsById
You can execute the `GetProjectDetailsById` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useGetProjectDetailsById(dc: DataConnect, vars: GetProjectDetailsByIdVariables, options?: useDataConnectQueryOptions<GetProjectDetailsByIdData>): UseDataConnectQueryResult<GetProjectDetailsByIdData, GetProjectDetailsByIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetProjectDetailsById(vars: GetProjectDetailsByIdVariables, options?: useDataConnectQueryOptions<GetProjectDetailsByIdData>): UseDataConnectQueryResult<GetProjectDetailsByIdData, GetProjectDetailsByIdVariables>;
```

### Variables
The `GetProjectDetailsById` Query requires an argument of type `GetProjectDetailsByIdVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetProjectDetailsByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetProjectDetailsById` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetProjectDetailsById` Query is of type `GetProjectDetailsByIdData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetProjectDetailsByIdData {
  project?: {
    id: UUIDString;
    ownerId: string;
    accountId?: UUIDString | null;
    name: string;
    address?: string | null;
    originalFileName: string;
    uploadType: string;
    originalPath: string;
    status: string;
    salesStatus: string;
    processingError?: string | null;
    pageCount: number;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    pages: ({
      id: UUIDString;
      projectId: UUIDString;
      pageNumber: number;
      status: string;
      processingError?: string | null;
      sourceImagePath?: string | null;
      previewImagePath?: string | null;
      rawJsonPath?: string | null;
      rawFloorplanPath?: string | null;
      overlayJson?: string | null;
      scaleMmPerPx?: number | null;
      ceilingHeightMm?: number | null;
      referencePointsJson?: string | null;
      referenceLengthMm?: number | null;
      processingStrategy?: string | null;
      processingMetadataJson?: string | null;
      createdAt: TimestampString;
      updatedAt: TimestampString;
    } & FloorplanPage_Key)[];
  } & Project_Key;
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetProjectDetailsById`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetProjectDetailsByIdVariables } from '@generated/data-connector-web';
import { useGetProjectDetailsById } from '@generated/data-connector-web/react'

export default function GetProjectDetailsByIdComponent() {
  // The `useGetProjectDetailsById` Query hook requires an argument of type `GetProjectDetailsByIdVariables`:
  const getProjectDetailsByIdVars: GetProjectDetailsByIdVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetProjectDetailsById(getProjectDetailsByIdVars);
  // Variables can be defined inline as well.
  const query = useGetProjectDetailsById({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetProjectDetailsById(dataConnect, getProjectDetailsByIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetProjectDetailsById(getProjectDetailsByIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetProjectDetailsById(dataConnect, getProjectDetailsByIdVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.project);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetProjectById
You can execute the `GetProjectById` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useGetProjectById(dc: DataConnect, vars: GetProjectByIdVariables, options?: useDataConnectQueryOptions<GetProjectByIdData>): UseDataConnectQueryResult<GetProjectByIdData, GetProjectByIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetProjectById(vars: GetProjectByIdVariables, options?: useDataConnectQueryOptions<GetProjectByIdData>): UseDataConnectQueryResult<GetProjectByIdData, GetProjectByIdVariables>;
```

### Variables
The `GetProjectById` Query requires an argument of type `GetProjectByIdVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetProjectByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetProjectById` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetProjectById` Query is of type `GetProjectByIdData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetProjectByIdData {
  project?: {
    id: UUIDString;
    ownerId: string;
    accountId?: UUIDString | null;
    name: string;
    address?: string | null;
    originalFileName: string;
    uploadType: string;
    originalPath: string;
    status: string;
    salesStatus: string;
    processingError?: string | null;
    pageCount: number;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Project_Key;
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetProjectById`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetProjectByIdVariables } from '@generated/data-connector-web';
import { useGetProjectById } from '@generated/data-connector-web/react'

export default function GetProjectByIdComponent() {
  // The `useGetProjectById` Query hook requires an argument of type `GetProjectByIdVariables`:
  const getProjectByIdVars: GetProjectByIdVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetProjectById(getProjectByIdVars);
  // Variables can be defined inline as well.
  const query = useGetProjectById({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetProjectById(dataConnect, getProjectByIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetProjectById(getProjectByIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetProjectById(dataConnect, getProjectByIdVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.project);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetFloorplanPageById
You can execute the `GetFloorplanPageById` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useGetFloorplanPageById(dc: DataConnect, vars: GetFloorplanPageByIdVariables, options?: useDataConnectQueryOptions<GetFloorplanPageByIdData>): UseDataConnectQueryResult<GetFloorplanPageByIdData, GetFloorplanPageByIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetFloorplanPageById(vars: GetFloorplanPageByIdVariables, options?: useDataConnectQueryOptions<GetFloorplanPageByIdData>): UseDataConnectQueryResult<GetFloorplanPageByIdData, GetFloorplanPageByIdVariables>;
```

### Variables
The `GetFloorplanPageById` Query requires an argument of type `GetFloorplanPageByIdVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetFloorplanPageByIdVariables {
  projectId: UUIDString;
  pageId: UUIDString;
}
```
### Return Type
Recall that calling the `GetFloorplanPageById` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetFloorplanPageById` Query is of type `GetFloorplanPageByIdData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetFloorplanPageByIdData {
  floorplanPage?: {
    id: UUIDString;
    projectId: UUIDString;
    pageNumber: number;
    status: string;
    processingError?: string | null;
    sourceImagePath?: string | null;
    previewImagePath?: string | null;
    rawJsonPath?: string | null;
    rawFloorplanPath?: string | null;
    overlayJson?: string | null;
    scaleMmPerPx?: number | null;
    ceilingHeightMm?: number | null;
    referencePointsJson?: string | null;
    referenceLengthMm?: number | null;
    processingStrategy?: string | null;
    processingMetadataJson?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & FloorplanPage_Key;
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetFloorplanPageById`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetFloorplanPageByIdVariables } from '@generated/data-connector-web';
import { useGetFloorplanPageById } from '@generated/data-connector-web/react'

export default function GetFloorplanPageByIdComponent() {
  // The `useGetFloorplanPageById` Query hook requires an argument of type `GetFloorplanPageByIdVariables`:
  const getFloorplanPageByIdVars: GetFloorplanPageByIdVariables = {
    projectId: ..., 
    pageId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetFloorplanPageById(getFloorplanPageByIdVars);
  // Variables can be defined inline as well.
  const query = useGetFloorplanPageById({ projectId: ..., pageId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetFloorplanPageById(dataConnect, getFloorplanPageByIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetFloorplanPageById(getFloorplanPageByIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetFloorplanPageById(dataConnect, getFloorplanPageByIdVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.floorplanPage);
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

## ListDueReminders
You can execute the `ListDueReminders` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useListDueReminders(dc: DataConnect, vars: ListDueRemindersVariables, options?: useDataConnectQueryOptions<ListDueRemindersData>): UseDataConnectQueryResult<ListDueRemindersData, ListDueRemindersVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListDueReminders(vars: ListDueRemindersVariables, options?: useDataConnectQueryOptions<ListDueRemindersData>): UseDataConnectQueryResult<ListDueRemindersData, ListDueRemindersVariables>;
```

### Variables
The `ListDueReminders` Query requires an argument of type `ListDueRemindersVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListDueRemindersVariables {
  ownerId: string;
}
```
### Return Type
Recall that calling the `ListDueReminders` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListDueReminders` Query is of type `ListDueRemindersData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListDueRemindersData {
  reminders: ({
    id: UUIDString;
    ownerId: string;
    projectId: UUIDString;
    accountId?: UUIDString | null;
    name: string;
    status: string;
    dueAt: TimestampString;
    completedAt?: TimestampString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Reminder_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListDueReminders`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListDueRemindersVariables } from '@generated/data-connector-web';
import { useListDueReminders } from '@generated/data-connector-web/react'

export default function ListDueRemindersComponent() {
  // The `useListDueReminders` Query hook requires an argument of type `ListDueRemindersVariables`:
  const listDueRemindersVars: ListDueRemindersVariables = {
    ownerId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListDueReminders(listDueRemindersVars);
  // Variables can be defined inline as well.
  const query = useListDueReminders({ ownerId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListDueReminders(dataConnect, listDueRemindersVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListDueReminders(listDueRemindersVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListDueReminders(dataConnect, listDueRemindersVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.reminders);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListProjectReminders
You can execute the `ListProjectReminders` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useListProjectReminders(dc: DataConnect, vars: ListProjectRemindersVariables, options?: useDataConnectQueryOptions<ListProjectRemindersData>): UseDataConnectQueryResult<ListProjectRemindersData, ListProjectRemindersVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListProjectReminders(vars: ListProjectRemindersVariables, options?: useDataConnectQueryOptions<ListProjectRemindersData>): UseDataConnectQueryResult<ListProjectRemindersData, ListProjectRemindersVariables>;
```

### Variables
The `ListProjectReminders` Query requires an argument of type `ListProjectRemindersVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListProjectRemindersVariables {
  projectId: UUIDString;
}
```
### Return Type
Recall that calling the `ListProjectReminders` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListProjectReminders` Query is of type `ListProjectRemindersData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListProjectRemindersData {
  reminders: ({
    id: UUIDString;
    ownerId: string;
    projectId: UUIDString;
    accountId?: UUIDString | null;
    name: string;
    status: string;
    dueAt: TimestampString;
    completedAt?: TimestampString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Reminder_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListProjectReminders`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListProjectRemindersVariables } from '@generated/data-connector-web';
import { useListProjectReminders } from '@generated/data-connector-web/react'

export default function ListProjectRemindersComponent() {
  // The `useListProjectReminders` Query hook requires an argument of type `ListProjectRemindersVariables`:
  const listProjectRemindersVars: ListProjectRemindersVariables = {
    projectId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListProjectReminders(listProjectRemindersVars);
  // Variables can be defined inline as well.
  const query = useListProjectReminders({ projectId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListProjectReminders(dataConnect, listProjectRemindersVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListProjectReminders(listProjectRemindersVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListProjectReminders(dataConnect, listProjectRemindersVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.reminders);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetReminderById
You can execute the `GetReminderById` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useGetReminderById(dc: DataConnect, vars: GetReminderByIdVariables, options?: useDataConnectQueryOptions<GetReminderByIdData>): UseDataConnectQueryResult<GetReminderByIdData, GetReminderByIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetReminderById(vars: GetReminderByIdVariables, options?: useDataConnectQueryOptions<GetReminderByIdData>): UseDataConnectQueryResult<GetReminderByIdData, GetReminderByIdVariables>;
```

### Variables
The `GetReminderById` Query requires an argument of type `GetReminderByIdVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetReminderByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetReminderById` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetReminderById` Query is of type `GetReminderByIdData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetReminderByIdData {
  reminder?: {
    id: UUIDString;
    ownerId: string;
    projectId: UUIDString;
    accountId?: UUIDString | null;
    name: string;
    status: string;
    dueAt: TimestampString;
    completedAt?: TimestampString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Reminder_Key;
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetReminderById`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetReminderByIdVariables } from '@generated/data-connector-web';
import { useGetReminderById } from '@generated/data-connector-web/react'

export default function GetReminderByIdComponent() {
  // The `useGetReminderById` Query hook requires an argument of type `GetReminderByIdVariables`:
  const getReminderByIdVars: GetReminderByIdVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetReminderById(getReminderByIdVars);
  // Variables can be defined inline as well.
  const query = useGetReminderById({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetReminderById(dataConnect, getReminderByIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetReminderById(getReminderByIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetReminderById(dataConnect, getReminderByIdVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.reminder);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetUserSettings
You can execute the `GetUserSettings` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useGetUserSettings(dc: DataConnect, vars: GetUserSettingsVariables, options?: useDataConnectQueryOptions<GetUserSettingsData>): UseDataConnectQueryResult<GetUserSettingsData, GetUserSettingsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetUserSettings(vars: GetUserSettingsVariables, options?: useDataConnectQueryOptions<GetUserSettingsData>): UseDataConnectQueryResult<GetUserSettingsData, GetUserSettingsVariables>;
```

### Variables
The `GetUserSettings` Query requires an argument of type `GetUserSettingsVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetUserSettingsVariables {
  ownerId: string;
}
```
### Return Type
Recall that calling the `GetUserSettings` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUserSettings` Query is of type `GetUserSettingsData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetUserSettingsData {
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

### Using `GetUserSettings`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetUserSettingsVariables } from '@generated/data-connector-web';
import { useGetUserSettings } from '@generated/data-connector-web/react'

export default function GetUserSettingsComponent() {
  // The `useGetUserSettings` Query hook requires an argument of type `GetUserSettingsVariables`:
  const getUserSettingsVars: GetUserSettingsVariables = {
    ownerId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetUserSettings(getUserSettingsVars);
  // Variables can be defined inline as well.
  const query = useGetUserSettings({ ownerId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetUserSettings(dataConnect, getUserSettingsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserSettings(getUserSettingsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserSettings(dataConnect, getUserSettingsVars, options);

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

Below are examples of how to use the `data-connector` connector's generated Mutation hook functions to execute each Mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## CreateAccount
You can execute the `CreateAccount` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateAccount(options?: useDataConnectMutationOptions<CreateAccountData, FirebaseError, CreateAccountVariables>): UseDataConnectMutationResult<CreateAccountData, CreateAccountVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateAccount(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAccountData, FirebaseError, CreateAccountVariables>): UseDataConnectMutationResult<CreateAccountData, CreateAccountVariables>;
```

### Variables
The `CreateAccount` Mutation requires an argument of type `CreateAccountVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateAccountVariables {
  id: UUIDString;
  ownerId: string;
  companyName: string;
  businessNumber?: string | null;
  phoneNumber?: string | null;
}
```
### Return Type
Recall that calling the `CreateAccount` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateAccount` Mutation is of type `CreateAccountData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateAccountData {
  account_insert: Account_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateAccount`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateAccountVariables } from '@generated/data-connector-web';
import { useCreateAccount } from '@generated/data-connector-web/react'

export default function CreateAccountComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateAccount();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateAccount(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateAccount(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateAccount(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateAccount` Mutation requires an argument of type `CreateAccountVariables`:
  const createAccountVars: CreateAccountVariables = {
    id: ..., 
    ownerId: ..., 
    companyName: ..., 
    businessNumber: ..., // optional
    phoneNumber: ..., // optional
  };
  mutation.mutate(createAccountVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., ownerId: ..., companyName: ..., businessNumber: ..., phoneNumber: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createAccountVars, options);

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

## UpdateAccount
You can execute the `UpdateAccount` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateAccount(options?: useDataConnectMutationOptions<UpdateAccountData, FirebaseError, UpdateAccountVariables>): UseDataConnectMutationResult<UpdateAccountData, UpdateAccountVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateAccount(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAccountData, FirebaseError, UpdateAccountVariables>): UseDataConnectMutationResult<UpdateAccountData, UpdateAccountVariables>;
```

### Variables
The `UpdateAccount` Mutation requires an argument of type `UpdateAccountVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateAccountVariables {
  id: UUIDString;
  companyName?: string | null;
  businessNumber?: string | null;
  phoneNumber?: string | null;
  primaryContactId?: UUIDString | null;
}
```
### Return Type
Recall that calling the `UpdateAccount` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateAccount` Mutation is of type `UpdateAccountData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateAccountData {
  account_update?: Account_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateAccount`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateAccountVariables } from '@generated/data-connector-web';
import { useUpdateAccount } from '@generated/data-connector-web/react'

export default function UpdateAccountComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateAccount();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateAccount(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateAccount(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateAccount(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateAccount` Mutation requires an argument of type `UpdateAccountVariables`:
  const updateAccountVars: UpdateAccountVariables = {
    id: ..., 
    companyName: ..., // optional
    businessNumber: ..., // optional
    phoneNumber: ..., // optional
    primaryContactId: ..., // optional
  };
  mutation.mutate(updateAccountVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., companyName: ..., businessNumber: ..., phoneNumber: ..., primaryContactId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateAccountVars, options);

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

## DeleteAccountContacts
You can execute the `DeleteAccountContacts` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteAccountContacts(options?: useDataConnectMutationOptions<DeleteAccountContactsData, FirebaseError, DeleteAccountContactsVariables>): UseDataConnectMutationResult<DeleteAccountContactsData, DeleteAccountContactsVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteAccountContacts(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteAccountContactsData, FirebaseError, DeleteAccountContactsVariables>): UseDataConnectMutationResult<DeleteAccountContactsData, DeleteAccountContactsVariables>;
```

### Variables
The `DeleteAccountContacts` Mutation requires an argument of type `DeleteAccountContactsVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteAccountContactsVariables {
  accountId: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteAccountContacts` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteAccountContacts` Mutation is of type `DeleteAccountContactsData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteAccountContactsData {
  accountContact_deleteMany: number;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteAccountContacts`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteAccountContactsVariables } from '@generated/data-connector-web';
import { useDeleteAccountContacts } from '@generated/data-connector-web/react'

export default function DeleteAccountContactsComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteAccountContacts();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteAccountContacts(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteAccountContacts(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteAccountContacts(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteAccountContacts` Mutation requires an argument of type `DeleteAccountContactsVariables`:
  const deleteAccountContactsVars: DeleteAccountContactsVariables = {
    accountId: ..., 
  };
  mutation.mutate(deleteAccountContactsVars);
  // Variables can be defined inline as well.
  mutation.mutate({ accountId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteAccountContactsVars, options);

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteAccount
You can execute the `DeleteAccount` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteAccount(options?: useDataConnectMutationOptions<DeleteAccountData, FirebaseError, DeleteAccountVariables>): UseDataConnectMutationResult<DeleteAccountData, DeleteAccountVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteAccount(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteAccountData, FirebaseError, DeleteAccountVariables>): UseDataConnectMutationResult<DeleteAccountData, DeleteAccountVariables>;
```

### Variables
The `DeleteAccount` Mutation requires an argument of type `DeleteAccountVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteAccountVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteAccount` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteAccount` Mutation is of type `DeleteAccountData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteAccountData {
  account_delete?: Account_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteAccount`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteAccountVariables } from '@generated/data-connector-web';
import { useDeleteAccount } from '@generated/data-connector-web/react'

export default function DeleteAccountComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteAccount();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteAccount(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteAccount(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteAccount(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteAccount` Mutation requires an argument of type `DeleteAccountVariables`:
  const deleteAccountVars: DeleteAccountVariables = {
    id: ..., 
  };
  mutation.mutate(deleteAccountVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteAccountVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.account_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateAccountContact
You can execute the `CreateAccountContact` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateAccountContact(options?: useDataConnectMutationOptions<CreateAccountContactData, FirebaseError, CreateAccountContactVariables>): UseDataConnectMutationResult<CreateAccountContactData, CreateAccountContactVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateAccountContact(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAccountContactData, FirebaseError, CreateAccountContactVariables>): UseDataConnectMutationResult<CreateAccountContactData, CreateAccountContactVariables>;
```

### Variables
The `CreateAccountContact` Mutation requires an argument of type `CreateAccountContactVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateAccountContactVariables {
  id: UUIDString;
  accountId: UUIDString;
  name: string;
  email?: string | null;
  phoneNumber?: string | null;
  role?: string | null;
}
```
### Return Type
Recall that calling the `CreateAccountContact` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateAccountContact` Mutation is of type `CreateAccountContactData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateAccountContactData {
  accountContact_insert: AccountContact_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateAccountContact`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateAccountContactVariables } from '@generated/data-connector-web';
import { useCreateAccountContact } from '@generated/data-connector-web/react'

export default function CreateAccountContactComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateAccountContact();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateAccountContact(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateAccountContact(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateAccountContact(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateAccountContact` Mutation requires an argument of type `CreateAccountContactVariables`:
  const createAccountContactVars: CreateAccountContactVariables = {
    id: ..., 
    accountId: ..., 
    name: ..., 
    email: ..., // optional
    phoneNumber: ..., // optional
    role: ..., // optional
  };
  mutation.mutate(createAccountContactVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., accountId: ..., name: ..., email: ..., phoneNumber: ..., role: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createAccountContactVars, options);

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

## UpdateAccountContact
You can execute the `UpdateAccountContact` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateAccountContact(options?: useDataConnectMutationOptions<UpdateAccountContactData, FirebaseError, UpdateAccountContactVariables>): UseDataConnectMutationResult<UpdateAccountContactData, UpdateAccountContactVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateAccountContact(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAccountContactData, FirebaseError, UpdateAccountContactVariables>): UseDataConnectMutationResult<UpdateAccountContactData, UpdateAccountContactVariables>;
```

### Variables
The `UpdateAccountContact` Mutation requires an argument of type `UpdateAccountContactVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateAccountContactVariables {
  id: UUIDString;
  name?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  role?: string | null;
}
```
### Return Type
Recall that calling the `UpdateAccountContact` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateAccountContact` Mutation is of type `UpdateAccountContactData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateAccountContactData {
  accountContact_update?: AccountContact_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateAccountContact`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateAccountContactVariables } from '@generated/data-connector-web';
import { useUpdateAccountContact } from '@generated/data-connector-web/react'

export default function UpdateAccountContactComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateAccountContact();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateAccountContact(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateAccountContact(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateAccountContact(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateAccountContact` Mutation requires an argument of type `UpdateAccountContactVariables`:
  const updateAccountContactVars: UpdateAccountContactVariables = {
    id: ..., 
    name: ..., // optional
    email: ..., // optional
    phoneNumber: ..., // optional
    role: ..., // optional
  };
  mutation.mutate(updateAccountContactVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., email: ..., phoneNumber: ..., role: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateAccountContactVars, options);

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

## DeleteAccountContact
You can execute the `DeleteAccountContact` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteAccountContact(options?: useDataConnectMutationOptions<DeleteAccountContactData, FirebaseError, DeleteAccountContactVariables>): UseDataConnectMutationResult<DeleteAccountContactData, DeleteAccountContactVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteAccountContact(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteAccountContactData, FirebaseError, DeleteAccountContactVariables>): UseDataConnectMutationResult<DeleteAccountContactData, DeleteAccountContactVariables>;
```

### Variables
The `DeleteAccountContact` Mutation requires an argument of type `DeleteAccountContactVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteAccountContactVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteAccountContact` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteAccountContact` Mutation is of type `DeleteAccountContactData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteAccountContactData {
  accountContact_delete?: AccountContact_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteAccountContact`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteAccountContactVariables } from '@generated/data-connector-web';
import { useDeleteAccountContact } from '@generated/data-connector-web/react'

export default function DeleteAccountContactComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteAccountContact();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteAccountContact(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteAccountContact(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteAccountContact(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteAccountContact` Mutation requires an argument of type `DeleteAccountContactVariables`:
  const deleteAccountContactVars: DeleteAccountContactVariables = {
    id: ..., 
  };
  mutation.mutate(deleteAccountContactVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteAccountContactVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.accountContact_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateProjectFromUpload
You can execute the `CreateProjectFromUpload` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateProjectFromUpload(options?: useDataConnectMutationOptions<CreateProjectFromUploadData, FirebaseError, CreateProjectFromUploadVariables>): UseDataConnectMutationResult<CreateProjectFromUploadData, CreateProjectFromUploadVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateProjectFromUpload(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProjectFromUploadData, FirebaseError, CreateProjectFromUploadVariables>): UseDataConnectMutationResult<CreateProjectFromUploadData, CreateProjectFromUploadVariables>;
```

### Variables
The `CreateProjectFromUpload` Mutation requires an argument of type `CreateProjectFromUploadVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateProjectFromUploadVariables {
  id: UUIDString;
  ownerId: string;
  accountId?: UUIDString | null;
  name: string;
  address?: string | null;
  originalFileName: string;
  uploadType: string;
  originalPath: string;
  status: string;
  salesStatus?: string | null;
  pageCount: number;
}
```
### Return Type
Recall that calling the `CreateProjectFromUpload` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateProjectFromUpload` Mutation is of type `CreateProjectFromUploadData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateProjectFromUploadData {
  project_insert: Project_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateProjectFromUpload`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateProjectFromUploadVariables } from '@generated/data-connector-web';
import { useCreateProjectFromUpload } from '@generated/data-connector-web/react'

export default function CreateProjectFromUploadComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateProjectFromUpload();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateProjectFromUpload(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProjectFromUpload(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProjectFromUpload(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateProjectFromUpload` Mutation requires an argument of type `CreateProjectFromUploadVariables`:
  const createProjectFromUploadVars: CreateProjectFromUploadVariables = {
    id: ..., 
    ownerId: ..., 
    accountId: ..., // optional
    name: ..., 
    address: ..., // optional
    originalFileName: ..., 
    uploadType: ..., 
    originalPath: ..., 
    status: ..., 
    salesStatus: ..., // optional
    pageCount: ..., 
  };
  mutation.mutate(createProjectFromUploadVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., ownerId: ..., accountId: ..., name: ..., address: ..., originalFileName: ..., uploadType: ..., originalPath: ..., status: ..., salesStatus: ..., pageCount: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createProjectFromUploadVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.project_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateProject
You can execute the `UpdateProject` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateProject(options?: useDataConnectMutationOptions<UpdateProjectData, FirebaseError, UpdateProjectVariables>): UseDataConnectMutationResult<UpdateProjectData, UpdateProjectVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateProject(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProjectData, FirebaseError, UpdateProjectVariables>): UseDataConnectMutationResult<UpdateProjectData, UpdateProjectVariables>;
```

### Variables
The `UpdateProject` Mutation requires an argument of type `UpdateProjectVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateProjectVariables {
  id: UUIDString;
  name?: string | null;
  accountId?: UUIDString | null;
  address?: string | null;
  salesStatus?: string | null;
}
```
### Return Type
Recall that calling the `UpdateProject` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateProject` Mutation is of type `UpdateProjectData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateProjectData {
  project_update?: Project_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateProject`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateProjectVariables } from '@generated/data-connector-web';
import { useUpdateProject } from '@generated/data-connector-web/react'

export default function UpdateProjectComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateProject();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateProject(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateProject(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateProject(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateProject` Mutation requires an argument of type `UpdateProjectVariables`:
  const updateProjectVars: UpdateProjectVariables = {
    id: ..., 
    name: ..., // optional
    accountId: ..., // optional
    address: ..., // optional
    salesStatus: ..., // optional
  };
  mutation.mutate(updateProjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., accountId: ..., address: ..., salesStatus: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateProjectVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.project_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RenameProject
You can execute the `RenameProject` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useRenameProject(options?: useDataConnectMutationOptions<RenameProjectData, FirebaseError, RenameProjectVariables>): UseDataConnectMutationResult<RenameProjectData, RenameProjectVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRenameProject(dc: DataConnect, options?: useDataConnectMutationOptions<RenameProjectData, FirebaseError, RenameProjectVariables>): UseDataConnectMutationResult<RenameProjectData, RenameProjectVariables>;
```

### Variables
The `RenameProject` Mutation requires an argument of type `RenameProjectVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RenameProjectVariables {
  id: UUIDString;
  name: string;
}
```
### Return Type
Recall that calling the `RenameProject` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RenameProject` Mutation is of type `RenameProjectData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RenameProjectData {
  project_update?: Project_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RenameProject`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RenameProjectVariables } from '@generated/data-connector-web';
import { useRenameProject } from '@generated/data-connector-web/react'

export default function RenameProjectComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRenameProject();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRenameProject(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRenameProject(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRenameProject(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRenameProject` Mutation requires an argument of type `RenameProjectVariables`:
  const renameProjectVars: RenameProjectVariables = {
    id: ..., 
    name: ..., 
  };
  mutation.mutate(renameProjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(renameProjectVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.project_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## TouchProject
You can execute the `TouchProject` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useTouchProject(options?: useDataConnectMutationOptions<TouchProjectData, FirebaseError, TouchProjectVariables>): UseDataConnectMutationResult<TouchProjectData, TouchProjectVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useTouchProject(dc: DataConnect, options?: useDataConnectMutationOptions<TouchProjectData, FirebaseError, TouchProjectVariables>): UseDataConnectMutationResult<TouchProjectData, TouchProjectVariables>;
```

### Variables
The `TouchProject` Mutation requires an argument of type `TouchProjectVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface TouchProjectVariables {
  id: UUIDString;
  status?: string | null;
  processingError?: string | null;
}
```
### Return Type
Recall that calling the `TouchProject` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `TouchProject` Mutation is of type `TouchProjectData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface TouchProjectData {
  project_update?: Project_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `TouchProject`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, TouchProjectVariables } from '@generated/data-connector-web';
import { useTouchProject } from '@generated/data-connector-web/react'

export default function TouchProjectComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useTouchProject();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useTouchProject(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useTouchProject(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useTouchProject(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useTouchProject` Mutation requires an argument of type `TouchProjectVariables`:
  const touchProjectVars: TouchProjectVariables = {
    id: ..., 
    status: ..., // optional
    processingError: ..., // optional
  };
  mutation.mutate(touchProjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., status: ..., processingError: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(touchProjectVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.project_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteFloorplanPages
You can execute the `DeleteFloorplanPages` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteFloorplanPages(options?: useDataConnectMutationOptions<DeleteFloorplanPagesData, FirebaseError, DeleteFloorplanPagesVariables>): UseDataConnectMutationResult<DeleteFloorplanPagesData, DeleteFloorplanPagesVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteFloorplanPages(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteFloorplanPagesData, FirebaseError, DeleteFloorplanPagesVariables>): UseDataConnectMutationResult<DeleteFloorplanPagesData, DeleteFloorplanPagesVariables>;
```

### Variables
The `DeleteFloorplanPages` Mutation requires an argument of type `DeleteFloorplanPagesVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteFloorplanPagesVariables {
  projectId: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteFloorplanPages` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteFloorplanPages` Mutation is of type `DeleteFloorplanPagesData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteFloorplanPagesData {
  floorplanPage_deleteMany: number;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteFloorplanPages`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteFloorplanPagesVariables } from '@generated/data-connector-web';
import { useDeleteFloorplanPages } from '@generated/data-connector-web/react'

export default function DeleteFloorplanPagesComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteFloorplanPages();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteFloorplanPages(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteFloorplanPages(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteFloorplanPages(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteFloorplanPages` Mutation requires an argument of type `DeleteFloorplanPagesVariables`:
  const deleteFloorplanPagesVars: DeleteFloorplanPagesVariables = {
    projectId: ..., 
  };
  mutation.mutate(deleteFloorplanPagesVars);
  // Variables can be defined inline as well.
  mutation.mutate({ projectId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteFloorplanPagesVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.floorplanPage_deleteMany);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteProject
You can execute the `DeleteProject` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteProject(options?: useDataConnectMutationOptions<DeleteProjectData, FirebaseError, DeleteProjectVariables>): UseDataConnectMutationResult<DeleteProjectData, DeleteProjectVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteProject(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProjectData, FirebaseError, DeleteProjectVariables>): UseDataConnectMutationResult<DeleteProjectData, DeleteProjectVariables>;
```

### Variables
The `DeleteProject` Mutation requires an argument of type `DeleteProjectVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteProjectVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteProject` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteProject` Mutation is of type `DeleteProjectData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteProjectData {
  project_delete?: Project_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteProject`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteProjectVariables } from '@generated/data-connector-web';
import { useDeleteProject } from '@generated/data-connector-web/react'

export default function DeleteProjectComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteProject();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteProject(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteProject(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteProject(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteProject` Mutation requires an argument of type `DeleteProjectVariables`:
  const deleteProjectVars: DeleteProjectVariables = {
    id: ..., 
  };
  mutation.mutate(deleteProjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteProjectVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.project_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateFloorplanPage
You can execute the `CreateFloorplanPage` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateFloorplanPage(options?: useDataConnectMutationOptions<CreateFloorplanPageData, FirebaseError, CreateFloorplanPageVariables>): UseDataConnectMutationResult<CreateFloorplanPageData, CreateFloorplanPageVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateFloorplanPage(dc: DataConnect, options?: useDataConnectMutationOptions<CreateFloorplanPageData, FirebaseError, CreateFloorplanPageVariables>): UseDataConnectMutationResult<CreateFloorplanPageData, CreateFloorplanPageVariables>;
```

### Variables
The `CreateFloorplanPage` Mutation requires an argument of type `CreateFloorplanPageVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateFloorplanPageVariables {
  projectId: UUIDString;
  pageNumber: number;
  status: string;
  processingError?: string | null;
  sourceImagePath?: string | null;
  previewImagePath?: string | null;
  rawJsonPath?: string | null;
  rawFloorplanPath?: string | null;
  overlayJson?: string | null;
  scaleMmPerPx?: number | null;
  ceilingHeightMm?: number | null;
  referencePointsJson?: string | null;
  referenceLengthMm?: number | null;
  processingStrategy?: string | null;
  processingMetadataJson?: string | null;
}
```
### Return Type
Recall that calling the `CreateFloorplanPage` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateFloorplanPage` Mutation is of type `CreateFloorplanPageData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateFloorplanPageData {
  floorplanPage_insert: FloorplanPage_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateFloorplanPage`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateFloorplanPageVariables } from '@generated/data-connector-web';
import { useCreateFloorplanPage } from '@generated/data-connector-web/react'

export default function CreateFloorplanPageComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateFloorplanPage();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateFloorplanPage(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateFloorplanPage(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateFloorplanPage(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateFloorplanPage` Mutation requires an argument of type `CreateFloorplanPageVariables`:
  const createFloorplanPageVars: CreateFloorplanPageVariables = {
    projectId: ..., 
    pageNumber: ..., 
    status: ..., 
    processingError: ..., // optional
    sourceImagePath: ..., // optional
    previewImagePath: ..., // optional
    rawJsonPath: ..., // optional
    rawFloorplanPath: ..., // optional
    overlayJson: ..., // optional
    scaleMmPerPx: ..., // optional
    ceilingHeightMm: ..., // optional
    referencePointsJson: ..., // optional
    referenceLengthMm: ..., // optional
    processingStrategy: ..., // optional
    processingMetadataJson: ..., // optional
  };
  mutation.mutate(createFloorplanPageVars);
  // Variables can be defined inline as well.
  mutation.mutate({ projectId: ..., pageNumber: ..., status: ..., processingError: ..., sourceImagePath: ..., previewImagePath: ..., rawJsonPath: ..., rawFloorplanPath: ..., overlayJson: ..., scaleMmPerPx: ..., ceilingHeightMm: ..., referencePointsJson: ..., referenceLengthMm: ..., processingStrategy: ..., processingMetadataJson: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createFloorplanPageVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.floorplanPage_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateFloorplanPageAnalysis
You can execute the `UpdateFloorplanPageAnalysis` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateFloorplanPageAnalysis(options?: useDataConnectMutationOptions<UpdateFloorplanPageAnalysisData, FirebaseError, UpdateFloorplanPageAnalysisVariables>): UseDataConnectMutationResult<UpdateFloorplanPageAnalysisData, UpdateFloorplanPageAnalysisVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateFloorplanPageAnalysis(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateFloorplanPageAnalysisData, FirebaseError, UpdateFloorplanPageAnalysisVariables>): UseDataConnectMutationResult<UpdateFloorplanPageAnalysisData, UpdateFloorplanPageAnalysisVariables>;
```

### Variables
The `UpdateFloorplanPageAnalysis` Mutation requires an argument of type `UpdateFloorplanPageAnalysisVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateFloorplanPageAnalysisVariables {
  id: UUIDString;
  status: string;
  processingError?: string | null;
  sourceImagePath?: string | null;
  previewImagePath?: string | null;
  rawJsonPath?: string | null;
  rawFloorplanPath?: string | null;
  overlayJson?: string | null;
  scaleMmPerPx?: number | null;
  ceilingHeightMm?: number | null;
  referencePointsJson?: string | null;
  referenceLengthMm?: number | null;
  processingStrategy?: string | null;
  processingMetadataJson?: string | null;
}
```
### Return Type
Recall that calling the `UpdateFloorplanPageAnalysis` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateFloorplanPageAnalysis` Mutation is of type `UpdateFloorplanPageAnalysisData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateFloorplanPageAnalysisData {
  floorplanPage_update?: FloorplanPage_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateFloorplanPageAnalysis`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateFloorplanPageAnalysisVariables } from '@generated/data-connector-web';
import { useUpdateFloorplanPageAnalysis } from '@generated/data-connector-web/react'

export default function UpdateFloorplanPageAnalysisComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateFloorplanPageAnalysis();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateFloorplanPageAnalysis(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateFloorplanPageAnalysis(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateFloorplanPageAnalysis(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateFloorplanPageAnalysis` Mutation requires an argument of type `UpdateFloorplanPageAnalysisVariables`:
  const updateFloorplanPageAnalysisVars: UpdateFloorplanPageAnalysisVariables = {
    id: ..., 
    status: ..., 
    processingError: ..., // optional
    sourceImagePath: ..., // optional
    previewImagePath: ..., // optional
    rawJsonPath: ..., // optional
    rawFloorplanPath: ..., // optional
    overlayJson: ..., // optional
    scaleMmPerPx: ..., // optional
    ceilingHeightMm: ..., // optional
    referencePointsJson: ..., // optional
    referenceLengthMm: ..., // optional
    processingStrategy: ..., // optional
    processingMetadataJson: ..., // optional
  };
  mutation.mutate(updateFloorplanPageAnalysisVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., status: ..., processingError: ..., sourceImagePath: ..., previewImagePath: ..., rawJsonPath: ..., rawFloorplanPath: ..., overlayJson: ..., scaleMmPerPx: ..., ceilingHeightMm: ..., referencePointsJson: ..., referenceLengthMm: ..., processingStrategy: ..., processingMetadataJson: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateFloorplanPageAnalysisVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.floorplanPage_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateFloorplanPage
You can execute the `UpdateFloorplanPage` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateFloorplanPage(options?: useDataConnectMutationOptions<UpdateFloorplanPageData, FirebaseError, UpdateFloorplanPageVariables>): UseDataConnectMutationResult<UpdateFloorplanPageData, UpdateFloorplanPageVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateFloorplanPage(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateFloorplanPageData, FirebaseError, UpdateFloorplanPageVariables>): UseDataConnectMutationResult<UpdateFloorplanPageData, UpdateFloorplanPageVariables>;
```

### Variables
The `UpdateFloorplanPage` Mutation requires an argument of type `UpdateFloorplanPageVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateFloorplanPageVariables {
  id: UUIDString;
  overlayJson?: string | null;
  scaleMmPerPx?: number | null;
  ceilingHeightMm?: number | null;
  referencePointsJson?: string | null;
  referenceLengthMm?: number | null;
}
```
### Return Type
Recall that calling the `UpdateFloorplanPage` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateFloorplanPage` Mutation is of type `UpdateFloorplanPageData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateFloorplanPageData {
  floorplanPage_update?: FloorplanPage_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateFloorplanPage`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateFloorplanPageVariables } from '@generated/data-connector-web';
import { useUpdateFloorplanPage } from '@generated/data-connector-web/react'

export default function UpdateFloorplanPageComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateFloorplanPage();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateFloorplanPage(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateFloorplanPage(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateFloorplanPage(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateFloorplanPage` Mutation requires an argument of type `UpdateFloorplanPageVariables`:
  const updateFloorplanPageVars: UpdateFloorplanPageVariables = {
    id: ..., 
    overlayJson: ..., // optional
    scaleMmPerPx: ..., // optional
    ceilingHeightMm: ..., // optional
    referencePointsJson: ..., // optional
    referenceLengthMm: ..., // optional
  };
  mutation.mutate(updateFloorplanPageVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., overlayJson: ..., scaleMmPerPx: ..., ceilingHeightMm: ..., referencePointsJson: ..., referenceLengthMm: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateFloorplanPageVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.floorplanPage_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateFloorplanPages
You can execute the `UpdateFloorplanPages` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateFloorplanPages(options?: useDataConnectMutationOptions<UpdateFloorplanPagesData, FirebaseError, UpdateFloorplanPagesVariables>): UseDataConnectMutationResult<UpdateFloorplanPagesData, UpdateFloorplanPagesVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateFloorplanPages(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateFloorplanPagesData, FirebaseError, UpdateFloorplanPagesVariables>): UseDataConnectMutationResult<UpdateFloorplanPagesData, UpdateFloorplanPagesVariables>;
```

### Variables
The `UpdateFloorplanPages` Mutation requires an argument of type `UpdateFloorplanPagesVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateFloorplanPagesVariables {
  projectId: UUIDString;
  scaleMmPerPx?: number | null;
  ceilingHeightMm?: number | null;
}
```
### Return Type
Recall that calling the `UpdateFloorplanPages` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateFloorplanPages` Mutation is of type `UpdateFloorplanPagesData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateFloorplanPagesData {
  floorplanPage_updateMany: number;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateFloorplanPages`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateFloorplanPagesVariables } from '@generated/data-connector-web';
import { useUpdateFloorplanPages } from '@generated/data-connector-web/react'

export default function UpdateFloorplanPagesComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateFloorplanPages();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateFloorplanPages(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateFloorplanPages(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateFloorplanPages(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateFloorplanPages` Mutation requires an argument of type `UpdateFloorplanPagesVariables`:
  const updateFloorplanPagesVars: UpdateFloorplanPagesVariables = {
    projectId: ..., 
    scaleMmPerPx: ..., // optional
    ceilingHeightMm: ..., // optional
  };
  mutation.mutate(updateFloorplanPagesVars);
  // Variables can be defined inline as well.
  mutation.mutate({ projectId: ..., scaleMmPerPx: ..., ceilingHeightMm: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateFloorplanPagesVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.floorplanPage_updateMany);
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

## CreateProjectQuestionnaire
You can execute the `CreateProjectQuestionnaire` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateProjectQuestionnaire(options?: useDataConnectMutationOptions<CreateProjectQuestionnaireData, FirebaseError, CreateProjectQuestionnaireVariables>): UseDataConnectMutationResult<CreateProjectQuestionnaireData, CreateProjectQuestionnaireVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateProjectQuestionnaire(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProjectQuestionnaireData, FirebaseError, CreateProjectQuestionnaireVariables>): UseDataConnectMutationResult<CreateProjectQuestionnaireData, CreateProjectQuestionnaireVariables>;
```

### Variables
The `CreateProjectQuestionnaire` Mutation requires an argument of type `CreateProjectQuestionnaireVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateProjectQuestionnaireVariables {
  id: UUIDString;
  projectId: UUIDString;
  sourceTemplateId?: UUIDString | null;
}
```
### Return Type
Recall that calling the `CreateProjectQuestionnaire` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateProjectQuestionnaire` Mutation is of type `CreateProjectQuestionnaireData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateProjectQuestionnaireData {
  projectQuestionnaire_insert: ProjectQuestionnaire_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateProjectQuestionnaire`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateProjectQuestionnaireVariables } from '@generated/data-connector-web';
import { useCreateProjectQuestionnaire } from '@generated/data-connector-web/react'

export default function CreateProjectQuestionnaireComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateProjectQuestionnaire();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateProjectQuestionnaire(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProjectQuestionnaire(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProjectQuestionnaire(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateProjectQuestionnaire` Mutation requires an argument of type `CreateProjectQuestionnaireVariables`:
  const createProjectQuestionnaireVars: CreateProjectQuestionnaireVariables = {
    id: ..., 
    projectId: ..., 
    sourceTemplateId: ..., // optional
  };
  mutation.mutate(createProjectQuestionnaireVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., projectId: ..., sourceTemplateId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createProjectQuestionnaireVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.projectQuestionnaire_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateProjectQuestionnaireAnswer
You can execute the `CreateProjectQuestionnaireAnswer` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateProjectQuestionnaireAnswer(options?: useDataConnectMutationOptions<CreateProjectQuestionnaireAnswerData, FirebaseError, CreateProjectQuestionnaireAnswerVariables>): UseDataConnectMutationResult<CreateProjectQuestionnaireAnswerData, CreateProjectQuestionnaireAnswerVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateProjectQuestionnaireAnswer(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProjectQuestionnaireAnswerData, FirebaseError, CreateProjectQuestionnaireAnswerVariables>): UseDataConnectMutationResult<CreateProjectQuestionnaireAnswerData, CreateProjectQuestionnaireAnswerVariables>;
```

### Variables
The `CreateProjectQuestionnaireAnswer` Mutation requires an argument of type `CreateProjectQuestionnaireAnswerVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateProjectQuestionnaireAnswerVariables {
  id: UUIDString;
  projectQuestionnaireId: UUIDString;
  questionId: UUIDString;
  position: number;
  answer?: string | null;
}
```
### Return Type
Recall that calling the `CreateProjectQuestionnaireAnswer` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateProjectQuestionnaireAnswer` Mutation is of type `CreateProjectQuestionnaireAnswerData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateProjectQuestionnaireAnswerData {
  projectQuestionnaireAnswer_insert: ProjectQuestionnaireAnswer_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateProjectQuestionnaireAnswer`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateProjectQuestionnaireAnswerVariables } from '@generated/data-connector-web';
import { useCreateProjectQuestionnaireAnswer } from '@generated/data-connector-web/react'

export default function CreateProjectQuestionnaireAnswerComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateProjectQuestionnaireAnswer();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateProjectQuestionnaireAnswer(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProjectQuestionnaireAnswer(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProjectQuestionnaireAnswer(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateProjectQuestionnaireAnswer` Mutation requires an argument of type `CreateProjectQuestionnaireAnswerVariables`:
  const createProjectQuestionnaireAnswerVars: CreateProjectQuestionnaireAnswerVariables = {
    id: ..., 
    projectQuestionnaireId: ..., 
    questionId: ..., 
    position: ..., 
    answer: ..., // optional
  };
  mutation.mutate(createProjectQuestionnaireAnswerVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., projectQuestionnaireId: ..., questionId: ..., position: ..., answer: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createProjectQuestionnaireAnswerVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.projectQuestionnaireAnswer_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateQuantitySource
You can execute the `CreateQuantitySource` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateQuantitySource(options?: useDataConnectMutationOptions<CreateQuantitySourceData, FirebaseError, CreateQuantitySourceVariables>): UseDataConnectMutationResult<CreateQuantitySourceData, CreateQuantitySourceVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateQuantitySource(dc: DataConnect, options?: useDataConnectMutationOptions<CreateQuantitySourceData, FirebaseError, CreateQuantitySourceVariables>): UseDataConnectMutationResult<CreateQuantitySourceData, CreateQuantitySourceVariables>;
```

### Variables
The `CreateQuantitySource` Mutation requires an argument of type `CreateQuantitySourceVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateQuantitySourceVariables {
  id: UUIDString;
  measurementSource: string;
  measurementPlasterType?: string | null;
}
```
### Return Type
Recall that calling the `CreateQuantitySource` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateQuantitySource` Mutation is of type `CreateQuantitySourceData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateQuantitySourceData {
  quantitySource_insert: QuantitySource_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateQuantitySource`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateQuantitySourceVariables } from '@generated/data-connector-web';
import { useCreateQuantitySource } from '@generated/data-connector-web/react'

export default function CreateQuantitySourceComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateQuantitySource();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateQuantitySource(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuantitySource(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuantitySource(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateQuantitySource` Mutation requires an argument of type `CreateQuantitySourceVariables`:
  const createQuantitySourceVars: CreateQuantitySourceVariables = {
    id: ..., 
    measurementSource: ..., 
    measurementPlasterType: ..., // optional
  };
  mutation.mutate(createQuantitySourceVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., measurementSource: ..., measurementPlasterType: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createQuantitySourceVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quantitySource_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateQuoteItemTemplate
You can execute the `CreateQuoteItemTemplate` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateQuoteItemTemplate(options?: useDataConnectMutationOptions<CreateQuoteItemTemplateData, FirebaseError, CreateQuoteItemTemplateVariables>): UseDataConnectMutationResult<CreateQuoteItemTemplateData, CreateQuoteItemTemplateVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateQuoteItemTemplate(dc: DataConnect, options?: useDataConnectMutationOptions<CreateQuoteItemTemplateData, FirebaseError, CreateQuoteItemTemplateVariables>): UseDataConnectMutationResult<CreateQuoteItemTemplateData, CreateQuoteItemTemplateVariables>;
```

### Variables
The `CreateQuoteItemTemplate` Mutation requires an argument of type `CreateQuoteItemTemplateVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateQuoteItemTemplateVariables {
  id: UUIDString;
  ownerId?: string | null;
  scope: string;
  systemKey?: string | null;
  name: string;
  hasKeywords: boolean;
  keywords: string[];
  quantitySourceId?: UUIDString | null;
  sortOrder: number;
}
```
### Return Type
Recall that calling the `CreateQuoteItemTemplate` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateQuoteItemTemplate` Mutation is of type `CreateQuoteItemTemplateData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateQuoteItemTemplateData {
  quoteItemTemplate_insert: QuoteItemTemplate_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateQuoteItemTemplate`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateQuoteItemTemplateVariables } from '@generated/data-connector-web';
import { useCreateQuoteItemTemplate } from '@generated/data-connector-web/react'

export default function CreateQuoteItemTemplateComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateQuoteItemTemplate();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateQuoteItemTemplate(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuoteItemTemplate(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuoteItemTemplate(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateQuoteItemTemplate` Mutation requires an argument of type `CreateQuoteItemTemplateVariables`:
  const createQuoteItemTemplateVars: CreateQuoteItemTemplateVariables = {
    id: ..., 
    ownerId: ..., // optional
    scope: ..., 
    systemKey: ..., // optional
    name: ..., 
    hasKeywords: ..., 
    keywords: ..., 
    quantitySourceId: ..., // optional
    sortOrder: ..., 
  };
  mutation.mutate(createQuoteItemTemplateVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., ownerId: ..., scope: ..., systemKey: ..., name: ..., hasKeywords: ..., keywords: ..., quantitySourceId: ..., sortOrder: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createQuoteItemTemplateVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quoteItemTemplate_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateQuoteItemTemplate
You can execute the `UpdateQuoteItemTemplate` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateQuoteItemTemplate(options?: useDataConnectMutationOptions<UpdateQuoteItemTemplateData, FirebaseError, UpdateQuoteItemTemplateVariables>): UseDataConnectMutationResult<UpdateQuoteItemTemplateData, UpdateQuoteItemTemplateVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateQuoteItemTemplate(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateQuoteItemTemplateData, FirebaseError, UpdateQuoteItemTemplateVariables>): UseDataConnectMutationResult<UpdateQuoteItemTemplateData, UpdateQuoteItemTemplateVariables>;
```

### Variables
The `UpdateQuoteItemTemplate` Mutation requires an argument of type `UpdateQuoteItemTemplateVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateQuoteItemTemplateVariables {
  id: UUIDString;
  name?: string | null;
  hasKeywords?: boolean | null;
  keywords?: string[] | null;
  quantitySourceId?: UUIDString | null;
  sortOrder?: number | null;
}
```
### Return Type
Recall that calling the `UpdateQuoteItemTemplate` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateQuoteItemTemplate` Mutation is of type `UpdateQuoteItemTemplateData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateQuoteItemTemplateData {
  quoteItemTemplate_update?: QuoteItemTemplate_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateQuoteItemTemplate`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateQuoteItemTemplateVariables } from '@generated/data-connector-web';
import { useUpdateQuoteItemTemplate } from '@generated/data-connector-web/react'

export default function UpdateQuoteItemTemplateComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateQuoteItemTemplate();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateQuoteItemTemplate(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateQuoteItemTemplate(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateQuoteItemTemplate(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateQuoteItemTemplate` Mutation requires an argument of type `UpdateQuoteItemTemplateVariables`:
  const updateQuoteItemTemplateVars: UpdateQuoteItemTemplateVariables = {
    id: ..., 
    name: ..., // optional
    hasKeywords: ..., // optional
    keywords: ..., // optional
    quantitySourceId: ..., // optional
    sortOrder: ..., // optional
  };
  mutation.mutate(updateQuoteItemTemplateVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., hasKeywords: ..., keywords: ..., quantitySourceId: ..., sortOrder: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateQuoteItemTemplateVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quoteItemTemplate_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteQuoteItemTemplate
You can execute the `DeleteQuoteItemTemplate` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteQuoteItemTemplate(options?: useDataConnectMutationOptions<DeleteQuoteItemTemplateData, FirebaseError, DeleteQuoteItemTemplateVariables>): UseDataConnectMutationResult<DeleteQuoteItemTemplateData, DeleteQuoteItemTemplateVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteQuoteItemTemplate(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteQuoteItemTemplateData, FirebaseError, DeleteQuoteItemTemplateVariables>): UseDataConnectMutationResult<DeleteQuoteItemTemplateData, DeleteQuoteItemTemplateVariables>;
```

### Variables
The `DeleteQuoteItemTemplate` Mutation requires an argument of type `DeleteQuoteItemTemplateVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteQuoteItemTemplateVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteQuoteItemTemplate` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteQuoteItemTemplate` Mutation is of type `DeleteQuoteItemTemplateData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteQuoteItemTemplateData {
  quoteItemTemplate_delete?: QuoteItemTemplate_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteQuoteItemTemplate`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteQuoteItemTemplateVariables } from '@generated/data-connector-web';
import { useDeleteQuoteItemTemplate } from '@generated/data-connector-web/react'

export default function DeleteQuoteItemTemplateComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteQuoteItemTemplate();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteQuoteItemTemplate(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteQuoteItemTemplate(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteQuoteItemTemplate(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteQuoteItemTemplate` Mutation requires an argument of type `DeleteQuoteItemTemplateVariables`:
  const deleteQuoteItemTemplateVars: DeleteQuoteItemTemplateVariables = {
    id: ..., 
  };
  mutation.mutate(deleteQuoteItemTemplateVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteQuoteItemTemplateVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quoteItemTemplate_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpsertQuoteItemTemplateConfig
You can execute the `UpsertQuoteItemTemplateConfig` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpsertQuoteItemTemplateConfig(options?: useDataConnectMutationOptions<UpsertQuoteItemTemplateConfigData, FirebaseError, UpsertQuoteItemTemplateConfigVariables>): UseDataConnectMutationResult<UpsertQuoteItemTemplateConfigData, UpsertQuoteItemTemplateConfigVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpsertQuoteItemTemplateConfig(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertQuoteItemTemplateConfigData, FirebaseError, UpsertQuoteItemTemplateConfigVariables>): UseDataConnectMutationResult<UpsertQuoteItemTemplateConfigData, UpsertQuoteItemTemplateConfigVariables>;
```

### Variables
The `UpsertQuoteItemTemplateConfig` Mutation requires an argument of type `UpsertQuoteItemTemplateConfigVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpsertQuoteItemTemplateConfigVariables {
  ownerId: string;
  templateId: UUIDString;
  enabled: boolean;
  unitPriceCents: number;
  materialUnitPriceCents: number;
  labourUnitPriceCents: number;
}
```
### Return Type
Recall that calling the `UpsertQuoteItemTemplateConfig` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpsertQuoteItemTemplateConfig` Mutation is of type `UpsertQuoteItemTemplateConfigData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertQuoteItemTemplateConfigData {
  quoteItemTemplateConfig_upsert: QuoteItemTemplateConfig_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpsertQuoteItemTemplateConfig`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpsertQuoteItemTemplateConfigVariables } from '@generated/data-connector-web';
import { useUpsertQuoteItemTemplateConfig } from '@generated/data-connector-web/react'

export default function UpsertQuoteItemTemplateConfigComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpsertQuoteItemTemplateConfig();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpsertQuoteItemTemplateConfig(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertQuoteItemTemplateConfig(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertQuoteItemTemplateConfig(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpsertQuoteItemTemplateConfig` Mutation requires an argument of type `UpsertQuoteItemTemplateConfigVariables`:
  const upsertQuoteItemTemplateConfigVars: UpsertQuoteItemTemplateConfigVariables = {
    ownerId: ..., 
    templateId: ..., 
    enabled: ..., 
    unitPriceCents: ..., 
    materialUnitPriceCents: ..., 
    labourUnitPriceCents: ..., 
  };
  mutation.mutate(upsertQuoteItemTemplateConfigVars);
  // Variables can be defined inline as well.
  mutation.mutate({ ownerId: ..., templateId: ..., enabled: ..., unitPriceCents: ..., materialUnitPriceCents: ..., labourUnitPriceCents: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(upsertQuoteItemTemplateConfigVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quoteItemTemplateConfig_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateSupplier
You can execute the `CreateSupplier` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateSupplier(options?: useDataConnectMutationOptions<CreateSupplierData, FirebaseError, CreateSupplierVariables>): UseDataConnectMutationResult<CreateSupplierData, CreateSupplierVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateSupplier(dc: DataConnect, options?: useDataConnectMutationOptions<CreateSupplierData, FirebaseError, CreateSupplierVariables>): UseDataConnectMutationResult<CreateSupplierData, CreateSupplierVariables>;
```

### Variables
The `CreateSupplier` Mutation requires an argument of type `CreateSupplierVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateSupplierVariables {
  id: UUIDString;
  ownerId: string;
  name: string;
}
```
### Return Type
Recall that calling the `CreateSupplier` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateSupplier` Mutation is of type `CreateSupplierData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateSupplierData {
  supplier_insert: Supplier_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateSupplier`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateSupplierVariables } from '@generated/data-connector-web';
import { useCreateSupplier } from '@generated/data-connector-web/react'

export default function CreateSupplierComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateSupplier();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateSupplier(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateSupplier(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateSupplier(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateSupplier` Mutation requires an argument of type `CreateSupplierVariables`:
  const createSupplierVars: CreateSupplierVariables = {
    id: ..., 
    ownerId: ..., 
    name: ..., 
  };
  mutation.mutate(createSupplierVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., ownerId: ..., name: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createSupplierVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.supplier_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateSupplier
You can execute the `UpdateSupplier` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateSupplier(options?: useDataConnectMutationOptions<UpdateSupplierData, FirebaseError, UpdateSupplierVariables>): UseDataConnectMutationResult<UpdateSupplierData, UpdateSupplierVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateSupplier(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateSupplierData, FirebaseError, UpdateSupplierVariables>): UseDataConnectMutationResult<UpdateSupplierData, UpdateSupplierVariables>;
```

### Variables
The `UpdateSupplier` Mutation requires an argument of type `UpdateSupplierVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateSupplierVariables {
  id: UUIDString;
  name?: string | null;
}
```
### Return Type
Recall that calling the `UpdateSupplier` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateSupplier` Mutation is of type `UpdateSupplierData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateSupplierData {
  supplier_update?: Supplier_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateSupplier`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateSupplierVariables } from '@generated/data-connector-web';
import { useUpdateSupplier } from '@generated/data-connector-web/react'

export default function UpdateSupplierComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateSupplier();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateSupplier(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateSupplier(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateSupplier(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateSupplier` Mutation requires an argument of type `UpdateSupplierVariables`:
  const updateSupplierVars: UpdateSupplierVariables = {
    id: ..., 
    name: ..., // optional
  };
  mutation.mutate(updateSupplierVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateSupplierVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.supplier_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteSupplier
You can execute the `DeleteSupplier` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteSupplier(options?: useDataConnectMutationOptions<DeleteSupplierData, FirebaseError, DeleteSupplierVariables>): UseDataConnectMutationResult<DeleteSupplierData, DeleteSupplierVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteSupplier(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteSupplierData, FirebaseError, DeleteSupplierVariables>): UseDataConnectMutationResult<DeleteSupplierData, DeleteSupplierVariables>;
```

### Variables
The `DeleteSupplier` Mutation requires an argument of type `DeleteSupplierVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteSupplierVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteSupplier` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteSupplier` Mutation is of type `DeleteSupplierData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteSupplierData {
  supplier_delete?: Supplier_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteSupplier`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteSupplierVariables } from '@generated/data-connector-web';
import { useDeleteSupplier } from '@generated/data-connector-web/react'

export default function DeleteSupplierComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteSupplier();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteSupplier(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteSupplier(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteSupplier(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteSupplier` Mutation requires an argument of type `DeleteSupplierVariables`:
  const deleteSupplierVars: DeleteSupplierVariables = {
    id: ..., 
  };
  mutation.mutate(deleteSupplierVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteSupplierVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.supplier_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpsertSupplierQuoteItemPrice
You can execute the `UpsertSupplierQuoteItemPrice` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpsertSupplierQuoteItemPrice(options?: useDataConnectMutationOptions<UpsertSupplierQuoteItemPriceData, FirebaseError, UpsertSupplierQuoteItemPriceVariables>): UseDataConnectMutationResult<UpsertSupplierQuoteItemPriceData, UpsertSupplierQuoteItemPriceVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpsertSupplierQuoteItemPrice(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertSupplierQuoteItemPriceData, FirebaseError, UpsertSupplierQuoteItemPriceVariables>): UseDataConnectMutationResult<UpsertSupplierQuoteItemPriceData, UpsertSupplierQuoteItemPriceVariables>;
```

### Variables
The `UpsertSupplierQuoteItemPrice` Mutation requires an argument of type `UpsertSupplierQuoteItemPriceVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpsertSupplierQuoteItemPriceVariables {
  ownerId: string;
  supplierId: UUIDString;
  templateId: UUIDString;
  materialUnitPriceCents: number;
}
```
### Return Type
Recall that calling the `UpsertSupplierQuoteItemPrice` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpsertSupplierQuoteItemPrice` Mutation is of type `UpsertSupplierQuoteItemPriceData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertSupplierQuoteItemPriceData {
  supplierQuoteItemPrice_upsert: SupplierQuoteItemPrice_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpsertSupplierQuoteItemPrice`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpsertSupplierQuoteItemPriceVariables } from '@generated/data-connector-web';
import { useUpsertSupplierQuoteItemPrice } from '@generated/data-connector-web/react'

export default function UpsertSupplierQuoteItemPriceComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpsertSupplierQuoteItemPrice();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpsertSupplierQuoteItemPrice(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertSupplierQuoteItemPrice(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertSupplierQuoteItemPrice(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpsertSupplierQuoteItemPrice` Mutation requires an argument of type `UpsertSupplierQuoteItemPriceVariables`:
  const upsertSupplierQuoteItemPriceVars: UpsertSupplierQuoteItemPriceVariables = {
    ownerId: ..., 
    supplierId: ..., 
    templateId: ..., 
    materialUnitPriceCents: ..., 
  };
  mutation.mutate(upsertSupplierQuoteItemPriceVars);
  // Variables can be defined inline as well.
  mutation.mutate({ ownerId: ..., supplierId: ..., templateId: ..., materialUnitPriceCents: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(upsertSupplierQuoteItemPriceVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.supplierQuoteItemPrice_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteSupplierQuoteItemPrice
You can execute the `DeleteSupplierQuoteItemPrice` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteSupplierQuoteItemPrice(options?: useDataConnectMutationOptions<DeleteSupplierQuoteItemPriceData, FirebaseError, DeleteSupplierQuoteItemPriceVariables>): UseDataConnectMutationResult<DeleteSupplierQuoteItemPriceData, DeleteSupplierQuoteItemPriceVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteSupplierQuoteItemPrice(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteSupplierQuoteItemPriceData, FirebaseError, DeleteSupplierQuoteItemPriceVariables>): UseDataConnectMutationResult<DeleteSupplierQuoteItemPriceData, DeleteSupplierQuoteItemPriceVariables>;
```

### Variables
The `DeleteSupplierQuoteItemPrice` Mutation requires an argument of type `DeleteSupplierQuoteItemPriceVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteSupplierQuoteItemPriceVariables {
  supplierId: UUIDString;
  templateId: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteSupplierQuoteItemPrice` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteSupplierQuoteItemPrice` Mutation is of type `DeleteSupplierQuoteItemPriceData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteSupplierQuoteItemPriceData {
  supplierQuoteItemPrice_delete?: SupplierQuoteItemPrice_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteSupplierQuoteItemPrice`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteSupplierQuoteItemPriceVariables } from '@generated/data-connector-web';
import { useDeleteSupplierQuoteItemPrice } from '@generated/data-connector-web/react'

export default function DeleteSupplierQuoteItemPriceComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteSupplierQuoteItemPrice();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteSupplierQuoteItemPrice(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteSupplierQuoteItemPrice(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteSupplierQuoteItemPrice(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteSupplierQuoteItemPrice` Mutation requires an argument of type `DeleteSupplierQuoteItemPriceVariables`:
  const deleteSupplierQuoteItemPriceVars: DeleteSupplierQuoteItemPriceVariables = {
    supplierId: ..., 
    templateId: ..., 
  };
  mutation.mutate(deleteSupplierQuoteItemPriceVars);
  // Variables can be defined inline as well.
  mutation.mutate({ supplierId: ..., templateId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteSupplierQuoteItemPriceVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.supplierQuoteItemPrice_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateQuote
You can execute the `CreateQuote` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateQuote(options?: useDataConnectMutationOptions<CreateQuoteData, FirebaseError, CreateQuoteVariables>): UseDataConnectMutationResult<CreateQuoteData, CreateQuoteVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateQuote(dc: DataConnect, options?: useDataConnectMutationOptions<CreateQuoteData, FirebaseError, CreateQuoteVariables>): UseDataConnectMutationResult<CreateQuoteData, CreateQuoteVariables>;
```

### Variables
The `CreateQuote` Mutation requires an argument of type `CreateQuoteVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateQuoteVariables {
  id: UUIDString;
  ownerId: string;
  projectId: UUIDString;
  supplierId?: UUIDString | null;
  status: string;
}
```
### Return Type
Recall that calling the `CreateQuote` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateQuote` Mutation is of type `CreateQuoteData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateQuoteData {
  quote_insert: Quote_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateQuote`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateQuoteVariables } from '@generated/data-connector-web';
import { useCreateQuote } from '@generated/data-connector-web/react'

export default function CreateQuoteComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateQuote();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateQuote(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuote(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuote(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateQuote` Mutation requires an argument of type `CreateQuoteVariables`:
  const createQuoteVars: CreateQuoteVariables = {
    id: ..., 
    ownerId: ..., 
    projectId: ..., 
    supplierId: ..., // optional
    status: ..., 
  };
  mutation.mutate(createQuoteVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., ownerId: ..., projectId: ..., supplierId: ..., status: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createQuoteVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quote_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateQuote
You can execute the `UpdateQuote` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateQuote(options?: useDataConnectMutationOptions<UpdateQuoteData, FirebaseError, UpdateQuoteVariables>): UseDataConnectMutationResult<UpdateQuoteData, UpdateQuoteVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateQuote(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateQuoteData, FirebaseError, UpdateQuoteVariables>): UseDataConnectMutationResult<UpdateQuoteData, UpdateQuoteVariables>;
```

### Variables
The `UpdateQuote` Mutation requires an argument of type `UpdateQuoteVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateQuoteVariables {
  id: UUIDString;
  supplierId?: UUIDString | null;
  status?: string | null;
}
```
### Return Type
Recall that calling the `UpdateQuote` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateQuote` Mutation is of type `UpdateQuoteData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateQuoteData {
  quote_update?: Quote_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateQuote`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateQuoteVariables } from '@generated/data-connector-web';
import { useUpdateQuote } from '@generated/data-connector-web/react'

export default function UpdateQuoteComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateQuote();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateQuote(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateQuote(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateQuote(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateQuote` Mutation requires an argument of type `UpdateQuoteVariables`:
  const updateQuoteVars: UpdateQuoteVariables = {
    id: ..., 
    supplierId: ..., // optional
    status: ..., // optional
  };
  mutation.mutate(updateQuoteVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., supplierId: ..., status: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateQuoteVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quote_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteQuoteItems
You can execute the `DeleteQuoteItems` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteQuoteItems(options?: useDataConnectMutationOptions<DeleteQuoteItemsData, FirebaseError, DeleteQuoteItemsVariables>): UseDataConnectMutationResult<DeleteQuoteItemsData, DeleteQuoteItemsVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteQuoteItems(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteQuoteItemsData, FirebaseError, DeleteQuoteItemsVariables>): UseDataConnectMutationResult<DeleteQuoteItemsData, DeleteQuoteItemsVariables>;
```

### Variables
The `DeleteQuoteItems` Mutation requires an argument of type `DeleteQuoteItemsVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteQuoteItemsVariables {
  quoteId: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteQuoteItems` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteQuoteItems` Mutation is of type `DeleteQuoteItemsData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteQuoteItemsData {
  quoteItem_deleteMany: number;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteQuoteItems`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteQuoteItemsVariables } from '@generated/data-connector-web';
import { useDeleteQuoteItems } from '@generated/data-connector-web/react'

export default function DeleteQuoteItemsComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteQuoteItems();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteQuoteItems(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteQuoteItems(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteQuoteItems(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteQuoteItems` Mutation requires an argument of type `DeleteQuoteItemsVariables`:
  const deleteQuoteItemsVars: DeleteQuoteItemsVariables = {
    quoteId: ..., 
  };
  mutation.mutate(deleteQuoteItemsVars);
  // Variables can be defined inline as well.
  mutation.mutate({ quoteId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteQuoteItemsVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quoteItem_deleteMany);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateQuoteItem
You can execute the `CreateQuoteItem` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateQuoteItem(options?: useDataConnectMutationOptions<CreateQuoteItemData, FirebaseError, CreateQuoteItemVariables>): UseDataConnectMutationResult<CreateQuoteItemData, CreateQuoteItemVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateQuoteItem(dc: DataConnect, options?: useDataConnectMutationOptions<CreateQuoteItemData, FirebaseError, CreateQuoteItemVariables>): UseDataConnectMutationResult<CreateQuoteItemData, CreateQuoteItemVariables>;
```

### Variables
The `CreateQuoteItem` Mutation requires an argument of type `CreateQuoteItemVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateQuoteItemVariables {
  id: UUIDString;
  ownerId: string;
  quoteId: UUIDString;
  sourceTemplateId?: UUIDString | null;
  displayOrder: number;
  name: string;
  quantity: number;
  quantitySourceId?: UUIDString | null;
  unitPriceCents: number;
  materialUnitPriceCents: number;
  labourUnitPriceCents: number;
  matchedKeywords: string[];
}
```
### Return Type
Recall that calling the `CreateQuoteItem` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateQuoteItem` Mutation is of type `CreateQuoteItemData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateQuoteItemData {
  quoteItem_insert: QuoteItem_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateQuoteItem`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateQuoteItemVariables } from '@generated/data-connector-web';
import { useCreateQuoteItem } from '@generated/data-connector-web/react'

export default function CreateQuoteItemComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateQuoteItem();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateQuoteItem(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuoteItem(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuoteItem(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateQuoteItem` Mutation requires an argument of type `CreateQuoteItemVariables`:
  const createQuoteItemVars: CreateQuoteItemVariables = {
    id: ..., 
    ownerId: ..., 
    quoteId: ..., 
    sourceTemplateId: ..., // optional
    displayOrder: ..., 
    name: ..., 
    quantity: ..., 
    quantitySourceId: ..., // optional
    unitPriceCents: ..., 
    materialUnitPriceCents: ..., 
    labourUnitPriceCents: ..., 
    matchedKeywords: ..., 
  };
  mutation.mutate(createQuoteItemVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., ownerId: ..., quoteId: ..., sourceTemplateId: ..., displayOrder: ..., name: ..., quantity: ..., quantitySourceId: ..., unitPriceCents: ..., materialUnitPriceCents: ..., labourUnitPriceCents: ..., matchedKeywords: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createQuoteItemVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quoteItem_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateQuoteItem
You can execute the `UpdateQuoteItem` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateQuoteItem(options?: useDataConnectMutationOptions<UpdateQuoteItemData, FirebaseError, UpdateQuoteItemVariables>): UseDataConnectMutationResult<UpdateQuoteItemData, UpdateQuoteItemVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateQuoteItem(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateQuoteItemData, FirebaseError, UpdateQuoteItemVariables>): UseDataConnectMutationResult<UpdateQuoteItemData, UpdateQuoteItemVariables>;
```

### Variables
The `UpdateQuoteItem` Mutation requires an argument of type `UpdateQuoteItemVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateQuoteItemVariables {
  id: UUIDString;
  displayOrder?: number | null;
  name?: string | null;
  quantity?: number | null;
  quantitySourceId?: UUIDString | null;
  unitPriceCents?: number | null;
  materialUnitPriceCents?: number | null;
  labourUnitPriceCents?: number | null;
  matchedKeywords?: string[] | null;
}
```
### Return Type
Recall that calling the `UpdateQuoteItem` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateQuoteItem` Mutation is of type `UpdateQuoteItemData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateQuoteItemData {
  quoteItem_update?: QuoteItem_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateQuoteItem`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateQuoteItemVariables } from '@generated/data-connector-web';
import { useUpdateQuoteItem } from '@generated/data-connector-web/react'

export default function UpdateQuoteItemComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateQuoteItem();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateQuoteItem(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateQuoteItem(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateQuoteItem(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateQuoteItem` Mutation requires an argument of type `UpdateQuoteItemVariables`:
  const updateQuoteItemVars: UpdateQuoteItemVariables = {
    id: ..., 
    displayOrder: ..., // optional
    name: ..., // optional
    quantity: ..., // optional
    quantitySourceId: ..., // optional
    unitPriceCents: ..., // optional
    materialUnitPriceCents: ..., // optional
    labourUnitPriceCents: ..., // optional
    matchedKeywords: ..., // optional
  };
  mutation.mutate(updateQuoteItemVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., displayOrder: ..., name: ..., quantity: ..., quantitySourceId: ..., unitPriceCents: ..., materialUnitPriceCents: ..., labourUnitPriceCents: ..., matchedKeywords: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateQuoteItemVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quoteItem_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateReminder
You can execute the `CreateReminder` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateReminder(options?: useDataConnectMutationOptions<CreateReminderData, FirebaseError, CreateReminderVariables>): UseDataConnectMutationResult<CreateReminderData, CreateReminderVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateReminder(dc: DataConnect, options?: useDataConnectMutationOptions<CreateReminderData, FirebaseError, CreateReminderVariables>): UseDataConnectMutationResult<CreateReminderData, CreateReminderVariables>;
```

### Variables
The `CreateReminder` Mutation requires an argument of type `CreateReminderVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateReminderVariables {
  id: UUIDString;
  ownerId: string;
  projectId: UUIDString;
  accountId?: UUIDString | null;
  name: string;
  status: string;
  dueAt: TimestampString;
}
```
### Return Type
Recall that calling the `CreateReminder` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateReminder` Mutation is of type `CreateReminderData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateReminderData {
  reminder_insert: Reminder_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateReminder`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateReminderVariables } from '@generated/data-connector-web';
import { useCreateReminder } from '@generated/data-connector-web/react'

export default function CreateReminderComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateReminder();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateReminder(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateReminder(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateReminder(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateReminder` Mutation requires an argument of type `CreateReminderVariables`:
  const createReminderVars: CreateReminderVariables = {
    id: ..., 
    ownerId: ..., 
    projectId: ..., 
    accountId: ..., // optional
    name: ..., 
    status: ..., 
    dueAt: ..., 
  };
  mutation.mutate(createReminderVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., ownerId: ..., projectId: ..., accountId: ..., name: ..., status: ..., dueAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createReminderVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.reminder_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateReminder
You can execute the `UpdateReminder` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateReminder(options?: useDataConnectMutationOptions<UpdateReminderData, FirebaseError, UpdateReminderVariables>): UseDataConnectMutationResult<UpdateReminderData, UpdateReminderVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateReminder(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateReminderData, FirebaseError, UpdateReminderVariables>): UseDataConnectMutationResult<UpdateReminderData, UpdateReminderVariables>;
```

### Variables
The `UpdateReminder` Mutation requires an argument of type `UpdateReminderVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateReminderVariables {
  id: UUIDString;
  accountId?: UUIDString | null;
  name?: string | null;
  status?: string | null;
  dueAt?: TimestampString | null;
  completedAt?: TimestampString | null;
}
```
### Return Type
Recall that calling the `UpdateReminder` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateReminder` Mutation is of type `UpdateReminderData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateReminderData {
  reminder_update?: Reminder_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateReminder`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateReminderVariables } from '@generated/data-connector-web';
import { useUpdateReminder } from '@generated/data-connector-web/react'

export default function UpdateReminderComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateReminder();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateReminder(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateReminder(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateReminder(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateReminder` Mutation requires an argument of type `UpdateReminderVariables`:
  const updateReminderVars: UpdateReminderVariables = {
    id: ..., 
    accountId: ..., // optional
    name: ..., // optional
    status: ..., // optional
    dueAt: ..., // optional
    completedAt: ..., // optional
  };
  mutation.mutate(updateReminderVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., accountId: ..., name: ..., status: ..., dueAt: ..., completedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateReminderVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.reminder_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpsertUserSettings
You can execute the `UpsertUserSettings` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpsertUserSettings(options?: useDataConnectMutationOptions<UpsertUserSettingsData, FirebaseError, UpsertUserSettingsVariables>): UseDataConnectMutationResult<UpsertUserSettingsData, UpsertUserSettingsVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpsertUserSettings(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertUserSettingsData, FirebaseError, UpsertUserSettingsVariables>): UseDataConnectMutationResult<UpsertUserSettingsData, UpsertUserSettingsVariables>;
```

### Variables
The `UpsertUserSettings` Mutation requires an argument of type `UpsertUserSettingsVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpsertUserSettingsVariables {
  ownerId: string;
  quoteFollowUpEnabled: boolean;
  quoteFollowUpDays: number;
}
```
### Return Type
Recall that calling the `UpsertUserSettings` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpsertUserSettings` Mutation is of type `UpsertUserSettingsData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertUserSettingsData {
  userSettings_upsert: UserSettings_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpsertUserSettings`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpsertUserSettingsVariables } from '@generated/data-connector-web';
import { useUpsertUserSettings } from '@generated/data-connector-web/react'

export default function UpsertUserSettingsComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpsertUserSettings();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpsertUserSettings(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertUserSettings(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertUserSettings(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpsertUserSettings` Mutation requires an argument of type `UpsertUserSettingsVariables`:
  const upsertUserSettingsVars: UpsertUserSettingsVariables = {
    ownerId: ..., 
    quoteFollowUpEnabled: ..., 
    quoteFollowUpDays: ..., 
  };
  mutation.mutate(upsertUserSettingsVars);
  // Variables can be defined inline as well.
  mutation.mutate({ ownerId: ..., quoteFollowUpEnabled: ..., quoteFollowUpDays: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(upsertUserSettingsVars, options);

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

