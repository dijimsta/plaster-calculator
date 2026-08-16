# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateMyCompany, useUpdateMyCompany, useSetMyCompanyPrimaryContact, useClearMyCompanyPrimaryContact, useAssignQuoteTemplateToCompany, useClearCompanyQuoteTemplate, useDeleteMyCompany, useCreateMyCompanyContact, useUpdateMyCompanyContact, useDeleteMyCompanyContact } from '@generated/data-connector-web/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateMyCompany(createMyCompanyVars);

const { data, isPending, isSuccess, isError, error } = useUpdateMyCompany(updateMyCompanyVars);

const { data, isPending, isSuccess, isError, error } = useSetMyCompanyPrimaryContact(setMyCompanyPrimaryContactVars);

const { data, isPending, isSuccess, isError, error } = useClearMyCompanyPrimaryContact(clearMyCompanyPrimaryContactVars);

const { data, isPending, isSuccess, isError, error } = useAssignQuoteTemplateToCompany(assignQuoteTemplateToCompanyVars);

const { data, isPending, isSuccess, isError, error } = useClearCompanyQuoteTemplate(clearCompanyQuoteTemplateVars);

const { data, isPending, isSuccess, isError, error } = useDeleteMyCompany(deleteMyCompanyVars);

const { data, isPending, isSuccess, isError, error } = useCreateMyCompanyContact(createMyCompanyContactVars);

const { data, isPending, isSuccess, isError, error } = useUpdateMyCompanyContact(updateMyCompanyContactVars);

const { data, isPending, isSuccess, isError, error } = useDeleteMyCompanyContact(deleteMyCompanyContactVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createMyCompany, updateMyCompany, setMyCompanyPrimaryContact, clearMyCompanyPrimaryContact, assignQuoteTemplateToCompany, clearCompanyQuoteTemplate, deleteMyCompany, createMyCompanyContact, updateMyCompanyContact, deleteMyCompanyContact } from '@generated/data-connector-web';


// Operation CreateMyCompany:  For variables, look at type CreateMyCompanyVars in ../index.d.ts
const { data } = await CreateMyCompany(dataConnect, createMyCompanyVars);

// Operation UpdateMyCompany:  For variables, look at type UpdateMyCompanyVars in ../index.d.ts
const { data } = await UpdateMyCompany(dataConnect, updateMyCompanyVars);

// Operation SetMyCompanyPrimaryContact:  For variables, look at type SetMyCompanyPrimaryContactVars in ../index.d.ts
const { data } = await SetMyCompanyPrimaryContact(dataConnect, setMyCompanyPrimaryContactVars);

// Operation ClearMyCompanyPrimaryContact:  For variables, look at type ClearMyCompanyPrimaryContactVars in ../index.d.ts
const { data } = await ClearMyCompanyPrimaryContact(dataConnect, clearMyCompanyPrimaryContactVars);

// Operation AssignQuoteTemplateToCompany:  For variables, look at type AssignQuoteTemplateToCompanyVars in ../index.d.ts
const { data } = await AssignQuoteTemplateToCompany(dataConnect, assignQuoteTemplateToCompanyVars);

// Operation ClearCompanyQuoteTemplate:  For variables, look at type ClearCompanyQuoteTemplateVars in ../index.d.ts
const { data } = await ClearCompanyQuoteTemplate(dataConnect, clearCompanyQuoteTemplateVars);

// Operation DeleteMyCompany:  For variables, look at type DeleteMyCompanyVars in ../index.d.ts
const { data } = await DeleteMyCompany(dataConnect, deleteMyCompanyVars);

// Operation CreateMyCompanyContact:  For variables, look at type CreateMyCompanyContactVars in ../index.d.ts
const { data } = await CreateMyCompanyContact(dataConnect, createMyCompanyContactVars);

// Operation UpdateMyCompanyContact:  For variables, look at type UpdateMyCompanyContactVars in ../index.d.ts
const { data } = await UpdateMyCompanyContact(dataConnect, updateMyCompanyContactVars);

// Operation DeleteMyCompanyContact:  For variables, look at type DeleteMyCompanyContactVars in ../index.d.ts
const { data } = await DeleteMyCompanyContact(dataConnect, deleteMyCompanyContactVars);


```