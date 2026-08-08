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
  - [*ListMyCompanies*](#listmycompanies)
  - [*GetMyCompany*](#getmycompany)
  - [*ListMyCompanyContacts*](#listmycompanycontacts)
  - [*ListQuestionnaireTemplates*](#listquestionnairetemplates)
  - [*GetQuestionnaireTemplate*](#getquestionnairetemplate)
  - [*ListProjectQuestionnaires*](#listprojectquestionnaires)
  - [*GetProjectQuestionnaire*](#getprojectquestionnaire)
  - [*GetMyTeam*](#getmyteam)
  - [*GetMyUserSettings*](#getmyusersettings)
  - [*GetMyUserSignature*](#getmyusersignature)
- [**Mutations**](#mutations)
  - [*CreateMyCompany*](#createmycompany)
  - [*UpdateMyCompany*](#updatemycompany)
  - [*SetMyCompanyPrimaryContact*](#setmycompanyprimarycontact)
  - [*ClearMyCompanyPrimaryContact*](#clearmycompanyprimarycontact)
  - [*DeleteMyCompany*](#deletemycompany)
  - [*CreateMyCompanyContact*](#createmycompanycontact)
  - [*UpdateMyCompanyContact*](#updatemycompanycontact)
  - [*DeleteMyCompanyContact*](#deletemycompanycontact)
  - [*CreateQuestionnaireTemplate*](#createquestionnairetemplate)
  - [*CreateQuestionnaireTemplateQuestion*](#createquestionnairetemplatequestion)
  - [*UpdateQuestionnaireTemplateName*](#updatequestionnairetemplatename)
  - [*UpdateQuestionnaireTemplateQuestion*](#updatequestionnairetemplatequestion)
  - [*DeleteQuestionnaireTemplateQuestion*](#deletequestionnairetemplatequestion)
  - [*DeleteQuestionnaireTemplate*](#deletequestionnairetemplate)
  - [*EnsureProjectQuestionnaire*](#ensureprojectquestionnaire)
  - [*ApplyQuestionnaireTemplateToProject*](#applyquestionnairetemplatetoproject)
  - [*CreateProjectQuestionnaireQuestion*](#createprojectquestionnairequestion)
  - [*UpdateProjectQuestionnaireQuestion*](#updateprojectquestionnairequestion)
  - [*UpdateProjectQuestionnaireQuestionAnswer*](#updateprojectquestionnairequestionanswer)
  - [*UpdateProjectQuestionnaireQuestionAnswerSource*](#updateprojectquestionnairequestionanswersource)
  - [*DeleteProjectQuestionnaireQuestion*](#deleteprojectquestionnairequestion)
  - [*UpsertMyUserSettings*](#upsertmyusersettings)
  - [*UpsertMyUserSignature*](#upsertmyusersignature)

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

## ListMyCompanies
You can execute the `ListMyCompanies` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useListMyCompanies(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyCompaniesData>): UseDataConnectQueryResult<ListMyCompaniesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListMyCompanies(options?: useDataConnectQueryOptions<ListMyCompaniesData>): UseDataConnectQueryResult<ListMyCompaniesData, undefined>;
```

### Variables
The `ListMyCompanies` Query has no variables.
### Return Type
Recall that calling the `ListMyCompanies` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListMyCompanies` Query is of type `ListMyCompaniesData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListMyCompaniesData {
  companies: ({
    id: UUIDString;
    teamId: string;
    companyName: string;
    businessNumber?: string | null;
    phoneNumber?: string | null;
    primaryContactId?: UUIDString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Company_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListMyCompanies`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@generated/data-connector-web';
import { useListMyCompanies } from '@generated/data-connector-web/react'

export default function ListMyCompaniesComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListMyCompanies();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListMyCompanies(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListMyCompanies(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListMyCompanies(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.companies);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetMyCompany
You can execute the `GetMyCompany` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useGetMyCompany(dc: DataConnect, vars: GetMyCompanyVariables, options?: useDataConnectQueryOptions<GetMyCompanyData>): UseDataConnectQueryResult<GetMyCompanyData, GetMyCompanyVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetMyCompany(vars: GetMyCompanyVariables, options?: useDataConnectQueryOptions<GetMyCompanyData>): UseDataConnectQueryResult<GetMyCompanyData, GetMyCompanyVariables>;
```

### Variables
The `GetMyCompany` Query requires an argument of type `GetMyCompanyVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetMyCompanyVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetMyCompany` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetMyCompany` Query is of type `GetMyCompanyData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetMyCompanyData {
  company?: {
    id: UUIDString;
    teamId: string;
    companyName: string;
    businessNumber?: string | null;
    phoneNumber?: string | null;
    primaryContactId?: UUIDString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    contacts: ({
      id: UUIDString;
      companyId: UUIDString;
      name: string;
      email?: string | null;
      phoneNumber?: string | null;
      role?: string | null;
      createdAt: TimestampString;
      updatedAt: TimestampString;
    } & CompanyContact_Key)[];
  } & Company_Key;
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetMyCompany`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetMyCompanyVariables } from '@generated/data-connector-web';
import { useGetMyCompany } from '@generated/data-connector-web/react'

export default function GetMyCompanyComponent() {
  // The `useGetMyCompany` Query hook requires an argument of type `GetMyCompanyVariables`:
  const getMyCompanyVars: GetMyCompanyVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetMyCompany(getMyCompanyVars);
  // Variables can be defined inline as well.
  const query = useGetMyCompany({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetMyCompany(dataConnect, getMyCompanyVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetMyCompany(getMyCompanyVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetMyCompany(dataConnect, getMyCompanyVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.company);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListMyCompanyContacts
You can execute the `ListMyCompanyContacts` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useListMyCompanyContacts(dc: DataConnect, vars: ListMyCompanyContactsVariables, options?: useDataConnectQueryOptions<ListMyCompanyContactsData>): UseDataConnectQueryResult<ListMyCompanyContactsData, ListMyCompanyContactsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListMyCompanyContacts(vars: ListMyCompanyContactsVariables, options?: useDataConnectQueryOptions<ListMyCompanyContactsData>): UseDataConnectQueryResult<ListMyCompanyContactsData, ListMyCompanyContactsVariables>;
```

### Variables
The `ListMyCompanyContacts` Query requires an argument of type `ListMyCompanyContactsVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListMyCompanyContactsVariables {
  companyId: UUIDString;
}
```
### Return Type
Recall that calling the `ListMyCompanyContacts` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListMyCompanyContacts` Query is of type `ListMyCompanyContactsData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListMyCompanyContactsData {
  companyContacts: ({
    id: UUIDString;
    companyId: UUIDString;
    name: string;
    email?: string | null;
    phoneNumber?: string | null;
    role?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & CompanyContact_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListMyCompanyContacts`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListMyCompanyContactsVariables } from '@generated/data-connector-web';
import { useListMyCompanyContacts } from '@generated/data-connector-web/react'

export default function ListMyCompanyContactsComponent() {
  // The `useListMyCompanyContacts` Query hook requires an argument of type `ListMyCompanyContactsVariables`:
  const listMyCompanyContactsVars: ListMyCompanyContactsVariables = {
    companyId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListMyCompanyContacts(listMyCompanyContactsVars);
  // Variables can be defined inline as well.
  const query = useListMyCompanyContacts({ companyId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListMyCompanyContacts(dataConnect, listMyCompanyContactsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListMyCompanyContacts(listMyCompanyContactsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListMyCompanyContacts(dataConnect, listMyCompanyContactsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.companyContacts);
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
    teamId: string;
    name: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    questions: ({
      id: UUIDString;
      label: string;
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

## ListProjectQuestionnaires
You can execute the `ListProjectQuestionnaires` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useListProjectQuestionnaires(dc: DataConnect, options?: useDataConnectQueryOptions<ListProjectQuestionnairesData>): UseDataConnectQueryResult<ListProjectQuestionnairesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListProjectQuestionnaires(options?: useDataConnectQueryOptions<ListProjectQuestionnairesData>): UseDataConnectQueryResult<ListProjectQuestionnairesData, undefined>;
```

### Variables
The `ListProjectQuestionnaires` Query has no variables.
### Return Type
Recall that calling the `ListProjectQuestionnaires` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListProjectQuestionnaires` Query is of type `ListProjectQuestionnairesData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListProjectQuestionnairesData {
  projectQuestionnaires: ({
    projectId: UUIDString;
    updatedAt: TimestampString;
    project: {
      name: string;
    };
    questions: ({
      id: UUIDString;
      answer?: string | null;
    } & ProjectQuestionnaireQuestion_Key)[];
  } & ProjectQuestionnaire_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListProjectQuestionnaires`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@generated/data-connector-web';
import { useListProjectQuestionnaires } from '@generated/data-connector-web/react'

export default function ListProjectQuestionnairesComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListProjectQuestionnaires();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListProjectQuestionnaires(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListProjectQuestionnaires(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListProjectQuestionnaires(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.projectQuestionnaires);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetProjectQuestionnaire
You can execute the `GetProjectQuestionnaire` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useGetProjectQuestionnaire(dc: DataConnect, vars: GetProjectQuestionnaireVariables, options?: useDataConnectQueryOptions<GetProjectQuestionnaireData>): UseDataConnectQueryResult<GetProjectQuestionnaireData, GetProjectQuestionnaireVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetProjectQuestionnaire(vars: GetProjectQuestionnaireVariables, options?: useDataConnectQueryOptions<GetProjectQuestionnaireData>): UseDataConnectQueryResult<GetProjectQuestionnaireData, GetProjectQuestionnaireVariables>;
```

### Variables
The `GetProjectQuestionnaire` Query requires an argument of type `GetProjectQuestionnaireVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetProjectQuestionnaireVariables {
  projectId: UUIDString;
}
```
### Return Type
Recall that calling the `GetProjectQuestionnaire` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetProjectQuestionnaire` Query is of type `GetProjectQuestionnaireData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetProjectQuestionnaireData {
  projectQuestionnaire?: {
    projectId: UUIDString;
    sourceTemplateId?: UUIDString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    questions: ({
      id: UUIDString;
      label: string;
      position: number;
      answer?: string | null;
      answerSource: string;
    } & ProjectQuestionnaireQuestion_Key)[];
  } & ProjectQuestionnaire_Key;
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetProjectQuestionnaire`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetProjectQuestionnaireVariables } from '@generated/data-connector-web';
import { useGetProjectQuestionnaire } from '@generated/data-connector-web/react'

export default function GetProjectQuestionnaireComponent() {
  // The `useGetProjectQuestionnaire` Query hook requires an argument of type `GetProjectQuestionnaireVariables`:
  const getProjectQuestionnaireVars: GetProjectQuestionnaireVariables = {
    projectId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetProjectQuestionnaire(getProjectQuestionnaireVars);
  // Variables can be defined inline as well.
  const query = useGetProjectQuestionnaire({ projectId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetProjectQuestionnaire(dataConnect, getProjectQuestionnaireVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetProjectQuestionnaire(getProjectQuestionnaireVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetProjectQuestionnaire(dataConnect, getProjectQuestionnaireVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.projectQuestionnaire);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetMyTeam
You can execute the `GetMyTeam` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useGetMyTeam(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyTeamData>): UseDataConnectQueryResult<GetMyTeamData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetMyTeam(options?: useDataConnectQueryOptions<GetMyTeamData>): UseDataConnectQueryResult<GetMyTeamData, undefined>;
```

### Variables
The `GetMyTeam` Query has no variables.
### Return Type
Recall that calling the `GetMyTeam` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetMyTeam` Query is of type `GetMyTeamData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetMyTeamData {
  teamMembers: ({
    teamId: string;
    role: string;
    team: {
      id: string;
      name: string;
    } & Team_Key;
  })[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetMyTeam`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@generated/data-connector-web';
import { useGetMyTeam } from '@generated/data-connector-web/react'

export default function GetMyTeamComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetMyTeam();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetMyTeam(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetMyTeam(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetMyTeam(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.teamMembers);
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

## GetMyUserSignature
You can execute the `GetMyUserSignature` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useGetMyUserSignature(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyUserSignatureData>): UseDataConnectQueryResult<GetMyUserSignatureData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetMyUserSignature(options?: useDataConnectQueryOptions<GetMyUserSignatureData>): UseDataConnectQueryResult<GetMyUserSignatureData, undefined>;
```

### Variables
The `GetMyUserSignature` Query has no variables.
### Return Type
Recall that calling the `GetMyUserSignature` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetMyUserSignature` Query is of type `GetMyUserSignatureData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetMyUserSignatureData {
  userSignature?: {
    ownerId: string;
    name?: string | null;
    companyName?: string | null;
    address?: string | null;
    mobile?: string | null;
    phone?: string | null;
    email?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & UserSignature_Key;
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetMyUserSignature`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@generated/data-connector-web';
import { useGetMyUserSignature } from '@generated/data-connector-web/react'

export default function GetMyUserSignatureComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetMyUserSignature();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetMyUserSignature(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetMyUserSignature(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetMyUserSignature(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.userSignature);
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

## CreateMyCompany
You can execute the `CreateMyCompany` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateMyCompany(options?: useDataConnectMutationOptions<CreateMyCompanyData, FirebaseError, CreateMyCompanyVariables>): UseDataConnectMutationResult<CreateMyCompanyData, CreateMyCompanyVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateMyCompany(dc: DataConnect, options?: useDataConnectMutationOptions<CreateMyCompanyData, FirebaseError, CreateMyCompanyVariables>): UseDataConnectMutationResult<CreateMyCompanyData, CreateMyCompanyVariables>;
```

### Variables
The `CreateMyCompany` Mutation requires an argument of type `CreateMyCompanyVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateMyCompanyVariables {
  id: UUIDString;
  companyName: string;
  businessNumber?: string | null;
  phoneNumber?: string | null;
}
```
### Return Type
Recall that calling the `CreateMyCompany` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateMyCompany` Mutation is of type `CreateMyCompanyData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateMyCompanyData {
  company_insert: Company_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateMyCompany`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateMyCompanyVariables } from '@generated/data-connector-web';
import { useCreateMyCompany } from '@generated/data-connector-web/react'

export default function CreateMyCompanyComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateMyCompany();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateMyCompany(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateMyCompany(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateMyCompany(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateMyCompany` Mutation requires an argument of type `CreateMyCompanyVariables`:
  const createMyCompanyVars: CreateMyCompanyVariables = {
    id: ..., 
    companyName: ..., 
    businessNumber: ..., // optional
    phoneNumber: ..., // optional
  };
  mutation.mutate(createMyCompanyVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., companyName: ..., businessNumber: ..., phoneNumber: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createMyCompanyVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.company_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateMyCompany
You can execute the `UpdateMyCompany` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateMyCompany(options?: useDataConnectMutationOptions<UpdateMyCompanyData, FirebaseError, UpdateMyCompanyVariables>): UseDataConnectMutationResult<UpdateMyCompanyData, UpdateMyCompanyVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateMyCompany(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateMyCompanyData, FirebaseError, UpdateMyCompanyVariables>): UseDataConnectMutationResult<UpdateMyCompanyData, UpdateMyCompanyVariables>;
```

### Variables
The `UpdateMyCompany` Mutation requires an argument of type `UpdateMyCompanyVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateMyCompanyVariables {
  id: UUIDString;
  companyName: string;
  businessNumber?: string | null;
  phoneNumber?: string | null;
}
```
### Return Type
Recall that calling the `UpdateMyCompany` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateMyCompany` Mutation is of type `UpdateMyCompanyData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateMyCompanyData {
  company_update?: Company_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateMyCompany`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateMyCompanyVariables } from '@generated/data-connector-web';
import { useUpdateMyCompany } from '@generated/data-connector-web/react'

export default function UpdateMyCompanyComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateMyCompany();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateMyCompany(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateMyCompany(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateMyCompany(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateMyCompany` Mutation requires an argument of type `UpdateMyCompanyVariables`:
  const updateMyCompanyVars: UpdateMyCompanyVariables = {
    id: ..., 
    companyName: ..., 
    businessNumber: ..., // optional
    phoneNumber: ..., // optional
  };
  mutation.mutate(updateMyCompanyVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., companyName: ..., businessNumber: ..., phoneNumber: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateMyCompanyVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.company_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## SetMyCompanyPrimaryContact
You can execute the `SetMyCompanyPrimaryContact` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useSetMyCompanyPrimaryContact(options?: useDataConnectMutationOptions<SetMyCompanyPrimaryContactData, FirebaseError, SetMyCompanyPrimaryContactVariables>): UseDataConnectMutationResult<SetMyCompanyPrimaryContactData, SetMyCompanyPrimaryContactVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useSetMyCompanyPrimaryContact(dc: DataConnect, options?: useDataConnectMutationOptions<SetMyCompanyPrimaryContactData, FirebaseError, SetMyCompanyPrimaryContactVariables>): UseDataConnectMutationResult<SetMyCompanyPrimaryContactData, SetMyCompanyPrimaryContactVariables>;
```

### Variables
The `SetMyCompanyPrimaryContact` Mutation requires an argument of type `SetMyCompanyPrimaryContactVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SetMyCompanyPrimaryContactVariables {
  companyId: UUIDString;
  contactId: UUIDString;
}
```
### Return Type
Recall that calling the `SetMyCompanyPrimaryContact` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `SetMyCompanyPrimaryContact` Mutation is of type `SetMyCompanyPrimaryContactData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface SetMyCompanyPrimaryContactData {
  company_update?: Company_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `SetMyCompanyPrimaryContact`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, SetMyCompanyPrimaryContactVariables } from '@generated/data-connector-web';
import { useSetMyCompanyPrimaryContact } from '@generated/data-connector-web/react'

export default function SetMyCompanyPrimaryContactComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useSetMyCompanyPrimaryContact();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useSetMyCompanyPrimaryContact(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSetMyCompanyPrimaryContact(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSetMyCompanyPrimaryContact(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useSetMyCompanyPrimaryContact` Mutation requires an argument of type `SetMyCompanyPrimaryContactVariables`:
  const setMyCompanyPrimaryContactVars: SetMyCompanyPrimaryContactVariables = {
    companyId: ..., 
    contactId: ..., 
  };
  mutation.mutate(setMyCompanyPrimaryContactVars);
  // Variables can be defined inline as well.
  mutation.mutate({ companyId: ..., contactId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(setMyCompanyPrimaryContactVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.company_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ClearMyCompanyPrimaryContact
You can execute the `ClearMyCompanyPrimaryContact` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useClearMyCompanyPrimaryContact(options?: useDataConnectMutationOptions<ClearMyCompanyPrimaryContactData, FirebaseError, ClearMyCompanyPrimaryContactVariables>): UseDataConnectMutationResult<ClearMyCompanyPrimaryContactData, ClearMyCompanyPrimaryContactVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useClearMyCompanyPrimaryContact(dc: DataConnect, options?: useDataConnectMutationOptions<ClearMyCompanyPrimaryContactData, FirebaseError, ClearMyCompanyPrimaryContactVariables>): UseDataConnectMutationResult<ClearMyCompanyPrimaryContactData, ClearMyCompanyPrimaryContactVariables>;
```

### Variables
The `ClearMyCompanyPrimaryContact` Mutation requires an argument of type `ClearMyCompanyPrimaryContactVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ClearMyCompanyPrimaryContactVariables {
  companyId: UUIDString;
}
```
### Return Type
Recall that calling the `ClearMyCompanyPrimaryContact` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ClearMyCompanyPrimaryContact` Mutation is of type `ClearMyCompanyPrimaryContactData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ClearMyCompanyPrimaryContactData {
  company_update?: Company_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ClearMyCompanyPrimaryContact`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ClearMyCompanyPrimaryContactVariables } from '@generated/data-connector-web';
import { useClearMyCompanyPrimaryContact } from '@generated/data-connector-web/react'

export default function ClearMyCompanyPrimaryContactComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useClearMyCompanyPrimaryContact();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useClearMyCompanyPrimaryContact(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useClearMyCompanyPrimaryContact(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useClearMyCompanyPrimaryContact(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useClearMyCompanyPrimaryContact` Mutation requires an argument of type `ClearMyCompanyPrimaryContactVariables`:
  const clearMyCompanyPrimaryContactVars: ClearMyCompanyPrimaryContactVariables = {
    companyId: ..., 
  };
  mutation.mutate(clearMyCompanyPrimaryContactVars);
  // Variables can be defined inline as well.
  mutation.mutate({ companyId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(clearMyCompanyPrimaryContactVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.company_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteMyCompany
You can execute the `DeleteMyCompany` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteMyCompany(options?: useDataConnectMutationOptions<DeleteMyCompanyData, FirebaseError, DeleteMyCompanyVariables>): UseDataConnectMutationResult<DeleteMyCompanyData, DeleteMyCompanyVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteMyCompany(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteMyCompanyData, FirebaseError, DeleteMyCompanyVariables>): UseDataConnectMutationResult<DeleteMyCompanyData, DeleteMyCompanyVariables>;
```

### Variables
The `DeleteMyCompany` Mutation requires an argument of type `DeleteMyCompanyVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteMyCompanyVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteMyCompany` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteMyCompany` Mutation is of type `DeleteMyCompanyData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteMyCompanyData {
  companyContact_deleteMany: number;
  company_delete?: Company_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteMyCompany`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteMyCompanyVariables } from '@generated/data-connector-web';
import { useDeleteMyCompany } from '@generated/data-connector-web/react'

export default function DeleteMyCompanyComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteMyCompany();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteMyCompany(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteMyCompany(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteMyCompany(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteMyCompany` Mutation requires an argument of type `DeleteMyCompanyVariables`:
  const deleteMyCompanyVars: DeleteMyCompanyVariables = {
    id: ..., 
  };
  mutation.mutate(deleteMyCompanyVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteMyCompanyVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.companyContact_deleteMany);
    console.log(mutation.data.company_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateMyCompanyContact
You can execute the `CreateMyCompanyContact` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateMyCompanyContact(options?: useDataConnectMutationOptions<CreateMyCompanyContactData, FirebaseError, CreateMyCompanyContactVariables>): UseDataConnectMutationResult<CreateMyCompanyContactData, CreateMyCompanyContactVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateMyCompanyContact(dc: DataConnect, options?: useDataConnectMutationOptions<CreateMyCompanyContactData, FirebaseError, CreateMyCompanyContactVariables>): UseDataConnectMutationResult<CreateMyCompanyContactData, CreateMyCompanyContactVariables>;
```

### Variables
The `CreateMyCompanyContact` Mutation requires an argument of type `CreateMyCompanyContactVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateMyCompanyContactVariables {
  id: UUIDString;
  companyId: UUIDString;
  name: string;
  email?: string | null;
  phoneNumber?: string | null;
  role?: string | null;
}
```
### Return Type
Recall that calling the `CreateMyCompanyContact` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateMyCompanyContact` Mutation is of type `CreateMyCompanyContactData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateMyCompanyContactData {
  companyContact_insert: CompanyContact_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateMyCompanyContact`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateMyCompanyContactVariables } from '@generated/data-connector-web';
import { useCreateMyCompanyContact } from '@generated/data-connector-web/react'

export default function CreateMyCompanyContactComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateMyCompanyContact();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateMyCompanyContact(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateMyCompanyContact(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateMyCompanyContact(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateMyCompanyContact` Mutation requires an argument of type `CreateMyCompanyContactVariables`:
  const createMyCompanyContactVars: CreateMyCompanyContactVariables = {
    id: ..., 
    companyId: ..., 
    name: ..., 
    email: ..., // optional
    phoneNumber: ..., // optional
    role: ..., // optional
  };
  mutation.mutate(createMyCompanyContactVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., companyId: ..., name: ..., email: ..., phoneNumber: ..., role: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createMyCompanyContactVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.companyContact_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateMyCompanyContact
You can execute the `UpdateMyCompanyContact` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateMyCompanyContact(options?: useDataConnectMutationOptions<UpdateMyCompanyContactData, FirebaseError, UpdateMyCompanyContactVariables>): UseDataConnectMutationResult<UpdateMyCompanyContactData, UpdateMyCompanyContactVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateMyCompanyContact(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateMyCompanyContactData, FirebaseError, UpdateMyCompanyContactVariables>): UseDataConnectMutationResult<UpdateMyCompanyContactData, UpdateMyCompanyContactVariables>;
```

### Variables
The `UpdateMyCompanyContact` Mutation requires an argument of type `UpdateMyCompanyContactVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateMyCompanyContactVariables {
  companyId: UUIDString;
  contactId: UUIDString;
  name: string;
  email?: string | null;
  phoneNumber?: string | null;
  role?: string | null;
}
```
### Return Type
Recall that calling the `UpdateMyCompanyContact` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateMyCompanyContact` Mutation is of type `UpdateMyCompanyContactData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateMyCompanyContactData {
  companyContact_update?: CompanyContact_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateMyCompanyContact`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateMyCompanyContactVariables } from '@generated/data-connector-web';
import { useUpdateMyCompanyContact } from '@generated/data-connector-web/react'

export default function UpdateMyCompanyContactComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateMyCompanyContact();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateMyCompanyContact(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateMyCompanyContact(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateMyCompanyContact(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateMyCompanyContact` Mutation requires an argument of type `UpdateMyCompanyContactVariables`:
  const updateMyCompanyContactVars: UpdateMyCompanyContactVariables = {
    companyId: ..., 
    contactId: ..., 
    name: ..., 
    email: ..., // optional
    phoneNumber: ..., // optional
    role: ..., // optional
  };
  mutation.mutate(updateMyCompanyContactVars);
  // Variables can be defined inline as well.
  mutation.mutate({ companyId: ..., contactId: ..., name: ..., email: ..., phoneNumber: ..., role: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateMyCompanyContactVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.companyContact_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteMyCompanyContact
You can execute the `DeleteMyCompanyContact` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteMyCompanyContact(options?: useDataConnectMutationOptions<DeleteMyCompanyContactData, FirebaseError, DeleteMyCompanyContactVariables>): UseDataConnectMutationResult<DeleteMyCompanyContactData, DeleteMyCompanyContactVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteMyCompanyContact(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteMyCompanyContactData, FirebaseError, DeleteMyCompanyContactVariables>): UseDataConnectMutationResult<DeleteMyCompanyContactData, DeleteMyCompanyContactVariables>;
```

### Variables
The `DeleteMyCompanyContact` Mutation requires an argument of type `DeleteMyCompanyContactVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteMyCompanyContactVariables {
  companyId: UUIDString;
  contactId: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteMyCompanyContact` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteMyCompanyContact` Mutation is of type `DeleteMyCompanyContactData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteMyCompanyContactData {
  company_update?: Company_Key | null;
  companyContact_delete?: CompanyContact_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteMyCompanyContact`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteMyCompanyContactVariables } from '@generated/data-connector-web';
import { useDeleteMyCompanyContact } from '@generated/data-connector-web/react'

export default function DeleteMyCompanyContactComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteMyCompanyContact();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteMyCompanyContact(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteMyCompanyContact(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteMyCompanyContact(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteMyCompanyContact` Mutation requires an argument of type `DeleteMyCompanyContactVariables`:
  const deleteMyCompanyContactVars: DeleteMyCompanyContactVariables = {
    companyId: ..., 
    contactId: ..., 
  };
  mutation.mutate(deleteMyCompanyContactVars);
  // Variables can be defined inline as well.
  mutation.mutate({ companyId: ..., contactId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteMyCompanyContactVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.company_update);
    console.log(mutation.data.companyContact_delete);
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
  };
  mutation.mutate(createQuestionnaireTemplateQuestionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., templateId: ..., label: ..., position: ..., });

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
  };
  mutation.mutate(updateQuestionnaireTemplateQuestionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., templateId: ..., label: ..., position: ..., });

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

## EnsureProjectQuestionnaire
You can execute the `EnsureProjectQuestionnaire` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useEnsureProjectQuestionnaire(options?: useDataConnectMutationOptions<EnsureProjectQuestionnaireData, FirebaseError, EnsureProjectQuestionnaireVariables>): UseDataConnectMutationResult<EnsureProjectQuestionnaireData, EnsureProjectQuestionnaireVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useEnsureProjectQuestionnaire(dc: DataConnect, options?: useDataConnectMutationOptions<EnsureProjectQuestionnaireData, FirebaseError, EnsureProjectQuestionnaireVariables>): UseDataConnectMutationResult<EnsureProjectQuestionnaireData, EnsureProjectQuestionnaireVariables>;
```

### Variables
The `EnsureProjectQuestionnaire` Mutation requires an argument of type `EnsureProjectQuestionnaireVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface EnsureProjectQuestionnaireVariables {
  projectId: UUIDString;
}
```
### Return Type
Recall that calling the `EnsureProjectQuestionnaire` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `EnsureProjectQuestionnaire` Mutation is of type `EnsureProjectQuestionnaireData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface EnsureProjectQuestionnaireData {
  projectQuestionnaire_upsert: ProjectQuestionnaire_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `EnsureProjectQuestionnaire`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, EnsureProjectQuestionnaireVariables } from '@generated/data-connector-web';
import { useEnsureProjectQuestionnaire } from '@generated/data-connector-web/react'

export default function EnsureProjectQuestionnaireComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useEnsureProjectQuestionnaire();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useEnsureProjectQuestionnaire(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEnsureProjectQuestionnaire(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEnsureProjectQuestionnaire(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useEnsureProjectQuestionnaire` Mutation requires an argument of type `EnsureProjectQuestionnaireVariables`:
  const ensureProjectQuestionnaireVars: EnsureProjectQuestionnaireVariables = {
    projectId: ..., 
  };
  mutation.mutate(ensureProjectQuestionnaireVars);
  // Variables can be defined inline as well.
  mutation.mutate({ projectId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(ensureProjectQuestionnaireVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.projectQuestionnaire_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ApplyQuestionnaireTemplateToProject
You can execute the `ApplyQuestionnaireTemplateToProject` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useApplyQuestionnaireTemplateToProject(options?: useDataConnectMutationOptions<ApplyQuestionnaireTemplateToProjectData, FirebaseError, ApplyQuestionnaireTemplateToProjectVariables>): UseDataConnectMutationResult<ApplyQuestionnaireTemplateToProjectData, ApplyQuestionnaireTemplateToProjectVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useApplyQuestionnaireTemplateToProject(dc: DataConnect, options?: useDataConnectMutationOptions<ApplyQuestionnaireTemplateToProjectData, FirebaseError, ApplyQuestionnaireTemplateToProjectVariables>): UseDataConnectMutationResult<ApplyQuestionnaireTemplateToProjectData, ApplyQuestionnaireTemplateToProjectVariables>;
```

### Variables
The `ApplyQuestionnaireTemplateToProject` Mutation requires an argument of type `ApplyQuestionnaireTemplateToProjectVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ApplyQuestionnaireTemplateToProjectVariables {
  projectId: UUIDString;
  sourceTemplateId: UUIDString;
}
```
### Return Type
Recall that calling the `ApplyQuestionnaireTemplateToProject` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ApplyQuestionnaireTemplateToProject` Mutation is of type `ApplyQuestionnaireTemplateToProjectData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ApplyQuestionnaireTemplateToProjectData {
  projectQuestionnaire_upsert: ProjectQuestionnaire_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ApplyQuestionnaireTemplateToProject`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ApplyQuestionnaireTemplateToProjectVariables } from '@generated/data-connector-web';
import { useApplyQuestionnaireTemplateToProject } from '@generated/data-connector-web/react'

export default function ApplyQuestionnaireTemplateToProjectComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useApplyQuestionnaireTemplateToProject();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useApplyQuestionnaireTemplateToProject(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useApplyQuestionnaireTemplateToProject(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useApplyQuestionnaireTemplateToProject(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useApplyQuestionnaireTemplateToProject` Mutation requires an argument of type `ApplyQuestionnaireTemplateToProjectVariables`:
  const applyQuestionnaireTemplateToProjectVars: ApplyQuestionnaireTemplateToProjectVariables = {
    projectId: ..., 
    sourceTemplateId: ..., 
  };
  mutation.mutate(applyQuestionnaireTemplateToProjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ projectId: ..., sourceTemplateId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(applyQuestionnaireTemplateToProjectVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.projectQuestionnaire_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateProjectQuestionnaireQuestion
You can execute the `CreateProjectQuestionnaireQuestion` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateProjectQuestionnaireQuestion(options?: useDataConnectMutationOptions<CreateProjectQuestionnaireQuestionData, FirebaseError, CreateProjectQuestionnaireQuestionVariables>): UseDataConnectMutationResult<CreateProjectQuestionnaireQuestionData, CreateProjectQuestionnaireQuestionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateProjectQuestionnaireQuestion(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProjectQuestionnaireQuestionData, FirebaseError, CreateProjectQuestionnaireQuestionVariables>): UseDataConnectMutationResult<CreateProjectQuestionnaireQuestionData, CreateProjectQuestionnaireQuestionVariables>;
```

### Variables
The `CreateProjectQuestionnaireQuestion` Mutation requires an argument of type `CreateProjectQuestionnaireQuestionVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateProjectQuestionnaireQuestionVariables {
  id: UUIDString;
  projectId: UUIDString;
  label: string;
  position: number;
}
```
### Return Type
Recall that calling the `CreateProjectQuestionnaireQuestion` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateProjectQuestionnaireQuestion` Mutation is of type `CreateProjectQuestionnaireQuestionData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateProjectQuestionnaireQuestionData {
  projectQuestionnaireQuestion_insert: ProjectQuestionnaireQuestion_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateProjectQuestionnaireQuestion`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateProjectQuestionnaireQuestionVariables } from '@generated/data-connector-web';
import { useCreateProjectQuestionnaireQuestion } from '@generated/data-connector-web/react'

export default function CreateProjectQuestionnaireQuestionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateProjectQuestionnaireQuestion();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateProjectQuestionnaireQuestion(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProjectQuestionnaireQuestion(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProjectQuestionnaireQuestion(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateProjectQuestionnaireQuestion` Mutation requires an argument of type `CreateProjectQuestionnaireQuestionVariables`:
  const createProjectQuestionnaireQuestionVars: CreateProjectQuestionnaireQuestionVariables = {
    id: ..., 
    projectId: ..., 
    label: ..., 
    position: ..., 
  };
  mutation.mutate(createProjectQuestionnaireQuestionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., projectId: ..., label: ..., position: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createProjectQuestionnaireQuestionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.projectQuestionnaireQuestion_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateProjectQuestionnaireQuestion
You can execute the `UpdateProjectQuestionnaireQuestion` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateProjectQuestionnaireQuestion(options?: useDataConnectMutationOptions<UpdateProjectQuestionnaireQuestionData, FirebaseError, UpdateProjectQuestionnaireQuestionVariables>): UseDataConnectMutationResult<UpdateProjectQuestionnaireQuestionData, UpdateProjectQuestionnaireQuestionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateProjectQuestionnaireQuestion(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProjectQuestionnaireQuestionData, FirebaseError, UpdateProjectQuestionnaireQuestionVariables>): UseDataConnectMutationResult<UpdateProjectQuestionnaireQuestionData, UpdateProjectQuestionnaireQuestionVariables>;
```

### Variables
The `UpdateProjectQuestionnaireQuestion` Mutation requires an argument of type `UpdateProjectQuestionnaireQuestionVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateProjectQuestionnaireQuestionVariables {
  id: UUIDString;
  projectId: UUIDString;
  label: string;
  position: number;
}
```
### Return Type
Recall that calling the `UpdateProjectQuestionnaireQuestion` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateProjectQuestionnaireQuestion` Mutation is of type `UpdateProjectQuestionnaireQuestionData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateProjectQuestionnaireQuestionData {
  projectQuestionnaireQuestion_update?: ProjectQuestionnaireQuestion_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateProjectQuestionnaireQuestion`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateProjectQuestionnaireQuestionVariables } from '@generated/data-connector-web';
import { useUpdateProjectQuestionnaireQuestion } from '@generated/data-connector-web/react'

export default function UpdateProjectQuestionnaireQuestionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateProjectQuestionnaireQuestion();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateProjectQuestionnaireQuestion(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateProjectQuestionnaireQuestion(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateProjectQuestionnaireQuestion(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateProjectQuestionnaireQuestion` Mutation requires an argument of type `UpdateProjectQuestionnaireQuestionVariables`:
  const updateProjectQuestionnaireQuestionVars: UpdateProjectQuestionnaireQuestionVariables = {
    id: ..., 
    projectId: ..., 
    label: ..., 
    position: ..., 
  };
  mutation.mutate(updateProjectQuestionnaireQuestionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., projectId: ..., label: ..., position: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateProjectQuestionnaireQuestionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.projectQuestionnaireQuestion_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateProjectQuestionnaireQuestionAnswer
You can execute the `UpdateProjectQuestionnaireQuestionAnswer` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateProjectQuestionnaireQuestionAnswer(options?: useDataConnectMutationOptions<UpdateProjectQuestionnaireQuestionAnswerData, FirebaseError, UpdateProjectQuestionnaireQuestionAnswerVariables>): UseDataConnectMutationResult<UpdateProjectQuestionnaireQuestionAnswerData, UpdateProjectQuestionnaireQuestionAnswerVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateProjectQuestionnaireQuestionAnswer(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProjectQuestionnaireQuestionAnswerData, FirebaseError, UpdateProjectQuestionnaireQuestionAnswerVariables>): UseDataConnectMutationResult<UpdateProjectQuestionnaireQuestionAnswerData, UpdateProjectQuestionnaireQuestionAnswerVariables>;
```

### Variables
The `UpdateProjectQuestionnaireQuestionAnswer` Mutation requires an argument of type `UpdateProjectQuestionnaireQuestionAnswerVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateProjectQuestionnaireQuestionAnswerVariables {
  id: UUIDString;
  projectId: UUIDString;
  answer?: string | null;
}
```
### Return Type
Recall that calling the `UpdateProjectQuestionnaireQuestionAnswer` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateProjectQuestionnaireQuestionAnswer` Mutation is of type `UpdateProjectQuestionnaireQuestionAnswerData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateProjectQuestionnaireQuestionAnswerData {
  projectQuestionnaireQuestion_update?: ProjectQuestionnaireQuestion_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateProjectQuestionnaireQuestionAnswer`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateProjectQuestionnaireQuestionAnswerVariables } from '@generated/data-connector-web';
import { useUpdateProjectQuestionnaireQuestionAnswer } from '@generated/data-connector-web/react'

export default function UpdateProjectQuestionnaireQuestionAnswerComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateProjectQuestionnaireQuestionAnswer();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateProjectQuestionnaireQuestionAnswer(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateProjectQuestionnaireQuestionAnswer(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateProjectQuestionnaireQuestionAnswer(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateProjectQuestionnaireQuestionAnswer` Mutation requires an argument of type `UpdateProjectQuestionnaireQuestionAnswerVariables`:
  const updateProjectQuestionnaireQuestionAnswerVars: UpdateProjectQuestionnaireQuestionAnswerVariables = {
    id: ..., 
    projectId: ..., 
    answer: ..., // optional
  };
  mutation.mutate(updateProjectQuestionnaireQuestionAnswerVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., projectId: ..., answer: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateProjectQuestionnaireQuestionAnswerVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.projectQuestionnaireQuestion_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateProjectQuestionnaireQuestionAnswerSource
You can execute the `UpdateProjectQuestionnaireQuestionAnswerSource` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateProjectQuestionnaireQuestionAnswerSource(options?: useDataConnectMutationOptions<UpdateProjectQuestionnaireQuestionAnswerSourceData, FirebaseError, UpdateProjectQuestionnaireQuestionAnswerSourceVariables>): UseDataConnectMutationResult<UpdateProjectQuestionnaireQuestionAnswerSourceData, UpdateProjectQuestionnaireQuestionAnswerSourceVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateProjectQuestionnaireQuestionAnswerSource(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProjectQuestionnaireQuestionAnswerSourceData, FirebaseError, UpdateProjectQuestionnaireQuestionAnswerSourceVariables>): UseDataConnectMutationResult<UpdateProjectQuestionnaireQuestionAnswerSourceData, UpdateProjectQuestionnaireQuestionAnswerSourceVariables>;
```

### Variables
The `UpdateProjectQuestionnaireQuestionAnswerSource` Mutation requires an argument of type `UpdateProjectQuestionnaireQuestionAnswerSourceVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateProjectQuestionnaireQuestionAnswerSourceVariables {
  id: UUIDString;
  projectId: UUIDString;
  answerSource: string;
}
```
### Return Type
Recall that calling the `UpdateProjectQuestionnaireQuestionAnswerSource` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateProjectQuestionnaireQuestionAnswerSource` Mutation is of type `UpdateProjectQuestionnaireQuestionAnswerSourceData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateProjectQuestionnaireQuestionAnswerSourceData {
  projectQuestionnaireQuestion_update?: ProjectQuestionnaireQuestion_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateProjectQuestionnaireQuestionAnswerSource`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateProjectQuestionnaireQuestionAnswerSourceVariables } from '@generated/data-connector-web';
import { useUpdateProjectQuestionnaireQuestionAnswerSource } from '@generated/data-connector-web/react'

export default function UpdateProjectQuestionnaireQuestionAnswerSourceComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateProjectQuestionnaireQuestionAnswerSource();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateProjectQuestionnaireQuestionAnswerSource(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateProjectQuestionnaireQuestionAnswerSource(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateProjectQuestionnaireQuestionAnswerSource(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateProjectQuestionnaireQuestionAnswerSource` Mutation requires an argument of type `UpdateProjectQuestionnaireQuestionAnswerSourceVariables`:
  const updateProjectQuestionnaireQuestionAnswerSourceVars: UpdateProjectQuestionnaireQuestionAnswerSourceVariables = {
    id: ..., 
    projectId: ..., 
    answerSource: ..., 
  };
  mutation.mutate(updateProjectQuestionnaireQuestionAnswerSourceVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., projectId: ..., answerSource: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateProjectQuestionnaireQuestionAnswerSourceVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.projectQuestionnaireQuestion_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteProjectQuestionnaireQuestion
You can execute the `DeleteProjectQuestionnaireQuestion` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteProjectQuestionnaireQuestion(options?: useDataConnectMutationOptions<DeleteProjectQuestionnaireQuestionData, FirebaseError, DeleteProjectQuestionnaireQuestionVariables>): UseDataConnectMutationResult<DeleteProjectQuestionnaireQuestionData, DeleteProjectQuestionnaireQuestionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteProjectQuestionnaireQuestion(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProjectQuestionnaireQuestionData, FirebaseError, DeleteProjectQuestionnaireQuestionVariables>): UseDataConnectMutationResult<DeleteProjectQuestionnaireQuestionData, DeleteProjectQuestionnaireQuestionVariables>;
```

### Variables
The `DeleteProjectQuestionnaireQuestion` Mutation requires an argument of type `DeleteProjectQuestionnaireQuestionVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteProjectQuestionnaireQuestionVariables {
  id: UUIDString;
  projectId: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteProjectQuestionnaireQuestion` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteProjectQuestionnaireQuestion` Mutation is of type `DeleteProjectQuestionnaireQuestionData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteProjectQuestionnaireQuestionData {
  projectQuestionnaireQuestion_delete?: ProjectQuestionnaireQuestion_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteProjectQuestionnaireQuestion`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteProjectQuestionnaireQuestionVariables } from '@generated/data-connector-web';
import { useDeleteProjectQuestionnaireQuestion } from '@generated/data-connector-web/react'

export default function DeleteProjectQuestionnaireQuestionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteProjectQuestionnaireQuestion();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteProjectQuestionnaireQuestion(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteProjectQuestionnaireQuestion(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteProjectQuestionnaireQuestion(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteProjectQuestionnaireQuestion` Mutation requires an argument of type `DeleteProjectQuestionnaireQuestionVariables`:
  const deleteProjectQuestionnaireQuestionVars: DeleteProjectQuestionnaireQuestionVariables = {
    id: ..., 
    projectId: ..., 
  };
  mutation.mutate(deleteProjectQuestionnaireQuestionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., projectId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteProjectQuestionnaireQuestionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.projectQuestionnaireQuestion_delete);
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

## UpsertMyUserSignature
You can execute the `UpsertMyUserSignature` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpsertMyUserSignature(options?: useDataConnectMutationOptions<UpsertMyUserSignatureData, FirebaseError, UpsertMyUserSignatureVariables | void>): UseDataConnectMutationResult<UpsertMyUserSignatureData, UpsertMyUserSignatureVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpsertMyUserSignature(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertMyUserSignatureData, FirebaseError, UpsertMyUserSignatureVariables | void>): UseDataConnectMutationResult<UpsertMyUserSignatureData, UpsertMyUserSignatureVariables>;
```

### Variables
The `UpsertMyUserSignature` Mutation has an optional argument of type `UpsertMyUserSignatureVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpsertMyUserSignatureVariables {
  name?: string | null;
  companyName?: string | null;
  address?: string | null;
  mobile?: string | null;
  phone?: string | null;
  email?: string | null;
}
```
### Return Type
Recall that calling the `UpsertMyUserSignature` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpsertMyUserSignature` Mutation is of type `UpsertMyUserSignatureData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertMyUserSignatureData {
  userSignature_upsert: UserSignature_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpsertMyUserSignature`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpsertMyUserSignatureVariables } from '@generated/data-connector-web';
import { useUpsertMyUserSignature } from '@generated/data-connector-web/react'

export default function UpsertMyUserSignatureComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpsertMyUserSignature();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpsertMyUserSignature(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertMyUserSignature(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertMyUserSignature(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpsertMyUserSignature` Mutation has an optional argument of type `UpsertMyUserSignatureVariables`:
  const upsertMyUserSignatureVars: UpsertMyUserSignatureVariables = {
    name: ..., // optional
    companyName: ..., // optional
    address: ..., // optional
    mobile: ..., // optional
    phone: ..., // optional
    email: ..., // optional
  };
  mutation.mutate(upsertMyUserSignatureVars);
  // Variables can be defined inline as well.
  mutation.mutate({ name: ..., companyName: ..., address: ..., mobile: ..., phone: ..., email: ..., });
  // Since all variables are optional for this Mutation, you can omit the `UpsertMyUserSignatureVariables` argument.
  mutation.mutate();

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  // Since all variables are optional for this Mutation, you can provide options without providing any variables.
  // To do so, you must pass `undefined` where you would normally pass the variables.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(upsertMyUserSignatureVars /** or undefined */, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.userSignature_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

