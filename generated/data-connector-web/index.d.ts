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

export interface ClearMyCompanyPrimaryContactData {
  company_update?: Company_Key | null;
}

export interface ClearMyCompanyPrimaryContactVariables {
  companyId: UUIDString;
}

export interface CompanyContact_Key {
  id: UUIDString;
  __typename?: 'CompanyContact_Key';
}

export interface Company_Key {
  id: UUIDString;
  __typename?: 'Company_Key';
}

export interface CreateMyCompanyContactData {
  companyContact_insert: CompanyContact_Key;
}

export interface CreateMyCompanyContactVariables {
  id: UUIDString;
  companyId: UUIDString;
  name: string;
  email?: string | null;
  phoneNumber?: string | null;
  role?: string | null;
}

export interface CreateMyCompanyData {
  company_insert: Company_Key;
}

export interface CreateMyCompanyVariables {
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

export interface DeleteMyCompanyContactData {
  company_update?: Company_Key | null;
  companyContact_delete?: CompanyContact_Key | null;
}

export interface DeleteMyCompanyContactVariables {
  companyId: UUIDString;
  contactId: UUIDString;
}

export interface DeleteMyCompanyData {
  companyContact_deleteMany: number;
  company_delete?: Company_Key | null;
}

export interface DeleteMyCompanyVariables {
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

export interface GetMyCompanyVariables {
  id: UUIDString;
}

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

export interface GetMyUserSettingsData {
  userSettings?: {
    ownerId: string;
    quoteFollowUpEnabled: boolean;
    quoteFollowUpDays: number;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & UserSettings_Key;
}

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

export interface GetProjectQuestionnaireVariables {
  projectId: UUIDString;
}

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

export interface GetQuestionnaireTemplateVariables {
  id: UUIDString;
}

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

export interface ListMyCompanyContactsVariables {
  companyId: UUIDString;
}

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

export interface ListQuestionnaireTemplatesData {
  questionnaireTemplates: ({
    id: UUIDString;
    name: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & QuestionnaireTemplate_Key)[];
}

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

export interface ListQuoteItemTemplateConfigsForQuoteTemplateVariables {
  quoteTemplateId: UUIDString;
}

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

export interface ListQuoteTemplatesForTeamData {
  quoteTemplates: ({
    id: UUIDString;
    name: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & QuoteTemplate_Key)[];
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
  quoteTemplateId: UUIDString;
  itemTemplateId: UUIDString;
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

export interface QuoteTemplate_Key {
  id: UUIDString;
  __typename?: 'QuoteTemplate_Key';
}

export interface Quote_Key {
  id: UUIDString;
  __typename?: 'Quote_Key';
}

export interface Reminder_Key {
  id: UUIDString;
  __typename?: 'Reminder_Key';
}

export interface SetMyCompanyPrimaryContactData {
  company_update?: Company_Key | null;
}

export interface SetMyCompanyPrimaryContactVariables {
  companyId: UUIDString;
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

export interface TeamInvitation_Key {
  teamId: string;
  email: string;
  __typename?: 'TeamInvitation_Key';
}

export interface TeamMember_Key {
  teamId: string;
  userId: string;
  __typename?: 'TeamMember_Key';
}

export interface Team_Key {
  id: string;
  __typename?: 'Team_Key';
}

export interface UpdateMyCompanyContactData {
  companyContact_update?: CompanyContact_Key | null;
}

export interface UpdateMyCompanyContactVariables {
  companyId: UUIDString;
  contactId: UUIDString;
  name: string;
  email?: string | null;
  phoneNumber?: string | null;
  role?: string | null;
}

export interface UpdateMyCompanyData {
  company_update?: Company_Key | null;
}

export interface UpdateMyCompanyVariables {
  id: UUIDString;
  companyName: string;
  businessNumber?: string | null;
  phoneNumber?: string | null;
}

export interface UpdateProjectQuestionnaireQuestionAnswerData {
  projectQuestionnaireQuestion_update?: ProjectQuestionnaireQuestion_Key | null;
}

export interface UpdateProjectQuestionnaireQuestionAnswerSourceData {
  projectQuestionnaireQuestion_update?: ProjectQuestionnaireQuestion_Key | null;
}

export interface UpdateProjectQuestionnaireQuestionAnswerSourceVariables {
  id: UUIDString;
  projectId: UUIDString;
  answerSource: string;
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

export interface UpsertMyUserSignatureData {
  userSignature_upsert: UserSignature_Key;
}

export interface UpsertMyUserSignatureVariables {
  name?: string | null;
  companyName?: string | null;
  address?: string | null;
  mobile?: string | null;
  phone?: string | null;
  email?: string | null;
}

export interface UserSettings_Key {
  ownerId: string;
  __typename?: 'UserSettings_Key';
}

export interface UserSignature_Key {
  ownerId: string;
  __typename?: 'UserSignature_Key';
}

interface CreateMyCompanyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMyCompanyVariables): MutationRef<CreateMyCompanyData, CreateMyCompanyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMyCompanyVariables): MutationRef<CreateMyCompanyData, CreateMyCompanyVariables>;
  operationName: string;
}
export const createMyCompanyRef: CreateMyCompanyRef;

export function createMyCompany(vars: CreateMyCompanyVariables): MutationPromise<CreateMyCompanyData, CreateMyCompanyVariables>;
export function createMyCompany(dc: DataConnect, vars: CreateMyCompanyVariables): MutationPromise<CreateMyCompanyData, CreateMyCompanyVariables>;

interface UpdateMyCompanyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMyCompanyVariables): MutationRef<UpdateMyCompanyData, UpdateMyCompanyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMyCompanyVariables): MutationRef<UpdateMyCompanyData, UpdateMyCompanyVariables>;
  operationName: string;
}
export const updateMyCompanyRef: UpdateMyCompanyRef;

export function updateMyCompany(vars: UpdateMyCompanyVariables): MutationPromise<UpdateMyCompanyData, UpdateMyCompanyVariables>;
export function updateMyCompany(dc: DataConnect, vars: UpdateMyCompanyVariables): MutationPromise<UpdateMyCompanyData, UpdateMyCompanyVariables>;

interface SetMyCompanyPrimaryContactRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetMyCompanyPrimaryContactVariables): MutationRef<SetMyCompanyPrimaryContactData, SetMyCompanyPrimaryContactVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SetMyCompanyPrimaryContactVariables): MutationRef<SetMyCompanyPrimaryContactData, SetMyCompanyPrimaryContactVariables>;
  operationName: string;
}
export const setMyCompanyPrimaryContactRef: SetMyCompanyPrimaryContactRef;

export function setMyCompanyPrimaryContact(vars: SetMyCompanyPrimaryContactVariables): MutationPromise<SetMyCompanyPrimaryContactData, SetMyCompanyPrimaryContactVariables>;
export function setMyCompanyPrimaryContact(dc: DataConnect, vars: SetMyCompanyPrimaryContactVariables): MutationPromise<SetMyCompanyPrimaryContactData, SetMyCompanyPrimaryContactVariables>;

interface ClearMyCompanyPrimaryContactRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ClearMyCompanyPrimaryContactVariables): MutationRef<ClearMyCompanyPrimaryContactData, ClearMyCompanyPrimaryContactVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ClearMyCompanyPrimaryContactVariables): MutationRef<ClearMyCompanyPrimaryContactData, ClearMyCompanyPrimaryContactVariables>;
  operationName: string;
}
export const clearMyCompanyPrimaryContactRef: ClearMyCompanyPrimaryContactRef;

export function clearMyCompanyPrimaryContact(vars: ClearMyCompanyPrimaryContactVariables): MutationPromise<ClearMyCompanyPrimaryContactData, ClearMyCompanyPrimaryContactVariables>;
export function clearMyCompanyPrimaryContact(dc: DataConnect, vars: ClearMyCompanyPrimaryContactVariables): MutationPromise<ClearMyCompanyPrimaryContactData, ClearMyCompanyPrimaryContactVariables>;

interface DeleteMyCompanyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMyCompanyVariables): MutationRef<DeleteMyCompanyData, DeleteMyCompanyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteMyCompanyVariables): MutationRef<DeleteMyCompanyData, DeleteMyCompanyVariables>;
  operationName: string;
}
export const deleteMyCompanyRef: DeleteMyCompanyRef;

export function deleteMyCompany(vars: DeleteMyCompanyVariables): MutationPromise<DeleteMyCompanyData, DeleteMyCompanyVariables>;
export function deleteMyCompany(dc: DataConnect, vars: DeleteMyCompanyVariables): MutationPromise<DeleteMyCompanyData, DeleteMyCompanyVariables>;

interface CreateMyCompanyContactRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMyCompanyContactVariables): MutationRef<CreateMyCompanyContactData, CreateMyCompanyContactVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMyCompanyContactVariables): MutationRef<CreateMyCompanyContactData, CreateMyCompanyContactVariables>;
  operationName: string;
}
export const createMyCompanyContactRef: CreateMyCompanyContactRef;

export function createMyCompanyContact(vars: CreateMyCompanyContactVariables): MutationPromise<CreateMyCompanyContactData, CreateMyCompanyContactVariables>;
export function createMyCompanyContact(dc: DataConnect, vars: CreateMyCompanyContactVariables): MutationPromise<CreateMyCompanyContactData, CreateMyCompanyContactVariables>;

interface UpdateMyCompanyContactRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMyCompanyContactVariables): MutationRef<UpdateMyCompanyContactData, UpdateMyCompanyContactVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMyCompanyContactVariables): MutationRef<UpdateMyCompanyContactData, UpdateMyCompanyContactVariables>;
  operationName: string;
}
export const updateMyCompanyContactRef: UpdateMyCompanyContactRef;

export function updateMyCompanyContact(vars: UpdateMyCompanyContactVariables): MutationPromise<UpdateMyCompanyContactData, UpdateMyCompanyContactVariables>;
export function updateMyCompanyContact(dc: DataConnect, vars: UpdateMyCompanyContactVariables): MutationPromise<UpdateMyCompanyContactData, UpdateMyCompanyContactVariables>;

interface DeleteMyCompanyContactRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMyCompanyContactVariables): MutationRef<DeleteMyCompanyContactData, DeleteMyCompanyContactVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteMyCompanyContactVariables): MutationRef<DeleteMyCompanyContactData, DeleteMyCompanyContactVariables>;
  operationName: string;
}
export const deleteMyCompanyContactRef: DeleteMyCompanyContactRef;

export function deleteMyCompanyContact(vars: DeleteMyCompanyContactVariables): MutationPromise<DeleteMyCompanyContactData, DeleteMyCompanyContactVariables>;
export function deleteMyCompanyContact(dc: DataConnect, vars: DeleteMyCompanyContactVariables): MutationPromise<DeleteMyCompanyContactData, DeleteMyCompanyContactVariables>;

interface ListMyCompaniesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyCompaniesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyCompaniesData, undefined>;
  operationName: string;
}
export const listMyCompaniesRef: ListMyCompaniesRef;

export function listMyCompanies(options?: ExecuteQueryOptions): QueryPromise<ListMyCompaniesData, undefined>;
export function listMyCompanies(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyCompaniesData, undefined>;

interface GetMyCompanyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyCompanyVariables): QueryRef<GetMyCompanyData, GetMyCompanyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMyCompanyVariables): QueryRef<GetMyCompanyData, GetMyCompanyVariables>;
  operationName: string;
}
export const getMyCompanyRef: GetMyCompanyRef;

export function getMyCompany(vars: GetMyCompanyVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyCompanyData, GetMyCompanyVariables>;
export function getMyCompany(dc: DataConnect, vars: GetMyCompanyVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyCompanyData, GetMyCompanyVariables>;

interface ListMyCompanyContactsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMyCompanyContactsVariables): QueryRef<ListMyCompanyContactsData, ListMyCompanyContactsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListMyCompanyContactsVariables): QueryRef<ListMyCompanyContactsData, ListMyCompanyContactsVariables>;
  operationName: string;
}
export const listMyCompanyContactsRef: ListMyCompanyContactsRef;

export function listMyCompanyContacts(vars: ListMyCompanyContactsVariables, options?: ExecuteQueryOptions): QueryPromise<ListMyCompanyContactsData, ListMyCompanyContactsVariables>;
export function listMyCompanyContacts(dc: DataConnect, vars: ListMyCompanyContactsVariables, options?: ExecuteQueryOptions): QueryPromise<ListMyCompanyContactsData, ListMyCompanyContactsVariables>;

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

interface UpdateProjectQuestionnaireQuestionAnswerSourceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectQuestionnaireQuestionAnswerSourceVariables): MutationRef<UpdateProjectQuestionnaireQuestionAnswerSourceData, UpdateProjectQuestionnaireQuestionAnswerSourceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectQuestionnaireQuestionAnswerSourceVariables): MutationRef<UpdateProjectQuestionnaireQuestionAnswerSourceData, UpdateProjectQuestionnaireQuestionAnswerSourceVariables>;
  operationName: string;
}
export const updateProjectQuestionnaireQuestionAnswerSourceRef: UpdateProjectQuestionnaireQuestionAnswerSourceRef;

export function updateProjectQuestionnaireQuestionAnswerSource(vars: UpdateProjectQuestionnaireQuestionAnswerSourceVariables): MutationPromise<UpdateProjectQuestionnaireQuestionAnswerSourceData, UpdateProjectQuestionnaireQuestionAnswerSourceVariables>;
export function updateProjectQuestionnaireQuestionAnswerSource(dc: DataConnect, vars: UpdateProjectQuestionnaireQuestionAnswerSourceVariables): MutationPromise<UpdateProjectQuestionnaireQuestionAnswerSourceData, UpdateProjectQuestionnaireQuestionAnswerSourceVariables>;

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

interface ListProjectQuestionnairesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProjectQuestionnairesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListProjectQuestionnairesData, undefined>;
  operationName: string;
}
export const listProjectQuestionnairesRef: ListProjectQuestionnairesRef;

export function listProjectQuestionnaires(options?: ExecuteQueryOptions): QueryPromise<ListProjectQuestionnairesData, undefined>;
export function listProjectQuestionnaires(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListProjectQuestionnairesData, undefined>;

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

interface ListQuoteItemTemplatesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQuoteItemTemplatesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListQuoteItemTemplatesData, undefined>;
  operationName: string;
}
export const listQuoteItemTemplatesRef: ListQuoteItemTemplatesRef;

export function listQuoteItemTemplates(options?: ExecuteQueryOptions): QueryPromise<ListQuoteItemTemplatesData, undefined>;
export function listQuoteItemTemplates(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListQuoteItemTemplatesData, undefined>;

interface ListQuoteTemplatesForTeamRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQuoteTemplatesForTeamData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListQuoteTemplatesForTeamData, undefined>;
  operationName: string;
}
export const listQuoteTemplatesForTeamRef: ListQuoteTemplatesForTeamRef;

export function listQuoteTemplatesForTeam(options?: ExecuteQueryOptions): QueryPromise<ListQuoteTemplatesForTeamData, undefined>;
export function listQuoteTemplatesForTeam(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListQuoteTemplatesForTeamData, undefined>;

interface ListQuoteItemTemplateConfigsForQuoteTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListQuoteItemTemplateConfigsForQuoteTemplateVariables): QueryRef<ListQuoteItemTemplateConfigsForQuoteTemplateData, ListQuoteItemTemplateConfigsForQuoteTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListQuoteItemTemplateConfigsForQuoteTemplateVariables): QueryRef<ListQuoteItemTemplateConfigsForQuoteTemplateData, ListQuoteItemTemplateConfigsForQuoteTemplateVariables>;
  operationName: string;
}
export const listQuoteItemTemplateConfigsForQuoteTemplateRef: ListQuoteItemTemplateConfigsForQuoteTemplateRef;

export function listQuoteItemTemplateConfigsForQuoteTemplate(vars: ListQuoteItemTemplateConfigsForQuoteTemplateVariables, options?: ExecuteQueryOptions): QueryPromise<ListQuoteItemTemplateConfigsForQuoteTemplateData, ListQuoteItemTemplateConfigsForQuoteTemplateVariables>;
export function listQuoteItemTemplateConfigsForQuoteTemplate(dc: DataConnect, vars: ListQuoteItemTemplateConfigsForQuoteTemplateVariables, options?: ExecuteQueryOptions): QueryPromise<ListQuoteItemTemplateConfigsForQuoteTemplateData, ListQuoteItemTemplateConfigsForQuoteTemplateVariables>;

interface GetMyTeamRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyTeamData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyTeamData, undefined>;
  operationName: string;
}
export const getMyTeamRef: GetMyTeamRef;

export function getMyTeam(options?: ExecuteQueryOptions): QueryPromise<GetMyTeamData, undefined>;
export function getMyTeam(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyTeamData, undefined>;

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

interface UpsertMyUserSignatureRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpsertMyUserSignatureVariables): MutationRef<UpsertMyUserSignatureData, UpsertMyUserSignatureVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpsertMyUserSignatureVariables): MutationRef<UpsertMyUserSignatureData, UpsertMyUserSignatureVariables>;
  operationName: string;
}
export const upsertMyUserSignatureRef: UpsertMyUserSignatureRef;

export function upsertMyUserSignature(vars?: UpsertMyUserSignatureVariables): MutationPromise<UpsertMyUserSignatureData, UpsertMyUserSignatureVariables>;
export function upsertMyUserSignature(dc: DataConnect, vars?: UpsertMyUserSignatureVariables): MutationPromise<UpsertMyUserSignatureData, UpsertMyUserSignatureVariables>;

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

interface GetMyUserSignatureRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyUserSignatureData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyUserSignatureData, undefined>;
  operationName: string;
}
export const getMyUserSignatureRef: GetMyUserSignatureRef;

export function getMyUserSignature(options?: ExecuteQueryOptions): QueryPromise<GetMyUserSignatureData, undefined>;
export function getMyUserSignature(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyUserSignatureData, undefined>;

