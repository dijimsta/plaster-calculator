# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateMyAccount, useUpdateMyAccount, useSetMyAccountPrimaryContact, useClearMyAccountPrimaryContact, useDeleteMyAccount, useCreateMyAccountContact, useUpdateMyAccountContact, useDeleteMyAccountContact, useListMyAccounts, useGetMyAccount } from '@generated/data-connector-web/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateMyAccount(createMyAccountVars);

const { data, isPending, isSuccess, isError, error } = useUpdateMyAccount(updateMyAccountVars);

const { data, isPending, isSuccess, isError, error } = useSetMyAccountPrimaryContact(setMyAccountPrimaryContactVars);

const { data, isPending, isSuccess, isError, error } = useClearMyAccountPrimaryContact(clearMyAccountPrimaryContactVars);

const { data, isPending, isSuccess, isError, error } = useDeleteMyAccount(deleteMyAccountVars);

const { data, isPending, isSuccess, isError, error } = useCreateMyAccountContact(createMyAccountContactVars);

const { data, isPending, isSuccess, isError, error } = useUpdateMyAccountContact(updateMyAccountContactVars);

const { data, isPending, isSuccess, isError, error } = useDeleteMyAccountContact(deleteMyAccountContactVars);

const { data, isPending, isSuccess, isError, error } = useListMyAccounts();

const { data, isPending, isSuccess, isError, error } = useGetMyAccount(getMyAccountVars);

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
import { createMyAccount, updateMyAccount, setMyAccountPrimaryContact, clearMyAccountPrimaryContact, deleteMyAccount, createMyAccountContact, updateMyAccountContact, deleteMyAccountContact, listMyAccounts, getMyAccount } from '@generated/data-connector-web';


// Operation CreateMyAccount:  For variables, look at type CreateMyAccountVars in ../index.d.ts
const { data } = await CreateMyAccount(dataConnect, createMyAccountVars);

// Operation UpdateMyAccount:  For variables, look at type UpdateMyAccountVars in ../index.d.ts
const { data } = await UpdateMyAccount(dataConnect, updateMyAccountVars);

// Operation SetMyAccountPrimaryContact:  For variables, look at type SetMyAccountPrimaryContactVars in ../index.d.ts
const { data } = await SetMyAccountPrimaryContact(dataConnect, setMyAccountPrimaryContactVars);

// Operation ClearMyAccountPrimaryContact:  For variables, look at type ClearMyAccountPrimaryContactVars in ../index.d.ts
const { data } = await ClearMyAccountPrimaryContact(dataConnect, clearMyAccountPrimaryContactVars);

// Operation DeleteMyAccount:  For variables, look at type DeleteMyAccountVars in ../index.d.ts
const { data } = await DeleteMyAccount(dataConnect, deleteMyAccountVars);

// Operation CreateMyAccountContact:  For variables, look at type CreateMyAccountContactVars in ../index.d.ts
const { data } = await CreateMyAccountContact(dataConnect, createMyAccountContactVars);

// Operation UpdateMyAccountContact:  For variables, look at type UpdateMyAccountContactVars in ../index.d.ts
const { data } = await UpdateMyAccountContact(dataConnect, updateMyAccountContactVars);

// Operation DeleteMyAccountContact:  For variables, look at type DeleteMyAccountContactVars in ../index.d.ts
const { data } = await DeleteMyAccountContact(dataConnect, deleteMyAccountContactVars);

// Operation ListMyAccounts: 
const { data } = await ListMyAccounts(dataConnect);

// Operation GetMyAccount:  For variables, look at type GetMyAccountVars in ../index.d.ts
const { data } = await GetMyAccount(dataConnect, getMyAccountVars);


```