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
  - [*ListQuoteItemTemplates*](#listquoteitemtemplates)
  - [*ListQuoteTemplatesForTeam*](#listquotetemplatesforteam)
  - [*ListQuoteItemTemplateConfigsForQuoteTemplate*](#listquoteitemtemplateconfigsforquotetemplate)
  - [*ListQuotesForTeam*](#listquotesforteam)
  - [*GetQuoteById*](#getquotebyid)
  - [*GetQuoteReadiness*](#getquotereadiness)
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
  - [*EnsureSystemQuoteItemTemplates*](#ensuresystemquoteitemtemplates)
  - [*CreateQuoteTemplate*](#createquotetemplate)
  - [*CreateQuoteItemTemplateConfig*](#createquoteitemtemplateconfig)
  - [*UpdateQuoteItemTemplateConfig*](#updatequoteitemtemplateconfig)
  - [*CreateQuoteItemTemplate*](#createquoteitemtemplate)
  - [*UpdateQuoteItemTemplate*](#updatequoteitemtemplate)
  - [*DeleteQuoteItemTemplate*](#deletequoteitemtemplate)
  - [*UpdateQuoteStatus*](#updatequotestatus)
  - [*CreateQuoteWithItems*](#createquotewithitems)
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

## ListQuoteItemTemplates
You can execute the `ListQuoteItemTemplates` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useListQuoteItemTemplates(dc: DataConnect, options?: useDataConnectQueryOptions<ListQuoteItemTemplatesData>): UseDataConnectQueryResult<ListQuoteItemTemplatesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListQuoteItemTemplates(options?: useDataConnectQueryOptions<ListQuoteItemTemplatesData>): UseDataConnectQueryResult<ListQuoteItemTemplatesData, undefined>;
```

### Variables
The `ListQuoteItemTemplates` Query has no variables.
### Return Type
Recall that calling the `ListQuoteItemTemplates` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListQuoteItemTemplates` Query is of type `ListQuoteItemTemplatesData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListQuoteItemTemplatesData {
  quoteItemTemplates: ({
    id: UUIDString;
    teamId?: string | null;
    scope: string;
    systemKey?: string | null;
    name: string;
    hasKeywords: boolean;
    keywords: string[];
    quantitySourceId?: UUIDString | null;
    sortOrder: number;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & QuoteItemTemplate_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListQuoteItemTemplates`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@generated/data-connector-web';
import { useListQuoteItemTemplates } from '@generated/data-connector-web/react'

export default function ListQuoteItemTemplatesComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListQuoteItemTemplates();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListQuoteItemTemplates(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListQuoteItemTemplates(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListQuoteItemTemplates(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.quoteItemTemplates);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListQuoteTemplatesForTeam
You can execute the `ListQuoteTemplatesForTeam` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useListQuoteTemplatesForTeam(dc: DataConnect, options?: useDataConnectQueryOptions<ListQuoteTemplatesForTeamData>): UseDataConnectQueryResult<ListQuoteTemplatesForTeamData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListQuoteTemplatesForTeam(options?: useDataConnectQueryOptions<ListQuoteTemplatesForTeamData>): UseDataConnectQueryResult<ListQuoteTemplatesForTeamData, undefined>;
```

### Variables
The `ListQuoteTemplatesForTeam` Query has no variables.
### Return Type
Recall that calling the `ListQuoteTemplatesForTeam` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListQuoteTemplatesForTeam` Query is of type `ListQuoteTemplatesForTeamData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListQuoteTemplatesForTeamData {
  quoteTemplates: ({
    id: UUIDString;
    name: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & QuoteTemplate_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListQuoteTemplatesForTeam`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@generated/data-connector-web';
import { useListQuoteTemplatesForTeam } from '@generated/data-connector-web/react'

export default function ListQuoteTemplatesForTeamComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListQuoteTemplatesForTeam();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListQuoteTemplatesForTeam(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListQuoteTemplatesForTeam(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListQuoteTemplatesForTeam(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.quoteTemplates);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListQuoteItemTemplateConfigsForQuoteTemplate
You can execute the `ListQuoteItemTemplateConfigsForQuoteTemplate` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useListQuoteItemTemplateConfigsForQuoteTemplate(dc: DataConnect, vars: ListQuoteItemTemplateConfigsForQuoteTemplateVariables, options?: useDataConnectQueryOptions<ListQuoteItemTemplateConfigsForQuoteTemplateData>): UseDataConnectQueryResult<ListQuoteItemTemplateConfigsForQuoteTemplateData, ListQuoteItemTemplateConfigsForQuoteTemplateVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListQuoteItemTemplateConfigsForQuoteTemplate(vars: ListQuoteItemTemplateConfigsForQuoteTemplateVariables, options?: useDataConnectQueryOptions<ListQuoteItemTemplateConfigsForQuoteTemplateData>): UseDataConnectQueryResult<ListQuoteItemTemplateConfigsForQuoteTemplateData, ListQuoteItemTemplateConfigsForQuoteTemplateVariables>;
```

### Variables
The `ListQuoteItemTemplateConfigsForQuoteTemplate` Query requires an argument of type `ListQuoteItemTemplateConfigsForQuoteTemplateVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListQuoteItemTemplateConfigsForQuoteTemplateVariables {
  quoteTemplateId: UUIDString;
}
```
### Return Type
Recall that calling the `ListQuoteItemTemplateConfigsForQuoteTemplate` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListQuoteItemTemplateConfigsForQuoteTemplate` Query is of type `ListQuoteItemTemplateConfigsForQuoteTemplateData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListQuoteItemTemplateConfigsForQuoteTemplateData {
  quoteItemTemplateConfigs: ({
    quoteTemplateId: UUIDString;
    itemTemplateId: UUIDString;
    enabled: boolean;
    unitPriceCents: number;
    materialUnitPriceCents: number;
    labourUnitPriceCents: number;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    itemTemplate: {
      id: UUIDString;
      name: string;
      hasKeywords: boolean;
      keywords: string[];
      sortOrder: number;
    } & QuoteItemTemplate_Key;
  } & QuoteItemTemplateConfig_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListQuoteItemTemplateConfigsForQuoteTemplate`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListQuoteItemTemplateConfigsForQuoteTemplateVariables } from '@generated/data-connector-web';
import { useListQuoteItemTemplateConfigsForQuoteTemplate } from '@generated/data-connector-web/react'

export default function ListQuoteItemTemplateConfigsForQuoteTemplateComponent() {
  // The `useListQuoteItemTemplateConfigsForQuoteTemplate` Query hook requires an argument of type `ListQuoteItemTemplateConfigsForQuoteTemplateVariables`:
  const listQuoteItemTemplateConfigsForQuoteTemplateVars: ListQuoteItemTemplateConfigsForQuoteTemplateVariables = {
    quoteTemplateId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListQuoteItemTemplateConfigsForQuoteTemplate(listQuoteItemTemplateConfigsForQuoteTemplateVars);
  // Variables can be defined inline as well.
  const query = useListQuoteItemTemplateConfigsForQuoteTemplate({ quoteTemplateId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListQuoteItemTemplateConfigsForQuoteTemplate(dataConnect, listQuoteItemTemplateConfigsForQuoteTemplateVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListQuoteItemTemplateConfigsForQuoteTemplate(listQuoteItemTemplateConfigsForQuoteTemplateVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListQuoteItemTemplateConfigsForQuoteTemplate(dataConnect, listQuoteItemTemplateConfigsForQuoteTemplateVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.quoteItemTemplateConfigs);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListQuotesForTeam
You can execute the `ListQuotesForTeam` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useListQuotesForTeam(dc: DataConnect, options?: useDataConnectQueryOptions<ListQuotesForTeamData>): UseDataConnectQueryResult<ListQuotesForTeamData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListQuotesForTeam(options?: useDataConnectQueryOptions<ListQuotesForTeamData>): UseDataConnectQueryResult<ListQuotesForTeamData, undefined>;
```

### Variables
The `ListQuotesForTeam` Query has no variables.
### Return Type
Recall that calling the `ListQuotesForTeam` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListQuotesForTeam` Query is of type `ListQuotesForTeamData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListQuotesForTeamData {
  quotes: ({
    id: UUIDString;
    reference?: string | null;
    status: string;
    createdAt: TimestampString;
    project: {
      id: UUIDString;
      name: string;
      company?: {
        id: UUIDString;
        companyName: string;
      } & Company_Key;
    } & Project_Key;
    items: ({
      quantity: number;
      unitPriceCents: number;
    })[];
  } & Quote_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListQuotesForTeam`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@generated/data-connector-web';
import { useListQuotesForTeam } from '@generated/data-connector-web/react'

export default function ListQuotesForTeamComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListQuotesForTeam();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListQuotesForTeam(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListQuotesForTeam(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListQuotesForTeam(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.quotes);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetQuoteById
You can execute the `GetQuoteById` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useGetQuoteById(dc: DataConnect, vars: GetQuoteByIdVariables, options?: useDataConnectQueryOptions<GetQuoteByIdData>): UseDataConnectQueryResult<GetQuoteByIdData, GetQuoteByIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetQuoteById(vars: GetQuoteByIdVariables, options?: useDataConnectQueryOptions<GetQuoteByIdData>): UseDataConnectQueryResult<GetQuoteByIdData, GetQuoteByIdVariables>;
```

### Variables
The `GetQuoteById` Query requires an argument of type `GetQuoteByIdVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetQuoteByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetQuoteById` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetQuoteById` Query is of type `GetQuoteByIdData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetQuoteByIdData {
  quote?: {
    id: UUIDString;
    teamId: string;
    projectId: UUIDString;
    supplierId?: UUIDString | null;
    status: string;
    reference?: string | null;
    issuedAt?: TimestampString | null;
    sentAt?: TimestampString | null;
    acceptedAt?: TimestampString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    project: {
      id: UUIDString;
      name: string;
      company?: {
        id: UUIDString;
        companyName: string;
      } & Company_Key;
    } & Project_Key;
    items: ({
      id: UUIDString;
      displayOrder: number;
      name: string;
      quantity: number;
      unitPriceCents: number;
      materialUnitPriceCents: number;
      labourUnitPriceCents: number;
      matchedKeywords: string[];
      sourceTemplateId?: UUIDString | null;
      quantitySourceId?: UUIDString | null;
      quantitySource?: {
        id: UUIDString;
        measurementSource: string;
        measurementPlasterType?: string | null;
      } & QuantitySource_Key;
      createdAt: TimestampString;
      updatedAt: TimestampString;
    } & QuoteItem_Key)[];
  } & Quote_Key;
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetQuoteById`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetQuoteByIdVariables } from '@generated/data-connector-web';
import { useGetQuoteById } from '@generated/data-connector-web/react'

export default function GetQuoteByIdComponent() {
  // The `useGetQuoteById` Query hook requires an argument of type `GetQuoteByIdVariables`:
  const getQuoteByIdVars: GetQuoteByIdVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetQuoteById(getQuoteByIdVars);
  // Variables can be defined inline as well.
  const query = useGetQuoteById({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetQuoteById(dataConnect, getQuoteByIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuoteById(getQuoteByIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuoteById(dataConnect, getQuoteByIdVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.quote);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetQuoteReadiness
You can execute the `GetQuoteReadiness` Query using the following Query hook function, which is defined in [data-connector-web/react/index.d.ts](./index.d.ts):

```javascript
useGetQuoteReadiness(dc: DataConnect, vars: GetQuoteReadinessVariables, options?: useDataConnectQueryOptions<GetQuoteReadinessData>): UseDataConnectQueryResult<GetQuoteReadinessData, GetQuoteReadinessVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetQuoteReadiness(vars: GetQuoteReadinessVariables, options?: useDataConnectQueryOptions<GetQuoteReadinessData>): UseDataConnectQueryResult<GetQuoteReadinessData, GetQuoteReadinessVariables>;
```

### Variables
The `GetQuoteReadiness` Query requires an argument of type `GetQuoteReadinessVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetQuoteReadinessVariables {
  projectId: UUIDString;
}
```
### Return Type
Recall that calling the `GetQuoteReadiness` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetQuoteReadiness` Query is of type `GetQuoteReadinessData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetQuoteReadinessData {
  project?: {
    id: UUIDString;
    teamId: string;
    name: string;
    salesStatus: string;
    pageCount: number;
  } & Project_Key;
  floorplanPages: ({
    id: UUIDString;
    pageNumber: number;
    scaleMmPerPx?: number | null;
    ceilingHeightMm?: number | null;
    overlayJson?: string | null;
  } & FloorplanPage_Key)[];
  projectQuestionnaireQuestions: ({
    id: UUIDString;
    label: string;
    answer?: string | null;
    answerSource: string;
  } & ProjectQuestionnaireQuestion_Key)[];
  quoteItemTemplateConfigs: ({
    itemTemplateId: UUIDString;
    enabled: boolean;
    unitPriceCents: number;
    itemTemplate: {
      id: UUIDString;
      name: string;
      hasKeywords: boolean;
      keywords: string[];
      sortOrder: number;
      quantitySourceId?: UUIDString | null;
    } & QuoteItemTemplate_Key;
  })[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetQuoteReadiness`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetQuoteReadinessVariables } from '@generated/data-connector-web';
import { useGetQuoteReadiness } from '@generated/data-connector-web/react'

export default function GetQuoteReadinessComponent() {
  // The `useGetQuoteReadiness` Query hook requires an argument of type `GetQuoteReadinessVariables`:
  const getQuoteReadinessVars: GetQuoteReadinessVariables = {
    projectId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetQuoteReadiness(getQuoteReadinessVars);
  // Variables can be defined inline as well.
  const query = useGetQuoteReadiness({ projectId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetQuoteReadiness(dataConnect, getQuoteReadinessVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuoteReadiness(getQuoteReadinessVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuoteReadiness(dataConnect, getQuoteReadinessVars, options);

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
    console.log(query.data.floorplanPages);
    console.log(query.data.projectQuestionnaireQuestions);
    console.log(query.data.quoteItemTemplateConfigs);
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

## EnsureSystemQuoteItemTemplates
You can execute the `EnsureSystemQuoteItemTemplates` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useEnsureSystemQuoteItemTemplates(options?: useDataConnectMutationOptions<EnsureSystemQuoteItemTemplatesData, FirebaseError, void>): UseDataConnectMutationResult<EnsureSystemQuoteItemTemplatesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useEnsureSystemQuoteItemTemplates(dc: DataConnect, options?: useDataConnectMutationOptions<EnsureSystemQuoteItemTemplatesData, FirebaseError, void>): UseDataConnectMutationResult<EnsureSystemQuoteItemTemplatesData, undefined>;
```

### Variables
The `EnsureSystemQuoteItemTemplates` Mutation has no variables.
### Return Type
Recall that calling the `EnsureSystemQuoteItemTemplates` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `EnsureSystemQuoteItemTemplates` Mutation is of type `EnsureSystemQuoteItemTemplatesData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface EnsureSystemQuoteItemTemplatesData {
  wallsPlasterboardQuantitySource: QuantitySource_Key;
  wetWallsVillaboardQuantitySource: QuantitySource_Key;
  ceilingsPlasterboardQuantitySource: QuantitySource_Key;
  coveCorniceQuantitySource: QuantitySource_Key;
  wetFloorsFcSheetQuantitySource: QuantitySource_Key;
  doorSetsQuantitySource: QuantitySource_Key;
  wallsPlasterboardItemTemplate: QuoteItemTemplate_Key;
  wetWallsVillaboardItemTemplate: QuoteItemTemplate_Key;
  ceilingsPlasterboardItemTemplate: QuoteItemTemplate_Key;
  coveCorniceItemTemplate: QuoteItemTemplate_Key;
  wetFloorsFcSheetItemTemplate: QuoteItemTemplate_Key;
  doorSetsItemTemplate: QuoteItemTemplate_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `EnsureSystemQuoteItemTemplates`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@generated/data-connector-web';
import { useEnsureSystemQuoteItemTemplates } from '@generated/data-connector-web/react'

export default function EnsureSystemQuoteItemTemplatesComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useEnsureSystemQuoteItemTemplates();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useEnsureSystemQuoteItemTemplates(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEnsureSystemQuoteItemTemplates(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEnsureSystemQuoteItemTemplates(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  mutation.mutate();

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  // Since this Mutation accepts no variables, you must pass `undefined` where you would normally pass the variables.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(undefined, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.wallsPlasterboardQuantitySource);
    console.log(mutation.data.wetWallsVillaboardQuantitySource);
    console.log(mutation.data.ceilingsPlasterboardQuantitySource);
    console.log(mutation.data.coveCorniceQuantitySource);
    console.log(mutation.data.wetFloorsFcSheetQuantitySource);
    console.log(mutation.data.doorSetsQuantitySource);
    console.log(mutation.data.wallsPlasterboardItemTemplate);
    console.log(mutation.data.wetWallsVillaboardItemTemplate);
    console.log(mutation.data.ceilingsPlasterboardItemTemplate);
    console.log(mutation.data.coveCorniceItemTemplate);
    console.log(mutation.data.wetFloorsFcSheetItemTemplate);
    console.log(mutation.data.doorSetsItemTemplate);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateQuoteTemplate
You can execute the `CreateQuoteTemplate` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateQuoteTemplate(options?: useDataConnectMutationOptions<CreateQuoteTemplateData, FirebaseError, CreateQuoteTemplateVariables>): UseDataConnectMutationResult<CreateQuoteTemplateData, CreateQuoteTemplateVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateQuoteTemplate(dc: DataConnect, options?: useDataConnectMutationOptions<CreateQuoteTemplateData, FirebaseError, CreateQuoteTemplateVariables>): UseDataConnectMutationResult<CreateQuoteTemplateData, CreateQuoteTemplateVariables>;
```

### Variables
The `CreateQuoteTemplate` Mutation requires an argument of type `CreateQuoteTemplateVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateQuoteTemplateVariables {
  id: UUIDString;
  name: string;
}
```
### Return Type
Recall that calling the `CreateQuoteTemplate` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateQuoteTemplate` Mutation is of type `CreateQuoteTemplateData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateQuoteTemplateData {
  quoteTemplate_insert: QuoteTemplate_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateQuoteTemplate`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateQuoteTemplateVariables } from '@generated/data-connector-web';
import { useCreateQuoteTemplate } from '@generated/data-connector-web/react'

export default function CreateQuoteTemplateComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateQuoteTemplate();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateQuoteTemplate(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuoteTemplate(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuoteTemplate(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateQuoteTemplate` Mutation requires an argument of type `CreateQuoteTemplateVariables`:
  const createQuoteTemplateVars: CreateQuoteTemplateVariables = {
    id: ..., 
    name: ..., 
  };
  mutation.mutate(createQuoteTemplateVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createQuoteTemplateVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quoteTemplate_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateQuoteItemTemplateConfig
You can execute the `CreateQuoteItemTemplateConfig` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateQuoteItemTemplateConfig(options?: useDataConnectMutationOptions<CreateQuoteItemTemplateConfigData, FirebaseError, CreateQuoteItemTemplateConfigVariables>): UseDataConnectMutationResult<CreateQuoteItemTemplateConfigData, CreateQuoteItemTemplateConfigVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateQuoteItemTemplateConfig(dc: DataConnect, options?: useDataConnectMutationOptions<CreateQuoteItemTemplateConfigData, FirebaseError, CreateQuoteItemTemplateConfigVariables>): UseDataConnectMutationResult<CreateQuoteItemTemplateConfigData, CreateQuoteItemTemplateConfigVariables>;
```

### Variables
The `CreateQuoteItemTemplateConfig` Mutation requires an argument of type `CreateQuoteItemTemplateConfigVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateQuoteItemTemplateConfigVariables {
  quoteTemplateId: UUIDString;
  itemTemplateId: UUIDString;
  unitPriceCents: number;
  materialUnitPriceCents: number;
  labourUnitPriceCents: number;
}
```
### Return Type
Recall that calling the `CreateQuoteItemTemplateConfig` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateQuoteItemTemplateConfig` Mutation is of type `CreateQuoteItemTemplateConfigData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateQuoteItemTemplateConfigData {
  quoteItemTemplateConfig_insert: QuoteItemTemplateConfig_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateQuoteItemTemplateConfig`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateQuoteItemTemplateConfigVariables } from '@generated/data-connector-web';
import { useCreateQuoteItemTemplateConfig } from '@generated/data-connector-web/react'

export default function CreateQuoteItemTemplateConfigComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateQuoteItemTemplateConfig();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateQuoteItemTemplateConfig(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuoteItemTemplateConfig(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuoteItemTemplateConfig(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateQuoteItemTemplateConfig` Mutation requires an argument of type `CreateQuoteItemTemplateConfigVariables`:
  const createQuoteItemTemplateConfigVars: CreateQuoteItemTemplateConfigVariables = {
    quoteTemplateId: ..., 
    itemTemplateId: ..., 
    unitPriceCents: ..., 
    materialUnitPriceCents: ..., 
    labourUnitPriceCents: ..., 
  };
  mutation.mutate(createQuoteItemTemplateConfigVars);
  // Variables can be defined inline as well.
  mutation.mutate({ quoteTemplateId: ..., itemTemplateId: ..., unitPriceCents: ..., materialUnitPriceCents: ..., labourUnitPriceCents: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createQuoteItemTemplateConfigVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quoteItemTemplateConfig_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateQuoteItemTemplateConfig
You can execute the `UpdateQuoteItemTemplateConfig` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateQuoteItemTemplateConfig(options?: useDataConnectMutationOptions<UpdateQuoteItemTemplateConfigData, FirebaseError, UpdateQuoteItemTemplateConfigVariables>): UseDataConnectMutationResult<UpdateQuoteItemTemplateConfigData, UpdateQuoteItemTemplateConfigVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateQuoteItemTemplateConfig(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateQuoteItemTemplateConfigData, FirebaseError, UpdateQuoteItemTemplateConfigVariables>): UseDataConnectMutationResult<UpdateQuoteItemTemplateConfigData, UpdateQuoteItemTemplateConfigVariables>;
```

### Variables
The `UpdateQuoteItemTemplateConfig` Mutation requires an argument of type `UpdateQuoteItemTemplateConfigVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateQuoteItemTemplateConfigVariables {
  quoteTemplateId: UUIDString;
  itemTemplateId: UUIDString;
  enabled: boolean;
  unitPriceCents: number;
  materialUnitPriceCents: number;
  labourUnitPriceCents: number;
}
```
### Return Type
Recall that calling the `UpdateQuoteItemTemplateConfig` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateQuoteItemTemplateConfig` Mutation is of type `UpdateQuoteItemTemplateConfigData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateQuoteItemTemplateConfigData {
  quoteItemTemplateConfig_update?: QuoteItemTemplateConfig_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateQuoteItemTemplateConfig`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateQuoteItemTemplateConfigVariables } from '@generated/data-connector-web';
import { useUpdateQuoteItemTemplateConfig } from '@generated/data-connector-web/react'

export default function UpdateQuoteItemTemplateConfigComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateQuoteItemTemplateConfig();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateQuoteItemTemplateConfig(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateQuoteItemTemplateConfig(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateQuoteItemTemplateConfig(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateQuoteItemTemplateConfig` Mutation requires an argument of type `UpdateQuoteItemTemplateConfigVariables`:
  const updateQuoteItemTemplateConfigVars: UpdateQuoteItemTemplateConfigVariables = {
    quoteTemplateId: ..., 
    itemTemplateId: ..., 
    enabled: ..., 
    unitPriceCents: ..., 
    materialUnitPriceCents: ..., 
    labourUnitPriceCents: ..., 
  };
  mutation.mutate(updateQuoteItemTemplateConfigVars);
  // Variables can be defined inline as well.
  mutation.mutate({ quoteTemplateId: ..., itemTemplateId: ..., enabled: ..., unitPriceCents: ..., materialUnitPriceCents: ..., labourUnitPriceCents: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateQuoteItemTemplateConfigVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quoteItemTemplateConfig_update);
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
  name: string;
  hasKeywords: boolean;
  keywords: string[];
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
    name: ..., 
    hasKeywords: ..., 
    keywords: ..., 
  };
  mutation.mutate(createQuoteItemTemplateVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., hasKeywords: ..., keywords: ..., });

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
  name: string;
  hasKeywords: boolean;
  keywords: string[];
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
    name: ..., 
    hasKeywords: ..., 
    keywords: ..., 
  };
  mutation.mutate(updateQuoteItemTemplateVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., hasKeywords: ..., keywords: ..., });

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
  quoteItemTemplateConfig_deleteMany: number;
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
    console.log(mutation.data.quoteItemTemplateConfig_deleteMany);
    console.log(mutation.data.quoteItemTemplate_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateQuoteStatus
You can execute the `UpdateQuoteStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateQuoteStatus(options?: useDataConnectMutationOptions<UpdateQuoteStatusData, FirebaseError, UpdateQuoteStatusVariables>): UseDataConnectMutationResult<UpdateQuoteStatusData, UpdateQuoteStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateQuoteStatus(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateQuoteStatusData, FirebaseError, UpdateQuoteStatusVariables>): UseDataConnectMutationResult<UpdateQuoteStatusData, UpdateQuoteStatusVariables>;
```

### Variables
The `UpdateQuoteStatus` Mutation requires an argument of type `UpdateQuoteStatusVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateQuoteStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that calling the `UpdateQuoteStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateQuoteStatus` Mutation is of type `UpdateQuoteStatusData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateQuoteStatusData {
  quote_update?: Quote_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateQuoteStatus`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateQuoteStatusVariables } from '@generated/data-connector-web';
import { useUpdateQuoteStatus } from '@generated/data-connector-web/react'

export default function UpdateQuoteStatusComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateQuoteStatus();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateQuoteStatus(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateQuoteStatus(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateQuoteStatus(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateQuoteStatus` Mutation requires an argument of type `UpdateQuoteStatusVariables`:
  const updateQuoteStatusVars: UpdateQuoteStatusVariables = {
    id: ..., 
    status: ..., 
  };
  mutation.mutate(updateQuoteStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., status: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateQuoteStatusVars, options);

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

## CreateQuoteWithItems
You can execute the `CreateQuoteWithItems` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connector-web/react/index.d.ts](./index.d.ts)):
```javascript
useCreateQuoteWithItems(options?: useDataConnectMutationOptions<CreateQuoteWithItemsData, FirebaseError, CreateQuoteWithItemsVariables>): UseDataConnectMutationResult<CreateQuoteWithItemsData, CreateQuoteWithItemsVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateQuoteWithItems(dc: DataConnect, options?: useDataConnectMutationOptions<CreateQuoteWithItemsData, FirebaseError, CreateQuoteWithItemsVariables>): UseDataConnectMutationResult<CreateQuoteWithItemsData, CreateQuoteWithItemsVariables>;
```

### Variables
The `CreateQuoteWithItems` Mutation requires an argument of type `CreateQuoteWithItemsVariables`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateQuoteWithItemsVariables {
  projectId: UUIDString;
  quoteId: UUIDString;
  includeItem1?: boolean | null;
  item1Name?: string | null;
  item1DisplayOrder?: number | null;
  item1Quantity?: number | null;
  item1SourceTemplateId?: UUIDString | null;
  item1QuantitySourceId?: UUIDString | null;
  item1UnitPriceCents?: number | null;
  item1MaterialUnitPriceCents?: number | null;
  item1LabourUnitPriceCents?: number | null;
  item1MatchedKeywords?: string[];
  includeItem2?: boolean | null;
  item2Name?: string | null;
  item2DisplayOrder?: number | null;
  item2Quantity?: number | null;
  item2SourceTemplateId?: UUIDString | null;
  item2QuantitySourceId?: UUIDString | null;
  item2UnitPriceCents?: number | null;
  item2MaterialUnitPriceCents?: number | null;
  item2LabourUnitPriceCents?: number | null;
  item2MatchedKeywords?: string[];
  includeItem3?: boolean | null;
  item3Name?: string | null;
  item3DisplayOrder?: number | null;
  item3Quantity?: number | null;
  item3SourceTemplateId?: UUIDString | null;
  item3QuantitySourceId?: UUIDString | null;
  item3UnitPriceCents?: number | null;
  item3MaterialUnitPriceCents?: number | null;
  item3LabourUnitPriceCents?: number | null;
  item3MatchedKeywords?: string[];
  includeItem4?: boolean | null;
  item4Name?: string | null;
  item4DisplayOrder?: number | null;
  item4Quantity?: number | null;
  item4SourceTemplateId?: UUIDString | null;
  item4QuantitySourceId?: UUIDString | null;
  item4UnitPriceCents?: number | null;
  item4MaterialUnitPriceCents?: number | null;
  item4LabourUnitPriceCents?: number | null;
  item4MatchedKeywords?: string[];
  includeItem5?: boolean | null;
  item5Name?: string | null;
  item5DisplayOrder?: number | null;
  item5Quantity?: number | null;
  item5SourceTemplateId?: UUIDString | null;
  item5QuantitySourceId?: UUIDString | null;
  item5UnitPriceCents?: number | null;
  item5MaterialUnitPriceCents?: number | null;
  item5LabourUnitPriceCents?: number | null;
  item5MatchedKeywords?: string[];
  includeItem6?: boolean | null;
  item6Name?: string | null;
  item6DisplayOrder?: number | null;
  item6Quantity?: number | null;
  item6SourceTemplateId?: UUIDString | null;
  item6QuantitySourceId?: UUIDString | null;
  item6UnitPriceCents?: number | null;
  item6MaterialUnitPriceCents?: number | null;
  item6LabourUnitPriceCents?: number | null;
  item6MatchedKeywords?: string[];
  includeItem7?: boolean | null;
  item7Name?: string | null;
  item7DisplayOrder?: number | null;
  item7Quantity?: number | null;
  item7SourceTemplateId?: UUIDString | null;
  item7QuantitySourceId?: UUIDString | null;
  item7UnitPriceCents?: number | null;
  item7MaterialUnitPriceCents?: number | null;
  item7LabourUnitPriceCents?: number | null;
  item7MatchedKeywords?: string[];
  includeItem8?: boolean | null;
  item8Name?: string | null;
  item8DisplayOrder?: number | null;
  item8Quantity?: number | null;
  item8SourceTemplateId?: UUIDString | null;
  item8QuantitySourceId?: UUIDString | null;
  item8UnitPriceCents?: number | null;
  item8MaterialUnitPriceCents?: number | null;
  item8LabourUnitPriceCents?: number | null;
  item8MatchedKeywords?: string[];
  includeItem9?: boolean | null;
  item9Name?: string | null;
  item9DisplayOrder?: number | null;
  item9Quantity?: number | null;
  item9SourceTemplateId?: UUIDString | null;
  item9QuantitySourceId?: UUIDString | null;
  item9UnitPriceCents?: number | null;
  item9MaterialUnitPriceCents?: number | null;
  item9LabourUnitPriceCents?: number | null;
  item9MatchedKeywords?: string[];
  includeItem10?: boolean | null;
  item10Name?: string | null;
  item10DisplayOrder?: number | null;
  item10Quantity?: number | null;
  item10SourceTemplateId?: UUIDString | null;
  item10QuantitySourceId?: UUIDString | null;
  item10UnitPriceCents?: number | null;
  item10MaterialUnitPriceCents?: number | null;
  item10LabourUnitPriceCents?: number | null;
  item10MatchedKeywords?: string[];
  includeItem11?: boolean | null;
  item11Name?: string | null;
  item11DisplayOrder?: number | null;
  item11Quantity?: number | null;
  item11SourceTemplateId?: UUIDString | null;
  item11QuantitySourceId?: UUIDString | null;
  item11UnitPriceCents?: number | null;
  item11MaterialUnitPriceCents?: number | null;
  item11LabourUnitPriceCents?: number | null;
  item11MatchedKeywords?: string[];
  includeItem12?: boolean | null;
  item12Name?: string | null;
  item12DisplayOrder?: number | null;
  item12Quantity?: number | null;
  item12SourceTemplateId?: UUIDString | null;
  item12QuantitySourceId?: UUIDString | null;
  item12UnitPriceCents?: number | null;
  item12MaterialUnitPriceCents?: number | null;
  item12LabourUnitPriceCents?: number | null;
  item12MatchedKeywords?: string[];
  includeItem13?: boolean | null;
  item13Name?: string | null;
  item13DisplayOrder?: number | null;
  item13Quantity?: number | null;
  item13SourceTemplateId?: UUIDString | null;
  item13QuantitySourceId?: UUIDString | null;
  item13UnitPriceCents?: number | null;
  item13MaterialUnitPriceCents?: number | null;
  item13LabourUnitPriceCents?: number | null;
  item13MatchedKeywords?: string[];
  includeItem14?: boolean | null;
  item14Name?: string | null;
  item14DisplayOrder?: number | null;
  item14Quantity?: number | null;
  item14SourceTemplateId?: UUIDString | null;
  item14QuantitySourceId?: UUIDString | null;
  item14UnitPriceCents?: number | null;
  item14MaterialUnitPriceCents?: number | null;
  item14LabourUnitPriceCents?: number | null;
  item14MatchedKeywords?: string[];
  includeItem15?: boolean | null;
  item15Name?: string | null;
  item15DisplayOrder?: number | null;
  item15Quantity?: number | null;
  item15SourceTemplateId?: UUIDString | null;
  item15QuantitySourceId?: UUIDString | null;
  item15UnitPriceCents?: number | null;
  item15MaterialUnitPriceCents?: number | null;
  item15LabourUnitPriceCents?: number | null;
  item15MatchedKeywords?: string[];
  includeItem16?: boolean | null;
  item16Name?: string | null;
  item16DisplayOrder?: number | null;
  item16Quantity?: number | null;
  item16SourceTemplateId?: UUIDString | null;
  item16QuantitySourceId?: UUIDString | null;
  item16UnitPriceCents?: number | null;
  item16MaterialUnitPriceCents?: number | null;
  item16LabourUnitPriceCents?: number | null;
  item16MatchedKeywords?: string[];
  includeItem17?: boolean | null;
  item17Name?: string | null;
  item17DisplayOrder?: number | null;
  item17Quantity?: number | null;
  item17SourceTemplateId?: UUIDString | null;
  item17QuantitySourceId?: UUIDString | null;
  item17UnitPriceCents?: number | null;
  item17MaterialUnitPriceCents?: number | null;
  item17LabourUnitPriceCents?: number | null;
  item17MatchedKeywords?: string[];
  includeItem18?: boolean | null;
  item18Name?: string | null;
  item18DisplayOrder?: number | null;
  item18Quantity?: number | null;
  item18SourceTemplateId?: UUIDString | null;
  item18QuantitySourceId?: UUIDString | null;
  item18UnitPriceCents?: number | null;
  item18MaterialUnitPriceCents?: number | null;
  item18LabourUnitPriceCents?: number | null;
  item18MatchedKeywords?: string[];
  includeItem19?: boolean | null;
  item19Name?: string | null;
  item19DisplayOrder?: number | null;
  item19Quantity?: number | null;
  item19SourceTemplateId?: UUIDString | null;
  item19QuantitySourceId?: UUIDString | null;
  item19UnitPriceCents?: number | null;
  item19MaterialUnitPriceCents?: number | null;
  item19LabourUnitPriceCents?: number | null;
  item19MatchedKeywords?: string[];
  includeItem20?: boolean | null;
  item20Name?: string | null;
  item20DisplayOrder?: number | null;
  item20Quantity?: number | null;
  item20SourceTemplateId?: UUIDString | null;
  item20QuantitySourceId?: UUIDString | null;
  item20UnitPriceCents?: number | null;
  item20MaterialUnitPriceCents?: number | null;
  item20LabourUnitPriceCents?: number | null;
  item20MatchedKeywords?: string[];
}
```
### Return Type
Recall that calling the `CreateQuoteWithItems` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateQuoteWithItems` Mutation is of type `CreateQuoteWithItemsData`, which is defined in [data-connector-web/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateQuoteWithItemsData {
  quoteItem_deleteMany: number;
  quote_deleteMany: number;
  quote_insert: Quote_Key;
  item1: QuoteItem_Key;
  item2: QuoteItem_Key;
  item3: QuoteItem_Key;
  item4: QuoteItem_Key;
  item5: QuoteItem_Key;
  item6: QuoteItem_Key;
  item7: QuoteItem_Key;
  item8: QuoteItem_Key;
  item9: QuoteItem_Key;
  item10: QuoteItem_Key;
  item11: QuoteItem_Key;
  item12: QuoteItem_Key;
  item13: QuoteItem_Key;
  item14: QuoteItem_Key;
  item15: QuoteItem_Key;
  item16: QuoteItem_Key;
  item17: QuoteItem_Key;
  item18: QuoteItem_Key;
  item19: QuoteItem_Key;
  item20: QuoteItem_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateQuoteWithItems`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateQuoteWithItemsVariables } from '@generated/data-connector-web';
import { useCreateQuoteWithItems } from '@generated/data-connector-web/react'

export default function CreateQuoteWithItemsComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateQuoteWithItems();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateQuoteWithItems(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuoteWithItems(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateQuoteWithItems(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateQuoteWithItems` Mutation requires an argument of type `CreateQuoteWithItemsVariables`:
  const createQuoteWithItemsVars: CreateQuoteWithItemsVariables = {
    projectId: ..., 
    quoteId: ..., 
    includeItem1: ..., // optional
    item1Name: ..., // optional
    item1DisplayOrder: ..., // optional
    item1Quantity: ..., // optional
    item1SourceTemplateId: ..., // optional
    item1QuantitySourceId: ..., // optional
    item1UnitPriceCents: ..., // optional
    item1MaterialUnitPriceCents: ..., // optional
    item1LabourUnitPriceCents: ..., // optional
    item1MatchedKeywords: ..., // optional
    includeItem2: ..., // optional
    item2Name: ..., // optional
    item2DisplayOrder: ..., // optional
    item2Quantity: ..., // optional
    item2SourceTemplateId: ..., // optional
    item2QuantitySourceId: ..., // optional
    item2UnitPriceCents: ..., // optional
    item2MaterialUnitPriceCents: ..., // optional
    item2LabourUnitPriceCents: ..., // optional
    item2MatchedKeywords: ..., // optional
    includeItem3: ..., // optional
    item3Name: ..., // optional
    item3DisplayOrder: ..., // optional
    item3Quantity: ..., // optional
    item3SourceTemplateId: ..., // optional
    item3QuantitySourceId: ..., // optional
    item3UnitPriceCents: ..., // optional
    item3MaterialUnitPriceCents: ..., // optional
    item3LabourUnitPriceCents: ..., // optional
    item3MatchedKeywords: ..., // optional
    includeItem4: ..., // optional
    item4Name: ..., // optional
    item4DisplayOrder: ..., // optional
    item4Quantity: ..., // optional
    item4SourceTemplateId: ..., // optional
    item4QuantitySourceId: ..., // optional
    item4UnitPriceCents: ..., // optional
    item4MaterialUnitPriceCents: ..., // optional
    item4LabourUnitPriceCents: ..., // optional
    item4MatchedKeywords: ..., // optional
    includeItem5: ..., // optional
    item5Name: ..., // optional
    item5DisplayOrder: ..., // optional
    item5Quantity: ..., // optional
    item5SourceTemplateId: ..., // optional
    item5QuantitySourceId: ..., // optional
    item5UnitPriceCents: ..., // optional
    item5MaterialUnitPriceCents: ..., // optional
    item5LabourUnitPriceCents: ..., // optional
    item5MatchedKeywords: ..., // optional
    includeItem6: ..., // optional
    item6Name: ..., // optional
    item6DisplayOrder: ..., // optional
    item6Quantity: ..., // optional
    item6SourceTemplateId: ..., // optional
    item6QuantitySourceId: ..., // optional
    item6UnitPriceCents: ..., // optional
    item6MaterialUnitPriceCents: ..., // optional
    item6LabourUnitPriceCents: ..., // optional
    item6MatchedKeywords: ..., // optional
    includeItem7: ..., // optional
    item7Name: ..., // optional
    item7DisplayOrder: ..., // optional
    item7Quantity: ..., // optional
    item7SourceTemplateId: ..., // optional
    item7QuantitySourceId: ..., // optional
    item7UnitPriceCents: ..., // optional
    item7MaterialUnitPriceCents: ..., // optional
    item7LabourUnitPriceCents: ..., // optional
    item7MatchedKeywords: ..., // optional
    includeItem8: ..., // optional
    item8Name: ..., // optional
    item8DisplayOrder: ..., // optional
    item8Quantity: ..., // optional
    item8SourceTemplateId: ..., // optional
    item8QuantitySourceId: ..., // optional
    item8UnitPriceCents: ..., // optional
    item8MaterialUnitPriceCents: ..., // optional
    item8LabourUnitPriceCents: ..., // optional
    item8MatchedKeywords: ..., // optional
    includeItem9: ..., // optional
    item9Name: ..., // optional
    item9DisplayOrder: ..., // optional
    item9Quantity: ..., // optional
    item9SourceTemplateId: ..., // optional
    item9QuantitySourceId: ..., // optional
    item9UnitPriceCents: ..., // optional
    item9MaterialUnitPriceCents: ..., // optional
    item9LabourUnitPriceCents: ..., // optional
    item9MatchedKeywords: ..., // optional
    includeItem10: ..., // optional
    item10Name: ..., // optional
    item10DisplayOrder: ..., // optional
    item10Quantity: ..., // optional
    item10SourceTemplateId: ..., // optional
    item10QuantitySourceId: ..., // optional
    item10UnitPriceCents: ..., // optional
    item10MaterialUnitPriceCents: ..., // optional
    item10LabourUnitPriceCents: ..., // optional
    item10MatchedKeywords: ..., // optional
    includeItem11: ..., // optional
    item11Name: ..., // optional
    item11DisplayOrder: ..., // optional
    item11Quantity: ..., // optional
    item11SourceTemplateId: ..., // optional
    item11QuantitySourceId: ..., // optional
    item11UnitPriceCents: ..., // optional
    item11MaterialUnitPriceCents: ..., // optional
    item11LabourUnitPriceCents: ..., // optional
    item11MatchedKeywords: ..., // optional
    includeItem12: ..., // optional
    item12Name: ..., // optional
    item12DisplayOrder: ..., // optional
    item12Quantity: ..., // optional
    item12SourceTemplateId: ..., // optional
    item12QuantitySourceId: ..., // optional
    item12UnitPriceCents: ..., // optional
    item12MaterialUnitPriceCents: ..., // optional
    item12LabourUnitPriceCents: ..., // optional
    item12MatchedKeywords: ..., // optional
    includeItem13: ..., // optional
    item13Name: ..., // optional
    item13DisplayOrder: ..., // optional
    item13Quantity: ..., // optional
    item13SourceTemplateId: ..., // optional
    item13QuantitySourceId: ..., // optional
    item13UnitPriceCents: ..., // optional
    item13MaterialUnitPriceCents: ..., // optional
    item13LabourUnitPriceCents: ..., // optional
    item13MatchedKeywords: ..., // optional
    includeItem14: ..., // optional
    item14Name: ..., // optional
    item14DisplayOrder: ..., // optional
    item14Quantity: ..., // optional
    item14SourceTemplateId: ..., // optional
    item14QuantitySourceId: ..., // optional
    item14UnitPriceCents: ..., // optional
    item14MaterialUnitPriceCents: ..., // optional
    item14LabourUnitPriceCents: ..., // optional
    item14MatchedKeywords: ..., // optional
    includeItem15: ..., // optional
    item15Name: ..., // optional
    item15DisplayOrder: ..., // optional
    item15Quantity: ..., // optional
    item15SourceTemplateId: ..., // optional
    item15QuantitySourceId: ..., // optional
    item15UnitPriceCents: ..., // optional
    item15MaterialUnitPriceCents: ..., // optional
    item15LabourUnitPriceCents: ..., // optional
    item15MatchedKeywords: ..., // optional
    includeItem16: ..., // optional
    item16Name: ..., // optional
    item16DisplayOrder: ..., // optional
    item16Quantity: ..., // optional
    item16SourceTemplateId: ..., // optional
    item16QuantitySourceId: ..., // optional
    item16UnitPriceCents: ..., // optional
    item16MaterialUnitPriceCents: ..., // optional
    item16LabourUnitPriceCents: ..., // optional
    item16MatchedKeywords: ..., // optional
    includeItem17: ..., // optional
    item17Name: ..., // optional
    item17DisplayOrder: ..., // optional
    item17Quantity: ..., // optional
    item17SourceTemplateId: ..., // optional
    item17QuantitySourceId: ..., // optional
    item17UnitPriceCents: ..., // optional
    item17MaterialUnitPriceCents: ..., // optional
    item17LabourUnitPriceCents: ..., // optional
    item17MatchedKeywords: ..., // optional
    includeItem18: ..., // optional
    item18Name: ..., // optional
    item18DisplayOrder: ..., // optional
    item18Quantity: ..., // optional
    item18SourceTemplateId: ..., // optional
    item18QuantitySourceId: ..., // optional
    item18UnitPriceCents: ..., // optional
    item18MaterialUnitPriceCents: ..., // optional
    item18LabourUnitPriceCents: ..., // optional
    item18MatchedKeywords: ..., // optional
    includeItem19: ..., // optional
    item19Name: ..., // optional
    item19DisplayOrder: ..., // optional
    item19Quantity: ..., // optional
    item19SourceTemplateId: ..., // optional
    item19QuantitySourceId: ..., // optional
    item19UnitPriceCents: ..., // optional
    item19MaterialUnitPriceCents: ..., // optional
    item19LabourUnitPriceCents: ..., // optional
    item19MatchedKeywords: ..., // optional
    includeItem20: ..., // optional
    item20Name: ..., // optional
    item20DisplayOrder: ..., // optional
    item20Quantity: ..., // optional
    item20SourceTemplateId: ..., // optional
    item20QuantitySourceId: ..., // optional
    item20UnitPriceCents: ..., // optional
    item20MaterialUnitPriceCents: ..., // optional
    item20LabourUnitPriceCents: ..., // optional
    item20MatchedKeywords: ..., // optional
  };
  mutation.mutate(createQuoteWithItemsVars);
  // Variables can be defined inline as well.
  mutation.mutate({ projectId: ..., quoteId: ..., includeItem1: ..., item1Name: ..., item1DisplayOrder: ..., item1Quantity: ..., item1SourceTemplateId: ..., item1QuantitySourceId: ..., item1UnitPriceCents: ..., item1MaterialUnitPriceCents: ..., item1LabourUnitPriceCents: ..., item1MatchedKeywords: ..., includeItem2: ..., item2Name: ..., item2DisplayOrder: ..., item2Quantity: ..., item2SourceTemplateId: ..., item2QuantitySourceId: ..., item2UnitPriceCents: ..., item2MaterialUnitPriceCents: ..., item2LabourUnitPriceCents: ..., item2MatchedKeywords: ..., includeItem3: ..., item3Name: ..., item3DisplayOrder: ..., item3Quantity: ..., item3SourceTemplateId: ..., item3QuantitySourceId: ..., item3UnitPriceCents: ..., item3MaterialUnitPriceCents: ..., item3LabourUnitPriceCents: ..., item3MatchedKeywords: ..., includeItem4: ..., item4Name: ..., item4DisplayOrder: ..., item4Quantity: ..., item4SourceTemplateId: ..., item4QuantitySourceId: ..., item4UnitPriceCents: ..., item4MaterialUnitPriceCents: ..., item4LabourUnitPriceCents: ..., item4MatchedKeywords: ..., includeItem5: ..., item5Name: ..., item5DisplayOrder: ..., item5Quantity: ..., item5SourceTemplateId: ..., item5QuantitySourceId: ..., item5UnitPriceCents: ..., item5MaterialUnitPriceCents: ..., item5LabourUnitPriceCents: ..., item5MatchedKeywords: ..., includeItem6: ..., item6Name: ..., item6DisplayOrder: ..., item6Quantity: ..., item6SourceTemplateId: ..., item6QuantitySourceId: ..., item6UnitPriceCents: ..., item6MaterialUnitPriceCents: ..., item6LabourUnitPriceCents: ..., item6MatchedKeywords: ..., includeItem7: ..., item7Name: ..., item7DisplayOrder: ..., item7Quantity: ..., item7SourceTemplateId: ..., item7QuantitySourceId: ..., item7UnitPriceCents: ..., item7MaterialUnitPriceCents: ..., item7LabourUnitPriceCents: ..., item7MatchedKeywords: ..., includeItem8: ..., item8Name: ..., item8DisplayOrder: ..., item8Quantity: ..., item8SourceTemplateId: ..., item8QuantitySourceId: ..., item8UnitPriceCents: ..., item8MaterialUnitPriceCents: ..., item8LabourUnitPriceCents: ..., item8MatchedKeywords: ..., includeItem9: ..., item9Name: ..., item9DisplayOrder: ..., item9Quantity: ..., item9SourceTemplateId: ..., item9QuantitySourceId: ..., item9UnitPriceCents: ..., item9MaterialUnitPriceCents: ..., item9LabourUnitPriceCents: ..., item9MatchedKeywords: ..., includeItem10: ..., item10Name: ..., item10DisplayOrder: ..., item10Quantity: ..., item10SourceTemplateId: ..., item10QuantitySourceId: ..., item10UnitPriceCents: ..., item10MaterialUnitPriceCents: ..., item10LabourUnitPriceCents: ..., item10MatchedKeywords: ..., includeItem11: ..., item11Name: ..., item11DisplayOrder: ..., item11Quantity: ..., item11SourceTemplateId: ..., item11QuantitySourceId: ..., item11UnitPriceCents: ..., item11MaterialUnitPriceCents: ..., item11LabourUnitPriceCents: ..., item11MatchedKeywords: ..., includeItem12: ..., item12Name: ..., item12DisplayOrder: ..., item12Quantity: ..., item12SourceTemplateId: ..., item12QuantitySourceId: ..., item12UnitPriceCents: ..., item12MaterialUnitPriceCents: ..., item12LabourUnitPriceCents: ..., item12MatchedKeywords: ..., includeItem13: ..., item13Name: ..., item13DisplayOrder: ..., item13Quantity: ..., item13SourceTemplateId: ..., item13QuantitySourceId: ..., item13UnitPriceCents: ..., item13MaterialUnitPriceCents: ..., item13LabourUnitPriceCents: ..., item13MatchedKeywords: ..., includeItem14: ..., item14Name: ..., item14DisplayOrder: ..., item14Quantity: ..., item14SourceTemplateId: ..., item14QuantitySourceId: ..., item14UnitPriceCents: ..., item14MaterialUnitPriceCents: ..., item14LabourUnitPriceCents: ..., item14MatchedKeywords: ..., includeItem15: ..., item15Name: ..., item15DisplayOrder: ..., item15Quantity: ..., item15SourceTemplateId: ..., item15QuantitySourceId: ..., item15UnitPriceCents: ..., item15MaterialUnitPriceCents: ..., item15LabourUnitPriceCents: ..., item15MatchedKeywords: ..., includeItem16: ..., item16Name: ..., item16DisplayOrder: ..., item16Quantity: ..., item16SourceTemplateId: ..., item16QuantitySourceId: ..., item16UnitPriceCents: ..., item16MaterialUnitPriceCents: ..., item16LabourUnitPriceCents: ..., item16MatchedKeywords: ..., includeItem17: ..., item17Name: ..., item17DisplayOrder: ..., item17Quantity: ..., item17SourceTemplateId: ..., item17QuantitySourceId: ..., item17UnitPriceCents: ..., item17MaterialUnitPriceCents: ..., item17LabourUnitPriceCents: ..., item17MatchedKeywords: ..., includeItem18: ..., item18Name: ..., item18DisplayOrder: ..., item18Quantity: ..., item18SourceTemplateId: ..., item18QuantitySourceId: ..., item18UnitPriceCents: ..., item18MaterialUnitPriceCents: ..., item18LabourUnitPriceCents: ..., item18MatchedKeywords: ..., includeItem19: ..., item19Name: ..., item19DisplayOrder: ..., item19Quantity: ..., item19SourceTemplateId: ..., item19QuantitySourceId: ..., item19UnitPriceCents: ..., item19MaterialUnitPriceCents: ..., item19LabourUnitPriceCents: ..., item19MatchedKeywords: ..., includeItem20: ..., item20Name: ..., item20DisplayOrder: ..., item20Quantity: ..., item20SourceTemplateId: ..., item20QuantitySourceId: ..., item20UnitPriceCents: ..., item20MaterialUnitPriceCents: ..., item20LabourUnitPriceCents: ..., item20MatchedKeywords: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createQuoteWithItemsVars, options);

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
    console.log(mutation.data.quote_deleteMany);
    console.log(mutation.data.quote_insert);
    console.log(mutation.data.item1);
    console.log(mutation.data.item2);
    console.log(mutation.data.item3);
    console.log(mutation.data.item4);
    console.log(mutation.data.item5);
    console.log(mutation.data.item6);
    console.log(mutation.data.item7);
    console.log(mutation.data.item8);
    console.log(mutation.data.item9);
    console.log(mutation.data.item10);
    console.log(mutation.data.item11);
    console.log(mutation.data.item12);
    console.log(mutation.data.item13);
    console.log(mutation.data.item14);
    console.log(mutation.data.item15);
    console.log(mutation.data.item16);
    console.log(mutation.data.item17);
    console.log(mutation.data.item18);
    console.log(mutation.data.item19);
    console.log(mutation.data.item20);
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

