# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `data-connector-web`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`data-connector-web/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
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
  - [*UpsertMyUserSettings*](#upsertmyusersettings)
  - [*UpsertMyUserSignature*](#upsertmyusersignature)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `data-connector-web`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@generated/data-connector-web` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@generated/data-connector-web';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@generated/data-connector-web';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `data-connector-web` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListMyCompanies
You can execute the `ListMyCompanies` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
listMyCompanies(options?: ExecuteQueryOptions): QueryPromise<ListMyCompaniesData, undefined>;

interface ListMyCompaniesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyCompaniesData, undefined>;
}
export const listMyCompaniesRef: ListMyCompaniesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyCompanies(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyCompaniesData, undefined>;

interface ListMyCompaniesRef {
  ...
  (dc: DataConnect): QueryRef<ListMyCompaniesData, undefined>;
}
export const listMyCompaniesRef: ListMyCompaniesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyCompaniesRef:
```typescript
const name = listMyCompaniesRef.operationName;
console.log(name);
```

### Variables
The `ListMyCompanies` query has no variables.
### Return Type
Recall that executing the `ListMyCompanies` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyCompaniesData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `ListMyCompanies`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyCompanies } from '@generated/data-connector-web';


// Call the `listMyCompanies()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyCompanies();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyCompanies(dataConnect);

console.log(data.companies);

// Or, you can use the `Promise` API.
listMyCompanies().then((response) => {
  const data = response.data;
  console.log(data.companies);
});
```

### Using `ListMyCompanies`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyCompaniesRef } from '@generated/data-connector-web';


// Call the `listMyCompaniesRef()` function to get a reference to the query.
const ref = listMyCompaniesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyCompaniesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.companies);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.companies);
});
```

## GetMyCompany
You can execute the `GetMyCompany` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
getMyCompany(vars: GetMyCompanyVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyCompanyData, GetMyCompanyVariables>;

interface GetMyCompanyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyCompanyVariables): QueryRef<GetMyCompanyData, GetMyCompanyVariables>;
}
export const getMyCompanyRef: GetMyCompanyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyCompany(dc: DataConnect, vars: GetMyCompanyVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyCompanyData, GetMyCompanyVariables>;

interface GetMyCompanyRef {
  ...
  (dc: DataConnect, vars: GetMyCompanyVariables): QueryRef<GetMyCompanyData, GetMyCompanyVariables>;
}
export const getMyCompanyRef: GetMyCompanyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyCompanyRef:
```typescript
const name = getMyCompanyRef.operationName;
console.log(name);
```

### Variables
The `GetMyCompany` query requires an argument of type `GetMyCompanyVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMyCompanyVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetMyCompany` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyCompanyData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetMyCompany`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyCompany, GetMyCompanyVariables } from '@generated/data-connector-web';

// The `GetMyCompany` query requires an argument of type `GetMyCompanyVariables`:
const getMyCompanyVars: GetMyCompanyVariables = {
  id: ..., 
};

// Call the `getMyCompany()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyCompany(getMyCompanyVars);
// Variables can be defined inline as well.
const { data } = await getMyCompany({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyCompany(dataConnect, getMyCompanyVars);

console.log(data.company);

// Or, you can use the `Promise` API.
getMyCompany(getMyCompanyVars).then((response) => {
  const data = response.data;
  console.log(data.company);
});
```

### Using `GetMyCompany`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyCompanyRef, GetMyCompanyVariables } from '@generated/data-connector-web';

// The `GetMyCompany` query requires an argument of type `GetMyCompanyVariables`:
const getMyCompanyVars: GetMyCompanyVariables = {
  id: ..., 
};

// Call the `getMyCompanyRef()` function to get a reference to the query.
const ref = getMyCompanyRef(getMyCompanyVars);
// Variables can be defined inline as well.
const ref = getMyCompanyRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyCompanyRef(dataConnect, getMyCompanyVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.company);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.company);
});
```

## ListMyCompanyContacts
You can execute the `ListMyCompanyContacts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
listMyCompanyContacts(vars: ListMyCompanyContactsVariables, options?: ExecuteQueryOptions): QueryPromise<ListMyCompanyContactsData, ListMyCompanyContactsVariables>;

interface ListMyCompanyContactsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMyCompanyContactsVariables): QueryRef<ListMyCompanyContactsData, ListMyCompanyContactsVariables>;
}
export const listMyCompanyContactsRef: ListMyCompanyContactsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyCompanyContacts(dc: DataConnect, vars: ListMyCompanyContactsVariables, options?: ExecuteQueryOptions): QueryPromise<ListMyCompanyContactsData, ListMyCompanyContactsVariables>;

interface ListMyCompanyContactsRef {
  ...
  (dc: DataConnect, vars: ListMyCompanyContactsVariables): QueryRef<ListMyCompanyContactsData, ListMyCompanyContactsVariables>;
}
export const listMyCompanyContactsRef: ListMyCompanyContactsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyCompanyContactsRef:
```typescript
const name = listMyCompanyContactsRef.operationName;
console.log(name);
```

### Variables
The `ListMyCompanyContacts` query requires an argument of type `ListMyCompanyContactsVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListMyCompanyContactsVariables {
  companyId: UUIDString;
}
```
### Return Type
Recall that executing the `ListMyCompanyContacts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyCompanyContactsData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `ListMyCompanyContacts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyCompanyContacts, ListMyCompanyContactsVariables } from '@generated/data-connector-web';

// The `ListMyCompanyContacts` query requires an argument of type `ListMyCompanyContactsVariables`:
const listMyCompanyContactsVars: ListMyCompanyContactsVariables = {
  companyId: ..., 
};

// Call the `listMyCompanyContacts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyCompanyContacts(listMyCompanyContactsVars);
// Variables can be defined inline as well.
const { data } = await listMyCompanyContacts({ companyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyCompanyContacts(dataConnect, listMyCompanyContactsVars);

console.log(data.companyContacts);

// Or, you can use the `Promise` API.
listMyCompanyContacts(listMyCompanyContactsVars).then((response) => {
  const data = response.data;
  console.log(data.companyContacts);
});
```

### Using `ListMyCompanyContacts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyCompanyContactsRef, ListMyCompanyContactsVariables } from '@generated/data-connector-web';

// The `ListMyCompanyContacts` query requires an argument of type `ListMyCompanyContactsVariables`:
const listMyCompanyContactsVars: ListMyCompanyContactsVariables = {
  companyId: ..., 
};

// Call the `listMyCompanyContactsRef()` function to get a reference to the query.
const ref = listMyCompanyContactsRef(listMyCompanyContactsVars);
// Variables can be defined inline as well.
const ref = listMyCompanyContactsRef({ companyId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyCompanyContactsRef(dataConnect, listMyCompanyContactsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.companyContacts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.companyContacts);
});
```

## ListQuestionnaireTemplates
You can execute the `ListQuestionnaireTemplates` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
listQuestionnaireTemplates(options?: ExecuteQueryOptions): QueryPromise<ListQuestionnaireTemplatesData, undefined>;

interface ListQuestionnaireTemplatesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQuestionnaireTemplatesData, undefined>;
}
export const listQuestionnaireTemplatesRef: ListQuestionnaireTemplatesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listQuestionnaireTemplates(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListQuestionnaireTemplatesData, undefined>;

interface ListQuestionnaireTemplatesRef {
  ...
  (dc: DataConnect): QueryRef<ListQuestionnaireTemplatesData, undefined>;
}
export const listQuestionnaireTemplatesRef: ListQuestionnaireTemplatesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listQuestionnaireTemplatesRef:
```typescript
const name = listQuestionnaireTemplatesRef.operationName;
console.log(name);
```

### Variables
The `ListQuestionnaireTemplates` query has no variables.
### Return Type
Recall that executing the `ListQuestionnaireTemplates` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListQuestionnaireTemplatesData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListQuestionnaireTemplatesData {
  questionnaireTemplates: ({
    id: UUIDString;
    name: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & QuestionnaireTemplate_Key)[];
}
```
### Using `ListQuestionnaireTemplates`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listQuestionnaireTemplates } from '@generated/data-connector-web';


// Call the `listQuestionnaireTemplates()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listQuestionnaireTemplates();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listQuestionnaireTemplates(dataConnect);

console.log(data.questionnaireTemplates);

// Or, you can use the `Promise` API.
listQuestionnaireTemplates().then((response) => {
  const data = response.data;
  console.log(data.questionnaireTemplates);
});
```

### Using `ListQuestionnaireTemplates`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listQuestionnaireTemplatesRef } from '@generated/data-connector-web';


// Call the `listQuestionnaireTemplatesRef()` function to get a reference to the query.
const ref = listQuestionnaireTemplatesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listQuestionnaireTemplatesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.questionnaireTemplates);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.questionnaireTemplates);
});
```

## GetQuestionnaireTemplate
You can execute the `GetQuestionnaireTemplate` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
getQuestionnaireTemplate(vars: GetQuestionnaireTemplateVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuestionnaireTemplateData, GetQuestionnaireTemplateVariables>;

interface GetQuestionnaireTemplateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuestionnaireTemplateVariables): QueryRef<GetQuestionnaireTemplateData, GetQuestionnaireTemplateVariables>;
}
export const getQuestionnaireTemplateRef: GetQuestionnaireTemplateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getQuestionnaireTemplate(dc: DataConnect, vars: GetQuestionnaireTemplateVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuestionnaireTemplateData, GetQuestionnaireTemplateVariables>;

interface GetQuestionnaireTemplateRef {
  ...
  (dc: DataConnect, vars: GetQuestionnaireTemplateVariables): QueryRef<GetQuestionnaireTemplateData, GetQuestionnaireTemplateVariables>;
}
export const getQuestionnaireTemplateRef: GetQuestionnaireTemplateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getQuestionnaireTemplateRef:
```typescript
const name = getQuestionnaireTemplateRef.operationName;
console.log(name);
```

### Variables
The `GetQuestionnaireTemplate` query requires an argument of type `GetQuestionnaireTemplateVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetQuestionnaireTemplateVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetQuestionnaireTemplate` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetQuestionnaireTemplateData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetQuestionnaireTemplate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getQuestionnaireTemplate, GetQuestionnaireTemplateVariables } from '@generated/data-connector-web';

// The `GetQuestionnaireTemplate` query requires an argument of type `GetQuestionnaireTemplateVariables`:
const getQuestionnaireTemplateVars: GetQuestionnaireTemplateVariables = {
  id: ..., 
};

// Call the `getQuestionnaireTemplate()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getQuestionnaireTemplate(getQuestionnaireTemplateVars);
// Variables can be defined inline as well.
const { data } = await getQuestionnaireTemplate({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getQuestionnaireTemplate(dataConnect, getQuestionnaireTemplateVars);

console.log(data.questionnaireTemplate);

// Or, you can use the `Promise` API.
getQuestionnaireTemplate(getQuestionnaireTemplateVars).then((response) => {
  const data = response.data;
  console.log(data.questionnaireTemplate);
});
```

### Using `GetQuestionnaireTemplate`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getQuestionnaireTemplateRef, GetQuestionnaireTemplateVariables } from '@generated/data-connector-web';

// The `GetQuestionnaireTemplate` query requires an argument of type `GetQuestionnaireTemplateVariables`:
const getQuestionnaireTemplateVars: GetQuestionnaireTemplateVariables = {
  id: ..., 
};

// Call the `getQuestionnaireTemplateRef()` function to get a reference to the query.
const ref = getQuestionnaireTemplateRef(getQuestionnaireTemplateVars);
// Variables can be defined inline as well.
const ref = getQuestionnaireTemplateRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getQuestionnaireTemplateRef(dataConnect, getQuestionnaireTemplateVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.questionnaireTemplate);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.questionnaireTemplate);
});
```

## ListProjectQuestionnaires
You can execute the `ListProjectQuestionnaires` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
listProjectQuestionnaires(options?: ExecuteQueryOptions): QueryPromise<ListProjectQuestionnairesData, undefined>;

interface ListProjectQuestionnairesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProjectQuestionnairesData, undefined>;
}
export const listProjectQuestionnairesRef: ListProjectQuestionnairesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProjectQuestionnaires(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListProjectQuestionnairesData, undefined>;

interface ListProjectQuestionnairesRef {
  ...
  (dc: DataConnect): QueryRef<ListProjectQuestionnairesData, undefined>;
}
export const listProjectQuestionnairesRef: ListProjectQuestionnairesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProjectQuestionnairesRef:
```typescript
const name = listProjectQuestionnairesRef.operationName;
console.log(name);
```

### Variables
The `ListProjectQuestionnaires` query has no variables.
### Return Type
Recall that executing the `ListProjectQuestionnaires` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProjectQuestionnairesData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `ListProjectQuestionnaires`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProjectQuestionnaires } from '@generated/data-connector-web';


// Call the `listProjectQuestionnaires()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProjectQuestionnaires();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProjectQuestionnaires(dataConnect);

console.log(data.projectQuestionnaires);

// Or, you can use the `Promise` API.
listProjectQuestionnaires().then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaires);
});
```

### Using `ListProjectQuestionnaires`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProjectQuestionnairesRef } from '@generated/data-connector-web';


// Call the `listProjectQuestionnairesRef()` function to get a reference to the query.
const ref = listProjectQuestionnairesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProjectQuestionnairesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projectQuestionnaires);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaires);
});
```

## GetProjectQuestionnaire
You can execute the `GetProjectQuestionnaire` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
getProjectQuestionnaire(vars: GetProjectQuestionnaireVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectQuestionnaireData, GetProjectQuestionnaireVariables>;

interface GetProjectQuestionnaireRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProjectQuestionnaireVariables): QueryRef<GetProjectQuestionnaireData, GetProjectQuestionnaireVariables>;
}
export const getProjectQuestionnaireRef: GetProjectQuestionnaireRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getProjectQuestionnaire(dc: DataConnect, vars: GetProjectQuestionnaireVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectQuestionnaireData, GetProjectQuestionnaireVariables>;

interface GetProjectQuestionnaireRef {
  ...
  (dc: DataConnect, vars: GetProjectQuestionnaireVariables): QueryRef<GetProjectQuestionnaireData, GetProjectQuestionnaireVariables>;
}
export const getProjectQuestionnaireRef: GetProjectQuestionnaireRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getProjectQuestionnaireRef:
```typescript
const name = getProjectQuestionnaireRef.operationName;
console.log(name);
```

### Variables
The `GetProjectQuestionnaire` query requires an argument of type `GetProjectQuestionnaireVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetProjectQuestionnaireVariables {
  projectId: UUIDString;
}
```
### Return Type
Recall that executing the `GetProjectQuestionnaire` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetProjectQuestionnaireData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetProjectQuestionnaire`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getProjectQuestionnaire, GetProjectQuestionnaireVariables } from '@generated/data-connector-web';

// The `GetProjectQuestionnaire` query requires an argument of type `GetProjectQuestionnaireVariables`:
const getProjectQuestionnaireVars: GetProjectQuestionnaireVariables = {
  projectId: ..., 
};

// Call the `getProjectQuestionnaire()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getProjectQuestionnaire(getProjectQuestionnaireVars);
// Variables can be defined inline as well.
const { data } = await getProjectQuestionnaire({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getProjectQuestionnaire(dataConnect, getProjectQuestionnaireVars);

console.log(data.projectQuestionnaire);

// Or, you can use the `Promise` API.
getProjectQuestionnaire(getProjectQuestionnaireVars).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaire);
});
```

### Using `GetProjectQuestionnaire`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getProjectQuestionnaireRef, GetProjectQuestionnaireVariables } from '@generated/data-connector-web';

// The `GetProjectQuestionnaire` query requires an argument of type `GetProjectQuestionnaireVariables`:
const getProjectQuestionnaireVars: GetProjectQuestionnaireVariables = {
  projectId: ..., 
};

// Call the `getProjectQuestionnaireRef()` function to get a reference to the query.
const ref = getProjectQuestionnaireRef(getProjectQuestionnaireVars);
// Variables can be defined inline as well.
const ref = getProjectQuestionnaireRef({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getProjectQuestionnaireRef(dataConnect, getProjectQuestionnaireVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projectQuestionnaire);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaire);
});
```

## ListQuoteItemTemplates
You can execute the `ListQuoteItemTemplates` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
listQuoteItemTemplates(options?: ExecuteQueryOptions): QueryPromise<ListQuoteItemTemplatesData, undefined>;

interface ListQuoteItemTemplatesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQuoteItemTemplatesData, undefined>;
}
export const listQuoteItemTemplatesRef: ListQuoteItemTemplatesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listQuoteItemTemplates(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListQuoteItemTemplatesData, undefined>;

interface ListQuoteItemTemplatesRef {
  ...
  (dc: DataConnect): QueryRef<ListQuoteItemTemplatesData, undefined>;
}
export const listQuoteItemTemplatesRef: ListQuoteItemTemplatesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listQuoteItemTemplatesRef:
```typescript
const name = listQuoteItemTemplatesRef.operationName;
console.log(name);
```

### Variables
The `ListQuoteItemTemplates` query has no variables.
### Return Type
Recall that executing the `ListQuoteItemTemplates` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListQuoteItemTemplatesData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `ListQuoteItemTemplates`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listQuoteItemTemplates } from '@generated/data-connector-web';


// Call the `listQuoteItemTemplates()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listQuoteItemTemplates();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listQuoteItemTemplates(dataConnect);

console.log(data.quoteItemTemplates);

// Or, you can use the `Promise` API.
listQuoteItemTemplates().then((response) => {
  const data = response.data;
  console.log(data.quoteItemTemplates);
});
```

### Using `ListQuoteItemTemplates`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listQuoteItemTemplatesRef } from '@generated/data-connector-web';


// Call the `listQuoteItemTemplatesRef()` function to get a reference to the query.
const ref = listQuoteItemTemplatesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listQuoteItemTemplatesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quoteItemTemplates);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteItemTemplates);
});
```

## ListQuoteTemplatesForTeam
You can execute the `ListQuoteTemplatesForTeam` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
listQuoteTemplatesForTeam(options?: ExecuteQueryOptions): QueryPromise<ListQuoteTemplatesForTeamData, undefined>;

interface ListQuoteTemplatesForTeamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQuoteTemplatesForTeamData, undefined>;
}
export const listQuoteTemplatesForTeamRef: ListQuoteTemplatesForTeamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listQuoteTemplatesForTeam(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListQuoteTemplatesForTeamData, undefined>;

interface ListQuoteTemplatesForTeamRef {
  ...
  (dc: DataConnect): QueryRef<ListQuoteTemplatesForTeamData, undefined>;
}
export const listQuoteTemplatesForTeamRef: ListQuoteTemplatesForTeamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listQuoteTemplatesForTeamRef:
```typescript
const name = listQuoteTemplatesForTeamRef.operationName;
console.log(name);
```

### Variables
The `ListQuoteTemplatesForTeam` query has no variables.
### Return Type
Recall that executing the `ListQuoteTemplatesForTeam` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListQuoteTemplatesForTeamData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListQuoteTemplatesForTeamData {
  quoteTemplates: ({
    id: UUIDString;
    name: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & QuoteTemplate_Key)[];
}
```
### Using `ListQuoteTemplatesForTeam`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listQuoteTemplatesForTeam } from '@generated/data-connector-web';


// Call the `listQuoteTemplatesForTeam()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listQuoteTemplatesForTeam();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listQuoteTemplatesForTeam(dataConnect);

console.log(data.quoteTemplates);

// Or, you can use the `Promise` API.
listQuoteTemplatesForTeam().then((response) => {
  const data = response.data;
  console.log(data.quoteTemplates);
});
```

### Using `ListQuoteTemplatesForTeam`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listQuoteTemplatesForTeamRef } from '@generated/data-connector-web';


// Call the `listQuoteTemplatesForTeamRef()` function to get a reference to the query.
const ref = listQuoteTemplatesForTeamRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listQuoteTemplatesForTeamRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quoteTemplates);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteTemplates);
});
```

## ListQuoteItemTemplateConfigsForQuoteTemplate
You can execute the `ListQuoteItemTemplateConfigsForQuoteTemplate` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
listQuoteItemTemplateConfigsForQuoteTemplate(vars: ListQuoteItemTemplateConfigsForQuoteTemplateVariables, options?: ExecuteQueryOptions): QueryPromise<ListQuoteItemTemplateConfigsForQuoteTemplateData, ListQuoteItemTemplateConfigsForQuoteTemplateVariables>;

interface ListQuoteItemTemplateConfigsForQuoteTemplateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListQuoteItemTemplateConfigsForQuoteTemplateVariables): QueryRef<ListQuoteItemTemplateConfigsForQuoteTemplateData, ListQuoteItemTemplateConfigsForQuoteTemplateVariables>;
}
export const listQuoteItemTemplateConfigsForQuoteTemplateRef: ListQuoteItemTemplateConfigsForQuoteTemplateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listQuoteItemTemplateConfigsForQuoteTemplate(dc: DataConnect, vars: ListQuoteItemTemplateConfigsForQuoteTemplateVariables, options?: ExecuteQueryOptions): QueryPromise<ListQuoteItemTemplateConfigsForQuoteTemplateData, ListQuoteItemTemplateConfigsForQuoteTemplateVariables>;

interface ListQuoteItemTemplateConfigsForQuoteTemplateRef {
  ...
  (dc: DataConnect, vars: ListQuoteItemTemplateConfigsForQuoteTemplateVariables): QueryRef<ListQuoteItemTemplateConfigsForQuoteTemplateData, ListQuoteItemTemplateConfigsForQuoteTemplateVariables>;
}
export const listQuoteItemTemplateConfigsForQuoteTemplateRef: ListQuoteItemTemplateConfigsForQuoteTemplateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listQuoteItemTemplateConfigsForQuoteTemplateRef:
```typescript
const name = listQuoteItemTemplateConfigsForQuoteTemplateRef.operationName;
console.log(name);
```

### Variables
The `ListQuoteItemTemplateConfigsForQuoteTemplate` query requires an argument of type `ListQuoteItemTemplateConfigsForQuoteTemplateVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListQuoteItemTemplateConfigsForQuoteTemplateVariables {
  quoteTemplateId: UUIDString;
}
```
### Return Type
Recall that executing the `ListQuoteItemTemplateConfigsForQuoteTemplate` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListQuoteItemTemplateConfigsForQuoteTemplateData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `ListQuoteItemTemplateConfigsForQuoteTemplate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listQuoteItemTemplateConfigsForQuoteTemplate, ListQuoteItemTemplateConfigsForQuoteTemplateVariables } from '@generated/data-connector-web';

// The `ListQuoteItemTemplateConfigsForQuoteTemplate` query requires an argument of type `ListQuoteItemTemplateConfigsForQuoteTemplateVariables`:
const listQuoteItemTemplateConfigsForQuoteTemplateVars: ListQuoteItemTemplateConfigsForQuoteTemplateVariables = {
  quoteTemplateId: ..., 
};

// Call the `listQuoteItemTemplateConfigsForQuoteTemplate()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listQuoteItemTemplateConfigsForQuoteTemplate(listQuoteItemTemplateConfigsForQuoteTemplateVars);
// Variables can be defined inline as well.
const { data } = await listQuoteItemTemplateConfigsForQuoteTemplate({ quoteTemplateId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listQuoteItemTemplateConfigsForQuoteTemplate(dataConnect, listQuoteItemTemplateConfigsForQuoteTemplateVars);

console.log(data.quoteItemTemplateConfigs);

// Or, you can use the `Promise` API.
listQuoteItemTemplateConfigsForQuoteTemplate(listQuoteItemTemplateConfigsForQuoteTemplateVars).then((response) => {
  const data = response.data;
  console.log(data.quoteItemTemplateConfigs);
});
```

### Using `ListQuoteItemTemplateConfigsForQuoteTemplate`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listQuoteItemTemplateConfigsForQuoteTemplateRef, ListQuoteItemTemplateConfigsForQuoteTemplateVariables } from '@generated/data-connector-web';

// The `ListQuoteItemTemplateConfigsForQuoteTemplate` query requires an argument of type `ListQuoteItemTemplateConfigsForQuoteTemplateVariables`:
const listQuoteItemTemplateConfigsForQuoteTemplateVars: ListQuoteItemTemplateConfigsForQuoteTemplateVariables = {
  quoteTemplateId: ..., 
};

// Call the `listQuoteItemTemplateConfigsForQuoteTemplateRef()` function to get a reference to the query.
const ref = listQuoteItemTemplateConfigsForQuoteTemplateRef(listQuoteItemTemplateConfigsForQuoteTemplateVars);
// Variables can be defined inline as well.
const ref = listQuoteItemTemplateConfigsForQuoteTemplateRef({ quoteTemplateId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listQuoteItemTemplateConfigsForQuoteTemplateRef(dataConnect, listQuoteItemTemplateConfigsForQuoteTemplateVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quoteItemTemplateConfigs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteItemTemplateConfigs);
});
```

## ListQuotesForTeam
You can execute the `ListQuotesForTeam` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
listQuotesForTeam(options?: ExecuteQueryOptions): QueryPromise<ListQuotesForTeamData, undefined>;

interface ListQuotesForTeamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQuotesForTeamData, undefined>;
}
export const listQuotesForTeamRef: ListQuotesForTeamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listQuotesForTeam(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListQuotesForTeamData, undefined>;

interface ListQuotesForTeamRef {
  ...
  (dc: DataConnect): QueryRef<ListQuotesForTeamData, undefined>;
}
export const listQuotesForTeamRef: ListQuotesForTeamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listQuotesForTeamRef:
```typescript
const name = listQuotesForTeamRef.operationName;
console.log(name);
```

### Variables
The `ListQuotesForTeam` query has no variables.
### Return Type
Recall that executing the `ListQuotesForTeam` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListQuotesForTeamData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `ListQuotesForTeam`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listQuotesForTeam } from '@generated/data-connector-web';


// Call the `listQuotesForTeam()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listQuotesForTeam();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listQuotesForTeam(dataConnect);

console.log(data.quotes);

// Or, you can use the `Promise` API.
listQuotesForTeam().then((response) => {
  const data = response.data;
  console.log(data.quotes);
});
```

### Using `ListQuotesForTeam`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listQuotesForTeamRef } from '@generated/data-connector-web';


// Call the `listQuotesForTeamRef()` function to get a reference to the query.
const ref = listQuotesForTeamRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listQuotesForTeamRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quotes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quotes);
});
```

## GetQuoteById
You can execute the `GetQuoteById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
getQuoteById(vars: GetQuoteByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuoteByIdData, GetQuoteByIdVariables>;

interface GetQuoteByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuoteByIdVariables): QueryRef<GetQuoteByIdData, GetQuoteByIdVariables>;
}
export const getQuoteByIdRef: GetQuoteByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getQuoteById(dc: DataConnect, vars: GetQuoteByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuoteByIdData, GetQuoteByIdVariables>;

interface GetQuoteByIdRef {
  ...
  (dc: DataConnect, vars: GetQuoteByIdVariables): QueryRef<GetQuoteByIdData, GetQuoteByIdVariables>;
}
export const getQuoteByIdRef: GetQuoteByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getQuoteByIdRef:
```typescript
const name = getQuoteByIdRef.operationName;
console.log(name);
```

### Variables
The `GetQuoteById` query requires an argument of type `GetQuoteByIdVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetQuoteByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetQuoteById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetQuoteByIdData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetQuoteById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getQuoteById, GetQuoteByIdVariables } from '@generated/data-connector-web';

// The `GetQuoteById` query requires an argument of type `GetQuoteByIdVariables`:
const getQuoteByIdVars: GetQuoteByIdVariables = {
  id: ..., 
};

// Call the `getQuoteById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getQuoteById(getQuoteByIdVars);
// Variables can be defined inline as well.
const { data } = await getQuoteById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getQuoteById(dataConnect, getQuoteByIdVars);

console.log(data.quote);

// Or, you can use the `Promise` API.
getQuoteById(getQuoteByIdVars).then((response) => {
  const data = response.data;
  console.log(data.quote);
});
```

### Using `GetQuoteById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getQuoteByIdRef, GetQuoteByIdVariables } from '@generated/data-connector-web';

// The `GetQuoteById` query requires an argument of type `GetQuoteByIdVariables`:
const getQuoteByIdVars: GetQuoteByIdVariables = {
  id: ..., 
};

// Call the `getQuoteByIdRef()` function to get a reference to the query.
const ref = getQuoteByIdRef(getQuoteByIdVars);
// Variables can be defined inline as well.
const ref = getQuoteByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getQuoteByIdRef(dataConnect, getQuoteByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quote);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quote);
});
```

## GetQuoteReadiness
You can execute the `GetQuoteReadiness` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
getQuoteReadiness(vars: GetQuoteReadinessVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuoteReadinessData, GetQuoteReadinessVariables>;

interface GetQuoteReadinessRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuoteReadinessVariables): QueryRef<GetQuoteReadinessData, GetQuoteReadinessVariables>;
}
export const getQuoteReadinessRef: GetQuoteReadinessRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getQuoteReadiness(dc: DataConnect, vars: GetQuoteReadinessVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuoteReadinessData, GetQuoteReadinessVariables>;

interface GetQuoteReadinessRef {
  ...
  (dc: DataConnect, vars: GetQuoteReadinessVariables): QueryRef<GetQuoteReadinessData, GetQuoteReadinessVariables>;
}
export const getQuoteReadinessRef: GetQuoteReadinessRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getQuoteReadinessRef:
```typescript
const name = getQuoteReadinessRef.operationName;
console.log(name);
```

### Variables
The `GetQuoteReadiness` query requires an argument of type `GetQuoteReadinessVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetQuoteReadinessVariables {
  projectId: UUIDString;
}
```
### Return Type
Recall that executing the `GetQuoteReadiness` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetQuoteReadinessData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetQuoteReadiness`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getQuoteReadiness, GetQuoteReadinessVariables } from '@generated/data-connector-web';

// The `GetQuoteReadiness` query requires an argument of type `GetQuoteReadinessVariables`:
const getQuoteReadinessVars: GetQuoteReadinessVariables = {
  projectId: ..., 
};

// Call the `getQuoteReadiness()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getQuoteReadiness(getQuoteReadinessVars);
// Variables can be defined inline as well.
const { data } = await getQuoteReadiness({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getQuoteReadiness(dataConnect, getQuoteReadinessVars);

console.log(data.project);
console.log(data.floorplanPages);
console.log(data.projectQuestionnaireQuestions);
console.log(data.quoteItemTemplateConfigs);

// Or, you can use the `Promise` API.
getQuoteReadiness(getQuoteReadinessVars).then((response) => {
  const data = response.data;
  console.log(data.project);
  console.log(data.floorplanPages);
  console.log(data.projectQuestionnaireQuestions);
  console.log(data.quoteItemTemplateConfigs);
});
```

### Using `GetQuoteReadiness`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getQuoteReadinessRef, GetQuoteReadinessVariables } from '@generated/data-connector-web';

// The `GetQuoteReadiness` query requires an argument of type `GetQuoteReadinessVariables`:
const getQuoteReadinessVars: GetQuoteReadinessVariables = {
  projectId: ..., 
};

// Call the `getQuoteReadinessRef()` function to get a reference to the query.
const ref = getQuoteReadinessRef(getQuoteReadinessVars);
// Variables can be defined inline as well.
const ref = getQuoteReadinessRef({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getQuoteReadinessRef(dataConnect, getQuoteReadinessVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.project);
console.log(data.floorplanPages);
console.log(data.projectQuestionnaireQuestions);
console.log(data.quoteItemTemplateConfigs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.project);
  console.log(data.floorplanPages);
  console.log(data.projectQuestionnaireQuestions);
  console.log(data.quoteItemTemplateConfigs);
});
```

## GetMyTeam
You can execute the `GetMyTeam` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
getMyTeam(options?: ExecuteQueryOptions): QueryPromise<GetMyTeamData, undefined>;

interface GetMyTeamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyTeamData, undefined>;
}
export const getMyTeamRef: GetMyTeamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyTeam(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyTeamData, undefined>;

interface GetMyTeamRef {
  ...
  (dc: DataConnect): QueryRef<GetMyTeamData, undefined>;
}
export const getMyTeamRef: GetMyTeamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyTeamRef:
```typescript
const name = getMyTeamRef.operationName;
console.log(name);
```

### Variables
The `GetMyTeam` query has no variables.
### Return Type
Recall that executing the `GetMyTeam` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyTeamData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetMyTeam`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyTeam } from '@generated/data-connector-web';


// Call the `getMyTeam()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyTeam();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyTeam(dataConnect);

console.log(data.teamMembers);

// Or, you can use the `Promise` API.
getMyTeam().then((response) => {
  const data = response.data;
  console.log(data.teamMembers);
});
```

### Using `GetMyTeam`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyTeamRef } from '@generated/data-connector-web';


// Call the `getMyTeamRef()` function to get a reference to the query.
const ref = getMyTeamRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyTeamRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.teamMembers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.teamMembers);
});
```

## GetMyUserSettings
You can execute the `GetMyUserSettings` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
getMyUserSettings(options?: ExecuteQueryOptions): QueryPromise<GetMyUserSettingsData, undefined>;

interface GetMyUserSettingsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyUserSettingsData, undefined>;
}
export const getMyUserSettingsRef: GetMyUserSettingsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyUserSettings(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyUserSettingsData, undefined>;

interface GetMyUserSettingsRef {
  ...
  (dc: DataConnect): QueryRef<GetMyUserSettingsData, undefined>;
}
export const getMyUserSettingsRef: GetMyUserSettingsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyUserSettingsRef:
```typescript
const name = getMyUserSettingsRef.operationName;
console.log(name);
```

### Variables
The `GetMyUserSettings` query has no variables.
### Return Type
Recall that executing the `GetMyUserSettings` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyUserSettingsData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetMyUserSettings`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyUserSettings } from '@generated/data-connector-web';


// Call the `getMyUserSettings()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyUserSettings();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyUserSettings(dataConnect);

console.log(data.userSettings);

// Or, you can use the `Promise` API.
getMyUserSettings().then((response) => {
  const data = response.data;
  console.log(data.userSettings);
});
```

### Using `GetMyUserSettings`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyUserSettingsRef } from '@generated/data-connector-web';


// Call the `getMyUserSettingsRef()` function to get a reference to the query.
const ref = getMyUserSettingsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyUserSettingsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userSettings);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userSettings);
});
```

## GetMyUserSignature
You can execute the `GetMyUserSignature` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
getMyUserSignature(options?: ExecuteQueryOptions): QueryPromise<GetMyUserSignatureData, undefined>;

interface GetMyUserSignatureRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyUserSignatureData, undefined>;
}
export const getMyUserSignatureRef: GetMyUserSignatureRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyUserSignature(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyUserSignatureData, undefined>;

interface GetMyUserSignatureRef {
  ...
  (dc: DataConnect): QueryRef<GetMyUserSignatureData, undefined>;
}
export const getMyUserSignatureRef: GetMyUserSignatureRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyUserSignatureRef:
```typescript
const name = getMyUserSignatureRef.operationName;
console.log(name);
```

### Variables
The `GetMyUserSignature` query has no variables.
### Return Type
Recall that executing the `GetMyUserSignature` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyUserSignatureData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetMyUserSignature`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyUserSignature } from '@generated/data-connector-web';


// Call the `getMyUserSignature()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyUserSignature();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyUserSignature(dataConnect);

console.log(data.userSignature);

// Or, you can use the `Promise` API.
getMyUserSignature().then((response) => {
  const data = response.data;
  console.log(data.userSignature);
});
```

### Using `GetMyUserSignature`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyUserSignatureRef } from '@generated/data-connector-web';


// Call the `getMyUserSignatureRef()` function to get a reference to the query.
const ref = getMyUserSignatureRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyUserSignatureRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userSignature);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userSignature);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `data-connector-web` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateMyCompany
You can execute the `CreateMyCompany` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createMyCompany(vars: CreateMyCompanyVariables): MutationPromise<CreateMyCompanyData, CreateMyCompanyVariables>;

interface CreateMyCompanyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMyCompanyVariables): MutationRef<CreateMyCompanyData, CreateMyCompanyVariables>;
}
export const createMyCompanyRef: CreateMyCompanyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMyCompany(dc: DataConnect, vars: CreateMyCompanyVariables): MutationPromise<CreateMyCompanyData, CreateMyCompanyVariables>;

interface CreateMyCompanyRef {
  ...
  (dc: DataConnect, vars: CreateMyCompanyVariables): MutationRef<CreateMyCompanyData, CreateMyCompanyVariables>;
}
export const createMyCompanyRef: CreateMyCompanyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMyCompanyRef:
```typescript
const name = createMyCompanyRef.operationName;
console.log(name);
```

### Variables
The `CreateMyCompany` mutation requires an argument of type `CreateMyCompanyVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateMyCompanyVariables {
  id: UUIDString;
  companyName: string;
  businessNumber?: string | null;
  phoneNumber?: string | null;
}
```
### Return Type
Recall that executing the `CreateMyCompany` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMyCompanyData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMyCompanyData {
  company_insert: Company_Key;
}
```
### Using `CreateMyCompany`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMyCompany, CreateMyCompanyVariables } from '@generated/data-connector-web';

// The `CreateMyCompany` mutation requires an argument of type `CreateMyCompanyVariables`:
const createMyCompanyVars: CreateMyCompanyVariables = {
  id: ..., 
  companyName: ..., 
  businessNumber: ..., // optional
  phoneNumber: ..., // optional
};

// Call the `createMyCompany()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMyCompany(createMyCompanyVars);
// Variables can be defined inline as well.
const { data } = await createMyCompany({ id: ..., companyName: ..., businessNumber: ..., phoneNumber: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMyCompany(dataConnect, createMyCompanyVars);

console.log(data.company_insert);

// Or, you can use the `Promise` API.
createMyCompany(createMyCompanyVars).then((response) => {
  const data = response.data;
  console.log(data.company_insert);
});
```

### Using `CreateMyCompany`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMyCompanyRef, CreateMyCompanyVariables } from '@generated/data-connector-web';

// The `CreateMyCompany` mutation requires an argument of type `CreateMyCompanyVariables`:
const createMyCompanyVars: CreateMyCompanyVariables = {
  id: ..., 
  companyName: ..., 
  businessNumber: ..., // optional
  phoneNumber: ..., // optional
};

// Call the `createMyCompanyRef()` function to get a reference to the mutation.
const ref = createMyCompanyRef(createMyCompanyVars);
// Variables can be defined inline as well.
const ref = createMyCompanyRef({ id: ..., companyName: ..., businessNumber: ..., phoneNumber: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMyCompanyRef(dataConnect, createMyCompanyVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.company_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.company_insert);
});
```

## UpdateMyCompany
You can execute the `UpdateMyCompany` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateMyCompany(vars: UpdateMyCompanyVariables): MutationPromise<UpdateMyCompanyData, UpdateMyCompanyVariables>;

interface UpdateMyCompanyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMyCompanyVariables): MutationRef<UpdateMyCompanyData, UpdateMyCompanyVariables>;
}
export const updateMyCompanyRef: UpdateMyCompanyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMyCompany(dc: DataConnect, vars: UpdateMyCompanyVariables): MutationPromise<UpdateMyCompanyData, UpdateMyCompanyVariables>;

interface UpdateMyCompanyRef {
  ...
  (dc: DataConnect, vars: UpdateMyCompanyVariables): MutationRef<UpdateMyCompanyData, UpdateMyCompanyVariables>;
}
export const updateMyCompanyRef: UpdateMyCompanyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMyCompanyRef:
```typescript
const name = updateMyCompanyRef.operationName;
console.log(name);
```

### Variables
The `UpdateMyCompany` mutation requires an argument of type `UpdateMyCompanyVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMyCompanyVariables {
  id: UUIDString;
  companyName: string;
  businessNumber?: string | null;
  phoneNumber?: string | null;
}
```
### Return Type
Recall that executing the `UpdateMyCompany` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMyCompanyData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMyCompanyData {
  company_update?: Company_Key | null;
}
```
### Using `UpdateMyCompany`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMyCompany, UpdateMyCompanyVariables } from '@generated/data-connector-web';

// The `UpdateMyCompany` mutation requires an argument of type `UpdateMyCompanyVariables`:
const updateMyCompanyVars: UpdateMyCompanyVariables = {
  id: ..., 
  companyName: ..., 
  businessNumber: ..., // optional
  phoneNumber: ..., // optional
};

// Call the `updateMyCompany()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMyCompany(updateMyCompanyVars);
// Variables can be defined inline as well.
const { data } = await updateMyCompany({ id: ..., companyName: ..., businessNumber: ..., phoneNumber: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMyCompany(dataConnect, updateMyCompanyVars);

console.log(data.company_update);

// Or, you can use the `Promise` API.
updateMyCompany(updateMyCompanyVars).then((response) => {
  const data = response.data;
  console.log(data.company_update);
});
```

### Using `UpdateMyCompany`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMyCompanyRef, UpdateMyCompanyVariables } from '@generated/data-connector-web';

// The `UpdateMyCompany` mutation requires an argument of type `UpdateMyCompanyVariables`:
const updateMyCompanyVars: UpdateMyCompanyVariables = {
  id: ..., 
  companyName: ..., 
  businessNumber: ..., // optional
  phoneNumber: ..., // optional
};

// Call the `updateMyCompanyRef()` function to get a reference to the mutation.
const ref = updateMyCompanyRef(updateMyCompanyVars);
// Variables can be defined inline as well.
const ref = updateMyCompanyRef({ id: ..., companyName: ..., businessNumber: ..., phoneNumber: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMyCompanyRef(dataConnect, updateMyCompanyVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.company_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.company_update);
});
```

## SetMyCompanyPrimaryContact
You can execute the `SetMyCompanyPrimaryContact` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
setMyCompanyPrimaryContact(vars: SetMyCompanyPrimaryContactVariables): MutationPromise<SetMyCompanyPrimaryContactData, SetMyCompanyPrimaryContactVariables>;

interface SetMyCompanyPrimaryContactRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetMyCompanyPrimaryContactVariables): MutationRef<SetMyCompanyPrimaryContactData, SetMyCompanyPrimaryContactVariables>;
}
export const setMyCompanyPrimaryContactRef: SetMyCompanyPrimaryContactRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
setMyCompanyPrimaryContact(dc: DataConnect, vars: SetMyCompanyPrimaryContactVariables): MutationPromise<SetMyCompanyPrimaryContactData, SetMyCompanyPrimaryContactVariables>;

interface SetMyCompanyPrimaryContactRef {
  ...
  (dc: DataConnect, vars: SetMyCompanyPrimaryContactVariables): MutationRef<SetMyCompanyPrimaryContactData, SetMyCompanyPrimaryContactVariables>;
}
export const setMyCompanyPrimaryContactRef: SetMyCompanyPrimaryContactRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the setMyCompanyPrimaryContactRef:
```typescript
const name = setMyCompanyPrimaryContactRef.operationName;
console.log(name);
```

### Variables
The `SetMyCompanyPrimaryContact` mutation requires an argument of type `SetMyCompanyPrimaryContactVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SetMyCompanyPrimaryContactVariables {
  companyId: UUIDString;
  contactId: UUIDString;
}
```
### Return Type
Recall that executing the `SetMyCompanyPrimaryContact` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SetMyCompanyPrimaryContactData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SetMyCompanyPrimaryContactData {
  company_update?: Company_Key | null;
}
```
### Using `SetMyCompanyPrimaryContact`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, setMyCompanyPrimaryContact, SetMyCompanyPrimaryContactVariables } from '@generated/data-connector-web';

// The `SetMyCompanyPrimaryContact` mutation requires an argument of type `SetMyCompanyPrimaryContactVariables`:
const setMyCompanyPrimaryContactVars: SetMyCompanyPrimaryContactVariables = {
  companyId: ..., 
  contactId: ..., 
};

// Call the `setMyCompanyPrimaryContact()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await setMyCompanyPrimaryContact(setMyCompanyPrimaryContactVars);
// Variables can be defined inline as well.
const { data } = await setMyCompanyPrimaryContact({ companyId: ..., contactId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await setMyCompanyPrimaryContact(dataConnect, setMyCompanyPrimaryContactVars);

console.log(data.company_update);

// Or, you can use the `Promise` API.
setMyCompanyPrimaryContact(setMyCompanyPrimaryContactVars).then((response) => {
  const data = response.data;
  console.log(data.company_update);
});
```

### Using `SetMyCompanyPrimaryContact`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, setMyCompanyPrimaryContactRef, SetMyCompanyPrimaryContactVariables } from '@generated/data-connector-web';

// The `SetMyCompanyPrimaryContact` mutation requires an argument of type `SetMyCompanyPrimaryContactVariables`:
const setMyCompanyPrimaryContactVars: SetMyCompanyPrimaryContactVariables = {
  companyId: ..., 
  contactId: ..., 
};

// Call the `setMyCompanyPrimaryContactRef()` function to get a reference to the mutation.
const ref = setMyCompanyPrimaryContactRef(setMyCompanyPrimaryContactVars);
// Variables can be defined inline as well.
const ref = setMyCompanyPrimaryContactRef({ companyId: ..., contactId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = setMyCompanyPrimaryContactRef(dataConnect, setMyCompanyPrimaryContactVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.company_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.company_update);
});
```

## ClearMyCompanyPrimaryContact
You can execute the `ClearMyCompanyPrimaryContact` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
clearMyCompanyPrimaryContact(vars: ClearMyCompanyPrimaryContactVariables): MutationPromise<ClearMyCompanyPrimaryContactData, ClearMyCompanyPrimaryContactVariables>;

interface ClearMyCompanyPrimaryContactRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ClearMyCompanyPrimaryContactVariables): MutationRef<ClearMyCompanyPrimaryContactData, ClearMyCompanyPrimaryContactVariables>;
}
export const clearMyCompanyPrimaryContactRef: ClearMyCompanyPrimaryContactRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
clearMyCompanyPrimaryContact(dc: DataConnect, vars: ClearMyCompanyPrimaryContactVariables): MutationPromise<ClearMyCompanyPrimaryContactData, ClearMyCompanyPrimaryContactVariables>;

interface ClearMyCompanyPrimaryContactRef {
  ...
  (dc: DataConnect, vars: ClearMyCompanyPrimaryContactVariables): MutationRef<ClearMyCompanyPrimaryContactData, ClearMyCompanyPrimaryContactVariables>;
}
export const clearMyCompanyPrimaryContactRef: ClearMyCompanyPrimaryContactRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the clearMyCompanyPrimaryContactRef:
```typescript
const name = clearMyCompanyPrimaryContactRef.operationName;
console.log(name);
```

### Variables
The `ClearMyCompanyPrimaryContact` mutation requires an argument of type `ClearMyCompanyPrimaryContactVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ClearMyCompanyPrimaryContactVariables {
  companyId: UUIDString;
}
```
### Return Type
Recall that executing the `ClearMyCompanyPrimaryContact` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ClearMyCompanyPrimaryContactData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ClearMyCompanyPrimaryContactData {
  company_update?: Company_Key | null;
}
```
### Using `ClearMyCompanyPrimaryContact`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, clearMyCompanyPrimaryContact, ClearMyCompanyPrimaryContactVariables } from '@generated/data-connector-web';

// The `ClearMyCompanyPrimaryContact` mutation requires an argument of type `ClearMyCompanyPrimaryContactVariables`:
const clearMyCompanyPrimaryContactVars: ClearMyCompanyPrimaryContactVariables = {
  companyId: ..., 
};

// Call the `clearMyCompanyPrimaryContact()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await clearMyCompanyPrimaryContact(clearMyCompanyPrimaryContactVars);
// Variables can be defined inline as well.
const { data } = await clearMyCompanyPrimaryContact({ companyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await clearMyCompanyPrimaryContact(dataConnect, clearMyCompanyPrimaryContactVars);

console.log(data.company_update);

// Or, you can use the `Promise` API.
clearMyCompanyPrimaryContact(clearMyCompanyPrimaryContactVars).then((response) => {
  const data = response.data;
  console.log(data.company_update);
});
```

### Using `ClearMyCompanyPrimaryContact`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, clearMyCompanyPrimaryContactRef, ClearMyCompanyPrimaryContactVariables } from '@generated/data-connector-web';

// The `ClearMyCompanyPrimaryContact` mutation requires an argument of type `ClearMyCompanyPrimaryContactVariables`:
const clearMyCompanyPrimaryContactVars: ClearMyCompanyPrimaryContactVariables = {
  companyId: ..., 
};

// Call the `clearMyCompanyPrimaryContactRef()` function to get a reference to the mutation.
const ref = clearMyCompanyPrimaryContactRef(clearMyCompanyPrimaryContactVars);
// Variables can be defined inline as well.
const ref = clearMyCompanyPrimaryContactRef({ companyId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = clearMyCompanyPrimaryContactRef(dataConnect, clearMyCompanyPrimaryContactVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.company_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.company_update);
});
```

## DeleteMyCompany
You can execute the `DeleteMyCompany` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
deleteMyCompany(vars: DeleteMyCompanyVariables): MutationPromise<DeleteMyCompanyData, DeleteMyCompanyVariables>;

interface DeleteMyCompanyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMyCompanyVariables): MutationRef<DeleteMyCompanyData, DeleteMyCompanyVariables>;
}
export const deleteMyCompanyRef: DeleteMyCompanyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMyCompany(dc: DataConnect, vars: DeleteMyCompanyVariables): MutationPromise<DeleteMyCompanyData, DeleteMyCompanyVariables>;

interface DeleteMyCompanyRef {
  ...
  (dc: DataConnect, vars: DeleteMyCompanyVariables): MutationRef<DeleteMyCompanyData, DeleteMyCompanyVariables>;
}
export const deleteMyCompanyRef: DeleteMyCompanyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMyCompanyRef:
```typescript
const name = deleteMyCompanyRef.operationName;
console.log(name);
```

### Variables
The `DeleteMyCompany` mutation requires an argument of type `DeleteMyCompanyVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteMyCompanyVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteMyCompany` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMyCompanyData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMyCompanyData {
  companyContact_deleteMany: number;
  company_delete?: Company_Key | null;
}
```
### Using `DeleteMyCompany`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMyCompany, DeleteMyCompanyVariables } from '@generated/data-connector-web';

// The `DeleteMyCompany` mutation requires an argument of type `DeleteMyCompanyVariables`:
const deleteMyCompanyVars: DeleteMyCompanyVariables = {
  id: ..., 
};

// Call the `deleteMyCompany()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMyCompany(deleteMyCompanyVars);
// Variables can be defined inline as well.
const { data } = await deleteMyCompany({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMyCompany(dataConnect, deleteMyCompanyVars);

console.log(data.companyContact_deleteMany);
console.log(data.company_delete);

// Or, you can use the `Promise` API.
deleteMyCompany(deleteMyCompanyVars).then((response) => {
  const data = response.data;
  console.log(data.companyContact_deleteMany);
  console.log(data.company_delete);
});
```

### Using `DeleteMyCompany`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMyCompanyRef, DeleteMyCompanyVariables } from '@generated/data-connector-web';

// The `DeleteMyCompany` mutation requires an argument of type `DeleteMyCompanyVariables`:
const deleteMyCompanyVars: DeleteMyCompanyVariables = {
  id: ..., 
};

// Call the `deleteMyCompanyRef()` function to get a reference to the mutation.
const ref = deleteMyCompanyRef(deleteMyCompanyVars);
// Variables can be defined inline as well.
const ref = deleteMyCompanyRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMyCompanyRef(dataConnect, deleteMyCompanyVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.companyContact_deleteMany);
console.log(data.company_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.companyContact_deleteMany);
  console.log(data.company_delete);
});
```

## CreateMyCompanyContact
You can execute the `CreateMyCompanyContact` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createMyCompanyContact(vars: CreateMyCompanyContactVariables): MutationPromise<CreateMyCompanyContactData, CreateMyCompanyContactVariables>;

interface CreateMyCompanyContactRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMyCompanyContactVariables): MutationRef<CreateMyCompanyContactData, CreateMyCompanyContactVariables>;
}
export const createMyCompanyContactRef: CreateMyCompanyContactRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMyCompanyContact(dc: DataConnect, vars: CreateMyCompanyContactVariables): MutationPromise<CreateMyCompanyContactData, CreateMyCompanyContactVariables>;

interface CreateMyCompanyContactRef {
  ...
  (dc: DataConnect, vars: CreateMyCompanyContactVariables): MutationRef<CreateMyCompanyContactData, CreateMyCompanyContactVariables>;
}
export const createMyCompanyContactRef: CreateMyCompanyContactRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMyCompanyContactRef:
```typescript
const name = createMyCompanyContactRef.operationName;
console.log(name);
```

### Variables
The `CreateMyCompanyContact` mutation requires an argument of type `CreateMyCompanyContactVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
Recall that executing the `CreateMyCompanyContact` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMyCompanyContactData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMyCompanyContactData {
  companyContact_insert: CompanyContact_Key;
}
```
### Using `CreateMyCompanyContact`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMyCompanyContact, CreateMyCompanyContactVariables } from '@generated/data-connector-web';

// The `CreateMyCompanyContact` mutation requires an argument of type `CreateMyCompanyContactVariables`:
const createMyCompanyContactVars: CreateMyCompanyContactVariables = {
  id: ..., 
  companyId: ..., 
  name: ..., 
  email: ..., // optional
  phoneNumber: ..., // optional
  role: ..., // optional
};

// Call the `createMyCompanyContact()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMyCompanyContact(createMyCompanyContactVars);
// Variables can be defined inline as well.
const { data } = await createMyCompanyContact({ id: ..., companyId: ..., name: ..., email: ..., phoneNumber: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMyCompanyContact(dataConnect, createMyCompanyContactVars);

console.log(data.companyContact_insert);

// Or, you can use the `Promise` API.
createMyCompanyContact(createMyCompanyContactVars).then((response) => {
  const data = response.data;
  console.log(data.companyContact_insert);
});
```

### Using `CreateMyCompanyContact`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMyCompanyContactRef, CreateMyCompanyContactVariables } from '@generated/data-connector-web';

// The `CreateMyCompanyContact` mutation requires an argument of type `CreateMyCompanyContactVariables`:
const createMyCompanyContactVars: CreateMyCompanyContactVariables = {
  id: ..., 
  companyId: ..., 
  name: ..., 
  email: ..., // optional
  phoneNumber: ..., // optional
  role: ..., // optional
};

// Call the `createMyCompanyContactRef()` function to get a reference to the mutation.
const ref = createMyCompanyContactRef(createMyCompanyContactVars);
// Variables can be defined inline as well.
const ref = createMyCompanyContactRef({ id: ..., companyId: ..., name: ..., email: ..., phoneNumber: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMyCompanyContactRef(dataConnect, createMyCompanyContactVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.companyContact_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.companyContact_insert);
});
```

## UpdateMyCompanyContact
You can execute the `UpdateMyCompanyContact` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateMyCompanyContact(vars: UpdateMyCompanyContactVariables): MutationPromise<UpdateMyCompanyContactData, UpdateMyCompanyContactVariables>;

interface UpdateMyCompanyContactRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMyCompanyContactVariables): MutationRef<UpdateMyCompanyContactData, UpdateMyCompanyContactVariables>;
}
export const updateMyCompanyContactRef: UpdateMyCompanyContactRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMyCompanyContact(dc: DataConnect, vars: UpdateMyCompanyContactVariables): MutationPromise<UpdateMyCompanyContactData, UpdateMyCompanyContactVariables>;

interface UpdateMyCompanyContactRef {
  ...
  (dc: DataConnect, vars: UpdateMyCompanyContactVariables): MutationRef<UpdateMyCompanyContactData, UpdateMyCompanyContactVariables>;
}
export const updateMyCompanyContactRef: UpdateMyCompanyContactRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMyCompanyContactRef:
```typescript
const name = updateMyCompanyContactRef.operationName;
console.log(name);
```

### Variables
The `UpdateMyCompanyContact` mutation requires an argument of type `UpdateMyCompanyContactVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
Recall that executing the `UpdateMyCompanyContact` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMyCompanyContactData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMyCompanyContactData {
  companyContact_update?: CompanyContact_Key | null;
}
```
### Using `UpdateMyCompanyContact`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMyCompanyContact, UpdateMyCompanyContactVariables } from '@generated/data-connector-web';

// The `UpdateMyCompanyContact` mutation requires an argument of type `UpdateMyCompanyContactVariables`:
const updateMyCompanyContactVars: UpdateMyCompanyContactVariables = {
  companyId: ..., 
  contactId: ..., 
  name: ..., 
  email: ..., // optional
  phoneNumber: ..., // optional
  role: ..., // optional
};

// Call the `updateMyCompanyContact()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMyCompanyContact(updateMyCompanyContactVars);
// Variables can be defined inline as well.
const { data } = await updateMyCompanyContact({ companyId: ..., contactId: ..., name: ..., email: ..., phoneNumber: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMyCompanyContact(dataConnect, updateMyCompanyContactVars);

console.log(data.companyContact_update);

// Or, you can use the `Promise` API.
updateMyCompanyContact(updateMyCompanyContactVars).then((response) => {
  const data = response.data;
  console.log(data.companyContact_update);
});
```

### Using `UpdateMyCompanyContact`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMyCompanyContactRef, UpdateMyCompanyContactVariables } from '@generated/data-connector-web';

// The `UpdateMyCompanyContact` mutation requires an argument of type `UpdateMyCompanyContactVariables`:
const updateMyCompanyContactVars: UpdateMyCompanyContactVariables = {
  companyId: ..., 
  contactId: ..., 
  name: ..., 
  email: ..., // optional
  phoneNumber: ..., // optional
  role: ..., // optional
};

// Call the `updateMyCompanyContactRef()` function to get a reference to the mutation.
const ref = updateMyCompanyContactRef(updateMyCompanyContactVars);
// Variables can be defined inline as well.
const ref = updateMyCompanyContactRef({ companyId: ..., contactId: ..., name: ..., email: ..., phoneNumber: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMyCompanyContactRef(dataConnect, updateMyCompanyContactVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.companyContact_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.companyContact_update);
});
```

## DeleteMyCompanyContact
You can execute the `DeleteMyCompanyContact` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
deleteMyCompanyContact(vars: DeleteMyCompanyContactVariables): MutationPromise<DeleteMyCompanyContactData, DeleteMyCompanyContactVariables>;

interface DeleteMyCompanyContactRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMyCompanyContactVariables): MutationRef<DeleteMyCompanyContactData, DeleteMyCompanyContactVariables>;
}
export const deleteMyCompanyContactRef: DeleteMyCompanyContactRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMyCompanyContact(dc: DataConnect, vars: DeleteMyCompanyContactVariables): MutationPromise<DeleteMyCompanyContactData, DeleteMyCompanyContactVariables>;

interface DeleteMyCompanyContactRef {
  ...
  (dc: DataConnect, vars: DeleteMyCompanyContactVariables): MutationRef<DeleteMyCompanyContactData, DeleteMyCompanyContactVariables>;
}
export const deleteMyCompanyContactRef: DeleteMyCompanyContactRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMyCompanyContactRef:
```typescript
const name = deleteMyCompanyContactRef.operationName;
console.log(name);
```

### Variables
The `DeleteMyCompanyContact` mutation requires an argument of type `DeleteMyCompanyContactVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteMyCompanyContactVariables {
  companyId: UUIDString;
  contactId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteMyCompanyContact` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMyCompanyContactData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMyCompanyContactData {
  company_update?: Company_Key | null;
  companyContact_delete?: CompanyContact_Key | null;
}
```
### Using `DeleteMyCompanyContact`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMyCompanyContact, DeleteMyCompanyContactVariables } from '@generated/data-connector-web';

// The `DeleteMyCompanyContact` mutation requires an argument of type `DeleteMyCompanyContactVariables`:
const deleteMyCompanyContactVars: DeleteMyCompanyContactVariables = {
  companyId: ..., 
  contactId: ..., 
};

// Call the `deleteMyCompanyContact()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMyCompanyContact(deleteMyCompanyContactVars);
// Variables can be defined inline as well.
const { data } = await deleteMyCompanyContact({ companyId: ..., contactId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMyCompanyContact(dataConnect, deleteMyCompanyContactVars);

console.log(data.company_update);
console.log(data.companyContact_delete);

// Or, you can use the `Promise` API.
deleteMyCompanyContact(deleteMyCompanyContactVars).then((response) => {
  const data = response.data;
  console.log(data.company_update);
  console.log(data.companyContact_delete);
});
```

### Using `DeleteMyCompanyContact`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMyCompanyContactRef, DeleteMyCompanyContactVariables } from '@generated/data-connector-web';

// The `DeleteMyCompanyContact` mutation requires an argument of type `DeleteMyCompanyContactVariables`:
const deleteMyCompanyContactVars: DeleteMyCompanyContactVariables = {
  companyId: ..., 
  contactId: ..., 
};

// Call the `deleteMyCompanyContactRef()` function to get a reference to the mutation.
const ref = deleteMyCompanyContactRef(deleteMyCompanyContactVars);
// Variables can be defined inline as well.
const ref = deleteMyCompanyContactRef({ companyId: ..., contactId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMyCompanyContactRef(dataConnect, deleteMyCompanyContactVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.company_update);
console.log(data.companyContact_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.company_update);
  console.log(data.companyContact_delete);
});
```

## CreateQuestionnaireTemplate
You can execute the `CreateQuestionnaireTemplate` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createQuestionnaireTemplate(vars: CreateQuestionnaireTemplateVariables): MutationPromise<CreateQuestionnaireTemplateData, CreateQuestionnaireTemplateVariables>;

interface CreateQuestionnaireTemplateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuestionnaireTemplateVariables): MutationRef<CreateQuestionnaireTemplateData, CreateQuestionnaireTemplateVariables>;
}
export const createQuestionnaireTemplateRef: CreateQuestionnaireTemplateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createQuestionnaireTemplate(dc: DataConnect, vars: CreateQuestionnaireTemplateVariables): MutationPromise<CreateQuestionnaireTemplateData, CreateQuestionnaireTemplateVariables>;

interface CreateQuestionnaireTemplateRef {
  ...
  (dc: DataConnect, vars: CreateQuestionnaireTemplateVariables): MutationRef<CreateQuestionnaireTemplateData, CreateQuestionnaireTemplateVariables>;
}
export const createQuestionnaireTemplateRef: CreateQuestionnaireTemplateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQuestionnaireTemplateRef:
```typescript
const name = createQuestionnaireTemplateRef.operationName;
console.log(name);
```

### Variables
The `CreateQuestionnaireTemplate` mutation requires an argument of type `CreateQuestionnaireTemplateVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateQuestionnaireTemplateVariables {
  id: UUIDString;
  name: string;
}
```
### Return Type
Recall that executing the `CreateQuestionnaireTemplate` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQuestionnaireTemplateData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateQuestionnaireTemplateData {
  questionnaireTemplate_insert: QuestionnaireTemplate_Key;
}
```
### Using `CreateQuestionnaireTemplate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQuestionnaireTemplate, CreateQuestionnaireTemplateVariables } from '@generated/data-connector-web';

// The `CreateQuestionnaireTemplate` mutation requires an argument of type `CreateQuestionnaireTemplateVariables`:
const createQuestionnaireTemplateVars: CreateQuestionnaireTemplateVariables = {
  id: ..., 
  name: ..., 
};

// Call the `createQuestionnaireTemplate()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuestionnaireTemplate(createQuestionnaireTemplateVars);
// Variables can be defined inline as well.
const { data } = await createQuestionnaireTemplate({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQuestionnaireTemplate(dataConnect, createQuestionnaireTemplateVars);

console.log(data.questionnaireTemplate_insert);

// Or, you can use the `Promise` API.
createQuestionnaireTemplate(createQuestionnaireTemplateVars).then((response) => {
  const data = response.data;
  console.log(data.questionnaireTemplate_insert);
});
```

### Using `CreateQuestionnaireTemplate`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQuestionnaireTemplateRef, CreateQuestionnaireTemplateVariables } from '@generated/data-connector-web';

// The `CreateQuestionnaireTemplate` mutation requires an argument of type `CreateQuestionnaireTemplateVariables`:
const createQuestionnaireTemplateVars: CreateQuestionnaireTemplateVariables = {
  id: ..., 
  name: ..., 
};

// Call the `createQuestionnaireTemplateRef()` function to get a reference to the mutation.
const ref = createQuestionnaireTemplateRef(createQuestionnaireTemplateVars);
// Variables can be defined inline as well.
const ref = createQuestionnaireTemplateRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQuestionnaireTemplateRef(dataConnect, createQuestionnaireTemplateVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.questionnaireTemplate_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.questionnaireTemplate_insert);
});
```

## CreateQuestionnaireTemplateQuestion
You can execute the `CreateQuestionnaireTemplateQuestion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createQuestionnaireTemplateQuestion(vars: CreateQuestionnaireTemplateQuestionVariables): MutationPromise<CreateQuestionnaireTemplateQuestionData, CreateQuestionnaireTemplateQuestionVariables>;

interface CreateQuestionnaireTemplateQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuestionnaireTemplateQuestionVariables): MutationRef<CreateQuestionnaireTemplateQuestionData, CreateQuestionnaireTemplateQuestionVariables>;
}
export const createQuestionnaireTemplateQuestionRef: CreateQuestionnaireTemplateQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createQuestionnaireTemplateQuestion(dc: DataConnect, vars: CreateQuestionnaireTemplateQuestionVariables): MutationPromise<CreateQuestionnaireTemplateQuestionData, CreateQuestionnaireTemplateQuestionVariables>;

interface CreateQuestionnaireTemplateQuestionRef {
  ...
  (dc: DataConnect, vars: CreateQuestionnaireTemplateQuestionVariables): MutationRef<CreateQuestionnaireTemplateQuestionData, CreateQuestionnaireTemplateQuestionVariables>;
}
export const createQuestionnaireTemplateQuestionRef: CreateQuestionnaireTemplateQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQuestionnaireTemplateQuestionRef:
```typescript
const name = createQuestionnaireTemplateQuestionRef.operationName;
console.log(name);
```

### Variables
The `CreateQuestionnaireTemplateQuestion` mutation requires an argument of type `CreateQuestionnaireTemplateQuestionVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateQuestionnaireTemplateQuestionVariables {
  id: UUIDString;
  templateId: UUIDString;
  label: string;
  position: number;
}
```
### Return Type
Recall that executing the `CreateQuestionnaireTemplateQuestion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQuestionnaireTemplateQuestionData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateQuestionnaireTemplateQuestionData {
  questionnaireTemplateQuestion_insert: QuestionnaireTemplateQuestion_Key;
}
```
### Using `CreateQuestionnaireTemplateQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQuestionnaireTemplateQuestion, CreateQuestionnaireTemplateQuestionVariables } from '@generated/data-connector-web';

// The `CreateQuestionnaireTemplateQuestion` mutation requires an argument of type `CreateQuestionnaireTemplateQuestionVariables`:
const createQuestionnaireTemplateQuestionVars: CreateQuestionnaireTemplateQuestionVariables = {
  id: ..., 
  templateId: ..., 
  label: ..., 
  position: ..., 
};

// Call the `createQuestionnaireTemplateQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuestionnaireTemplateQuestion(createQuestionnaireTemplateQuestionVars);
// Variables can be defined inline as well.
const { data } = await createQuestionnaireTemplateQuestion({ id: ..., templateId: ..., label: ..., position: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQuestionnaireTemplateQuestion(dataConnect, createQuestionnaireTemplateQuestionVars);

console.log(data.questionnaireTemplateQuestion_insert);

// Or, you can use the `Promise` API.
createQuestionnaireTemplateQuestion(createQuestionnaireTemplateQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.questionnaireTemplateQuestion_insert);
});
```

### Using `CreateQuestionnaireTemplateQuestion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQuestionnaireTemplateQuestionRef, CreateQuestionnaireTemplateQuestionVariables } from '@generated/data-connector-web';

// The `CreateQuestionnaireTemplateQuestion` mutation requires an argument of type `CreateQuestionnaireTemplateQuestionVariables`:
const createQuestionnaireTemplateQuestionVars: CreateQuestionnaireTemplateQuestionVariables = {
  id: ..., 
  templateId: ..., 
  label: ..., 
  position: ..., 
};

// Call the `createQuestionnaireTemplateQuestionRef()` function to get a reference to the mutation.
const ref = createQuestionnaireTemplateQuestionRef(createQuestionnaireTemplateQuestionVars);
// Variables can be defined inline as well.
const ref = createQuestionnaireTemplateQuestionRef({ id: ..., templateId: ..., label: ..., position: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQuestionnaireTemplateQuestionRef(dataConnect, createQuestionnaireTemplateQuestionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.questionnaireTemplateQuestion_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.questionnaireTemplateQuestion_insert);
});
```

## UpdateQuestionnaireTemplateName
You can execute the `UpdateQuestionnaireTemplateName` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateQuestionnaireTemplateName(vars: UpdateQuestionnaireTemplateNameVariables): MutationPromise<UpdateQuestionnaireTemplateNameData, UpdateQuestionnaireTemplateNameVariables>;

interface UpdateQuestionnaireTemplateNameRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuestionnaireTemplateNameVariables): MutationRef<UpdateQuestionnaireTemplateNameData, UpdateQuestionnaireTemplateNameVariables>;
}
export const updateQuestionnaireTemplateNameRef: UpdateQuestionnaireTemplateNameRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateQuestionnaireTemplateName(dc: DataConnect, vars: UpdateQuestionnaireTemplateNameVariables): MutationPromise<UpdateQuestionnaireTemplateNameData, UpdateQuestionnaireTemplateNameVariables>;

interface UpdateQuestionnaireTemplateNameRef {
  ...
  (dc: DataConnect, vars: UpdateQuestionnaireTemplateNameVariables): MutationRef<UpdateQuestionnaireTemplateNameData, UpdateQuestionnaireTemplateNameVariables>;
}
export const updateQuestionnaireTemplateNameRef: UpdateQuestionnaireTemplateNameRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateQuestionnaireTemplateNameRef:
```typescript
const name = updateQuestionnaireTemplateNameRef.operationName;
console.log(name);
```

### Variables
The `UpdateQuestionnaireTemplateName` mutation requires an argument of type `UpdateQuestionnaireTemplateNameVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateQuestionnaireTemplateNameVariables {
  id: UUIDString;
  name: string;
}
```
### Return Type
Recall that executing the `UpdateQuestionnaireTemplateName` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateQuestionnaireTemplateNameData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateQuestionnaireTemplateNameData {
  questionnaireTemplate_update?: QuestionnaireTemplate_Key | null;
}
```
### Using `UpdateQuestionnaireTemplateName`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateQuestionnaireTemplateName, UpdateQuestionnaireTemplateNameVariables } from '@generated/data-connector-web';

// The `UpdateQuestionnaireTemplateName` mutation requires an argument of type `UpdateQuestionnaireTemplateNameVariables`:
const updateQuestionnaireTemplateNameVars: UpdateQuestionnaireTemplateNameVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateQuestionnaireTemplateName()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateQuestionnaireTemplateName(updateQuestionnaireTemplateNameVars);
// Variables can be defined inline as well.
const { data } = await updateQuestionnaireTemplateName({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateQuestionnaireTemplateName(dataConnect, updateQuestionnaireTemplateNameVars);

console.log(data.questionnaireTemplate_update);

// Or, you can use the `Promise` API.
updateQuestionnaireTemplateName(updateQuestionnaireTemplateNameVars).then((response) => {
  const data = response.data;
  console.log(data.questionnaireTemplate_update);
});
```

### Using `UpdateQuestionnaireTemplateName`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateQuestionnaireTemplateNameRef, UpdateQuestionnaireTemplateNameVariables } from '@generated/data-connector-web';

// The `UpdateQuestionnaireTemplateName` mutation requires an argument of type `UpdateQuestionnaireTemplateNameVariables`:
const updateQuestionnaireTemplateNameVars: UpdateQuestionnaireTemplateNameVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateQuestionnaireTemplateNameRef()` function to get a reference to the mutation.
const ref = updateQuestionnaireTemplateNameRef(updateQuestionnaireTemplateNameVars);
// Variables can be defined inline as well.
const ref = updateQuestionnaireTemplateNameRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateQuestionnaireTemplateNameRef(dataConnect, updateQuestionnaireTemplateNameVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.questionnaireTemplate_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.questionnaireTemplate_update);
});
```

## UpdateQuestionnaireTemplateQuestion
You can execute the `UpdateQuestionnaireTemplateQuestion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateQuestionnaireTemplateQuestion(vars: UpdateQuestionnaireTemplateQuestionVariables): MutationPromise<UpdateQuestionnaireTemplateQuestionData, UpdateQuestionnaireTemplateQuestionVariables>;

interface UpdateQuestionnaireTemplateQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuestionnaireTemplateQuestionVariables): MutationRef<UpdateQuestionnaireTemplateQuestionData, UpdateQuestionnaireTemplateQuestionVariables>;
}
export const updateQuestionnaireTemplateQuestionRef: UpdateQuestionnaireTemplateQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateQuestionnaireTemplateQuestion(dc: DataConnect, vars: UpdateQuestionnaireTemplateQuestionVariables): MutationPromise<UpdateQuestionnaireTemplateQuestionData, UpdateQuestionnaireTemplateQuestionVariables>;

interface UpdateQuestionnaireTemplateQuestionRef {
  ...
  (dc: DataConnect, vars: UpdateQuestionnaireTemplateQuestionVariables): MutationRef<UpdateQuestionnaireTemplateQuestionData, UpdateQuestionnaireTemplateQuestionVariables>;
}
export const updateQuestionnaireTemplateQuestionRef: UpdateQuestionnaireTemplateQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateQuestionnaireTemplateQuestionRef:
```typescript
const name = updateQuestionnaireTemplateQuestionRef.operationName;
console.log(name);
```

### Variables
The `UpdateQuestionnaireTemplateQuestion` mutation requires an argument of type `UpdateQuestionnaireTemplateQuestionVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateQuestionnaireTemplateQuestionVariables {
  id: UUIDString;
  templateId: UUIDString;
  label: string;
  position: number;
}
```
### Return Type
Recall that executing the `UpdateQuestionnaireTemplateQuestion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateQuestionnaireTemplateQuestionData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateQuestionnaireTemplateQuestionData {
  questionnaireTemplateQuestion_update?: QuestionnaireTemplateQuestion_Key | null;
}
```
### Using `UpdateQuestionnaireTemplateQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateQuestionnaireTemplateQuestion, UpdateQuestionnaireTemplateQuestionVariables } from '@generated/data-connector-web';

// The `UpdateQuestionnaireTemplateQuestion` mutation requires an argument of type `UpdateQuestionnaireTemplateQuestionVariables`:
const updateQuestionnaireTemplateQuestionVars: UpdateQuestionnaireTemplateQuestionVariables = {
  id: ..., 
  templateId: ..., 
  label: ..., 
  position: ..., 
};

// Call the `updateQuestionnaireTemplateQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateQuestionnaireTemplateQuestion(updateQuestionnaireTemplateQuestionVars);
// Variables can be defined inline as well.
const { data } = await updateQuestionnaireTemplateQuestion({ id: ..., templateId: ..., label: ..., position: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateQuestionnaireTemplateQuestion(dataConnect, updateQuestionnaireTemplateQuestionVars);

console.log(data.questionnaireTemplateQuestion_update);

// Or, you can use the `Promise` API.
updateQuestionnaireTemplateQuestion(updateQuestionnaireTemplateQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.questionnaireTemplateQuestion_update);
});
```

### Using `UpdateQuestionnaireTemplateQuestion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateQuestionnaireTemplateQuestionRef, UpdateQuestionnaireTemplateQuestionVariables } from '@generated/data-connector-web';

// The `UpdateQuestionnaireTemplateQuestion` mutation requires an argument of type `UpdateQuestionnaireTemplateQuestionVariables`:
const updateQuestionnaireTemplateQuestionVars: UpdateQuestionnaireTemplateQuestionVariables = {
  id: ..., 
  templateId: ..., 
  label: ..., 
  position: ..., 
};

// Call the `updateQuestionnaireTemplateQuestionRef()` function to get a reference to the mutation.
const ref = updateQuestionnaireTemplateQuestionRef(updateQuestionnaireTemplateQuestionVars);
// Variables can be defined inline as well.
const ref = updateQuestionnaireTemplateQuestionRef({ id: ..., templateId: ..., label: ..., position: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateQuestionnaireTemplateQuestionRef(dataConnect, updateQuestionnaireTemplateQuestionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.questionnaireTemplateQuestion_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.questionnaireTemplateQuestion_update);
});
```

## DeleteQuestionnaireTemplateQuestion
You can execute the `DeleteQuestionnaireTemplateQuestion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
deleteQuestionnaireTemplateQuestion(vars: DeleteQuestionnaireTemplateQuestionVariables): MutationPromise<DeleteQuestionnaireTemplateQuestionData, DeleteQuestionnaireTemplateQuestionVariables>;

interface DeleteQuestionnaireTemplateQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQuestionnaireTemplateQuestionVariables): MutationRef<DeleteQuestionnaireTemplateQuestionData, DeleteQuestionnaireTemplateQuestionVariables>;
}
export const deleteQuestionnaireTemplateQuestionRef: DeleteQuestionnaireTemplateQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteQuestionnaireTemplateQuestion(dc: DataConnect, vars: DeleteQuestionnaireTemplateQuestionVariables): MutationPromise<DeleteQuestionnaireTemplateQuestionData, DeleteQuestionnaireTemplateQuestionVariables>;

interface DeleteQuestionnaireTemplateQuestionRef {
  ...
  (dc: DataConnect, vars: DeleteQuestionnaireTemplateQuestionVariables): MutationRef<DeleteQuestionnaireTemplateQuestionData, DeleteQuestionnaireTemplateQuestionVariables>;
}
export const deleteQuestionnaireTemplateQuestionRef: DeleteQuestionnaireTemplateQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteQuestionnaireTemplateQuestionRef:
```typescript
const name = deleteQuestionnaireTemplateQuestionRef.operationName;
console.log(name);
```

### Variables
The `DeleteQuestionnaireTemplateQuestion` mutation requires an argument of type `DeleteQuestionnaireTemplateQuestionVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteQuestionnaireTemplateQuestionVariables {
  id: UUIDString;
  templateId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteQuestionnaireTemplateQuestion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteQuestionnaireTemplateQuestionData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteQuestionnaireTemplateQuestionData {
  questionnaireTemplateQuestion_delete?: QuestionnaireTemplateQuestion_Key | null;
}
```
### Using `DeleteQuestionnaireTemplateQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteQuestionnaireTemplateQuestion, DeleteQuestionnaireTemplateQuestionVariables } from '@generated/data-connector-web';

// The `DeleteQuestionnaireTemplateQuestion` mutation requires an argument of type `DeleteQuestionnaireTemplateQuestionVariables`:
const deleteQuestionnaireTemplateQuestionVars: DeleteQuestionnaireTemplateQuestionVariables = {
  id: ..., 
  templateId: ..., 
};

// Call the `deleteQuestionnaireTemplateQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteQuestionnaireTemplateQuestion(deleteQuestionnaireTemplateQuestionVars);
// Variables can be defined inline as well.
const { data } = await deleteQuestionnaireTemplateQuestion({ id: ..., templateId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteQuestionnaireTemplateQuestion(dataConnect, deleteQuestionnaireTemplateQuestionVars);

console.log(data.questionnaireTemplateQuestion_delete);

// Or, you can use the `Promise` API.
deleteQuestionnaireTemplateQuestion(deleteQuestionnaireTemplateQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.questionnaireTemplateQuestion_delete);
});
```

### Using `DeleteQuestionnaireTemplateQuestion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteQuestionnaireTemplateQuestionRef, DeleteQuestionnaireTemplateQuestionVariables } from '@generated/data-connector-web';

// The `DeleteQuestionnaireTemplateQuestion` mutation requires an argument of type `DeleteQuestionnaireTemplateQuestionVariables`:
const deleteQuestionnaireTemplateQuestionVars: DeleteQuestionnaireTemplateQuestionVariables = {
  id: ..., 
  templateId: ..., 
};

// Call the `deleteQuestionnaireTemplateQuestionRef()` function to get a reference to the mutation.
const ref = deleteQuestionnaireTemplateQuestionRef(deleteQuestionnaireTemplateQuestionVars);
// Variables can be defined inline as well.
const ref = deleteQuestionnaireTemplateQuestionRef({ id: ..., templateId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteQuestionnaireTemplateQuestionRef(dataConnect, deleteQuestionnaireTemplateQuestionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.questionnaireTemplateQuestion_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.questionnaireTemplateQuestion_delete);
});
```

## DeleteQuestionnaireTemplate
You can execute the `DeleteQuestionnaireTemplate` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
deleteQuestionnaireTemplate(vars: DeleteQuestionnaireTemplateVariables): MutationPromise<DeleteQuestionnaireTemplateData, DeleteQuestionnaireTemplateVariables>;

interface DeleteQuestionnaireTemplateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQuestionnaireTemplateVariables): MutationRef<DeleteQuestionnaireTemplateData, DeleteQuestionnaireTemplateVariables>;
}
export const deleteQuestionnaireTemplateRef: DeleteQuestionnaireTemplateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteQuestionnaireTemplate(dc: DataConnect, vars: DeleteQuestionnaireTemplateVariables): MutationPromise<DeleteQuestionnaireTemplateData, DeleteQuestionnaireTemplateVariables>;

interface DeleteQuestionnaireTemplateRef {
  ...
  (dc: DataConnect, vars: DeleteQuestionnaireTemplateVariables): MutationRef<DeleteQuestionnaireTemplateData, DeleteQuestionnaireTemplateVariables>;
}
export const deleteQuestionnaireTemplateRef: DeleteQuestionnaireTemplateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteQuestionnaireTemplateRef:
```typescript
const name = deleteQuestionnaireTemplateRef.operationName;
console.log(name);
```

### Variables
The `DeleteQuestionnaireTemplate` mutation requires an argument of type `DeleteQuestionnaireTemplateVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteQuestionnaireTemplateVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteQuestionnaireTemplate` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteQuestionnaireTemplateData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteQuestionnaireTemplateData {
  questionnaireTemplateQuestion_deleteMany: number;
  questionnaireTemplate_delete?: QuestionnaireTemplate_Key | null;
}
```
### Using `DeleteQuestionnaireTemplate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteQuestionnaireTemplate, DeleteQuestionnaireTemplateVariables } from '@generated/data-connector-web';

// The `DeleteQuestionnaireTemplate` mutation requires an argument of type `DeleteQuestionnaireTemplateVariables`:
const deleteQuestionnaireTemplateVars: DeleteQuestionnaireTemplateVariables = {
  id: ..., 
};

// Call the `deleteQuestionnaireTemplate()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteQuestionnaireTemplate(deleteQuestionnaireTemplateVars);
// Variables can be defined inline as well.
const { data } = await deleteQuestionnaireTemplate({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteQuestionnaireTemplate(dataConnect, deleteQuestionnaireTemplateVars);

console.log(data.questionnaireTemplateQuestion_deleteMany);
console.log(data.questionnaireTemplate_delete);

// Or, you can use the `Promise` API.
deleteQuestionnaireTemplate(deleteQuestionnaireTemplateVars).then((response) => {
  const data = response.data;
  console.log(data.questionnaireTemplateQuestion_deleteMany);
  console.log(data.questionnaireTemplate_delete);
});
```

### Using `DeleteQuestionnaireTemplate`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteQuestionnaireTemplateRef, DeleteQuestionnaireTemplateVariables } from '@generated/data-connector-web';

// The `DeleteQuestionnaireTemplate` mutation requires an argument of type `DeleteQuestionnaireTemplateVariables`:
const deleteQuestionnaireTemplateVars: DeleteQuestionnaireTemplateVariables = {
  id: ..., 
};

// Call the `deleteQuestionnaireTemplateRef()` function to get a reference to the mutation.
const ref = deleteQuestionnaireTemplateRef(deleteQuestionnaireTemplateVars);
// Variables can be defined inline as well.
const ref = deleteQuestionnaireTemplateRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteQuestionnaireTemplateRef(dataConnect, deleteQuestionnaireTemplateVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.questionnaireTemplateQuestion_deleteMany);
console.log(data.questionnaireTemplate_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.questionnaireTemplateQuestion_deleteMany);
  console.log(data.questionnaireTemplate_delete);
});
```

## EnsureProjectQuestionnaire
You can execute the `EnsureProjectQuestionnaire` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
ensureProjectQuestionnaire(vars: EnsureProjectQuestionnaireVariables): MutationPromise<EnsureProjectQuestionnaireData, EnsureProjectQuestionnaireVariables>;

interface EnsureProjectQuestionnaireRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EnsureProjectQuestionnaireVariables): MutationRef<EnsureProjectQuestionnaireData, EnsureProjectQuestionnaireVariables>;
}
export const ensureProjectQuestionnaireRef: EnsureProjectQuestionnaireRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
ensureProjectQuestionnaire(dc: DataConnect, vars: EnsureProjectQuestionnaireVariables): MutationPromise<EnsureProjectQuestionnaireData, EnsureProjectQuestionnaireVariables>;

interface EnsureProjectQuestionnaireRef {
  ...
  (dc: DataConnect, vars: EnsureProjectQuestionnaireVariables): MutationRef<EnsureProjectQuestionnaireData, EnsureProjectQuestionnaireVariables>;
}
export const ensureProjectQuestionnaireRef: EnsureProjectQuestionnaireRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the ensureProjectQuestionnaireRef:
```typescript
const name = ensureProjectQuestionnaireRef.operationName;
console.log(name);
```

### Variables
The `EnsureProjectQuestionnaire` mutation requires an argument of type `EnsureProjectQuestionnaireVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EnsureProjectQuestionnaireVariables {
  projectId: UUIDString;
}
```
### Return Type
Recall that executing the `EnsureProjectQuestionnaire` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EnsureProjectQuestionnaireData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EnsureProjectQuestionnaireData {
  projectQuestionnaire_upsert: ProjectQuestionnaire_Key;
}
```
### Using `EnsureProjectQuestionnaire`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ensureProjectQuestionnaire, EnsureProjectQuestionnaireVariables } from '@generated/data-connector-web';

// The `EnsureProjectQuestionnaire` mutation requires an argument of type `EnsureProjectQuestionnaireVariables`:
const ensureProjectQuestionnaireVars: EnsureProjectQuestionnaireVariables = {
  projectId: ..., 
};

// Call the `ensureProjectQuestionnaire()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await ensureProjectQuestionnaire(ensureProjectQuestionnaireVars);
// Variables can be defined inline as well.
const { data } = await ensureProjectQuestionnaire({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await ensureProjectQuestionnaire(dataConnect, ensureProjectQuestionnaireVars);

console.log(data.projectQuestionnaire_upsert);

// Or, you can use the `Promise` API.
ensureProjectQuestionnaire(ensureProjectQuestionnaireVars).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaire_upsert);
});
```

### Using `EnsureProjectQuestionnaire`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, ensureProjectQuestionnaireRef, EnsureProjectQuestionnaireVariables } from '@generated/data-connector-web';

// The `EnsureProjectQuestionnaire` mutation requires an argument of type `EnsureProjectQuestionnaireVariables`:
const ensureProjectQuestionnaireVars: EnsureProjectQuestionnaireVariables = {
  projectId: ..., 
};

// Call the `ensureProjectQuestionnaireRef()` function to get a reference to the mutation.
const ref = ensureProjectQuestionnaireRef(ensureProjectQuestionnaireVars);
// Variables can be defined inline as well.
const ref = ensureProjectQuestionnaireRef({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = ensureProjectQuestionnaireRef(dataConnect, ensureProjectQuestionnaireVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.projectQuestionnaire_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaire_upsert);
});
```

## ApplyQuestionnaireTemplateToProject
You can execute the `ApplyQuestionnaireTemplateToProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
applyQuestionnaireTemplateToProject(vars: ApplyQuestionnaireTemplateToProjectVariables): MutationPromise<ApplyQuestionnaireTemplateToProjectData, ApplyQuestionnaireTemplateToProjectVariables>;

interface ApplyQuestionnaireTemplateToProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ApplyQuestionnaireTemplateToProjectVariables): MutationRef<ApplyQuestionnaireTemplateToProjectData, ApplyQuestionnaireTemplateToProjectVariables>;
}
export const applyQuestionnaireTemplateToProjectRef: ApplyQuestionnaireTemplateToProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
applyQuestionnaireTemplateToProject(dc: DataConnect, vars: ApplyQuestionnaireTemplateToProjectVariables): MutationPromise<ApplyQuestionnaireTemplateToProjectData, ApplyQuestionnaireTemplateToProjectVariables>;

interface ApplyQuestionnaireTemplateToProjectRef {
  ...
  (dc: DataConnect, vars: ApplyQuestionnaireTemplateToProjectVariables): MutationRef<ApplyQuestionnaireTemplateToProjectData, ApplyQuestionnaireTemplateToProjectVariables>;
}
export const applyQuestionnaireTemplateToProjectRef: ApplyQuestionnaireTemplateToProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the applyQuestionnaireTemplateToProjectRef:
```typescript
const name = applyQuestionnaireTemplateToProjectRef.operationName;
console.log(name);
```

### Variables
The `ApplyQuestionnaireTemplateToProject` mutation requires an argument of type `ApplyQuestionnaireTemplateToProjectVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ApplyQuestionnaireTemplateToProjectVariables {
  projectId: UUIDString;
  sourceTemplateId: UUIDString;
}
```
### Return Type
Recall that executing the `ApplyQuestionnaireTemplateToProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ApplyQuestionnaireTemplateToProjectData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ApplyQuestionnaireTemplateToProjectData {
  projectQuestionnaire_upsert: ProjectQuestionnaire_Key;
}
```
### Using `ApplyQuestionnaireTemplateToProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, applyQuestionnaireTemplateToProject, ApplyQuestionnaireTemplateToProjectVariables } from '@generated/data-connector-web';

// The `ApplyQuestionnaireTemplateToProject` mutation requires an argument of type `ApplyQuestionnaireTemplateToProjectVariables`:
const applyQuestionnaireTemplateToProjectVars: ApplyQuestionnaireTemplateToProjectVariables = {
  projectId: ..., 
  sourceTemplateId: ..., 
};

// Call the `applyQuestionnaireTemplateToProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await applyQuestionnaireTemplateToProject(applyQuestionnaireTemplateToProjectVars);
// Variables can be defined inline as well.
const { data } = await applyQuestionnaireTemplateToProject({ projectId: ..., sourceTemplateId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await applyQuestionnaireTemplateToProject(dataConnect, applyQuestionnaireTemplateToProjectVars);

console.log(data.projectQuestionnaire_upsert);

// Or, you can use the `Promise` API.
applyQuestionnaireTemplateToProject(applyQuestionnaireTemplateToProjectVars).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaire_upsert);
});
```

### Using `ApplyQuestionnaireTemplateToProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, applyQuestionnaireTemplateToProjectRef, ApplyQuestionnaireTemplateToProjectVariables } from '@generated/data-connector-web';

// The `ApplyQuestionnaireTemplateToProject` mutation requires an argument of type `ApplyQuestionnaireTemplateToProjectVariables`:
const applyQuestionnaireTemplateToProjectVars: ApplyQuestionnaireTemplateToProjectVariables = {
  projectId: ..., 
  sourceTemplateId: ..., 
};

// Call the `applyQuestionnaireTemplateToProjectRef()` function to get a reference to the mutation.
const ref = applyQuestionnaireTemplateToProjectRef(applyQuestionnaireTemplateToProjectVars);
// Variables can be defined inline as well.
const ref = applyQuestionnaireTemplateToProjectRef({ projectId: ..., sourceTemplateId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = applyQuestionnaireTemplateToProjectRef(dataConnect, applyQuestionnaireTemplateToProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.projectQuestionnaire_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaire_upsert);
});
```

## CreateProjectQuestionnaireQuestion
You can execute the `CreateProjectQuestionnaireQuestion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createProjectQuestionnaireQuestion(vars: CreateProjectQuestionnaireQuestionVariables): MutationPromise<CreateProjectQuestionnaireQuestionData, CreateProjectQuestionnaireQuestionVariables>;

interface CreateProjectQuestionnaireQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectQuestionnaireQuestionVariables): MutationRef<CreateProjectQuestionnaireQuestionData, CreateProjectQuestionnaireQuestionVariables>;
}
export const createProjectQuestionnaireQuestionRef: CreateProjectQuestionnaireQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProjectQuestionnaireQuestion(dc: DataConnect, vars: CreateProjectQuestionnaireQuestionVariables): MutationPromise<CreateProjectQuestionnaireQuestionData, CreateProjectQuestionnaireQuestionVariables>;

interface CreateProjectQuestionnaireQuestionRef {
  ...
  (dc: DataConnect, vars: CreateProjectQuestionnaireQuestionVariables): MutationRef<CreateProjectQuestionnaireQuestionData, CreateProjectQuestionnaireQuestionVariables>;
}
export const createProjectQuestionnaireQuestionRef: CreateProjectQuestionnaireQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProjectQuestionnaireQuestionRef:
```typescript
const name = createProjectQuestionnaireQuestionRef.operationName;
console.log(name);
```

### Variables
The `CreateProjectQuestionnaireQuestion` mutation requires an argument of type `CreateProjectQuestionnaireQuestionVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateProjectQuestionnaireQuestionVariables {
  id: UUIDString;
  projectId: UUIDString;
  label: string;
  position: number;
}
```
### Return Type
Recall that executing the `CreateProjectQuestionnaireQuestion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProjectQuestionnaireQuestionData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProjectQuestionnaireQuestionData {
  projectQuestionnaireQuestion_insert: ProjectQuestionnaireQuestion_Key;
}
```
### Using `CreateProjectQuestionnaireQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProjectQuestionnaireQuestion, CreateProjectQuestionnaireQuestionVariables } from '@generated/data-connector-web';

// The `CreateProjectQuestionnaireQuestion` mutation requires an argument of type `CreateProjectQuestionnaireQuestionVariables`:
const createProjectQuestionnaireQuestionVars: CreateProjectQuestionnaireQuestionVariables = {
  id: ..., 
  projectId: ..., 
  label: ..., 
  position: ..., 
};

// Call the `createProjectQuestionnaireQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProjectQuestionnaireQuestion(createProjectQuestionnaireQuestionVars);
// Variables can be defined inline as well.
const { data } = await createProjectQuestionnaireQuestion({ id: ..., projectId: ..., label: ..., position: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProjectQuestionnaireQuestion(dataConnect, createProjectQuestionnaireQuestionVars);

console.log(data.projectQuestionnaireQuestion_insert);

// Or, you can use the `Promise` API.
createProjectQuestionnaireQuestion(createProjectQuestionnaireQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaireQuestion_insert);
});
```

### Using `CreateProjectQuestionnaireQuestion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProjectQuestionnaireQuestionRef, CreateProjectQuestionnaireQuestionVariables } from '@generated/data-connector-web';

// The `CreateProjectQuestionnaireQuestion` mutation requires an argument of type `CreateProjectQuestionnaireQuestionVariables`:
const createProjectQuestionnaireQuestionVars: CreateProjectQuestionnaireQuestionVariables = {
  id: ..., 
  projectId: ..., 
  label: ..., 
  position: ..., 
};

// Call the `createProjectQuestionnaireQuestionRef()` function to get a reference to the mutation.
const ref = createProjectQuestionnaireQuestionRef(createProjectQuestionnaireQuestionVars);
// Variables can be defined inline as well.
const ref = createProjectQuestionnaireQuestionRef({ id: ..., projectId: ..., label: ..., position: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProjectQuestionnaireQuestionRef(dataConnect, createProjectQuestionnaireQuestionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.projectQuestionnaireQuestion_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaireQuestion_insert);
});
```

## UpdateProjectQuestionnaireQuestion
You can execute the `UpdateProjectQuestionnaireQuestion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateProjectQuestionnaireQuestion(vars: UpdateProjectQuestionnaireQuestionVariables): MutationPromise<UpdateProjectQuestionnaireQuestionData, UpdateProjectQuestionnaireQuestionVariables>;

interface UpdateProjectQuestionnaireQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectQuestionnaireQuestionVariables): MutationRef<UpdateProjectQuestionnaireQuestionData, UpdateProjectQuestionnaireQuestionVariables>;
}
export const updateProjectQuestionnaireQuestionRef: UpdateProjectQuestionnaireQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProjectQuestionnaireQuestion(dc: DataConnect, vars: UpdateProjectQuestionnaireQuestionVariables): MutationPromise<UpdateProjectQuestionnaireQuestionData, UpdateProjectQuestionnaireQuestionVariables>;

interface UpdateProjectQuestionnaireQuestionRef {
  ...
  (dc: DataConnect, vars: UpdateProjectQuestionnaireQuestionVariables): MutationRef<UpdateProjectQuestionnaireQuestionData, UpdateProjectQuestionnaireQuestionVariables>;
}
export const updateProjectQuestionnaireQuestionRef: UpdateProjectQuestionnaireQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProjectQuestionnaireQuestionRef:
```typescript
const name = updateProjectQuestionnaireQuestionRef.operationName;
console.log(name);
```

### Variables
The `UpdateProjectQuestionnaireQuestion` mutation requires an argument of type `UpdateProjectQuestionnaireQuestionVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProjectQuestionnaireQuestionVariables {
  id: UUIDString;
  projectId: UUIDString;
  label: string;
  position: number;
}
```
### Return Type
Recall that executing the `UpdateProjectQuestionnaireQuestion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProjectQuestionnaireQuestionData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProjectQuestionnaireQuestionData {
  projectQuestionnaireQuestion_update?: ProjectQuestionnaireQuestion_Key | null;
}
```
### Using `UpdateProjectQuestionnaireQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProjectQuestionnaireQuestion, UpdateProjectQuestionnaireQuestionVariables } from '@generated/data-connector-web';

// The `UpdateProjectQuestionnaireQuestion` mutation requires an argument of type `UpdateProjectQuestionnaireQuestionVariables`:
const updateProjectQuestionnaireQuestionVars: UpdateProjectQuestionnaireQuestionVariables = {
  id: ..., 
  projectId: ..., 
  label: ..., 
  position: ..., 
};

// Call the `updateProjectQuestionnaireQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProjectQuestionnaireQuestion(updateProjectQuestionnaireQuestionVars);
// Variables can be defined inline as well.
const { data } = await updateProjectQuestionnaireQuestion({ id: ..., projectId: ..., label: ..., position: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProjectQuestionnaireQuestion(dataConnect, updateProjectQuestionnaireQuestionVars);

console.log(data.projectQuestionnaireQuestion_update);

// Or, you can use the `Promise` API.
updateProjectQuestionnaireQuestion(updateProjectQuestionnaireQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaireQuestion_update);
});
```

### Using `UpdateProjectQuestionnaireQuestion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProjectQuestionnaireQuestionRef, UpdateProjectQuestionnaireQuestionVariables } from '@generated/data-connector-web';

// The `UpdateProjectQuestionnaireQuestion` mutation requires an argument of type `UpdateProjectQuestionnaireQuestionVariables`:
const updateProjectQuestionnaireQuestionVars: UpdateProjectQuestionnaireQuestionVariables = {
  id: ..., 
  projectId: ..., 
  label: ..., 
  position: ..., 
};

// Call the `updateProjectQuestionnaireQuestionRef()` function to get a reference to the mutation.
const ref = updateProjectQuestionnaireQuestionRef(updateProjectQuestionnaireQuestionVars);
// Variables can be defined inline as well.
const ref = updateProjectQuestionnaireQuestionRef({ id: ..., projectId: ..., label: ..., position: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProjectQuestionnaireQuestionRef(dataConnect, updateProjectQuestionnaireQuestionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.projectQuestionnaireQuestion_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaireQuestion_update);
});
```

## UpdateProjectQuestionnaireQuestionAnswer
You can execute the `UpdateProjectQuestionnaireQuestionAnswer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateProjectQuestionnaireQuestionAnswer(vars: UpdateProjectQuestionnaireQuestionAnswerVariables): MutationPromise<UpdateProjectQuestionnaireQuestionAnswerData, UpdateProjectQuestionnaireQuestionAnswerVariables>;

interface UpdateProjectQuestionnaireQuestionAnswerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectQuestionnaireQuestionAnswerVariables): MutationRef<UpdateProjectQuestionnaireQuestionAnswerData, UpdateProjectQuestionnaireQuestionAnswerVariables>;
}
export const updateProjectQuestionnaireQuestionAnswerRef: UpdateProjectQuestionnaireQuestionAnswerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProjectQuestionnaireQuestionAnswer(dc: DataConnect, vars: UpdateProjectQuestionnaireQuestionAnswerVariables): MutationPromise<UpdateProjectQuestionnaireQuestionAnswerData, UpdateProjectQuestionnaireQuestionAnswerVariables>;

interface UpdateProjectQuestionnaireQuestionAnswerRef {
  ...
  (dc: DataConnect, vars: UpdateProjectQuestionnaireQuestionAnswerVariables): MutationRef<UpdateProjectQuestionnaireQuestionAnswerData, UpdateProjectQuestionnaireQuestionAnswerVariables>;
}
export const updateProjectQuestionnaireQuestionAnswerRef: UpdateProjectQuestionnaireQuestionAnswerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProjectQuestionnaireQuestionAnswerRef:
```typescript
const name = updateProjectQuestionnaireQuestionAnswerRef.operationName;
console.log(name);
```

### Variables
The `UpdateProjectQuestionnaireQuestionAnswer` mutation requires an argument of type `UpdateProjectQuestionnaireQuestionAnswerVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProjectQuestionnaireQuestionAnswerVariables {
  id: UUIDString;
  projectId: UUIDString;
  answer?: string | null;
}
```
### Return Type
Recall that executing the `UpdateProjectQuestionnaireQuestionAnswer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProjectQuestionnaireQuestionAnswerData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProjectQuestionnaireQuestionAnswerData {
  projectQuestionnaireQuestion_update?: ProjectQuestionnaireQuestion_Key | null;
}
```
### Using `UpdateProjectQuestionnaireQuestionAnswer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProjectQuestionnaireQuestionAnswer, UpdateProjectQuestionnaireQuestionAnswerVariables } from '@generated/data-connector-web';

// The `UpdateProjectQuestionnaireQuestionAnswer` mutation requires an argument of type `UpdateProjectQuestionnaireQuestionAnswerVariables`:
const updateProjectQuestionnaireQuestionAnswerVars: UpdateProjectQuestionnaireQuestionAnswerVariables = {
  id: ..., 
  projectId: ..., 
  answer: ..., // optional
};

// Call the `updateProjectQuestionnaireQuestionAnswer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProjectQuestionnaireQuestionAnswer(updateProjectQuestionnaireQuestionAnswerVars);
// Variables can be defined inline as well.
const { data } = await updateProjectQuestionnaireQuestionAnswer({ id: ..., projectId: ..., answer: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProjectQuestionnaireQuestionAnswer(dataConnect, updateProjectQuestionnaireQuestionAnswerVars);

console.log(data.projectQuestionnaireQuestion_update);

// Or, you can use the `Promise` API.
updateProjectQuestionnaireQuestionAnswer(updateProjectQuestionnaireQuestionAnswerVars).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaireQuestion_update);
});
```

### Using `UpdateProjectQuestionnaireQuestionAnswer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProjectQuestionnaireQuestionAnswerRef, UpdateProjectQuestionnaireQuestionAnswerVariables } from '@generated/data-connector-web';

// The `UpdateProjectQuestionnaireQuestionAnswer` mutation requires an argument of type `UpdateProjectQuestionnaireQuestionAnswerVariables`:
const updateProjectQuestionnaireQuestionAnswerVars: UpdateProjectQuestionnaireQuestionAnswerVariables = {
  id: ..., 
  projectId: ..., 
  answer: ..., // optional
};

// Call the `updateProjectQuestionnaireQuestionAnswerRef()` function to get a reference to the mutation.
const ref = updateProjectQuestionnaireQuestionAnswerRef(updateProjectQuestionnaireQuestionAnswerVars);
// Variables can be defined inline as well.
const ref = updateProjectQuestionnaireQuestionAnswerRef({ id: ..., projectId: ..., answer: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProjectQuestionnaireQuestionAnswerRef(dataConnect, updateProjectQuestionnaireQuestionAnswerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.projectQuestionnaireQuestion_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaireQuestion_update);
});
```

## UpdateProjectQuestionnaireQuestionAnswerSource
You can execute the `UpdateProjectQuestionnaireQuestionAnswerSource` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateProjectQuestionnaireQuestionAnswerSource(vars: UpdateProjectQuestionnaireQuestionAnswerSourceVariables): MutationPromise<UpdateProjectQuestionnaireQuestionAnswerSourceData, UpdateProjectQuestionnaireQuestionAnswerSourceVariables>;

interface UpdateProjectQuestionnaireQuestionAnswerSourceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectQuestionnaireQuestionAnswerSourceVariables): MutationRef<UpdateProjectQuestionnaireQuestionAnswerSourceData, UpdateProjectQuestionnaireQuestionAnswerSourceVariables>;
}
export const updateProjectQuestionnaireQuestionAnswerSourceRef: UpdateProjectQuestionnaireQuestionAnswerSourceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProjectQuestionnaireQuestionAnswerSource(dc: DataConnect, vars: UpdateProjectQuestionnaireQuestionAnswerSourceVariables): MutationPromise<UpdateProjectQuestionnaireQuestionAnswerSourceData, UpdateProjectQuestionnaireQuestionAnswerSourceVariables>;

interface UpdateProjectQuestionnaireQuestionAnswerSourceRef {
  ...
  (dc: DataConnect, vars: UpdateProjectQuestionnaireQuestionAnswerSourceVariables): MutationRef<UpdateProjectQuestionnaireQuestionAnswerSourceData, UpdateProjectQuestionnaireQuestionAnswerSourceVariables>;
}
export const updateProjectQuestionnaireQuestionAnswerSourceRef: UpdateProjectQuestionnaireQuestionAnswerSourceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProjectQuestionnaireQuestionAnswerSourceRef:
```typescript
const name = updateProjectQuestionnaireQuestionAnswerSourceRef.operationName;
console.log(name);
```

### Variables
The `UpdateProjectQuestionnaireQuestionAnswerSource` mutation requires an argument of type `UpdateProjectQuestionnaireQuestionAnswerSourceVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProjectQuestionnaireQuestionAnswerSourceVariables {
  id: UUIDString;
  projectId: UUIDString;
  answerSource: string;
}
```
### Return Type
Recall that executing the `UpdateProjectQuestionnaireQuestionAnswerSource` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProjectQuestionnaireQuestionAnswerSourceData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProjectQuestionnaireQuestionAnswerSourceData {
  projectQuestionnaireQuestion_update?: ProjectQuestionnaireQuestion_Key | null;
}
```
### Using `UpdateProjectQuestionnaireQuestionAnswerSource`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProjectQuestionnaireQuestionAnswerSource, UpdateProjectQuestionnaireQuestionAnswerSourceVariables } from '@generated/data-connector-web';

// The `UpdateProjectQuestionnaireQuestionAnswerSource` mutation requires an argument of type `UpdateProjectQuestionnaireQuestionAnswerSourceVariables`:
const updateProjectQuestionnaireQuestionAnswerSourceVars: UpdateProjectQuestionnaireQuestionAnswerSourceVariables = {
  id: ..., 
  projectId: ..., 
  answerSource: ..., 
};

// Call the `updateProjectQuestionnaireQuestionAnswerSource()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProjectQuestionnaireQuestionAnswerSource(updateProjectQuestionnaireQuestionAnswerSourceVars);
// Variables can be defined inline as well.
const { data } = await updateProjectQuestionnaireQuestionAnswerSource({ id: ..., projectId: ..., answerSource: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProjectQuestionnaireQuestionAnswerSource(dataConnect, updateProjectQuestionnaireQuestionAnswerSourceVars);

console.log(data.projectQuestionnaireQuestion_update);

// Or, you can use the `Promise` API.
updateProjectQuestionnaireQuestionAnswerSource(updateProjectQuestionnaireQuestionAnswerSourceVars).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaireQuestion_update);
});
```

### Using `UpdateProjectQuestionnaireQuestionAnswerSource`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProjectQuestionnaireQuestionAnswerSourceRef, UpdateProjectQuestionnaireQuestionAnswerSourceVariables } from '@generated/data-connector-web';

// The `UpdateProjectQuestionnaireQuestionAnswerSource` mutation requires an argument of type `UpdateProjectQuestionnaireQuestionAnswerSourceVariables`:
const updateProjectQuestionnaireQuestionAnswerSourceVars: UpdateProjectQuestionnaireQuestionAnswerSourceVariables = {
  id: ..., 
  projectId: ..., 
  answerSource: ..., 
};

// Call the `updateProjectQuestionnaireQuestionAnswerSourceRef()` function to get a reference to the mutation.
const ref = updateProjectQuestionnaireQuestionAnswerSourceRef(updateProjectQuestionnaireQuestionAnswerSourceVars);
// Variables can be defined inline as well.
const ref = updateProjectQuestionnaireQuestionAnswerSourceRef({ id: ..., projectId: ..., answerSource: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProjectQuestionnaireQuestionAnswerSourceRef(dataConnect, updateProjectQuestionnaireQuestionAnswerSourceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.projectQuestionnaireQuestion_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaireQuestion_update);
});
```

## DeleteProjectQuestionnaireQuestion
You can execute the `DeleteProjectQuestionnaireQuestion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
deleteProjectQuestionnaireQuestion(vars: DeleteProjectQuestionnaireQuestionVariables): MutationPromise<DeleteProjectQuestionnaireQuestionData, DeleteProjectQuestionnaireQuestionVariables>;

interface DeleteProjectQuestionnaireQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectQuestionnaireQuestionVariables): MutationRef<DeleteProjectQuestionnaireQuestionData, DeleteProjectQuestionnaireQuestionVariables>;
}
export const deleteProjectQuestionnaireQuestionRef: DeleteProjectQuestionnaireQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteProjectQuestionnaireQuestion(dc: DataConnect, vars: DeleteProjectQuestionnaireQuestionVariables): MutationPromise<DeleteProjectQuestionnaireQuestionData, DeleteProjectQuestionnaireQuestionVariables>;

interface DeleteProjectQuestionnaireQuestionRef {
  ...
  (dc: DataConnect, vars: DeleteProjectQuestionnaireQuestionVariables): MutationRef<DeleteProjectQuestionnaireQuestionData, DeleteProjectQuestionnaireQuestionVariables>;
}
export const deleteProjectQuestionnaireQuestionRef: DeleteProjectQuestionnaireQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteProjectQuestionnaireQuestionRef:
```typescript
const name = deleteProjectQuestionnaireQuestionRef.operationName;
console.log(name);
```

### Variables
The `DeleteProjectQuestionnaireQuestion` mutation requires an argument of type `DeleteProjectQuestionnaireQuestionVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteProjectQuestionnaireQuestionVariables {
  id: UUIDString;
  projectId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteProjectQuestionnaireQuestion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteProjectQuestionnaireQuestionData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteProjectQuestionnaireQuestionData {
  projectQuestionnaireQuestion_delete?: ProjectQuestionnaireQuestion_Key | null;
}
```
### Using `DeleteProjectQuestionnaireQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteProjectQuestionnaireQuestion, DeleteProjectQuestionnaireQuestionVariables } from '@generated/data-connector-web';

// The `DeleteProjectQuestionnaireQuestion` mutation requires an argument of type `DeleteProjectQuestionnaireQuestionVariables`:
const deleteProjectQuestionnaireQuestionVars: DeleteProjectQuestionnaireQuestionVariables = {
  id: ..., 
  projectId: ..., 
};

// Call the `deleteProjectQuestionnaireQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteProjectQuestionnaireQuestion(deleteProjectQuestionnaireQuestionVars);
// Variables can be defined inline as well.
const { data } = await deleteProjectQuestionnaireQuestion({ id: ..., projectId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteProjectQuestionnaireQuestion(dataConnect, deleteProjectQuestionnaireQuestionVars);

console.log(data.projectQuestionnaireQuestion_delete);

// Or, you can use the `Promise` API.
deleteProjectQuestionnaireQuestion(deleteProjectQuestionnaireQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaireQuestion_delete);
});
```

### Using `DeleteProjectQuestionnaireQuestion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteProjectQuestionnaireQuestionRef, DeleteProjectQuestionnaireQuestionVariables } from '@generated/data-connector-web';

// The `DeleteProjectQuestionnaireQuestion` mutation requires an argument of type `DeleteProjectQuestionnaireQuestionVariables`:
const deleteProjectQuestionnaireQuestionVars: DeleteProjectQuestionnaireQuestionVariables = {
  id: ..., 
  projectId: ..., 
};

// Call the `deleteProjectQuestionnaireQuestionRef()` function to get a reference to the mutation.
const ref = deleteProjectQuestionnaireQuestionRef(deleteProjectQuestionnaireQuestionVars);
// Variables can be defined inline as well.
const ref = deleteProjectQuestionnaireQuestionRef({ id: ..., projectId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteProjectQuestionnaireQuestionRef(dataConnect, deleteProjectQuestionnaireQuestionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.projectQuestionnaireQuestion_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaireQuestion_delete);
});
```

## EnsureSystemQuoteItemTemplates
You can execute the `EnsureSystemQuoteItemTemplates` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
ensureSystemQuoteItemTemplates(): MutationPromise<EnsureSystemQuoteItemTemplatesData, undefined>;

interface EnsureSystemQuoteItemTemplatesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<EnsureSystemQuoteItemTemplatesData, undefined>;
}
export const ensureSystemQuoteItemTemplatesRef: EnsureSystemQuoteItemTemplatesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
ensureSystemQuoteItemTemplates(dc: DataConnect): MutationPromise<EnsureSystemQuoteItemTemplatesData, undefined>;

interface EnsureSystemQuoteItemTemplatesRef {
  ...
  (dc: DataConnect): MutationRef<EnsureSystemQuoteItemTemplatesData, undefined>;
}
export const ensureSystemQuoteItemTemplatesRef: EnsureSystemQuoteItemTemplatesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the ensureSystemQuoteItemTemplatesRef:
```typescript
const name = ensureSystemQuoteItemTemplatesRef.operationName;
console.log(name);
```

### Variables
The `EnsureSystemQuoteItemTemplates` mutation has no variables.
### Return Type
Recall that executing the `EnsureSystemQuoteItemTemplates` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EnsureSystemQuoteItemTemplatesData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `EnsureSystemQuoteItemTemplates`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ensureSystemQuoteItemTemplates } from '@generated/data-connector-web';


// Call the `ensureSystemQuoteItemTemplates()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await ensureSystemQuoteItemTemplates();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await ensureSystemQuoteItemTemplates(dataConnect);

console.log(data.wallsPlasterboardQuantitySource);
console.log(data.wetWallsVillaboardQuantitySource);
console.log(data.ceilingsPlasterboardQuantitySource);
console.log(data.coveCorniceQuantitySource);
console.log(data.wetFloorsFcSheetQuantitySource);
console.log(data.doorSetsQuantitySource);
console.log(data.wallsPlasterboardItemTemplate);
console.log(data.wetWallsVillaboardItemTemplate);
console.log(data.ceilingsPlasterboardItemTemplate);
console.log(data.coveCorniceItemTemplate);
console.log(data.wetFloorsFcSheetItemTemplate);
console.log(data.doorSetsItemTemplate);

// Or, you can use the `Promise` API.
ensureSystemQuoteItemTemplates().then((response) => {
  const data = response.data;
  console.log(data.wallsPlasterboardQuantitySource);
  console.log(data.wetWallsVillaboardQuantitySource);
  console.log(data.ceilingsPlasterboardQuantitySource);
  console.log(data.coveCorniceQuantitySource);
  console.log(data.wetFloorsFcSheetQuantitySource);
  console.log(data.doorSetsQuantitySource);
  console.log(data.wallsPlasterboardItemTemplate);
  console.log(data.wetWallsVillaboardItemTemplate);
  console.log(data.ceilingsPlasterboardItemTemplate);
  console.log(data.coveCorniceItemTemplate);
  console.log(data.wetFloorsFcSheetItemTemplate);
  console.log(data.doorSetsItemTemplate);
});
```

### Using `EnsureSystemQuoteItemTemplates`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, ensureSystemQuoteItemTemplatesRef } from '@generated/data-connector-web';


// Call the `ensureSystemQuoteItemTemplatesRef()` function to get a reference to the mutation.
const ref = ensureSystemQuoteItemTemplatesRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = ensureSystemQuoteItemTemplatesRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.wallsPlasterboardQuantitySource);
console.log(data.wetWallsVillaboardQuantitySource);
console.log(data.ceilingsPlasterboardQuantitySource);
console.log(data.coveCorniceQuantitySource);
console.log(data.wetFloorsFcSheetQuantitySource);
console.log(data.doorSetsQuantitySource);
console.log(data.wallsPlasterboardItemTemplate);
console.log(data.wetWallsVillaboardItemTemplate);
console.log(data.ceilingsPlasterboardItemTemplate);
console.log(data.coveCorniceItemTemplate);
console.log(data.wetFloorsFcSheetItemTemplate);
console.log(data.doorSetsItemTemplate);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.wallsPlasterboardQuantitySource);
  console.log(data.wetWallsVillaboardQuantitySource);
  console.log(data.ceilingsPlasterboardQuantitySource);
  console.log(data.coveCorniceQuantitySource);
  console.log(data.wetFloorsFcSheetQuantitySource);
  console.log(data.doorSetsQuantitySource);
  console.log(data.wallsPlasterboardItemTemplate);
  console.log(data.wetWallsVillaboardItemTemplate);
  console.log(data.ceilingsPlasterboardItemTemplate);
  console.log(data.coveCorniceItemTemplate);
  console.log(data.wetFloorsFcSheetItemTemplate);
  console.log(data.doorSetsItemTemplate);
});
```

## CreateQuoteTemplate
You can execute the `CreateQuoteTemplate` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createQuoteTemplate(vars: CreateQuoteTemplateVariables): MutationPromise<CreateQuoteTemplateData, CreateQuoteTemplateVariables>;

interface CreateQuoteTemplateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuoteTemplateVariables): MutationRef<CreateQuoteTemplateData, CreateQuoteTemplateVariables>;
}
export const createQuoteTemplateRef: CreateQuoteTemplateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createQuoteTemplate(dc: DataConnect, vars: CreateQuoteTemplateVariables): MutationPromise<CreateQuoteTemplateData, CreateQuoteTemplateVariables>;

interface CreateQuoteTemplateRef {
  ...
  (dc: DataConnect, vars: CreateQuoteTemplateVariables): MutationRef<CreateQuoteTemplateData, CreateQuoteTemplateVariables>;
}
export const createQuoteTemplateRef: CreateQuoteTemplateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQuoteTemplateRef:
```typescript
const name = createQuoteTemplateRef.operationName;
console.log(name);
```

### Variables
The `CreateQuoteTemplate` mutation requires an argument of type `CreateQuoteTemplateVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateQuoteTemplateVariables {
  id: UUIDString;
  name: string;
}
```
### Return Type
Recall that executing the `CreateQuoteTemplate` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQuoteTemplateData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateQuoteTemplateData {
  quoteTemplate_insert: QuoteTemplate_Key;
}
```
### Using `CreateQuoteTemplate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQuoteTemplate, CreateQuoteTemplateVariables } from '@generated/data-connector-web';

// The `CreateQuoteTemplate` mutation requires an argument of type `CreateQuoteTemplateVariables`:
const createQuoteTemplateVars: CreateQuoteTemplateVariables = {
  id: ..., 
  name: ..., 
};

// Call the `createQuoteTemplate()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuoteTemplate(createQuoteTemplateVars);
// Variables can be defined inline as well.
const { data } = await createQuoteTemplate({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQuoteTemplate(dataConnect, createQuoteTemplateVars);

console.log(data.quoteTemplate_insert);

// Or, you can use the `Promise` API.
createQuoteTemplate(createQuoteTemplateVars).then((response) => {
  const data = response.data;
  console.log(data.quoteTemplate_insert);
});
```

### Using `CreateQuoteTemplate`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQuoteTemplateRef, CreateQuoteTemplateVariables } from '@generated/data-connector-web';

// The `CreateQuoteTemplate` mutation requires an argument of type `CreateQuoteTemplateVariables`:
const createQuoteTemplateVars: CreateQuoteTemplateVariables = {
  id: ..., 
  name: ..., 
};

// Call the `createQuoteTemplateRef()` function to get a reference to the mutation.
const ref = createQuoteTemplateRef(createQuoteTemplateVars);
// Variables can be defined inline as well.
const ref = createQuoteTemplateRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQuoteTemplateRef(dataConnect, createQuoteTemplateVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quoteTemplate_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteTemplate_insert);
});
```

## CreateQuoteItemTemplateConfig
You can execute the `CreateQuoteItemTemplateConfig` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createQuoteItemTemplateConfig(vars: CreateQuoteItemTemplateConfigVariables): MutationPromise<CreateQuoteItemTemplateConfigData, CreateQuoteItemTemplateConfigVariables>;

interface CreateQuoteItemTemplateConfigRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuoteItemTemplateConfigVariables): MutationRef<CreateQuoteItemTemplateConfigData, CreateQuoteItemTemplateConfigVariables>;
}
export const createQuoteItemTemplateConfigRef: CreateQuoteItemTemplateConfigRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createQuoteItemTemplateConfig(dc: DataConnect, vars: CreateQuoteItemTemplateConfigVariables): MutationPromise<CreateQuoteItemTemplateConfigData, CreateQuoteItemTemplateConfigVariables>;

interface CreateQuoteItemTemplateConfigRef {
  ...
  (dc: DataConnect, vars: CreateQuoteItemTemplateConfigVariables): MutationRef<CreateQuoteItemTemplateConfigData, CreateQuoteItemTemplateConfigVariables>;
}
export const createQuoteItemTemplateConfigRef: CreateQuoteItemTemplateConfigRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQuoteItemTemplateConfigRef:
```typescript
const name = createQuoteItemTemplateConfigRef.operationName;
console.log(name);
```

### Variables
The `CreateQuoteItemTemplateConfig` mutation requires an argument of type `CreateQuoteItemTemplateConfigVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateQuoteItemTemplateConfigVariables {
  quoteTemplateId: UUIDString;
  itemTemplateId: UUIDString;
  unitPriceCents: number;
  materialUnitPriceCents: number;
  labourUnitPriceCents: number;
}
```
### Return Type
Recall that executing the `CreateQuoteItemTemplateConfig` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQuoteItemTemplateConfigData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateQuoteItemTemplateConfigData {
  quoteItemTemplateConfig_insert: QuoteItemTemplateConfig_Key;
}
```
### Using `CreateQuoteItemTemplateConfig`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQuoteItemTemplateConfig, CreateQuoteItemTemplateConfigVariables } from '@generated/data-connector-web';

// The `CreateQuoteItemTemplateConfig` mutation requires an argument of type `CreateQuoteItemTemplateConfigVariables`:
const createQuoteItemTemplateConfigVars: CreateQuoteItemTemplateConfigVariables = {
  quoteTemplateId: ..., 
  itemTemplateId: ..., 
  unitPriceCents: ..., 
  materialUnitPriceCents: ..., 
  labourUnitPriceCents: ..., 
};

// Call the `createQuoteItemTemplateConfig()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuoteItemTemplateConfig(createQuoteItemTemplateConfigVars);
// Variables can be defined inline as well.
const { data } = await createQuoteItemTemplateConfig({ quoteTemplateId: ..., itemTemplateId: ..., unitPriceCents: ..., materialUnitPriceCents: ..., labourUnitPriceCents: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQuoteItemTemplateConfig(dataConnect, createQuoteItemTemplateConfigVars);

console.log(data.quoteItemTemplateConfig_insert);

// Or, you can use the `Promise` API.
createQuoteItemTemplateConfig(createQuoteItemTemplateConfigVars).then((response) => {
  const data = response.data;
  console.log(data.quoteItemTemplateConfig_insert);
});
```

### Using `CreateQuoteItemTemplateConfig`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQuoteItemTemplateConfigRef, CreateQuoteItemTemplateConfigVariables } from '@generated/data-connector-web';

// The `CreateQuoteItemTemplateConfig` mutation requires an argument of type `CreateQuoteItemTemplateConfigVariables`:
const createQuoteItemTemplateConfigVars: CreateQuoteItemTemplateConfigVariables = {
  quoteTemplateId: ..., 
  itemTemplateId: ..., 
  unitPriceCents: ..., 
  materialUnitPriceCents: ..., 
  labourUnitPriceCents: ..., 
};

// Call the `createQuoteItemTemplateConfigRef()` function to get a reference to the mutation.
const ref = createQuoteItemTemplateConfigRef(createQuoteItemTemplateConfigVars);
// Variables can be defined inline as well.
const ref = createQuoteItemTemplateConfigRef({ quoteTemplateId: ..., itemTemplateId: ..., unitPriceCents: ..., materialUnitPriceCents: ..., labourUnitPriceCents: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQuoteItemTemplateConfigRef(dataConnect, createQuoteItemTemplateConfigVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quoteItemTemplateConfig_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteItemTemplateConfig_insert);
});
```

## UpdateQuoteItemTemplateConfig
You can execute the `UpdateQuoteItemTemplateConfig` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateQuoteItemTemplateConfig(vars: UpdateQuoteItemTemplateConfigVariables): MutationPromise<UpdateQuoteItemTemplateConfigData, UpdateQuoteItemTemplateConfigVariables>;

interface UpdateQuoteItemTemplateConfigRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuoteItemTemplateConfigVariables): MutationRef<UpdateQuoteItemTemplateConfigData, UpdateQuoteItemTemplateConfigVariables>;
}
export const updateQuoteItemTemplateConfigRef: UpdateQuoteItemTemplateConfigRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateQuoteItemTemplateConfig(dc: DataConnect, vars: UpdateQuoteItemTemplateConfigVariables): MutationPromise<UpdateQuoteItemTemplateConfigData, UpdateQuoteItemTemplateConfigVariables>;

interface UpdateQuoteItemTemplateConfigRef {
  ...
  (dc: DataConnect, vars: UpdateQuoteItemTemplateConfigVariables): MutationRef<UpdateQuoteItemTemplateConfigData, UpdateQuoteItemTemplateConfigVariables>;
}
export const updateQuoteItemTemplateConfigRef: UpdateQuoteItemTemplateConfigRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateQuoteItemTemplateConfigRef:
```typescript
const name = updateQuoteItemTemplateConfigRef.operationName;
console.log(name);
```

### Variables
The `UpdateQuoteItemTemplateConfig` mutation requires an argument of type `UpdateQuoteItemTemplateConfigVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
Recall that executing the `UpdateQuoteItemTemplateConfig` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateQuoteItemTemplateConfigData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateQuoteItemTemplateConfigData {
  quoteItemTemplateConfig_update?: QuoteItemTemplateConfig_Key | null;
}
```
### Using `UpdateQuoteItemTemplateConfig`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateQuoteItemTemplateConfig, UpdateQuoteItemTemplateConfigVariables } from '@generated/data-connector-web';

// The `UpdateQuoteItemTemplateConfig` mutation requires an argument of type `UpdateQuoteItemTemplateConfigVariables`:
const updateQuoteItemTemplateConfigVars: UpdateQuoteItemTemplateConfigVariables = {
  quoteTemplateId: ..., 
  itemTemplateId: ..., 
  enabled: ..., 
  unitPriceCents: ..., 
  materialUnitPriceCents: ..., 
  labourUnitPriceCents: ..., 
};

// Call the `updateQuoteItemTemplateConfig()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateQuoteItemTemplateConfig(updateQuoteItemTemplateConfigVars);
// Variables can be defined inline as well.
const { data } = await updateQuoteItemTemplateConfig({ quoteTemplateId: ..., itemTemplateId: ..., enabled: ..., unitPriceCents: ..., materialUnitPriceCents: ..., labourUnitPriceCents: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateQuoteItemTemplateConfig(dataConnect, updateQuoteItemTemplateConfigVars);

console.log(data.quoteItemTemplateConfig_update);

// Or, you can use the `Promise` API.
updateQuoteItemTemplateConfig(updateQuoteItemTemplateConfigVars).then((response) => {
  const data = response.data;
  console.log(data.quoteItemTemplateConfig_update);
});
```

### Using `UpdateQuoteItemTemplateConfig`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateQuoteItemTemplateConfigRef, UpdateQuoteItemTemplateConfigVariables } from '@generated/data-connector-web';

// The `UpdateQuoteItemTemplateConfig` mutation requires an argument of type `UpdateQuoteItemTemplateConfigVariables`:
const updateQuoteItemTemplateConfigVars: UpdateQuoteItemTemplateConfigVariables = {
  quoteTemplateId: ..., 
  itemTemplateId: ..., 
  enabled: ..., 
  unitPriceCents: ..., 
  materialUnitPriceCents: ..., 
  labourUnitPriceCents: ..., 
};

// Call the `updateQuoteItemTemplateConfigRef()` function to get a reference to the mutation.
const ref = updateQuoteItemTemplateConfigRef(updateQuoteItemTemplateConfigVars);
// Variables can be defined inline as well.
const ref = updateQuoteItemTemplateConfigRef({ quoteTemplateId: ..., itemTemplateId: ..., enabled: ..., unitPriceCents: ..., materialUnitPriceCents: ..., labourUnitPriceCents: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateQuoteItemTemplateConfigRef(dataConnect, updateQuoteItemTemplateConfigVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quoteItemTemplateConfig_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteItemTemplateConfig_update);
});
```

## CreateQuoteItemTemplate
You can execute the `CreateQuoteItemTemplate` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createQuoteItemTemplate(vars: CreateQuoteItemTemplateVariables): MutationPromise<CreateQuoteItemTemplateData, CreateQuoteItemTemplateVariables>;

interface CreateQuoteItemTemplateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuoteItemTemplateVariables): MutationRef<CreateQuoteItemTemplateData, CreateQuoteItemTemplateVariables>;
}
export const createQuoteItemTemplateRef: CreateQuoteItemTemplateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createQuoteItemTemplate(dc: DataConnect, vars: CreateQuoteItemTemplateVariables): MutationPromise<CreateQuoteItemTemplateData, CreateQuoteItemTemplateVariables>;

interface CreateQuoteItemTemplateRef {
  ...
  (dc: DataConnect, vars: CreateQuoteItemTemplateVariables): MutationRef<CreateQuoteItemTemplateData, CreateQuoteItemTemplateVariables>;
}
export const createQuoteItemTemplateRef: CreateQuoteItemTemplateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQuoteItemTemplateRef:
```typescript
const name = createQuoteItemTemplateRef.operationName;
console.log(name);
```

### Variables
The `CreateQuoteItemTemplate` mutation requires an argument of type `CreateQuoteItemTemplateVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateQuoteItemTemplateVariables {
  id: UUIDString;
  name: string;
  hasKeywords: boolean;
  keywords: string[];
}
```
### Return Type
Recall that executing the `CreateQuoteItemTemplate` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQuoteItemTemplateData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateQuoteItemTemplateData {
  quoteItemTemplate_insert: QuoteItemTemplate_Key;
}
```
### Using `CreateQuoteItemTemplate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQuoteItemTemplate, CreateQuoteItemTemplateVariables } from '@generated/data-connector-web';

// The `CreateQuoteItemTemplate` mutation requires an argument of type `CreateQuoteItemTemplateVariables`:
const createQuoteItemTemplateVars: CreateQuoteItemTemplateVariables = {
  id: ..., 
  name: ..., 
  hasKeywords: ..., 
  keywords: ..., 
};

// Call the `createQuoteItemTemplate()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuoteItemTemplate(createQuoteItemTemplateVars);
// Variables can be defined inline as well.
const { data } = await createQuoteItemTemplate({ id: ..., name: ..., hasKeywords: ..., keywords: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQuoteItemTemplate(dataConnect, createQuoteItemTemplateVars);

console.log(data.quoteItemTemplate_insert);

// Or, you can use the `Promise` API.
createQuoteItemTemplate(createQuoteItemTemplateVars).then((response) => {
  const data = response.data;
  console.log(data.quoteItemTemplate_insert);
});
```

### Using `CreateQuoteItemTemplate`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQuoteItemTemplateRef, CreateQuoteItemTemplateVariables } from '@generated/data-connector-web';

// The `CreateQuoteItemTemplate` mutation requires an argument of type `CreateQuoteItemTemplateVariables`:
const createQuoteItemTemplateVars: CreateQuoteItemTemplateVariables = {
  id: ..., 
  name: ..., 
  hasKeywords: ..., 
  keywords: ..., 
};

// Call the `createQuoteItemTemplateRef()` function to get a reference to the mutation.
const ref = createQuoteItemTemplateRef(createQuoteItemTemplateVars);
// Variables can be defined inline as well.
const ref = createQuoteItemTemplateRef({ id: ..., name: ..., hasKeywords: ..., keywords: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQuoteItemTemplateRef(dataConnect, createQuoteItemTemplateVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quoteItemTemplate_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteItemTemplate_insert);
});
```

## UpdateQuoteItemTemplate
You can execute the `UpdateQuoteItemTemplate` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateQuoteItemTemplate(vars: UpdateQuoteItemTemplateVariables): MutationPromise<UpdateQuoteItemTemplateData, UpdateQuoteItemTemplateVariables>;

interface UpdateQuoteItemTemplateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuoteItemTemplateVariables): MutationRef<UpdateQuoteItemTemplateData, UpdateQuoteItemTemplateVariables>;
}
export const updateQuoteItemTemplateRef: UpdateQuoteItemTemplateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateQuoteItemTemplate(dc: DataConnect, vars: UpdateQuoteItemTemplateVariables): MutationPromise<UpdateQuoteItemTemplateData, UpdateQuoteItemTemplateVariables>;

interface UpdateQuoteItemTemplateRef {
  ...
  (dc: DataConnect, vars: UpdateQuoteItemTemplateVariables): MutationRef<UpdateQuoteItemTemplateData, UpdateQuoteItemTemplateVariables>;
}
export const updateQuoteItemTemplateRef: UpdateQuoteItemTemplateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateQuoteItemTemplateRef:
```typescript
const name = updateQuoteItemTemplateRef.operationName;
console.log(name);
```

### Variables
The `UpdateQuoteItemTemplate` mutation requires an argument of type `UpdateQuoteItemTemplateVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateQuoteItemTemplateVariables {
  id: UUIDString;
  name: string;
  hasKeywords: boolean;
  keywords: string[];
}
```
### Return Type
Recall that executing the `UpdateQuoteItemTemplate` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateQuoteItemTemplateData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateQuoteItemTemplateData {
  quoteItemTemplate_update?: QuoteItemTemplate_Key | null;
}
```
### Using `UpdateQuoteItemTemplate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateQuoteItemTemplate, UpdateQuoteItemTemplateVariables } from '@generated/data-connector-web';

// The `UpdateQuoteItemTemplate` mutation requires an argument of type `UpdateQuoteItemTemplateVariables`:
const updateQuoteItemTemplateVars: UpdateQuoteItemTemplateVariables = {
  id: ..., 
  name: ..., 
  hasKeywords: ..., 
  keywords: ..., 
};

// Call the `updateQuoteItemTemplate()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateQuoteItemTemplate(updateQuoteItemTemplateVars);
// Variables can be defined inline as well.
const { data } = await updateQuoteItemTemplate({ id: ..., name: ..., hasKeywords: ..., keywords: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateQuoteItemTemplate(dataConnect, updateQuoteItemTemplateVars);

console.log(data.quoteItemTemplate_update);

// Or, you can use the `Promise` API.
updateQuoteItemTemplate(updateQuoteItemTemplateVars).then((response) => {
  const data = response.data;
  console.log(data.quoteItemTemplate_update);
});
```

### Using `UpdateQuoteItemTemplate`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateQuoteItemTemplateRef, UpdateQuoteItemTemplateVariables } from '@generated/data-connector-web';

// The `UpdateQuoteItemTemplate` mutation requires an argument of type `UpdateQuoteItemTemplateVariables`:
const updateQuoteItemTemplateVars: UpdateQuoteItemTemplateVariables = {
  id: ..., 
  name: ..., 
  hasKeywords: ..., 
  keywords: ..., 
};

// Call the `updateQuoteItemTemplateRef()` function to get a reference to the mutation.
const ref = updateQuoteItemTemplateRef(updateQuoteItemTemplateVars);
// Variables can be defined inline as well.
const ref = updateQuoteItemTemplateRef({ id: ..., name: ..., hasKeywords: ..., keywords: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateQuoteItemTemplateRef(dataConnect, updateQuoteItemTemplateVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quoteItemTemplate_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteItemTemplate_update);
});
```

## DeleteQuoteItemTemplate
You can execute the `DeleteQuoteItemTemplate` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
deleteQuoteItemTemplate(vars: DeleteQuoteItemTemplateVariables): MutationPromise<DeleteQuoteItemTemplateData, DeleteQuoteItemTemplateVariables>;

interface DeleteQuoteItemTemplateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQuoteItemTemplateVariables): MutationRef<DeleteQuoteItemTemplateData, DeleteQuoteItemTemplateVariables>;
}
export const deleteQuoteItemTemplateRef: DeleteQuoteItemTemplateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteQuoteItemTemplate(dc: DataConnect, vars: DeleteQuoteItemTemplateVariables): MutationPromise<DeleteQuoteItemTemplateData, DeleteQuoteItemTemplateVariables>;

interface DeleteQuoteItemTemplateRef {
  ...
  (dc: DataConnect, vars: DeleteQuoteItemTemplateVariables): MutationRef<DeleteQuoteItemTemplateData, DeleteQuoteItemTemplateVariables>;
}
export const deleteQuoteItemTemplateRef: DeleteQuoteItemTemplateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteQuoteItemTemplateRef:
```typescript
const name = deleteQuoteItemTemplateRef.operationName;
console.log(name);
```

### Variables
The `DeleteQuoteItemTemplate` mutation requires an argument of type `DeleteQuoteItemTemplateVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteQuoteItemTemplateVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteQuoteItemTemplate` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteQuoteItemTemplateData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteQuoteItemTemplateData {
  quoteItemTemplateConfig_deleteMany: number;
  quoteItemTemplate_delete?: QuoteItemTemplate_Key | null;
}
```
### Using `DeleteQuoteItemTemplate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteQuoteItemTemplate, DeleteQuoteItemTemplateVariables } from '@generated/data-connector-web';

// The `DeleteQuoteItemTemplate` mutation requires an argument of type `DeleteQuoteItemTemplateVariables`:
const deleteQuoteItemTemplateVars: DeleteQuoteItemTemplateVariables = {
  id: ..., 
};

// Call the `deleteQuoteItemTemplate()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteQuoteItemTemplate(deleteQuoteItemTemplateVars);
// Variables can be defined inline as well.
const { data } = await deleteQuoteItemTemplate({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteQuoteItemTemplate(dataConnect, deleteQuoteItemTemplateVars);

console.log(data.quoteItemTemplateConfig_deleteMany);
console.log(data.quoteItemTemplate_delete);

// Or, you can use the `Promise` API.
deleteQuoteItemTemplate(deleteQuoteItemTemplateVars).then((response) => {
  const data = response.data;
  console.log(data.quoteItemTemplateConfig_deleteMany);
  console.log(data.quoteItemTemplate_delete);
});
```

### Using `DeleteQuoteItemTemplate`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteQuoteItemTemplateRef, DeleteQuoteItemTemplateVariables } from '@generated/data-connector-web';

// The `DeleteQuoteItemTemplate` mutation requires an argument of type `DeleteQuoteItemTemplateVariables`:
const deleteQuoteItemTemplateVars: DeleteQuoteItemTemplateVariables = {
  id: ..., 
};

// Call the `deleteQuoteItemTemplateRef()` function to get a reference to the mutation.
const ref = deleteQuoteItemTemplateRef(deleteQuoteItemTemplateVars);
// Variables can be defined inline as well.
const ref = deleteQuoteItemTemplateRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteQuoteItemTemplateRef(dataConnect, deleteQuoteItemTemplateVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quoteItemTemplateConfig_deleteMany);
console.log(data.quoteItemTemplate_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteItemTemplateConfig_deleteMany);
  console.log(data.quoteItemTemplate_delete);
});
```

## UpdateQuoteStatus
You can execute the `UpdateQuoteStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateQuoteStatus(vars: UpdateQuoteStatusVariables): MutationPromise<UpdateQuoteStatusData, UpdateQuoteStatusVariables>;

interface UpdateQuoteStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuoteStatusVariables): MutationRef<UpdateQuoteStatusData, UpdateQuoteStatusVariables>;
}
export const updateQuoteStatusRef: UpdateQuoteStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateQuoteStatus(dc: DataConnect, vars: UpdateQuoteStatusVariables): MutationPromise<UpdateQuoteStatusData, UpdateQuoteStatusVariables>;

interface UpdateQuoteStatusRef {
  ...
  (dc: DataConnect, vars: UpdateQuoteStatusVariables): MutationRef<UpdateQuoteStatusData, UpdateQuoteStatusVariables>;
}
export const updateQuoteStatusRef: UpdateQuoteStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateQuoteStatusRef:
```typescript
const name = updateQuoteStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateQuoteStatus` mutation requires an argument of type `UpdateQuoteStatusVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateQuoteStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateQuoteStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateQuoteStatusData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateQuoteStatusData {
  quote_update?: Quote_Key | null;
}
```
### Using `UpdateQuoteStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateQuoteStatus, UpdateQuoteStatusVariables } from '@generated/data-connector-web';

// The `UpdateQuoteStatus` mutation requires an argument of type `UpdateQuoteStatusVariables`:
const updateQuoteStatusVars: UpdateQuoteStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateQuoteStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateQuoteStatus(updateQuoteStatusVars);
// Variables can be defined inline as well.
const { data } = await updateQuoteStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateQuoteStatus(dataConnect, updateQuoteStatusVars);

console.log(data.quote_update);

// Or, you can use the `Promise` API.
updateQuoteStatus(updateQuoteStatusVars).then((response) => {
  const data = response.data;
  console.log(data.quote_update);
});
```

### Using `UpdateQuoteStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateQuoteStatusRef, UpdateQuoteStatusVariables } from '@generated/data-connector-web';

// The `UpdateQuoteStatus` mutation requires an argument of type `UpdateQuoteStatusVariables`:
const updateQuoteStatusVars: UpdateQuoteStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateQuoteStatusRef()` function to get a reference to the mutation.
const ref = updateQuoteStatusRef(updateQuoteStatusVars);
// Variables can be defined inline as well.
const ref = updateQuoteStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateQuoteStatusRef(dataConnect, updateQuoteStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quote_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quote_update);
});
```

## UpsertMyUserSettings
You can execute the `UpsertMyUserSettings` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
upsertMyUserSettings(vars: UpsertMyUserSettingsVariables): MutationPromise<UpsertMyUserSettingsData, UpsertMyUserSettingsVariables>;

interface UpsertMyUserSettingsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertMyUserSettingsVariables): MutationRef<UpsertMyUserSettingsData, UpsertMyUserSettingsVariables>;
}
export const upsertMyUserSettingsRef: UpsertMyUserSettingsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertMyUserSettings(dc: DataConnect, vars: UpsertMyUserSettingsVariables): MutationPromise<UpsertMyUserSettingsData, UpsertMyUserSettingsVariables>;

interface UpsertMyUserSettingsRef {
  ...
  (dc: DataConnect, vars: UpsertMyUserSettingsVariables): MutationRef<UpsertMyUserSettingsData, UpsertMyUserSettingsVariables>;
}
export const upsertMyUserSettingsRef: UpsertMyUserSettingsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertMyUserSettingsRef:
```typescript
const name = upsertMyUserSettingsRef.operationName;
console.log(name);
```

### Variables
The `UpsertMyUserSettings` mutation requires an argument of type `UpsertMyUserSettingsVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertMyUserSettingsVariables {
  quoteFollowUpEnabled: boolean;
  quoteFollowUpDays: number;
}
```
### Return Type
Recall that executing the `UpsertMyUserSettings` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertMyUserSettingsData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertMyUserSettingsData {
  userSettings_upsert: UserSettings_Key;
}
```
### Using `UpsertMyUserSettings`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertMyUserSettings, UpsertMyUserSettingsVariables } from '@generated/data-connector-web';

// The `UpsertMyUserSettings` mutation requires an argument of type `UpsertMyUserSettingsVariables`:
const upsertMyUserSettingsVars: UpsertMyUserSettingsVariables = {
  quoteFollowUpEnabled: ..., 
  quoteFollowUpDays: ..., 
};

// Call the `upsertMyUserSettings()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertMyUserSettings(upsertMyUserSettingsVars);
// Variables can be defined inline as well.
const { data } = await upsertMyUserSettings({ quoteFollowUpEnabled: ..., quoteFollowUpDays: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertMyUserSettings(dataConnect, upsertMyUserSettingsVars);

console.log(data.userSettings_upsert);

// Or, you can use the `Promise` API.
upsertMyUserSettings(upsertMyUserSettingsVars).then((response) => {
  const data = response.data;
  console.log(data.userSettings_upsert);
});
```

### Using `UpsertMyUserSettings`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertMyUserSettingsRef, UpsertMyUserSettingsVariables } from '@generated/data-connector-web';

// The `UpsertMyUserSettings` mutation requires an argument of type `UpsertMyUserSettingsVariables`:
const upsertMyUserSettingsVars: UpsertMyUserSettingsVariables = {
  quoteFollowUpEnabled: ..., 
  quoteFollowUpDays: ..., 
};

// Call the `upsertMyUserSettingsRef()` function to get a reference to the mutation.
const ref = upsertMyUserSettingsRef(upsertMyUserSettingsVars);
// Variables can be defined inline as well.
const ref = upsertMyUserSettingsRef({ quoteFollowUpEnabled: ..., quoteFollowUpDays: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertMyUserSettingsRef(dataConnect, upsertMyUserSettingsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userSettings_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userSettings_upsert);
});
```

## UpsertMyUserSignature
You can execute the `UpsertMyUserSignature` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
upsertMyUserSignature(vars?: UpsertMyUserSignatureVariables): MutationPromise<UpsertMyUserSignatureData, UpsertMyUserSignatureVariables>;

interface UpsertMyUserSignatureRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpsertMyUserSignatureVariables): MutationRef<UpsertMyUserSignatureData, UpsertMyUserSignatureVariables>;
}
export const upsertMyUserSignatureRef: UpsertMyUserSignatureRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertMyUserSignature(dc: DataConnect, vars?: UpsertMyUserSignatureVariables): MutationPromise<UpsertMyUserSignatureData, UpsertMyUserSignatureVariables>;

interface UpsertMyUserSignatureRef {
  ...
  (dc: DataConnect, vars?: UpsertMyUserSignatureVariables): MutationRef<UpsertMyUserSignatureData, UpsertMyUserSignatureVariables>;
}
export const upsertMyUserSignatureRef: UpsertMyUserSignatureRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertMyUserSignatureRef:
```typescript
const name = upsertMyUserSignatureRef.operationName;
console.log(name);
```

### Variables
The `UpsertMyUserSignature` mutation has an optional argument of type `UpsertMyUserSignatureVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
Recall that executing the `UpsertMyUserSignature` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertMyUserSignatureData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertMyUserSignatureData {
  userSignature_upsert: UserSignature_Key;
}
```
### Using `UpsertMyUserSignature`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertMyUserSignature, UpsertMyUserSignatureVariables } from '@generated/data-connector-web';

// The `UpsertMyUserSignature` mutation has an optional argument of type `UpsertMyUserSignatureVariables`:
const upsertMyUserSignatureVars: UpsertMyUserSignatureVariables = {
  name: ..., // optional
  companyName: ..., // optional
  address: ..., // optional
  mobile: ..., // optional
  phone: ..., // optional
  email: ..., // optional
};

// Call the `upsertMyUserSignature()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertMyUserSignature(upsertMyUserSignatureVars);
// Variables can be defined inline as well.
const { data } = await upsertMyUserSignature({ name: ..., companyName: ..., address: ..., mobile: ..., phone: ..., email: ..., });
// Since all variables are optional for this mutation, you can omit the `UpsertMyUserSignatureVariables` argument.
const { data } = await upsertMyUserSignature();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertMyUserSignature(dataConnect, upsertMyUserSignatureVars);

console.log(data.userSignature_upsert);

// Or, you can use the `Promise` API.
upsertMyUserSignature(upsertMyUserSignatureVars).then((response) => {
  const data = response.data;
  console.log(data.userSignature_upsert);
});
```

### Using `UpsertMyUserSignature`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertMyUserSignatureRef, UpsertMyUserSignatureVariables } from '@generated/data-connector-web';

// The `UpsertMyUserSignature` mutation has an optional argument of type `UpsertMyUserSignatureVariables`:
const upsertMyUserSignatureVars: UpsertMyUserSignatureVariables = {
  name: ..., // optional
  companyName: ..., // optional
  address: ..., // optional
  mobile: ..., // optional
  phone: ..., // optional
  email: ..., // optional
};

// Call the `upsertMyUserSignatureRef()` function to get a reference to the mutation.
const ref = upsertMyUserSignatureRef(upsertMyUserSignatureVars);
// Variables can be defined inline as well.
const ref = upsertMyUserSignatureRef({ name: ..., companyName: ..., address: ..., mobile: ..., phone: ..., email: ..., });
// Since all variables are optional for this mutation, you can omit the `UpsertMyUserSignatureVariables` argument.
const ref = upsertMyUserSignatureRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertMyUserSignatureRef(dataConnect, upsertMyUserSignatureVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userSignature_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userSignature_upsert);
});
```

