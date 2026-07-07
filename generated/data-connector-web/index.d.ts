import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

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

export interface ApplyQuestionnaireTemplateToProjectData {
  projectQuestionnaire_upsert: ProjectQuestionnaire_Key;
}

export interface ApplyQuestionnaireTemplateToProjectVariables {
  projectId: UUIDString;
  sourceTemplateId: UUIDString;
}

export interface ClearMyAccountPrimaryContactData {
  account_update?: Account_Key | null;
}

export interface ClearMyAccountPrimaryContactVariables {
  accountId: UUIDString;
}

export interface CreateMyAccountContactData {
  accountContact_insert: AccountContact_Key;
}

export interface CreateMyAccountContactVariables {
  id: UUIDString;
  accountId: UUIDString;
  name: string;
  email?: string | null;
  phoneNumber?: string | null;
  role?: string | null;
}

export interface CreateMyAccountData {
  account_insert: Account_Key;
}

export interface CreateMyAccountVariables {
  id: UUIDString;
  companyName: string;
  businessNumber?: string | null;
  phoneNumber?: string | null;
}

export interface CreateProjectQuestionnaireQuestionData {
  projectQuestionnaireQuestion_insert: ProjectQuestionnaireQuestion_Key;
}

export interface CreateProjectQuestionnaireQuestionVariables {
  id: UUIDString;
  projectId: UUIDString;
  label: string;
  position: number;
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
}

export interface CreateQuestionnaireTemplateVariables {
  id: UUIDString;
  name: string;
}

export interface DeleteMyAccountContactData {
  account_update?: Account_Key | null;
  accountContact_delete?: AccountContact_Key | null;
}

export interface DeleteMyAccountContactVariables {
  accountId: UUIDString;
  contactId: UUIDString;
}

export interface DeleteMyAccountData {
  accountContact_deleteMany: number;
  account_delete?: Account_Key | null;
}

export interface DeleteMyAccountVariables {
  id: UUIDString;
}

export interface DeleteProjectQuestionnaireQuestionData {
  projectQuestionnaireQuestion_delete?: ProjectQuestionnaireQuestion_Key | null;
}

export interface DeleteProjectQuestionnaireQuestionVariables {
  id: UUIDString;
  projectId: UUIDString;
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

export interface EnsureProjectQuestionnaireData {
  projectQuestionnaire_upsert: ProjectQuestionnaire_Key;
}

export interface EnsureProjectQuestionnaireVariables {
  projectId: UUIDString;
}

export interface FloorplanPage_Key {
  id: UUIDString;
  __typename?: 'FloorplanPage_Key';
}

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

export interface GetMyAccountVariables {
  id: UUIDString;
}

export interface GetMyUserSettingsData {
  userSettings?: {
    ownerId: string;
    quoteFollowUpEnabled: boolean;
    quoteFollowUpDays: number;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & UserSettings_Key;
}

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
    } & ProjectQuestionnaireQuestion_Key)[];
  } & ProjectQuestionnaire_Key;
}

export interface GetProjectQuestionnaireVariables {
  projectId: UUIDString;
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
      position: number;
    } & QuestionnaireTemplateQuestion_Key)[];
  } & QuestionnaireTemplate_Key;
}

export interface GetQuestionnaireTemplateVariables {
  id: UUIDString;
}

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

export interface ListMyAccountContactsVariables {
  accountId: UUIDString;
}

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

export interface ListQuestionnaireTemplatesData {
  questionnaireTemplates: ({
    id: UUIDString;
    name: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & QuestionnaireTemplate_Key)[];
}

export interface ProjectQuestionnaireQuestion_Key {
  id: UUIDString;
  __typename?: 'ProjectQuestionnaireQuestion_Key';
}

export interface ProjectQuestionnaire_Key {
  projectId: UUIDString;
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

export interface SetMyAccountPrimaryContactData {
  account_update?: Account_Key | null;
}

export interface SetMyAccountPrimaryContactVariables {
  accountId: UUIDString;
  contactId: UUIDString;
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

export interface UpdateMyAccountContactData {
  accountContact_update?: AccountContact_Key | null;
}

export interface UpdateMyAccountContactVariables {
  accountId: UUIDString;
  contactId: UUIDString;
  name: string;
  email?: string | null;
  phoneNumber?: string | null;
  role?: string | null;
}

export interface UpdateMyAccountData {
  account_update?: Account_Key | null;
}

export interface UpdateMyAccountVariables {
  id: UUIDString;
  companyName: string;
  businessNumber?: string | null;
  phoneNumber?: string | null;
}

export interface UpdateProjectQuestionnaireQuestionAnswerData {
  projectQuestionnaireQuestion_update?: ProjectQuestionnaireQuestion_Key | null;
}

export interface UpdateProjectQuestionnaireQuestionAnswerVariables {
  id: UUIDString;
  projectId: UUIDString;
  answer?: string | null;
}

export interface UpdateProjectQuestionnaireQuestionData {
  projectQuestionnaireQuestion_update?: ProjectQuestionnaireQuestion_Key | null;
}

export interface UpdateProjectQuestionnaireQuestionVariables {
  id: UUIDString;
  projectId: UUIDString;
  label: string;
  position: number;
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
}

export interface UpsertMyUserSettingsData {
  userSettings_upsert: UserSettings_Key;
}

export interface UpsertMyUserSettingsVariables {
  quoteFollowUpEnabled: boolean;
  quoteFollowUpDays: number;
}

export interface UserSettings_Key {
  ownerId: string;
  __typename?: 'UserSettings_Key';
}

interface CreateMyAccountRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMyAccountVariables): MutationRef<CreateMyAccountData, CreateMyAccountVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMyAccountVariables): MutationRef<CreateMyAccountData, CreateMyAccountVariables>;
  operationName: string;
}
export const createMyAccountRef: CreateMyAccountRef;

export function createMyAccount(vars: CreateMyAccountVariables): MutationPromise<CreateMyAccountData, CreateMyAccountVariables>;
export function createMyAccount(dc: DataConnect, vars: CreateMyAccountVariables): MutationPromise<CreateMyAccountData, CreateMyAccountVariables>;

interface UpdateMyAccountRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMyAccountVariables): MutationRef<UpdateMyAccountData, UpdateMyAccountVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMyAccountVariables): MutationRef<UpdateMyAccountData, UpdateMyAccountVariables>;
  operationName: string;
}
export const updateMyAccountRef: UpdateMyAccountRef;

export function updateMyAccount(vars: UpdateMyAccountVariables): MutationPromise<UpdateMyAccountData, UpdateMyAccountVariables>;
export function updateMyAccount(dc: DataConnect, vars: UpdateMyAccountVariables): MutationPromise<UpdateMyAccountData, UpdateMyAccountVariables>;

interface SetMyAccountPrimaryContactRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetMyAccountPrimaryContactVariables): MutationRef<SetMyAccountPrimaryContactData, SetMyAccountPrimaryContactVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SetMyAccountPrimaryContactVariables): MutationRef<SetMyAccountPrimaryContactData, SetMyAccountPrimaryContactVariables>;
  operationName: string;
}
export const setMyAccountPrimaryContactRef: SetMyAccountPrimaryContactRef;

export function setMyAccountPrimaryContact(vars: SetMyAccountPrimaryContactVariables): MutationPromise<SetMyAccountPrimaryContactData, SetMyAccountPrimaryContactVariables>;
export function setMyAccountPrimaryContact(dc: DataConnect, vars: SetMyAccountPrimaryContactVariables): MutationPromise<SetMyAccountPrimaryContactData, SetMyAccountPrimaryContactVariables>;

interface ClearMyAccountPrimaryContactRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ClearMyAccountPrimaryContactVariables): MutationRef<ClearMyAccountPrimaryContactData, ClearMyAccountPrimaryContactVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ClearMyAccountPrimaryContactVariables): MutationRef<ClearMyAccountPrimaryContactData, ClearMyAccountPrimaryContactVariables>;
  operationName: string;
}
export const clearMyAccountPrimaryContactRef: ClearMyAccountPrimaryContactRef;

export function clearMyAccountPrimaryContact(vars: ClearMyAccountPrimaryContactVariables): MutationPromise<ClearMyAccountPrimaryContactData, ClearMyAccountPrimaryContactVariables>;
export function clearMyAccountPrimaryContact(dc: DataConnect, vars: ClearMyAccountPrimaryContactVariables): MutationPromise<ClearMyAccountPrimaryContactData, ClearMyAccountPrimaryContactVariables>;

interface DeleteMyAccountRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMyAccountVariables): MutationRef<DeleteMyAccountData, DeleteMyAccountVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteMyAccountVariables): MutationRef<DeleteMyAccountData, DeleteMyAccountVariables>;
  operationName: string;
}
export const deleteMyAccountRef: DeleteMyAccountRef;

export function deleteMyAccount(vars: DeleteMyAccountVariables): MutationPromise<DeleteMyAccountData, DeleteMyAccountVariables>;
export function deleteMyAccount(dc: DataConnect, vars: DeleteMyAccountVariables): MutationPromise<DeleteMyAccountData, DeleteMyAccountVariables>;

interface CreateMyAccountContactRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMyAccountContactVariables): MutationRef<CreateMyAccountContactData, CreateMyAccountContactVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMyAccountContactVariables): MutationRef<CreateMyAccountContactData, CreateMyAccountContactVariables>;
  operationName: string;
}
export const createMyAccountContactRef: CreateMyAccountContactRef;

export function createMyAccountContact(vars: CreateMyAccountContactVariables): MutationPromise<CreateMyAccountContactData, CreateMyAccountContactVariables>;
export function createMyAccountContact(dc: DataConnect, vars: CreateMyAccountContactVariables): MutationPromise<CreateMyAccountContactData, CreateMyAccountContactVariables>;

interface UpdateMyAccountContactRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMyAccountContactVariables): MutationRef<UpdateMyAccountContactData, UpdateMyAccountContactVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMyAccountContactVariables): MutationRef<UpdateMyAccountContactData, UpdateMyAccountContactVariables>;
  operationName: string;
}
export const updateMyAccountContactRef: UpdateMyAccountContactRef;

export function updateMyAccountContact(vars: UpdateMyAccountContactVariables): MutationPromise<UpdateMyAccountContactData, UpdateMyAccountContactVariables>;
export function updateMyAccountContact(dc: DataConnect, vars: UpdateMyAccountContactVariables): MutationPromise<UpdateMyAccountContactData, UpdateMyAccountContactVariables>;

interface DeleteMyAccountContactRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMyAccountContactVariables): MutationRef<DeleteMyAccountContactData, DeleteMyAccountContactVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteMyAccountContactVariables): MutationRef<DeleteMyAccountContactData, DeleteMyAccountContactVariables>;
  operationName: string;
}
export const deleteMyAccountContactRef: DeleteMyAccountContactRef;

export function deleteMyAccountContact(vars: DeleteMyAccountContactVariables): MutationPromise<DeleteMyAccountContactData, DeleteMyAccountContactVariables>;
export function deleteMyAccountContact(dc: DataConnect, vars: DeleteMyAccountContactVariables): MutationPromise<DeleteMyAccountContactData, DeleteMyAccountContactVariables>;

interface ListMyAccountsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyAccountsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyAccountsData, undefined>;
  operationName: string;
}
export const listMyAccountsRef: ListMyAccountsRef;

export function listMyAccounts(options?: ExecuteQueryOptions): QueryPromise<ListMyAccountsData, undefined>;
export function listMyAccounts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyAccountsData, undefined>;

interface GetMyAccountRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyAccountVariables): QueryRef<GetMyAccountData, GetMyAccountVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMyAccountVariables): QueryRef<GetMyAccountData, GetMyAccountVariables>;
  operationName: string;
}
export const getMyAccountRef: GetMyAccountRef;

export function getMyAccount(vars: GetMyAccountVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyAccountData, GetMyAccountVariables>;
export function getMyAccount(dc: DataConnect, vars: GetMyAccountVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyAccountData, GetMyAccountVariables>;

interface ListMyAccountContactsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMyAccountContactsVariables): QueryRef<ListMyAccountContactsData, ListMyAccountContactsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListMyAccountContactsVariables): QueryRef<ListMyAccountContactsData, ListMyAccountContactsVariables>;
  operationName: string;
}
export const listMyAccountContactsRef: ListMyAccountContactsRef;

export function listMyAccountContacts(vars: ListMyAccountContactsVariables, options?: ExecuteQueryOptions): QueryPromise<ListMyAccountContactsData, ListMyAccountContactsVariables>;
export function listMyAccountContacts(dc: DataConnect, vars: ListMyAccountContactsVariables, options?: ExecuteQueryOptions): QueryPromise<ListMyAccountContactsData, ListMyAccountContactsVariables>;

interface CreateQuestionnaireTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuestionnaireTemplateVariables): MutationRef<CreateQuestionnaireTemplateData, CreateQuestionnaireTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuestionnaireTemplateVariables): MutationRef<CreateQuestionnaireTemplateData, CreateQuestionnaireTemplateVariables>;
  operationName: string;
}
export const createQuestionnaireTemplateRef: CreateQuestionnaireTemplateRef;

export function createQuestionnaireTemplate(vars: CreateQuestionnaireTemplateVariables): MutationPromise<CreateQuestionnaireTemplateData, CreateQuestionnaireTemplateVariables>;
export function createQuestionnaireTemplate(dc: DataConnect, vars: CreateQuestionnaireTemplateVariables): MutationPromise<CreateQuestionnaireTemplateData, CreateQuestionnaireTemplateVariables>;

interface CreateQuestionnaireTemplateQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuestionnaireTemplateQuestionVariables): MutationRef<CreateQuestionnaireTemplateQuestionData, CreateQuestionnaireTemplateQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuestionnaireTemplateQuestionVariables): MutationRef<CreateQuestionnaireTemplateQuestionData, CreateQuestionnaireTemplateQuestionVariables>;
  operationName: string;
}
export const createQuestionnaireTemplateQuestionRef: CreateQuestionnaireTemplateQuestionRef;

export function createQuestionnaireTemplateQuestion(vars: CreateQuestionnaireTemplateQuestionVariables): MutationPromise<CreateQuestionnaireTemplateQuestionData, CreateQuestionnaireTemplateQuestionVariables>;
export function createQuestionnaireTemplateQuestion(dc: DataConnect, vars: CreateQuestionnaireTemplateQuestionVariables): MutationPromise<CreateQuestionnaireTemplateQuestionData, CreateQuestionnaireTemplateQuestionVariables>;

interface UpdateQuestionnaireTemplateNameRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuestionnaireTemplateNameVariables): MutationRef<UpdateQuestionnaireTemplateNameData, UpdateQuestionnaireTemplateNameVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateQuestionnaireTemplateNameVariables): MutationRef<UpdateQuestionnaireTemplateNameData, UpdateQuestionnaireTemplateNameVariables>;
  operationName: string;
}
export const updateQuestionnaireTemplateNameRef: UpdateQuestionnaireTemplateNameRef;

export function updateQuestionnaireTemplateName(vars: UpdateQuestionnaireTemplateNameVariables): MutationPromise<UpdateQuestionnaireTemplateNameData, UpdateQuestionnaireTemplateNameVariables>;
export function updateQuestionnaireTemplateName(dc: DataConnect, vars: UpdateQuestionnaireTemplateNameVariables): MutationPromise<UpdateQuestionnaireTemplateNameData, UpdateQuestionnaireTemplateNameVariables>;

interface UpdateQuestionnaireTemplateQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuestionnaireTemplateQuestionVariables): MutationRef<UpdateQuestionnaireTemplateQuestionData, UpdateQuestionnaireTemplateQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateQuestionnaireTemplateQuestionVariables): MutationRef<UpdateQuestionnaireTemplateQuestionData, UpdateQuestionnaireTemplateQuestionVariables>;
  operationName: string;
}
export const updateQuestionnaireTemplateQuestionRef: UpdateQuestionnaireTemplateQuestionRef;

export function updateQuestionnaireTemplateQuestion(vars: UpdateQuestionnaireTemplateQuestionVariables): MutationPromise<UpdateQuestionnaireTemplateQuestionData, UpdateQuestionnaireTemplateQuestionVariables>;
export function updateQuestionnaireTemplateQuestion(dc: DataConnect, vars: UpdateQuestionnaireTemplateQuestionVariables): MutationPromise<UpdateQuestionnaireTemplateQuestionData, UpdateQuestionnaireTemplateQuestionVariables>;

interface DeleteQuestionnaireTemplateQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQuestionnaireTemplateQuestionVariables): MutationRef<DeleteQuestionnaireTemplateQuestionData, DeleteQuestionnaireTemplateQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteQuestionnaireTemplateQuestionVariables): MutationRef<DeleteQuestionnaireTemplateQuestionData, DeleteQuestionnaireTemplateQuestionVariables>;
  operationName: string;
}
export const deleteQuestionnaireTemplateQuestionRef: DeleteQuestionnaireTemplateQuestionRef;

export function deleteQuestionnaireTemplateQuestion(vars: DeleteQuestionnaireTemplateQuestionVariables): MutationPromise<DeleteQuestionnaireTemplateQuestionData, DeleteQuestionnaireTemplateQuestionVariables>;
export function deleteQuestionnaireTemplateQuestion(dc: DataConnect, vars: DeleteQuestionnaireTemplateQuestionVariables): MutationPromise<DeleteQuestionnaireTemplateQuestionData, DeleteQuestionnaireTemplateQuestionVariables>;

interface DeleteQuestionnaireTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQuestionnaireTemplateVariables): MutationRef<DeleteQuestionnaireTemplateData, DeleteQuestionnaireTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteQuestionnaireTemplateVariables): MutationRef<DeleteQuestionnaireTemplateData, DeleteQuestionnaireTemplateVariables>;
  operationName: string;
}
export const deleteQuestionnaireTemplateRef: DeleteQuestionnaireTemplateRef;

export function deleteQuestionnaireTemplate(vars: DeleteQuestionnaireTemplateVariables): MutationPromise<DeleteQuestionnaireTemplateData, DeleteQuestionnaireTemplateVariables>;
export function deleteQuestionnaireTemplate(dc: DataConnect, vars: DeleteQuestionnaireTemplateVariables): MutationPromise<DeleteQuestionnaireTemplateData, DeleteQuestionnaireTemplateVariables>;

interface EnsureProjectQuestionnaireRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EnsureProjectQuestionnaireVariables): MutationRef<EnsureProjectQuestionnaireData, EnsureProjectQuestionnaireVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EnsureProjectQuestionnaireVariables): MutationRef<EnsureProjectQuestionnaireData, EnsureProjectQuestionnaireVariables>;
  operationName: string;
}
export const ensureProjectQuestionnaireRef: EnsureProjectQuestionnaireRef;

export function ensureProjectQuestionnaire(vars: EnsureProjectQuestionnaireVariables): MutationPromise<EnsureProjectQuestionnaireData, EnsureProjectQuestionnaireVariables>;
export function ensureProjectQuestionnaire(dc: DataConnect, vars: EnsureProjectQuestionnaireVariables): MutationPromise<EnsureProjectQuestionnaireData, EnsureProjectQuestionnaireVariables>;

interface ApplyQuestionnaireTemplateToProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ApplyQuestionnaireTemplateToProjectVariables): MutationRef<ApplyQuestionnaireTemplateToProjectData, ApplyQuestionnaireTemplateToProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ApplyQuestionnaireTemplateToProjectVariables): MutationRef<ApplyQuestionnaireTemplateToProjectData, ApplyQuestionnaireTemplateToProjectVariables>;
  operationName: string;
}
export const applyQuestionnaireTemplateToProjectRef: ApplyQuestionnaireTemplateToProjectRef;

export function applyQuestionnaireTemplateToProject(vars: ApplyQuestionnaireTemplateToProjectVariables): MutationPromise<ApplyQuestionnaireTemplateToProjectData, ApplyQuestionnaireTemplateToProjectVariables>;
export function applyQuestionnaireTemplateToProject(dc: DataConnect, vars: ApplyQuestionnaireTemplateToProjectVariables): MutationPromise<ApplyQuestionnaireTemplateToProjectData, ApplyQuestionnaireTemplateToProjectVariables>;

interface CreateProjectQuestionnaireQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectQuestionnaireQuestionVariables): MutationRef<CreateProjectQuestionnaireQuestionData, CreateProjectQuestionnaireQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProjectQuestionnaireQuestionVariables): MutationRef<CreateProjectQuestionnaireQuestionData, CreateProjectQuestionnaireQuestionVariables>;
  operationName: string;
}
export const createProjectQuestionnaireQuestionRef: CreateProjectQuestionnaireQuestionRef;

export function createProjectQuestionnaireQuestion(vars: CreateProjectQuestionnaireQuestionVariables): MutationPromise<CreateProjectQuestionnaireQuestionData, CreateProjectQuestionnaireQuestionVariables>;
export function createProjectQuestionnaireQuestion(dc: DataConnect, vars: CreateProjectQuestionnaireQuestionVariables): MutationPromise<CreateProjectQuestionnaireQuestionData, CreateProjectQuestionnaireQuestionVariables>;

interface UpdateProjectQuestionnaireQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectQuestionnaireQuestionVariables): MutationRef<UpdateProjectQuestionnaireQuestionData, UpdateProjectQuestionnaireQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectQuestionnaireQuestionVariables): MutationRef<UpdateProjectQuestionnaireQuestionData, UpdateProjectQuestionnaireQuestionVariables>;
  operationName: string;
}
export const updateProjectQuestionnaireQuestionRef: UpdateProjectQuestionnaireQuestionRef;

export function updateProjectQuestionnaireQuestion(vars: UpdateProjectQuestionnaireQuestionVariables): MutationPromise<UpdateProjectQuestionnaireQuestionData, UpdateProjectQuestionnaireQuestionVariables>;
export function updateProjectQuestionnaireQuestion(dc: DataConnect, vars: UpdateProjectQuestionnaireQuestionVariables): MutationPromise<UpdateProjectQuestionnaireQuestionData, UpdateProjectQuestionnaireQuestionVariables>;

interface UpdateProjectQuestionnaireQuestionAnswerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectQuestionnaireQuestionAnswerVariables): MutationRef<UpdateProjectQuestionnaireQuestionAnswerData, UpdateProjectQuestionnaireQuestionAnswerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectQuestionnaireQuestionAnswerVariables): MutationRef<UpdateProjectQuestionnaireQuestionAnswerData, UpdateProjectQuestionnaireQuestionAnswerVariables>;
  operationName: string;
}
export const updateProjectQuestionnaireQuestionAnswerRef: UpdateProjectQuestionnaireQuestionAnswerRef;

export function updateProjectQuestionnaireQuestionAnswer(vars: UpdateProjectQuestionnaireQuestionAnswerVariables): MutationPromise<UpdateProjectQuestionnaireQuestionAnswerData, UpdateProjectQuestionnaireQuestionAnswerVariables>;
export function updateProjectQuestionnaireQuestionAnswer(dc: DataConnect, vars: UpdateProjectQuestionnaireQuestionAnswerVariables): MutationPromise<UpdateProjectQuestionnaireQuestionAnswerData, UpdateProjectQuestionnaireQuestionAnswerVariables>;

interface DeleteProjectQuestionnaireQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectQuestionnaireQuestionVariables): MutationRef<DeleteProjectQuestionnaireQuestionData, DeleteProjectQuestionnaireQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProjectQuestionnaireQuestionVariables): MutationRef<DeleteProjectQuestionnaireQuestionData, DeleteProjectQuestionnaireQuestionVariables>;
  operationName: string;
}
export const deleteProjectQuestionnaireQuestionRef: DeleteProjectQuestionnaireQuestionRef;

export function deleteProjectQuestionnaireQuestion(vars: DeleteProjectQuestionnaireQuestionVariables): MutationPromise<DeleteProjectQuestionnaireQuestionData, DeleteProjectQuestionnaireQuestionVariables>;
export function deleteProjectQuestionnaireQuestion(dc: DataConnect, vars: DeleteProjectQuestionnaireQuestionVariables): MutationPromise<DeleteProjectQuestionnaireQuestionData, DeleteProjectQuestionnaireQuestionVariables>;

interface ListQuestionnaireTemplatesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQuestionnaireTemplatesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListQuestionnaireTemplatesData, undefined>;
  operationName: string;
}
export const listQuestionnaireTemplatesRef: ListQuestionnaireTemplatesRef;

export function listQuestionnaireTemplates(options?: ExecuteQueryOptions): QueryPromise<ListQuestionnaireTemplatesData, undefined>;
export function listQuestionnaireTemplates(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListQuestionnaireTemplatesData, undefined>;

interface GetQuestionnaireTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuestionnaireTemplateVariables): QueryRef<GetQuestionnaireTemplateData, GetQuestionnaireTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetQuestionnaireTemplateVariables): QueryRef<GetQuestionnaireTemplateData, GetQuestionnaireTemplateVariables>;
  operationName: string;
}
export const getQuestionnaireTemplateRef: GetQuestionnaireTemplateRef;

export function getQuestionnaireTemplate(vars: GetQuestionnaireTemplateVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuestionnaireTemplateData, GetQuestionnaireTemplateVariables>;
export function getQuestionnaireTemplate(dc: DataConnect, vars: GetQuestionnaireTemplateVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuestionnaireTemplateData, GetQuestionnaireTemplateVariables>;

interface GetProjectQuestionnaireRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProjectQuestionnaireVariables): QueryRef<GetProjectQuestionnaireData, GetProjectQuestionnaireVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetProjectQuestionnaireVariables): QueryRef<GetProjectQuestionnaireData, GetProjectQuestionnaireVariables>;
  operationName: string;
}
export const getProjectQuestionnaireRef: GetProjectQuestionnaireRef;

export function getProjectQuestionnaire(vars: GetProjectQuestionnaireVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectQuestionnaireData, GetProjectQuestionnaireVariables>;
export function getProjectQuestionnaire(dc: DataConnect, vars: GetProjectQuestionnaireVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectQuestionnaireData, GetProjectQuestionnaireVariables>;

interface UpsertMyUserSettingsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertMyUserSettingsVariables): MutationRef<UpsertMyUserSettingsData, UpsertMyUserSettingsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertMyUserSettingsVariables): MutationRef<UpsertMyUserSettingsData, UpsertMyUserSettingsVariables>;
  operationName: string;
}
export const upsertMyUserSettingsRef: UpsertMyUserSettingsRef;

export function upsertMyUserSettings(vars: UpsertMyUserSettingsVariables): MutationPromise<UpsertMyUserSettingsData, UpsertMyUserSettingsVariables>;
export function upsertMyUserSettings(dc: DataConnect, vars: UpsertMyUserSettingsVariables): MutationPromise<UpsertMyUserSettingsData, UpsertMyUserSettingsVariables>;

interface GetMyUserSettingsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyUserSettingsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyUserSettingsData, undefined>;
  operationName: string;
}
export const getMyUserSettingsRef: GetMyUserSettingsRef;

export function getMyUserSettings(options?: ExecuteQueryOptions): QueryPromise<GetMyUserSettingsData, undefined>;
export function getMyUserSettings(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyUserSettingsData, undefined>;

