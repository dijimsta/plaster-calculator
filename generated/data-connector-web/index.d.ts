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

export interface CreateAccountContactData {
  accountContact_insert: AccountContact_Key;
}

export interface CreateAccountContactVariables {
  id: UUIDString;
  accountId: UUIDString;
  name: string;
  email?: string | null;
  phoneNumber?: string | null;
  role?: string | null;
}

export interface CreateAccountData {
  account_insert: Account_Key;
}

export interface CreateAccountVariables {
  id: UUIDString;
  ownerId: string;
  companyName: string;
  businessNumber?: string | null;
  phoneNumber?: string | null;
}

export interface CreateFloorplanPageData {
  floorplanPage_insert: FloorplanPage_Key;
}

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

export interface CreateProjectFromUploadData {
  project_insert: Project_Key;
}

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

export interface CreateQuantitySourceData {
  quantitySource_insert: QuantitySource_Key;
}

export interface CreateQuantitySourceVariables {
  id: UUIDString;
  measurementSource: string;
  measurementPlasterType?: string | null;
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

export interface CreateQuoteData {
  quote_insert: Quote_Key;
}

export interface CreateQuoteItemData {
  quoteItem_insert: QuoteItem_Key;
}

export interface CreateQuoteItemTemplateData {
  quoteItemTemplate_insert: QuoteItemTemplate_Key;
}

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

export interface CreateQuoteVariables {
  id: UUIDString;
  ownerId: string;
  projectId: UUIDString;
  supplierId?: UUIDString | null;
  status: string;
}

export interface CreateReminderData {
  reminder_insert: Reminder_Key;
}

export interface CreateReminderVariables {
  id: UUIDString;
  ownerId: string;
  projectId: UUIDString;
  accountId?: UUIDString | null;
  name: string;
  status: string;
  dueAt: TimestampString;
}

export interface CreateSupplierData {
  supplier_insert: Supplier_Key;
}

export interface CreateSupplierVariables {
  id: UUIDString;
  ownerId: string;
  name: string;
}

export interface DeleteAccountContactData {
  accountContact_delete?: AccountContact_Key | null;
}

export interface DeleteAccountContactVariables {
  id: UUIDString;
}

export interface DeleteAccountContactsData {
  accountContact_deleteMany: number;
}

export interface DeleteAccountContactsVariables {
  accountId: UUIDString;
}

export interface DeleteAccountData {
  account_delete?: Account_Key | null;
}

export interface DeleteAccountVariables {
  id: UUIDString;
}

export interface DeleteFloorplanPagesData {
  floorplanPage_deleteMany: number;
}

export interface DeleteFloorplanPagesVariables {
  projectId: UUIDString;
}

export interface DeleteProjectData {
  project_delete?: Project_Key | null;
}

export interface DeleteProjectVariables {
  id: UUIDString;
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

export interface DeleteQuoteItemTemplateData {
  quoteItemTemplate_delete?: QuoteItemTemplate_Key | null;
}

export interface DeleteQuoteItemTemplateVariables {
  id: UUIDString;
}

export interface DeleteQuoteItemsData {
  quoteItem_deleteMany: number;
}

export interface DeleteQuoteItemsVariables {
  quoteId: UUIDString;
}

export interface DeleteSupplierData {
  supplier_delete?: Supplier_Key | null;
}

export interface DeleteSupplierQuoteItemPriceData {
  supplierQuoteItemPrice_delete?: SupplierQuoteItemPrice_Key | null;
}

export interface DeleteSupplierQuoteItemPriceVariables {
  supplierId: UUIDString;
  templateId: UUIDString;
}

export interface DeleteSupplierVariables {
  id: UUIDString;
}

export interface FloorplanPage_Key {
  id: UUIDString;
  __typename?: 'FloorplanPage_Key';
}

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

export interface GetAccountByIdVariables {
  id: UUIDString;
}

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

export interface GetAccountContactByIdVariables {
  accountId: UUIDString;
  contactId: UUIDString;
}

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

export interface GetFloorplanPageByIdVariables {
  projectId: UUIDString;
  pageId: UUIDString;
}

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

export interface GetProjectByIdVariables {
  id: UUIDString;
}

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

export interface GetProjectDetailsByIdVariables {
  id: UUIDString;
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

export interface GetReminderByIdVariables {
  id: UUIDString;
}

export interface GetUserSettingsData {
  userSettings?: {
    ownerId: string;
    quoteFollowUpEnabled: boolean;
    quoteFollowUpDays: number;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & UserSettings_Key;
}

export interface GetUserSettingsVariables {
  ownerId: string;
}

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

export interface ListAccountContactsByAccountIdVariables {
  accountId: UUIDString;
}

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

export interface ListAccountsByOwnerVariables {
  ownerId: string;
}

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

export interface ListDueRemindersVariables {
  ownerId: string;
}

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

export interface ListProjectRemindersVariables {
  projectId: UUIDString;
}

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

export interface ListProjectsByAccountVariables {
  accountId: UUIDString;
}

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

export interface ListProjectsByOwnerAndSalesStatusVariables {
  ownerId: string;
  salesStatus: string;
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

export interface RenameProjectData {
  project_update?: Project_Key | null;
}

export interface RenameProjectVariables {
  id: UUIDString;
  name: string;
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

export interface TouchProjectData {
  project_update?: Project_Key | null;
}

export interface TouchProjectVariables {
  id: UUIDString;
  status?: string | null;
  processingError?: string | null;
}

export interface UpdateAccountContactData {
  accountContact_update?: AccountContact_Key | null;
}

export interface UpdateAccountContactVariables {
  id: UUIDString;
  name?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  role?: string | null;
}

export interface UpdateAccountData {
  account_update?: Account_Key | null;
}

export interface UpdateAccountVariables {
  id: UUIDString;
  companyName?: string | null;
  businessNumber?: string | null;
  phoneNumber?: string | null;
  primaryContactId?: UUIDString | null;
}

export interface UpdateFloorplanPageAnalysisData {
  floorplanPage_update?: FloorplanPage_Key | null;
}

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

export interface UpdateFloorplanPageData {
  floorplanPage_update?: FloorplanPage_Key | null;
}

export interface UpdateFloorplanPageVariables {
  id: UUIDString;
  overlayJson?: string | null;
  scaleMmPerPx?: number | null;
  ceilingHeightMm?: number | null;
  referencePointsJson?: string | null;
  referenceLengthMm?: number | null;
}

export interface UpdateFloorplanPagesData {
  floorplanPage_updateMany: number;
}

export interface UpdateFloorplanPagesVariables {
  projectId: UUIDString;
  scaleMmPerPx?: number | null;
  ceilingHeightMm?: number | null;
}

export interface UpdateProjectData {
  project_update?: Project_Key | null;
}

export interface UpdateProjectVariables {
  id: UUIDString;
  name?: string | null;
  accountId?: UUIDString | null;
  address?: string | null;
  salesStatus?: string | null;
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

export interface UpdateQuoteData {
  quote_update?: Quote_Key | null;
}

export interface UpdateQuoteItemData {
  quoteItem_update?: QuoteItem_Key | null;
}

export interface UpdateQuoteItemTemplateData {
  quoteItemTemplate_update?: QuoteItemTemplate_Key | null;
}

export interface UpdateQuoteItemTemplateVariables {
  id: UUIDString;
  name?: string | null;
  hasKeywords?: boolean | null;
  keywords?: string[] | null;
  quantitySourceId?: UUIDString | null;
  sortOrder?: number | null;
}

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

export interface UpdateQuoteVariables {
  id: UUIDString;
  supplierId?: UUIDString | null;
  status?: string | null;
}

export interface UpdateReminderData {
  reminder_update?: Reminder_Key | null;
}

export interface UpdateReminderVariables {
  id: UUIDString;
  accountId?: UUIDString | null;
  name?: string | null;
  status?: string | null;
  dueAt?: TimestampString | null;
  completedAt?: TimestampString | null;
}

export interface UpdateSupplierData {
  supplier_update?: Supplier_Key | null;
}

export interface UpdateSupplierVariables {
  id: UUIDString;
  name?: string | null;
}

export interface UpsertQuoteItemTemplateConfigData {
  quoteItemTemplateConfig_upsert: QuoteItemTemplateConfig_Key;
}

export interface UpsertQuoteItemTemplateConfigVariables {
  ownerId: string;
  templateId: UUIDString;
  enabled: boolean;
  unitPriceCents: number;
  materialUnitPriceCents: number;
  labourUnitPriceCents: number;
}

export interface UpsertSupplierQuoteItemPriceData {
  supplierQuoteItemPrice_upsert: SupplierQuoteItemPrice_Key;
}

export interface UpsertSupplierQuoteItemPriceVariables {
  ownerId: string;
  supplierId: UUIDString;
  templateId: UUIDString;
  materialUnitPriceCents: number;
}

export interface UpsertUserSettingsData {
  userSettings_upsert: UserSettings_Key;
}

export interface UpsertUserSettingsVariables {
  ownerId: string;
  quoteFollowUpEnabled: boolean;
  quoteFollowUpDays: number;
}

export interface UserSettings_Key {
  ownerId: string;
  __typename?: 'UserSettings_Key';
}

interface CreateAccountRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAccountVariables): MutationRef<CreateAccountData, CreateAccountVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAccountVariables): MutationRef<CreateAccountData, CreateAccountVariables>;
  operationName: string;
}
export const createAccountRef: CreateAccountRef;

export function createAccount(vars: CreateAccountVariables): MutationPromise<CreateAccountData, CreateAccountVariables>;
export function createAccount(dc: DataConnect, vars: CreateAccountVariables): MutationPromise<CreateAccountData, CreateAccountVariables>;

interface UpdateAccountRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAccountVariables): MutationRef<UpdateAccountData, UpdateAccountVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAccountVariables): MutationRef<UpdateAccountData, UpdateAccountVariables>;
  operationName: string;
}
export const updateAccountRef: UpdateAccountRef;

export function updateAccount(vars: UpdateAccountVariables): MutationPromise<UpdateAccountData, UpdateAccountVariables>;
export function updateAccount(dc: DataConnect, vars: UpdateAccountVariables): MutationPromise<UpdateAccountData, UpdateAccountVariables>;

interface DeleteAccountContactsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAccountContactsVariables): MutationRef<DeleteAccountContactsData, DeleteAccountContactsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteAccountContactsVariables): MutationRef<DeleteAccountContactsData, DeleteAccountContactsVariables>;
  operationName: string;
}
export const deleteAccountContactsRef: DeleteAccountContactsRef;

export function deleteAccountContacts(vars: DeleteAccountContactsVariables): MutationPromise<DeleteAccountContactsData, DeleteAccountContactsVariables>;
export function deleteAccountContacts(dc: DataConnect, vars: DeleteAccountContactsVariables): MutationPromise<DeleteAccountContactsData, DeleteAccountContactsVariables>;

interface DeleteAccountRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAccountVariables): MutationRef<DeleteAccountData, DeleteAccountVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteAccountVariables): MutationRef<DeleteAccountData, DeleteAccountVariables>;
  operationName: string;
}
export const deleteAccountRef: DeleteAccountRef;

export function deleteAccount(vars: DeleteAccountVariables): MutationPromise<DeleteAccountData, DeleteAccountVariables>;
export function deleteAccount(dc: DataConnect, vars: DeleteAccountVariables): MutationPromise<DeleteAccountData, DeleteAccountVariables>;

interface CreateAccountContactRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAccountContactVariables): MutationRef<CreateAccountContactData, CreateAccountContactVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAccountContactVariables): MutationRef<CreateAccountContactData, CreateAccountContactVariables>;
  operationName: string;
}
export const createAccountContactRef: CreateAccountContactRef;

export function createAccountContact(vars: CreateAccountContactVariables): MutationPromise<CreateAccountContactData, CreateAccountContactVariables>;
export function createAccountContact(dc: DataConnect, vars: CreateAccountContactVariables): MutationPromise<CreateAccountContactData, CreateAccountContactVariables>;

interface UpdateAccountContactRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAccountContactVariables): MutationRef<UpdateAccountContactData, UpdateAccountContactVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAccountContactVariables): MutationRef<UpdateAccountContactData, UpdateAccountContactVariables>;
  operationName: string;
}
export const updateAccountContactRef: UpdateAccountContactRef;

export function updateAccountContact(vars: UpdateAccountContactVariables): MutationPromise<UpdateAccountContactData, UpdateAccountContactVariables>;
export function updateAccountContact(dc: DataConnect, vars: UpdateAccountContactVariables): MutationPromise<UpdateAccountContactData, UpdateAccountContactVariables>;

interface DeleteAccountContactRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAccountContactVariables): MutationRef<DeleteAccountContactData, DeleteAccountContactVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteAccountContactVariables): MutationRef<DeleteAccountContactData, DeleteAccountContactVariables>;
  operationName: string;
}
export const deleteAccountContactRef: DeleteAccountContactRef;

export function deleteAccountContact(vars: DeleteAccountContactVariables): MutationPromise<DeleteAccountContactData, DeleteAccountContactVariables>;
export function deleteAccountContact(dc: DataConnect, vars: DeleteAccountContactVariables): MutationPromise<DeleteAccountContactData, DeleteAccountContactVariables>;

interface ListAccountsByOwnerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAccountsByOwnerVariables): QueryRef<ListAccountsByOwnerData, ListAccountsByOwnerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListAccountsByOwnerVariables): QueryRef<ListAccountsByOwnerData, ListAccountsByOwnerVariables>;
  operationName: string;
}
export const listAccountsByOwnerRef: ListAccountsByOwnerRef;

export function listAccountsByOwner(vars: ListAccountsByOwnerVariables, options?: ExecuteQueryOptions): QueryPromise<ListAccountsByOwnerData, ListAccountsByOwnerVariables>;
export function listAccountsByOwner(dc: DataConnect, vars: ListAccountsByOwnerVariables, options?: ExecuteQueryOptions): QueryPromise<ListAccountsByOwnerData, ListAccountsByOwnerVariables>;

interface GetAccountByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAccountByIdVariables): QueryRef<GetAccountByIdData, GetAccountByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAccountByIdVariables): QueryRef<GetAccountByIdData, GetAccountByIdVariables>;
  operationName: string;
}
export const getAccountByIdRef: GetAccountByIdRef;

export function getAccountById(vars: GetAccountByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetAccountByIdData, GetAccountByIdVariables>;
export function getAccountById(dc: DataConnect, vars: GetAccountByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetAccountByIdData, GetAccountByIdVariables>;

interface ListAccountContactsByAccountIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAccountContactsByAccountIdVariables): QueryRef<ListAccountContactsByAccountIdData, ListAccountContactsByAccountIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListAccountContactsByAccountIdVariables): QueryRef<ListAccountContactsByAccountIdData, ListAccountContactsByAccountIdVariables>;
  operationName: string;
}
export const listAccountContactsByAccountIdRef: ListAccountContactsByAccountIdRef;

export function listAccountContactsByAccountId(vars: ListAccountContactsByAccountIdVariables, options?: ExecuteQueryOptions): QueryPromise<ListAccountContactsByAccountIdData, ListAccountContactsByAccountIdVariables>;
export function listAccountContactsByAccountId(dc: DataConnect, vars: ListAccountContactsByAccountIdVariables, options?: ExecuteQueryOptions): QueryPromise<ListAccountContactsByAccountIdData, ListAccountContactsByAccountIdVariables>;

interface GetAccountContactByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAccountContactByIdVariables): QueryRef<GetAccountContactByIdData, GetAccountContactByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAccountContactByIdVariables): QueryRef<GetAccountContactByIdData, GetAccountContactByIdVariables>;
  operationName: string;
}
export const getAccountContactByIdRef: GetAccountContactByIdRef;

export function getAccountContactById(vars: GetAccountContactByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetAccountContactByIdData, GetAccountContactByIdVariables>;
export function getAccountContactById(dc: DataConnect, vars: GetAccountContactByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetAccountContactByIdData, GetAccountContactByIdVariables>;

interface CreateProjectFromUploadRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectFromUploadVariables): MutationRef<CreateProjectFromUploadData, CreateProjectFromUploadVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProjectFromUploadVariables): MutationRef<CreateProjectFromUploadData, CreateProjectFromUploadVariables>;
  operationName: string;
}
export const createProjectFromUploadRef: CreateProjectFromUploadRef;

export function createProjectFromUpload(vars: CreateProjectFromUploadVariables): MutationPromise<CreateProjectFromUploadData, CreateProjectFromUploadVariables>;
export function createProjectFromUpload(dc: DataConnect, vars: CreateProjectFromUploadVariables): MutationPromise<CreateProjectFromUploadData, CreateProjectFromUploadVariables>;

interface UpdateProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
  operationName: string;
}
export const updateProjectRef: UpdateProjectRef;

export function updateProject(vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;
export function updateProject(dc: DataConnect, vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;

interface RenameProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RenameProjectVariables): MutationRef<RenameProjectData, RenameProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RenameProjectVariables): MutationRef<RenameProjectData, RenameProjectVariables>;
  operationName: string;
}
export const renameProjectRef: RenameProjectRef;

export function renameProject(vars: RenameProjectVariables): MutationPromise<RenameProjectData, RenameProjectVariables>;
export function renameProject(dc: DataConnect, vars: RenameProjectVariables): MutationPromise<RenameProjectData, RenameProjectVariables>;

interface TouchProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: TouchProjectVariables): MutationRef<TouchProjectData, TouchProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: TouchProjectVariables): MutationRef<TouchProjectData, TouchProjectVariables>;
  operationName: string;
}
export const touchProjectRef: TouchProjectRef;

export function touchProject(vars: TouchProjectVariables): MutationPromise<TouchProjectData, TouchProjectVariables>;
export function touchProject(dc: DataConnect, vars: TouchProjectVariables): MutationPromise<TouchProjectData, TouchProjectVariables>;

interface DeleteFloorplanPagesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFloorplanPagesVariables): MutationRef<DeleteFloorplanPagesData, DeleteFloorplanPagesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteFloorplanPagesVariables): MutationRef<DeleteFloorplanPagesData, DeleteFloorplanPagesVariables>;
  operationName: string;
}
export const deleteFloorplanPagesRef: DeleteFloorplanPagesRef;

export function deleteFloorplanPages(vars: DeleteFloorplanPagesVariables): MutationPromise<DeleteFloorplanPagesData, DeleteFloorplanPagesVariables>;
export function deleteFloorplanPages(dc: DataConnect, vars: DeleteFloorplanPagesVariables): MutationPromise<DeleteFloorplanPagesData, DeleteFloorplanPagesVariables>;

interface DeleteProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
  operationName: string;
}
export const deleteProjectRef: DeleteProjectRef;

export function deleteProject(vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;
export function deleteProject(dc: DataConnect, vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface CreateFloorplanPageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFloorplanPageVariables): MutationRef<CreateFloorplanPageData, CreateFloorplanPageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateFloorplanPageVariables): MutationRef<CreateFloorplanPageData, CreateFloorplanPageVariables>;
  operationName: string;
}
export const createFloorplanPageRef: CreateFloorplanPageRef;

export function createFloorplanPage(vars: CreateFloorplanPageVariables): MutationPromise<CreateFloorplanPageData, CreateFloorplanPageVariables>;
export function createFloorplanPage(dc: DataConnect, vars: CreateFloorplanPageVariables): MutationPromise<CreateFloorplanPageData, CreateFloorplanPageVariables>;

interface UpdateFloorplanPageAnalysisRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFloorplanPageAnalysisVariables): MutationRef<UpdateFloorplanPageAnalysisData, UpdateFloorplanPageAnalysisVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateFloorplanPageAnalysisVariables): MutationRef<UpdateFloorplanPageAnalysisData, UpdateFloorplanPageAnalysisVariables>;
  operationName: string;
}
export const updateFloorplanPageAnalysisRef: UpdateFloorplanPageAnalysisRef;

export function updateFloorplanPageAnalysis(vars: UpdateFloorplanPageAnalysisVariables): MutationPromise<UpdateFloorplanPageAnalysisData, UpdateFloorplanPageAnalysisVariables>;
export function updateFloorplanPageAnalysis(dc: DataConnect, vars: UpdateFloorplanPageAnalysisVariables): MutationPromise<UpdateFloorplanPageAnalysisData, UpdateFloorplanPageAnalysisVariables>;

interface UpdateFloorplanPageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFloorplanPageVariables): MutationRef<UpdateFloorplanPageData, UpdateFloorplanPageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateFloorplanPageVariables): MutationRef<UpdateFloorplanPageData, UpdateFloorplanPageVariables>;
  operationName: string;
}
export const updateFloorplanPageRef: UpdateFloorplanPageRef;

export function updateFloorplanPage(vars: UpdateFloorplanPageVariables): MutationPromise<UpdateFloorplanPageData, UpdateFloorplanPageVariables>;
export function updateFloorplanPage(dc: DataConnect, vars: UpdateFloorplanPageVariables): MutationPromise<UpdateFloorplanPageData, UpdateFloorplanPageVariables>;

interface UpdateFloorplanPagesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFloorplanPagesVariables): MutationRef<UpdateFloorplanPagesData, UpdateFloorplanPagesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateFloorplanPagesVariables): MutationRef<UpdateFloorplanPagesData, UpdateFloorplanPagesVariables>;
  operationName: string;
}
export const updateFloorplanPagesRef: UpdateFloorplanPagesRef;

export function updateFloorplanPages(vars: UpdateFloorplanPagesVariables): MutationPromise<UpdateFloorplanPagesData, UpdateFloorplanPagesVariables>;
export function updateFloorplanPages(dc: DataConnect, vars: UpdateFloorplanPagesVariables): MutationPromise<UpdateFloorplanPagesData, UpdateFloorplanPagesVariables>;

interface ListProjectsByOwnerAndSalesStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectsByOwnerAndSalesStatusVariables): QueryRef<ListProjectsByOwnerAndSalesStatusData, ListProjectsByOwnerAndSalesStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListProjectsByOwnerAndSalesStatusVariables): QueryRef<ListProjectsByOwnerAndSalesStatusData, ListProjectsByOwnerAndSalesStatusVariables>;
  operationName: string;
}
export const listProjectsByOwnerAndSalesStatusRef: ListProjectsByOwnerAndSalesStatusRef;

export function listProjectsByOwnerAndSalesStatus(vars: ListProjectsByOwnerAndSalesStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectsByOwnerAndSalesStatusData, ListProjectsByOwnerAndSalesStatusVariables>;
export function listProjectsByOwnerAndSalesStatus(dc: DataConnect, vars: ListProjectsByOwnerAndSalesStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectsByOwnerAndSalesStatusData, ListProjectsByOwnerAndSalesStatusVariables>;

interface ListProjectsByAccountRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectsByAccountVariables): QueryRef<ListProjectsByAccountData, ListProjectsByAccountVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListProjectsByAccountVariables): QueryRef<ListProjectsByAccountData, ListProjectsByAccountVariables>;
  operationName: string;
}
export const listProjectsByAccountRef: ListProjectsByAccountRef;

export function listProjectsByAccount(vars: ListProjectsByAccountVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectsByAccountData, ListProjectsByAccountVariables>;
export function listProjectsByAccount(dc: DataConnect, vars: ListProjectsByAccountVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectsByAccountData, ListProjectsByAccountVariables>;

interface GetProjectDetailsByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProjectDetailsByIdVariables): QueryRef<GetProjectDetailsByIdData, GetProjectDetailsByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetProjectDetailsByIdVariables): QueryRef<GetProjectDetailsByIdData, GetProjectDetailsByIdVariables>;
  operationName: string;
}
export const getProjectDetailsByIdRef: GetProjectDetailsByIdRef;

export function getProjectDetailsById(vars: GetProjectDetailsByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectDetailsByIdData, GetProjectDetailsByIdVariables>;
export function getProjectDetailsById(dc: DataConnect, vars: GetProjectDetailsByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectDetailsByIdData, GetProjectDetailsByIdVariables>;

interface GetProjectByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProjectByIdVariables): QueryRef<GetProjectByIdData, GetProjectByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetProjectByIdVariables): QueryRef<GetProjectByIdData, GetProjectByIdVariables>;
  operationName: string;
}
export const getProjectByIdRef: GetProjectByIdRef;

export function getProjectById(vars: GetProjectByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectByIdData, GetProjectByIdVariables>;
export function getProjectById(dc: DataConnect, vars: GetProjectByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectByIdData, GetProjectByIdVariables>;

interface GetFloorplanPageByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFloorplanPageByIdVariables): QueryRef<GetFloorplanPageByIdData, GetFloorplanPageByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetFloorplanPageByIdVariables): QueryRef<GetFloorplanPageByIdData, GetFloorplanPageByIdVariables>;
  operationName: string;
}
export const getFloorplanPageByIdRef: GetFloorplanPageByIdRef;

export function getFloorplanPageById(vars: GetFloorplanPageByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetFloorplanPageByIdData, GetFloorplanPageByIdVariables>;
export function getFloorplanPageById(dc: DataConnect, vars: GetFloorplanPageByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetFloorplanPageByIdData, GetFloorplanPageByIdVariables>;

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

interface CreateProjectQuestionnaireRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectQuestionnaireVariables): MutationRef<CreateProjectQuestionnaireData, CreateProjectQuestionnaireVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProjectQuestionnaireVariables): MutationRef<CreateProjectQuestionnaireData, CreateProjectQuestionnaireVariables>;
  operationName: string;
}
export const createProjectQuestionnaireRef: CreateProjectQuestionnaireRef;

export function createProjectQuestionnaire(vars: CreateProjectQuestionnaireVariables): MutationPromise<CreateProjectQuestionnaireData, CreateProjectQuestionnaireVariables>;
export function createProjectQuestionnaire(dc: DataConnect, vars: CreateProjectQuestionnaireVariables): MutationPromise<CreateProjectQuestionnaireData, CreateProjectQuestionnaireVariables>;

interface CreateProjectQuestionnaireAnswerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectQuestionnaireAnswerVariables): MutationRef<CreateProjectQuestionnaireAnswerData, CreateProjectQuestionnaireAnswerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProjectQuestionnaireAnswerVariables): MutationRef<CreateProjectQuestionnaireAnswerData, CreateProjectQuestionnaireAnswerVariables>;
  operationName: string;
}
export const createProjectQuestionnaireAnswerRef: CreateProjectQuestionnaireAnswerRef;

export function createProjectQuestionnaireAnswer(vars: CreateProjectQuestionnaireAnswerVariables): MutationPromise<CreateProjectQuestionnaireAnswerData, CreateProjectQuestionnaireAnswerVariables>;
export function createProjectQuestionnaireAnswer(dc: DataConnect, vars: CreateProjectQuestionnaireAnswerVariables): MutationPromise<CreateProjectQuestionnaireAnswerData, CreateProjectQuestionnaireAnswerVariables>;

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

interface CreateQuantitySourceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuantitySourceVariables): MutationRef<CreateQuantitySourceData, CreateQuantitySourceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuantitySourceVariables): MutationRef<CreateQuantitySourceData, CreateQuantitySourceVariables>;
  operationName: string;
}
export const createQuantitySourceRef: CreateQuantitySourceRef;

export function createQuantitySource(vars: CreateQuantitySourceVariables): MutationPromise<CreateQuantitySourceData, CreateQuantitySourceVariables>;
export function createQuantitySource(dc: DataConnect, vars: CreateQuantitySourceVariables): MutationPromise<CreateQuantitySourceData, CreateQuantitySourceVariables>;

interface CreateQuoteItemTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuoteItemTemplateVariables): MutationRef<CreateQuoteItemTemplateData, CreateQuoteItemTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuoteItemTemplateVariables): MutationRef<CreateQuoteItemTemplateData, CreateQuoteItemTemplateVariables>;
  operationName: string;
}
export const createQuoteItemTemplateRef: CreateQuoteItemTemplateRef;

export function createQuoteItemTemplate(vars: CreateQuoteItemTemplateVariables): MutationPromise<CreateQuoteItemTemplateData, CreateQuoteItemTemplateVariables>;
export function createQuoteItemTemplate(dc: DataConnect, vars: CreateQuoteItemTemplateVariables): MutationPromise<CreateQuoteItemTemplateData, CreateQuoteItemTemplateVariables>;

interface UpdateQuoteItemTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuoteItemTemplateVariables): MutationRef<UpdateQuoteItemTemplateData, UpdateQuoteItemTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateQuoteItemTemplateVariables): MutationRef<UpdateQuoteItemTemplateData, UpdateQuoteItemTemplateVariables>;
  operationName: string;
}
export const updateQuoteItemTemplateRef: UpdateQuoteItemTemplateRef;

export function updateQuoteItemTemplate(vars: UpdateQuoteItemTemplateVariables): MutationPromise<UpdateQuoteItemTemplateData, UpdateQuoteItemTemplateVariables>;
export function updateQuoteItemTemplate(dc: DataConnect, vars: UpdateQuoteItemTemplateVariables): MutationPromise<UpdateQuoteItemTemplateData, UpdateQuoteItemTemplateVariables>;

interface DeleteQuoteItemTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQuoteItemTemplateVariables): MutationRef<DeleteQuoteItemTemplateData, DeleteQuoteItemTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteQuoteItemTemplateVariables): MutationRef<DeleteQuoteItemTemplateData, DeleteQuoteItemTemplateVariables>;
  operationName: string;
}
export const deleteQuoteItemTemplateRef: DeleteQuoteItemTemplateRef;

export function deleteQuoteItemTemplate(vars: DeleteQuoteItemTemplateVariables): MutationPromise<DeleteQuoteItemTemplateData, DeleteQuoteItemTemplateVariables>;
export function deleteQuoteItemTemplate(dc: DataConnect, vars: DeleteQuoteItemTemplateVariables): MutationPromise<DeleteQuoteItemTemplateData, DeleteQuoteItemTemplateVariables>;

interface UpsertQuoteItemTemplateConfigRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertQuoteItemTemplateConfigVariables): MutationRef<UpsertQuoteItemTemplateConfigData, UpsertQuoteItemTemplateConfigVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertQuoteItemTemplateConfigVariables): MutationRef<UpsertQuoteItemTemplateConfigData, UpsertQuoteItemTemplateConfigVariables>;
  operationName: string;
}
export const upsertQuoteItemTemplateConfigRef: UpsertQuoteItemTemplateConfigRef;

export function upsertQuoteItemTemplateConfig(vars: UpsertQuoteItemTemplateConfigVariables): MutationPromise<UpsertQuoteItemTemplateConfigData, UpsertQuoteItemTemplateConfigVariables>;
export function upsertQuoteItemTemplateConfig(dc: DataConnect, vars: UpsertQuoteItemTemplateConfigVariables): MutationPromise<UpsertQuoteItemTemplateConfigData, UpsertQuoteItemTemplateConfigVariables>;

interface CreateSupplierRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSupplierVariables): MutationRef<CreateSupplierData, CreateSupplierVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateSupplierVariables): MutationRef<CreateSupplierData, CreateSupplierVariables>;
  operationName: string;
}
export const createSupplierRef: CreateSupplierRef;

export function createSupplier(vars: CreateSupplierVariables): MutationPromise<CreateSupplierData, CreateSupplierVariables>;
export function createSupplier(dc: DataConnect, vars: CreateSupplierVariables): MutationPromise<CreateSupplierData, CreateSupplierVariables>;

interface UpdateSupplierRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSupplierVariables): MutationRef<UpdateSupplierData, UpdateSupplierVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateSupplierVariables): MutationRef<UpdateSupplierData, UpdateSupplierVariables>;
  operationName: string;
}
export const updateSupplierRef: UpdateSupplierRef;

export function updateSupplier(vars: UpdateSupplierVariables): MutationPromise<UpdateSupplierData, UpdateSupplierVariables>;
export function updateSupplier(dc: DataConnect, vars: UpdateSupplierVariables): MutationPromise<UpdateSupplierData, UpdateSupplierVariables>;

interface DeleteSupplierRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSupplierVariables): MutationRef<DeleteSupplierData, DeleteSupplierVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteSupplierVariables): MutationRef<DeleteSupplierData, DeleteSupplierVariables>;
  operationName: string;
}
export const deleteSupplierRef: DeleteSupplierRef;

export function deleteSupplier(vars: DeleteSupplierVariables): MutationPromise<DeleteSupplierData, DeleteSupplierVariables>;
export function deleteSupplier(dc: DataConnect, vars: DeleteSupplierVariables): MutationPromise<DeleteSupplierData, DeleteSupplierVariables>;

interface UpsertSupplierQuoteItemPriceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertSupplierQuoteItemPriceVariables): MutationRef<UpsertSupplierQuoteItemPriceData, UpsertSupplierQuoteItemPriceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertSupplierQuoteItemPriceVariables): MutationRef<UpsertSupplierQuoteItemPriceData, UpsertSupplierQuoteItemPriceVariables>;
  operationName: string;
}
export const upsertSupplierQuoteItemPriceRef: UpsertSupplierQuoteItemPriceRef;

export function upsertSupplierQuoteItemPrice(vars: UpsertSupplierQuoteItemPriceVariables): MutationPromise<UpsertSupplierQuoteItemPriceData, UpsertSupplierQuoteItemPriceVariables>;
export function upsertSupplierQuoteItemPrice(dc: DataConnect, vars: UpsertSupplierQuoteItemPriceVariables): MutationPromise<UpsertSupplierQuoteItemPriceData, UpsertSupplierQuoteItemPriceVariables>;

interface DeleteSupplierQuoteItemPriceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSupplierQuoteItemPriceVariables): MutationRef<DeleteSupplierQuoteItemPriceData, DeleteSupplierQuoteItemPriceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteSupplierQuoteItemPriceVariables): MutationRef<DeleteSupplierQuoteItemPriceData, DeleteSupplierQuoteItemPriceVariables>;
  operationName: string;
}
export const deleteSupplierQuoteItemPriceRef: DeleteSupplierQuoteItemPriceRef;

export function deleteSupplierQuoteItemPrice(vars: DeleteSupplierQuoteItemPriceVariables): MutationPromise<DeleteSupplierQuoteItemPriceData, DeleteSupplierQuoteItemPriceVariables>;
export function deleteSupplierQuoteItemPrice(dc: DataConnect, vars: DeleteSupplierQuoteItemPriceVariables): MutationPromise<DeleteSupplierQuoteItemPriceData, DeleteSupplierQuoteItemPriceVariables>;

interface CreateQuoteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuoteVariables): MutationRef<CreateQuoteData, CreateQuoteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuoteVariables): MutationRef<CreateQuoteData, CreateQuoteVariables>;
  operationName: string;
}
export const createQuoteRef: CreateQuoteRef;

export function createQuote(vars: CreateQuoteVariables): MutationPromise<CreateQuoteData, CreateQuoteVariables>;
export function createQuote(dc: DataConnect, vars: CreateQuoteVariables): MutationPromise<CreateQuoteData, CreateQuoteVariables>;

interface UpdateQuoteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuoteVariables): MutationRef<UpdateQuoteData, UpdateQuoteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateQuoteVariables): MutationRef<UpdateQuoteData, UpdateQuoteVariables>;
  operationName: string;
}
export const updateQuoteRef: UpdateQuoteRef;

export function updateQuote(vars: UpdateQuoteVariables): MutationPromise<UpdateQuoteData, UpdateQuoteVariables>;
export function updateQuote(dc: DataConnect, vars: UpdateQuoteVariables): MutationPromise<UpdateQuoteData, UpdateQuoteVariables>;

interface DeleteQuoteItemsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQuoteItemsVariables): MutationRef<DeleteQuoteItemsData, DeleteQuoteItemsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteQuoteItemsVariables): MutationRef<DeleteQuoteItemsData, DeleteQuoteItemsVariables>;
  operationName: string;
}
export const deleteQuoteItemsRef: DeleteQuoteItemsRef;

export function deleteQuoteItems(vars: DeleteQuoteItemsVariables): MutationPromise<DeleteQuoteItemsData, DeleteQuoteItemsVariables>;
export function deleteQuoteItems(dc: DataConnect, vars: DeleteQuoteItemsVariables): MutationPromise<DeleteQuoteItemsData, DeleteQuoteItemsVariables>;

interface CreateQuoteItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuoteItemVariables): MutationRef<CreateQuoteItemData, CreateQuoteItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuoteItemVariables): MutationRef<CreateQuoteItemData, CreateQuoteItemVariables>;
  operationName: string;
}
export const createQuoteItemRef: CreateQuoteItemRef;

export function createQuoteItem(vars: CreateQuoteItemVariables): MutationPromise<CreateQuoteItemData, CreateQuoteItemVariables>;
export function createQuoteItem(dc: DataConnect, vars: CreateQuoteItemVariables): MutationPromise<CreateQuoteItemData, CreateQuoteItemVariables>;

interface UpdateQuoteItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuoteItemVariables): MutationRef<UpdateQuoteItemData, UpdateQuoteItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateQuoteItemVariables): MutationRef<UpdateQuoteItemData, UpdateQuoteItemVariables>;
  operationName: string;
}
export const updateQuoteItemRef: UpdateQuoteItemRef;

export function updateQuoteItem(vars: UpdateQuoteItemVariables): MutationPromise<UpdateQuoteItemData, UpdateQuoteItemVariables>;
export function updateQuoteItem(dc: DataConnect, vars: UpdateQuoteItemVariables): MutationPromise<UpdateQuoteItemData, UpdateQuoteItemVariables>;

interface CreateReminderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateReminderVariables): MutationRef<CreateReminderData, CreateReminderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateReminderVariables): MutationRef<CreateReminderData, CreateReminderVariables>;
  operationName: string;
}
export const createReminderRef: CreateReminderRef;

export function createReminder(vars: CreateReminderVariables): MutationPromise<CreateReminderData, CreateReminderVariables>;
export function createReminder(dc: DataConnect, vars: CreateReminderVariables): MutationPromise<CreateReminderData, CreateReminderVariables>;

interface UpdateReminderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateReminderVariables): MutationRef<UpdateReminderData, UpdateReminderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateReminderVariables): MutationRef<UpdateReminderData, UpdateReminderVariables>;
  operationName: string;
}
export const updateReminderRef: UpdateReminderRef;

export function updateReminder(vars: UpdateReminderVariables): MutationPromise<UpdateReminderData, UpdateReminderVariables>;
export function updateReminder(dc: DataConnect, vars: UpdateReminderVariables): MutationPromise<UpdateReminderData, UpdateReminderVariables>;

interface ListDueRemindersRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListDueRemindersVariables): QueryRef<ListDueRemindersData, ListDueRemindersVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListDueRemindersVariables): QueryRef<ListDueRemindersData, ListDueRemindersVariables>;
  operationName: string;
}
export const listDueRemindersRef: ListDueRemindersRef;

export function listDueReminders(vars: ListDueRemindersVariables, options?: ExecuteQueryOptions): QueryPromise<ListDueRemindersData, ListDueRemindersVariables>;
export function listDueReminders(dc: DataConnect, vars: ListDueRemindersVariables, options?: ExecuteQueryOptions): QueryPromise<ListDueRemindersData, ListDueRemindersVariables>;

interface ListProjectRemindersRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectRemindersVariables): QueryRef<ListProjectRemindersData, ListProjectRemindersVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListProjectRemindersVariables): QueryRef<ListProjectRemindersData, ListProjectRemindersVariables>;
  operationName: string;
}
export const listProjectRemindersRef: ListProjectRemindersRef;

export function listProjectReminders(vars: ListProjectRemindersVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectRemindersData, ListProjectRemindersVariables>;
export function listProjectReminders(dc: DataConnect, vars: ListProjectRemindersVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectRemindersData, ListProjectRemindersVariables>;

interface GetReminderByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetReminderByIdVariables): QueryRef<GetReminderByIdData, GetReminderByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetReminderByIdVariables): QueryRef<GetReminderByIdData, GetReminderByIdVariables>;
  operationName: string;
}
export const getReminderByIdRef: GetReminderByIdRef;

export function getReminderById(vars: GetReminderByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetReminderByIdData, GetReminderByIdVariables>;
export function getReminderById(dc: DataConnect, vars: GetReminderByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetReminderByIdData, GetReminderByIdVariables>;

interface UpsertUserSettingsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserSettingsVariables): MutationRef<UpsertUserSettingsData, UpsertUserSettingsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertUserSettingsVariables): MutationRef<UpsertUserSettingsData, UpsertUserSettingsVariables>;
  operationName: string;
}
export const upsertUserSettingsRef: UpsertUserSettingsRef;

export function upsertUserSettings(vars: UpsertUserSettingsVariables): MutationPromise<UpsertUserSettingsData, UpsertUserSettingsVariables>;
export function upsertUserSettings(dc: DataConnect, vars: UpsertUserSettingsVariables): MutationPromise<UpsertUserSettingsData, UpsertUserSettingsVariables>;

interface GetUserSettingsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserSettingsVariables): QueryRef<GetUserSettingsData, GetUserSettingsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserSettingsVariables): QueryRef<GetUserSettingsData, GetUserSettingsVariables>;
  operationName: string;
}
export const getUserSettingsRef: GetUserSettingsRef;

export function getUserSettings(vars: GetUserSettingsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserSettingsData, GetUserSettingsVariables>;
export function getUserSettings(dc: DataConnect, vars: GetUserSettingsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserSettingsData, GetUserSettingsVariables>;

