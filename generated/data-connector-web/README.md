# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `data-connector`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`data-connector-web/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
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

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `data-connector`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

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

Below are examples of how to use the `data-connector` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListAccountsByOwner
You can execute the `ListAccountsByOwner` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
listAccountsByOwner(vars: ListAccountsByOwnerVariables, options?: ExecuteQueryOptions): QueryPromise<ListAccountsByOwnerData, ListAccountsByOwnerVariables>;

interface ListAccountsByOwnerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAccountsByOwnerVariables): QueryRef<ListAccountsByOwnerData, ListAccountsByOwnerVariables>;
}
export const listAccountsByOwnerRef: ListAccountsByOwnerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAccountsByOwner(dc: DataConnect, vars: ListAccountsByOwnerVariables, options?: ExecuteQueryOptions): QueryPromise<ListAccountsByOwnerData, ListAccountsByOwnerVariables>;

interface ListAccountsByOwnerRef {
  ...
  (dc: DataConnect, vars: ListAccountsByOwnerVariables): QueryRef<ListAccountsByOwnerData, ListAccountsByOwnerVariables>;
}
export const listAccountsByOwnerRef: ListAccountsByOwnerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAccountsByOwnerRef:
```typescript
const name = listAccountsByOwnerRef.operationName;
console.log(name);
```

### Variables
The `ListAccountsByOwner` query requires an argument of type `ListAccountsByOwnerVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListAccountsByOwnerVariables {
  ownerId: string;
}
```
### Return Type
Recall that executing the `ListAccountsByOwner` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAccountsByOwnerData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `ListAccountsByOwner`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAccountsByOwner, ListAccountsByOwnerVariables } from '@generated/data-connector-web';

// The `ListAccountsByOwner` query requires an argument of type `ListAccountsByOwnerVariables`:
const listAccountsByOwnerVars: ListAccountsByOwnerVariables = {
  ownerId: ..., 
};

// Call the `listAccountsByOwner()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAccountsByOwner(listAccountsByOwnerVars);
// Variables can be defined inline as well.
const { data } = await listAccountsByOwner({ ownerId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAccountsByOwner(dataConnect, listAccountsByOwnerVars);

console.log(data.accounts);

// Or, you can use the `Promise` API.
listAccountsByOwner(listAccountsByOwnerVars).then((response) => {
  const data = response.data;
  console.log(data.accounts);
});
```

### Using `ListAccountsByOwner`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAccountsByOwnerRef, ListAccountsByOwnerVariables } from '@generated/data-connector-web';

// The `ListAccountsByOwner` query requires an argument of type `ListAccountsByOwnerVariables`:
const listAccountsByOwnerVars: ListAccountsByOwnerVariables = {
  ownerId: ..., 
};

// Call the `listAccountsByOwnerRef()` function to get a reference to the query.
const ref = listAccountsByOwnerRef(listAccountsByOwnerVars);
// Variables can be defined inline as well.
const ref = listAccountsByOwnerRef({ ownerId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAccountsByOwnerRef(dataConnect, listAccountsByOwnerVars);

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

## GetAccountById
You can execute the `GetAccountById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
getAccountById(vars: GetAccountByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetAccountByIdData, GetAccountByIdVariables>;

interface GetAccountByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAccountByIdVariables): QueryRef<GetAccountByIdData, GetAccountByIdVariables>;
}
export const getAccountByIdRef: GetAccountByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAccountById(dc: DataConnect, vars: GetAccountByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetAccountByIdData, GetAccountByIdVariables>;

interface GetAccountByIdRef {
  ...
  (dc: DataConnect, vars: GetAccountByIdVariables): QueryRef<GetAccountByIdData, GetAccountByIdVariables>;
}
export const getAccountByIdRef: GetAccountByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAccountByIdRef:
```typescript
const name = getAccountByIdRef.operationName;
console.log(name);
```

### Variables
The `GetAccountById` query requires an argument of type `GetAccountByIdVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAccountByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetAccountById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAccountByIdData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetAccountById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAccountById, GetAccountByIdVariables } from '@generated/data-connector-web';

// The `GetAccountById` query requires an argument of type `GetAccountByIdVariables`:
const getAccountByIdVars: GetAccountByIdVariables = {
  id: ..., 
};

// Call the `getAccountById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAccountById(getAccountByIdVars);
// Variables can be defined inline as well.
const { data } = await getAccountById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAccountById(dataConnect, getAccountByIdVars);

console.log(data.account);

// Or, you can use the `Promise` API.
getAccountById(getAccountByIdVars).then((response) => {
  const data = response.data;
  console.log(data.account);
});
```

### Using `GetAccountById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAccountByIdRef, GetAccountByIdVariables } from '@generated/data-connector-web';

// The `GetAccountById` query requires an argument of type `GetAccountByIdVariables`:
const getAccountByIdVars: GetAccountByIdVariables = {
  id: ..., 
};

// Call the `getAccountByIdRef()` function to get a reference to the query.
const ref = getAccountByIdRef(getAccountByIdVars);
// Variables can be defined inline as well.
const ref = getAccountByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAccountByIdRef(dataConnect, getAccountByIdVars);

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

## ListAccountContactsByAccountId
You can execute the `ListAccountContactsByAccountId` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
listAccountContactsByAccountId(vars: ListAccountContactsByAccountIdVariables, options?: ExecuteQueryOptions): QueryPromise<ListAccountContactsByAccountIdData, ListAccountContactsByAccountIdVariables>;

interface ListAccountContactsByAccountIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAccountContactsByAccountIdVariables): QueryRef<ListAccountContactsByAccountIdData, ListAccountContactsByAccountIdVariables>;
}
export const listAccountContactsByAccountIdRef: ListAccountContactsByAccountIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAccountContactsByAccountId(dc: DataConnect, vars: ListAccountContactsByAccountIdVariables, options?: ExecuteQueryOptions): QueryPromise<ListAccountContactsByAccountIdData, ListAccountContactsByAccountIdVariables>;

interface ListAccountContactsByAccountIdRef {
  ...
  (dc: DataConnect, vars: ListAccountContactsByAccountIdVariables): QueryRef<ListAccountContactsByAccountIdData, ListAccountContactsByAccountIdVariables>;
}
export const listAccountContactsByAccountIdRef: ListAccountContactsByAccountIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAccountContactsByAccountIdRef:
```typescript
const name = listAccountContactsByAccountIdRef.operationName;
console.log(name);
```

### Variables
The `ListAccountContactsByAccountId` query requires an argument of type `ListAccountContactsByAccountIdVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListAccountContactsByAccountIdVariables {
  accountId: UUIDString;
}
```
### Return Type
Recall that executing the `ListAccountContactsByAccountId` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAccountContactsByAccountIdData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `ListAccountContactsByAccountId`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAccountContactsByAccountId, ListAccountContactsByAccountIdVariables } from '@generated/data-connector-web';

// The `ListAccountContactsByAccountId` query requires an argument of type `ListAccountContactsByAccountIdVariables`:
const listAccountContactsByAccountIdVars: ListAccountContactsByAccountIdVariables = {
  accountId: ..., 
};

// Call the `listAccountContactsByAccountId()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAccountContactsByAccountId(listAccountContactsByAccountIdVars);
// Variables can be defined inline as well.
const { data } = await listAccountContactsByAccountId({ accountId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAccountContactsByAccountId(dataConnect, listAccountContactsByAccountIdVars);

console.log(data.accountContacts);

// Or, you can use the `Promise` API.
listAccountContactsByAccountId(listAccountContactsByAccountIdVars).then((response) => {
  const data = response.data;
  console.log(data.accountContacts);
});
```

### Using `ListAccountContactsByAccountId`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAccountContactsByAccountIdRef, ListAccountContactsByAccountIdVariables } from '@generated/data-connector-web';

// The `ListAccountContactsByAccountId` query requires an argument of type `ListAccountContactsByAccountIdVariables`:
const listAccountContactsByAccountIdVars: ListAccountContactsByAccountIdVariables = {
  accountId: ..., 
};

// Call the `listAccountContactsByAccountIdRef()` function to get a reference to the query.
const ref = listAccountContactsByAccountIdRef(listAccountContactsByAccountIdVars);
// Variables can be defined inline as well.
const ref = listAccountContactsByAccountIdRef({ accountId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAccountContactsByAccountIdRef(dataConnect, listAccountContactsByAccountIdVars);

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

## GetAccountContactById
You can execute the `GetAccountContactById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
getAccountContactById(vars: GetAccountContactByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetAccountContactByIdData, GetAccountContactByIdVariables>;

interface GetAccountContactByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAccountContactByIdVariables): QueryRef<GetAccountContactByIdData, GetAccountContactByIdVariables>;
}
export const getAccountContactByIdRef: GetAccountContactByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAccountContactById(dc: DataConnect, vars: GetAccountContactByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetAccountContactByIdData, GetAccountContactByIdVariables>;

interface GetAccountContactByIdRef {
  ...
  (dc: DataConnect, vars: GetAccountContactByIdVariables): QueryRef<GetAccountContactByIdData, GetAccountContactByIdVariables>;
}
export const getAccountContactByIdRef: GetAccountContactByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAccountContactByIdRef:
```typescript
const name = getAccountContactByIdRef.operationName;
console.log(name);
```

### Variables
The `GetAccountContactById` query requires an argument of type `GetAccountContactByIdVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAccountContactByIdVariables {
  accountId: UUIDString;
  contactId: UUIDString;
}
```
### Return Type
Recall that executing the `GetAccountContactById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAccountContactByIdData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetAccountContactById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAccountContactById, GetAccountContactByIdVariables } from '@generated/data-connector-web';

// The `GetAccountContactById` query requires an argument of type `GetAccountContactByIdVariables`:
const getAccountContactByIdVars: GetAccountContactByIdVariables = {
  accountId: ..., 
  contactId: ..., 
};

// Call the `getAccountContactById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAccountContactById(getAccountContactByIdVars);
// Variables can be defined inline as well.
const { data } = await getAccountContactById({ accountId: ..., contactId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAccountContactById(dataConnect, getAccountContactByIdVars);

console.log(data.accountContact);

// Or, you can use the `Promise` API.
getAccountContactById(getAccountContactByIdVars).then((response) => {
  const data = response.data;
  console.log(data.accountContact);
});
```

### Using `GetAccountContactById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAccountContactByIdRef, GetAccountContactByIdVariables } from '@generated/data-connector-web';

// The `GetAccountContactById` query requires an argument of type `GetAccountContactByIdVariables`:
const getAccountContactByIdVars: GetAccountContactByIdVariables = {
  accountId: ..., 
  contactId: ..., 
};

// Call the `getAccountContactByIdRef()` function to get a reference to the query.
const ref = getAccountContactByIdRef(getAccountContactByIdVars);
// Variables can be defined inline as well.
const ref = getAccountContactByIdRef({ accountId: ..., contactId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAccountContactByIdRef(dataConnect, getAccountContactByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.accountContact);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.accountContact);
});
```

## ListProjectsByOwnerAndSalesStatus
You can execute the `ListProjectsByOwnerAndSalesStatus` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
listProjectsByOwnerAndSalesStatus(vars: ListProjectsByOwnerAndSalesStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectsByOwnerAndSalesStatusData, ListProjectsByOwnerAndSalesStatusVariables>;

interface ListProjectsByOwnerAndSalesStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectsByOwnerAndSalesStatusVariables): QueryRef<ListProjectsByOwnerAndSalesStatusData, ListProjectsByOwnerAndSalesStatusVariables>;
}
export const listProjectsByOwnerAndSalesStatusRef: ListProjectsByOwnerAndSalesStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProjectsByOwnerAndSalesStatus(dc: DataConnect, vars: ListProjectsByOwnerAndSalesStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectsByOwnerAndSalesStatusData, ListProjectsByOwnerAndSalesStatusVariables>;

interface ListProjectsByOwnerAndSalesStatusRef {
  ...
  (dc: DataConnect, vars: ListProjectsByOwnerAndSalesStatusVariables): QueryRef<ListProjectsByOwnerAndSalesStatusData, ListProjectsByOwnerAndSalesStatusVariables>;
}
export const listProjectsByOwnerAndSalesStatusRef: ListProjectsByOwnerAndSalesStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProjectsByOwnerAndSalesStatusRef:
```typescript
const name = listProjectsByOwnerAndSalesStatusRef.operationName;
console.log(name);
```

### Variables
The `ListProjectsByOwnerAndSalesStatus` query requires an argument of type `ListProjectsByOwnerAndSalesStatusVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListProjectsByOwnerAndSalesStatusVariables {
  ownerId: string;
  salesStatus: string;
}
```
### Return Type
Recall that executing the `ListProjectsByOwnerAndSalesStatus` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProjectsByOwnerAndSalesStatusData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `ListProjectsByOwnerAndSalesStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProjectsByOwnerAndSalesStatus, ListProjectsByOwnerAndSalesStatusVariables } from '@generated/data-connector-web';

// The `ListProjectsByOwnerAndSalesStatus` query requires an argument of type `ListProjectsByOwnerAndSalesStatusVariables`:
const listProjectsByOwnerAndSalesStatusVars: ListProjectsByOwnerAndSalesStatusVariables = {
  ownerId: ..., 
  salesStatus: ..., 
};

// Call the `listProjectsByOwnerAndSalesStatus()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProjectsByOwnerAndSalesStatus(listProjectsByOwnerAndSalesStatusVars);
// Variables can be defined inline as well.
const { data } = await listProjectsByOwnerAndSalesStatus({ ownerId: ..., salesStatus: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProjectsByOwnerAndSalesStatus(dataConnect, listProjectsByOwnerAndSalesStatusVars);

console.log(data.projects);

// Or, you can use the `Promise` API.
listProjectsByOwnerAndSalesStatus(listProjectsByOwnerAndSalesStatusVars).then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

### Using `ListProjectsByOwnerAndSalesStatus`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProjectsByOwnerAndSalesStatusRef, ListProjectsByOwnerAndSalesStatusVariables } from '@generated/data-connector-web';

// The `ListProjectsByOwnerAndSalesStatus` query requires an argument of type `ListProjectsByOwnerAndSalesStatusVariables`:
const listProjectsByOwnerAndSalesStatusVars: ListProjectsByOwnerAndSalesStatusVariables = {
  ownerId: ..., 
  salesStatus: ..., 
};

// Call the `listProjectsByOwnerAndSalesStatusRef()` function to get a reference to the query.
const ref = listProjectsByOwnerAndSalesStatusRef(listProjectsByOwnerAndSalesStatusVars);
// Variables can be defined inline as well.
const ref = listProjectsByOwnerAndSalesStatusRef({ ownerId: ..., salesStatus: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProjectsByOwnerAndSalesStatusRef(dataConnect, listProjectsByOwnerAndSalesStatusVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projects);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

## ListProjectsByAccount
You can execute the `ListProjectsByAccount` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
listProjectsByAccount(vars: ListProjectsByAccountVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectsByAccountData, ListProjectsByAccountVariables>;

interface ListProjectsByAccountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectsByAccountVariables): QueryRef<ListProjectsByAccountData, ListProjectsByAccountVariables>;
}
export const listProjectsByAccountRef: ListProjectsByAccountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProjectsByAccount(dc: DataConnect, vars: ListProjectsByAccountVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectsByAccountData, ListProjectsByAccountVariables>;

interface ListProjectsByAccountRef {
  ...
  (dc: DataConnect, vars: ListProjectsByAccountVariables): QueryRef<ListProjectsByAccountData, ListProjectsByAccountVariables>;
}
export const listProjectsByAccountRef: ListProjectsByAccountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProjectsByAccountRef:
```typescript
const name = listProjectsByAccountRef.operationName;
console.log(name);
```

### Variables
The `ListProjectsByAccount` query requires an argument of type `ListProjectsByAccountVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListProjectsByAccountVariables {
  accountId: UUIDString;
}
```
### Return Type
Recall that executing the `ListProjectsByAccount` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProjectsByAccountData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `ListProjectsByAccount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProjectsByAccount, ListProjectsByAccountVariables } from '@generated/data-connector-web';

// The `ListProjectsByAccount` query requires an argument of type `ListProjectsByAccountVariables`:
const listProjectsByAccountVars: ListProjectsByAccountVariables = {
  accountId: ..., 
};

// Call the `listProjectsByAccount()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProjectsByAccount(listProjectsByAccountVars);
// Variables can be defined inline as well.
const { data } = await listProjectsByAccount({ accountId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProjectsByAccount(dataConnect, listProjectsByAccountVars);

console.log(data.projects);

// Or, you can use the `Promise` API.
listProjectsByAccount(listProjectsByAccountVars).then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

### Using `ListProjectsByAccount`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProjectsByAccountRef, ListProjectsByAccountVariables } from '@generated/data-connector-web';

// The `ListProjectsByAccount` query requires an argument of type `ListProjectsByAccountVariables`:
const listProjectsByAccountVars: ListProjectsByAccountVariables = {
  accountId: ..., 
};

// Call the `listProjectsByAccountRef()` function to get a reference to the query.
const ref = listProjectsByAccountRef(listProjectsByAccountVars);
// Variables can be defined inline as well.
const ref = listProjectsByAccountRef({ accountId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProjectsByAccountRef(dataConnect, listProjectsByAccountVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projects);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

## GetProjectDetailsById
You can execute the `GetProjectDetailsById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
getProjectDetailsById(vars: GetProjectDetailsByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectDetailsByIdData, GetProjectDetailsByIdVariables>;

interface GetProjectDetailsByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProjectDetailsByIdVariables): QueryRef<GetProjectDetailsByIdData, GetProjectDetailsByIdVariables>;
}
export const getProjectDetailsByIdRef: GetProjectDetailsByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getProjectDetailsById(dc: DataConnect, vars: GetProjectDetailsByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectDetailsByIdData, GetProjectDetailsByIdVariables>;

interface GetProjectDetailsByIdRef {
  ...
  (dc: DataConnect, vars: GetProjectDetailsByIdVariables): QueryRef<GetProjectDetailsByIdData, GetProjectDetailsByIdVariables>;
}
export const getProjectDetailsByIdRef: GetProjectDetailsByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getProjectDetailsByIdRef:
```typescript
const name = getProjectDetailsByIdRef.operationName;
console.log(name);
```

### Variables
The `GetProjectDetailsById` query requires an argument of type `GetProjectDetailsByIdVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetProjectDetailsByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetProjectDetailsById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetProjectDetailsByIdData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetProjectDetailsById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getProjectDetailsById, GetProjectDetailsByIdVariables } from '@generated/data-connector-web';

// The `GetProjectDetailsById` query requires an argument of type `GetProjectDetailsByIdVariables`:
const getProjectDetailsByIdVars: GetProjectDetailsByIdVariables = {
  id: ..., 
};

// Call the `getProjectDetailsById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getProjectDetailsById(getProjectDetailsByIdVars);
// Variables can be defined inline as well.
const { data } = await getProjectDetailsById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getProjectDetailsById(dataConnect, getProjectDetailsByIdVars);

console.log(data.project);

// Or, you can use the `Promise` API.
getProjectDetailsById(getProjectDetailsByIdVars).then((response) => {
  const data = response.data;
  console.log(data.project);
});
```

### Using `GetProjectDetailsById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getProjectDetailsByIdRef, GetProjectDetailsByIdVariables } from '@generated/data-connector-web';

// The `GetProjectDetailsById` query requires an argument of type `GetProjectDetailsByIdVariables`:
const getProjectDetailsByIdVars: GetProjectDetailsByIdVariables = {
  id: ..., 
};

// Call the `getProjectDetailsByIdRef()` function to get a reference to the query.
const ref = getProjectDetailsByIdRef(getProjectDetailsByIdVars);
// Variables can be defined inline as well.
const ref = getProjectDetailsByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getProjectDetailsByIdRef(dataConnect, getProjectDetailsByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.project);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.project);
});
```

## GetProjectById
You can execute the `GetProjectById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
getProjectById(vars: GetProjectByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectByIdData, GetProjectByIdVariables>;

interface GetProjectByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProjectByIdVariables): QueryRef<GetProjectByIdData, GetProjectByIdVariables>;
}
export const getProjectByIdRef: GetProjectByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getProjectById(dc: DataConnect, vars: GetProjectByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectByIdData, GetProjectByIdVariables>;

interface GetProjectByIdRef {
  ...
  (dc: DataConnect, vars: GetProjectByIdVariables): QueryRef<GetProjectByIdData, GetProjectByIdVariables>;
}
export const getProjectByIdRef: GetProjectByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getProjectByIdRef:
```typescript
const name = getProjectByIdRef.operationName;
console.log(name);
```

### Variables
The `GetProjectById` query requires an argument of type `GetProjectByIdVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetProjectByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetProjectById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetProjectByIdData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetProjectById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getProjectById, GetProjectByIdVariables } from '@generated/data-connector-web';

// The `GetProjectById` query requires an argument of type `GetProjectByIdVariables`:
const getProjectByIdVars: GetProjectByIdVariables = {
  id: ..., 
};

// Call the `getProjectById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getProjectById(getProjectByIdVars);
// Variables can be defined inline as well.
const { data } = await getProjectById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getProjectById(dataConnect, getProjectByIdVars);

console.log(data.project);

// Or, you can use the `Promise` API.
getProjectById(getProjectByIdVars).then((response) => {
  const data = response.data;
  console.log(data.project);
});
```

### Using `GetProjectById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getProjectByIdRef, GetProjectByIdVariables } from '@generated/data-connector-web';

// The `GetProjectById` query requires an argument of type `GetProjectByIdVariables`:
const getProjectByIdVars: GetProjectByIdVariables = {
  id: ..., 
};

// Call the `getProjectByIdRef()` function to get a reference to the query.
const ref = getProjectByIdRef(getProjectByIdVars);
// Variables can be defined inline as well.
const ref = getProjectByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getProjectByIdRef(dataConnect, getProjectByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.project);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.project);
});
```

## GetFloorplanPageById
You can execute the `GetFloorplanPageById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
getFloorplanPageById(vars: GetFloorplanPageByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetFloorplanPageByIdData, GetFloorplanPageByIdVariables>;

interface GetFloorplanPageByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFloorplanPageByIdVariables): QueryRef<GetFloorplanPageByIdData, GetFloorplanPageByIdVariables>;
}
export const getFloorplanPageByIdRef: GetFloorplanPageByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getFloorplanPageById(dc: DataConnect, vars: GetFloorplanPageByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetFloorplanPageByIdData, GetFloorplanPageByIdVariables>;

interface GetFloorplanPageByIdRef {
  ...
  (dc: DataConnect, vars: GetFloorplanPageByIdVariables): QueryRef<GetFloorplanPageByIdData, GetFloorplanPageByIdVariables>;
}
export const getFloorplanPageByIdRef: GetFloorplanPageByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getFloorplanPageByIdRef:
```typescript
const name = getFloorplanPageByIdRef.operationName;
console.log(name);
```

### Variables
The `GetFloorplanPageById` query requires an argument of type `GetFloorplanPageByIdVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetFloorplanPageByIdVariables {
  projectId: UUIDString;
  pageId: UUIDString;
}
```
### Return Type
Recall that executing the `GetFloorplanPageById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetFloorplanPageByIdData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetFloorplanPageById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getFloorplanPageById, GetFloorplanPageByIdVariables } from '@generated/data-connector-web';

// The `GetFloorplanPageById` query requires an argument of type `GetFloorplanPageByIdVariables`:
const getFloorplanPageByIdVars: GetFloorplanPageByIdVariables = {
  projectId: ..., 
  pageId: ..., 
};

// Call the `getFloorplanPageById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getFloorplanPageById(getFloorplanPageByIdVars);
// Variables can be defined inline as well.
const { data } = await getFloorplanPageById({ projectId: ..., pageId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getFloorplanPageById(dataConnect, getFloorplanPageByIdVars);

console.log(data.floorplanPage);

// Or, you can use the `Promise` API.
getFloorplanPageById(getFloorplanPageByIdVars).then((response) => {
  const data = response.data;
  console.log(data.floorplanPage);
});
```

### Using `GetFloorplanPageById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getFloorplanPageByIdRef, GetFloorplanPageByIdVariables } from '@generated/data-connector-web';

// The `GetFloorplanPageById` query requires an argument of type `GetFloorplanPageByIdVariables`:
const getFloorplanPageByIdVars: GetFloorplanPageByIdVariables = {
  projectId: ..., 
  pageId: ..., 
};

// Call the `getFloorplanPageByIdRef()` function to get a reference to the query.
const ref = getFloorplanPageByIdRef(getFloorplanPageByIdVars);
// Variables can be defined inline as well.
const ref = getFloorplanPageByIdRef({ projectId: ..., pageId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getFloorplanPageByIdRef(dataConnect, getFloorplanPageByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.floorplanPage);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.floorplanPage);
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
      description?: string | null;
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

## ListDueReminders
You can execute the `ListDueReminders` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
listDueReminders(vars: ListDueRemindersVariables, options?: ExecuteQueryOptions): QueryPromise<ListDueRemindersData, ListDueRemindersVariables>;

interface ListDueRemindersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListDueRemindersVariables): QueryRef<ListDueRemindersData, ListDueRemindersVariables>;
}
export const listDueRemindersRef: ListDueRemindersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listDueReminders(dc: DataConnect, vars: ListDueRemindersVariables, options?: ExecuteQueryOptions): QueryPromise<ListDueRemindersData, ListDueRemindersVariables>;

interface ListDueRemindersRef {
  ...
  (dc: DataConnect, vars: ListDueRemindersVariables): QueryRef<ListDueRemindersData, ListDueRemindersVariables>;
}
export const listDueRemindersRef: ListDueRemindersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listDueRemindersRef:
```typescript
const name = listDueRemindersRef.operationName;
console.log(name);
```

### Variables
The `ListDueReminders` query requires an argument of type `ListDueRemindersVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListDueRemindersVariables {
  ownerId: string;
}
```
### Return Type
Recall that executing the `ListDueReminders` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListDueRemindersData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `ListDueReminders`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listDueReminders, ListDueRemindersVariables } from '@generated/data-connector-web';

// The `ListDueReminders` query requires an argument of type `ListDueRemindersVariables`:
const listDueRemindersVars: ListDueRemindersVariables = {
  ownerId: ..., 
};

// Call the `listDueReminders()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listDueReminders(listDueRemindersVars);
// Variables can be defined inline as well.
const { data } = await listDueReminders({ ownerId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listDueReminders(dataConnect, listDueRemindersVars);

console.log(data.reminders);

// Or, you can use the `Promise` API.
listDueReminders(listDueRemindersVars).then((response) => {
  const data = response.data;
  console.log(data.reminders);
});
```

### Using `ListDueReminders`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listDueRemindersRef, ListDueRemindersVariables } from '@generated/data-connector-web';

// The `ListDueReminders` query requires an argument of type `ListDueRemindersVariables`:
const listDueRemindersVars: ListDueRemindersVariables = {
  ownerId: ..., 
};

// Call the `listDueRemindersRef()` function to get a reference to the query.
const ref = listDueRemindersRef(listDueRemindersVars);
// Variables can be defined inline as well.
const ref = listDueRemindersRef({ ownerId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listDueRemindersRef(dataConnect, listDueRemindersVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.reminders);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.reminders);
});
```

## ListProjectReminders
You can execute the `ListProjectReminders` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
listProjectReminders(vars: ListProjectRemindersVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectRemindersData, ListProjectRemindersVariables>;

interface ListProjectRemindersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectRemindersVariables): QueryRef<ListProjectRemindersData, ListProjectRemindersVariables>;
}
export const listProjectRemindersRef: ListProjectRemindersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProjectReminders(dc: DataConnect, vars: ListProjectRemindersVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectRemindersData, ListProjectRemindersVariables>;

interface ListProjectRemindersRef {
  ...
  (dc: DataConnect, vars: ListProjectRemindersVariables): QueryRef<ListProjectRemindersData, ListProjectRemindersVariables>;
}
export const listProjectRemindersRef: ListProjectRemindersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProjectRemindersRef:
```typescript
const name = listProjectRemindersRef.operationName;
console.log(name);
```

### Variables
The `ListProjectReminders` query requires an argument of type `ListProjectRemindersVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListProjectRemindersVariables {
  projectId: UUIDString;
}
```
### Return Type
Recall that executing the `ListProjectReminders` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProjectRemindersData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `ListProjectReminders`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProjectReminders, ListProjectRemindersVariables } from '@generated/data-connector-web';

// The `ListProjectReminders` query requires an argument of type `ListProjectRemindersVariables`:
const listProjectRemindersVars: ListProjectRemindersVariables = {
  projectId: ..., 
};

// Call the `listProjectReminders()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProjectReminders(listProjectRemindersVars);
// Variables can be defined inline as well.
const { data } = await listProjectReminders({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProjectReminders(dataConnect, listProjectRemindersVars);

console.log(data.reminders);

// Or, you can use the `Promise` API.
listProjectReminders(listProjectRemindersVars).then((response) => {
  const data = response.data;
  console.log(data.reminders);
});
```

### Using `ListProjectReminders`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProjectRemindersRef, ListProjectRemindersVariables } from '@generated/data-connector-web';

// The `ListProjectReminders` query requires an argument of type `ListProjectRemindersVariables`:
const listProjectRemindersVars: ListProjectRemindersVariables = {
  projectId: ..., 
};

// Call the `listProjectRemindersRef()` function to get a reference to the query.
const ref = listProjectRemindersRef(listProjectRemindersVars);
// Variables can be defined inline as well.
const ref = listProjectRemindersRef({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProjectRemindersRef(dataConnect, listProjectRemindersVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.reminders);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.reminders);
});
```

## GetReminderById
You can execute the `GetReminderById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
getReminderById(vars: GetReminderByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetReminderByIdData, GetReminderByIdVariables>;

interface GetReminderByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetReminderByIdVariables): QueryRef<GetReminderByIdData, GetReminderByIdVariables>;
}
export const getReminderByIdRef: GetReminderByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getReminderById(dc: DataConnect, vars: GetReminderByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetReminderByIdData, GetReminderByIdVariables>;

interface GetReminderByIdRef {
  ...
  (dc: DataConnect, vars: GetReminderByIdVariables): QueryRef<GetReminderByIdData, GetReminderByIdVariables>;
}
export const getReminderByIdRef: GetReminderByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getReminderByIdRef:
```typescript
const name = getReminderByIdRef.operationName;
console.log(name);
```

### Variables
The `GetReminderById` query requires an argument of type `GetReminderByIdVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetReminderByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetReminderById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetReminderByIdData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetReminderById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getReminderById, GetReminderByIdVariables } from '@generated/data-connector-web';

// The `GetReminderById` query requires an argument of type `GetReminderByIdVariables`:
const getReminderByIdVars: GetReminderByIdVariables = {
  id: ..., 
};

// Call the `getReminderById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getReminderById(getReminderByIdVars);
// Variables can be defined inline as well.
const { data } = await getReminderById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getReminderById(dataConnect, getReminderByIdVars);

console.log(data.reminder);

// Or, you can use the `Promise` API.
getReminderById(getReminderByIdVars).then((response) => {
  const data = response.data;
  console.log(data.reminder);
});
```

### Using `GetReminderById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getReminderByIdRef, GetReminderByIdVariables } from '@generated/data-connector-web';

// The `GetReminderById` query requires an argument of type `GetReminderByIdVariables`:
const getReminderByIdVars: GetReminderByIdVariables = {
  id: ..., 
};

// Call the `getReminderByIdRef()` function to get a reference to the query.
const ref = getReminderByIdRef(getReminderByIdVars);
// Variables can be defined inline as well.
const ref = getReminderByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getReminderByIdRef(dataConnect, getReminderByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.reminder);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.reminder);
});
```

## GetUserSettings
You can execute the `GetUserSettings` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
getUserSettings(vars: GetUserSettingsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserSettingsData, GetUserSettingsVariables>;

interface GetUserSettingsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserSettingsVariables): QueryRef<GetUserSettingsData, GetUserSettingsVariables>;
}
export const getUserSettingsRef: GetUserSettingsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserSettings(dc: DataConnect, vars: GetUserSettingsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserSettingsData, GetUserSettingsVariables>;

interface GetUserSettingsRef {
  ...
  (dc: DataConnect, vars: GetUserSettingsVariables): QueryRef<GetUserSettingsData, GetUserSettingsVariables>;
}
export const getUserSettingsRef: GetUserSettingsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserSettingsRef:
```typescript
const name = getUserSettingsRef.operationName;
console.log(name);
```

### Variables
The `GetUserSettings` query requires an argument of type `GetUserSettingsVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserSettingsVariables {
  ownerId: string;
}
```
### Return Type
Recall that executing the `GetUserSettings` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserSettingsData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetUserSettings`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserSettings, GetUserSettingsVariables } from '@generated/data-connector-web';

// The `GetUserSettings` query requires an argument of type `GetUserSettingsVariables`:
const getUserSettingsVars: GetUserSettingsVariables = {
  ownerId: ..., 
};

// Call the `getUserSettings()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserSettings(getUserSettingsVars);
// Variables can be defined inline as well.
const { data } = await getUserSettings({ ownerId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserSettings(dataConnect, getUserSettingsVars);

console.log(data.userSettings);

// Or, you can use the `Promise` API.
getUserSettings(getUserSettingsVars).then((response) => {
  const data = response.data;
  console.log(data.userSettings);
});
```

### Using `GetUserSettings`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserSettingsRef, GetUserSettingsVariables } from '@generated/data-connector-web';

// The `GetUserSettings` query requires an argument of type `GetUserSettingsVariables`:
const getUserSettingsVars: GetUserSettingsVariables = {
  ownerId: ..., 
};

// Call the `getUserSettingsRef()` function to get a reference to the query.
const ref = getUserSettingsRef(getUserSettingsVars);
// Variables can be defined inline as well.
const ref = getUserSettingsRef({ ownerId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserSettingsRef(dataConnect, getUserSettingsVars);

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

Below are examples of how to use the `data-connector` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateAccount
You can execute the `CreateAccount` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createAccount(vars: CreateAccountVariables): MutationPromise<CreateAccountData, CreateAccountVariables>;

interface CreateAccountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAccountVariables): MutationRef<CreateAccountData, CreateAccountVariables>;
}
export const createAccountRef: CreateAccountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAccount(dc: DataConnect, vars: CreateAccountVariables): MutationPromise<CreateAccountData, CreateAccountVariables>;

interface CreateAccountRef {
  ...
  (dc: DataConnect, vars: CreateAccountVariables): MutationRef<CreateAccountData, CreateAccountVariables>;
}
export const createAccountRef: CreateAccountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAccountRef:
```typescript
const name = createAccountRef.operationName;
console.log(name);
```

### Variables
The `CreateAccount` mutation requires an argument of type `CreateAccountVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateAccountVariables {
  id: UUIDString;
  ownerId: string;
  companyName: string;
  businessNumber?: string | null;
  phoneNumber?: string | null;
}
```
### Return Type
Recall that executing the `CreateAccount` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAccountData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAccountData {
  account_insert: Account_Key;
}
```
### Using `CreateAccount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAccount, CreateAccountVariables } from '@generated/data-connector-web';

// The `CreateAccount` mutation requires an argument of type `CreateAccountVariables`:
const createAccountVars: CreateAccountVariables = {
  id: ..., 
  ownerId: ..., 
  companyName: ..., 
  businessNumber: ..., // optional
  phoneNumber: ..., // optional
};

// Call the `createAccount()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAccount(createAccountVars);
// Variables can be defined inline as well.
const { data } = await createAccount({ id: ..., ownerId: ..., companyName: ..., businessNumber: ..., phoneNumber: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAccount(dataConnect, createAccountVars);

console.log(data.account_insert);

// Or, you can use the `Promise` API.
createAccount(createAccountVars).then((response) => {
  const data = response.data;
  console.log(data.account_insert);
});
```

### Using `CreateAccount`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAccountRef, CreateAccountVariables } from '@generated/data-connector-web';

// The `CreateAccount` mutation requires an argument of type `CreateAccountVariables`:
const createAccountVars: CreateAccountVariables = {
  id: ..., 
  ownerId: ..., 
  companyName: ..., 
  businessNumber: ..., // optional
  phoneNumber: ..., // optional
};

// Call the `createAccountRef()` function to get a reference to the mutation.
const ref = createAccountRef(createAccountVars);
// Variables can be defined inline as well.
const ref = createAccountRef({ id: ..., ownerId: ..., companyName: ..., businessNumber: ..., phoneNumber: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAccountRef(dataConnect, createAccountVars);

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

## UpdateAccount
You can execute the `UpdateAccount` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateAccount(vars: UpdateAccountVariables): MutationPromise<UpdateAccountData, UpdateAccountVariables>;

interface UpdateAccountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAccountVariables): MutationRef<UpdateAccountData, UpdateAccountVariables>;
}
export const updateAccountRef: UpdateAccountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAccount(dc: DataConnect, vars: UpdateAccountVariables): MutationPromise<UpdateAccountData, UpdateAccountVariables>;

interface UpdateAccountRef {
  ...
  (dc: DataConnect, vars: UpdateAccountVariables): MutationRef<UpdateAccountData, UpdateAccountVariables>;
}
export const updateAccountRef: UpdateAccountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAccountRef:
```typescript
const name = updateAccountRef.operationName;
console.log(name);
```

### Variables
The `UpdateAccount` mutation requires an argument of type `UpdateAccountVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateAccountVariables {
  id: UUIDString;
  companyName?: string | null;
  businessNumber?: string | null;
  phoneNumber?: string | null;
  primaryContactId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `UpdateAccount` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAccountData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAccountData {
  account_update?: Account_Key | null;
}
```
### Using `UpdateAccount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAccount, UpdateAccountVariables } from '@generated/data-connector-web';

// The `UpdateAccount` mutation requires an argument of type `UpdateAccountVariables`:
const updateAccountVars: UpdateAccountVariables = {
  id: ..., 
  companyName: ..., // optional
  businessNumber: ..., // optional
  phoneNumber: ..., // optional
  primaryContactId: ..., // optional
};

// Call the `updateAccount()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAccount(updateAccountVars);
// Variables can be defined inline as well.
const { data } = await updateAccount({ id: ..., companyName: ..., businessNumber: ..., phoneNumber: ..., primaryContactId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAccount(dataConnect, updateAccountVars);

console.log(data.account_update);

// Or, you can use the `Promise` API.
updateAccount(updateAccountVars).then((response) => {
  const data = response.data;
  console.log(data.account_update);
});
```

### Using `UpdateAccount`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAccountRef, UpdateAccountVariables } from '@generated/data-connector-web';

// The `UpdateAccount` mutation requires an argument of type `UpdateAccountVariables`:
const updateAccountVars: UpdateAccountVariables = {
  id: ..., 
  companyName: ..., // optional
  businessNumber: ..., // optional
  phoneNumber: ..., // optional
  primaryContactId: ..., // optional
};

// Call the `updateAccountRef()` function to get a reference to the mutation.
const ref = updateAccountRef(updateAccountVars);
// Variables can be defined inline as well.
const ref = updateAccountRef({ id: ..., companyName: ..., businessNumber: ..., phoneNumber: ..., primaryContactId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAccountRef(dataConnect, updateAccountVars);

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

## DeleteAccountContacts
You can execute the `DeleteAccountContacts` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
deleteAccountContacts(vars: DeleteAccountContactsVariables): MutationPromise<DeleteAccountContactsData, DeleteAccountContactsVariables>;

interface DeleteAccountContactsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAccountContactsVariables): MutationRef<DeleteAccountContactsData, DeleteAccountContactsVariables>;
}
export const deleteAccountContactsRef: DeleteAccountContactsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAccountContacts(dc: DataConnect, vars: DeleteAccountContactsVariables): MutationPromise<DeleteAccountContactsData, DeleteAccountContactsVariables>;

interface DeleteAccountContactsRef {
  ...
  (dc: DataConnect, vars: DeleteAccountContactsVariables): MutationRef<DeleteAccountContactsData, DeleteAccountContactsVariables>;
}
export const deleteAccountContactsRef: DeleteAccountContactsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAccountContactsRef:
```typescript
const name = deleteAccountContactsRef.operationName;
console.log(name);
```

### Variables
The `DeleteAccountContacts` mutation requires an argument of type `DeleteAccountContactsVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteAccountContactsVariables {
  accountId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteAccountContacts` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAccountContactsData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAccountContactsData {
  accountContact_deleteMany: number;
}
```
### Using `DeleteAccountContacts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAccountContacts, DeleteAccountContactsVariables } from '@generated/data-connector-web';

// The `DeleteAccountContacts` mutation requires an argument of type `DeleteAccountContactsVariables`:
const deleteAccountContactsVars: DeleteAccountContactsVariables = {
  accountId: ..., 
};

// Call the `deleteAccountContacts()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAccountContacts(deleteAccountContactsVars);
// Variables can be defined inline as well.
const { data } = await deleteAccountContacts({ accountId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAccountContacts(dataConnect, deleteAccountContactsVars);

console.log(data.accountContact_deleteMany);

// Or, you can use the `Promise` API.
deleteAccountContacts(deleteAccountContactsVars).then((response) => {
  const data = response.data;
  console.log(data.accountContact_deleteMany);
});
```

### Using `DeleteAccountContacts`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAccountContactsRef, DeleteAccountContactsVariables } from '@generated/data-connector-web';

// The `DeleteAccountContacts` mutation requires an argument of type `DeleteAccountContactsVariables`:
const deleteAccountContactsVars: DeleteAccountContactsVariables = {
  accountId: ..., 
};

// Call the `deleteAccountContactsRef()` function to get a reference to the mutation.
const ref = deleteAccountContactsRef(deleteAccountContactsVars);
// Variables can be defined inline as well.
const ref = deleteAccountContactsRef({ accountId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAccountContactsRef(dataConnect, deleteAccountContactsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.accountContact_deleteMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.accountContact_deleteMany);
});
```

## DeleteAccount
You can execute the `DeleteAccount` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
deleteAccount(vars: DeleteAccountVariables): MutationPromise<DeleteAccountData, DeleteAccountVariables>;

interface DeleteAccountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAccountVariables): MutationRef<DeleteAccountData, DeleteAccountVariables>;
}
export const deleteAccountRef: DeleteAccountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAccount(dc: DataConnect, vars: DeleteAccountVariables): MutationPromise<DeleteAccountData, DeleteAccountVariables>;

interface DeleteAccountRef {
  ...
  (dc: DataConnect, vars: DeleteAccountVariables): MutationRef<DeleteAccountData, DeleteAccountVariables>;
}
export const deleteAccountRef: DeleteAccountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAccountRef:
```typescript
const name = deleteAccountRef.operationName;
console.log(name);
```

### Variables
The `DeleteAccount` mutation requires an argument of type `DeleteAccountVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteAccountVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteAccount` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAccountData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAccountData {
  account_delete?: Account_Key | null;
}
```
### Using `DeleteAccount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAccount, DeleteAccountVariables } from '@generated/data-connector-web';

// The `DeleteAccount` mutation requires an argument of type `DeleteAccountVariables`:
const deleteAccountVars: DeleteAccountVariables = {
  id: ..., 
};

// Call the `deleteAccount()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAccount(deleteAccountVars);
// Variables can be defined inline as well.
const { data } = await deleteAccount({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAccount(dataConnect, deleteAccountVars);

console.log(data.account_delete);

// Or, you can use the `Promise` API.
deleteAccount(deleteAccountVars).then((response) => {
  const data = response.data;
  console.log(data.account_delete);
});
```

### Using `DeleteAccount`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAccountRef, DeleteAccountVariables } from '@generated/data-connector-web';

// The `DeleteAccount` mutation requires an argument of type `DeleteAccountVariables`:
const deleteAccountVars: DeleteAccountVariables = {
  id: ..., 
};

// Call the `deleteAccountRef()` function to get a reference to the mutation.
const ref = deleteAccountRef(deleteAccountVars);
// Variables can be defined inline as well.
const ref = deleteAccountRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAccountRef(dataConnect, deleteAccountVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.account_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.account_delete);
});
```

## CreateAccountContact
You can execute the `CreateAccountContact` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createAccountContact(vars: CreateAccountContactVariables): MutationPromise<CreateAccountContactData, CreateAccountContactVariables>;

interface CreateAccountContactRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAccountContactVariables): MutationRef<CreateAccountContactData, CreateAccountContactVariables>;
}
export const createAccountContactRef: CreateAccountContactRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAccountContact(dc: DataConnect, vars: CreateAccountContactVariables): MutationPromise<CreateAccountContactData, CreateAccountContactVariables>;

interface CreateAccountContactRef {
  ...
  (dc: DataConnect, vars: CreateAccountContactVariables): MutationRef<CreateAccountContactData, CreateAccountContactVariables>;
}
export const createAccountContactRef: CreateAccountContactRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAccountContactRef:
```typescript
const name = createAccountContactRef.operationName;
console.log(name);
```

### Variables
The `CreateAccountContact` mutation requires an argument of type `CreateAccountContactVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
Recall that executing the `CreateAccountContact` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAccountContactData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAccountContactData {
  accountContact_insert: AccountContact_Key;
}
```
### Using `CreateAccountContact`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAccountContact, CreateAccountContactVariables } from '@generated/data-connector-web';

// The `CreateAccountContact` mutation requires an argument of type `CreateAccountContactVariables`:
const createAccountContactVars: CreateAccountContactVariables = {
  id: ..., 
  accountId: ..., 
  name: ..., 
  email: ..., // optional
  phoneNumber: ..., // optional
  role: ..., // optional
};

// Call the `createAccountContact()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAccountContact(createAccountContactVars);
// Variables can be defined inline as well.
const { data } = await createAccountContact({ id: ..., accountId: ..., name: ..., email: ..., phoneNumber: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAccountContact(dataConnect, createAccountContactVars);

console.log(data.accountContact_insert);

// Or, you can use the `Promise` API.
createAccountContact(createAccountContactVars).then((response) => {
  const data = response.data;
  console.log(data.accountContact_insert);
});
```

### Using `CreateAccountContact`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAccountContactRef, CreateAccountContactVariables } from '@generated/data-connector-web';

// The `CreateAccountContact` mutation requires an argument of type `CreateAccountContactVariables`:
const createAccountContactVars: CreateAccountContactVariables = {
  id: ..., 
  accountId: ..., 
  name: ..., 
  email: ..., // optional
  phoneNumber: ..., // optional
  role: ..., // optional
};

// Call the `createAccountContactRef()` function to get a reference to the mutation.
const ref = createAccountContactRef(createAccountContactVars);
// Variables can be defined inline as well.
const ref = createAccountContactRef({ id: ..., accountId: ..., name: ..., email: ..., phoneNumber: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAccountContactRef(dataConnect, createAccountContactVars);

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

## UpdateAccountContact
You can execute the `UpdateAccountContact` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateAccountContact(vars: UpdateAccountContactVariables): MutationPromise<UpdateAccountContactData, UpdateAccountContactVariables>;

interface UpdateAccountContactRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAccountContactVariables): MutationRef<UpdateAccountContactData, UpdateAccountContactVariables>;
}
export const updateAccountContactRef: UpdateAccountContactRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAccountContact(dc: DataConnect, vars: UpdateAccountContactVariables): MutationPromise<UpdateAccountContactData, UpdateAccountContactVariables>;

interface UpdateAccountContactRef {
  ...
  (dc: DataConnect, vars: UpdateAccountContactVariables): MutationRef<UpdateAccountContactData, UpdateAccountContactVariables>;
}
export const updateAccountContactRef: UpdateAccountContactRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAccountContactRef:
```typescript
const name = updateAccountContactRef.operationName;
console.log(name);
```

### Variables
The `UpdateAccountContact` mutation requires an argument of type `UpdateAccountContactVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateAccountContactVariables {
  id: UUIDString;
  name?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  role?: string | null;
}
```
### Return Type
Recall that executing the `UpdateAccountContact` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAccountContactData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAccountContactData {
  accountContact_update?: AccountContact_Key | null;
}
```
### Using `UpdateAccountContact`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAccountContact, UpdateAccountContactVariables } from '@generated/data-connector-web';

// The `UpdateAccountContact` mutation requires an argument of type `UpdateAccountContactVariables`:
const updateAccountContactVars: UpdateAccountContactVariables = {
  id: ..., 
  name: ..., // optional
  email: ..., // optional
  phoneNumber: ..., // optional
  role: ..., // optional
};

// Call the `updateAccountContact()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAccountContact(updateAccountContactVars);
// Variables can be defined inline as well.
const { data } = await updateAccountContact({ id: ..., name: ..., email: ..., phoneNumber: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAccountContact(dataConnect, updateAccountContactVars);

console.log(data.accountContact_update);

// Or, you can use the `Promise` API.
updateAccountContact(updateAccountContactVars).then((response) => {
  const data = response.data;
  console.log(data.accountContact_update);
});
```

### Using `UpdateAccountContact`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAccountContactRef, UpdateAccountContactVariables } from '@generated/data-connector-web';

// The `UpdateAccountContact` mutation requires an argument of type `UpdateAccountContactVariables`:
const updateAccountContactVars: UpdateAccountContactVariables = {
  id: ..., 
  name: ..., // optional
  email: ..., // optional
  phoneNumber: ..., // optional
  role: ..., // optional
};

// Call the `updateAccountContactRef()` function to get a reference to the mutation.
const ref = updateAccountContactRef(updateAccountContactVars);
// Variables can be defined inline as well.
const ref = updateAccountContactRef({ id: ..., name: ..., email: ..., phoneNumber: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAccountContactRef(dataConnect, updateAccountContactVars);

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

## DeleteAccountContact
You can execute the `DeleteAccountContact` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
deleteAccountContact(vars: DeleteAccountContactVariables): MutationPromise<DeleteAccountContactData, DeleteAccountContactVariables>;

interface DeleteAccountContactRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAccountContactVariables): MutationRef<DeleteAccountContactData, DeleteAccountContactVariables>;
}
export const deleteAccountContactRef: DeleteAccountContactRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAccountContact(dc: DataConnect, vars: DeleteAccountContactVariables): MutationPromise<DeleteAccountContactData, DeleteAccountContactVariables>;

interface DeleteAccountContactRef {
  ...
  (dc: DataConnect, vars: DeleteAccountContactVariables): MutationRef<DeleteAccountContactData, DeleteAccountContactVariables>;
}
export const deleteAccountContactRef: DeleteAccountContactRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAccountContactRef:
```typescript
const name = deleteAccountContactRef.operationName;
console.log(name);
```

### Variables
The `DeleteAccountContact` mutation requires an argument of type `DeleteAccountContactVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteAccountContactVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteAccountContact` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAccountContactData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAccountContactData {
  accountContact_delete?: AccountContact_Key | null;
}
```
### Using `DeleteAccountContact`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAccountContact, DeleteAccountContactVariables } from '@generated/data-connector-web';

// The `DeleteAccountContact` mutation requires an argument of type `DeleteAccountContactVariables`:
const deleteAccountContactVars: DeleteAccountContactVariables = {
  id: ..., 
};

// Call the `deleteAccountContact()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAccountContact(deleteAccountContactVars);
// Variables can be defined inline as well.
const { data } = await deleteAccountContact({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAccountContact(dataConnect, deleteAccountContactVars);

console.log(data.accountContact_delete);

// Or, you can use the `Promise` API.
deleteAccountContact(deleteAccountContactVars).then((response) => {
  const data = response.data;
  console.log(data.accountContact_delete);
});
```

### Using `DeleteAccountContact`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAccountContactRef, DeleteAccountContactVariables } from '@generated/data-connector-web';

// The `DeleteAccountContact` mutation requires an argument of type `DeleteAccountContactVariables`:
const deleteAccountContactVars: DeleteAccountContactVariables = {
  id: ..., 
};

// Call the `deleteAccountContactRef()` function to get a reference to the mutation.
const ref = deleteAccountContactRef(deleteAccountContactVars);
// Variables can be defined inline as well.
const ref = deleteAccountContactRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAccountContactRef(dataConnect, deleteAccountContactVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.accountContact_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.accountContact_delete);
});
```

## CreateProjectFromUpload
You can execute the `CreateProjectFromUpload` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createProjectFromUpload(vars: CreateProjectFromUploadVariables): MutationPromise<CreateProjectFromUploadData, CreateProjectFromUploadVariables>;

interface CreateProjectFromUploadRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectFromUploadVariables): MutationRef<CreateProjectFromUploadData, CreateProjectFromUploadVariables>;
}
export const createProjectFromUploadRef: CreateProjectFromUploadRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProjectFromUpload(dc: DataConnect, vars: CreateProjectFromUploadVariables): MutationPromise<CreateProjectFromUploadData, CreateProjectFromUploadVariables>;

interface CreateProjectFromUploadRef {
  ...
  (dc: DataConnect, vars: CreateProjectFromUploadVariables): MutationRef<CreateProjectFromUploadData, CreateProjectFromUploadVariables>;
}
export const createProjectFromUploadRef: CreateProjectFromUploadRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProjectFromUploadRef:
```typescript
const name = createProjectFromUploadRef.operationName;
console.log(name);
```

### Variables
The `CreateProjectFromUpload` mutation requires an argument of type `CreateProjectFromUploadVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
Recall that executing the `CreateProjectFromUpload` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProjectFromUploadData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProjectFromUploadData {
  project_insert: Project_Key;
}
```
### Using `CreateProjectFromUpload`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProjectFromUpload, CreateProjectFromUploadVariables } from '@generated/data-connector-web';

// The `CreateProjectFromUpload` mutation requires an argument of type `CreateProjectFromUploadVariables`:
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

// Call the `createProjectFromUpload()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProjectFromUpload(createProjectFromUploadVars);
// Variables can be defined inline as well.
const { data } = await createProjectFromUpload({ id: ..., ownerId: ..., accountId: ..., name: ..., address: ..., originalFileName: ..., uploadType: ..., originalPath: ..., status: ..., salesStatus: ..., pageCount: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProjectFromUpload(dataConnect, createProjectFromUploadVars);

console.log(data.project_insert);

// Or, you can use the `Promise` API.
createProjectFromUpload(createProjectFromUploadVars).then((response) => {
  const data = response.data;
  console.log(data.project_insert);
});
```

### Using `CreateProjectFromUpload`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProjectFromUploadRef, CreateProjectFromUploadVariables } from '@generated/data-connector-web';

// The `CreateProjectFromUpload` mutation requires an argument of type `CreateProjectFromUploadVariables`:
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

// Call the `createProjectFromUploadRef()` function to get a reference to the mutation.
const ref = createProjectFromUploadRef(createProjectFromUploadVars);
// Variables can be defined inline as well.
const ref = createProjectFromUploadRef({ id: ..., ownerId: ..., accountId: ..., name: ..., address: ..., originalFileName: ..., uploadType: ..., originalPath: ..., status: ..., salesStatus: ..., pageCount: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProjectFromUploadRef(dataConnect, createProjectFromUploadVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_insert);
});
```

## UpdateProject
You can execute the `UpdateProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateProject(vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;

interface UpdateProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
}
export const updateProjectRef: UpdateProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProject(dc: DataConnect, vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;

interface UpdateProjectRef {
  ...
  (dc: DataConnect, vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
}
export const updateProjectRef: UpdateProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProjectRef:
```typescript
const name = updateProjectRef.operationName;
console.log(name);
```

### Variables
The `UpdateProject` mutation requires an argument of type `UpdateProjectVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProjectVariables {
  id: UUIDString;
  name?: string | null;
  accountId?: UUIDString | null;
  address?: string | null;
  salesStatus?: string | null;
}
```
### Return Type
Recall that executing the `UpdateProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProjectData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProjectData {
  project_update?: Project_Key | null;
}
```
### Using `UpdateProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProject, UpdateProjectVariables } from '@generated/data-connector-web';

// The `UpdateProject` mutation requires an argument of type `UpdateProjectVariables`:
const updateProjectVars: UpdateProjectVariables = {
  id: ..., 
  name: ..., // optional
  accountId: ..., // optional
  address: ..., // optional
  salesStatus: ..., // optional
};

// Call the `updateProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProject(updateProjectVars);
// Variables can be defined inline as well.
const { data } = await updateProject({ id: ..., name: ..., accountId: ..., address: ..., salesStatus: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProject(dataConnect, updateProjectVars);

console.log(data.project_update);

// Or, you can use the `Promise` API.
updateProject(updateProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

### Using `UpdateProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProjectRef, UpdateProjectVariables } from '@generated/data-connector-web';

// The `UpdateProject` mutation requires an argument of type `UpdateProjectVariables`:
const updateProjectVars: UpdateProjectVariables = {
  id: ..., 
  name: ..., // optional
  accountId: ..., // optional
  address: ..., // optional
  salesStatus: ..., // optional
};

// Call the `updateProjectRef()` function to get a reference to the mutation.
const ref = updateProjectRef(updateProjectVars);
// Variables can be defined inline as well.
const ref = updateProjectRef({ id: ..., name: ..., accountId: ..., address: ..., salesStatus: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProjectRef(dataConnect, updateProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

## RenameProject
You can execute the `RenameProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
renameProject(vars: RenameProjectVariables): MutationPromise<RenameProjectData, RenameProjectVariables>;

interface RenameProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RenameProjectVariables): MutationRef<RenameProjectData, RenameProjectVariables>;
}
export const renameProjectRef: RenameProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
renameProject(dc: DataConnect, vars: RenameProjectVariables): MutationPromise<RenameProjectData, RenameProjectVariables>;

interface RenameProjectRef {
  ...
  (dc: DataConnect, vars: RenameProjectVariables): MutationRef<RenameProjectData, RenameProjectVariables>;
}
export const renameProjectRef: RenameProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the renameProjectRef:
```typescript
const name = renameProjectRef.operationName;
console.log(name);
```

### Variables
The `RenameProject` mutation requires an argument of type `RenameProjectVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RenameProjectVariables {
  id: UUIDString;
  name: string;
}
```
### Return Type
Recall that executing the `RenameProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RenameProjectData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RenameProjectData {
  project_update?: Project_Key | null;
}
```
### Using `RenameProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, renameProject, RenameProjectVariables } from '@generated/data-connector-web';

// The `RenameProject` mutation requires an argument of type `RenameProjectVariables`:
const renameProjectVars: RenameProjectVariables = {
  id: ..., 
  name: ..., 
};

// Call the `renameProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await renameProject(renameProjectVars);
// Variables can be defined inline as well.
const { data } = await renameProject({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await renameProject(dataConnect, renameProjectVars);

console.log(data.project_update);

// Or, you can use the `Promise` API.
renameProject(renameProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

### Using `RenameProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, renameProjectRef, RenameProjectVariables } from '@generated/data-connector-web';

// The `RenameProject` mutation requires an argument of type `RenameProjectVariables`:
const renameProjectVars: RenameProjectVariables = {
  id: ..., 
  name: ..., 
};

// Call the `renameProjectRef()` function to get a reference to the mutation.
const ref = renameProjectRef(renameProjectVars);
// Variables can be defined inline as well.
const ref = renameProjectRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = renameProjectRef(dataConnect, renameProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

## TouchProject
You can execute the `TouchProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
touchProject(vars: TouchProjectVariables): MutationPromise<TouchProjectData, TouchProjectVariables>;

interface TouchProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: TouchProjectVariables): MutationRef<TouchProjectData, TouchProjectVariables>;
}
export const touchProjectRef: TouchProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
touchProject(dc: DataConnect, vars: TouchProjectVariables): MutationPromise<TouchProjectData, TouchProjectVariables>;

interface TouchProjectRef {
  ...
  (dc: DataConnect, vars: TouchProjectVariables): MutationRef<TouchProjectData, TouchProjectVariables>;
}
export const touchProjectRef: TouchProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the touchProjectRef:
```typescript
const name = touchProjectRef.operationName;
console.log(name);
```

### Variables
The `TouchProject` mutation requires an argument of type `TouchProjectVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface TouchProjectVariables {
  id: UUIDString;
  status?: string | null;
  processingError?: string | null;
}
```
### Return Type
Recall that executing the `TouchProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `TouchProjectData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface TouchProjectData {
  project_update?: Project_Key | null;
}
```
### Using `TouchProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, touchProject, TouchProjectVariables } from '@generated/data-connector-web';

// The `TouchProject` mutation requires an argument of type `TouchProjectVariables`:
const touchProjectVars: TouchProjectVariables = {
  id: ..., 
  status: ..., // optional
  processingError: ..., // optional
};

// Call the `touchProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await touchProject(touchProjectVars);
// Variables can be defined inline as well.
const { data } = await touchProject({ id: ..., status: ..., processingError: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await touchProject(dataConnect, touchProjectVars);

console.log(data.project_update);

// Or, you can use the `Promise` API.
touchProject(touchProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

### Using `TouchProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, touchProjectRef, TouchProjectVariables } from '@generated/data-connector-web';

// The `TouchProject` mutation requires an argument of type `TouchProjectVariables`:
const touchProjectVars: TouchProjectVariables = {
  id: ..., 
  status: ..., // optional
  processingError: ..., // optional
};

// Call the `touchProjectRef()` function to get a reference to the mutation.
const ref = touchProjectRef(touchProjectVars);
// Variables can be defined inline as well.
const ref = touchProjectRef({ id: ..., status: ..., processingError: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = touchProjectRef(dataConnect, touchProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

## DeleteFloorplanPages
You can execute the `DeleteFloorplanPages` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
deleteFloorplanPages(vars: DeleteFloorplanPagesVariables): MutationPromise<DeleteFloorplanPagesData, DeleteFloorplanPagesVariables>;

interface DeleteFloorplanPagesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFloorplanPagesVariables): MutationRef<DeleteFloorplanPagesData, DeleteFloorplanPagesVariables>;
}
export const deleteFloorplanPagesRef: DeleteFloorplanPagesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteFloorplanPages(dc: DataConnect, vars: DeleteFloorplanPagesVariables): MutationPromise<DeleteFloorplanPagesData, DeleteFloorplanPagesVariables>;

interface DeleteFloorplanPagesRef {
  ...
  (dc: DataConnect, vars: DeleteFloorplanPagesVariables): MutationRef<DeleteFloorplanPagesData, DeleteFloorplanPagesVariables>;
}
export const deleteFloorplanPagesRef: DeleteFloorplanPagesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteFloorplanPagesRef:
```typescript
const name = deleteFloorplanPagesRef.operationName;
console.log(name);
```

### Variables
The `DeleteFloorplanPages` mutation requires an argument of type `DeleteFloorplanPagesVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteFloorplanPagesVariables {
  projectId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteFloorplanPages` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteFloorplanPagesData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteFloorplanPagesData {
  floorplanPage_deleteMany: number;
}
```
### Using `DeleteFloorplanPages`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteFloorplanPages, DeleteFloorplanPagesVariables } from '@generated/data-connector-web';

// The `DeleteFloorplanPages` mutation requires an argument of type `DeleteFloorplanPagesVariables`:
const deleteFloorplanPagesVars: DeleteFloorplanPagesVariables = {
  projectId: ..., 
};

// Call the `deleteFloorplanPages()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteFloorplanPages(deleteFloorplanPagesVars);
// Variables can be defined inline as well.
const { data } = await deleteFloorplanPages({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteFloorplanPages(dataConnect, deleteFloorplanPagesVars);

console.log(data.floorplanPage_deleteMany);

// Or, you can use the `Promise` API.
deleteFloorplanPages(deleteFloorplanPagesVars).then((response) => {
  const data = response.data;
  console.log(data.floorplanPage_deleteMany);
});
```

### Using `DeleteFloorplanPages`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteFloorplanPagesRef, DeleteFloorplanPagesVariables } from '@generated/data-connector-web';

// The `DeleteFloorplanPages` mutation requires an argument of type `DeleteFloorplanPagesVariables`:
const deleteFloorplanPagesVars: DeleteFloorplanPagesVariables = {
  projectId: ..., 
};

// Call the `deleteFloorplanPagesRef()` function to get a reference to the mutation.
const ref = deleteFloorplanPagesRef(deleteFloorplanPagesVars);
// Variables can be defined inline as well.
const ref = deleteFloorplanPagesRef({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteFloorplanPagesRef(dataConnect, deleteFloorplanPagesVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.floorplanPage_deleteMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.floorplanPage_deleteMany);
});
```

## DeleteProject
You can execute the `DeleteProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
deleteProject(vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface DeleteProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
}
export const deleteProjectRef: DeleteProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteProject(dc: DataConnect, vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface DeleteProjectRef {
  ...
  (dc: DataConnect, vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
}
export const deleteProjectRef: DeleteProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteProjectRef:
```typescript
const name = deleteProjectRef.operationName;
console.log(name);
```

### Variables
The `DeleteProject` mutation requires an argument of type `DeleteProjectVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteProjectVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteProjectData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteProjectData {
  project_delete?: Project_Key | null;
}
```
### Using `DeleteProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteProject, DeleteProjectVariables } from '@generated/data-connector-web';

// The `DeleteProject` mutation requires an argument of type `DeleteProjectVariables`:
const deleteProjectVars: DeleteProjectVariables = {
  id: ..., 
};

// Call the `deleteProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteProject(deleteProjectVars);
// Variables can be defined inline as well.
const { data } = await deleteProject({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteProject(dataConnect, deleteProjectVars);

console.log(data.project_delete);

// Or, you can use the `Promise` API.
deleteProject(deleteProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_delete);
});
```

### Using `DeleteProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteProjectRef, DeleteProjectVariables } from '@generated/data-connector-web';

// The `DeleteProject` mutation requires an argument of type `DeleteProjectVariables`:
const deleteProjectVars: DeleteProjectVariables = {
  id: ..., 
};

// Call the `deleteProjectRef()` function to get a reference to the mutation.
const ref = deleteProjectRef(deleteProjectVars);
// Variables can be defined inline as well.
const ref = deleteProjectRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteProjectRef(dataConnect, deleteProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_delete);
});
```

## CreateFloorplanPage
You can execute the `CreateFloorplanPage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createFloorplanPage(vars: CreateFloorplanPageVariables): MutationPromise<CreateFloorplanPageData, CreateFloorplanPageVariables>;

interface CreateFloorplanPageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFloorplanPageVariables): MutationRef<CreateFloorplanPageData, CreateFloorplanPageVariables>;
}
export const createFloorplanPageRef: CreateFloorplanPageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createFloorplanPage(dc: DataConnect, vars: CreateFloorplanPageVariables): MutationPromise<CreateFloorplanPageData, CreateFloorplanPageVariables>;

interface CreateFloorplanPageRef {
  ...
  (dc: DataConnect, vars: CreateFloorplanPageVariables): MutationRef<CreateFloorplanPageData, CreateFloorplanPageVariables>;
}
export const createFloorplanPageRef: CreateFloorplanPageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createFloorplanPageRef:
```typescript
const name = createFloorplanPageRef.operationName;
console.log(name);
```

### Variables
The `CreateFloorplanPage` mutation requires an argument of type `CreateFloorplanPageVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
Recall that executing the `CreateFloorplanPage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateFloorplanPageData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateFloorplanPageData {
  floorplanPage_insert: FloorplanPage_Key;
}
```
### Using `CreateFloorplanPage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createFloorplanPage, CreateFloorplanPageVariables } from '@generated/data-connector-web';

// The `CreateFloorplanPage` mutation requires an argument of type `CreateFloorplanPageVariables`:
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

// Call the `createFloorplanPage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createFloorplanPage(createFloorplanPageVars);
// Variables can be defined inline as well.
const { data } = await createFloorplanPage({ projectId: ..., pageNumber: ..., status: ..., processingError: ..., sourceImagePath: ..., previewImagePath: ..., rawJsonPath: ..., rawFloorplanPath: ..., overlayJson: ..., scaleMmPerPx: ..., ceilingHeightMm: ..., referencePointsJson: ..., referenceLengthMm: ..., processingStrategy: ..., processingMetadataJson: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createFloorplanPage(dataConnect, createFloorplanPageVars);

console.log(data.floorplanPage_insert);

// Or, you can use the `Promise` API.
createFloorplanPage(createFloorplanPageVars).then((response) => {
  const data = response.data;
  console.log(data.floorplanPage_insert);
});
```

### Using `CreateFloorplanPage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createFloorplanPageRef, CreateFloorplanPageVariables } from '@generated/data-connector-web';

// The `CreateFloorplanPage` mutation requires an argument of type `CreateFloorplanPageVariables`:
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

// Call the `createFloorplanPageRef()` function to get a reference to the mutation.
const ref = createFloorplanPageRef(createFloorplanPageVars);
// Variables can be defined inline as well.
const ref = createFloorplanPageRef({ projectId: ..., pageNumber: ..., status: ..., processingError: ..., sourceImagePath: ..., previewImagePath: ..., rawJsonPath: ..., rawFloorplanPath: ..., overlayJson: ..., scaleMmPerPx: ..., ceilingHeightMm: ..., referencePointsJson: ..., referenceLengthMm: ..., processingStrategy: ..., processingMetadataJson: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createFloorplanPageRef(dataConnect, createFloorplanPageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.floorplanPage_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.floorplanPage_insert);
});
```

## UpdateFloorplanPageAnalysis
You can execute the `UpdateFloorplanPageAnalysis` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateFloorplanPageAnalysis(vars: UpdateFloorplanPageAnalysisVariables): MutationPromise<UpdateFloorplanPageAnalysisData, UpdateFloorplanPageAnalysisVariables>;

interface UpdateFloorplanPageAnalysisRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFloorplanPageAnalysisVariables): MutationRef<UpdateFloorplanPageAnalysisData, UpdateFloorplanPageAnalysisVariables>;
}
export const updateFloorplanPageAnalysisRef: UpdateFloorplanPageAnalysisRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateFloorplanPageAnalysis(dc: DataConnect, vars: UpdateFloorplanPageAnalysisVariables): MutationPromise<UpdateFloorplanPageAnalysisData, UpdateFloorplanPageAnalysisVariables>;

interface UpdateFloorplanPageAnalysisRef {
  ...
  (dc: DataConnect, vars: UpdateFloorplanPageAnalysisVariables): MutationRef<UpdateFloorplanPageAnalysisData, UpdateFloorplanPageAnalysisVariables>;
}
export const updateFloorplanPageAnalysisRef: UpdateFloorplanPageAnalysisRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateFloorplanPageAnalysisRef:
```typescript
const name = updateFloorplanPageAnalysisRef.operationName;
console.log(name);
```

### Variables
The `UpdateFloorplanPageAnalysis` mutation requires an argument of type `UpdateFloorplanPageAnalysisVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
Recall that executing the `UpdateFloorplanPageAnalysis` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateFloorplanPageAnalysisData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateFloorplanPageAnalysisData {
  floorplanPage_update?: FloorplanPage_Key | null;
}
```
### Using `UpdateFloorplanPageAnalysis`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateFloorplanPageAnalysis, UpdateFloorplanPageAnalysisVariables } from '@generated/data-connector-web';

// The `UpdateFloorplanPageAnalysis` mutation requires an argument of type `UpdateFloorplanPageAnalysisVariables`:
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

// Call the `updateFloorplanPageAnalysis()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateFloorplanPageAnalysis(updateFloorplanPageAnalysisVars);
// Variables can be defined inline as well.
const { data } = await updateFloorplanPageAnalysis({ id: ..., status: ..., processingError: ..., sourceImagePath: ..., previewImagePath: ..., rawJsonPath: ..., rawFloorplanPath: ..., overlayJson: ..., scaleMmPerPx: ..., ceilingHeightMm: ..., referencePointsJson: ..., referenceLengthMm: ..., processingStrategy: ..., processingMetadataJson: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateFloorplanPageAnalysis(dataConnect, updateFloorplanPageAnalysisVars);

console.log(data.floorplanPage_update);

// Or, you can use the `Promise` API.
updateFloorplanPageAnalysis(updateFloorplanPageAnalysisVars).then((response) => {
  const data = response.data;
  console.log(data.floorplanPage_update);
});
```

### Using `UpdateFloorplanPageAnalysis`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateFloorplanPageAnalysisRef, UpdateFloorplanPageAnalysisVariables } from '@generated/data-connector-web';

// The `UpdateFloorplanPageAnalysis` mutation requires an argument of type `UpdateFloorplanPageAnalysisVariables`:
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

// Call the `updateFloorplanPageAnalysisRef()` function to get a reference to the mutation.
const ref = updateFloorplanPageAnalysisRef(updateFloorplanPageAnalysisVars);
// Variables can be defined inline as well.
const ref = updateFloorplanPageAnalysisRef({ id: ..., status: ..., processingError: ..., sourceImagePath: ..., previewImagePath: ..., rawJsonPath: ..., rawFloorplanPath: ..., overlayJson: ..., scaleMmPerPx: ..., ceilingHeightMm: ..., referencePointsJson: ..., referenceLengthMm: ..., processingStrategy: ..., processingMetadataJson: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateFloorplanPageAnalysisRef(dataConnect, updateFloorplanPageAnalysisVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.floorplanPage_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.floorplanPage_update);
});
```

## UpdateFloorplanPage
You can execute the `UpdateFloorplanPage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateFloorplanPage(vars: UpdateFloorplanPageVariables): MutationPromise<UpdateFloorplanPageData, UpdateFloorplanPageVariables>;

interface UpdateFloorplanPageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFloorplanPageVariables): MutationRef<UpdateFloorplanPageData, UpdateFloorplanPageVariables>;
}
export const updateFloorplanPageRef: UpdateFloorplanPageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateFloorplanPage(dc: DataConnect, vars: UpdateFloorplanPageVariables): MutationPromise<UpdateFloorplanPageData, UpdateFloorplanPageVariables>;

interface UpdateFloorplanPageRef {
  ...
  (dc: DataConnect, vars: UpdateFloorplanPageVariables): MutationRef<UpdateFloorplanPageData, UpdateFloorplanPageVariables>;
}
export const updateFloorplanPageRef: UpdateFloorplanPageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateFloorplanPageRef:
```typescript
const name = updateFloorplanPageRef.operationName;
console.log(name);
```

### Variables
The `UpdateFloorplanPage` mutation requires an argument of type `UpdateFloorplanPageVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
Recall that executing the `UpdateFloorplanPage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateFloorplanPageData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateFloorplanPageData {
  floorplanPage_update?: FloorplanPage_Key | null;
}
```
### Using `UpdateFloorplanPage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateFloorplanPage, UpdateFloorplanPageVariables } from '@generated/data-connector-web';

// The `UpdateFloorplanPage` mutation requires an argument of type `UpdateFloorplanPageVariables`:
const updateFloorplanPageVars: UpdateFloorplanPageVariables = {
  id: ..., 
  overlayJson: ..., // optional
  scaleMmPerPx: ..., // optional
  ceilingHeightMm: ..., // optional
  referencePointsJson: ..., // optional
  referenceLengthMm: ..., // optional
};

// Call the `updateFloorplanPage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateFloorplanPage(updateFloorplanPageVars);
// Variables can be defined inline as well.
const { data } = await updateFloorplanPage({ id: ..., overlayJson: ..., scaleMmPerPx: ..., ceilingHeightMm: ..., referencePointsJson: ..., referenceLengthMm: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateFloorplanPage(dataConnect, updateFloorplanPageVars);

console.log(data.floorplanPage_update);

// Or, you can use the `Promise` API.
updateFloorplanPage(updateFloorplanPageVars).then((response) => {
  const data = response.data;
  console.log(data.floorplanPage_update);
});
```

### Using `UpdateFloorplanPage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateFloorplanPageRef, UpdateFloorplanPageVariables } from '@generated/data-connector-web';

// The `UpdateFloorplanPage` mutation requires an argument of type `UpdateFloorplanPageVariables`:
const updateFloorplanPageVars: UpdateFloorplanPageVariables = {
  id: ..., 
  overlayJson: ..., // optional
  scaleMmPerPx: ..., // optional
  ceilingHeightMm: ..., // optional
  referencePointsJson: ..., // optional
  referenceLengthMm: ..., // optional
};

// Call the `updateFloorplanPageRef()` function to get a reference to the mutation.
const ref = updateFloorplanPageRef(updateFloorplanPageVars);
// Variables can be defined inline as well.
const ref = updateFloorplanPageRef({ id: ..., overlayJson: ..., scaleMmPerPx: ..., ceilingHeightMm: ..., referencePointsJson: ..., referenceLengthMm: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateFloorplanPageRef(dataConnect, updateFloorplanPageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.floorplanPage_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.floorplanPage_update);
});
```

## UpdateFloorplanPages
You can execute the `UpdateFloorplanPages` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateFloorplanPages(vars: UpdateFloorplanPagesVariables): MutationPromise<UpdateFloorplanPagesData, UpdateFloorplanPagesVariables>;

interface UpdateFloorplanPagesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFloorplanPagesVariables): MutationRef<UpdateFloorplanPagesData, UpdateFloorplanPagesVariables>;
}
export const updateFloorplanPagesRef: UpdateFloorplanPagesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateFloorplanPages(dc: DataConnect, vars: UpdateFloorplanPagesVariables): MutationPromise<UpdateFloorplanPagesData, UpdateFloorplanPagesVariables>;

interface UpdateFloorplanPagesRef {
  ...
  (dc: DataConnect, vars: UpdateFloorplanPagesVariables): MutationRef<UpdateFloorplanPagesData, UpdateFloorplanPagesVariables>;
}
export const updateFloorplanPagesRef: UpdateFloorplanPagesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateFloorplanPagesRef:
```typescript
const name = updateFloorplanPagesRef.operationName;
console.log(name);
```

### Variables
The `UpdateFloorplanPages` mutation requires an argument of type `UpdateFloorplanPagesVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateFloorplanPagesVariables {
  projectId: UUIDString;
  scaleMmPerPx?: number | null;
  ceilingHeightMm?: number | null;
}
```
### Return Type
Recall that executing the `UpdateFloorplanPages` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateFloorplanPagesData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateFloorplanPagesData {
  floorplanPage_updateMany: number;
}
```
### Using `UpdateFloorplanPages`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateFloorplanPages, UpdateFloorplanPagesVariables } from '@generated/data-connector-web';

// The `UpdateFloorplanPages` mutation requires an argument of type `UpdateFloorplanPagesVariables`:
const updateFloorplanPagesVars: UpdateFloorplanPagesVariables = {
  projectId: ..., 
  scaleMmPerPx: ..., // optional
  ceilingHeightMm: ..., // optional
};

// Call the `updateFloorplanPages()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateFloorplanPages(updateFloorplanPagesVars);
// Variables can be defined inline as well.
const { data } = await updateFloorplanPages({ projectId: ..., scaleMmPerPx: ..., ceilingHeightMm: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateFloorplanPages(dataConnect, updateFloorplanPagesVars);

console.log(data.floorplanPage_updateMany);

// Or, you can use the `Promise` API.
updateFloorplanPages(updateFloorplanPagesVars).then((response) => {
  const data = response.data;
  console.log(data.floorplanPage_updateMany);
});
```

### Using `UpdateFloorplanPages`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateFloorplanPagesRef, UpdateFloorplanPagesVariables } from '@generated/data-connector-web';

// The `UpdateFloorplanPages` mutation requires an argument of type `UpdateFloorplanPagesVariables`:
const updateFloorplanPagesVars: UpdateFloorplanPagesVariables = {
  projectId: ..., 
  scaleMmPerPx: ..., // optional
  ceilingHeightMm: ..., // optional
};

// Call the `updateFloorplanPagesRef()` function to get a reference to the mutation.
const ref = updateFloorplanPagesRef(updateFloorplanPagesVars);
// Variables can be defined inline as well.
const ref = updateFloorplanPagesRef({ projectId: ..., scaleMmPerPx: ..., ceilingHeightMm: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateFloorplanPagesRef(dataConnect, updateFloorplanPagesVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.floorplanPage_updateMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.floorplanPage_updateMany);
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
  description?: string | null;
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
  description: ..., // optional
};

// Call the `createQuestionnaireTemplateQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuestionnaireTemplateQuestion(createQuestionnaireTemplateQuestionVars);
// Variables can be defined inline as well.
const { data } = await createQuestionnaireTemplateQuestion({ id: ..., templateId: ..., label: ..., position: ..., description: ..., });

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
  description: ..., // optional
};

// Call the `createQuestionnaireTemplateQuestionRef()` function to get a reference to the mutation.
const ref = createQuestionnaireTemplateQuestionRef(createQuestionnaireTemplateQuestionVars);
// Variables can be defined inline as well.
const ref = createQuestionnaireTemplateQuestionRef({ id: ..., templateId: ..., label: ..., position: ..., description: ..., });

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
  description?: string | null;
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
  description: ..., // optional
};

// Call the `updateQuestionnaireTemplateQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateQuestionnaireTemplateQuestion(updateQuestionnaireTemplateQuestionVars);
// Variables can be defined inline as well.
const { data } = await updateQuestionnaireTemplateQuestion({ id: ..., templateId: ..., label: ..., position: ..., description: ..., });

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
  description: ..., // optional
};

// Call the `updateQuestionnaireTemplateQuestionRef()` function to get a reference to the mutation.
const ref = updateQuestionnaireTemplateQuestionRef(updateQuestionnaireTemplateQuestionVars);
// Variables can be defined inline as well.
const ref = updateQuestionnaireTemplateQuestionRef({ id: ..., templateId: ..., label: ..., position: ..., description: ..., });

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

## CreateProjectQuestionnaire
You can execute the `CreateProjectQuestionnaire` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createProjectQuestionnaire(vars: CreateProjectQuestionnaireVariables): MutationPromise<CreateProjectQuestionnaireData, CreateProjectQuestionnaireVariables>;

interface CreateProjectQuestionnaireRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectQuestionnaireVariables): MutationRef<CreateProjectQuestionnaireData, CreateProjectQuestionnaireVariables>;
}
export const createProjectQuestionnaireRef: CreateProjectQuestionnaireRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProjectQuestionnaire(dc: DataConnect, vars: CreateProjectQuestionnaireVariables): MutationPromise<CreateProjectQuestionnaireData, CreateProjectQuestionnaireVariables>;

interface CreateProjectQuestionnaireRef {
  ...
  (dc: DataConnect, vars: CreateProjectQuestionnaireVariables): MutationRef<CreateProjectQuestionnaireData, CreateProjectQuestionnaireVariables>;
}
export const createProjectQuestionnaireRef: CreateProjectQuestionnaireRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProjectQuestionnaireRef:
```typescript
const name = createProjectQuestionnaireRef.operationName;
console.log(name);
```

### Variables
The `CreateProjectQuestionnaire` mutation requires an argument of type `CreateProjectQuestionnaireVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateProjectQuestionnaireVariables {
  id: UUIDString;
  projectId: UUIDString;
  sourceTemplateId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `CreateProjectQuestionnaire` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProjectQuestionnaireData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProjectQuestionnaireData {
  projectQuestionnaire_insert: ProjectQuestionnaire_Key;
}
```
### Using `CreateProjectQuestionnaire`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProjectQuestionnaire, CreateProjectQuestionnaireVariables } from '@generated/data-connector-web';

// The `CreateProjectQuestionnaire` mutation requires an argument of type `CreateProjectQuestionnaireVariables`:
const createProjectQuestionnaireVars: CreateProjectQuestionnaireVariables = {
  id: ..., 
  projectId: ..., 
  sourceTemplateId: ..., // optional
};

// Call the `createProjectQuestionnaire()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProjectQuestionnaire(createProjectQuestionnaireVars);
// Variables can be defined inline as well.
const { data } = await createProjectQuestionnaire({ id: ..., projectId: ..., sourceTemplateId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProjectQuestionnaire(dataConnect, createProjectQuestionnaireVars);

console.log(data.projectQuestionnaire_insert);

// Or, you can use the `Promise` API.
createProjectQuestionnaire(createProjectQuestionnaireVars).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaire_insert);
});
```

### Using `CreateProjectQuestionnaire`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProjectQuestionnaireRef, CreateProjectQuestionnaireVariables } from '@generated/data-connector-web';

// The `CreateProjectQuestionnaire` mutation requires an argument of type `CreateProjectQuestionnaireVariables`:
const createProjectQuestionnaireVars: CreateProjectQuestionnaireVariables = {
  id: ..., 
  projectId: ..., 
  sourceTemplateId: ..., // optional
};

// Call the `createProjectQuestionnaireRef()` function to get a reference to the mutation.
const ref = createProjectQuestionnaireRef(createProjectQuestionnaireVars);
// Variables can be defined inline as well.
const ref = createProjectQuestionnaireRef({ id: ..., projectId: ..., sourceTemplateId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProjectQuestionnaireRef(dataConnect, createProjectQuestionnaireVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.projectQuestionnaire_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaire_insert);
});
```

## CreateProjectQuestionnaireAnswer
You can execute the `CreateProjectQuestionnaireAnswer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createProjectQuestionnaireAnswer(vars: CreateProjectQuestionnaireAnswerVariables): MutationPromise<CreateProjectQuestionnaireAnswerData, CreateProjectQuestionnaireAnswerVariables>;

interface CreateProjectQuestionnaireAnswerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectQuestionnaireAnswerVariables): MutationRef<CreateProjectQuestionnaireAnswerData, CreateProjectQuestionnaireAnswerVariables>;
}
export const createProjectQuestionnaireAnswerRef: CreateProjectQuestionnaireAnswerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProjectQuestionnaireAnswer(dc: DataConnect, vars: CreateProjectQuestionnaireAnswerVariables): MutationPromise<CreateProjectQuestionnaireAnswerData, CreateProjectQuestionnaireAnswerVariables>;

interface CreateProjectQuestionnaireAnswerRef {
  ...
  (dc: DataConnect, vars: CreateProjectQuestionnaireAnswerVariables): MutationRef<CreateProjectQuestionnaireAnswerData, CreateProjectQuestionnaireAnswerVariables>;
}
export const createProjectQuestionnaireAnswerRef: CreateProjectQuestionnaireAnswerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProjectQuestionnaireAnswerRef:
```typescript
const name = createProjectQuestionnaireAnswerRef.operationName;
console.log(name);
```

### Variables
The `CreateProjectQuestionnaireAnswer` mutation requires an argument of type `CreateProjectQuestionnaireAnswerVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateProjectQuestionnaireAnswerVariables {
  id: UUIDString;
  projectQuestionnaireId: UUIDString;
  questionId: UUIDString;
  position: number;
  answer?: string | null;
}
```
### Return Type
Recall that executing the `CreateProjectQuestionnaireAnswer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProjectQuestionnaireAnswerData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProjectQuestionnaireAnswerData {
  projectQuestionnaireAnswer_insert: ProjectQuestionnaireAnswer_Key;
}
```
### Using `CreateProjectQuestionnaireAnswer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProjectQuestionnaireAnswer, CreateProjectQuestionnaireAnswerVariables } from '@generated/data-connector-web';

// The `CreateProjectQuestionnaireAnswer` mutation requires an argument of type `CreateProjectQuestionnaireAnswerVariables`:
const createProjectQuestionnaireAnswerVars: CreateProjectQuestionnaireAnswerVariables = {
  id: ..., 
  projectQuestionnaireId: ..., 
  questionId: ..., 
  position: ..., 
  answer: ..., // optional
};

// Call the `createProjectQuestionnaireAnswer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProjectQuestionnaireAnswer(createProjectQuestionnaireAnswerVars);
// Variables can be defined inline as well.
const { data } = await createProjectQuestionnaireAnswer({ id: ..., projectQuestionnaireId: ..., questionId: ..., position: ..., answer: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProjectQuestionnaireAnswer(dataConnect, createProjectQuestionnaireAnswerVars);

console.log(data.projectQuestionnaireAnswer_insert);

// Or, you can use the `Promise` API.
createProjectQuestionnaireAnswer(createProjectQuestionnaireAnswerVars).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaireAnswer_insert);
});
```

### Using `CreateProjectQuestionnaireAnswer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProjectQuestionnaireAnswerRef, CreateProjectQuestionnaireAnswerVariables } from '@generated/data-connector-web';

// The `CreateProjectQuestionnaireAnswer` mutation requires an argument of type `CreateProjectQuestionnaireAnswerVariables`:
const createProjectQuestionnaireAnswerVars: CreateProjectQuestionnaireAnswerVariables = {
  id: ..., 
  projectQuestionnaireId: ..., 
  questionId: ..., 
  position: ..., 
  answer: ..., // optional
};

// Call the `createProjectQuestionnaireAnswerRef()` function to get a reference to the mutation.
const ref = createProjectQuestionnaireAnswerRef(createProjectQuestionnaireAnswerVars);
// Variables can be defined inline as well.
const ref = createProjectQuestionnaireAnswerRef({ id: ..., projectQuestionnaireId: ..., questionId: ..., position: ..., answer: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProjectQuestionnaireAnswerRef(dataConnect, createProjectQuestionnaireAnswerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.projectQuestionnaireAnswer_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.projectQuestionnaireAnswer_insert);
});
```

## CreateQuantitySource
You can execute the `CreateQuantitySource` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createQuantitySource(vars: CreateQuantitySourceVariables): MutationPromise<CreateQuantitySourceData, CreateQuantitySourceVariables>;

interface CreateQuantitySourceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuantitySourceVariables): MutationRef<CreateQuantitySourceData, CreateQuantitySourceVariables>;
}
export const createQuantitySourceRef: CreateQuantitySourceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createQuantitySource(dc: DataConnect, vars: CreateQuantitySourceVariables): MutationPromise<CreateQuantitySourceData, CreateQuantitySourceVariables>;

interface CreateQuantitySourceRef {
  ...
  (dc: DataConnect, vars: CreateQuantitySourceVariables): MutationRef<CreateQuantitySourceData, CreateQuantitySourceVariables>;
}
export const createQuantitySourceRef: CreateQuantitySourceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQuantitySourceRef:
```typescript
const name = createQuantitySourceRef.operationName;
console.log(name);
```

### Variables
The `CreateQuantitySource` mutation requires an argument of type `CreateQuantitySourceVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateQuantitySourceVariables {
  id: UUIDString;
  measurementSource: string;
  measurementPlasterType?: string | null;
}
```
### Return Type
Recall that executing the `CreateQuantitySource` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQuantitySourceData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateQuantitySourceData {
  quantitySource_insert: QuantitySource_Key;
}
```
### Using `CreateQuantitySource`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQuantitySource, CreateQuantitySourceVariables } from '@generated/data-connector-web';

// The `CreateQuantitySource` mutation requires an argument of type `CreateQuantitySourceVariables`:
const createQuantitySourceVars: CreateQuantitySourceVariables = {
  id: ..., 
  measurementSource: ..., 
  measurementPlasterType: ..., // optional
};

// Call the `createQuantitySource()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuantitySource(createQuantitySourceVars);
// Variables can be defined inline as well.
const { data } = await createQuantitySource({ id: ..., measurementSource: ..., measurementPlasterType: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQuantitySource(dataConnect, createQuantitySourceVars);

console.log(data.quantitySource_insert);

// Or, you can use the `Promise` API.
createQuantitySource(createQuantitySourceVars).then((response) => {
  const data = response.data;
  console.log(data.quantitySource_insert);
});
```

### Using `CreateQuantitySource`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQuantitySourceRef, CreateQuantitySourceVariables } from '@generated/data-connector-web';

// The `CreateQuantitySource` mutation requires an argument of type `CreateQuantitySourceVariables`:
const createQuantitySourceVars: CreateQuantitySourceVariables = {
  id: ..., 
  measurementSource: ..., 
  measurementPlasterType: ..., // optional
};

// Call the `createQuantitySourceRef()` function to get a reference to the mutation.
const ref = createQuantitySourceRef(createQuantitySourceVars);
// Variables can be defined inline as well.
const ref = createQuantitySourceRef({ id: ..., measurementSource: ..., measurementPlasterType: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQuantitySourceRef(dataConnect, createQuantitySourceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quantitySource_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quantitySource_insert);
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
  ownerId: ..., // optional
  scope: ..., 
  systemKey: ..., // optional
  name: ..., 
  hasKeywords: ..., 
  keywords: ..., 
  quantitySourceId: ..., // optional
  sortOrder: ..., 
};

// Call the `createQuoteItemTemplate()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuoteItemTemplate(createQuoteItemTemplateVars);
// Variables can be defined inline as well.
const { data } = await createQuoteItemTemplate({ id: ..., ownerId: ..., scope: ..., systemKey: ..., name: ..., hasKeywords: ..., keywords: ..., quantitySourceId: ..., sortOrder: ..., });

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
  ownerId: ..., // optional
  scope: ..., 
  systemKey: ..., // optional
  name: ..., 
  hasKeywords: ..., 
  keywords: ..., 
  quantitySourceId: ..., // optional
  sortOrder: ..., 
};

// Call the `createQuoteItemTemplateRef()` function to get a reference to the mutation.
const ref = createQuoteItemTemplateRef(createQuoteItemTemplateVars);
// Variables can be defined inline as well.
const ref = createQuoteItemTemplateRef({ id: ..., ownerId: ..., scope: ..., systemKey: ..., name: ..., hasKeywords: ..., keywords: ..., quantitySourceId: ..., sortOrder: ..., });

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
  name?: string | null;
  hasKeywords?: boolean | null;
  keywords?: string[] | null;
  quantitySourceId?: UUIDString | null;
  sortOrder?: number | null;
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
  name: ..., // optional
  hasKeywords: ..., // optional
  keywords: ..., // optional
  quantitySourceId: ..., // optional
  sortOrder: ..., // optional
};

// Call the `updateQuoteItemTemplate()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateQuoteItemTemplate(updateQuoteItemTemplateVars);
// Variables can be defined inline as well.
const { data } = await updateQuoteItemTemplate({ id: ..., name: ..., hasKeywords: ..., keywords: ..., quantitySourceId: ..., sortOrder: ..., });

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
  name: ..., // optional
  hasKeywords: ..., // optional
  keywords: ..., // optional
  quantitySourceId: ..., // optional
  sortOrder: ..., // optional
};

// Call the `updateQuoteItemTemplateRef()` function to get a reference to the mutation.
const ref = updateQuoteItemTemplateRef(updateQuoteItemTemplateVars);
// Variables can be defined inline as well.
const ref = updateQuoteItemTemplateRef({ id: ..., name: ..., hasKeywords: ..., keywords: ..., quantitySourceId: ..., sortOrder: ..., });

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

console.log(data.quoteItemTemplate_delete);

// Or, you can use the `Promise` API.
deleteQuoteItemTemplate(deleteQuoteItemTemplateVars).then((response) => {
  const data = response.data;
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

console.log(data.quoteItemTemplate_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteItemTemplate_delete);
});
```

## UpsertQuoteItemTemplateConfig
You can execute the `UpsertQuoteItemTemplateConfig` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
upsertQuoteItemTemplateConfig(vars: UpsertQuoteItemTemplateConfigVariables): MutationPromise<UpsertQuoteItemTemplateConfigData, UpsertQuoteItemTemplateConfigVariables>;

interface UpsertQuoteItemTemplateConfigRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertQuoteItemTemplateConfigVariables): MutationRef<UpsertQuoteItemTemplateConfigData, UpsertQuoteItemTemplateConfigVariables>;
}
export const upsertQuoteItemTemplateConfigRef: UpsertQuoteItemTemplateConfigRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertQuoteItemTemplateConfig(dc: DataConnect, vars: UpsertQuoteItemTemplateConfigVariables): MutationPromise<UpsertQuoteItemTemplateConfigData, UpsertQuoteItemTemplateConfigVariables>;

interface UpsertQuoteItemTemplateConfigRef {
  ...
  (dc: DataConnect, vars: UpsertQuoteItemTemplateConfigVariables): MutationRef<UpsertQuoteItemTemplateConfigData, UpsertQuoteItemTemplateConfigVariables>;
}
export const upsertQuoteItemTemplateConfigRef: UpsertQuoteItemTemplateConfigRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertQuoteItemTemplateConfigRef:
```typescript
const name = upsertQuoteItemTemplateConfigRef.operationName;
console.log(name);
```

### Variables
The `UpsertQuoteItemTemplateConfig` mutation requires an argument of type `UpsertQuoteItemTemplateConfigVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
Recall that executing the `UpsertQuoteItemTemplateConfig` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertQuoteItemTemplateConfigData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertQuoteItemTemplateConfigData {
  quoteItemTemplateConfig_upsert: QuoteItemTemplateConfig_Key;
}
```
### Using `UpsertQuoteItemTemplateConfig`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertQuoteItemTemplateConfig, UpsertQuoteItemTemplateConfigVariables } from '@generated/data-connector-web';

// The `UpsertQuoteItemTemplateConfig` mutation requires an argument of type `UpsertQuoteItemTemplateConfigVariables`:
const upsertQuoteItemTemplateConfigVars: UpsertQuoteItemTemplateConfigVariables = {
  ownerId: ..., 
  templateId: ..., 
  enabled: ..., 
  unitPriceCents: ..., 
  materialUnitPriceCents: ..., 
  labourUnitPriceCents: ..., 
};

// Call the `upsertQuoteItemTemplateConfig()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertQuoteItemTemplateConfig(upsertQuoteItemTemplateConfigVars);
// Variables can be defined inline as well.
const { data } = await upsertQuoteItemTemplateConfig({ ownerId: ..., templateId: ..., enabled: ..., unitPriceCents: ..., materialUnitPriceCents: ..., labourUnitPriceCents: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertQuoteItemTemplateConfig(dataConnect, upsertQuoteItemTemplateConfigVars);

console.log(data.quoteItemTemplateConfig_upsert);

// Or, you can use the `Promise` API.
upsertQuoteItemTemplateConfig(upsertQuoteItemTemplateConfigVars).then((response) => {
  const data = response.data;
  console.log(data.quoteItemTemplateConfig_upsert);
});
```

### Using `UpsertQuoteItemTemplateConfig`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertQuoteItemTemplateConfigRef, UpsertQuoteItemTemplateConfigVariables } from '@generated/data-connector-web';

// The `UpsertQuoteItemTemplateConfig` mutation requires an argument of type `UpsertQuoteItemTemplateConfigVariables`:
const upsertQuoteItemTemplateConfigVars: UpsertQuoteItemTemplateConfigVariables = {
  ownerId: ..., 
  templateId: ..., 
  enabled: ..., 
  unitPriceCents: ..., 
  materialUnitPriceCents: ..., 
  labourUnitPriceCents: ..., 
};

// Call the `upsertQuoteItemTemplateConfigRef()` function to get a reference to the mutation.
const ref = upsertQuoteItemTemplateConfigRef(upsertQuoteItemTemplateConfigVars);
// Variables can be defined inline as well.
const ref = upsertQuoteItemTemplateConfigRef({ ownerId: ..., templateId: ..., enabled: ..., unitPriceCents: ..., materialUnitPriceCents: ..., labourUnitPriceCents: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertQuoteItemTemplateConfigRef(dataConnect, upsertQuoteItemTemplateConfigVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quoteItemTemplateConfig_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteItemTemplateConfig_upsert);
});
```

## CreateSupplier
You can execute the `CreateSupplier` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createSupplier(vars: CreateSupplierVariables): MutationPromise<CreateSupplierData, CreateSupplierVariables>;

interface CreateSupplierRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSupplierVariables): MutationRef<CreateSupplierData, CreateSupplierVariables>;
}
export const createSupplierRef: CreateSupplierRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSupplier(dc: DataConnect, vars: CreateSupplierVariables): MutationPromise<CreateSupplierData, CreateSupplierVariables>;

interface CreateSupplierRef {
  ...
  (dc: DataConnect, vars: CreateSupplierVariables): MutationRef<CreateSupplierData, CreateSupplierVariables>;
}
export const createSupplierRef: CreateSupplierRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createSupplierRef:
```typescript
const name = createSupplierRef.operationName;
console.log(name);
```

### Variables
The `CreateSupplier` mutation requires an argument of type `CreateSupplierVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateSupplierVariables {
  id: UUIDString;
  ownerId: string;
  name: string;
}
```
### Return Type
Recall that executing the `CreateSupplier` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateSupplierData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateSupplierData {
  supplier_insert: Supplier_Key;
}
```
### Using `CreateSupplier`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSupplier, CreateSupplierVariables } from '@generated/data-connector-web';

// The `CreateSupplier` mutation requires an argument of type `CreateSupplierVariables`:
const createSupplierVars: CreateSupplierVariables = {
  id: ..., 
  ownerId: ..., 
  name: ..., 
};

// Call the `createSupplier()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSupplier(createSupplierVars);
// Variables can be defined inline as well.
const { data } = await createSupplier({ id: ..., ownerId: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSupplier(dataConnect, createSupplierVars);

console.log(data.supplier_insert);

// Or, you can use the `Promise` API.
createSupplier(createSupplierVars).then((response) => {
  const data = response.data;
  console.log(data.supplier_insert);
});
```

### Using `CreateSupplier`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createSupplierRef, CreateSupplierVariables } from '@generated/data-connector-web';

// The `CreateSupplier` mutation requires an argument of type `CreateSupplierVariables`:
const createSupplierVars: CreateSupplierVariables = {
  id: ..., 
  ownerId: ..., 
  name: ..., 
};

// Call the `createSupplierRef()` function to get a reference to the mutation.
const ref = createSupplierRef(createSupplierVars);
// Variables can be defined inline as well.
const ref = createSupplierRef({ id: ..., ownerId: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createSupplierRef(dataConnect, createSupplierVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.supplier_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.supplier_insert);
});
```

## UpdateSupplier
You can execute the `UpdateSupplier` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateSupplier(vars: UpdateSupplierVariables): MutationPromise<UpdateSupplierData, UpdateSupplierVariables>;

interface UpdateSupplierRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSupplierVariables): MutationRef<UpdateSupplierData, UpdateSupplierVariables>;
}
export const updateSupplierRef: UpdateSupplierRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateSupplier(dc: DataConnect, vars: UpdateSupplierVariables): MutationPromise<UpdateSupplierData, UpdateSupplierVariables>;

interface UpdateSupplierRef {
  ...
  (dc: DataConnect, vars: UpdateSupplierVariables): MutationRef<UpdateSupplierData, UpdateSupplierVariables>;
}
export const updateSupplierRef: UpdateSupplierRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateSupplierRef:
```typescript
const name = updateSupplierRef.operationName;
console.log(name);
```

### Variables
The `UpdateSupplier` mutation requires an argument of type `UpdateSupplierVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateSupplierVariables {
  id: UUIDString;
  name?: string | null;
}
```
### Return Type
Recall that executing the `UpdateSupplier` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateSupplierData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateSupplierData {
  supplier_update?: Supplier_Key | null;
}
```
### Using `UpdateSupplier`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateSupplier, UpdateSupplierVariables } from '@generated/data-connector-web';

// The `UpdateSupplier` mutation requires an argument of type `UpdateSupplierVariables`:
const updateSupplierVars: UpdateSupplierVariables = {
  id: ..., 
  name: ..., // optional
};

// Call the `updateSupplier()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateSupplier(updateSupplierVars);
// Variables can be defined inline as well.
const { data } = await updateSupplier({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateSupplier(dataConnect, updateSupplierVars);

console.log(data.supplier_update);

// Or, you can use the `Promise` API.
updateSupplier(updateSupplierVars).then((response) => {
  const data = response.data;
  console.log(data.supplier_update);
});
```

### Using `UpdateSupplier`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateSupplierRef, UpdateSupplierVariables } from '@generated/data-connector-web';

// The `UpdateSupplier` mutation requires an argument of type `UpdateSupplierVariables`:
const updateSupplierVars: UpdateSupplierVariables = {
  id: ..., 
  name: ..., // optional
};

// Call the `updateSupplierRef()` function to get a reference to the mutation.
const ref = updateSupplierRef(updateSupplierVars);
// Variables can be defined inline as well.
const ref = updateSupplierRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateSupplierRef(dataConnect, updateSupplierVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.supplier_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.supplier_update);
});
```

## DeleteSupplier
You can execute the `DeleteSupplier` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
deleteSupplier(vars: DeleteSupplierVariables): MutationPromise<DeleteSupplierData, DeleteSupplierVariables>;

interface DeleteSupplierRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSupplierVariables): MutationRef<DeleteSupplierData, DeleteSupplierVariables>;
}
export const deleteSupplierRef: DeleteSupplierRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteSupplier(dc: DataConnect, vars: DeleteSupplierVariables): MutationPromise<DeleteSupplierData, DeleteSupplierVariables>;

interface DeleteSupplierRef {
  ...
  (dc: DataConnect, vars: DeleteSupplierVariables): MutationRef<DeleteSupplierData, DeleteSupplierVariables>;
}
export const deleteSupplierRef: DeleteSupplierRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteSupplierRef:
```typescript
const name = deleteSupplierRef.operationName;
console.log(name);
```

### Variables
The `DeleteSupplier` mutation requires an argument of type `DeleteSupplierVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteSupplierVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteSupplier` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteSupplierData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteSupplierData {
  supplier_delete?: Supplier_Key | null;
}
```
### Using `DeleteSupplier`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteSupplier, DeleteSupplierVariables } from '@generated/data-connector-web';

// The `DeleteSupplier` mutation requires an argument of type `DeleteSupplierVariables`:
const deleteSupplierVars: DeleteSupplierVariables = {
  id: ..., 
};

// Call the `deleteSupplier()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteSupplier(deleteSupplierVars);
// Variables can be defined inline as well.
const { data } = await deleteSupplier({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteSupplier(dataConnect, deleteSupplierVars);

console.log(data.supplier_delete);

// Or, you can use the `Promise` API.
deleteSupplier(deleteSupplierVars).then((response) => {
  const data = response.data;
  console.log(data.supplier_delete);
});
```

### Using `DeleteSupplier`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteSupplierRef, DeleteSupplierVariables } from '@generated/data-connector-web';

// The `DeleteSupplier` mutation requires an argument of type `DeleteSupplierVariables`:
const deleteSupplierVars: DeleteSupplierVariables = {
  id: ..., 
};

// Call the `deleteSupplierRef()` function to get a reference to the mutation.
const ref = deleteSupplierRef(deleteSupplierVars);
// Variables can be defined inline as well.
const ref = deleteSupplierRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteSupplierRef(dataConnect, deleteSupplierVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.supplier_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.supplier_delete);
});
```

## UpsertSupplierQuoteItemPrice
You can execute the `UpsertSupplierQuoteItemPrice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
upsertSupplierQuoteItemPrice(vars: UpsertSupplierQuoteItemPriceVariables): MutationPromise<UpsertSupplierQuoteItemPriceData, UpsertSupplierQuoteItemPriceVariables>;

interface UpsertSupplierQuoteItemPriceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertSupplierQuoteItemPriceVariables): MutationRef<UpsertSupplierQuoteItemPriceData, UpsertSupplierQuoteItemPriceVariables>;
}
export const upsertSupplierQuoteItemPriceRef: UpsertSupplierQuoteItemPriceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertSupplierQuoteItemPrice(dc: DataConnect, vars: UpsertSupplierQuoteItemPriceVariables): MutationPromise<UpsertSupplierQuoteItemPriceData, UpsertSupplierQuoteItemPriceVariables>;

interface UpsertSupplierQuoteItemPriceRef {
  ...
  (dc: DataConnect, vars: UpsertSupplierQuoteItemPriceVariables): MutationRef<UpsertSupplierQuoteItemPriceData, UpsertSupplierQuoteItemPriceVariables>;
}
export const upsertSupplierQuoteItemPriceRef: UpsertSupplierQuoteItemPriceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertSupplierQuoteItemPriceRef:
```typescript
const name = upsertSupplierQuoteItemPriceRef.operationName;
console.log(name);
```

### Variables
The `UpsertSupplierQuoteItemPrice` mutation requires an argument of type `UpsertSupplierQuoteItemPriceVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertSupplierQuoteItemPriceVariables {
  ownerId: string;
  supplierId: UUIDString;
  templateId: UUIDString;
  materialUnitPriceCents: number;
}
```
### Return Type
Recall that executing the `UpsertSupplierQuoteItemPrice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertSupplierQuoteItemPriceData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertSupplierQuoteItemPriceData {
  supplierQuoteItemPrice_upsert: SupplierQuoteItemPrice_Key;
}
```
### Using `UpsertSupplierQuoteItemPrice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertSupplierQuoteItemPrice, UpsertSupplierQuoteItemPriceVariables } from '@generated/data-connector-web';

// The `UpsertSupplierQuoteItemPrice` mutation requires an argument of type `UpsertSupplierQuoteItemPriceVariables`:
const upsertSupplierQuoteItemPriceVars: UpsertSupplierQuoteItemPriceVariables = {
  ownerId: ..., 
  supplierId: ..., 
  templateId: ..., 
  materialUnitPriceCents: ..., 
};

// Call the `upsertSupplierQuoteItemPrice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertSupplierQuoteItemPrice(upsertSupplierQuoteItemPriceVars);
// Variables can be defined inline as well.
const { data } = await upsertSupplierQuoteItemPrice({ ownerId: ..., supplierId: ..., templateId: ..., materialUnitPriceCents: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertSupplierQuoteItemPrice(dataConnect, upsertSupplierQuoteItemPriceVars);

console.log(data.supplierQuoteItemPrice_upsert);

// Or, you can use the `Promise` API.
upsertSupplierQuoteItemPrice(upsertSupplierQuoteItemPriceVars).then((response) => {
  const data = response.data;
  console.log(data.supplierQuoteItemPrice_upsert);
});
```

### Using `UpsertSupplierQuoteItemPrice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertSupplierQuoteItemPriceRef, UpsertSupplierQuoteItemPriceVariables } from '@generated/data-connector-web';

// The `UpsertSupplierQuoteItemPrice` mutation requires an argument of type `UpsertSupplierQuoteItemPriceVariables`:
const upsertSupplierQuoteItemPriceVars: UpsertSupplierQuoteItemPriceVariables = {
  ownerId: ..., 
  supplierId: ..., 
  templateId: ..., 
  materialUnitPriceCents: ..., 
};

// Call the `upsertSupplierQuoteItemPriceRef()` function to get a reference to the mutation.
const ref = upsertSupplierQuoteItemPriceRef(upsertSupplierQuoteItemPriceVars);
// Variables can be defined inline as well.
const ref = upsertSupplierQuoteItemPriceRef({ ownerId: ..., supplierId: ..., templateId: ..., materialUnitPriceCents: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertSupplierQuoteItemPriceRef(dataConnect, upsertSupplierQuoteItemPriceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.supplierQuoteItemPrice_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.supplierQuoteItemPrice_upsert);
});
```

## DeleteSupplierQuoteItemPrice
You can execute the `DeleteSupplierQuoteItemPrice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
deleteSupplierQuoteItemPrice(vars: DeleteSupplierQuoteItemPriceVariables): MutationPromise<DeleteSupplierQuoteItemPriceData, DeleteSupplierQuoteItemPriceVariables>;

interface DeleteSupplierQuoteItemPriceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSupplierQuoteItemPriceVariables): MutationRef<DeleteSupplierQuoteItemPriceData, DeleteSupplierQuoteItemPriceVariables>;
}
export const deleteSupplierQuoteItemPriceRef: DeleteSupplierQuoteItemPriceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteSupplierQuoteItemPrice(dc: DataConnect, vars: DeleteSupplierQuoteItemPriceVariables): MutationPromise<DeleteSupplierQuoteItemPriceData, DeleteSupplierQuoteItemPriceVariables>;

interface DeleteSupplierQuoteItemPriceRef {
  ...
  (dc: DataConnect, vars: DeleteSupplierQuoteItemPriceVariables): MutationRef<DeleteSupplierQuoteItemPriceData, DeleteSupplierQuoteItemPriceVariables>;
}
export const deleteSupplierQuoteItemPriceRef: DeleteSupplierQuoteItemPriceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteSupplierQuoteItemPriceRef:
```typescript
const name = deleteSupplierQuoteItemPriceRef.operationName;
console.log(name);
```

### Variables
The `DeleteSupplierQuoteItemPrice` mutation requires an argument of type `DeleteSupplierQuoteItemPriceVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteSupplierQuoteItemPriceVariables {
  supplierId: UUIDString;
  templateId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteSupplierQuoteItemPrice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteSupplierQuoteItemPriceData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteSupplierQuoteItemPriceData {
  supplierQuoteItemPrice_delete?: SupplierQuoteItemPrice_Key | null;
}
```
### Using `DeleteSupplierQuoteItemPrice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteSupplierQuoteItemPrice, DeleteSupplierQuoteItemPriceVariables } from '@generated/data-connector-web';

// The `DeleteSupplierQuoteItemPrice` mutation requires an argument of type `DeleteSupplierQuoteItemPriceVariables`:
const deleteSupplierQuoteItemPriceVars: DeleteSupplierQuoteItemPriceVariables = {
  supplierId: ..., 
  templateId: ..., 
};

// Call the `deleteSupplierQuoteItemPrice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteSupplierQuoteItemPrice(deleteSupplierQuoteItemPriceVars);
// Variables can be defined inline as well.
const { data } = await deleteSupplierQuoteItemPrice({ supplierId: ..., templateId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteSupplierQuoteItemPrice(dataConnect, deleteSupplierQuoteItemPriceVars);

console.log(data.supplierQuoteItemPrice_delete);

// Or, you can use the `Promise` API.
deleteSupplierQuoteItemPrice(deleteSupplierQuoteItemPriceVars).then((response) => {
  const data = response.data;
  console.log(data.supplierQuoteItemPrice_delete);
});
```

### Using `DeleteSupplierQuoteItemPrice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteSupplierQuoteItemPriceRef, DeleteSupplierQuoteItemPriceVariables } from '@generated/data-connector-web';

// The `DeleteSupplierQuoteItemPrice` mutation requires an argument of type `DeleteSupplierQuoteItemPriceVariables`:
const deleteSupplierQuoteItemPriceVars: DeleteSupplierQuoteItemPriceVariables = {
  supplierId: ..., 
  templateId: ..., 
};

// Call the `deleteSupplierQuoteItemPriceRef()` function to get a reference to the mutation.
const ref = deleteSupplierQuoteItemPriceRef(deleteSupplierQuoteItemPriceVars);
// Variables can be defined inline as well.
const ref = deleteSupplierQuoteItemPriceRef({ supplierId: ..., templateId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteSupplierQuoteItemPriceRef(dataConnect, deleteSupplierQuoteItemPriceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.supplierQuoteItemPrice_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.supplierQuoteItemPrice_delete);
});
```

## CreateQuote
You can execute the `CreateQuote` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createQuote(vars: CreateQuoteVariables): MutationPromise<CreateQuoteData, CreateQuoteVariables>;

interface CreateQuoteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuoteVariables): MutationRef<CreateQuoteData, CreateQuoteVariables>;
}
export const createQuoteRef: CreateQuoteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createQuote(dc: DataConnect, vars: CreateQuoteVariables): MutationPromise<CreateQuoteData, CreateQuoteVariables>;

interface CreateQuoteRef {
  ...
  (dc: DataConnect, vars: CreateQuoteVariables): MutationRef<CreateQuoteData, CreateQuoteVariables>;
}
export const createQuoteRef: CreateQuoteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQuoteRef:
```typescript
const name = createQuoteRef.operationName;
console.log(name);
```

### Variables
The `CreateQuote` mutation requires an argument of type `CreateQuoteVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateQuoteVariables {
  id: UUIDString;
  ownerId: string;
  projectId: UUIDString;
  supplierId?: UUIDString | null;
  status: string;
}
```
### Return Type
Recall that executing the `CreateQuote` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQuoteData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateQuoteData {
  quote_insert: Quote_Key;
}
```
### Using `CreateQuote`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQuote, CreateQuoteVariables } from '@generated/data-connector-web';

// The `CreateQuote` mutation requires an argument of type `CreateQuoteVariables`:
const createQuoteVars: CreateQuoteVariables = {
  id: ..., 
  ownerId: ..., 
  projectId: ..., 
  supplierId: ..., // optional
  status: ..., 
};

// Call the `createQuote()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuote(createQuoteVars);
// Variables can be defined inline as well.
const { data } = await createQuote({ id: ..., ownerId: ..., projectId: ..., supplierId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQuote(dataConnect, createQuoteVars);

console.log(data.quote_insert);

// Or, you can use the `Promise` API.
createQuote(createQuoteVars).then((response) => {
  const data = response.data;
  console.log(data.quote_insert);
});
```

### Using `CreateQuote`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQuoteRef, CreateQuoteVariables } from '@generated/data-connector-web';

// The `CreateQuote` mutation requires an argument of type `CreateQuoteVariables`:
const createQuoteVars: CreateQuoteVariables = {
  id: ..., 
  ownerId: ..., 
  projectId: ..., 
  supplierId: ..., // optional
  status: ..., 
};

// Call the `createQuoteRef()` function to get a reference to the mutation.
const ref = createQuoteRef(createQuoteVars);
// Variables can be defined inline as well.
const ref = createQuoteRef({ id: ..., ownerId: ..., projectId: ..., supplierId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQuoteRef(dataConnect, createQuoteVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quote_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quote_insert);
});
```

## UpdateQuote
You can execute the `UpdateQuote` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateQuote(vars: UpdateQuoteVariables): MutationPromise<UpdateQuoteData, UpdateQuoteVariables>;

interface UpdateQuoteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuoteVariables): MutationRef<UpdateQuoteData, UpdateQuoteVariables>;
}
export const updateQuoteRef: UpdateQuoteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateQuote(dc: DataConnect, vars: UpdateQuoteVariables): MutationPromise<UpdateQuoteData, UpdateQuoteVariables>;

interface UpdateQuoteRef {
  ...
  (dc: DataConnect, vars: UpdateQuoteVariables): MutationRef<UpdateQuoteData, UpdateQuoteVariables>;
}
export const updateQuoteRef: UpdateQuoteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateQuoteRef:
```typescript
const name = updateQuoteRef.operationName;
console.log(name);
```

### Variables
The `UpdateQuote` mutation requires an argument of type `UpdateQuoteVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateQuoteVariables {
  id: UUIDString;
  supplierId?: UUIDString | null;
  status?: string | null;
}
```
### Return Type
Recall that executing the `UpdateQuote` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateQuoteData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateQuoteData {
  quote_update?: Quote_Key | null;
}
```
### Using `UpdateQuote`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateQuote, UpdateQuoteVariables } from '@generated/data-connector-web';

// The `UpdateQuote` mutation requires an argument of type `UpdateQuoteVariables`:
const updateQuoteVars: UpdateQuoteVariables = {
  id: ..., 
  supplierId: ..., // optional
  status: ..., // optional
};

// Call the `updateQuote()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateQuote(updateQuoteVars);
// Variables can be defined inline as well.
const { data } = await updateQuote({ id: ..., supplierId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateQuote(dataConnect, updateQuoteVars);

console.log(data.quote_update);

// Or, you can use the `Promise` API.
updateQuote(updateQuoteVars).then((response) => {
  const data = response.data;
  console.log(data.quote_update);
});
```

### Using `UpdateQuote`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateQuoteRef, UpdateQuoteVariables } from '@generated/data-connector-web';

// The `UpdateQuote` mutation requires an argument of type `UpdateQuoteVariables`:
const updateQuoteVars: UpdateQuoteVariables = {
  id: ..., 
  supplierId: ..., // optional
  status: ..., // optional
};

// Call the `updateQuoteRef()` function to get a reference to the mutation.
const ref = updateQuoteRef(updateQuoteVars);
// Variables can be defined inline as well.
const ref = updateQuoteRef({ id: ..., supplierId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateQuoteRef(dataConnect, updateQuoteVars);

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

## DeleteQuoteItems
You can execute the `DeleteQuoteItems` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
deleteQuoteItems(vars: DeleteQuoteItemsVariables): MutationPromise<DeleteQuoteItemsData, DeleteQuoteItemsVariables>;

interface DeleteQuoteItemsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQuoteItemsVariables): MutationRef<DeleteQuoteItemsData, DeleteQuoteItemsVariables>;
}
export const deleteQuoteItemsRef: DeleteQuoteItemsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteQuoteItems(dc: DataConnect, vars: DeleteQuoteItemsVariables): MutationPromise<DeleteQuoteItemsData, DeleteQuoteItemsVariables>;

interface DeleteQuoteItemsRef {
  ...
  (dc: DataConnect, vars: DeleteQuoteItemsVariables): MutationRef<DeleteQuoteItemsData, DeleteQuoteItemsVariables>;
}
export const deleteQuoteItemsRef: DeleteQuoteItemsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteQuoteItemsRef:
```typescript
const name = deleteQuoteItemsRef.operationName;
console.log(name);
```

### Variables
The `DeleteQuoteItems` mutation requires an argument of type `DeleteQuoteItemsVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteQuoteItemsVariables {
  quoteId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteQuoteItems` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteQuoteItemsData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteQuoteItemsData {
  quoteItem_deleteMany: number;
}
```
### Using `DeleteQuoteItems`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteQuoteItems, DeleteQuoteItemsVariables } from '@generated/data-connector-web';

// The `DeleteQuoteItems` mutation requires an argument of type `DeleteQuoteItemsVariables`:
const deleteQuoteItemsVars: DeleteQuoteItemsVariables = {
  quoteId: ..., 
};

// Call the `deleteQuoteItems()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteQuoteItems(deleteQuoteItemsVars);
// Variables can be defined inline as well.
const { data } = await deleteQuoteItems({ quoteId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteQuoteItems(dataConnect, deleteQuoteItemsVars);

console.log(data.quoteItem_deleteMany);

// Or, you can use the `Promise` API.
deleteQuoteItems(deleteQuoteItemsVars).then((response) => {
  const data = response.data;
  console.log(data.quoteItem_deleteMany);
});
```

### Using `DeleteQuoteItems`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteQuoteItemsRef, DeleteQuoteItemsVariables } from '@generated/data-connector-web';

// The `DeleteQuoteItems` mutation requires an argument of type `DeleteQuoteItemsVariables`:
const deleteQuoteItemsVars: DeleteQuoteItemsVariables = {
  quoteId: ..., 
};

// Call the `deleteQuoteItemsRef()` function to get a reference to the mutation.
const ref = deleteQuoteItemsRef(deleteQuoteItemsVars);
// Variables can be defined inline as well.
const ref = deleteQuoteItemsRef({ quoteId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteQuoteItemsRef(dataConnect, deleteQuoteItemsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quoteItem_deleteMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteItem_deleteMany);
});
```

## CreateQuoteItem
You can execute the `CreateQuoteItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createQuoteItem(vars: CreateQuoteItemVariables): MutationPromise<CreateQuoteItemData, CreateQuoteItemVariables>;

interface CreateQuoteItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuoteItemVariables): MutationRef<CreateQuoteItemData, CreateQuoteItemVariables>;
}
export const createQuoteItemRef: CreateQuoteItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createQuoteItem(dc: DataConnect, vars: CreateQuoteItemVariables): MutationPromise<CreateQuoteItemData, CreateQuoteItemVariables>;

interface CreateQuoteItemRef {
  ...
  (dc: DataConnect, vars: CreateQuoteItemVariables): MutationRef<CreateQuoteItemData, CreateQuoteItemVariables>;
}
export const createQuoteItemRef: CreateQuoteItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQuoteItemRef:
```typescript
const name = createQuoteItemRef.operationName;
console.log(name);
```

### Variables
The `CreateQuoteItem` mutation requires an argument of type `CreateQuoteItemVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
Recall that executing the `CreateQuoteItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQuoteItemData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateQuoteItemData {
  quoteItem_insert: QuoteItem_Key;
}
```
### Using `CreateQuoteItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQuoteItem, CreateQuoteItemVariables } from '@generated/data-connector-web';

// The `CreateQuoteItem` mutation requires an argument of type `CreateQuoteItemVariables`:
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

// Call the `createQuoteItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuoteItem(createQuoteItemVars);
// Variables can be defined inline as well.
const { data } = await createQuoteItem({ id: ..., ownerId: ..., quoteId: ..., sourceTemplateId: ..., displayOrder: ..., name: ..., quantity: ..., quantitySourceId: ..., unitPriceCents: ..., materialUnitPriceCents: ..., labourUnitPriceCents: ..., matchedKeywords: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQuoteItem(dataConnect, createQuoteItemVars);

console.log(data.quoteItem_insert);

// Or, you can use the `Promise` API.
createQuoteItem(createQuoteItemVars).then((response) => {
  const data = response.data;
  console.log(data.quoteItem_insert);
});
```

### Using `CreateQuoteItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQuoteItemRef, CreateQuoteItemVariables } from '@generated/data-connector-web';

// The `CreateQuoteItem` mutation requires an argument of type `CreateQuoteItemVariables`:
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

// Call the `createQuoteItemRef()` function to get a reference to the mutation.
const ref = createQuoteItemRef(createQuoteItemVars);
// Variables can be defined inline as well.
const ref = createQuoteItemRef({ id: ..., ownerId: ..., quoteId: ..., sourceTemplateId: ..., displayOrder: ..., name: ..., quantity: ..., quantitySourceId: ..., unitPriceCents: ..., materialUnitPriceCents: ..., labourUnitPriceCents: ..., matchedKeywords: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQuoteItemRef(dataConnect, createQuoteItemVars);

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
  displayOrder: ..., // optional
  name: ..., // optional
  quantity: ..., // optional
  quantitySourceId: ..., // optional
  unitPriceCents: ..., // optional
  materialUnitPriceCents: ..., // optional
  labourUnitPriceCents: ..., // optional
  matchedKeywords: ..., // optional
};

// Call the `updateQuoteItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateQuoteItem(updateQuoteItemVars);
// Variables can be defined inline as well.
const { data } = await updateQuoteItem({ id: ..., displayOrder: ..., name: ..., quantity: ..., quantitySourceId: ..., unitPriceCents: ..., materialUnitPriceCents: ..., labourUnitPriceCents: ..., matchedKeywords: ..., });

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
  displayOrder: ..., // optional
  name: ..., // optional
  quantity: ..., // optional
  quantitySourceId: ..., // optional
  unitPriceCents: ..., // optional
  materialUnitPriceCents: ..., // optional
  labourUnitPriceCents: ..., // optional
  matchedKeywords: ..., // optional
};

// Call the `updateQuoteItemRef()` function to get a reference to the mutation.
const ref = updateQuoteItemRef(updateQuoteItemVars);
// Variables can be defined inline as well.
const ref = updateQuoteItemRef({ id: ..., displayOrder: ..., name: ..., quantity: ..., quantitySourceId: ..., unitPriceCents: ..., materialUnitPriceCents: ..., labourUnitPriceCents: ..., matchedKeywords: ..., });

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

## CreateReminder
You can execute the `CreateReminder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
createReminder(vars: CreateReminderVariables): MutationPromise<CreateReminderData, CreateReminderVariables>;

interface CreateReminderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateReminderVariables): MutationRef<CreateReminderData, CreateReminderVariables>;
}
export const createReminderRef: CreateReminderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createReminder(dc: DataConnect, vars: CreateReminderVariables): MutationPromise<CreateReminderData, CreateReminderVariables>;

interface CreateReminderRef {
  ...
  (dc: DataConnect, vars: CreateReminderVariables): MutationRef<CreateReminderData, CreateReminderVariables>;
}
export const createReminderRef: CreateReminderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createReminderRef:
```typescript
const name = createReminderRef.operationName;
console.log(name);
```

### Variables
The `CreateReminder` mutation requires an argument of type `CreateReminderVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
Recall that executing the `CreateReminder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateReminderData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateReminderData {
  reminder_insert: Reminder_Key;
}
```
### Using `CreateReminder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createReminder, CreateReminderVariables } from '@generated/data-connector-web';

// The `CreateReminder` mutation requires an argument of type `CreateReminderVariables`:
const createReminderVars: CreateReminderVariables = {
  id: ..., 
  ownerId: ..., 
  projectId: ..., 
  accountId: ..., // optional
  name: ..., 
  status: ..., 
  dueAt: ..., 
};

// Call the `createReminder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createReminder(createReminderVars);
// Variables can be defined inline as well.
const { data } = await createReminder({ id: ..., ownerId: ..., projectId: ..., accountId: ..., name: ..., status: ..., dueAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createReminder(dataConnect, createReminderVars);

console.log(data.reminder_insert);

// Or, you can use the `Promise` API.
createReminder(createReminderVars).then((response) => {
  const data = response.data;
  console.log(data.reminder_insert);
});
```

### Using `CreateReminder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createReminderRef, CreateReminderVariables } from '@generated/data-connector-web';

// The `CreateReminder` mutation requires an argument of type `CreateReminderVariables`:
const createReminderVars: CreateReminderVariables = {
  id: ..., 
  ownerId: ..., 
  projectId: ..., 
  accountId: ..., // optional
  name: ..., 
  status: ..., 
  dueAt: ..., 
};

// Call the `createReminderRef()` function to get a reference to the mutation.
const ref = createReminderRef(createReminderVars);
// Variables can be defined inline as well.
const ref = createReminderRef({ id: ..., ownerId: ..., projectId: ..., accountId: ..., name: ..., status: ..., dueAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createReminderRef(dataConnect, createReminderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reminder_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reminder_insert);
});
```

## UpdateReminder
You can execute the `UpdateReminder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
updateReminder(vars: UpdateReminderVariables): MutationPromise<UpdateReminderData, UpdateReminderVariables>;

interface UpdateReminderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateReminderVariables): MutationRef<UpdateReminderData, UpdateReminderVariables>;
}
export const updateReminderRef: UpdateReminderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateReminder(dc: DataConnect, vars: UpdateReminderVariables): MutationPromise<UpdateReminderData, UpdateReminderVariables>;

interface UpdateReminderRef {
  ...
  (dc: DataConnect, vars: UpdateReminderVariables): MutationRef<UpdateReminderData, UpdateReminderVariables>;
}
export const updateReminderRef: UpdateReminderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateReminderRef:
```typescript
const name = updateReminderRef.operationName;
console.log(name);
```

### Variables
The `UpdateReminder` mutation requires an argument of type `UpdateReminderVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
Recall that executing the `UpdateReminder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateReminderData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateReminderData {
  reminder_update?: Reminder_Key | null;
}
```
### Using `UpdateReminder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateReminder, UpdateReminderVariables } from '@generated/data-connector-web';

// The `UpdateReminder` mutation requires an argument of type `UpdateReminderVariables`:
const updateReminderVars: UpdateReminderVariables = {
  id: ..., 
  accountId: ..., // optional
  name: ..., // optional
  status: ..., // optional
  dueAt: ..., // optional
  completedAt: ..., // optional
};

// Call the `updateReminder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateReminder(updateReminderVars);
// Variables can be defined inline as well.
const { data } = await updateReminder({ id: ..., accountId: ..., name: ..., status: ..., dueAt: ..., completedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateReminder(dataConnect, updateReminderVars);

console.log(data.reminder_update);

// Or, you can use the `Promise` API.
updateReminder(updateReminderVars).then((response) => {
  const data = response.data;
  console.log(data.reminder_update);
});
```

### Using `UpdateReminder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateReminderRef, UpdateReminderVariables } from '@generated/data-connector-web';

// The `UpdateReminder` mutation requires an argument of type `UpdateReminderVariables`:
const updateReminderVars: UpdateReminderVariables = {
  id: ..., 
  accountId: ..., // optional
  name: ..., // optional
  status: ..., // optional
  dueAt: ..., // optional
  completedAt: ..., // optional
};

// Call the `updateReminderRef()` function to get a reference to the mutation.
const ref = updateReminderRef(updateReminderVars);
// Variables can be defined inline as well.
const ref = updateReminderRef({ id: ..., accountId: ..., name: ..., status: ..., dueAt: ..., completedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateReminderRef(dataConnect, updateReminderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reminder_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reminder_update);
});
```

## UpsertUserSettings
You can execute the `UpsertUserSettings` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connector-web/index.d.ts](./index.d.ts):
```typescript
upsertUserSettings(vars: UpsertUserSettingsVariables): MutationPromise<UpsertUserSettingsData, UpsertUserSettingsVariables>;

interface UpsertUserSettingsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserSettingsVariables): MutationRef<UpsertUserSettingsData, UpsertUserSettingsVariables>;
}
export const upsertUserSettingsRef: UpsertUserSettingsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertUserSettings(dc: DataConnect, vars: UpsertUserSettingsVariables): MutationPromise<UpsertUserSettingsData, UpsertUserSettingsVariables>;

interface UpsertUserSettingsRef {
  ...
  (dc: DataConnect, vars: UpsertUserSettingsVariables): MutationRef<UpsertUserSettingsData, UpsertUserSettingsVariables>;
}
export const upsertUserSettingsRef: UpsertUserSettingsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertUserSettingsRef:
```typescript
const name = upsertUserSettingsRef.operationName;
console.log(name);
```

### Variables
The `UpsertUserSettings` mutation requires an argument of type `UpsertUserSettingsVariables`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertUserSettingsVariables {
  ownerId: string;
  quoteFollowUpEnabled: boolean;
  quoteFollowUpDays: number;
}
```
### Return Type
Recall that executing the `UpsertUserSettings` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertUserSettingsData`, which is defined in [data-connector-web/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertUserSettingsData {
  userSettings_upsert: UserSettings_Key;
}
```
### Using `UpsertUserSettings`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertUserSettings, UpsertUserSettingsVariables } from '@generated/data-connector-web';

// The `UpsertUserSettings` mutation requires an argument of type `UpsertUserSettingsVariables`:
const upsertUserSettingsVars: UpsertUserSettingsVariables = {
  ownerId: ..., 
  quoteFollowUpEnabled: ..., 
  quoteFollowUpDays: ..., 
};

// Call the `upsertUserSettings()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertUserSettings(upsertUserSettingsVars);
// Variables can be defined inline as well.
const { data } = await upsertUserSettings({ ownerId: ..., quoteFollowUpEnabled: ..., quoteFollowUpDays: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertUserSettings(dataConnect, upsertUserSettingsVars);

console.log(data.userSettings_upsert);

// Or, you can use the `Promise` API.
upsertUserSettings(upsertUserSettingsVars).then((response) => {
  const data = response.data;
  console.log(data.userSettings_upsert);
});
```

### Using `UpsertUserSettings`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertUserSettingsRef, UpsertUserSettingsVariables } from '@generated/data-connector-web';

// The `UpsertUserSettings` mutation requires an argument of type `UpsertUserSettingsVariables`:
const upsertUserSettingsVars: UpsertUserSettingsVariables = {
  ownerId: ..., 
  quoteFollowUpEnabled: ..., 
  quoteFollowUpDays: ..., 
};

// Call the `upsertUserSettingsRef()` function to get a reference to the mutation.
const ref = upsertUserSettingsRef(upsertUserSettingsVars);
// Variables can be defined inline as well.
const ref = upsertUserSettingsRef({ ownerId: ..., quoteFollowUpEnabled: ..., quoteFollowUpDays: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertUserSettingsRef(dataConnect, upsertUserSettingsVars);

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

