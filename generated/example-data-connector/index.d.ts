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
  sourceImagePath?: string | null;
  previewImagePath?: string | null;
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

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
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

/** Generated Node Admin SDK operation action function for the 'CreateProjectFromUpload' Mutation. Allow users to execute without passing in DataConnect. */
export function createProjectFromUpload(dc: DataConnect, vars: CreateProjectFromUploadVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateProjectFromUploadData>>;
/** Generated Node Admin SDK operation action function for the 'CreateProjectFromUpload' Mutation. Allow users to pass in custom DataConnect instances. */
export function createProjectFromUpload(vars: CreateProjectFromUploadVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateProjectFromUploadData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateProject' Mutation. Allow users to execute without passing in DataConnect. */
export function updateProject(dc: DataConnect, vars: UpdateProjectVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateProjectData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateProject' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateProject(vars: UpdateProjectVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateProjectData>>;

/** Generated Node Admin SDK operation action function for the 'RenameProject' Mutation. Allow users to execute without passing in DataConnect. */
export function renameProject(dc: DataConnect, vars: RenameProjectVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RenameProjectData>>;
/** Generated Node Admin SDK operation action function for the 'RenameProject' Mutation. Allow users to pass in custom DataConnect instances. */
export function renameProject(vars: RenameProjectVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RenameProjectData>>;

/** Generated Node Admin SDK operation action function for the 'TouchProject' Mutation. Allow users to execute without passing in DataConnect. */
export function touchProject(dc: DataConnect, vars: TouchProjectVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<TouchProjectData>>;
/** Generated Node Admin SDK operation action function for the 'TouchProject' Mutation. Allow users to pass in custom DataConnect instances. */
export function touchProject(vars: TouchProjectVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<TouchProjectData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteFloorplanPages' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteFloorplanPages(dc: DataConnect, vars: DeleteFloorplanPagesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteFloorplanPagesData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteFloorplanPages' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteFloorplanPages(vars: DeleteFloorplanPagesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteFloorplanPagesData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteProject' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteProject(dc: DataConnect, vars: DeleteProjectVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteProjectData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteProject' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteProject(vars: DeleteProjectVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteProjectData>>;

/** Generated Node Admin SDK operation action function for the 'CreateAccount' Mutation. Allow users to execute without passing in DataConnect. */
export function createAccount(dc: DataConnect, vars: CreateAccountVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateAccountData>>;
/** Generated Node Admin SDK operation action function for the 'CreateAccount' Mutation. Allow users to pass in custom DataConnect instances. */
export function createAccount(vars: CreateAccountVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateAccountData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateAccount' Mutation. Allow users to execute without passing in DataConnect. */
export function updateAccount(dc: DataConnect, vars: UpdateAccountVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateAccountData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateAccount' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateAccount(vars: UpdateAccountVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateAccountData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteAccountContacts' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteAccountContacts(dc: DataConnect, vars: DeleteAccountContactsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteAccountContactsData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteAccountContacts' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteAccountContacts(vars: DeleteAccountContactsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteAccountContactsData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteAccount' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteAccount(dc: DataConnect, vars: DeleteAccountVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteAccountData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteAccount' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteAccount(vars: DeleteAccountVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteAccountData>>;

/** Generated Node Admin SDK operation action function for the 'CreateAccountContact' Mutation. Allow users to execute without passing in DataConnect. */
export function createAccountContact(dc: DataConnect, vars: CreateAccountContactVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateAccountContactData>>;
/** Generated Node Admin SDK operation action function for the 'CreateAccountContact' Mutation. Allow users to pass in custom DataConnect instances. */
export function createAccountContact(vars: CreateAccountContactVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateAccountContactData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateAccountContact' Mutation. Allow users to execute without passing in DataConnect. */
export function updateAccountContact(dc: DataConnect, vars: UpdateAccountContactVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateAccountContactData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateAccountContact' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateAccountContact(vars: UpdateAccountContactVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateAccountContactData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteAccountContact' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteAccountContact(dc: DataConnect, vars: DeleteAccountContactVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteAccountContactData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteAccountContact' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteAccountContact(vars: DeleteAccountContactVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteAccountContactData>>;

/** Generated Node Admin SDK operation action function for the 'UpsertUserSettings' Mutation. Allow users to execute without passing in DataConnect. */
export function upsertUserSettings(dc: DataConnect, vars: UpsertUserSettingsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertUserSettingsData>>;
/** Generated Node Admin SDK operation action function for the 'UpsertUserSettings' Mutation. Allow users to pass in custom DataConnect instances. */
export function upsertUserSettings(vars: UpsertUserSettingsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertUserSettingsData>>;

/** Generated Node Admin SDK operation action function for the 'CreateReminder' Mutation. Allow users to execute without passing in DataConnect. */
export function createReminder(dc: DataConnect, vars: CreateReminderVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateReminderData>>;
/** Generated Node Admin SDK operation action function for the 'CreateReminder' Mutation. Allow users to pass in custom DataConnect instances. */
export function createReminder(vars: CreateReminderVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateReminderData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateReminder' Mutation. Allow users to execute without passing in DataConnect. */
export function updateReminder(dc: DataConnect, vars: UpdateReminderVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateReminderData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateReminder' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateReminder(vars: UpdateReminderVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateReminderData>>;

/** Generated Node Admin SDK operation action function for the 'CreateFloorplanPage' Mutation. Allow users to execute without passing in DataConnect. */
export function createFloorplanPage(dc: DataConnect, vars: CreateFloorplanPageVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateFloorplanPageData>>;
/** Generated Node Admin SDK operation action function for the 'CreateFloorplanPage' Mutation. Allow users to pass in custom DataConnect instances. */
export function createFloorplanPage(vars: CreateFloorplanPageVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateFloorplanPageData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateFloorplanPage' Mutation. Allow users to execute without passing in DataConnect. */
export function updateFloorplanPage(dc: DataConnect, vars: UpdateFloorplanPageVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateFloorplanPageData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateFloorplanPage' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateFloorplanPage(vars: UpdateFloorplanPageVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateFloorplanPageData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateFloorplanPages' Mutation. Allow users to execute without passing in DataConnect. */
export function updateFloorplanPages(dc: DataConnect, vars: UpdateFloorplanPagesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateFloorplanPagesData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateFloorplanPages' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateFloorplanPages(vars: UpdateFloorplanPagesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateFloorplanPagesData>>;

/** Generated Node Admin SDK operation action function for the 'ListProjectsByOwnerAndSalesStatus' Query. Allow users to execute without passing in DataConnect. */
export function listProjectsByOwnerAndSalesStatus(dc: DataConnect, vars: ListProjectsByOwnerAndSalesStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListProjectsByOwnerAndSalesStatusData>>;
/** Generated Node Admin SDK operation action function for the 'ListProjectsByOwnerAndSalesStatus' Query. Allow users to pass in custom DataConnect instances. */
export function listProjectsByOwnerAndSalesStatus(vars: ListProjectsByOwnerAndSalesStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListProjectsByOwnerAndSalesStatusData>>;

/** Generated Node Admin SDK operation action function for the 'ListProjectsByAccount' Query. Allow users to execute without passing in DataConnect. */
export function listProjectsByAccount(dc: DataConnect, vars: ListProjectsByAccountVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListProjectsByAccountData>>;
/** Generated Node Admin SDK operation action function for the 'ListProjectsByAccount' Query. Allow users to pass in custom DataConnect instances. */
export function listProjectsByAccount(vars: ListProjectsByAccountVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListProjectsByAccountData>>;

/** Generated Node Admin SDK operation action function for the 'GetProjectDetailsById' Query. Allow users to execute without passing in DataConnect. */
export function getProjectDetailsById(dc: DataConnect, vars: GetProjectDetailsByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetProjectDetailsByIdData>>;
/** Generated Node Admin SDK operation action function for the 'GetProjectDetailsById' Query. Allow users to pass in custom DataConnect instances. */
export function getProjectDetailsById(vars: GetProjectDetailsByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetProjectDetailsByIdData>>;

/** Generated Node Admin SDK operation action function for the 'GetProjectById' Query. Allow users to execute without passing in DataConnect. */
export function getProjectById(dc: DataConnect, vars: GetProjectByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetProjectByIdData>>;
/** Generated Node Admin SDK operation action function for the 'GetProjectById' Query. Allow users to pass in custom DataConnect instances. */
export function getProjectById(vars: GetProjectByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetProjectByIdData>>;

/** Generated Node Admin SDK operation action function for the 'GetFloorplanPageById' Query. Allow users to execute without passing in DataConnect. */
export function getFloorplanPageById(dc: DataConnect, vars: GetFloorplanPageByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetFloorplanPageByIdData>>;
/** Generated Node Admin SDK operation action function for the 'GetFloorplanPageById' Query. Allow users to pass in custom DataConnect instances. */
export function getFloorplanPageById(vars: GetFloorplanPageByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetFloorplanPageByIdData>>;

/** Generated Node Admin SDK operation action function for the 'ListAccountsByOwner' Query. Allow users to execute without passing in DataConnect. */
export function listAccountsByOwner(dc: DataConnect, vars: ListAccountsByOwnerVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListAccountsByOwnerData>>;
/** Generated Node Admin SDK operation action function for the 'ListAccountsByOwner' Query. Allow users to pass in custom DataConnect instances. */
export function listAccountsByOwner(vars: ListAccountsByOwnerVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListAccountsByOwnerData>>;

/** Generated Node Admin SDK operation action function for the 'GetAccountById' Query. Allow users to execute without passing in DataConnect. */
export function getAccountById(dc: DataConnect, vars: GetAccountByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetAccountByIdData>>;
/** Generated Node Admin SDK operation action function for the 'GetAccountById' Query. Allow users to pass in custom DataConnect instances. */
export function getAccountById(vars: GetAccountByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetAccountByIdData>>;

/** Generated Node Admin SDK operation action function for the 'ListAccountContactsByAccountId' Query. Allow users to execute without passing in DataConnect. */
export function listAccountContactsByAccountId(dc: DataConnect, vars: ListAccountContactsByAccountIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListAccountContactsByAccountIdData>>;
/** Generated Node Admin SDK operation action function for the 'ListAccountContactsByAccountId' Query. Allow users to pass in custom DataConnect instances. */
export function listAccountContactsByAccountId(vars: ListAccountContactsByAccountIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListAccountContactsByAccountIdData>>;

/** Generated Node Admin SDK operation action function for the 'GetAccountContactById' Query. Allow users to execute without passing in DataConnect. */
export function getAccountContactById(dc: DataConnect, vars: GetAccountContactByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetAccountContactByIdData>>;
/** Generated Node Admin SDK operation action function for the 'GetAccountContactById' Query. Allow users to pass in custom DataConnect instances. */
export function getAccountContactById(vars: GetAccountContactByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetAccountContactByIdData>>;

/** Generated Node Admin SDK operation action function for the 'GetUserSettings' Query. Allow users to execute without passing in DataConnect. */
export function getUserSettings(dc: DataConnect, vars: GetUserSettingsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetUserSettingsData>>;
/** Generated Node Admin SDK operation action function for the 'GetUserSettings' Query. Allow users to pass in custom DataConnect instances. */
export function getUserSettings(vars: GetUserSettingsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetUserSettingsData>>;

/** Generated Node Admin SDK operation action function for the 'ListDueReminders' Query. Allow users to execute without passing in DataConnect. */
export function listDueReminders(dc: DataConnect, vars: ListDueRemindersVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListDueRemindersData>>;
/** Generated Node Admin SDK operation action function for the 'ListDueReminders' Query. Allow users to pass in custom DataConnect instances. */
export function listDueReminders(vars: ListDueRemindersVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListDueRemindersData>>;

/** Generated Node Admin SDK operation action function for the 'ListProjectReminders' Query. Allow users to execute without passing in DataConnect. */
export function listProjectReminders(dc: DataConnect, vars: ListProjectRemindersVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListProjectRemindersData>>;
/** Generated Node Admin SDK operation action function for the 'ListProjectReminders' Query. Allow users to pass in custom DataConnect instances. */
export function listProjectReminders(vars: ListProjectRemindersVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListProjectRemindersData>>;

/** Generated Node Admin SDK operation action function for the 'GetReminderById' Query. Allow users to execute without passing in DataConnect. */
export function getReminderById(dc: DataConnect, vars: GetReminderByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetReminderByIdData>>;
/** Generated Node Admin SDK operation action function for the 'GetReminderById' Query. Allow users to pass in custom DataConnect instances. */
export function getReminderById(vars: GetReminderByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetReminderByIdData>>;

