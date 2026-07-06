import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface AccountContact_Key {
  id: UUIDString;
  __typename?: 'AccountContact_Key';
}

export interface Account_Key {
  id: UUIDString;
  __typename?: 'Account_Key';
}

export interface CreateProjectQuestionnaireAnswerData {
  projectQuestionnaireAnswer_insert: ProjectQuestionnaireAnswer_Key;
}

export interface CreateProjectQuestionnaireAnswerVariables {
  id: UUIDString;
  projectQuestionnaireId: UUIDString;
  questionId: UUIDString;
  position: number;
  answer?: string | null;
}

export interface CreateProjectQuestionnaireData {
  projectQuestionnaire_insert: ProjectQuestionnaire_Key;
}

export interface CreateProjectQuestionnaireVariables {
  id: UUIDString;
  projectId: UUIDString;
  sourceTemplateId?: UUIDString | null;
}

export interface CreateQuestionnaireTemplateData {
  questionnaireTemplate_insert: QuestionnaireTemplate_Key;
}

export interface CreateQuestionnaireTemplateQuestionData {
  questionnaireTemplateQuestion_insert: QuestionnaireTemplateQuestion_Key;
}

export interface CreateQuestionnaireTemplateQuestionVariables {
  id: UUIDString;
  templateId: UUIDString;
  label: string;
  position: number;
  description?: string | null;
}

export interface CreateQuestionnaireTemplateVariables {
  id: UUIDString;
  name: string;
}

export interface DeleteQuestionnaireTemplateData {
  questionnaireTemplateQuestion_deleteMany: number;
  questionnaireTemplate_delete?: QuestionnaireTemplate_Key | null;
}

export interface DeleteQuestionnaireTemplateQuestionData {
  questionnaireTemplateQuestion_delete?: QuestionnaireTemplateQuestion_Key | null;
}

export interface DeleteQuestionnaireTemplateQuestionVariables {
  id: UUIDString;
  templateId: UUIDString;
}

export interface DeleteQuestionnaireTemplateVariables {
  id: UUIDString;
}

export interface FloorplanPage_Key {
  id: UUIDString;
  __typename?: 'FloorplanPage_Key';
}

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

export interface GetQuestionnaireTemplateVariables {
  id: UUIDString;
}

export interface ListQuestionnaireTemplatesData {
  questionnaireTemplates: ({
    id: UUIDString;
    name: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & QuestionnaireTemplate_Key)[];
}

export interface ProjectQuestionnaireAnswer_Key {
  id: UUIDString;
  __typename?: 'ProjectQuestionnaireAnswer_Key';
}

export interface ProjectQuestionnaire_Key {
  id: UUIDString;
  __typename?: 'ProjectQuestionnaire_Key';
}

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
}

export interface QuantitySource_Key {
  id: UUIDString;
  __typename?: 'QuantitySource_Key';
}

export interface QuestionnaireTemplateQuestion_Key {
  id: UUIDString;
  __typename?: 'QuestionnaireTemplateQuestion_Key';
}

export interface QuestionnaireTemplate_Key {
  id: UUIDString;
  __typename?: 'QuestionnaireTemplate_Key';
}

export interface QuoteItemTemplateConfig_Key {
  ownerId: string;
  templateId: UUIDString;
  __typename?: 'QuoteItemTemplateConfig_Key';
}

export interface QuoteItemTemplate_Key {
  id: UUIDString;
  __typename?: 'QuoteItemTemplate_Key';
}

export interface QuoteItem_Key {
  id: UUIDString;
  __typename?: 'QuoteItem_Key';
}

export interface Quote_Key {
  id: UUIDString;
  __typename?: 'Quote_Key';
}

export interface Reminder_Key {
  id: UUIDString;
  __typename?: 'Reminder_Key';
}

export interface SupplierQuoteItemPrice_Key {
  supplierId: UUIDString;
  templateId: UUIDString;
  __typename?: 'SupplierQuoteItemPrice_Key';
}

export interface Supplier_Key {
  id: UUIDString;
  __typename?: 'Supplier_Key';
}

export interface UpdateQuestionnaireTemplateNameData {
  questionnaireTemplate_update?: QuestionnaireTemplate_Key | null;
}

export interface UpdateQuestionnaireTemplateNameVariables {
  id: UUIDString;
  name: string;
}

export interface UpdateQuestionnaireTemplateQuestionData {
  questionnaireTemplateQuestion_update?: QuestionnaireTemplateQuestion_Key | null;
}

export interface UpdateQuestionnaireTemplateQuestionVariables {
  id: UUIDString;
  templateId: UUIDString;
  label: string;
  position: number;
  description?: string | null;
}

export interface UserSettings_Key {
  ownerId: string;
  __typename?: 'UserSettings_Key';
}

/** Generated Node Admin SDK operation action function for the 'CreateQuestionnaireTemplate' Mutation. Allow users to execute without passing in DataConnect. */
export function createQuestionnaireTemplate(dc: DataConnect, vars: CreateQuestionnaireTemplateVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateQuestionnaireTemplateData>>;
/** Generated Node Admin SDK operation action function for the 'CreateQuestionnaireTemplate' Mutation. Allow users to pass in custom DataConnect instances. */
export function createQuestionnaireTemplate(vars: CreateQuestionnaireTemplateVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateQuestionnaireTemplateData>>;

/** Generated Node Admin SDK operation action function for the 'CreateQuestionnaireTemplateQuestion' Mutation. Allow users to execute without passing in DataConnect. */
export function createQuestionnaireTemplateQuestion(dc: DataConnect, vars: CreateQuestionnaireTemplateQuestionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateQuestionnaireTemplateQuestionData>>;
/** Generated Node Admin SDK operation action function for the 'CreateQuestionnaireTemplateQuestion' Mutation. Allow users to pass in custom DataConnect instances. */
export function createQuestionnaireTemplateQuestion(vars: CreateQuestionnaireTemplateQuestionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateQuestionnaireTemplateQuestionData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateQuestionnaireTemplateName' Mutation. Allow users to execute without passing in DataConnect. */
export function updateQuestionnaireTemplateName(dc: DataConnect, vars: UpdateQuestionnaireTemplateNameVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateQuestionnaireTemplateNameData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateQuestionnaireTemplateName' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateQuestionnaireTemplateName(vars: UpdateQuestionnaireTemplateNameVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateQuestionnaireTemplateNameData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateQuestionnaireTemplateQuestion' Mutation. Allow users to execute without passing in DataConnect. */
export function updateQuestionnaireTemplateQuestion(dc: DataConnect, vars: UpdateQuestionnaireTemplateQuestionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateQuestionnaireTemplateQuestionData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateQuestionnaireTemplateQuestion' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateQuestionnaireTemplateQuestion(vars: UpdateQuestionnaireTemplateQuestionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateQuestionnaireTemplateQuestionData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteQuestionnaireTemplateQuestion' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteQuestionnaireTemplateQuestion(dc: DataConnect, vars: DeleteQuestionnaireTemplateQuestionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteQuestionnaireTemplateQuestionData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteQuestionnaireTemplateQuestion' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteQuestionnaireTemplateQuestion(vars: DeleteQuestionnaireTemplateQuestionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteQuestionnaireTemplateQuestionData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteQuestionnaireTemplate' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteQuestionnaireTemplate(dc: DataConnect, vars: DeleteQuestionnaireTemplateVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteQuestionnaireTemplateData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteQuestionnaireTemplate' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteQuestionnaireTemplate(vars: DeleteQuestionnaireTemplateVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteQuestionnaireTemplateData>>;

/** Generated Node Admin SDK operation action function for the 'CreateProjectQuestionnaire' Mutation. Allow users to execute without passing in DataConnect. */
export function createProjectQuestionnaire(dc: DataConnect, vars: CreateProjectQuestionnaireVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateProjectQuestionnaireData>>;
/** Generated Node Admin SDK operation action function for the 'CreateProjectQuestionnaire' Mutation. Allow users to pass in custom DataConnect instances. */
export function createProjectQuestionnaire(vars: CreateProjectQuestionnaireVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateProjectQuestionnaireData>>;

/** Generated Node Admin SDK operation action function for the 'CreateProjectQuestionnaireAnswer' Mutation. Allow users to execute without passing in DataConnect. */
export function createProjectQuestionnaireAnswer(dc: DataConnect, vars: CreateProjectQuestionnaireAnswerVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateProjectQuestionnaireAnswerData>>;
/** Generated Node Admin SDK operation action function for the 'CreateProjectQuestionnaireAnswer' Mutation. Allow users to pass in custom DataConnect instances. */
export function createProjectQuestionnaireAnswer(vars: CreateProjectQuestionnaireAnswerVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateProjectQuestionnaireAnswerData>>;

/** Generated Node Admin SDK operation action function for the 'ListQuestionnaireTemplates' Query. Allow users to execute without passing in DataConnect. */
export function listQuestionnaireTemplates(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListQuestionnaireTemplatesData>>;
/** Generated Node Admin SDK operation action function for the 'ListQuestionnaireTemplates' Query. Allow users to pass in custom DataConnect instances. */
export function listQuestionnaireTemplates(options?: OperationOptions): Promise<ExecuteOperationResponse<ListQuestionnaireTemplatesData>>;

/** Generated Node Admin SDK operation action function for the 'GetQuestionnaireTemplate' Query. Allow users to execute without passing in DataConnect. */
export function getQuestionnaireTemplate(dc: DataConnect, vars: GetQuestionnaireTemplateVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetQuestionnaireTemplateData>>;
/** Generated Node Admin SDK operation action function for the 'GetQuestionnaireTemplate' Query. Allow users to pass in custom DataConnect instances. */
export function getQuestionnaireTemplate(vars: GetQuestionnaireTemplateVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetQuestionnaireTemplateData>>;

