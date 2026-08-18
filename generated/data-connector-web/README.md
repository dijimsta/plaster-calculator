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
  - [*GetMyQuoteAppearance*](#getmyquoteappearance)
  - [*ListQuoteItemTemplateConfigsForQuoteTemplate*](#listquoteitemtemplateconfigsforquotetemplate)
  - [*ListQuotesForTeam*](#listquotesforteam)
  - [*GetQuoteById*](#getquotebyid)
  - [*GetQuoteReadiness*](#getquotereadiness)
  - [*GetProjectQuote*](#getprojectquote)
  - [*GetMyTeam*](#getmyteam)
  - [*GetMyUserSettings*](#getmyusersettings)
  - [*GetMyUserSignature*](#getmyusersignature)
- [**Mutations**](#mutations)
  - [*CreateMyCompany*](#createmycompany)
  - [*UpdateMyCompany*](#updatemycompany)
  - [*SetMyCompanyPrimaryContact*](#setmycompanyprimarycontact)
  - [*ClearMyCompanyPrimaryContact*](#clearmycompanyprimarycontact)
  - [*AssignQuoteTemplateToCompany*](#assignquotetemplatetocompany)
  - [*ClearCompanyQuoteTemplate*](#clearcompanyquotetemplate)
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
  - [*BatchApplyQuestionnaireTemplateToProject*](#batchapplyquestionnairetemplatetoproject)
  - [*CreateProjectQuestionnaireQuestion*](#createprojectquestionnairequestion)
  - [*UpdateProjectQuestionnaireQuestion*](#updateprojectquestionnairequestion)
  - [*UpdateProjectQuestionnaireQuestionAnswer*](#updateprojectquestionnairequestionanswer)
  - [*UpdateProjectQuestionnaireQuestionAnswerSource*](#updateprojectquestionnairequestionanswersource)
  - [*DeleteProjectQuestionnaireQuestion*](#deleteprojectquestionnairequestion)
  - [*ReconcileSystemQuoteItemTemplates*](#reconcilesystemquoteitemtemplates)
  - [*CreateQuoteTemplate*](#createquotetemplate)
  - [*RenameQuoteTemplate*](#renamequotetemplate)
  - [*SetQuoteTemplateAsDefault*](#setquotetemplateasdefault)
  - [*DeleteQuoteTemplate*](#deletequotetemplate)
  - [*CreateQuoteTemplateVariation*](#createquotetemplatevariation)
  - [*CreateQuoteItemTemplateConfig*](#createquoteitemtemplateconfig)
  - [*UpdateQuoteItemTemplateConfig*](#updatequoteitemtemplateconfig)
  - [*CreateQuoteItemTemplateWithUnit*](#createquoteitemtemplatewithunit)
  - [*UpdateQuoteItemTemplateWithUnit*](#updatequoteitemtemplatewithunit)
  - [*DeleteQuoteItemTemplate*](#deletequoteitemtemplate)
  - [*UpdateQuoteStatus*](#updatequotestatus)
  - [*UpdateQuoteDetails*](#updatequotedetails)
  - [*UpdateQuoteItem*](#updatequoteitem)
  - [*CreateQuoteItemWithUnit*](#createquoteitemwithunit)
  - [*DeleteQuoteItem*](#deletequoteitem)
  - [*CreateQuoteWithItems*](#createquotewithitems)
  - [*UpsertMyQuoteAppearance*](#upsertmyquoteappearance)
  - [*UpdateMyQuoteAppearanceLogo*](#updatemyquoteappearancelogo)
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
listMyCompanies(vars?: ListMyCompaniesVariables, options?: ExecuteQueryOptions): QueryPromise<ListMyCompaniesData, ListMyCompaniesVariables>;

interface ListMyCompaniesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListMyCompaniesVariables): QueryRef<ListMyCompaniesData, ListMyCompaniesVariables>;
}
export const listMyCompaniesRef: ListMyCompaniesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyCompanies(dc: DataConnect, vars?: ListMyCompaniesVariables, options?: ExecuteQueryOptions): QueryPromise<ListMyCompaniesData, ListMyCompaniesVariables>;

interface ListMyCompaniesRef {
  ...
  (dc: DataConnect, vars?: ListMyCompaniesVariables): QueryRef<ListMyCompaniesData, ListMyCompaniesVariables>;
}
export const listMyCompaniesRef: ListMyCompaniesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyCompaniesRef:
```typescript
const name = listMyCompaniesRef.operationName;
console.log(name);
```

### Variables
The `ListMyCompanies` query has an optional argument of type `ListMyCompaniesVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListMyCompaniesVariables {
  search?: string | null;
  limit?: number | null;
  offset?: number | null;
}
```
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
    quoteTemplateId?: UUIDString | null;
    quoteTemplate?: {
      id: UUIDString;
      name: string;
    } & QuoteTemplate_Key;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Company_Key)[];
}
```
### Using `ListMyCompanies`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyCompanies, ListMyCompaniesVariables } from '@generated/data-connector-web';

// The `ListMyCompanies` query has an optional argument of type `ListMyCompaniesVariables`:
const listMyCompaniesVars: ListMyCompaniesVariables = {
  search: ..., // optional
  limit: ..., // optional
  offset: ..., // optional
};

// Call the `listMyCompanies()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyCompanies(listMyCompaniesVars);
// Variables can be defined inline as well.
const { data } = await listMyCompanies({ search: ..., limit: ..., offset: ..., });
// Since all variables are optional for this query, you can omit the `ListMyCompaniesVariables` argument.
const { data } = await listMyCompanies();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyCompanies(dataConnect, listMyCompaniesVars);

console.log(data.companies);

// Or, you can use the `Promise` API.
listMyCompanies(listMyCompaniesVars).then((response) => {
  const data = response.data;
  console.log(data.companies);
});
```

### Using `ListMyCompanies`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyCompaniesRef, ListMyCompaniesVariables } from '@generated/data-connector-web';

// The `ListMyCompanies` query has an optional argument of type `ListMyCompaniesVariables`:
const listMyCompaniesVars: ListMyCompaniesVariables = {
  search: ..., // optional
  limit: ..., // optional
  offset: ..., // optional
};

// Call the `listMyCompaniesRef()` function to get a reference to the query.
const ref = listMyCompaniesRef(listMyCompaniesVars);
// Variables can be defined inline as well.
const ref = listMyCompaniesRef({ search: ..., limit: ..., offset: ..., });
// Since all variables are optional for this query, you can omit the `ListMyCompaniesVariables` argument.
const ref = listMyCompaniesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyCompaniesRef(dataConnect, listMyCompaniesVars);

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
    quoteTemplateId?: UUIDString | null;
    quoteTemplate?: {
      id: UUIDString;
      name: string;
    } & QuoteTemplate_Key;
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
listProjectQuestionnaires(vars?: ListProjectQuestionnairesVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectQuestionnairesData, ListProjectQuestionnairesVariables>;

interface ListProjectQuestionnairesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListProjectQuestionnairesVariables): QueryRef<ListProjectQuestionnairesData, ListProjectQuestionnairesVariables>;
}
export const listProjectQuestionnairesRef: ListProjectQuestionnairesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProjectQuestionnaires(dc: DataConnect, vars?: ListProjectQuestionnairesVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectQuestionnairesData, ListProjectQuestionnairesVariables>;

interface ListProjectQuestionnairesRef {
  ...
  (dc: DataConnect, vars?: ListProjectQuestionnairesVariables): QueryRef<ListProjectQuestionnairesData, ListProjectQuestionnairesVariables>;
}
export const listProjectQuestionnairesRef: ListProjectQuestionnairesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProjectQuestionnairesRef:
```typescript
const name = listProjectQuestionnairesRef.operationName;
console.log(name);
```

### Variables
The `ListProjectQuestionnaires` query has an optional argument of type `ListProjectQuestionnairesVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListProjectQuestionnairesVariables {
  limit?: number | null;
  offset?: number | null;
}
```
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
import { connectorConfig, listProjectQuestionnaires, ListProjectQuestionnairesVariables } from '@generated/data-connector-web';

// The `ListProjectQuestionnaires` query has an optional argument of type `ListProjectQuestionnairesVariables`:
const listProjectQuestionnairesVars: ListProjectQuestionnairesVariables = {
  limit: ..., // optional
  offset: ..., // optional
};

// Call the `listProjectQuestionnaires()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProjectQuestionnaires(listProjectQuestionnairesVars);
// Variables can be defined inline as well.
const { data } = await listProjectQuestionnaires({ limit: ..., offset: ..., });
// Since all variables are optional for this query, you can omit the `ListProjectQuestionnairesVariables` argument.
const { data } = await listProjectQuestionnaires();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProjectQuestionnaires(dataConnect, listProjectQuestionnairesVars);

console.log(data.projectQuestionnaires);

// Or, you can use the `Promise` API.
listProjectQuestionnaires(listProjectQuestionnairesVars).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaires);
});
```

### Using `ListProjectQuestionnaires`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProjectQuestionnairesRef, ListProjectQuestionnairesVariables } from '@generated/data-connector-web';

// The `ListProjectQuestionnaires` query has an optional argument of type `ListProjectQuestionnairesVariables`:
const listProjectQuestionnairesVars: ListProjectQuestionnairesVariables = {
  limit: ..., // optional
  offset: ..., // optional
};

// Call the `listProjectQuestionnairesRef()` function to get a reference to the query.
const ref = listProjectQuestionnairesRef(listProjectQuestionnairesVars);
// Variables can be defined inline as well.
const ref = listProjectQuestionnairesRef({ limit: ..., offset: ..., });
// Since all variables are optional for this query, you can omit the `ListProjectQuestionnairesVariables` argument.
const ref = listProjectQuestionnairesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProjectQuestionnairesRef(dataConnect, listProjectQuestionnairesVars);

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
    unit?: string | null;
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
    isDefault: boolean;
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

## GetMyQuoteAppearance
You can execute the `GetMyQuoteAppearance` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
getMyQuoteAppearance(options?: ExecuteQueryOptions): QueryPromise<GetMyQuoteAppearanceData, undefined>;

interface GetMyQuoteAppearanceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyQuoteAppearanceData, undefined>;
}
export const getMyQuoteAppearanceRef: GetMyQuoteAppearanceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyQuoteAppearance(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyQuoteAppearanceData, undefined>;

interface GetMyQuoteAppearanceRef {
  ...
  (dc: DataConnect): QueryRef<GetMyQuoteAppearanceData, undefined>;
}
export const getMyQuoteAppearanceRef: GetMyQuoteAppearanceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyQuoteAppearanceRef:
```typescript
const name = getMyQuoteAppearanceRef.operationName;
console.log(name);
```

### Variables
The `GetMyQuoteAppearance` query has no variables.
### Return Type
Recall that executing the `GetMyQuoteAppearance` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyQuoteAppearanceData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyQuoteAppearanceData {
  quoteAppearances: ({
    teamId: string;
    logoStoragePath?: string | null;
    businessName?: string | null;
    abn?: string | null;
    licenceNumber?: string | null;
    address?: string | null;
    phoneNumber?: string | null;
    email?: string | null;
    accentColor?: string | null;
    pricingDetail: string;
    showScopeOfWork: boolean;
    showTakeoffSummary: boolean;
    showSignatureBlock: boolean;
    validForDays: number;
    terms?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & QuoteAppearance_Key)[];
}
```
### Using `GetMyQuoteAppearance`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyQuoteAppearance } from '@generated/data-connector-web';


// Call the `getMyQuoteAppearance()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyQuoteAppearance();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyQuoteAppearance(dataConnect);

console.log(data.quoteAppearances);

// Or, you can use the `Promise` API.
getMyQuoteAppearance().then((response) => {
  const data = response.data;
  console.log(data.quoteAppearances);
});
```

### Using `GetMyQuoteAppearance`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyQuoteAppearanceRef } from '@generated/data-connector-web';


// Call the `getMyQuoteAppearanceRef()` function to get a reference to the query.
const ref = getMyQuoteAppearanceRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyQuoteAppearanceRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quoteAppearances);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteAppearances);
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
      unit?: string | null;
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
listQuotesForTeam(vars?: ListQuotesForTeamVariables, options?: ExecuteQueryOptions): QueryPromise<ListQuotesForTeamData, ListQuotesForTeamVariables>;

interface ListQuotesForTeamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListQuotesForTeamVariables): QueryRef<ListQuotesForTeamData, ListQuotesForTeamVariables>;
}
export const listQuotesForTeamRef: ListQuotesForTeamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listQuotesForTeam(dc: DataConnect, vars?: ListQuotesForTeamVariables, options?: ExecuteQueryOptions): QueryPromise<ListQuotesForTeamData, ListQuotesForTeamVariables>;

interface ListQuotesForTeamRef {
  ...
  (dc: DataConnect, vars?: ListQuotesForTeamVariables): QueryRef<ListQuotesForTeamData, ListQuotesForTeamVariables>;
}
export const listQuotesForTeamRef: ListQuotesForTeamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listQuotesForTeamRef:
```typescript
const name = listQuotesForTeamRef.operationName;
console.log(name);
```

### Variables
The `ListQuotesForTeam` query has an optional argument of type `ListQuotesForTeamVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListQuotesForTeamVariables {
  limit?: number | null;
  offset?: number | null;
}
```
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
import { connectorConfig, listQuotesForTeam, ListQuotesForTeamVariables } from '@generated/data-connector-web';

// The `ListQuotesForTeam` query has an optional argument of type `ListQuotesForTeamVariables`:
const listQuotesForTeamVars: ListQuotesForTeamVariables = {
  limit: ..., // optional
  offset: ..., // optional
};

// Call the `listQuotesForTeam()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listQuotesForTeam(listQuotesForTeamVars);
// Variables can be defined inline as well.
const { data } = await listQuotesForTeam({ limit: ..., offset: ..., });
// Since all variables are optional for this query, you can omit the `ListQuotesForTeamVariables` argument.
const { data } = await listQuotesForTeam();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listQuotesForTeam(dataConnect, listQuotesForTeamVars);

console.log(data.quotes);

// Or, you can use the `Promise` API.
listQuotesForTeam(listQuotesForTeamVars).then((response) => {
  const data = response.data;
  console.log(data.quotes);
});
```

### Using `ListQuotesForTeam`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listQuotesForTeamRef, ListQuotesForTeamVariables } from '@generated/data-connector-web';

// The `ListQuotesForTeam` query has an optional argument of type `ListQuotesForTeamVariables`:
const listQuotesForTeamVars: ListQuotesForTeamVariables = {
  limit: ..., // optional
  offset: ..., // optional
};

// Call the `listQuotesForTeamRef()` function to get a reference to the query.
const ref = listQuotesForTeamRef(listQuotesForTeamVars);
// Variables can be defined inline as well.
const ref = listQuotesForTeamRef({ limit: ..., offset: ..., });
// Since all variables are optional for this query, you can omit the `ListQuotesForTeamVariables` argument.
const ref = listQuotesForTeamRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listQuotesForTeamRef(dataConnect, listQuotesForTeamVars);

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
      unit?: string | null;
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
  appearance: ({
    teamId: string;
    logoStoragePath?: string | null;
    businessName?: string | null;
    abn?: string | null;
    licenceNumber?: string | null;
    address?: string | null;
    phoneNumber?: string | null;
    email?: string | null;
    accentColor?: string | null;
    pricingDetail: string;
    showScopeOfWork: boolean;
    showTakeoffSummary: boolean;
    showSignatureBlock: boolean;
    validForDays: number;
    terms?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & QuoteAppearance_Key)[];
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
console.log(data.appearance);

// Or, you can use the `Promise` API.
getQuoteById(getQuoteByIdVars).then((response) => {
  const data = response.data;
  console.log(data.quote);
  console.log(data.appearance);
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
console.log(data.appearance);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quote);
  console.log(data.appearance);
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
  quoteTemplateId: UUIDString;
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
    extractedTextJson?: string | null;
    company?: {
      id: UUIDString;
      quoteTemplateId?: UUIDString | null;
      companyName: string;
      phoneNumber?: string | null;
      businessNumber?: string | null;
      primaryContactId?: UUIDString | null;
      primaryContact?: {
        id: UUIDString;
        name: string;
        email?: string | null;
        phoneNumber?: string | null;
      } & CompanyContact_Key;
    } & Company_Key;
  } & Project_Key;
  floorplanPages: ({
    id: UUIDString;
    pageNumber: number;
    scaleMmPerPx?: number | null;
    ceilingHeightMm?: number | null;
    overlayJson?: string | null;
    ocrTextContent?: string | null;
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
      unit?: string | null;
      hasKeywords: boolean;
      keywords: string[];
      sortOrder: number;
      quantitySourceId?: UUIDString | null;
      quantitySource?: {
        id: UUIDString;
        measurementSource: string;
        measurementPlasterType?: string | null;
      } & QuantitySource_Key;
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
  quoteTemplateId: ..., 
};

// Call the `getQuoteReadiness()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getQuoteReadiness(getQuoteReadinessVars);
// Variables can be defined inline as well.
const { data } = await getQuoteReadiness({ projectId: ..., quoteTemplateId: ..., });

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
  quoteTemplateId: ..., 
};

// Call the `getQuoteReadinessRef()` function to get a reference to the query.
const ref = getQuoteReadinessRef(getQuoteReadinessVars);
// Variables can be defined inline as well.
const ref = getQuoteReadinessRef({ projectId: ..., quoteTemplateId: ..., });

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

## GetProjectQuote
You can execute the `GetProjectQuote` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
getProjectQuote(vars: GetProjectQuoteVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectQuoteData, GetProjectQuoteVariables>;

interface GetProjectQuoteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProjectQuoteVariables): QueryRef<GetProjectQuoteData, GetProjectQuoteVariables>;
}
export const getProjectQuoteRef: GetProjectQuoteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getProjectQuote(dc: DataConnect, vars: GetProjectQuoteVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectQuoteData, GetProjectQuoteVariables>;

interface GetProjectQuoteRef {
  ...
  (dc: DataConnect, vars: GetProjectQuoteVariables): QueryRef<GetProjectQuoteData, GetProjectQuoteVariables>;
}
export const getProjectQuoteRef: GetProjectQuoteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getProjectQuoteRef:
```typescript
const name = getProjectQuoteRef.operationName;
console.log(name);
```

### Variables
The `GetProjectQuote` query requires an argument of type `GetProjectQuoteVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetProjectQuoteVariables {
  projectId: UUIDString;
}
```
### Return Type
Recall that executing the `GetProjectQuote` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetProjectQuoteData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetProjectQuoteData {
  project?: {
    id: UUIDString;
    teamId: string;
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
      items: ({
        id: UUIDString;
        displayOrder: number;
        name: string;
        quantity: number;
        unit?: string | null;
        unitPriceCents: number;
        materialUnitPriceCents: number;
        labourUnitPriceCents: number;
        matchedKeywords: string[];
        sourceTemplateId?: UUIDString | null;
        quantitySourceId?: UUIDString | null;
        sourceTemplate?: {
          id: UUIDString;
          name: string;
          scope: string;
          systemKey?: string | null;
        } & QuoteItemTemplate_Key;
        quantitySource?: {
          id: UUIDString;
          measurementSource: string;
          measurementPlasterType?: string | null;
        } & QuantitySource_Key;
        createdAt: TimestampString;
        updatedAt: TimestampString;
      } & QuoteItem_Key)[];
    } & Quote_Key;
  } & Project_Key;
  appearance: ({
    teamId: string;
    logoStoragePath?: string | null;
    businessName?: string | null;
    abn?: string | null;
    licenceNumber?: string | null;
    address?: string | null;
    phoneNumber?: string | null;
    email?: string | null;
    accentColor?: string | null;
    pricingDetail: string;
    showScopeOfWork: boolean;
    showTakeoffSummary: boolean;
    showSignatureBlock: boolean;
    validForDays: number;
    terms?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & QuoteAppearance_Key)[];
}
```
### Using `GetProjectQuote`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getProjectQuote, GetProjectQuoteVariables } from '@generated/data-connector-web';

// The `GetProjectQuote` query requires an argument of type `GetProjectQuoteVariables`:
const getProjectQuoteVars: GetProjectQuoteVariables = {
  projectId: ..., 
};

// Call the `getProjectQuote()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getProjectQuote(getProjectQuoteVars);
// Variables can be defined inline as well.
const { data } = await getProjectQuote({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getProjectQuote(dataConnect, getProjectQuoteVars);

console.log(data.project);
console.log(data.appearance);

// Or, you can use the `Promise` API.
getProjectQuote(getProjectQuoteVars).then((response) => {
  const data = response.data;
  console.log(data.project);
  console.log(data.appearance);
});
```

### Using `GetProjectQuote`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getProjectQuoteRef, GetProjectQuoteVariables } from '@generated/data-connector-web';

// The `GetProjectQuote` query requires an argument of type `GetProjectQuoteVariables`:
const getProjectQuoteVars: GetProjectQuoteVariables = {
  projectId: ..., 
};

// Call the `getProjectQuoteRef()` function to get a reference to the query.
const ref = getProjectQuoteRef(getProjectQuoteVars);
// Variables can be defined inline as well.
const ref = getProjectQuoteRef({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getProjectQuoteRef(dataConnect, getProjectQuoteVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.project);
console.log(data.appearance);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.project);
  console.log(data.appearance);
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

## AssignQuoteTemplateToCompany
You can execute the `AssignQuoteTemplateToCompany` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
assignQuoteTemplateToCompany(vars: AssignQuoteTemplateToCompanyVariables): MutationPromise<AssignQuoteTemplateToCompanyData, AssignQuoteTemplateToCompanyVariables>;

interface AssignQuoteTemplateToCompanyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignQuoteTemplateToCompanyVariables): MutationRef<AssignQuoteTemplateToCompanyData, AssignQuoteTemplateToCompanyVariables>;
}
export const assignQuoteTemplateToCompanyRef: AssignQuoteTemplateToCompanyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
assignQuoteTemplateToCompany(dc: DataConnect, vars: AssignQuoteTemplateToCompanyVariables): MutationPromise<AssignQuoteTemplateToCompanyData, AssignQuoteTemplateToCompanyVariables>;

interface AssignQuoteTemplateToCompanyRef {
  ...
  (dc: DataConnect, vars: AssignQuoteTemplateToCompanyVariables): MutationRef<AssignQuoteTemplateToCompanyData, AssignQuoteTemplateToCompanyVariables>;
}
export const assignQuoteTemplateToCompanyRef: AssignQuoteTemplateToCompanyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the assignQuoteTemplateToCompanyRef:
```typescript
const name = assignQuoteTemplateToCompanyRef.operationName;
console.log(name);
```

### Variables
The `AssignQuoteTemplateToCompany` mutation requires an argument of type `AssignQuoteTemplateToCompanyVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AssignQuoteTemplateToCompanyVariables {
  companyId: UUIDString;
  quoteTemplateId: UUIDString;
}
```
### Return Type
Recall that executing the `AssignQuoteTemplateToCompany` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AssignQuoteTemplateToCompanyData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AssignQuoteTemplateToCompanyData {
  company_update?: Company_Key | null;
}
```
### Using `AssignQuoteTemplateToCompany`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, assignQuoteTemplateToCompany, AssignQuoteTemplateToCompanyVariables } from '@generated/data-connector-web';

// The `AssignQuoteTemplateToCompany` mutation requires an argument of type `AssignQuoteTemplateToCompanyVariables`:
const assignQuoteTemplateToCompanyVars: AssignQuoteTemplateToCompanyVariables = {
  companyId: ..., 
  quoteTemplateId: ..., 
};

// Call the `assignQuoteTemplateToCompany()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await assignQuoteTemplateToCompany(assignQuoteTemplateToCompanyVars);
// Variables can be defined inline as well.
const { data } = await assignQuoteTemplateToCompany({ companyId: ..., quoteTemplateId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await assignQuoteTemplateToCompany(dataConnect, assignQuoteTemplateToCompanyVars);

console.log(data.company_update);

// Or, you can use the `Promise` API.
assignQuoteTemplateToCompany(assignQuoteTemplateToCompanyVars).then((response) => {
  const data = response.data;
  console.log(data.company_update);
});
```

### Using `AssignQuoteTemplateToCompany`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, assignQuoteTemplateToCompanyRef, AssignQuoteTemplateToCompanyVariables } from '@generated/data-connector-web';

// The `AssignQuoteTemplateToCompany` mutation requires an argument of type `AssignQuoteTemplateToCompanyVariables`:
const assignQuoteTemplateToCompanyVars: AssignQuoteTemplateToCompanyVariables = {
  companyId: ..., 
  quoteTemplateId: ..., 
};

// Call the `assignQuoteTemplateToCompanyRef()` function to get a reference to the mutation.
const ref = assignQuoteTemplateToCompanyRef(assignQuoteTemplateToCompanyVars);
// Variables can be defined inline as well.
const ref = assignQuoteTemplateToCompanyRef({ companyId: ..., quoteTemplateId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = assignQuoteTemplateToCompanyRef(dataConnect, assignQuoteTemplateToCompanyVars);

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

## ClearCompanyQuoteTemplate
You can execute the `ClearCompanyQuoteTemplate` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
clearCompanyQuoteTemplate(vars: ClearCompanyQuoteTemplateVariables): MutationPromise<ClearCompanyQuoteTemplateData, ClearCompanyQuoteTemplateVariables>;

interface ClearCompanyQuoteTemplateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ClearCompanyQuoteTemplateVariables): MutationRef<ClearCompanyQuoteTemplateData, ClearCompanyQuoteTemplateVariables>;
}
export const clearCompanyQuoteTemplateRef: ClearCompanyQuoteTemplateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
clearCompanyQuoteTemplate(dc: DataConnect, vars: ClearCompanyQuoteTemplateVariables): MutationPromise<ClearCompanyQuoteTemplateData, ClearCompanyQuoteTemplateVariables>;

interface ClearCompanyQuoteTemplateRef {
  ...
  (dc: DataConnect, vars: ClearCompanyQuoteTemplateVariables): MutationRef<ClearCompanyQuoteTemplateData, ClearCompanyQuoteTemplateVariables>;
}
export const clearCompanyQuoteTemplateRef: ClearCompanyQuoteTemplateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the clearCompanyQuoteTemplateRef:
```typescript
const name = clearCompanyQuoteTemplateRef.operationName;
console.log(name);
```

### Variables
The `ClearCompanyQuoteTemplate` mutation requires an argument of type `ClearCompanyQuoteTemplateVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ClearCompanyQuoteTemplateVariables {
  companyId: UUIDString;
}
```
### Return Type
Recall that executing the `ClearCompanyQuoteTemplate` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ClearCompanyQuoteTemplateData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ClearCompanyQuoteTemplateData {
  company_update?: Company_Key | null;
}
```
### Using `ClearCompanyQuoteTemplate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, clearCompanyQuoteTemplate, ClearCompanyQuoteTemplateVariables } from '@generated/data-connector-web';

// The `ClearCompanyQuoteTemplate` mutation requires an argument of type `ClearCompanyQuoteTemplateVariables`:
const clearCompanyQuoteTemplateVars: ClearCompanyQuoteTemplateVariables = {
  companyId: ..., 
};

// Call the `clearCompanyQuoteTemplate()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await clearCompanyQuoteTemplate(clearCompanyQuoteTemplateVars);
// Variables can be defined inline as well.
const { data } = await clearCompanyQuoteTemplate({ companyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await clearCompanyQuoteTemplate(dataConnect, clearCompanyQuoteTemplateVars);

console.log(data.company_update);

// Or, you can use the `Promise` API.
clearCompanyQuoteTemplate(clearCompanyQuoteTemplateVars).then((response) => {
  const data = response.data;
  console.log(data.company_update);
});
```

### Using `ClearCompanyQuoteTemplate`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, clearCompanyQuoteTemplateRef, ClearCompanyQuoteTemplateVariables } from '@generated/data-connector-web';

// The `ClearCompanyQuoteTemplate` mutation requires an argument of type `ClearCompanyQuoteTemplateVariables`:
const clearCompanyQuoteTemplateVars: ClearCompanyQuoteTemplateVariables = {
  companyId: ..., 
};

// Call the `clearCompanyQuoteTemplateRef()` function to get a reference to the mutation.
const ref = clearCompanyQuoteTemplateRef(clearCompanyQuoteTemplateVars);
// Variables can be defined inline as well.
const ref = clearCompanyQuoteTemplateRef({ companyId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = clearCompanyQuoteTemplateRef(dataConnect, clearCompanyQuoteTemplateVars);

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

## BatchApplyQuestionnaireTemplateToProject
You can execute the `BatchApplyQuestionnaireTemplateToProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
batchApplyQuestionnaireTemplateToProject(vars: BatchApplyQuestionnaireTemplateToProjectVariables): MutationPromise<BatchApplyQuestionnaireTemplateToProjectData, BatchApplyQuestionnaireTemplateToProjectVariables>;

interface BatchApplyQuestionnaireTemplateToProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: BatchApplyQuestionnaireTemplateToProjectVariables): MutationRef<BatchApplyQuestionnaireTemplateToProjectData, BatchApplyQuestionnaireTemplateToProjectVariables>;
}
export const batchApplyQuestionnaireTemplateToProjectRef: BatchApplyQuestionnaireTemplateToProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
batchApplyQuestionnaireTemplateToProject(dc: DataConnect, vars: BatchApplyQuestionnaireTemplateToProjectVariables): MutationPromise<BatchApplyQuestionnaireTemplateToProjectData, BatchApplyQuestionnaireTemplateToProjectVariables>;

interface BatchApplyQuestionnaireTemplateToProjectRef {
  ...
  (dc: DataConnect, vars: BatchApplyQuestionnaireTemplateToProjectVariables): MutationRef<BatchApplyQuestionnaireTemplateToProjectData, BatchApplyQuestionnaireTemplateToProjectVariables>;
}
export const batchApplyQuestionnaireTemplateToProjectRef: BatchApplyQuestionnaireTemplateToProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the batchApplyQuestionnaireTemplateToProjectRef:
```typescript
const name = batchApplyQuestionnaireTemplateToProjectRef.operationName;
console.log(name);
```

### Variables
The `BatchApplyQuestionnaireTemplateToProject` mutation requires an argument of type `BatchApplyQuestionnaireTemplateToProjectVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface BatchApplyQuestionnaireTemplateToProjectVariables {
  projectId: UUIDString;
  sourceTemplateId: UUIDString;
  includeQuestion1?: boolean | null;
  question1Label?: string | null;
  question1Position?: number | null;
  includeQuestion2?: boolean | null;
  question2Label?: string | null;
  question2Position?: number | null;
  includeQuestion3?: boolean | null;
  question3Label?: string | null;
  question3Position?: number | null;
  includeQuestion4?: boolean | null;
  question4Label?: string | null;
  question4Position?: number | null;
  includeQuestion5?: boolean | null;
  question5Label?: string | null;
  question5Position?: number | null;
  includeQuestion6?: boolean | null;
  question6Label?: string | null;
  question6Position?: number | null;
  includeQuestion7?: boolean | null;
  question7Label?: string | null;
  question7Position?: number | null;
  includeQuestion8?: boolean | null;
  question8Label?: string | null;
  question8Position?: number | null;
  includeQuestion9?: boolean | null;
  question9Label?: string | null;
  question9Position?: number | null;
  includeQuestion10?: boolean | null;
  question10Label?: string | null;
  question10Position?: number | null;
  includeQuestion11?: boolean | null;
  question11Label?: string | null;
  question11Position?: number | null;
  includeQuestion12?: boolean | null;
  question12Label?: string | null;
  question12Position?: number | null;
  includeQuestion13?: boolean | null;
  question13Label?: string | null;
  question13Position?: number | null;
  includeQuestion14?: boolean | null;
  question14Label?: string | null;
  question14Position?: number | null;
  includeQuestion15?: boolean | null;
  question15Label?: string | null;
  question15Position?: number | null;
  includeQuestion16?: boolean | null;
  question16Label?: string | null;
  question16Position?: number | null;
  includeQuestion17?: boolean | null;
  question17Label?: string | null;
  question17Position?: number | null;
  includeQuestion18?: boolean | null;
  question18Label?: string | null;
  question18Position?: number | null;
  includeQuestion19?: boolean | null;
  question19Label?: string | null;
  question19Position?: number | null;
  includeQuestion20?: boolean | null;
  question20Label?: string | null;
  question20Position?: number | null;
}
```
### Return Type
Recall that executing the `BatchApplyQuestionnaireTemplateToProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `BatchApplyQuestionnaireTemplateToProjectData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface BatchApplyQuestionnaireTemplateToProjectData {
  projectQuestionnaire_upsert: ProjectQuestionnaire_Key;
  question1: ProjectQuestionnaireQuestion_Key;
  question2: ProjectQuestionnaireQuestion_Key;
  question3: ProjectQuestionnaireQuestion_Key;
  question4: ProjectQuestionnaireQuestion_Key;
  question5: ProjectQuestionnaireQuestion_Key;
  question6: ProjectQuestionnaireQuestion_Key;
  question7: ProjectQuestionnaireQuestion_Key;
  question8: ProjectQuestionnaireQuestion_Key;
  question9: ProjectQuestionnaireQuestion_Key;
  question10: ProjectQuestionnaireQuestion_Key;
  question11: ProjectQuestionnaireQuestion_Key;
  question12: ProjectQuestionnaireQuestion_Key;
  question13: ProjectQuestionnaireQuestion_Key;
  question14: ProjectQuestionnaireQuestion_Key;
  question15: ProjectQuestionnaireQuestion_Key;
  question16: ProjectQuestionnaireQuestion_Key;
  question17: ProjectQuestionnaireQuestion_Key;
  question18: ProjectQuestionnaireQuestion_Key;
  question19: ProjectQuestionnaireQuestion_Key;
  question20: ProjectQuestionnaireQuestion_Key;
}
```
### Using `BatchApplyQuestionnaireTemplateToProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, batchApplyQuestionnaireTemplateToProject, BatchApplyQuestionnaireTemplateToProjectVariables } from '@generated/data-connector-web';

// The `BatchApplyQuestionnaireTemplateToProject` mutation requires an argument of type `BatchApplyQuestionnaireTemplateToProjectVariables`:
const batchApplyQuestionnaireTemplateToProjectVars: BatchApplyQuestionnaireTemplateToProjectVariables = {
  projectId: ..., 
  sourceTemplateId: ..., 
  includeQuestion1: ..., // optional
  question1Label: ..., // optional
  question1Position: ..., // optional
  includeQuestion2: ..., // optional
  question2Label: ..., // optional
  question2Position: ..., // optional
  includeQuestion3: ..., // optional
  question3Label: ..., // optional
  question3Position: ..., // optional
  includeQuestion4: ..., // optional
  question4Label: ..., // optional
  question4Position: ..., // optional
  includeQuestion5: ..., // optional
  question5Label: ..., // optional
  question5Position: ..., // optional
  includeQuestion6: ..., // optional
  question6Label: ..., // optional
  question6Position: ..., // optional
  includeQuestion7: ..., // optional
  question7Label: ..., // optional
  question7Position: ..., // optional
  includeQuestion8: ..., // optional
  question8Label: ..., // optional
  question8Position: ..., // optional
  includeQuestion9: ..., // optional
  question9Label: ..., // optional
  question9Position: ..., // optional
  includeQuestion10: ..., // optional
  question10Label: ..., // optional
  question10Position: ..., // optional
  includeQuestion11: ..., // optional
  question11Label: ..., // optional
  question11Position: ..., // optional
  includeQuestion12: ..., // optional
  question12Label: ..., // optional
  question12Position: ..., // optional
  includeQuestion13: ..., // optional
  question13Label: ..., // optional
  question13Position: ..., // optional
  includeQuestion14: ..., // optional
  question14Label: ..., // optional
  question14Position: ..., // optional
  includeQuestion15: ..., // optional
  question15Label: ..., // optional
  question15Position: ..., // optional
  includeQuestion16: ..., // optional
  question16Label: ..., // optional
  question16Position: ..., // optional
  includeQuestion17: ..., // optional
  question17Label: ..., // optional
  question17Position: ..., // optional
  includeQuestion18: ..., // optional
  question18Label: ..., // optional
  question18Position: ..., // optional
  includeQuestion19: ..., // optional
  question19Label: ..., // optional
  question19Position: ..., // optional
  includeQuestion20: ..., // optional
  question20Label: ..., // optional
  question20Position: ..., // optional
};

// Call the `batchApplyQuestionnaireTemplateToProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await batchApplyQuestionnaireTemplateToProject(batchApplyQuestionnaireTemplateToProjectVars);
// Variables can be defined inline as well.
const { data } = await batchApplyQuestionnaireTemplateToProject({ projectId: ..., sourceTemplateId: ..., includeQuestion1: ..., question1Label: ..., question1Position: ..., includeQuestion2: ..., question2Label: ..., question2Position: ..., includeQuestion3: ..., question3Label: ..., question3Position: ..., includeQuestion4: ..., question4Label: ..., question4Position: ..., includeQuestion5: ..., question5Label: ..., question5Position: ..., includeQuestion6: ..., question6Label: ..., question6Position: ..., includeQuestion7: ..., question7Label: ..., question7Position: ..., includeQuestion8: ..., question8Label: ..., question8Position: ..., includeQuestion9: ..., question9Label: ..., question9Position: ..., includeQuestion10: ..., question10Label: ..., question10Position: ..., includeQuestion11: ..., question11Label: ..., question11Position: ..., includeQuestion12: ..., question12Label: ..., question12Position: ..., includeQuestion13: ..., question13Label: ..., question13Position: ..., includeQuestion14: ..., question14Label: ..., question14Position: ..., includeQuestion15: ..., question15Label: ..., question15Position: ..., includeQuestion16: ..., question16Label: ..., question16Position: ..., includeQuestion17: ..., question17Label: ..., question17Position: ..., includeQuestion18: ..., question18Label: ..., question18Position: ..., includeQuestion19: ..., question19Label: ..., question19Position: ..., includeQuestion20: ..., question20Label: ..., question20Position: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await batchApplyQuestionnaireTemplateToProject(dataConnect, batchApplyQuestionnaireTemplateToProjectVars);

console.log(data.projectQuestionnaire_upsert);
console.log(data.question1);
console.log(data.question2);
console.log(data.question3);
console.log(data.question4);
console.log(data.question5);
console.log(data.question6);
console.log(data.question7);
console.log(data.question8);
console.log(data.question9);
console.log(data.question10);
console.log(data.question11);
console.log(data.question12);
console.log(data.question13);
console.log(data.question14);
console.log(data.question15);
console.log(data.question16);
console.log(data.question17);
console.log(data.question18);
console.log(data.question19);
console.log(data.question20);

// Or, you can use the `Promise` API.
batchApplyQuestionnaireTemplateToProject(batchApplyQuestionnaireTemplateToProjectVars).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaire_upsert);
  console.log(data.question1);
  console.log(data.question2);
  console.log(data.question3);
  console.log(data.question4);
  console.log(data.question5);
  console.log(data.question6);
  console.log(data.question7);
  console.log(data.question8);
  console.log(data.question9);
  console.log(data.question10);
  console.log(data.question11);
  console.log(data.question12);
  console.log(data.question13);
  console.log(data.question14);
  console.log(data.question15);
  console.log(data.question16);
  console.log(data.question17);
  console.log(data.question18);
  console.log(data.question19);
  console.log(data.question20);
});
```

### Using `BatchApplyQuestionnaireTemplateToProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, batchApplyQuestionnaireTemplateToProjectRef, BatchApplyQuestionnaireTemplateToProjectVariables } from '@generated/data-connector-web';

// The `BatchApplyQuestionnaireTemplateToProject` mutation requires an argument of type `BatchApplyQuestionnaireTemplateToProjectVariables`:
const batchApplyQuestionnaireTemplateToProjectVars: BatchApplyQuestionnaireTemplateToProjectVariables = {
  projectId: ..., 
  sourceTemplateId: ..., 
  includeQuestion1: ..., // optional
  question1Label: ..., // optional
  question1Position: ..., // optional
  includeQuestion2: ..., // optional
  question2Label: ..., // optional
  question2Position: ..., // optional
  includeQuestion3: ..., // optional
  question3Label: ..., // optional
  question3Position: ..., // optional
  includeQuestion4: ..., // optional
  question4Label: ..., // optional
  question4Position: ..., // optional
  includeQuestion5: ..., // optional
  question5Label: ..., // optional
  question5Position: ..., // optional
  includeQuestion6: ..., // optional
  question6Label: ..., // optional
  question6Position: ..., // optional
  includeQuestion7: ..., // optional
  question7Label: ..., // optional
  question7Position: ..., // optional
  includeQuestion8: ..., // optional
  question8Label: ..., // optional
  question8Position: ..., // optional
  includeQuestion9: ..., // optional
  question9Label: ..., // optional
  question9Position: ..., // optional
  includeQuestion10: ..., // optional
  question10Label: ..., // optional
  question10Position: ..., // optional
  includeQuestion11: ..., // optional
  question11Label: ..., // optional
  question11Position: ..., // optional
  includeQuestion12: ..., // optional
  question12Label: ..., // optional
  question12Position: ..., // optional
  includeQuestion13: ..., // optional
  question13Label: ..., // optional
  question13Position: ..., // optional
  includeQuestion14: ..., // optional
  question14Label: ..., // optional
  question14Position: ..., // optional
  includeQuestion15: ..., // optional
  question15Label: ..., // optional
  question15Position: ..., // optional
  includeQuestion16: ..., // optional
  question16Label: ..., // optional
  question16Position: ..., // optional
  includeQuestion17: ..., // optional
  question17Label: ..., // optional
  question17Position: ..., // optional
  includeQuestion18: ..., // optional
  question18Label: ..., // optional
  question18Position: ..., // optional
  includeQuestion19: ..., // optional
  question19Label: ..., // optional
  question19Position: ..., // optional
  includeQuestion20: ..., // optional
  question20Label: ..., // optional
  question20Position: ..., // optional
};

// Call the `batchApplyQuestionnaireTemplateToProjectRef()` function to get a reference to the mutation.
const ref = batchApplyQuestionnaireTemplateToProjectRef(batchApplyQuestionnaireTemplateToProjectVars);
// Variables can be defined inline as well.
const ref = batchApplyQuestionnaireTemplateToProjectRef({ projectId: ..., sourceTemplateId: ..., includeQuestion1: ..., question1Label: ..., question1Position: ..., includeQuestion2: ..., question2Label: ..., question2Position: ..., includeQuestion3: ..., question3Label: ..., question3Position: ..., includeQuestion4: ..., question4Label: ..., question4Position: ..., includeQuestion5: ..., question5Label: ..., question5Position: ..., includeQuestion6: ..., question6Label: ..., question6Position: ..., includeQuestion7: ..., question7Label: ..., question7Position: ..., includeQuestion8: ..., question8Label: ..., question8Position: ..., includeQuestion9: ..., question9Label: ..., question9Position: ..., includeQuestion10: ..., question10Label: ..., question10Position: ..., includeQuestion11: ..., question11Label: ..., question11Position: ..., includeQuestion12: ..., question12Label: ..., question12Position: ..., includeQuestion13: ..., question13Label: ..., question13Position: ..., includeQuestion14: ..., question14Label: ..., question14Position: ..., includeQuestion15: ..., question15Label: ..., question15Position: ..., includeQuestion16: ..., question16Label: ..., question16Position: ..., includeQuestion17: ..., question17Label: ..., question17Position: ..., includeQuestion18: ..., question18Label: ..., question18Position: ..., includeQuestion19: ..., question19Label: ..., question19Position: ..., includeQuestion20: ..., question20Label: ..., question20Position: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = batchApplyQuestionnaireTemplateToProjectRef(dataConnect, batchApplyQuestionnaireTemplateToProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.projectQuestionnaire_upsert);
console.log(data.question1);
console.log(data.question2);
console.log(data.question3);
console.log(data.question4);
console.log(data.question5);
console.log(data.question6);
console.log(data.question7);
console.log(data.question8);
console.log(data.question9);
console.log(data.question10);
console.log(data.question11);
console.log(data.question12);
console.log(data.question13);
console.log(data.question14);
console.log(data.question15);
console.log(data.question16);
console.log(data.question17);
console.log(data.question18);
console.log(data.question19);
console.log(data.question20);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaire_upsert);
  console.log(data.question1);
  console.log(data.question2);
  console.log(data.question3);
  console.log(data.question4);
  console.log(data.question5);
  console.log(data.question6);
  console.log(data.question7);
  console.log(data.question8);
  console.log(data.question9);
  console.log(data.question10);
  console.log(data.question11);
  console.log(data.question12);
  console.log(data.question13);
  console.log(data.question14);
  console.log(data.question15);
  console.log(data.question16);
  console.log(data.question17);
  console.log(data.question18);
  console.log(data.question19);
  console.log(data.question20);
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

## ReconcileSystemQuoteItemTemplates
You can execute the `ReconcileSystemQuoteItemTemplates` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
reconcileSystemQuoteItemTemplates(): MutationPromise<ReconcileSystemQuoteItemTemplatesData, undefined>;

interface ReconcileSystemQuoteItemTemplatesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<ReconcileSystemQuoteItemTemplatesData, undefined>;
}
export const reconcileSystemQuoteItemTemplatesRef: ReconcileSystemQuoteItemTemplatesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
reconcileSystemQuoteItemTemplates(dc: DataConnect): MutationPromise<ReconcileSystemQuoteItemTemplatesData, undefined>;

interface ReconcileSystemQuoteItemTemplatesRef {
  ...
  (dc: DataConnect): MutationRef<ReconcileSystemQuoteItemTemplatesData, undefined>;
}
export const reconcileSystemQuoteItemTemplatesRef: ReconcileSystemQuoteItemTemplatesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the reconcileSystemQuoteItemTemplatesRef:
```typescript
const name = reconcileSystemQuoteItemTemplatesRef.operationName;
console.log(name);
```

### Variables
The `ReconcileSystemQuoteItemTemplates` mutation has no variables.
### Return Type
Recall that executing the `ReconcileSystemQuoteItemTemplates` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReconcileSystemQuoteItemTemplatesData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReconcileSystemQuoteItemTemplatesData {
  quoteItemTemplateConfig_deleteMany: number;
  quoteItemTemplate_deleteMany: number;
  plasterboard10mmSource: QuantitySource_Key;
  plasterboard13mmSource: QuantitySource_Key;
  villaboard9mmSource: QuantitySource_Key;
  villaboard6mmSource: QuantitySource_Key;
  acoustic10mmSource: QuantitySource_Key;
  acoustic13mmSource: QuantitySource_Key;
  waterResistant10mmSource: QuantitySource_Key;
  waterResistant13mmSource: QuantitySource_Key;
  fireDry13mmSource: QuantitySource_Key;
  fireDry16mmSource: QuantitySource_Key;
  fireWet13mmSource: QuantitySource_Key;
  fireWet16mmSource: QuantitySource_Key;
  flexible6_5mmSource: QuantitySource_Key;
  plasterboard10mm: QuoteItemTemplate_Key;
  plasterboard13mm: QuoteItemTemplate_Key;
  villaboard9mm: QuoteItemTemplate_Key;
  villaboard6mm: QuoteItemTemplate_Key;
  acoustic10mm: QuoteItemTemplate_Key;
  acoustic13mm: QuoteItemTemplate_Key;
  waterResistant10mm: QuoteItemTemplate_Key;
  waterResistant13mm: QuoteItemTemplate_Key;
  fireDry13mm: QuoteItemTemplate_Key;
  fireDry16mm: QuoteItemTemplate_Key;
  fireWet13mm: QuoteItemTemplate_Key;
  fireWet16mm: QuoteItemTemplate_Key;
  flexible6_5mm: QuoteItemTemplate_Key;
}
```
### Using `ReconcileSystemQuoteItemTemplates`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, reconcileSystemQuoteItemTemplates } from '@generated/data-connector-web';


// Call the `reconcileSystemQuoteItemTemplates()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await reconcileSystemQuoteItemTemplates();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await reconcileSystemQuoteItemTemplates(dataConnect);

console.log(data.quoteItemTemplateConfig_deleteMany);
console.log(data.quoteItemTemplate_deleteMany);
console.log(data.plasterboard10mmSource);
console.log(data.plasterboard13mmSource);
console.log(data.villaboard9mmSource);
console.log(data.villaboard6mmSource);
console.log(data.acoustic10mmSource);
console.log(data.acoustic13mmSource);
console.log(data.waterResistant10mmSource);
console.log(data.waterResistant13mmSource);
console.log(data.fireDry13mmSource);
console.log(data.fireDry16mmSource);
console.log(data.fireWet13mmSource);
console.log(data.fireWet16mmSource);
console.log(data.flexible6_5mmSource);
console.log(data.plasterboard10mm);
console.log(data.plasterboard13mm);
console.log(data.villaboard9mm);
console.log(data.villaboard6mm);
console.log(data.acoustic10mm);
console.log(data.acoustic13mm);
console.log(data.waterResistant10mm);
console.log(data.waterResistant13mm);
console.log(data.fireDry13mm);
console.log(data.fireDry16mm);
console.log(data.fireWet13mm);
console.log(data.fireWet16mm);
console.log(data.flexible6_5mm);

// Or, you can use the `Promise` API.
reconcileSystemQuoteItemTemplates().then((response) => {
  const data = response.data;
  console.log(data.quoteItemTemplateConfig_deleteMany);
  console.log(data.quoteItemTemplate_deleteMany);
  console.log(data.plasterboard10mmSource);
  console.log(data.plasterboard13mmSource);
  console.log(data.villaboard9mmSource);
  console.log(data.villaboard6mmSource);
  console.log(data.acoustic10mmSource);
  console.log(data.acoustic13mmSource);
  console.log(data.waterResistant10mmSource);
  console.log(data.waterResistant13mmSource);
  console.log(data.fireDry13mmSource);
  console.log(data.fireDry16mmSource);
  console.log(data.fireWet13mmSource);
  console.log(data.fireWet16mmSource);
  console.log(data.flexible6_5mmSource);
  console.log(data.plasterboard10mm);
  console.log(data.plasterboard13mm);
  console.log(data.villaboard9mm);
  console.log(data.villaboard6mm);
  console.log(data.acoustic10mm);
  console.log(data.acoustic13mm);
  console.log(data.waterResistant10mm);
  console.log(data.waterResistant13mm);
  console.log(data.fireDry13mm);
  console.log(data.fireDry16mm);
  console.log(data.fireWet13mm);
  console.log(data.fireWet16mm);
  console.log(data.flexible6_5mm);
});
```

### Using `ReconcileSystemQuoteItemTemplates`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, reconcileSystemQuoteItemTemplatesRef } from '@generated/data-connector-web';


// Call the `reconcileSystemQuoteItemTemplatesRef()` function to get a reference to the mutation.
const ref = reconcileSystemQuoteItemTemplatesRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = reconcileSystemQuoteItemTemplatesRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quoteItemTemplateConfig_deleteMany);
console.log(data.quoteItemTemplate_deleteMany);
console.log(data.plasterboard10mmSource);
console.log(data.plasterboard13mmSource);
console.log(data.villaboard9mmSource);
console.log(data.villaboard6mmSource);
console.log(data.acoustic10mmSource);
console.log(data.acoustic13mmSource);
console.log(data.waterResistant10mmSource);
console.log(data.waterResistant13mmSource);
console.log(data.fireDry13mmSource);
console.log(data.fireDry16mmSource);
console.log(data.fireWet13mmSource);
console.log(data.fireWet16mmSource);
console.log(data.flexible6_5mmSource);
console.log(data.plasterboard10mm);
console.log(data.plasterboard13mm);
console.log(data.villaboard9mm);
console.log(data.villaboard6mm);
console.log(data.acoustic10mm);
console.log(data.acoustic13mm);
console.log(data.waterResistant10mm);
console.log(data.waterResistant13mm);
console.log(data.fireDry13mm);
console.log(data.fireDry16mm);
console.log(data.fireWet13mm);
console.log(data.fireWet16mm);
console.log(data.flexible6_5mm);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteItemTemplateConfig_deleteMany);
  console.log(data.quoteItemTemplate_deleteMany);
  console.log(data.plasterboard10mmSource);
  console.log(data.plasterboard13mmSource);
  console.log(data.villaboard9mmSource);
  console.log(data.villaboard6mmSource);
  console.log(data.acoustic10mmSource);
  console.log(data.acoustic13mmSource);
  console.log(data.waterResistant10mmSource);
  console.log(data.waterResistant13mmSource);
  console.log(data.fireDry13mmSource);
  console.log(data.fireDry16mmSource);
  console.log(data.fireWet13mmSource);
  console.log(data.fireWet16mmSource);
  console.log(data.flexible6_5mmSource);
  console.log(data.plasterboard10mm);
  console.log(data.plasterboard13mm);
  console.log(data.villaboard9mm);
  console.log(data.villaboard6mm);
  console.log(data.acoustic10mm);
  console.log(data.acoustic13mm);
  console.log(data.waterResistant10mm);
  console.log(data.waterResistant13mm);
  console.log(data.fireDry13mm);
  console.log(data.fireDry16mm);
  console.log(data.fireWet13mm);
  console.log(data.fireWet16mm);
  console.log(data.flexible6_5mm);
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

## RenameQuoteTemplate
You can execute the `RenameQuoteTemplate` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
renameQuoteTemplate(vars: RenameQuoteTemplateVariables): MutationPromise<RenameQuoteTemplateData, RenameQuoteTemplateVariables>;

interface RenameQuoteTemplateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RenameQuoteTemplateVariables): MutationRef<RenameQuoteTemplateData, RenameQuoteTemplateVariables>;
}
export const renameQuoteTemplateRef: RenameQuoteTemplateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
renameQuoteTemplate(dc: DataConnect, vars: RenameQuoteTemplateVariables): MutationPromise<RenameQuoteTemplateData, RenameQuoteTemplateVariables>;

interface RenameQuoteTemplateRef {
  ...
  (dc: DataConnect, vars: RenameQuoteTemplateVariables): MutationRef<RenameQuoteTemplateData, RenameQuoteTemplateVariables>;
}
export const renameQuoteTemplateRef: RenameQuoteTemplateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the renameQuoteTemplateRef:
```typescript
const name = renameQuoteTemplateRef.operationName;
console.log(name);
```

### Variables
The `RenameQuoteTemplate` mutation requires an argument of type `RenameQuoteTemplateVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RenameQuoteTemplateVariables {
  id: UUIDString;
  name: string;
}
```
### Return Type
Recall that executing the `RenameQuoteTemplate` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RenameQuoteTemplateData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RenameQuoteTemplateData {
  quoteTemplate_update?: QuoteTemplate_Key | null;
}
```
### Using `RenameQuoteTemplate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, renameQuoteTemplate, RenameQuoteTemplateVariables } from '@generated/data-connector-web';

// The `RenameQuoteTemplate` mutation requires an argument of type `RenameQuoteTemplateVariables`:
const renameQuoteTemplateVars: RenameQuoteTemplateVariables = {
  id: ..., 
  name: ..., 
};

// Call the `renameQuoteTemplate()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await renameQuoteTemplate(renameQuoteTemplateVars);
// Variables can be defined inline as well.
const { data } = await renameQuoteTemplate({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await renameQuoteTemplate(dataConnect, renameQuoteTemplateVars);

console.log(data.quoteTemplate_update);

// Or, you can use the `Promise` API.
renameQuoteTemplate(renameQuoteTemplateVars).then((response) => {
  const data = response.data;
  console.log(data.quoteTemplate_update);
});
```

### Using `RenameQuoteTemplate`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, renameQuoteTemplateRef, RenameQuoteTemplateVariables } from '@generated/data-connector-web';

// The `RenameQuoteTemplate` mutation requires an argument of type `RenameQuoteTemplateVariables`:
const renameQuoteTemplateVars: RenameQuoteTemplateVariables = {
  id: ..., 
  name: ..., 
};

// Call the `renameQuoteTemplateRef()` function to get a reference to the mutation.
const ref = renameQuoteTemplateRef(renameQuoteTemplateVars);
// Variables can be defined inline as well.
const ref = renameQuoteTemplateRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = renameQuoteTemplateRef(dataConnect, renameQuoteTemplateVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quoteTemplate_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteTemplate_update);
});
```

## SetQuoteTemplateAsDefault
You can execute the `SetQuoteTemplateAsDefault` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
setQuoteTemplateAsDefault(vars: SetQuoteTemplateAsDefaultVariables): MutationPromise<SetQuoteTemplateAsDefaultData, SetQuoteTemplateAsDefaultVariables>;

interface SetQuoteTemplateAsDefaultRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetQuoteTemplateAsDefaultVariables): MutationRef<SetQuoteTemplateAsDefaultData, SetQuoteTemplateAsDefaultVariables>;
}
export const setQuoteTemplateAsDefaultRef: SetQuoteTemplateAsDefaultRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
setQuoteTemplateAsDefault(dc: DataConnect, vars: SetQuoteTemplateAsDefaultVariables): MutationPromise<SetQuoteTemplateAsDefaultData, SetQuoteTemplateAsDefaultVariables>;

interface SetQuoteTemplateAsDefaultRef {
  ...
  (dc: DataConnect, vars: SetQuoteTemplateAsDefaultVariables): MutationRef<SetQuoteTemplateAsDefaultData, SetQuoteTemplateAsDefaultVariables>;
}
export const setQuoteTemplateAsDefaultRef: SetQuoteTemplateAsDefaultRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the setQuoteTemplateAsDefaultRef:
```typescript
const name = setQuoteTemplateAsDefaultRef.operationName;
console.log(name);
```

### Variables
The `SetQuoteTemplateAsDefault` mutation requires an argument of type `SetQuoteTemplateAsDefaultVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SetQuoteTemplateAsDefaultVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `SetQuoteTemplateAsDefault` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SetQuoteTemplateAsDefaultData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SetQuoteTemplateAsDefaultData {
  quoteTemplate_updateMany: number;
  quoteTemplate_update?: QuoteTemplate_Key | null;
}
```
### Using `SetQuoteTemplateAsDefault`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, setQuoteTemplateAsDefault, SetQuoteTemplateAsDefaultVariables } from '@generated/data-connector-web';

// The `SetQuoteTemplateAsDefault` mutation requires an argument of type `SetQuoteTemplateAsDefaultVariables`:
const setQuoteTemplateAsDefaultVars: SetQuoteTemplateAsDefaultVariables = {
  id: ..., 
};

// Call the `setQuoteTemplateAsDefault()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await setQuoteTemplateAsDefault(setQuoteTemplateAsDefaultVars);
// Variables can be defined inline as well.
const { data } = await setQuoteTemplateAsDefault({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await setQuoteTemplateAsDefault(dataConnect, setQuoteTemplateAsDefaultVars);

console.log(data.quoteTemplate_updateMany);
console.log(data.quoteTemplate_update);

// Or, you can use the `Promise` API.
setQuoteTemplateAsDefault(setQuoteTemplateAsDefaultVars).then((response) => {
  const data = response.data;
  console.log(data.quoteTemplate_updateMany);
  console.log(data.quoteTemplate_update);
});
```

### Using `SetQuoteTemplateAsDefault`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, setQuoteTemplateAsDefaultRef, SetQuoteTemplateAsDefaultVariables } from '@generated/data-connector-web';

// The `SetQuoteTemplateAsDefault` mutation requires an argument of type `SetQuoteTemplateAsDefaultVariables`:
const setQuoteTemplateAsDefaultVars: SetQuoteTemplateAsDefaultVariables = {
  id: ..., 
};

// Call the `setQuoteTemplateAsDefaultRef()` function to get a reference to the mutation.
const ref = setQuoteTemplateAsDefaultRef(setQuoteTemplateAsDefaultVars);
// Variables can be defined inline as well.
const ref = setQuoteTemplateAsDefaultRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = setQuoteTemplateAsDefaultRef(dataConnect, setQuoteTemplateAsDefaultVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quoteTemplate_updateMany);
console.log(data.quoteTemplate_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteTemplate_updateMany);
  console.log(data.quoteTemplate_update);
});
```

## DeleteQuoteTemplate
You can execute the `DeleteQuoteTemplate` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
deleteQuoteTemplate(vars: DeleteQuoteTemplateVariables): MutationPromise<DeleteQuoteTemplateData, DeleteQuoteTemplateVariables>;

interface DeleteQuoteTemplateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQuoteTemplateVariables): MutationRef<DeleteQuoteTemplateData, DeleteQuoteTemplateVariables>;
}
export const deleteQuoteTemplateRef: DeleteQuoteTemplateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteQuoteTemplate(dc: DataConnect, vars: DeleteQuoteTemplateVariables): MutationPromise<DeleteQuoteTemplateData, DeleteQuoteTemplateVariables>;

interface DeleteQuoteTemplateRef {
  ...
  (dc: DataConnect, vars: DeleteQuoteTemplateVariables): MutationRef<DeleteQuoteTemplateData, DeleteQuoteTemplateVariables>;
}
export const deleteQuoteTemplateRef: DeleteQuoteTemplateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteQuoteTemplateRef:
```typescript
const name = deleteQuoteTemplateRef.operationName;
console.log(name);
```

### Variables
The `DeleteQuoteTemplate` mutation requires an argument of type `DeleteQuoteTemplateVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteQuoteTemplateVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteQuoteTemplate` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteQuoteTemplateData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteQuoteTemplateData {
  company_updateMany: number;
  quoteItemTemplateConfig_deleteMany: number;
  quoteTemplate_delete?: QuoteTemplate_Key | null;
}
```
### Using `DeleteQuoteTemplate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteQuoteTemplate, DeleteQuoteTemplateVariables } from '@generated/data-connector-web';

// The `DeleteQuoteTemplate` mutation requires an argument of type `DeleteQuoteTemplateVariables`:
const deleteQuoteTemplateVars: DeleteQuoteTemplateVariables = {
  id: ..., 
};

// Call the `deleteQuoteTemplate()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteQuoteTemplate(deleteQuoteTemplateVars);
// Variables can be defined inline as well.
const { data } = await deleteQuoteTemplate({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteQuoteTemplate(dataConnect, deleteQuoteTemplateVars);

console.log(data.company_updateMany);
console.log(data.quoteItemTemplateConfig_deleteMany);
console.log(data.quoteTemplate_delete);

// Or, you can use the `Promise` API.
deleteQuoteTemplate(deleteQuoteTemplateVars).then((response) => {
  const data = response.data;
  console.log(data.company_updateMany);
  console.log(data.quoteItemTemplateConfig_deleteMany);
  console.log(data.quoteTemplate_delete);
});
```

### Using `DeleteQuoteTemplate`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteQuoteTemplateRef, DeleteQuoteTemplateVariables } from '@generated/data-connector-web';

// The `DeleteQuoteTemplate` mutation requires an argument of type `DeleteQuoteTemplateVariables`:
const deleteQuoteTemplateVars: DeleteQuoteTemplateVariables = {
  id: ..., 
};

// Call the `deleteQuoteTemplateRef()` function to get a reference to the mutation.
const ref = deleteQuoteTemplateRef(deleteQuoteTemplateVars);
// Variables can be defined inline as well.
const ref = deleteQuoteTemplateRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteQuoteTemplateRef(dataConnect, deleteQuoteTemplateVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.company_updateMany);
console.log(data.quoteItemTemplateConfig_deleteMany);
console.log(data.quoteTemplate_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.company_updateMany);
  console.log(data.quoteItemTemplateConfig_deleteMany);
  console.log(data.quoteTemplate_delete);
});
```

## CreateQuoteTemplateVariation
You can execute the `CreateQuoteTemplateVariation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createQuoteTemplateVariation(vars: CreateQuoteTemplateVariationVariables): MutationPromise<CreateQuoteTemplateVariationData, CreateQuoteTemplateVariationVariables>;

interface CreateQuoteTemplateVariationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuoteTemplateVariationVariables): MutationRef<CreateQuoteTemplateVariationData, CreateQuoteTemplateVariationVariables>;
}
export const createQuoteTemplateVariationRef: CreateQuoteTemplateVariationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createQuoteTemplateVariation(dc: DataConnect, vars: CreateQuoteTemplateVariationVariables): MutationPromise<CreateQuoteTemplateVariationData, CreateQuoteTemplateVariationVariables>;

interface CreateQuoteTemplateVariationRef {
  ...
  (dc: DataConnect, vars: CreateQuoteTemplateVariationVariables): MutationRef<CreateQuoteTemplateVariationData, CreateQuoteTemplateVariationVariables>;
}
export const createQuoteTemplateVariationRef: CreateQuoteTemplateVariationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQuoteTemplateVariationRef:
```typescript
const name = createQuoteTemplateVariationRef.operationName;
console.log(name);
```

### Variables
The `CreateQuoteTemplateVariation` mutation requires an argument of type `CreateQuoteTemplateVariationVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateQuoteTemplateVariationVariables {
  quoteTemplateId: UUIDString;
  name: string;
  includeItem1?: boolean | null;
  item1ItemTemplateId?: UUIDString | null;
  item1Enabled?: boolean | null;
  item1UnitPriceCents?: number | null;
  item1MaterialUnitPriceCents?: number | null;
  item1LabourUnitPriceCents?: number | null;
  includeItem2?: boolean | null;
  item2ItemTemplateId?: UUIDString | null;
  item2Enabled?: boolean | null;
  item2UnitPriceCents?: number | null;
  item2MaterialUnitPriceCents?: number | null;
  item2LabourUnitPriceCents?: number | null;
  includeItem3?: boolean | null;
  item3ItemTemplateId?: UUIDString | null;
  item3Enabled?: boolean | null;
  item3UnitPriceCents?: number | null;
  item3MaterialUnitPriceCents?: number | null;
  item3LabourUnitPriceCents?: number | null;
  includeItem4?: boolean | null;
  item4ItemTemplateId?: UUIDString | null;
  item4Enabled?: boolean | null;
  item4UnitPriceCents?: number | null;
  item4MaterialUnitPriceCents?: number | null;
  item4LabourUnitPriceCents?: number | null;
  includeItem5?: boolean | null;
  item5ItemTemplateId?: UUIDString | null;
  item5Enabled?: boolean | null;
  item5UnitPriceCents?: number | null;
  item5MaterialUnitPriceCents?: number | null;
  item5LabourUnitPriceCents?: number | null;
  includeItem6?: boolean | null;
  item6ItemTemplateId?: UUIDString | null;
  item6Enabled?: boolean | null;
  item6UnitPriceCents?: number | null;
  item6MaterialUnitPriceCents?: number | null;
  item6LabourUnitPriceCents?: number | null;
  includeItem7?: boolean | null;
  item7ItemTemplateId?: UUIDString | null;
  item7Enabled?: boolean | null;
  item7UnitPriceCents?: number | null;
  item7MaterialUnitPriceCents?: number | null;
  item7LabourUnitPriceCents?: number | null;
  includeItem8?: boolean | null;
  item8ItemTemplateId?: UUIDString | null;
  item8Enabled?: boolean | null;
  item8UnitPriceCents?: number | null;
  item8MaterialUnitPriceCents?: number | null;
  item8LabourUnitPriceCents?: number | null;
  includeItem9?: boolean | null;
  item9ItemTemplateId?: UUIDString | null;
  item9Enabled?: boolean | null;
  item9UnitPriceCents?: number | null;
  item9MaterialUnitPriceCents?: number | null;
  item9LabourUnitPriceCents?: number | null;
  includeItem10?: boolean | null;
  item10ItemTemplateId?: UUIDString | null;
  item10Enabled?: boolean | null;
  item10UnitPriceCents?: number | null;
  item10MaterialUnitPriceCents?: number | null;
  item10LabourUnitPriceCents?: number | null;
  includeItem11?: boolean | null;
  item11ItemTemplateId?: UUIDString | null;
  item11Enabled?: boolean | null;
  item11UnitPriceCents?: number | null;
  item11MaterialUnitPriceCents?: number | null;
  item11LabourUnitPriceCents?: number | null;
  includeItem12?: boolean | null;
  item12ItemTemplateId?: UUIDString | null;
  item12Enabled?: boolean | null;
  item12UnitPriceCents?: number | null;
  item12MaterialUnitPriceCents?: number | null;
  item12LabourUnitPriceCents?: number | null;
  includeItem13?: boolean | null;
  item13ItemTemplateId?: UUIDString | null;
  item13Enabled?: boolean | null;
  item13UnitPriceCents?: number | null;
  item13MaterialUnitPriceCents?: number | null;
  item13LabourUnitPriceCents?: number | null;
  includeItem14?: boolean | null;
  item14ItemTemplateId?: UUIDString | null;
  item14Enabled?: boolean | null;
  item14UnitPriceCents?: number | null;
  item14MaterialUnitPriceCents?: number | null;
  item14LabourUnitPriceCents?: number | null;
  includeItem15?: boolean | null;
  item15ItemTemplateId?: UUIDString | null;
  item15Enabled?: boolean | null;
  item15UnitPriceCents?: number | null;
  item15MaterialUnitPriceCents?: number | null;
  item15LabourUnitPriceCents?: number | null;
  includeItem16?: boolean | null;
  item16ItemTemplateId?: UUIDString | null;
  item16Enabled?: boolean | null;
  item16UnitPriceCents?: number | null;
  item16MaterialUnitPriceCents?: number | null;
  item16LabourUnitPriceCents?: number | null;
  includeItem17?: boolean | null;
  item17ItemTemplateId?: UUIDString | null;
  item17Enabled?: boolean | null;
  item17UnitPriceCents?: number | null;
  item17MaterialUnitPriceCents?: number | null;
  item17LabourUnitPriceCents?: number | null;
  includeItem18?: boolean | null;
  item18ItemTemplateId?: UUIDString | null;
  item18Enabled?: boolean | null;
  item18UnitPriceCents?: number | null;
  item18MaterialUnitPriceCents?: number | null;
  item18LabourUnitPriceCents?: number | null;
  includeItem19?: boolean | null;
  item19ItemTemplateId?: UUIDString | null;
  item19Enabled?: boolean | null;
  item19UnitPriceCents?: number | null;
  item19MaterialUnitPriceCents?: number | null;
  item19LabourUnitPriceCents?: number | null;
  includeItem20?: boolean | null;
  item20ItemTemplateId?: UUIDString | null;
  item20Enabled?: boolean | null;
  item20UnitPriceCents?: number | null;
  item20MaterialUnitPriceCents?: number | null;
  item20LabourUnitPriceCents?: number | null;
}
```
### Return Type
Recall that executing the `CreateQuoteTemplateVariation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQuoteTemplateVariationData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateQuoteTemplateVariationData {
  quoteTemplate_insert: QuoteTemplate_Key;
  item1: QuoteItemTemplateConfig_Key;
  item2: QuoteItemTemplateConfig_Key;
  item3: QuoteItemTemplateConfig_Key;
  item4: QuoteItemTemplateConfig_Key;
  item5: QuoteItemTemplateConfig_Key;
  item6: QuoteItemTemplateConfig_Key;
  item7: QuoteItemTemplateConfig_Key;
  item8: QuoteItemTemplateConfig_Key;
  item9: QuoteItemTemplateConfig_Key;
  item10: QuoteItemTemplateConfig_Key;
  item11: QuoteItemTemplateConfig_Key;
  item12: QuoteItemTemplateConfig_Key;
  item13: QuoteItemTemplateConfig_Key;
  item14: QuoteItemTemplateConfig_Key;
  item15: QuoteItemTemplateConfig_Key;
  item16: QuoteItemTemplateConfig_Key;
  item17: QuoteItemTemplateConfig_Key;
  item18: QuoteItemTemplateConfig_Key;
  item19: QuoteItemTemplateConfig_Key;
  item20: QuoteItemTemplateConfig_Key;
}
```
### Using `CreateQuoteTemplateVariation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQuoteTemplateVariation, CreateQuoteTemplateVariationVariables } from '@generated/data-connector-web';

// The `CreateQuoteTemplateVariation` mutation requires an argument of type `CreateQuoteTemplateVariationVariables`:
const createQuoteTemplateVariationVars: CreateQuoteTemplateVariationVariables = {
  quoteTemplateId: ..., 
  name: ..., 
  includeItem1: ..., // optional
  item1ItemTemplateId: ..., // optional
  item1Enabled: ..., // optional
  item1UnitPriceCents: ..., // optional
  item1MaterialUnitPriceCents: ..., // optional
  item1LabourUnitPriceCents: ..., // optional
  includeItem2: ..., // optional
  item2ItemTemplateId: ..., // optional
  item2Enabled: ..., // optional
  item2UnitPriceCents: ..., // optional
  item2MaterialUnitPriceCents: ..., // optional
  item2LabourUnitPriceCents: ..., // optional
  includeItem3: ..., // optional
  item3ItemTemplateId: ..., // optional
  item3Enabled: ..., // optional
  item3UnitPriceCents: ..., // optional
  item3MaterialUnitPriceCents: ..., // optional
  item3LabourUnitPriceCents: ..., // optional
  includeItem4: ..., // optional
  item4ItemTemplateId: ..., // optional
  item4Enabled: ..., // optional
  item4UnitPriceCents: ..., // optional
  item4MaterialUnitPriceCents: ..., // optional
  item4LabourUnitPriceCents: ..., // optional
  includeItem5: ..., // optional
  item5ItemTemplateId: ..., // optional
  item5Enabled: ..., // optional
  item5UnitPriceCents: ..., // optional
  item5MaterialUnitPriceCents: ..., // optional
  item5LabourUnitPriceCents: ..., // optional
  includeItem6: ..., // optional
  item6ItemTemplateId: ..., // optional
  item6Enabled: ..., // optional
  item6UnitPriceCents: ..., // optional
  item6MaterialUnitPriceCents: ..., // optional
  item6LabourUnitPriceCents: ..., // optional
  includeItem7: ..., // optional
  item7ItemTemplateId: ..., // optional
  item7Enabled: ..., // optional
  item7UnitPriceCents: ..., // optional
  item7MaterialUnitPriceCents: ..., // optional
  item7LabourUnitPriceCents: ..., // optional
  includeItem8: ..., // optional
  item8ItemTemplateId: ..., // optional
  item8Enabled: ..., // optional
  item8UnitPriceCents: ..., // optional
  item8MaterialUnitPriceCents: ..., // optional
  item8LabourUnitPriceCents: ..., // optional
  includeItem9: ..., // optional
  item9ItemTemplateId: ..., // optional
  item9Enabled: ..., // optional
  item9UnitPriceCents: ..., // optional
  item9MaterialUnitPriceCents: ..., // optional
  item9LabourUnitPriceCents: ..., // optional
  includeItem10: ..., // optional
  item10ItemTemplateId: ..., // optional
  item10Enabled: ..., // optional
  item10UnitPriceCents: ..., // optional
  item10MaterialUnitPriceCents: ..., // optional
  item10LabourUnitPriceCents: ..., // optional
  includeItem11: ..., // optional
  item11ItemTemplateId: ..., // optional
  item11Enabled: ..., // optional
  item11UnitPriceCents: ..., // optional
  item11MaterialUnitPriceCents: ..., // optional
  item11LabourUnitPriceCents: ..., // optional
  includeItem12: ..., // optional
  item12ItemTemplateId: ..., // optional
  item12Enabled: ..., // optional
  item12UnitPriceCents: ..., // optional
  item12MaterialUnitPriceCents: ..., // optional
  item12LabourUnitPriceCents: ..., // optional
  includeItem13: ..., // optional
  item13ItemTemplateId: ..., // optional
  item13Enabled: ..., // optional
  item13UnitPriceCents: ..., // optional
  item13MaterialUnitPriceCents: ..., // optional
  item13LabourUnitPriceCents: ..., // optional
  includeItem14: ..., // optional
  item14ItemTemplateId: ..., // optional
  item14Enabled: ..., // optional
  item14UnitPriceCents: ..., // optional
  item14MaterialUnitPriceCents: ..., // optional
  item14LabourUnitPriceCents: ..., // optional
  includeItem15: ..., // optional
  item15ItemTemplateId: ..., // optional
  item15Enabled: ..., // optional
  item15UnitPriceCents: ..., // optional
  item15MaterialUnitPriceCents: ..., // optional
  item15LabourUnitPriceCents: ..., // optional
  includeItem16: ..., // optional
  item16ItemTemplateId: ..., // optional
  item16Enabled: ..., // optional
  item16UnitPriceCents: ..., // optional
  item16MaterialUnitPriceCents: ..., // optional
  item16LabourUnitPriceCents: ..., // optional
  includeItem17: ..., // optional
  item17ItemTemplateId: ..., // optional
  item17Enabled: ..., // optional
  item17UnitPriceCents: ..., // optional
  item17MaterialUnitPriceCents: ..., // optional
  item17LabourUnitPriceCents: ..., // optional
  includeItem18: ..., // optional
  item18ItemTemplateId: ..., // optional
  item18Enabled: ..., // optional
  item18UnitPriceCents: ..., // optional
  item18MaterialUnitPriceCents: ..., // optional
  item18LabourUnitPriceCents: ..., // optional
  includeItem19: ..., // optional
  item19ItemTemplateId: ..., // optional
  item19Enabled: ..., // optional
  item19UnitPriceCents: ..., // optional
  item19MaterialUnitPriceCents: ..., // optional
  item19LabourUnitPriceCents: ..., // optional
  includeItem20: ..., // optional
  item20ItemTemplateId: ..., // optional
  item20Enabled: ..., // optional
  item20UnitPriceCents: ..., // optional
  item20MaterialUnitPriceCents: ..., // optional
  item20LabourUnitPriceCents: ..., // optional
};

// Call the `createQuoteTemplateVariation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuoteTemplateVariation(createQuoteTemplateVariationVars);
// Variables can be defined inline as well.
const { data } = await createQuoteTemplateVariation({ quoteTemplateId: ..., name: ..., includeItem1: ..., item1ItemTemplateId: ..., item1Enabled: ..., item1UnitPriceCents: ..., item1MaterialUnitPriceCents: ..., item1LabourUnitPriceCents: ..., includeItem2: ..., item2ItemTemplateId: ..., item2Enabled: ..., item2UnitPriceCents: ..., item2MaterialUnitPriceCents: ..., item2LabourUnitPriceCents: ..., includeItem3: ..., item3ItemTemplateId: ..., item3Enabled: ..., item3UnitPriceCents: ..., item3MaterialUnitPriceCents: ..., item3LabourUnitPriceCents: ..., includeItem4: ..., item4ItemTemplateId: ..., item4Enabled: ..., item4UnitPriceCents: ..., item4MaterialUnitPriceCents: ..., item4LabourUnitPriceCents: ..., includeItem5: ..., item5ItemTemplateId: ..., item5Enabled: ..., item5UnitPriceCents: ..., item5MaterialUnitPriceCents: ..., item5LabourUnitPriceCents: ..., includeItem6: ..., item6ItemTemplateId: ..., item6Enabled: ..., item6UnitPriceCents: ..., item6MaterialUnitPriceCents: ..., item6LabourUnitPriceCents: ..., includeItem7: ..., item7ItemTemplateId: ..., item7Enabled: ..., item7UnitPriceCents: ..., item7MaterialUnitPriceCents: ..., item7LabourUnitPriceCents: ..., includeItem8: ..., item8ItemTemplateId: ..., item8Enabled: ..., item8UnitPriceCents: ..., item8MaterialUnitPriceCents: ..., item8LabourUnitPriceCents: ..., includeItem9: ..., item9ItemTemplateId: ..., item9Enabled: ..., item9UnitPriceCents: ..., item9MaterialUnitPriceCents: ..., item9LabourUnitPriceCents: ..., includeItem10: ..., item10ItemTemplateId: ..., item10Enabled: ..., item10UnitPriceCents: ..., item10MaterialUnitPriceCents: ..., item10LabourUnitPriceCents: ..., includeItem11: ..., item11ItemTemplateId: ..., item11Enabled: ..., item11UnitPriceCents: ..., item11MaterialUnitPriceCents: ..., item11LabourUnitPriceCents: ..., includeItem12: ..., item12ItemTemplateId: ..., item12Enabled: ..., item12UnitPriceCents: ..., item12MaterialUnitPriceCents: ..., item12LabourUnitPriceCents: ..., includeItem13: ..., item13ItemTemplateId: ..., item13Enabled: ..., item13UnitPriceCents: ..., item13MaterialUnitPriceCents: ..., item13LabourUnitPriceCents: ..., includeItem14: ..., item14ItemTemplateId: ..., item14Enabled: ..., item14UnitPriceCents: ..., item14MaterialUnitPriceCents: ..., item14LabourUnitPriceCents: ..., includeItem15: ..., item15ItemTemplateId: ..., item15Enabled: ..., item15UnitPriceCents: ..., item15MaterialUnitPriceCents: ..., item15LabourUnitPriceCents: ..., includeItem16: ..., item16ItemTemplateId: ..., item16Enabled: ..., item16UnitPriceCents: ..., item16MaterialUnitPriceCents: ..., item16LabourUnitPriceCents: ..., includeItem17: ..., item17ItemTemplateId: ..., item17Enabled: ..., item17UnitPriceCents: ..., item17MaterialUnitPriceCents: ..., item17LabourUnitPriceCents: ..., includeItem18: ..., item18ItemTemplateId: ..., item18Enabled: ..., item18UnitPriceCents: ..., item18MaterialUnitPriceCents: ..., item18LabourUnitPriceCents: ..., includeItem19: ..., item19ItemTemplateId: ..., item19Enabled: ..., item19UnitPriceCents: ..., item19MaterialUnitPriceCents: ..., item19LabourUnitPriceCents: ..., includeItem20: ..., item20ItemTemplateId: ..., item20Enabled: ..., item20UnitPriceCents: ..., item20MaterialUnitPriceCents: ..., item20LabourUnitPriceCents: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQuoteTemplateVariation(dataConnect, createQuoteTemplateVariationVars);

console.log(data.quoteTemplate_insert);
console.log(data.item1);
console.log(data.item2);
console.log(data.item3);
console.log(data.item4);
console.log(data.item5);
console.log(data.item6);
console.log(data.item7);
console.log(data.item8);
console.log(data.item9);
console.log(data.item10);
console.log(data.item11);
console.log(data.item12);
console.log(data.item13);
console.log(data.item14);
console.log(data.item15);
console.log(data.item16);
console.log(data.item17);
console.log(data.item18);
console.log(data.item19);
console.log(data.item20);

// Or, you can use the `Promise` API.
createQuoteTemplateVariation(createQuoteTemplateVariationVars).then((response) => {
  const data = response.data;
  console.log(data.quoteTemplate_insert);
  console.log(data.item1);
  console.log(data.item2);
  console.log(data.item3);
  console.log(data.item4);
  console.log(data.item5);
  console.log(data.item6);
  console.log(data.item7);
  console.log(data.item8);
  console.log(data.item9);
  console.log(data.item10);
  console.log(data.item11);
  console.log(data.item12);
  console.log(data.item13);
  console.log(data.item14);
  console.log(data.item15);
  console.log(data.item16);
  console.log(data.item17);
  console.log(data.item18);
  console.log(data.item19);
  console.log(data.item20);
});
```

### Using `CreateQuoteTemplateVariation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQuoteTemplateVariationRef, CreateQuoteTemplateVariationVariables } from '@generated/data-connector-web';

// The `CreateQuoteTemplateVariation` mutation requires an argument of type `CreateQuoteTemplateVariationVariables`:
const createQuoteTemplateVariationVars: CreateQuoteTemplateVariationVariables = {
  quoteTemplateId: ..., 
  name: ..., 
  includeItem1: ..., // optional
  item1ItemTemplateId: ..., // optional
  item1Enabled: ..., // optional
  item1UnitPriceCents: ..., // optional
  item1MaterialUnitPriceCents: ..., // optional
  item1LabourUnitPriceCents: ..., // optional
  includeItem2: ..., // optional
  item2ItemTemplateId: ..., // optional
  item2Enabled: ..., // optional
  item2UnitPriceCents: ..., // optional
  item2MaterialUnitPriceCents: ..., // optional
  item2LabourUnitPriceCents: ..., // optional
  includeItem3: ..., // optional
  item3ItemTemplateId: ..., // optional
  item3Enabled: ..., // optional
  item3UnitPriceCents: ..., // optional
  item3MaterialUnitPriceCents: ..., // optional
  item3LabourUnitPriceCents: ..., // optional
  includeItem4: ..., // optional
  item4ItemTemplateId: ..., // optional
  item4Enabled: ..., // optional
  item4UnitPriceCents: ..., // optional
  item4MaterialUnitPriceCents: ..., // optional
  item4LabourUnitPriceCents: ..., // optional
  includeItem5: ..., // optional
  item5ItemTemplateId: ..., // optional
  item5Enabled: ..., // optional
  item5UnitPriceCents: ..., // optional
  item5MaterialUnitPriceCents: ..., // optional
  item5LabourUnitPriceCents: ..., // optional
  includeItem6: ..., // optional
  item6ItemTemplateId: ..., // optional
  item6Enabled: ..., // optional
  item6UnitPriceCents: ..., // optional
  item6MaterialUnitPriceCents: ..., // optional
  item6LabourUnitPriceCents: ..., // optional
  includeItem7: ..., // optional
  item7ItemTemplateId: ..., // optional
  item7Enabled: ..., // optional
  item7UnitPriceCents: ..., // optional
  item7MaterialUnitPriceCents: ..., // optional
  item7LabourUnitPriceCents: ..., // optional
  includeItem8: ..., // optional
  item8ItemTemplateId: ..., // optional
  item8Enabled: ..., // optional
  item8UnitPriceCents: ..., // optional
  item8MaterialUnitPriceCents: ..., // optional
  item8LabourUnitPriceCents: ..., // optional
  includeItem9: ..., // optional
  item9ItemTemplateId: ..., // optional
  item9Enabled: ..., // optional
  item9UnitPriceCents: ..., // optional
  item9MaterialUnitPriceCents: ..., // optional
  item9LabourUnitPriceCents: ..., // optional
  includeItem10: ..., // optional
  item10ItemTemplateId: ..., // optional
  item10Enabled: ..., // optional
  item10UnitPriceCents: ..., // optional
  item10MaterialUnitPriceCents: ..., // optional
  item10LabourUnitPriceCents: ..., // optional
  includeItem11: ..., // optional
  item11ItemTemplateId: ..., // optional
  item11Enabled: ..., // optional
  item11UnitPriceCents: ..., // optional
  item11MaterialUnitPriceCents: ..., // optional
  item11LabourUnitPriceCents: ..., // optional
  includeItem12: ..., // optional
  item12ItemTemplateId: ..., // optional
  item12Enabled: ..., // optional
  item12UnitPriceCents: ..., // optional
  item12MaterialUnitPriceCents: ..., // optional
  item12LabourUnitPriceCents: ..., // optional
  includeItem13: ..., // optional
  item13ItemTemplateId: ..., // optional
  item13Enabled: ..., // optional
  item13UnitPriceCents: ..., // optional
  item13MaterialUnitPriceCents: ..., // optional
  item13LabourUnitPriceCents: ..., // optional
  includeItem14: ..., // optional
  item14ItemTemplateId: ..., // optional
  item14Enabled: ..., // optional
  item14UnitPriceCents: ..., // optional
  item14MaterialUnitPriceCents: ..., // optional
  item14LabourUnitPriceCents: ..., // optional
  includeItem15: ..., // optional
  item15ItemTemplateId: ..., // optional
  item15Enabled: ..., // optional
  item15UnitPriceCents: ..., // optional
  item15MaterialUnitPriceCents: ..., // optional
  item15LabourUnitPriceCents: ..., // optional
  includeItem16: ..., // optional
  item16ItemTemplateId: ..., // optional
  item16Enabled: ..., // optional
  item16UnitPriceCents: ..., // optional
  item16MaterialUnitPriceCents: ..., // optional
  item16LabourUnitPriceCents: ..., // optional
  includeItem17: ..., // optional
  item17ItemTemplateId: ..., // optional
  item17Enabled: ..., // optional
  item17UnitPriceCents: ..., // optional
  item17MaterialUnitPriceCents: ..., // optional
  item17LabourUnitPriceCents: ..., // optional
  includeItem18: ..., // optional
  item18ItemTemplateId: ..., // optional
  item18Enabled: ..., // optional
  item18UnitPriceCents: ..., // optional
  item18MaterialUnitPriceCents: ..., // optional
  item18LabourUnitPriceCents: ..., // optional
  includeItem19: ..., // optional
  item19ItemTemplateId: ..., // optional
  item19Enabled: ..., // optional
  item19UnitPriceCents: ..., // optional
  item19MaterialUnitPriceCents: ..., // optional
  item19LabourUnitPriceCents: ..., // optional
  includeItem20: ..., // optional
  item20ItemTemplateId: ..., // optional
  item20Enabled: ..., // optional
  item20UnitPriceCents: ..., // optional
  item20MaterialUnitPriceCents: ..., // optional
  item20LabourUnitPriceCents: ..., // optional
};

// Call the `createQuoteTemplateVariationRef()` function to get a reference to the mutation.
const ref = createQuoteTemplateVariationRef(createQuoteTemplateVariationVars);
// Variables can be defined inline as well.
const ref = createQuoteTemplateVariationRef({ quoteTemplateId: ..., name: ..., includeItem1: ..., item1ItemTemplateId: ..., item1Enabled: ..., item1UnitPriceCents: ..., item1MaterialUnitPriceCents: ..., item1LabourUnitPriceCents: ..., includeItem2: ..., item2ItemTemplateId: ..., item2Enabled: ..., item2UnitPriceCents: ..., item2MaterialUnitPriceCents: ..., item2LabourUnitPriceCents: ..., includeItem3: ..., item3ItemTemplateId: ..., item3Enabled: ..., item3UnitPriceCents: ..., item3MaterialUnitPriceCents: ..., item3LabourUnitPriceCents: ..., includeItem4: ..., item4ItemTemplateId: ..., item4Enabled: ..., item4UnitPriceCents: ..., item4MaterialUnitPriceCents: ..., item4LabourUnitPriceCents: ..., includeItem5: ..., item5ItemTemplateId: ..., item5Enabled: ..., item5UnitPriceCents: ..., item5MaterialUnitPriceCents: ..., item5LabourUnitPriceCents: ..., includeItem6: ..., item6ItemTemplateId: ..., item6Enabled: ..., item6UnitPriceCents: ..., item6MaterialUnitPriceCents: ..., item6LabourUnitPriceCents: ..., includeItem7: ..., item7ItemTemplateId: ..., item7Enabled: ..., item7UnitPriceCents: ..., item7MaterialUnitPriceCents: ..., item7LabourUnitPriceCents: ..., includeItem8: ..., item8ItemTemplateId: ..., item8Enabled: ..., item8UnitPriceCents: ..., item8MaterialUnitPriceCents: ..., item8LabourUnitPriceCents: ..., includeItem9: ..., item9ItemTemplateId: ..., item9Enabled: ..., item9UnitPriceCents: ..., item9MaterialUnitPriceCents: ..., item9LabourUnitPriceCents: ..., includeItem10: ..., item10ItemTemplateId: ..., item10Enabled: ..., item10UnitPriceCents: ..., item10MaterialUnitPriceCents: ..., item10LabourUnitPriceCents: ..., includeItem11: ..., item11ItemTemplateId: ..., item11Enabled: ..., item11UnitPriceCents: ..., item11MaterialUnitPriceCents: ..., item11LabourUnitPriceCents: ..., includeItem12: ..., item12ItemTemplateId: ..., item12Enabled: ..., item12UnitPriceCents: ..., item12MaterialUnitPriceCents: ..., item12LabourUnitPriceCents: ..., includeItem13: ..., item13ItemTemplateId: ..., item13Enabled: ..., item13UnitPriceCents: ..., item13MaterialUnitPriceCents: ..., item13LabourUnitPriceCents: ..., includeItem14: ..., item14ItemTemplateId: ..., item14Enabled: ..., item14UnitPriceCents: ..., item14MaterialUnitPriceCents: ..., item14LabourUnitPriceCents: ..., includeItem15: ..., item15ItemTemplateId: ..., item15Enabled: ..., item15UnitPriceCents: ..., item15MaterialUnitPriceCents: ..., item15LabourUnitPriceCents: ..., includeItem16: ..., item16ItemTemplateId: ..., item16Enabled: ..., item16UnitPriceCents: ..., item16MaterialUnitPriceCents: ..., item16LabourUnitPriceCents: ..., includeItem17: ..., item17ItemTemplateId: ..., item17Enabled: ..., item17UnitPriceCents: ..., item17MaterialUnitPriceCents: ..., item17LabourUnitPriceCents: ..., includeItem18: ..., item18ItemTemplateId: ..., item18Enabled: ..., item18UnitPriceCents: ..., item18MaterialUnitPriceCents: ..., item18LabourUnitPriceCents: ..., includeItem19: ..., item19ItemTemplateId: ..., item19Enabled: ..., item19UnitPriceCents: ..., item19MaterialUnitPriceCents: ..., item19LabourUnitPriceCents: ..., includeItem20: ..., item20ItemTemplateId: ..., item20Enabled: ..., item20UnitPriceCents: ..., item20MaterialUnitPriceCents: ..., item20LabourUnitPriceCents: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQuoteTemplateVariationRef(dataConnect, createQuoteTemplateVariationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quoteTemplate_insert);
console.log(data.item1);
console.log(data.item2);
console.log(data.item3);
console.log(data.item4);
console.log(data.item5);
console.log(data.item6);
console.log(data.item7);
console.log(data.item8);
console.log(data.item9);
console.log(data.item10);
console.log(data.item11);
console.log(data.item12);
console.log(data.item13);
console.log(data.item14);
console.log(data.item15);
console.log(data.item16);
console.log(data.item17);
console.log(data.item18);
console.log(data.item19);
console.log(data.item20);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteTemplate_insert);
  console.log(data.item1);
  console.log(data.item2);
  console.log(data.item3);
  console.log(data.item4);
  console.log(data.item5);
  console.log(data.item6);
  console.log(data.item7);
  console.log(data.item8);
  console.log(data.item9);
  console.log(data.item10);
  console.log(data.item11);
  console.log(data.item12);
  console.log(data.item13);
  console.log(data.item14);
  console.log(data.item15);
  console.log(data.item16);
  console.log(data.item17);
  console.log(data.item18);
  console.log(data.item19);
  console.log(data.item20);
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

## CreateQuoteItemTemplateWithUnit
You can execute the `CreateQuoteItemTemplateWithUnit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createQuoteItemTemplateWithUnit(vars: CreateQuoteItemTemplateWithUnitVariables): MutationPromise<CreateQuoteItemTemplateWithUnitData, CreateQuoteItemTemplateWithUnitVariables>;

interface CreateQuoteItemTemplateWithUnitRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuoteItemTemplateWithUnitVariables): MutationRef<CreateQuoteItemTemplateWithUnitData, CreateQuoteItemTemplateWithUnitVariables>;
}
export const createQuoteItemTemplateWithUnitRef: CreateQuoteItemTemplateWithUnitRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createQuoteItemTemplateWithUnit(dc: DataConnect, vars: CreateQuoteItemTemplateWithUnitVariables): MutationPromise<CreateQuoteItemTemplateWithUnitData, CreateQuoteItemTemplateWithUnitVariables>;

interface CreateQuoteItemTemplateWithUnitRef {
  ...
  (dc: DataConnect, vars: CreateQuoteItemTemplateWithUnitVariables): MutationRef<CreateQuoteItemTemplateWithUnitData, CreateQuoteItemTemplateWithUnitVariables>;
}
export const createQuoteItemTemplateWithUnitRef: CreateQuoteItemTemplateWithUnitRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQuoteItemTemplateWithUnitRef:
```typescript
const name = createQuoteItemTemplateWithUnitRef.operationName;
console.log(name);
```

### Variables
The `CreateQuoteItemTemplateWithUnit` mutation requires an argument of type `CreateQuoteItemTemplateWithUnitVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateQuoteItemTemplateWithUnitVariables {
  id: UUIDString;
  name: string;
  unit: string;
  hasKeywords: boolean;
  keywords: string[];
}
```
### Return Type
Recall that executing the `CreateQuoteItemTemplateWithUnit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQuoteItemTemplateWithUnitData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateQuoteItemTemplateWithUnitData {
  quoteItemTemplate_insert: QuoteItemTemplate_Key;
}
```
### Using `CreateQuoteItemTemplateWithUnit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQuoteItemTemplateWithUnit, CreateQuoteItemTemplateWithUnitVariables } from '@generated/data-connector-web';

// The `CreateQuoteItemTemplateWithUnit` mutation requires an argument of type `CreateQuoteItemTemplateWithUnitVariables`:
const createQuoteItemTemplateWithUnitVars: CreateQuoteItemTemplateWithUnitVariables = {
  id: ..., 
  name: ..., 
  unit: ..., 
  hasKeywords: ..., 
  keywords: ..., 
};

// Call the `createQuoteItemTemplateWithUnit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuoteItemTemplateWithUnit(createQuoteItemTemplateWithUnitVars);
// Variables can be defined inline as well.
const { data } = await createQuoteItemTemplateWithUnit({ id: ..., name: ..., unit: ..., hasKeywords: ..., keywords: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQuoteItemTemplateWithUnit(dataConnect, createQuoteItemTemplateWithUnitVars);

console.log(data.quoteItemTemplate_insert);

// Or, you can use the `Promise` API.
createQuoteItemTemplateWithUnit(createQuoteItemTemplateWithUnitVars).then((response) => {
  const data = response.data;
  console.log(data.quoteItemTemplate_insert);
});
```

### Using `CreateQuoteItemTemplateWithUnit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQuoteItemTemplateWithUnitRef, CreateQuoteItemTemplateWithUnitVariables } from '@generated/data-connector-web';

// The `CreateQuoteItemTemplateWithUnit` mutation requires an argument of type `CreateQuoteItemTemplateWithUnitVariables`:
const createQuoteItemTemplateWithUnitVars: CreateQuoteItemTemplateWithUnitVariables = {
  id: ..., 
  name: ..., 
  unit: ..., 
  hasKeywords: ..., 
  keywords: ..., 
};

// Call the `createQuoteItemTemplateWithUnitRef()` function to get a reference to the mutation.
const ref = createQuoteItemTemplateWithUnitRef(createQuoteItemTemplateWithUnitVars);
// Variables can be defined inline as well.
const ref = createQuoteItemTemplateWithUnitRef({ id: ..., name: ..., unit: ..., hasKeywords: ..., keywords: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQuoteItemTemplateWithUnitRef(dataConnect, createQuoteItemTemplateWithUnitVars);

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

## UpdateQuoteItemTemplateWithUnit
You can execute the `UpdateQuoteItemTemplateWithUnit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateQuoteItemTemplateWithUnit(vars: UpdateQuoteItemTemplateWithUnitVariables): MutationPromise<UpdateQuoteItemTemplateWithUnitData, UpdateQuoteItemTemplateWithUnitVariables>;

interface UpdateQuoteItemTemplateWithUnitRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuoteItemTemplateWithUnitVariables): MutationRef<UpdateQuoteItemTemplateWithUnitData, UpdateQuoteItemTemplateWithUnitVariables>;
}
export const updateQuoteItemTemplateWithUnitRef: UpdateQuoteItemTemplateWithUnitRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateQuoteItemTemplateWithUnit(dc: DataConnect, vars: UpdateQuoteItemTemplateWithUnitVariables): MutationPromise<UpdateQuoteItemTemplateWithUnitData, UpdateQuoteItemTemplateWithUnitVariables>;

interface UpdateQuoteItemTemplateWithUnitRef {
  ...
  (dc: DataConnect, vars: UpdateQuoteItemTemplateWithUnitVariables): MutationRef<UpdateQuoteItemTemplateWithUnitData, UpdateQuoteItemTemplateWithUnitVariables>;
}
export const updateQuoteItemTemplateWithUnitRef: UpdateQuoteItemTemplateWithUnitRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateQuoteItemTemplateWithUnitRef:
```typescript
const name = updateQuoteItemTemplateWithUnitRef.operationName;
console.log(name);
```

### Variables
The `UpdateQuoteItemTemplateWithUnit` mutation requires an argument of type `UpdateQuoteItemTemplateWithUnitVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateQuoteItemTemplateWithUnitVariables {
  id: UUIDString;
  name: string;
  unit: string;
  hasKeywords: boolean;
  keywords: string[];
}
```
### Return Type
Recall that executing the `UpdateQuoteItemTemplateWithUnit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateQuoteItemTemplateWithUnitData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateQuoteItemTemplateWithUnitData {
  quoteItemTemplate_update?: QuoteItemTemplate_Key | null;
}
```
### Using `UpdateQuoteItemTemplateWithUnit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateQuoteItemTemplateWithUnit, UpdateQuoteItemTemplateWithUnitVariables } from '@generated/data-connector-web';

// The `UpdateQuoteItemTemplateWithUnit` mutation requires an argument of type `UpdateQuoteItemTemplateWithUnitVariables`:
const updateQuoteItemTemplateWithUnitVars: UpdateQuoteItemTemplateWithUnitVariables = {
  id: ..., 
  name: ..., 
  unit: ..., 
  hasKeywords: ..., 
  keywords: ..., 
};

// Call the `updateQuoteItemTemplateWithUnit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateQuoteItemTemplateWithUnit(updateQuoteItemTemplateWithUnitVars);
// Variables can be defined inline as well.
const { data } = await updateQuoteItemTemplateWithUnit({ id: ..., name: ..., unit: ..., hasKeywords: ..., keywords: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateQuoteItemTemplateWithUnit(dataConnect, updateQuoteItemTemplateWithUnitVars);

console.log(data.quoteItemTemplate_update);

// Or, you can use the `Promise` API.
updateQuoteItemTemplateWithUnit(updateQuoteItemTemplateWithUnitVars).then((response) => {
  const data = response.data;
  console.log(data.quoteItemTemplate_update);
});
```

### Using `UpdateQuoteItemTemplateWithUnit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateQuoteItemTemplateWithUnitRef, UpdateQuoteItemTemplateWithUnitVariables } from '@generated/data-connector-web';

// The `UpdateQuoteItemTemplateWithUnit` mutation requires an argument of type `UpdateQuoteItemTemplateWithUnitVariables`:
const updateQuoteItemTemplateWithUnitVars: UpdateQuoteItemTemplateWithUnitVariables = {
  id: ..., 
  name: ..., 
  unit: ..., 
  hasKeywords: ..., 
  keywords: ..., 
};

// Call the `updateQuoteItemTemplateWithUnitRef()` function to get a reference to the mutation.
const ref = updateQuoteItemTemplateWithUnitRef(updateQuoteItemTemplateWithUnitVars);
// Variables can be defined inline as well.
const ref = updateQuoteItemTemplateWithUnitRef({ id: ..., name: ..., unit: ..., hasKeywords: ..., keywords: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateQuoteItemTemplateWithUnitRef(dataConnect, updateQuoteItemTemplateWithUnitVars);

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

## UpdateQuoteDetails
You can execute the `UpdateQuoteDetails` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateQuoteDetails(vars: UpdateQuoteDetailsVariables): MutationPromise<UpdateQuoteDetailsData, UpdateQuoteDetailsVariables>;

interface UpdateQuoteDetailsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuoteDetailsVariables): MutationRef<UpdateQuoteDetailsData, UpdateQuoteDetailsVariables>;
}
export const updateQuoteDetailsRef: UpdateQuoteDetailsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateQuoteDetails(dc: DataConnect, vars: UpdateQuoteDetailsVariables): MutationPromise<UpdateQuoteDetailsData, UpdateQuoteDetailsVariables>;

interface UpdateQuoteDetailsRef {
  ...
  (dc: DataConnect, vars: UpdateQuoteDetailsVariables): MutationRef<UpdateQuoteDetailsData, UpdateQuoteDetailsVariables>;
}
export const updateQuoteDetailsRef: UpdateQuoteDetailsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateQuoteDetailsRef:
```typescript
const name = updateQuoteDetailsRef.operationName;
console.log(name);
```

### Variables
The `UpdateQuoteDetails` mutation requires an argument of type `UpdateQuoteDetailsVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateQuoteDetailsVariables {
  id: UUIDString;
  reference?: string | null;
}
```
### Return Type
Recall that executing the `UpdateQuoteDetails` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateQuoteDetailsData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateQuoteDetailsData {
  quote_update?: Quote_Key | null;
}
```
### Using `UpdateQuoteDetails`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateQuoteDetails, UpdateQuoteDetailsVariables } from '@generated/data-connector-web';

// The `UpdateQuoteDetails` mutation requires an argument of type `UpdateQuoteDetailsVariables`:
const updateQuoteDetailsVars: UpdateQuoteDetailsVariables = {
  id: ..., 
  reference: ..., // optional
};

// Call the `updateQuoteDetails()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateQuoteDetails(updateQuoteDetailsVars);
// Variables can be defined inline as well.
const { data } = await updateQuoteDetails({ id: ..., reference: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateQuoteDetails(dataConnect, updateQuoteDetailsVars);

console.log(data.quote_update);

// Or, you can use the `Promise` API.
updateQuoteDetails(updateQuoteDetailsVars).then((response) => {
  const data = response.data;
  console.log(data.quote_update);
});
```

### Using `UpdateQuoteDetails`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateQuoteDetailsRef, UpdateQuoteDetailsVariables } from '@generated/data-connector-web';

// The `UpdateQuoteDetails` mutation requires an argument of type `UpdateQuoteDetailsVariables`:
const updateQuoteDetailsVars: UpdateQuoteDetailsVariables = {
  id: ..., 
  reference: ..., // optional
};

// Call the `updateQuoteDetailsRef()` function to get a reference to the mutation.
const ref = updateQuoteDetailsRef(updateQuoteDetailsVars);
// Variables can be defined inline as well.
const ref = updateQuoteDetailsRef({ id: ..., reference: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateQuoteDetailsRef(dataConnect, updateQuoteDetailsVars);

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

## UpdateQuoteItem
You can execute the `UpdateQuoteItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateQuoteItem(vars: UpdateQuoteItemVariables): MutationPromise<UpdateQuoteItemData, UpdateQuoteItemVariables>;

interface UpdateQuoteItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuoteItemVariables): MutationRef<UpdateQuoteItemData, UpdateQuoteItemVariables>;
}
export const updateQuoteItemRef: UpdateQuoteItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateQuoteItem(dc: DataConnect, vars: UpdateQuoteItemVariables): MutationPromise<UpdateQuoteItemData, UpdateQuoteItemVariables>;

interface UpdateQuoteItemRef {
  ...
  (dc: DataConnect, vars: UpdateQuoteItemVariables): MutationRef<UpdateQuoteItemData, UpdateQuoteItemVariables>;
}
export const updateQuoteItemRef: UpdateQuoteItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateQuoteItemRef:
```typescript
const name = updateQuoteItemRef.operationName;
console.log(name);
```

### Variables
The `UpdateQuoteItem` mutation requires an argument of type `UpdateQuoteItemVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateQuoteItemVariables {
  id: UUIDString;
  displayOrder: number;
  name: string;
  quantity: number;
  unit?: string | null;
  unitPriceCents: number;
}
```
### Return Type
Recall that executing the `UpdateQuoteItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateQuoteItemData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateQuoteItemData {
  quoteItem_update?: QuoteItem_Key | null;
}
```
### Using `UpdateQuoteItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateQuoteItem, UpdateQuoteItemVariables } from '@generated/data-connector-web';

// The `UpdateQuoteItem` mutation requires an argument of type `UpdateQuoteItemVariables`:
const updateQuoteItemVars: UpdateQuoteItemVariables = {
  id: ..., 
  displayOrder: ..., 
  name: ..., 
  quantity: ..., 
  unit: ..., // optional
  unitPriceCents: ..., 
};

// Call the `updateQuoteItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateQuoteItem(updateQuoteItemVars);
// Variables can be defined inline as well.
const { data } = await updateQuoteItem({ id: ..., displayOrder: ..., name: ..., quantity: ..., unit: ..., unitPriceCents: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateQuoteItem(dataConnect, updateQuoteItemVars);

console.log(data.quoteItem_update);

// Or, you can use the `Promise` API.
updateQuoteItem(updateQuoteItemVars).then((response) => {
  const data = response.data;
  console.log(data.quoteItem_update);
});
```

### Using `UpdateQuoteItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateQuoteItemRef, UpdateQuoteItemVariables } from '@generated/data-connector-web';

// The `UpdateQuoteItem` mutation requires an argument of type `UpdateQuoteItemVariables`:
const updateQuoteItemVars: UpdateQuoteItemVariables = {
  id: ..., 
  displayOrder: ..., 
  name: ..., 
  quantity: ..., 
  unit: ..., // optional
  unitPriceCents: ..., 
};

// Call the `updateQuoteItemRef()` function to get a reference to the mutation.
const ref = updateQuoteItemRef(updateQuoteItemVars);
// Variables can be defined inline as well.
const ref = updateQuoteItemRef({ id: ..., displayOrder: ..., name: ..., quantity: ..., unit: ..., unitPriceCents: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateQuoteItemRef(dataConnect, updateQuoteItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quoteItem_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteItem_update);
});
```

## CreateQuoteItemWithUnit
You can execute the `CreateQuoteItemWithUnit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createQuoteItemWithUnit(vars: CreateQuoteItemWithUnitVariables): MutationPromise<CreateQuoteItemWithUnitData, CreateQuoteItemWithUnitVariables>;

interface CreateQuoteItemWithUnitRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuoteItemWithUnitVariables): MutationRef<CreateQuoteItemWithUnitData, CreateQuoteItemWithUnitVariables>;
}
export const createQuoteItemWithUnitRef: CreateQuoteItemWithUnitRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createQuoteItemWithUnit(dc: DataConnect, vars: CreateQuoteItemWithUnitVariables): MutationPromise<CreateQuoteItemWithUnitData, CreateQuoteItemWithUnitVariables>;

interface CreateQuoteItemWithUnitRef {
  ...
  (dc: DataConnect, vars: CreateQuoteItemWithUnitVariables): MutationRef<CreateQuoteItemWithUnitData, CreateQuoteItemWithUnitVariables>;
}
export const createQuoteItemWithUnitRef: CreateQuoteItemWithUnitRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQuoteItemWithUnitRef:
```typescript
const name = createQuoteItemWithUnitRef.operationName;
console.log(name);
```

### Variables
The `CreateQuoteItemWithUnit` mutation requires an argument of type `CreateQuoteItemWithUnitVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateQuoteItemWithUnitVariables {
  id: UUIDString;
  quoteId: UUIDString;
  displayOrder: number;
  name: string;
  quantity: number;
  unit: string;
  unitPriceCents: number;
}
```
### Return Type
Recall that executing the `CreateQuoteItemWithUnit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQuoteItemWithUnitData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateQuoteItemWithUnitData {
  quoteItem_insert: QuoteItem_Key;
}
```
### Using `CreateQuoteItemWithUnit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQuoteItemWithUnit, CreateQuoteItemWithUnitVariables } from '@generated/data-connector-web';

// The `CreateQuoteItemWithUnit` mutation requires an argument of type `CreateQuoteItemWithUnitVariables`:
const createQuoteItemWithUnitVars: CreateQuoteItemWithUnitVariables = {
  id: ..., 
  quoteId: ..., 
  displayOrder: ..., 
  name: ..., 
  quantity: ..., 
  unit: ..., 
  unitPriceCents: ..., 
};

// Call the `createQuoteItemWithUnit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuoteItemWithUnit(createQuoteItemWithUnitVars);
// Variables can be defined inline as well.
const { data } = await createQuoteItemWithUnit({ id: ..., quoteId: ..., displayOrder: ..., name: ..., quantity: ..., unit: ..., unitPriceCents: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQuoteItemWithUnit(dataConnect, createQuoteItemWithUnitVars);

console.log(data.quoteItem_insert);

// Or, you can use the `Promise` API.
createQuoteItemWithUnit(createQuoteItemWithUnitVars).then((response) => {
  const data = response.data;
  console.log(data.quoteItem_insert);
});
```

### Using `CreateQuoteItemWithUnit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQuoteItemWithUnitRef, CreateQuoteItemWithUnitVariables } from '@generated/data-connector-web';

// The `CreateQuoteItemWithUnit` mutation requires an argument of type `CreateQuoteItemWithUnitVariables`:
const createQuoteItemWithUnitVars: CreateQuoteItemWithUnitVariables = {
  id: ..., 
  quoteId: ..., 
  displayOrder: ..., 
  name: ..., 
  quantity: ..., 
  unit: ..., 
  unitPriceCents: ..., 
};

// Call the `createQuoteItemWithUnitRef()` function to get a reference to the mutation.
const ref = createQuoteItemWithUnitRef(createQuoteItemWithUnitVars);
// Variables can be defined inline as well.
const ref = createQuoteItemWithUnitRef({ id: ..., quoteId: ..., displayOrder: ..., name: ..., quantity: ..., unit: ..., unitPriceCents: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQuoteItemWithUnitRef(dataConnect, createQuoteItemWithUnitVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quoteItem_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteItem_insert);
});
```

## DeleteQuoteItem
You can execute the `DeleteQuoteItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
deleteQuoteItem(vars: DeleteQuoteItemVariables): MutationPromise<DeleteQuoteItemData, DeleteQuoteItemVariables>;

interface DeleteQuoteItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQuoteItemVariables): MutationRef<DeleteQuoteItemData, DeleteQuoteItemVariables>;
}
export const deleteQuoteItemRef: DeleteQuoteItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteQuoteItem(dc: DataConnect, vars: DeleteQuoteItemVariables): MutationPromise<DeleteQuoteItemData, DeleteQuoteItemVariables>;

interface DeleteQuoteItemRef {
  ...
  (dc: DataConnect, vars: DeleteQuoteItemVariables): MutationRef<DeleteQuoteItemData, DeleteQuoteItemVariables>;
}
export const deleteQuoteItemRef: DeleteQuoteItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteQuoteItemRef:
```typescript
const name = deleteQuoteItemRef.operationName;
console.log(name);
```

### Variables
The `DeleteQuoteItem` mutation requires an argument of type `DeleteQuoteItemVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteQuoteItemVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteQuoteItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteQuoteItemData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteQuoteItemData {
  quoteItem_delete?: QuoteItem_Key | null;
}
```
### Using `DeleteQuoteItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteQuoteItem, DeleteQuoteItemVariables } from '@generated/data-connector-web';

// The `DeleteQuoteItem` mutation requires an argument of type `DeleteQuoteItemVariables`:
const deleteQuoteItemVars: DeleteQuoteItemVariables = {
  id: ..., 
};

// Call the `deleteQuoteItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteQuoteItem(deleteQuoteItemVars);
// Variables can be defined inline as well.
const { data } = await deleteQuoteItem({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteQuoteItem(dataConnect, deleteQuoteItemVars);

console.log(data.quoteItem_delete);

// Or, you can use the `Promise` API.
deleteQuoteItem(deleteQuoteItemVars).then((response) => {
  const data = response.data;
  console.log(data.quoteItem_delete);
});
```

### Using `DeleteQuoteItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteQuoteItemRef, DeleteQuoteItemVariables } from '@generated/data-connector-web';

// The `DeleteQuoteItem` mutation requires an argument of type `DeleteQuoteItemVariables`:
const deleteQuoteItemVars: DeleteQuoteItemVariables = {
  id: ..., 
};

// Call the `deleteQuoteItemRef()` function to get a reference to the mutation.
const ref = deleteQuoteItemRef(deleteQuoteItemVars);
// Variables can be defined inline as well.
const ref = deleteQuoteItemRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteQuoteItemRef(dataConnect, deleteQuoteItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quoteItem_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteItem_delete);
});
```

## CreateQuoteWithItems
You can execute the `CreateQuoteWithItems` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createQuoteWithItems(vars: CreateQuoteWithItemsVariables): MutationPromise<CreateQuoteWithItemsData, CreateQuoteWithItemsVariables>;

interface CreateQuoteWithItemsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuoteWithItemsVariables): MutationRef<CreateQuoteWithItemsData, CreateQuoteWithItemsVariables>;
}
export const createQuoteWithItemsRef: CreateQuoteWithItemsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createQuoteWithItems(dc: DataConnect, vars: CreateQuoteWithItemsVariables): MutationPromise<CreateQuoteWithItemsData, CreateQuoteWithItemsVariables>;

interface CreateQuoteWithItemsRef {
  ...
  (dc: DataConnect, vars: CreateQuoteWithItemsVariables): MutationRef<CreateQuoteWithItemsData, CreateQuoteWithItemsVariables>;
}
export const createQuoteWithItemsRef: CreateQuoteWithItemsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQuoteWithItemsRef:
```typescript
const name = createQuoteWithItemsRef.operationName;
console.log(name);
```

### Variables
The `CreateQuoteWithItems` mutation requires an argument of type `CreateQuoteWithItemsVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateQuoteWithItemsVariables {
  projectId: UUIDString;
  quoteId: UUIDString;
  includeItem1?: boolean | null;
  item1Name?: string | null;
  item1DisplayOrder?: number | null;
  item1Quantity?: number | null;
  item1Unit?: string | null;
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
  item2Unit?: string | null;
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
  item3Unit?: string | null;
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
  item4Unit?: string | null;
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
  item5Unit?: string | null;
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
  item6Unit?: string | null;
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
  item7Unit?: string | null;
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
  item8Unit?: string | null;
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
  item9Unit?: string | null;
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
  item10Unit?: string | null;
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
  item11Unit?: string | null;
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
  item12Unit?: string | null;
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
  item13Unit?: string | null;
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
  item14Unit?: string | null;
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
  item15Unit?: string | null;
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
  item16Unit?: string | null;
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
  item17Unit?: string | null;
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
  item18Unit?: string | null;
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
  item19Unit?: string | null;
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
  item20Unit?: string | null;
  item20SourceTemplateId?: UUIDString | null;
  item20QuantitySourceId?: UUIDString | null;
  item20UnitPriceCents?: number | null;
  item20MaterialUnitPriceCents?: number | null;
  item20LabourUnitPriceCents?: number | null;
  item20MatchedKeywords?: string[];
}
```
### Return Type
Recall that executing the `CreateQuoteWithItems` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQuoteWithItemsData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `CreateQuoteWithItems`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQuoteWithItems, CreateQuoteWithItemsVariables } from '@generated/data-connector-web';

// The `CreateQuoteWithItems` mutation requires an argument of type `CreateQuoteWithItemsVariables`:
const createQuoteWithItemsVars: CreateQuoteWithItemsVariables = {
  projectId: ..., 
  quoteId: ..., 
  includeItem1: ..., // optional
  item1Name: ..., // optional
  item1DisplayOrder: ..., // optional
  item1Quantity: ..., // optional
  item1Unit: ..., // optional
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
  item2Unit: ..., // optional
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
  item3Unit: ..., // optional
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
  item4Unit: ..., // optional
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
  item5Unit: ..., // optional
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
  item6Unit: ..., // optional
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
  item7Unit: ..., // optional
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
  item8Unit: ..., // optional
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
  item9Unit: ..., // optional
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
  item10Unit: ..., // optional
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
  item11Unit: ..., // optional
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
  item12Unit: ..., // optional
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
  item13Unit: ..., // optional
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
  item14Unit: ..., // optional
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
  item15Unit: ..., // optional
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
  item16Unit: ..., // optional
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
  item17Unit: ..., // optional
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
  item18Unit: ..., // optional
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
  item19Unit: ..., // optional
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
  item20Unit: ..., // optional
  item20SourceTemplateId: ..., // optional
  item20QuantitySourceId: ..., // optional
  item20UnitPriceCents: ..., // optional
  item20MaterialUnitPriceCents: ..., // optional
  item20LabourUnitPriceCents: ..., // optional
  item20MatchedKeywords: ..., // optional
};

// Call the `createQuoteWithItems()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuoteWithItems(createQuoteWithItemsVars);
// Variables can be defined inline as well.
const { data } = await createQuoteWithItems({ projectId: ..., quoteId: ..., includeItem1: ..., item1Name: ..., item1DisplayOrder: ..., item1Quantity: ..., item1Unit: ..., item1SourceTemplateId: ..., item1QuantitySourceId: ..., item1UnitPriceCents: ..., item1MaterialUnitPriceCents: ..., item1LabourUnitPriceCents: ..., item1MatchedKeywords: ..., includeItem2: ..., item2Name: ..., item2DisplayOrder: ..., item2Quantity: ..., item2Unit: ..., item2SourceTemplateId: ..., item2QuantitySourceId: ..., item2UnitPriceCents: ..., item2MaterialUnitPriceCents: ..., item2LabourUnitPriceCents: ..., item2MatchedKeywords: ..., includeItem3: ..., item3Name: ..., item3DisplayOrder: ..., item3Quantity: ..., item3Unit: ..., item3SourceTemplateId: ..., item3QuantitySourceId: ..., item3UnitPriceCents: ..., item3MaterialUnitPriceCents: ..., item3LabourUnitPriceCents: ..., item3MatchedKeywords: ..., includeItem4: ..., item4Name: ..., item4DisplayOrder: ..., item4Quantity: ..., item4Unit: ..., item4SourceTemplateId: ..., item4QuantitySourceId: ..., item4UnitPriceCents: ..., item4MaterialUnitPriceCents: ..., item4LabourUnitPriceCents: ..., item4MatchedKeywords: ..., includeItem5: ..., item5Name: ..., item5DisplayOrder: ..., item5Quantity: ..., item5Unit: ..., item5SourceTemplateId: ..., item5QuantitySourceId: ..., item5UnitPriceCents: ..., item5MaterialUnitPriceCents: ..., item5LabourUnitPriceCents: ..., item5MatchedKeywords: ..., includeItem6: ..., item6Name: ..., item6DisplayOrder: ..., item6Quantity: ..., item6Unit: ..., item6SourceTemplateId: ..., item6QuantitySourceId: ..., item6UnitPriceCents: ..., item6MaterialUnitPriceCents: ..., item6LabourUnitPriceCents: ..., item6MatchedKeywords: ..., includeItem7: ..., item7Name: ..., item7DisplayOrder: ..., item7Quantity: ..., item7Unit: ..., item7SourceTemplateId: ..., item7QuantitySourceId: ..., item7UnitPriceCents: ..., item7MaterialUnitPriceCents: ..., item7LabourUnitPriceCents: ..., item7MatchedKeywords: ..., includeItem8: ..., item8Name: ..., item8DisplayOrder: ..., item8Quantity: ..., item8Unit: ..., item8SourceTemplateId: ..., item8QuantitySourceId: ..., item8UnitPriceCents: ..., item8MaterialUnitPriceCents: ..., item8LabourUnitPriceCents: ..., item8MatchedKeywords: ..., includeItem9: ..., item9Name: ..., item9DisplayOrder: ..., item9Quantity: ..., item9Unit: ..., item9SourceTemplateId: ..., item9QuantitySourceId: ..., item9UnitPriceCents: ..., item9MaterialUnitPriceCents: ..., item9LabourUnitPriceCents: ..., item9MatchedKeywords: ..., includeItem10: ..., item10Name: ..., item10DisplayOrder: ..., item10Quantity: ..., item10Unit: ..., item10SourceTemplateId: ..., item10QuantitySourceId: ..., item10UnitPriceCents: ..., item10MaterialUnitPriceCents: ..., item10LabourUnitPriceCents: ..., item10MatchedKeywords: ..., includeItem11: ..., item11Name: ..., item11DisplayOrder: ..., item11Quantity: ..., item11Unit: ..., item11SourceTemplateId: ..., item11QuantitySourceId: ..., item11UnitPriceCents: ..., item11MaterialUnitPriceCents: ..., item11LabourUnitPriceCents: ..., item11MatchedKeywords: ..., includeItem12: ..., item12Name: ..., item12DisplayOrder: ..., item12Quantity: ..., item12Unit: ..., item12SourceTemplateId: ..., item12QuantitySourceId: ..., item12UnitPriceCents: ..., item12MaterialUnitPriceCents: ..., item12LabourUnitPriceCents: ..., item12MatchedKeywords: ..., includeItem13: ..., item13Name: ..., item13DisplayOrder: ..., item13Quantity: ..., item13Unit: ..., item13SourceTemplateId: ..., item13QuantitySourceId: ..., item13UnitPriceCents: ..., item13MaterialUnitPriceCents: ..., item13LabourUnitPriceCents: ..., item13MatchedKeywords: ..., includeItem14: ..., item14Name: ..., item14DisplayOrder: ..., item14Quantity: ..., item14Unit: ..., item14SourceTemplateId: ..., item14QuantitySourceId: ..., item14UnitPriceCents: ..., item14MaterialUnitPriceCents: ..., item14LabourUnitPriceCents: ..., item14MatchedKeywords: ..., includeItem15: ..., item15Name: ..., item15DisplayOrder: ..., item15Quantity: ..., item15Unit: ..., item15SourceTemplateId: ..., item15QuantitySourceId: ..., item15UnitPriceCents: ..., item15MaterialUnitPriceCents: ..., item15LabourUnitPriceCents: ..., item15MatchedKeywords: ..., includeItem16: ..., item16Name: ..., item16DisplayOrder: ..., item16Quantity: ..., item16Unit: ..., item16SourceTemplateId: ..., item16QuantitySourceId: ..., item16UnitPriceCents: ..., item16MaterialUnitPriceCents: ..., item16LabourUnitPriceCents: ..., item16MatchedKeywords: ..., includeItem17: ..., item17Name: ..., item17DisplayOrder: ..., item17Quantity: ..., item17Unit: ..., item17SourceTemplateId: ..., item17QuantitySourceId: ..., item17UnitPriceCents: ..., item17MaterialUnitPriceCents: ..., item17LabourUnitPriceCents: ..., item17MatchedKeywords: ..., includeItem18: ..., item18Name: ..., item18DisplayOrder: ..., item18Quantity: ..., item18Unit: ..., item18SourceTemplateId: ..., item18QuantitySourceId: ..., item18UnitPriceCents: ..., item18MaterialUnitPriceCents: ..., item18LabourUnitPriceCents: ..., item18MatchedKeywords: ..., includeItem19: ..., item19Name: ..., item19DisplayOrder: ..., item19Quantity: ..., item19Unit: ..., item19SourceTemplateId: ..., item19QuantitySourceId: ..., item19UnitPriceCents: ..., item19MaterialUnitPriceCents: ..., item19LabourUnitPriceCents: ..., item19MatchedKeywords: ..., includeItem20: ..., item20Name: ..., item20DisplayOrder: ..., item20Quantity: ..., item20Unit: ..., item20SourceTemplateId: ..., item20QuantitySourceId: ..., item20UnitPriceCents: ..., item20MaterialUnitPriceCents: ..., item20LabourUnitPriceCents: ..., item20MatchedKeywords: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQuoteWithItems(dataConnect, createQuoteWithItemsVars);

console.log(data.quoteItem_deleteMany);
console.log(data.quote_deleteMany);
console.log(data.quote_insert);
console.log(data.item1);
console.log(data.item2);
console.log(data.item3);
console.log(data.item4);
console.log(data.item5);
console.log(data.item6);
console.log(data.item7);
console.log(data.item8);
console.log(data.item9);
console.log(data.item10);
console.log(data.item11);
console.log(data.item12);
console.log(data.item13);
console.log(data.item14);
console.log(data.item15);
console.log(data.item16);
console.log(data.item17);
console.log(data.item18);
console.log(data.item19);
console.log(data.item20);

// Or, you can use the `Promise` API.
createQuoteWithItems(createQuoteWithItemsVars).then((response) => {
  const data = response.data;
  console.log(data.quoteItem_deleteMany);
  console.log(data.quote_deleteMany);
  console.log(data.quote_insert);
  console.log(data.item1);
  console.log(data.item2);
  console.log(data.item3);
  console.log(data.item4);
  console.log(data.item5);
  console.log(data.item6);
  console.log(data.item7);
  console.log(data.item8);
  console.log(data.item9);
  console.log(data.item10);
  console.log(data.item11);
  console.log(data.item12);
  console.log(data.item13);
  console.log(data.item14);
  console.log(data.item15);
  console.log(data.item16);
  console.log(data.item17);
  console.log(data.item18);
  console.log(data.item19);
  console.log(data.item20);
});
```

### Using `CreateQuoteWithItems`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQuoteWithItemsRef, CreateQuoteWithItemsVariables } from '@generated/data-connector-web';

// The `CreateQuoteWithItems` mutation requires an argument of type `CreateQuoteWithItemsVariables`:
const createQuoteWithItemsVars: CreateQuoteWithItemsVariables = {
  projectId: ..., 
  quoteId: ..., 
  includeItem1: ..., // optional
  item1Name: ..., // optional
  item1DisplayOrder: ..., // optional
  item1Quantity: ..., // optional
  item1Unit: ..., // optional
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
  item2Unit: ..., // optional
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
  item3Unit: ..., // optional
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
  item4Unit: ..., // optional
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
  item5Unit: ..., // optional
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
  item6Unit: ..., // optional
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
  item7Unit: ..., // optional
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
  item8Unit: ..., // optional
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
  item9Unit: ..., // optional
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
  item10Unit: ..., // optional
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
  item11Unit: ..., // optional
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
  item12Unit: ..., // optional
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
  item13Unit: ..., // optional
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
  item14Unit: ..., // optional
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
  item15Unit: ..., // optional
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
  item16Unit: ..., // optional
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
  item17Unit: ..., // optional
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
  item18Unit: ..., // optional
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
  item19Unit: ..., // optional
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
  item20Unit: ..., // optional
  item20SourceTemplateId: ..., // optional
  item20QuantitySourceId: ..., // optional
  item20UnitPriceCents: ..., // optional
  item20MaterialUnitPriceCents: ..., // optional
  item20LabourUnitPriceCents: ..., // optional
  item20MatchedKeywords: ..., // optional
};

// Call the `createQuoteWithItemsRef()` function to get a reference to the mutation.
const ref = createQuoteWithItemsRef(createQuoteWithItemsVars);
// Variables can be defined inline as well.
const ref = createQuoteWithItemsRef({ projectId: ..., quoteId: ..., includeItem1: ..., item1Name: ..., item1DisplayOrder: ..., item1Quantity: ..., item1Unit: ..., item1SourceTemplateId: ..., item1QuantitySourceId: ..., item1UnitPriceCents: ..., item1MaterialUnitPriceCents: ..., item1LabourUnitPriceCents: ..., item1MatchedKeywords: ..., includeItem2: ..., item2Name: ..., item2DisplayOrder: ..., item2Quantity: ..., item2Unit: ..., item2SourceTemplateId: ..., item2QuantitySourceId: ..., item2UnitPriceCents: ..., item2MaterialUnitPriceCents: ..., item2LabourUnitPriceCents: ..., item2MatchedKeywords: ..., includeItem3: ..., item3Name: ..., item3DisplayOrder: ..., item3Quantity: ..., item3Unit: ..., item3SourceTemplateId: ..., item3QuantitySourceId: ..., item3UnitPriceCents: ..., item3MaterialUnitPriceCents: ..., item3LabourUnitPriceCents: ..., item3MatchedKeywords: ..., includeItem4: ..., item4Name: ..., item4DisplayOrder: ..., item4Quantity: ..., item4Unit: ..., item4SourceTemplateId: ..., item4QuantitySourceId: ..., item4UnitPriceCents: ..., item4MaterialUnitPriceCents: ..., item4LabourUnitPriceCents: ..., item4MatchedKeywords: ..., includeItem5: ..., item5Name: ..., item5DisplayOrder: ..., item5Quantity: ..., item5Unit: ..., item5SourceTemplateId: ..., item5QuantitySourceId: ..., item5UnitPriceCents: ..., item5MaterialUnitPriceCents: ..., item5LabourUnitPriceCents: ..., item5MatchedKeywords: ..., includeItem6: ..., item6Name: ..., item6DisplayOrder: ..., item6Quantity: ..., item6Unit: ..., item6SourceTemplateId: ..., item6QuantitySourceId: ..., item6UnitPriceCents: ..., item6MaterialUnitPriceCents: ..., item6LabourUnitPriceCents: ..., item6MatchedKeywords: ..., includeItem7: ..., item7Name: ..., item7DisplayOrder: ..., item7Quantity: ..., item7Unit: ..., item7SourceTemplateId: ..., item7QuantitySourceId: ..., item7UnitPriceCents: ..., item7MaterialUnitPriceCents: ..., item7LabourUnitPriceCents: ..., item7MatchedKeywords: ..., includeItem8: ..., item8Name: ..., item8DisplayOrder: ..., item8Quantity: ..., item8Unit: ..., item8SourceTemplateId: ..., item8QuantitySourceId: ..., item8UnitPriceCents: ..., item8MaterialUnitPriceCents: ..., item8LabourUnitPriceCents: ..., item8MatchedKeywords: ..., includeItem9: ..., item9Name: ..., item9DisplayOrder: ..., item9Quantity: ..., item9Unit: ..., item9SourceTemplateId: ..., item9QuantitySourceId: ..., item9UnitPriceCents: ..., item9MaterialUnitPriceCents: ..., item9LabourUnitPriceCents: ..., item9MatchedKeywords: ..., includeItem10: ..., item10Name: ..., item10DisplayOrder: ..., item10Quantity: ..., item10Unit: ..., item10SourceTemplateId: ..., item10QuantitySourceId: ..., item10UnitPriceCents: ..., item10MaterialUnitPriceCents: ..., item10LabourUnitPriceCents: ..., item10MatchedKeywords: ..., includeItem11: ..., item11Name: ..., item11DisplayOrder: ..., item11Quantity: ..., item11Unit: ..., item11SourceTemplateId: ..., item11QuantitySourceId: ..., item11UnitPriceCents: ..., item11MaterialUnitPriceCents: ..., item11LabourUnitPriceCents: ..., item11MatchedKeywords: ..., includeItem12: ..., item12Name: ..., item12DisplayOrder: ..., item12Quantity: ..., item12Unit: ..., item12SourceTemplateId: ..., item12QuantitySourceId: ..., item12UnitPriceCents: ..., item12MaterialUnitPriceCents: ..., item12LabourUnitPriceCents: ..., item12MatchedKeywords: ..., includeItem13: ..., item13Name: ..., item13DisplayOrder: ..., item13Quantity: ..., item13Unit: ..., item13SourceTemplateId: ..., item13QuantitySourceId: ..., item13UnitPriceCents: ..., item13MaterialUnitPriceCents: ..., item13LabourUnitPriceCents: ..., item13MatchedKeywords: ..., includeItem14: ..., item14Name: ..., item14DisplayOrder: ..., item14Quantity: ..., item14Unit: ..., item14SourceTemplateId: ..., item14QuantitySourceId: ..., item14UnitPriceCents: ..., item14MaterialUnitPriceCents: ..., item14LabourUnitPriceCents: ..., item14MatchedKeywords: ..., includeItem15: ..., item15Name: ..., item15DisplayOrder: ..., item15Quantity: ..., item15Unit: ..., item15SourceTemplateId: ..., item15QuantitySourceId: ..., item15UnitPriceCents: ..., item15MaterialUnitPriceCents: ..., item15LabourUnitPriceCents: ..., item15MatchedKeywords: ..., includeItem16: ..., item16Name: ..., item16DisplayOrder: ..., item16Quantity: ..., item16Unit: ..., item16SourceTemplateId: ..., item16QuantitySourceId: ..., item16UnitPriceCents: ..., item16MaterialUnitPriceCents: ..., item16LabourUnitPriceCents: ..., item16MatchedKeywords: ..., includeItem17: ..., item17Name: ..., item17DisplayOrder: ..., item17Quantity: ..., item17Unit: ..., item17SourceTemplateId: ..., item17QuantitySourceId: ..., item17UnitPriceCents: ..., item17MaterialUnitPriceCents: ..., item17LabourUnitPriceCents: ..., item17MatchedKeywords: ..., includeItem18: ..., item18Name: ..., item18DisplayOrder: ..., item18Quantity: ..., item18Unit: ..., item18SourceTemplateId: ..., item18QuantitySourceId: ..., item18UnitPriceCents: ..., item18MaterialUnitPriceCents: ..., item18LabourUnitPriceCents: ..., item18MatchedKeywords: ..., includeItem19: ..., item19Name: ..., item19DisplayOrder: ..., item19Quantity: ..., item19Unit: ..., item19SourceTemplateId: ..., item19QuantitySourceId: ..., item19UnitPriceCents: ..., item19MaterialUnitPriceCents: ..., item19LabourUnitPriceCents: ..., item19MatchedKeywords: ..., includeItem20: ..., item20Name: ..., item20DisplayOrder: ..., item20Quantity: ..., item20Unit: ..., item20SourceTemplateId: ..., item20QuantitySourceId: ..., item20UnitPriceCents: ..., item20MaterialUnitPriceCents: ..., item20LabourUnitPriceCents: ..., item20MatchedKeywords: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQuoteWithItemsRef(dataConnect, createQuoteWithItemsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quoteItem_deleteMany);
console.log(data.quote_deleteMany);
console.log(data.quote_insert);
console.log(data.item1);
console.log(data.item2);
console.log(data.item3);
console.log(data.item4);
console.log(data.item5);
console.log(data.item6);
console.log(data.item7);
console.log(data.item8);
console.log(data.item9);
console.log(data.item10);
console.log(data.item11);
console.log(data.item12);
console.log(data.item13);
console.log(data.item14);
console.log(data.item15);
console.log(data.item16);
console.log(data.item17);
console.log(data.item18);
console.log(data.item19);
console.log(data.item20);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteItem_deleteMany);
  console.log(data.quote_deleteMany);
  console.log(data.quote_insert);
  console.log(data.item1);
  console.log(data.item2);
  console.log(data.item3);
  console.log(data.item4);
  console.log(data.item5);
  console.log(data.item6);
  console.log(data.item7);
  console.log(data.item8);
  console.log(data.item9);
  console.log(data.item10);
  console.log(data.item11);
  console.log(data.item12);
  console.log(data.item13);
  console.log(data.item14);
  console.log(data.item15);
  console.log(data.item16);
  console.log(data.item17);
  console.log(data.item18);
  console.log(data.item19);
  console.log(data.item20);
});
```

## UpsertMyQuoteAppearance
You can execute the `UpsertMyQuoteAppearance` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
upsertMyQuoteAppearance(vars: UpsertMyQuoteAppearanceVariables): MutationPromise<UpsertMyQuoteAppearanceData, UpsertMyQuoteAppearanceVariables>;

interface UpsertMyQuoteAppearanceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertMyQuoteAppearanceVariables): MutationRef<UpsertMyQuoteAppearanceData, UpsertMyQuoteAppearanceVariables>;
}
export const upsertMyQuoteAppearanceRef: UpsertMyQuoteAppearanceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertMyQuoteAppearance(dc: DataConnect, vars: UpsertMyQuoteAppearanceVariables): MutationPromise<UpsertMyQuoteAppearanceData, UpsertMyQuoteAppearanceVariables>;

interface UpsertMyQuoteAppearanceRef {
  ...
  (dc: DataConnect, vars: UpsertMyQuoteAppearanceVariables): MutationRef<UpsertMyQuoteAppearanceData, UpsertMyQuoteAppearanceVariables>;
}
export const upsertMyQuoteAppearanceRef: UpsertMyQuoteAppearanceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertMyQuoteAppearanceRef:
```typescript
const name = upsertMyQuoteAppearanceRef.operationName;
console.log(name);
```

### Variables
The `UpsertMyQuoteAppearance` mutation requires an argument of type `UpsertMyQuoteAppearanceVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertMyQuoteAppearanceVariables {
  logoStoragePath?: string | null;
  businessName?: string | null;
  abn?: string | null;
  licenceNumber?: string | null;
  address?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  accentColor?: string | null;
  pricingDetail: string;
  showScopeOfWork: boolean;
  showTakeoffSummary: boolean;
  showSignatureBlock: boolean;
  validForDays: number;
  terms?: string | null;
}
```
### Return Type
Recall that executing the `UpsertMyQuoteAppearance` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertMyQuoteAppearanceData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertMyQuoteAppearanceData {
  quoteAppearance_upsert: QuoteAppearance_Key;
}
```
### Using `UpsertMyQuoteAppearance`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertMyQuoteAppearance, UpsertMyQuoteAppearanceVariables } from '@generated/data-connector-web';

// The `UpsertMyQuoteAppearance` mutation requires an argument of type `UpsertMyQuoteAppearanceVariables`:
const upsertMyQuoteAppearanceVars: UpsertMyQuoteAppearanceVariables = {
  logoStoragePath: ..., // optional
  businessName: ..., // optional
  abn: ..., // optional
  licenceNumber: ..., // optional
  address: ..., // optional
  phoneNumber: ..., // optional
  email: ..., // optional
  accentColor: ..., // optional
  pricingDetail: ..., 
  showScopeOfWork: ..., 
  showTakeoffSummary: ..., 
  showSignatureBlock: ..., 
  validForDays: ..., 
  terms: ..., // optional
};

// Call the `upsertMyQuoteAppearance()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertMyQuoteAppearance(upsertMyQuoteAppearanceVars);
// Variables can be defined inline as well.
const { data } = await upsertMyQuoteAppearance({ logoStoragePath: ..., businessName: ..., abn: ..., licenceNumber: ..., address: ..., phoneNumber: ..., email: ..., accentColor: ..., pricingDetail: ..., showScopeOfWork: ..., showTakeoffSummary: ..., showSignatureBlock: ..., validForDays: ..., terms: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertMyQuoteAppearance(dataConnect, upsertMyQuoteAppearanceVars);

console.log(data.quoteAppearance_upsert);

// Or, you can use the `Promise` API.
upsertMyQuoteAppearance(upsertMyQuoteAppearanceVars).then((response) => {
  const data = response.data;
  console.log(data.quoteAppearance_upsert);
});
```

### Using `UpsertMyQuoteAppearance`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertMyQuoteAppearanceRef, UpsertMyQuoteAppearanceVariables } from '@generated/data-connector-web';

// The `UpsertMyQuoteAppearance` mutation requires an argument of type `UpsertMyQuoteAppearanceVariables`:
const upsertMyQuoteAppearanceVars: UpsertMyQuoteAppearanceVariables = {
  logoStoragePath: ..., // optional
  businessName: ..., // optional
  abn: ..., // optional
  licenceNumber: ..., // optional
  address: ..., // optional
  phoneNumber: ..., // optional
  email: ..., // optional
  accentColor: ..., // optional
  pricingDetail: ..., 
  showScopeOfWork: ..., 
  showTakeoffSummary: ..., 
  showSignatureBlock: ..., 
  validForDays: ..., 
  terms: ..., // optional
};

// Call the `upsertMyQuoteAppearanceRef()` function to get a reference to the mutation.
const ref = upsertMyQuoteAppearanceRef(upsertMyQuoteAppearanceVars);
// Variables can be defined inline as well.
const ref = upsertMyQuoteAppearanceRef({ logoStoragePath: ..., businessName: ..., abn: ..., licenceNumber: ..., address: ..., phoneNumber: ..., email: ..., accentColor: ..., pricingDetail: ..., showScopeOfWork: ..., showTakeoffSummary: ..., showSignatureBlock: ..., validForDays: ..., terms: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertMyQuoteAppearanceRef(dataConnect, upsertMyQuoteAppearanceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quoteAppearance_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteAppearance_upsert);
});
```

## UpdateMyQuoteAppearanceLogo
You can execute the `UpdateMyQuoteAppearanceLogo` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateMyQuoteAppearanceLogo(vars?: UpdateMyQuoteAppearanceLogoVariables): MutationPromise<UpdateMyQuoteAppearanceLogoData, UpdateMyQuoteAppearanceLogoVariables>;

interface UpdateMyQuoteAppearanceLogoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateMyQuoteAppearanceLogoVariables): MutationRef<UpdateMyQuoteAppearanceLogoData, UpdateMyQuoteAppearanceLogoVariables>;
}
export const updateMyQuoteAppearanceLogoRef: UpdateMyQuoteAppearanceLogoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMyQuoteAppearanceLogo(dc: DataConnect, vars?: UpdateMyQuoteAppearanceLogoVariables): MutationPromise<UpdateMyQuoteAppearanceLogoData, UpdateMyQuoteAppearanceLogoVariables>;

interface UpdateMyQuoteAppearanceLogoRef {
  ...
  (dc: DataConnect, vars?: UpdateMyQuoteAppearanceLogoVariables): MutationRef<UpdateMyQuoteAppearanceLogoData, UpdateMyQuoteAppearanceLogoVariables>;
}
export const updateMyQuoteAppearanceLogoRef: UpdateMyQuoteAppearanceLogoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMyQuoteAppearanceLogoRef:
```typescript
const name = updateMyQuoteAppearanceLogoRef.operationName;
console.log(name);
```

### Variables
The `UpdateMyQuoteAppearanceLogo` mutation has an optional argument of type `UpdateMyQuoteAppearanceLogoVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMyQuoteAppearanceLogoVariables {
  logoStoragePath?: string | null;
}
```
### Return Type
Recall that executing the `UpdateMyQuoteAppearanceLogo` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMyQuoteAppearanceLogoData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMyQuoteAppearanceLogoData {
  quoteAppearance_upsert: QuoteAppearance_Key;
}
```
### Using `UpdateMyQuoteAppearanceLogo`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMyQuoteAppearanceLogo, UpdateMyQuoteAppearanceLogoVariables } from '@generated/data-connector-web';

// The `UpdateMyQuoteAppearanceLogo` mutation has an optional argument of type `UpdateMyQuoteAppearanceLogoVariables`:
const updateMyQuoteAppearanceLogoVars: UpdateMyQuoteAppearanceLogoVariables = {
  logoStoragePath: ..., // optional
};

// Call the `updateMyQuoteAppearanceLogo()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMyQuoteAppearanceLogo(updateMyQuoteAppearanceLogoVars);
// Variables can be defined inline as well.
const { data } = await updateMyQuoteAppearanceLogo({ logoStoragePath: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateMyQuoteAppearanceLogoVariables` argument.
const { data } = await updateMyQuoteAppearanceLogo();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMyQuoteAppearanceLogo(dataConnect, updateMyQuoteAppearanceLogoVars);

console.log(data.quoteAppearance_upsert);

// Or, you can use the `Promise` API.
updateMyQuoteAppearanceLogo(updateMyQuoteAppearanceLogoVars).then((response) => {
  const data = response.data;
  console.log(data.quoteAppearance_upsert);
});
```

### Using `UpdateMyQuoteAppearanceLogo`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMyQuoteAppearanceLogoRef, UpdateMyQuoteAppearanceLogoVariables } from '@generated/data-connector-web';

// The `UpdateMyQuoteAppearanceLogo` mutation has an optional argument of type `UpdateMyQuoteAppearanceLogoVariables`:
const updateMyQuoteAppearanceLogoVars: UpdateMyQuoteAppearanceLogoVariables = {
  logoStoragePath: ..., // optional
};

// Call the `updateMyQuoteAppearanceLogoRef()` function to get a reference to the mutation.
const ref = updateMyQuoteAppearanceLogoRef(updateMyQuoteAppearanceLogoVars);
// Variables can be defined inline as well.
const ref = updateMyQuoteAppearanceLogoRef({ logoStoragePath: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateMyQuoteAppearanceLogoVariables` argument.
const ref = updateMyQuoteAppearanceLogoRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMyQuoteAppearanceLogoRef(dataConnect, updateMyQuoteAppearanceLogoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quoteAppearance_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteAppearance_upsert);
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

