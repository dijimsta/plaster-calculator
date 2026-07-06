# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateAccount, useUpdateAccount, useDeleteAccountContacts, useDeleteAccount, useCreateAccountContact, useUpdateAccountContact, useDeleteAccountContact, useListAccountsByOwner, useGetAccountById, useListAccountContactsByAccountId } from '@generated/data-connector-web/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateAccount(createAccountVars);

const { data, isPending, isSuccess, isError, error } = useUpdateAccount(updateAccountVars);

const { data, isPending, isSuccess, isError, error } = useDeleteAccountContacts(deleteAccountContactsVars);

const { data, isPending, isSuccess, isError, error } = useDeleteAccount(deleteAccountVars);

const { data, isPending, isSuccess, isError, error } = useCreateAccountContact(createAccountContactVars);

const { data, isPending, isSuccess, isError, error } = useUpdateAccountContact(updateAccountContactVars);

const { data, isPending, isSuccess, isError, error } = useDeleteAccountContact(deleteAccountContactVars);

const { data, isPending, isSuccess, isError, error } = useListAccountsByOwner(listAccountsByOwnerVars);

const { data, isPending, isSuccess, isError, error } = useGetAccountById(getAccountByIdVars);

const { data, isPending, isSuccess, isError, error } = useListAccountContactsByAccountId(listAccountContactsByAccountIdVars);

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
import { createAccount, updateAccount, deleteAccountContacts, deleteAccount, createAccountContact, updateAccountContact, deleteAccountContact, listAccountsByOwner, getAccountById, listAccountContactsByAccountId } from '@generated/data-connector-web';


// Operation CreateAccount:  For variables, look at type CreateAccountVars in ../index.d.ts
const { data } = await CreateAccount(dataConnect, createAccountVars);

// Operation UpdateAccount:  For variables, look at type UpdateAccountVars in ../index.d.ts
const { data } = await UpdateAccount(dataConnect, updateAccountVars);

// Operation DeleteAccountContacts:  For variables, look at type DeleteAccountContactsVars in ../index.d.ts
const { data } = await DeleteAccountContacts(dataConnect, deleteAccountContactsVars);

// Operation DeleteAccount:  For variables, look at type DeleteAccountVars in ../index.d.ts
const { data } = await DeleteAccount(dataConnect, deleteAccountVars);

// Operation CreateAccountContact:  For variables, look at type CreateAccountContactVars in ../index.d.ts
const { data } = await CreateAccountContact(dataConnect, createAccountContactVars);

// Operation UpdateAccountContact:  For variables, look at type UpdateAccountContactVars in ../index.d.ts
const { data } = await UpdateAccountContact(dataConnect, updateAccountContactVars);

// Operation DeleteAccountContact:  For variables, look at type DeleteAccountContactVars in ../index.d.ts
const { data } = await DeleteAccountContact(dataConnect, deleteAccountContactVars);

// Operation ListAccountsByOwner:  For variables, look at type ListAccountsByOwnerVars in ../index.d.ts
const { data } = await ListAccountsByOwner(dataConnect, listAccountsByOwnerVars);

// Operation GetAccountById:  For variables, look at type GetAccountByIdVars in ../index.d.ts
const { data } = await GetAccountById(dataConnect, getAccountByIdVars);

// Operation ListAccountContactsByAccountId:  For variables, look at type ListAccountContactsByAccountIdVars in ../index.d.ts
const { data } = await ListAccountContactsByAccountId(dataConnect, listAccountContactsByAccountIdVars);


```