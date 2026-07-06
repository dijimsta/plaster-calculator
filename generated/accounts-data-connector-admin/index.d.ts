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

export interface UserSettings_Key {
  ownerId: string;
  __typename?: 'UserSettings_Key';
}

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

