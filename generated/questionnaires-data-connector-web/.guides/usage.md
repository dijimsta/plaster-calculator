# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateQuestionnaireTemplate, useCreateQuestionnaireTemplateQuestion, useUpdateQuestionnaireTemplateName, useUpdateQuestionnaireTemplateQuestion, useDeleteQuestionnaireTemplateQuestion, useDeleteQuestionnaireTemplate, useCreateProjectQuestionnaire, useCreateProjectQuestionnaireAnswer, useListQuestionnaireTemplates, useGetQuestionnaireTemplate } from '@generated/questionnaires-data-connector-web/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateQuestionnaireTemplate(createQuestionnaireTemplateVars);

const { data, isPending, isSuccess, isError, error } = useCreateQuestionnaireTemplateQuestion(createQuestionnaireTemplateQuestionVars);

const { data, isPending, isSuccess, isError, error } = useUpdateQuestionnaireTemplateName(updateQuestionnaireTemplateNameVars);

const { data, isPending, isSuccess, isError, error } = useUpdateQuestionnaireTemplateQuestion(updateQuestionnaireTemplateQuestionVars);

const { data, isPending, isSuccess, isError, error } = useDeleteQuestionnaireTemplateQuestion(deleteQuestionnaireTemplateQuestionVars);

const { data, isPending, isSuccess, isError, error } = useDeleteQuestionnaireTemplate(deleteQuestionnaireTemplateVars);

const { data, isPending, isSuccess, isError, error } = useCreateProjectQuestionnaire(createProjectQuestionnaireVars);

const { data, isPending, isSuccess, isError, error } = useCreateProjectQuestionnaireAnswer(createProjectQuestionnaireAnswerVars);

const { data, isPending, isSuccess, isError, error } = useListQuestionnaireTemplates();

const { data, isPending, isSuccess, isError, error } = useGetQuestionnaireTemplate(getQuestionnaireTemplateVars);

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
import { createQuestionnaireTemplate, createQuestionnaireTemplateQuestion, updateQuestionnaireTemplateName, updateQuestionnaireTemplateQuestion, deleteQuestionnaireTemplateQuestion, deleteQuestionnaireTemplate, createProjectQuestionnaire, createProjectQuestionnaireAnswer, listQuestionnaireTemplates, getQuestionnaireTemplate } from '@generated/questionnaires-data-connector-web';


// Operation CreateQuestionnaireTemplate:  For variables, look at type CreateQuestionnaireTemplateVars in ../index.d.ts
const { data } = await CreateQuestionnaireTemplate(dataConnect, createQuestionnaireTemplateVars);

// Operation CreateQuestionnaireTemplateQuestion:  For variables, look at type CreateQuestionnaireTemplateQuestionVars in ../index.d.ts
const { data } = await CreateQuestionnaireTemplateQuestion(dataConnect, createQuestionnaireTemplateQuestionVars);

// Operation UpdateQuestionnaireTemplateName:  For variables, look at type UpdateQuestionnaireTemplateNameVars in ../index.d.ts
const { data } = await UpdateQuestionnaireTemplateName(dataConnect, updateQuestionnaireTemplateNameVars);

// Operation UpdateQuestionnaireTemplateQuestion:  For variables, look at type UpdateQuestionnaireTemplateQuestionVars in ../index.d.ts
const { data } = await UpdateQuestionnaireTemplateQuestion(dataConnect, updateQuestionnaireTemplateQuestionVars);

// Operation DeleteQuestionnaireTemplateQuestion:  For variables, look at type DeleteQuestionnaireTemplateQuestionVars in ../index.d.ts
const { data } = await DeleteQuestionnaireTemplateQuestion(dataConnect, deleteQuestionnaireTemplateQuestionVars);

// Operation DeleteQuestionnaireTemplate:  For variables, look at type DeleteQuestionnaireTemplateVars in ../index.d.ts
const { data } = await DeleteQuestionnaireTemplate(dataConnect, deleteQuestionnaireTemplateVars);

// Operation CreateProjectQuestionnaire:  For variables, look at type CreateProjectQuestionnaireVars in ../index.d.ts
const { data } = await CreateProjectQuestionnaire(dataConnect, createProjectQuestionnaireVars);

// Operation CreateProjectQuestionnaireAnswer:  For variables, look at type CreateProjectQuestionnaireAnswerVars in ../index.d.ts
const { data } = await CreateProjectQuestionnaireAnswer(dataConnect, createProjectQuestionnaireAnswerVars);

// Operation ListQuestionnaireTemplates: 
const { data } = await ListQuestionnaireTemplates(dataConnect);

// Operation GetQuestionnaireTemplate:  For variables, look at type GetQuestionnaireTemplateVars in ../index.d.ts
const { data } = await GetQuestionnaireTemplate(dataConnect, getQuestionnaireTemplateVars);


```