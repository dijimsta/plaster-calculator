# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `data-connector-web`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`data-connector-web/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListMyAccounts*](#listmyaccounts)
  - [*GetMyAccount*](#getmyaccount)
  - [*ListMyAccountContacts*](#listmyaccountcontacts)
  - [*ListQuestionnaireTemplates*](#listquestionnairetemplates)
  - [*GetQuestionnaireTemplate*](#getquestionnairetemplate)
  - [*GetProjectQuestionnaire*](#getprojectquestionnaire)
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
  - [*EnsureProjectQuestionnaire*](#ensureprojectquestionnaire)
  - [*ApplyQuestionnaireTemplateToProject*](#applyquestionnairetemplatetoproject)
  - [*CreateProjectQuestionnaireQuestion*](#createprojectquestionnairequestion)
  - [*UpdateProjectQuestionnaireQuestion*](#updateprojectquestionnairequestion)
  - [*UpdateProjectQuestionnaireQuestionAnswer*](#updateprojectquestionnairequestionanswer)
  - [*UpdateProjectQuestionnaireQuestionAnswerSource*](#updateprojectquestionnairequestionanswersource)
  - [*DeleteProjectQuestionnaireQuestion*](#deleteprojectquestionnairequestion)
  - [*UpsertMyUserSettings*](#upsertmyusersettings)

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

## ListMyAccounts
You can execute the `ListMyAccounts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
listMyAccounts(options?: ExecuteQueryOptions): QueryPromise<ListMyAccountsData, undefined>;

interface ListMyAccountsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyAccountsData, undefined>;
}
export const listMyAccountsRef: ListMyAccountsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyAccounts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyAccountsData, undefined>;

interface ListMyAccountsRef {
  ...
  (dc: DataConnect): QueryRef<ListMyAccountsData, undefined>;
}
export const listMyAccountsRef: ListMyAccountsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyAccountsRef:
```typescript
const name = listMyAccountsRef.operationName;
console.log(name);
```

### Variables
The `ListMyAccounts` query has no variables.
### Return Type
Recall that executing the `ListMyAccounts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyAccountsData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `ListMyAccounts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyAccounts } from '@generated/data-connector-web';


// Call the `listMyAccounts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyAccounts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyAccounts(dataConnect);

console.log(data.accounts);

// Or, you can use the `Promise` API.
listMyAccounts().then((response) => {
  const data = response.data;
  console.log(data.accounts);
});
```

### Using `ListMyAccounts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyAccountsRef } from '@generated/data-connector-web';


// Call the `listMyAccountsRef()` function to get a reference to the query.
const ref = listMyAccountsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyAccountsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.accounts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.accounts);
});
```

## GetMyAccount
You can execute the `GetMyAccount` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
getMyAccount(vars: GetMyAccountVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyAccountData, GetMyAccountVariables>;

interface GetMyAccountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyAccountVariables): QueryRef<GetMyAccountData, GetMyAccountVariables>;
}
export const getMyAccountRef: GetMyAccountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyAccount(dc: DataConnect, vars: GetMyAccountVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyAccountData, GetMyAccountVariables>;

interface GetMyAccountRef {
  ...
  (dc: DataConnect, vars: GetMyAccountVariables): QueryRef<GetMyAccountData, GetMyAccountVariables>;
}
export const getMyAccountRef: GetMyAccountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyAccountRef:
```typescript
const name = getMyAccountRef.operationName;
console.log(name);
```

### Variables
The `GetMyAccount` query requires an argument of type `GetMyAccountVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMyAccountVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetMyAccount` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyAccountData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetMyAccount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyAccount, GetMyAccountVariables } from '@generated/data-connector-web';

// The `GetMyAccount` query requires an argument of type `GetMyAccountVariables`:
const getMyAccountVars: GetMyAccountVariables = {
  id: ..., 
};

// Call the `getMyAccount()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyAccount(getMyAccountVars);
// Variables can be defined inline as well.
const { data } = await getMyAccount({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyAccount(dataConnect, getMyAccountVars);

console.log(data.account);

// Or, you can use the `Promise` API.
getMyAccount(getMyAccountVars).then((response) => {
  const data = response.data;
  console.log(data.account);
});
```

### Using `GetMyAccount`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyAccountRef, GetMyAccountVariables } from '@generated/data-connector-web';

// The `GetMyAccount` query requires an argument of type `GetMyAccountVariables`:
const getMyAccountVars: GetMyAccountVariables = {
  id: ..., 
};

// Call the `getMyAccountRef()` function to get a reference to the query.
const ref = getMyAccountRef(getMyAccountVars);
// Variables can be defined inline as well.
const ref = getMyAccountRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyAccountRef(dataConnect, getMyAccountVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.account);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.account);
});
```

## ListMyAccountContacts
You can execute the `ListMyAccountContacts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
listMyAccountContacts(vars: ListMyAccountContactsVariables, options?: ExecuteQueryOptions): QueryPromise<ListMyAccountContactsData, ListMyAccountContactsVariables>;

interface ListMyAccountContactsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMyAccountContactsVariables): QueryRef<ListMyAccountContactsData, ListMyAccountContactsVariables>;
}
export const listMyAccountContactsRef: ListMyAccountContactsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyAccountContacts(dc: DataConnect, vars: ListMyAccountContactsVariables, options?: ExecuteQueryOptions): QueryPromise<ListMyAccountContactsData, ListMyAccountContactsVariables>;

interface ListMyAccountContactsRef {
  ...
  (dc: DataConnect, vars: ListMyAccountContactsVariables): QueryRef<ListMyAccountContactsData, ListMyAccountContactsVariables>;
}
export const listMyAccountContactsRef: ListMyAccountContactsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyAccountContactsRef:
```typescript
const name = listMyAccountContactsRef.operationName;
console.log(name);
```

### Variables
The `ListMyAccountContacts` query requires an argument of type `ListMyAccountContactsVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListMyAccountContactsVariables {
  accountId: UUIDString;
}
```
### Return Type
Recall that executing the `ListMyAccountContacts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyAccountContactsData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `ListMyAccountContacts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyAccountContacts, ListMyAccountContactsVariables } from '@generated/data-connector-web';

// The `ListMyAccountContacts` query requires an argument of type `ListMyAccountContactsVariables`:
const listMyAccountContactsVars: ListMyAccountContactsVariables = {
  accountId: ..., 
};

// Call the `listMyAccountContacts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyAccountContacts(listMyAccountContactsVars);
// Variables can be defined inline as well.
const { data } = await listMyAccountContacts({ accountId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyAccountContacts(dataConnect, listMyAccountContactsVars);

console.log(data.accountContacts);

// Or, you can use the `Promise` API.
listMyAccountContacts(listMyAccountContactsVars).then((response) => {
  const data = response.data;
  console.log(data.accountContacts);
});
```

### Using `ListMyAccountContacts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyAccountContactsRef, ListMyAccountContactsVariables } from '@generated/data-connector-web';

// The `ListMyAccountContacts` query requires an argument of type `ListMyAccountContactsVariables`:
const listMyAccountContactsVars: ListMyAccountContactsVariables = {
  accountId: ..., 
};

// Call the `listMyAccountContactsRef()` function to get a reference to the query.
const ref = listMyAccountContactsRef(listMyAccountContactsVars);
// Variables can be defined inline as well.
const ref = listMyAccountContactsRef({ accountId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyAccountContactsRef(dataConnect, listMyAccountContactsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.accountContacts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.accountContacts);
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
    ownerId: string;
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

## CreateMyAccount
You can execute the `CreateMyAccount` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createMyAccount(vars: CreateMyAccountVariables): MutationPromise<CreateMyAccountData, CreateMyAccountVariables>;

interface CreateMyAccountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMyAccountVariables): MutationRef<CreateMyAccountData, CreateMyAccountVariables>;
}
export const createMyAccountRef: CreateMyAccountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMyAccount(dc: DataConnect, vars: CreateMyAccountVariables): MutationPromise<CreateMyAccountData, CreateMyAccountVariables>;

interface CreateMyAccountRef {
  ...
  (dc: DataConnect, vars: CreateMyAccountVariables): MutationRef<CreateMyAccountData, CreateMyAccountVariables>;
}
export const createMyAccountRef: CreateMyAccountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMyAccountRef:
```typescript
const name = createMyAccountRef.operationName;
console.log(name);
```

### Variables
The `CreateMyAccount` mutation requires an argument of type `CreateMyAccountVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateMyAccountVariables {
  id: UUIDString;
  companyName: string;
  businessNumber?: string | null;
  phoneNumber?: string | null;
}
```
### Return Type
Recall that executing the `CreateMyAccount` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMyAccountData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMyAccountData {
  account_insert: Account_Key;
}
```
### Using `CreateMyAccount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMyAccount, CreateMyAccountVariables } from '@generated/data-connector-web';

// The `CreateMyAccount` mutation requires an argument of type `CreateMyAccountVariables`:
const createMyAccountVars: CreateMyAccountVariables = {
  id: ..., 
  companyName: ..., 
  businessNumber: ..., // optional
  phoneNumber: ..., // optional
};

// Call the `createMyAccount()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMyAccount(createMyAccountVars);
// Variables can be defined inline as well.
const { data } = await createMyAccount({ id: ..., companyName: ..., businessNumber: ..., phoneNumber: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMyAccount(dataConnect, createMyAccountVars);

console.log(data.account_insert);

// Or, you can use the `Promise` API.
createMyAccount(createMyAccountVars).then((response) => {
  const data = response.data;
  console.log(data.account_insert);
});
```

### Using `CreateMyAccount`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMyAccountRef, CreateMyAccountVariables } from '@generated/data-connector-web';

// The `CreateMyAccount` mutation requires an argument of type `CreateMyAccountVariables`:
const createMyAccountVars: CreateMyAccountVariables = {
  id: ..., 
  companyName: ..., 
  businessNumber: ..., // optional
  phoneNumber: ..., // optional
};

// Call the `createMyAccountRef()` function to get a reference to the mutation.
const ref = createMyAccountRef(createMyAccountVars);
// Variables can be defined inline as well.
const ref = createMyAccountRef({ id: ..., companyName: ..., businessNumber: ..., phoneNumber: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMyAccountRef(dataConnect, createMyAccountVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.account_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.account_insert);
});
```

## UpdateMyAccount
You can execute the `UpdateMyAccount` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateMyAccount(vars: UpdateMyAccountVariables): MutationPromise<UpdateMyAccountData, UpdateMyAccountVariables>;

interface UpdateMyAccountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMyAccountVariables): MutationRef<UpdateMyAccountData, UpdateMyAccountVariables>;
}
export const updateMyAccountRef: UpdateMyAccountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMyAccount(dc: DataConnect, vars: UpdateMyAccountVariables): MutationPromise<UpdateMyAccountData, UpdateMyAccountVariables>;

interface UpdateMyAccountRef {
  ...
  (dc: DataConnect, vars: UpdateMyAccountVariables): MutationRef<UpdateMyAccountData, UpdateMyAccountVariables>;
}
export const updateMyAccountRef: UpdateMyAccountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMyAccountRef:
```typescript
const name = updateMyAccountRef.operationName;
console.log(name);
```

### Variables
The `UpdateMyAccount` mutation requires an argument of type `UpdateMyAccountVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMyAccountVariables {
  id: UUIDString;
  companyName: string;
  businessNumber?: string | null;
  phoneNumber?: string | null;
}
```
### Return Type
Recall that executing the `UpdateMyAccount` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMyAccountData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMyAccountData {
  account_update?: Account_Key | null;
}
```
### Using `UpdateMyAccount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMyAccount, UpdateMyAccountVariables } from '@generated/data-connector-web';

// The `UpdateMyAccount` mutation requires an argument of type `UpdateMyAccountVariables`:
const updateMyAccountVars: UpdateMyAccountVariables = {
  id: ..., 
  companyName: ..., 
  businessNumber: ..., // optional
  phoneNumber: ..., // optional
};

// Call the `updateMyAccount()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMyAccount(updateMyAccountVars);
// Variables can be defined inline as well.
const { data } = await updateMyAccount({ id: ..., companyName: ..., businessNumber: ..., phoneNumber: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMyAccount(dataConnect, updateMyAccountVars);

console.log(data.account_update);

// Or, you can use the `Promise` API.
updateMyAccount(updateMyAccountVars).then((response) => {
  const data = response.data;
  console.log(data.account_update);
});
```

### Using `UpdateMyAccount`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMyAccountRef, UpdateMyAccountVariables } from '@generated/data-connector-web';

// The `UpdateMyAccount` mutation requires an argument of type `UpdateMyAccountVariables`:
const updateMyAccountVars: UpdateMyAccountVariables = {
  id: ..., 
  companyName: ..., 
  businessNumber: ..., // optional
  phoneNumber: ..., // optional
};

// Call the `updateMyAccountRef()` function to get a reference to the mutation.
const ref = updateMyAccountRef(updateMyAccountVars);
// Variables can be defined inline as well.
const ref = updateMyAccountRef({ id: ..., companyName: ..., businessNumber: ..., phoneNumber: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMyAccountRef(dataConnect, updateMyAccountVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.account_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.account_update);
});
```

## SetMyAccountPrimaryContact
You can execute the `SetMyAccountPrimaryContact` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
setMyAccountPrimaryContact(vars: SetMyAccountPrimaryContactVariables): MutationPromise<SetMyAccountPrimaryContactData, SetMyAccountPrimaryContactVariables>;

interface SetMyAccountPrimaryContactRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetMyAccountPrimaryContactVariables): MutationRef<SetMyAccountPrimaryContactData, SetMyAccountPrimaryContactVariables>;
}
export const setMyAccountPrimaryContactRef: SetMyAccountPrimaryContactRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
setMyAccountPrimaryContact(dc: DataConnect, vars: SetMyAccountPrimaryContactVariables): MutationPromise<SetMyAccountPrimaryContactData, SetMyAccountPrimaryContactVariables>;

interface SetMyAccountPrimaryContactRef {
  ...
  (dc: DataConnect, vars: SetMyAccountPrimaryContactVariables): MutationRef<SetMyAccountPrimaryContactData, SetMyAccountPrimaryContactVariables>;
}
export const setMyAccountPrimaryContactRef: SetMyAccountPrimaryContactRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the setMyAccountPrimaryContactRef:
```typescript
const name = setMyAccountPrimaryContactRef.operationName;
console.log(name);
```

### Variables
The `SetMyAccountPrimaryContact` mutation requires an argument of type `SetMyAccountPrimaryContactVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SetMyAccountPrimaryContactVariables {
  accountId: UUIDString;
  contactId: UUIDString;
}
```
### Return Type
Recall that executing the `SetMyAccountPrimaryContact` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SetMyAccountPrimaryContactData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SetMyAccountPrimaryContactData {
  account_update?: Account_Key | null;
}
```
### Using `SetMyAccountPrimaryContact`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, setMyAccountPrimaryContact, SetMyAccountPrimaryContactVariables } from '@generated/data-connector-web';

// The `SetMyAccountPrimaryContact` mutation requires an argument of type `SetMyAccountPrimaryContactVariables`:
const setMyAccountPrimaryContactVars: SetMyAccountPrimaryContactVariables = {
  accountId: ..., 
  contactId: ..., 
};

// Call the `setMyAccountPrimaryContact()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await setMyAccountPrimaryContact(setMyAccountPrimaryContactVars);
// Variables can be defined inline as well.
const { data } = await setMyAccountPrimaryContact({ accountId: ..., contactId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await setMyAccountPrimaryContact(dataConnect, setMyAccountPrimaryContactVars);

console.log(data.account_update);

// Or, you can use the `Promise` API.
setMyAccountPrimaryContact(setMyAccountPrimaryContactVars).then((response) => {
  const data = response.data;
  console.log(data.account_update);
});
```

### Using `SetMyAccountPrimaryContact`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, setMyAccountPrimaryContactRef, SetMyAccountPrimaryContactVariables } from '@generated/data-connector-web';

// The `SetMyAccountPrimaryContact` mutation requires an argument of type `SetMyAccountPrimaryContactVariables`:
const setMyAccountPrimaryContactVars: SetMyAccountPrimaryContactVariables = {
  accountId: ..., 
  contactId: ..., 
};

// Call the `setMyAccountPrimaryContactRef()` function to get a reference to the mutation.
const ref = setMyAccountPrimaryContactRef(setMyAccountPrimaryContactVars);
// Variables can be defined inline as well.
const ref = setMyAccountPrimaryContactRef({ accountId: ..., contactId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = setMyAccountPrimaryContactRef(dataConnect, setMyAccountPrimaryContactVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.account_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.account_update);
});
```

## ClearMyAccountPrimaryContact
You can execute the `ClearMyAccountPrimaryContact` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
clearMyAccountPrimaryContact(vars: ClearMyAccountPrimaryContactVariables): MutationPromise<ClearMyAccountPrimaryContactData, ClearMyAccountPrimaryContactVariables>;

interface ClearMyAccountPrimaryContactRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ClearMyAccountPrimaryContactVariables): MutationRef<ClearMyAccountPrimaryContactData, ClearMyAccountPrimaryContactVariables>;
}
export const clearMyAccountPrimaryContactRef: ClearMyAccountPrimaryContactRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
clearMyAccountPrimaryContact(dc: DataConnect, vars: ClearMyAccountPrimaryContactVariables): MutationPromise<ClearMyAccountPrimaryContactData, ClearMyAccountPrimaryContactVariables>;

interface ClearMyAccountPrimaryContactRef {
  ...
  (dc: DataConnect, vars: ClearMyAccountPrimaryContactVariables): MutationRef<ClearMyAccountPrimaryContactData, ClearMyAccountPrimaryContactVariables>;
}
export const clearMyAccountPrimaryContactRef: ClearMyAccountPrimaryContactRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the clearMyAccountPrimaryContactRef:
```typescript
const name = clearMyAccountPrimaryContactRef.operationName;
console.log(name);
```

### Variables
The `ClearMyAccountPrimaryContact` mutation requires an argument of type `ClearMyAccountPrimaryContactVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ClearMyAccountPrimaryContactVariables {
  accountId: UUIDString;
}
```
### Return Type
Recall that executing the `ClearMyAccountPrimaryContact` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ClearMyAccountPrimaryContactData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ClearMyAccountPrimaryContactData {
  account_update?: Account_Key | null;
}
```
### Using `ClearMyAccountPrimaryContact`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, clearMyAccountPrimaryContact, ClearMyAccountPrimaryContactVariables } from '@generated/data-connector-web';

// The `ClearMyAccountPrimaryContact` mutation requires an argument of type `ClearMyAccountPrimaryContactVariables`:
const clearMyAccountPrimaryContactVars: ClearMyAccountPrimaryContactVariables = {
  accountId: ..., 
};

// Call the `clearMyAccountPrimaryContact()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await clearMyAccountPrimaryContact(clearMyAccountPrimaryContactVars);
// Variables can be defined inline as well.
const { data } = await clearMyAccountPrimaryContact({ accountId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await clearMyAccountPrimaryContact(dataConnect, clearMyAccountPrimaryContactVars);

console.log(data.account_update);

// Or, you can use the `Promise` API.
clearMyAccountPrimaryContact(clearMyAccountPrimaryContactVars).then((response) => {
  const data = response.data;
  console.log(data.account_update);
});
```

### Using `ClearMyAccountPrimaryContact`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, clearMyAccountPrimaryContactRef, ClearMyAccountPrimaryContactVariables } from '@generated/data-connector-web';

// The `ClearMyAccountPrimaryContact` mutation requires an argument of type `ClearMyAccountPrimaryContactVariables`:
const clearMyAccountPrimaryContactVars: ClearMyAccountPrimaryContactVariables = {
  accountId: ..., 
};

// Call the `clearMyAccountPrimaryContactRef()` function to get a reference to the mutation.
const ref = clearMyAccountPrimaryContactRef(clearMyAccountPrimaryContactVars);
// Variables can be defined inline as well.
const ref = clearMyAccountPrimaryContactRef({ accountId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = clearMyAccountPrimaryContactRef(dataConnect, clearMyAccountPrimaryContactVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.account_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.account_update);
});
```

## DeleteMyAccount
You can execute the `DeleteMyAccount` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
deleteMyAccount(vars: DeleteMyAccountVariables): MutationPromise<DeleteMyAccountData, DeleteMyAccountVariables>;

interface DeleteMyAccountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMyAccountVariables): MutationRef<DeleteMyAccountData, DeleteMyAccountVariables>;
}
export const deleteMyAccountRef: DeleteMyAccountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMyAccount(dc: DataConnect, vars: DeleteMyAccountVariables): MutationPromise<DeleteMyAccountData, DeleteMyAccountVariables>;

interface DeleteMyAccountRef {
  ...
  (dc: DataConnect, vars: DeleteMyAccountVariables): MutationRef<DeleteMyAccountData, DeleteMyAccountVariables>;
}
export const deleteMyAccountRef: DeleteMyAccountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMyAccountRef:
```typescript
const name = deleteMyAccountRef.operationName;
console.log(name);
```

### Variables
The `DeleteMyAccount` mutation requires an argument of type `DeleteMyAccountVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteMyAccountVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteMyAccount` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMyAccountData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMyAccountData {
  accountContact_deleteMany: number;
  account_delete?: Account_Key | null;
}
```
### Using `DeleteMyAccount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMyAccount, DeleteMyAccountVariables } from '@generated/data-connector-web';

// The `DeleteMyAccount` mutation requires an argument of type `DeleteMyAccountVariables`:
const deleteMyAccountVars: DeleteMyAccountVariables = {
  id: ..., 
};

// Call the `deleteMyAccount()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMyAccount(deleteMyAccountVars);
// Variables can be defined inline as well.
const { data } = await deleteMyAccount({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMyAccount(dataConnect, deleteMyAccountVars);

console.log(data.accountContact_deleteMany);
console.log(data.account_delete);

// Or, you can use the `Promise` API.
deleteMyAccount(deleteMyAccountVars).then((response) => {
  const data = response.data;
  console.log(data.accountContact_deleteMany);
  console.log(data.account_delete);
});
```

### Using `DeleteMyAccount`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMyAccountRef, DeleteMyAccountVariables } from '@generated/data-connector-web';

// The `DeleteMyAccount` mutation requires an argument of type `DeleteMyAccountVariables`:
const deleteMyAccountVars: DeleteMyAccountVariables = {
  id: ..., 
};

// Call the `deleteMyAccountRef()` function to get a reference to the mutation.
const ref = deleteMyAccountRef(deleteMyAccountVars);
// Variables can be defined inline as well.
const ref = deleteMyAccountRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMyAccountRef(dataConnect, deleteMyAccountVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.accountContact_deleteMany);
console.log(data.account_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.accountContact_deleteMany);
  console.log(data.account_delete);
});
```

## CreateMyAccountContact
You can execute the `CreateMyAccountContact` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createMyAccountContact(vars: CreateMyAccountContactVariables): MutationPromise<CreateMyAccountContactData, CreateMyAccountContactVariables>;

interface CreateMyAccountContactRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMyAccountContactVariables): MutationRef<CreateMyAccountContactData, CreateMyAccountContactVariables>;
}
export const createMyAccountContactRef: CreateMyAccountContactRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMyAccountContact(dc: DataConnect, vars: CreateMyAccountContactVariables): MutationPromise<CreateMyAccountContactData, CreateMyAccountContactVariables>;

interface CreateMyAccountContactRef {
  ...
  (dc: DataConnect, vars: CreateMyAccountContactVariables): MutationRef<CreateMyAccountContactData, CreateMyAccountContactVariables>;
}
export const createMyAccountContactRef: CreateMyAccountContactRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMyAccountContactRef:
```typescript
const name = createMyAccountContactRef.operationName;
console.log(name);
```

### Variables
The `CreateMyAccountContact` mutation requires an argument of type `CreateMyAccountContactVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
Recall that executing the `CreateMyAccountContact` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMyAccountContactData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMyAccountContactData {
  accountContact_insert: AccountContact_Key;
}
```
### Using `CreateMyAccountContact`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMyAccountContact, CreateMyAccountContactVariables } from '@generated/data-connector-web';

// The `CreateMyAccountContact` mutation requires an argument of type `CreateMyAccountContactVariables`:
const createMyAccountContactVars: CreateMyAccountContactVariables = {
  id: ..., 
  accountId: ..., 
  name: ..., 
  email: ..., // optional
  phoneNumber: ..., // optional
  role: ..., // optional
};

// Call the `createMyAccountContact()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMyAccountContact(createMyAccountContactVars);
// Variables can be defined inline as well.
const { data } = await createMyAccountContact({ id: ..., accountId: ..., name: ..., email: ..., phoneNumber: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMyAccountContact(dataConnect, createMyAccountContactVars);

console.log(data.accountContact_insert);

// Or, you can use the `Promise` API.
createMyAccountContact(createMyAccountContactVars).then((response) => {
  const data = response.data;
  console.log(data.accountContact_insert);
});
```

### Using `CreateMyAccountContact`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMyAccountContactRef, CreateMyAccountContactVariables } from '@generated/data-connector-web';

// The `CreateMyAccountContact` mutation requires an argument of type `CreateMyAccountContactVariables`:
const createMyAccountContactVars: CreateMyAccountContactVariables = {
  id: ..., 
  accountId: ..., 
  name: ..., 
  email: ..., // optional
  phoneNumber: ..., // optional
  role: ..., // optional
};

// Call the `createMyAccountContactRef()` function to get a reference to the mutation.
const ref = createMyAccountContactRef(createMyAccountContactVars);
// Variables can be defined inline as well.
const ref = createMyAccountContactRef({ id: ..., accountId: ..., name: ..., email: ..., phoneNumber: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMyAccountContactRef(dataConnect, createMyAccountContactVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.accountContact_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.accountContact_insert);
});
```

## UpdateMyAccountContact
You can execute the `UpdateMyAccountContact` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateMyAccountContact(vars: UpdateMyAccountContactVariables): MutationPromise<UpdateMyAccountContactData, UpdateMyAccountContactVariables>;

interface UpdateMyAccountContactRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMyAccountContactVariables): MutationRef<UpdateMyAccountContactData, UpdateMyAccountContactVariables>;
}
export const updateMyAccountContactRef: UpdateMyAccountContactRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMyAccountContact(dc: DataConnect, vars: UpdateMyAccountContactVariables): MutationPromise<UpdateMyAccountContactData, UpdateMyAccountContactVariables>;

interface UpdateMyAccountContactRef {
  ...
  (dc: DataConnect, vars: UpdateMyAccountContactVariables): MutationRef<UpdateMyAccountContactData, UpdateMyAccountContactVariables>;
}
export const updateMyAccountContactRef: UpdateMyAccountContactRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMyAccountContactRef:
```typescript
const name = updateMyAccountContactRef.operationName;
console.log(name);
```

### Variables
The `UpdateMyAccountContact` mutation requires an argument of type `UpdateMyAccountContactVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
Recall that executing the `UpdateMyAccountContact` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMyAccountContactData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMyAccountContactData {
  accountContact_update?: AccountContact_Key | null;
}
```
### Using `UpdateMyAccountContact`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMyAccountContact, UpdateMyAccountContactVariables } from '@generated/data-connector-web';

// The `UpdateMyAccountContact` mutation requires an argument of type `UpdateMyAccountContactVariables`:
const updateMyAccountContactVars: UpdateMyAccountContactVariables = {
  accountId: ..., 
  contactId: ..., 
  name: ..., 
  email: ..., // optional
  phoneNumber: ..., // optional
  role: ..., // optional
};

// Call the `updateMyAccountContact()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMyAccountContact(updateMyAccountContactVars);
// Variables can be defined inline as well.
const { data } = await updateMyAccountContact({ accountId: ..., contactId: ..., name: ..., email: ..., phoneNumber: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMyAccountContact(dataConnect, updateMyAccountContactVars);

console.log(data.accountContact_update);

// Or, you can use the `Promise` API.
updateMyAccountContact(updateMyAccountContactVars).then((response) => {
  const data = response.data;
  console.log(data.accountContact_update);
});
```

### Using `UpdateMyAccountContact`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMyAccountContactRef, UpdateMyAccountContactVariables } from '@generated/data-connector-web';

// The `UpdateMyAccountContact` mutation requires an argument of type `UpdateMyAccountContactVariables`:
const updateMyAccountContactVars: UpdateMyAccountContactVariables = {
  accountId: ..., 
  contactId: ..., 
  name: ..., 
  email: ..., // optional
  phoneNumber: ..., // optional
  role: ..., // optional
};

// Call the `updateMyAccountContactRef()` function to get a reference to the mutation.
const ref = updateMyAccountContactRef(updateMyAccountContactVars);
// Variables can be defined inline as well.
const ref = updateMyAccountContactRef({ accountId: ..., contactId: ..., name: ..., email: ..., phoneNumber: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMyAccountContactRef(dataConnect, updateMyAccountContactVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.accountContact_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.accountContact_update);
});
```

## DeleteMyAccountContact
You can execute the `DeleteMyAccountContact` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
deleteMyAccountContact(vars: DeleteMyAccountContactVariables): MutationPromise<DeleteMyAccountContactData, DeleteMyAccountContactVariables>;

interface DeleteMyAccountContactRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMyAccountContactVariables): MutationRef<DeleteMyAccountContactData, DeleteMyAccountContactVariables>;
}
export const deleteMyAccountContactRef: DeleteMyAccountContactRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMyAccountContact(dc: DataConnect, vars: DeleteMyAccountContactVariables): MutationPromise<DeleteMyAccountContactData, DeleteMyAccountContactVariables>;

interface DeleteMyAccountContactRef {
  ...
  (dc: DataConnect, vars: DeleteMyAccountContactVariables): MutationRef<DeleteMyAccountContactData, DeleteMyAccountContactVariables>;
}
export const deleteMyAccountContactRef: DeleteMyAccountContactRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMyAccountContactRef:
```typescript
const name = deleteMyAccountContactRef.operationName;
console.log(name);
```

### Variables
The `DeleteMyAccountContact` mutation requires an argument of type `DeleteMyAccountContactVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteMyAccountContactVariables {
  accountId: UUIDString;
  contactId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteMyAccountContact` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMyAccountContactData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMyAccountContactData {
  account_update?: Account_Key | null;
  accountContact_delete?: AccountContact_Key | null;
}
```
### Using `DeleteMyAccountContact`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMyAccountContact, DeleteMyAccountContactVariables } from '@generated/data-connector-web';

// The `DeleteMyAccountContact` mutation requires an argument of type `DeleteMyAccountContactVariables`:
const deleteMyAccountContactVars: DeleteMyAccountContactVariables = {
  accountId: ..., 
  contactId: ..., 
};

// Call the `deleteMyAccountContact()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMyAccountContact(deleteMyAccountContactVars);
// Variables can be defined inline as well.
const { data } = await deleteMyAccountContact({ accountId: ..., contactId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMyAccountContact(dataConnect, deleteMyAccountContactVars);

console.log(data.account_update);
console.log(data.accountContact_delete);

// Or, you can use the `Promise` API.
deleteMyAccountContact(deleteMyAccountContactVars).then((response) => {
  const data = response.data;
  console.log(data.account_update);
  console.log(data.accountContact_delete);
});
```

### Using `DeleteMyAccountContact`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMyAccountContactRef, DeleteMyAccountContactVariables } from '@generated/data-connector-web';

// The `DeleteMyAccountContact` mutation requires an argument of type `DeleteMyAccountContactVariables`:
const deleteMyAccountContactVars: DeleteMyAccountContactVariables = {
  accountId: ..., 
  contactId: ..., 
};

// Call the `deleteMyAccountContactRef()` function to get a reference to the mutation.
const ref = deleteMyAccountContactRef(deleteMyAccountContactVars);
// Variables can be defined inline as well.
const ref = deleteMyAccountContactRef({ accountId: ..., contactId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMyAccountContactRef(dataConnect, deleteMyAccountContactVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.account_update);
console.log(data.accountContact_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.account_update);
  console.log(data.accountContact_delete);
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

