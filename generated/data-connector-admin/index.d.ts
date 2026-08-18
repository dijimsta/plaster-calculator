import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface AcceptTeamInvitationData {
  teamMember_insert: TeamMember_Key;
  teamInvitation_update?: TeamInvitation_Key | null;
}

export interface AcceptTeamInvitationVariables {
  teamId: string;
  email: string;
  tokenHash: string;
  userId: string;
}

export interface AccountContact_Key {
  id: UUIDString;
  __typename?: 'AccountContact_Key';
}

export interface Account_Key {
  id: UUIDString;
  __typename?: 'Account_Key';
}

export interface CompanyContact_Key {
  id: UUIDString;
  __typename?: 'CompanyContact_Key';
}

export interface Company_Key {
  id: UUIDString;
  __typename?: 'Company_Key';
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
  ocrTextContent?: string | null;
}

export interface CreateProjectFromUploadData {
  project_insert: Project_Key;
}

export interface CreateProjectFromUploadVariables {
  id: UUIDString;
  teamId: string;
  assignee?: string | null;
  companyId?: UUIDString | null;
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
  teamId: string;
  projectId: UUIDString;
  companyId?: UUIDString | null;
  assignee?: string | null;
  name: string;
  status: string;
  dueAt: TimestampString;
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

export interface DeleteTeamMemberData {
  teamMember_delete?: TeamMember_Key | null;
}

export interface DeleteTeamMemberVariables {
  teamId: string;
  userId: string;
}

export interface FindPendingTeamInvitationsForEmailData {
  teamInvitations: ({
    teamId: string;
    email: string;
    expiresAt: TimestampString;
  } & TeamInvitation_Key)[];
}

export interface FindPendingTeamInvitationsForEmailVariables {
  email: string;
  now: TimestampString;
}

export interface FloorplanPage_Key {
  id: UUIDString;
  __typename?: 'FloorplanPage_Key';
}

export interface GetCompanyByIdData {
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

export interface GetCompanyByIdVariables {
  id: UUIDString;
}

export interface GetCompanyContactByIdData {
  companyContact?: {
    id: UUIDString;
    companyId: UUIDString;
    name: string;
    email?: string | null;
    phoneNumber?: string | null;
    role?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & CompanyContact_Key;
}

export interface GetCompanyContactByIdVariables {
  companyId: UUIDString;
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
    teamId: string;
    assignee?: string | null;
    companyId?: UUIDString | null;
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
    teamId: string;
    assignee?: string | null;
    companyId?: UUIDString | null;
    name: string;
    address?: string | null;
    originalFileName: string;
    uploadType: string;
    originalPath: string;
    status: string;
    salesStatus: string;
    scope?: string | null;
    processingError?: string | null;
    pageCount: number;
    extractedTextJson?: string | null;
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
      ocrTextContent?: string | null;
      createdAt: TimestampString;
      updatedAt: TimestampString;
    } & FloorplanPage_Key)[];
  } & Project_Key;
}

export interface GetProjectDetailsByIdVariables {
  id: UUIDString;
}

export interface GetProjectQuestionnaireQuestionsForProjectData {
  projectQuestionnaire?: {
    projectId: UUIDString;
    questions: ({
      id: UUIDString;
      label: string;
      position: number;
      answer?: string | null;
      answerSource: string;
    } & ProjectQuestionnaireQuestion_Key)[];
  } & ProjectQuestionnaire_Key;
}

export interface GetProjectQuestionnaireQuestionsForProjectVariables {
  projectId: UUIDString;
}

export interface GetReminderByIdData {
  reminder?: {
    id: UUIDString;
    teamId: string;
    projectId: UUIDString;
    companyId?: UUIDString | null;
    assignee?: string | null;
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

export interface GetTeamInvitationByTokenHashData {
  teamInvitation?: {
    teamId: string;
    email: string;
    tokenHash: string;
    invitedByUserId: string;
    expiresAt: TimestampString;
    acceptedAt?: TimestampString | null;
    acceptedByUserId?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & TeamInvitation_Key;
}

export interface GetTeamInvitationByTokenHashVariables {
  tokenHash: string;
}

export interface GetTeamMemberData {
  teamMember?: {
    teamId: string;
    userId: string;
    role: string;
  } & TeamMember_Key;
}

export interface GetTeamMemberVariables {
  teamId: string;
  userId: string;
}

export interface GetTeamMembershipForUserData {
  teamMembers: ({
    teamId: string;
    userId: string;
    role: string;
    team: {
      id: string;
      name: string;
    } & Team_Key;
  } & TeamMember_Key)[];
}

export interface GetTeamMembershipForUserVariables {
  userId: string;
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

export interface ListDueRemindersData {
  reminders: ({
    id: UUIDString;
    teamId: string;
    assignee?: string | null;
    projectId: UUIDString;
    companyId?: UUIDString | null;
    name: string;
    status: string;
    dueAt: TimestampString;
    completedAt?: TimestampString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Reminder_Key)[];
}

export interface ListDueRemindersVariables {
  teamId: string;
}

export interface ListOpenRemindersData {
  reminders: ({
    id: UUIDString;
    teamId: string;
    assignee?: string | null;
    projectId: UUIDString;
    companyId?: UUIDString | null;
    name: string;
    status: string;
    dueAt: TimestampString;
    completedAt?: TimestampString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Reminder_Key)[];
}

export interface ListOpenRemindersVariables {
  teamId: string;
}

export interface ListPendingTeamInvitationsData {
  teamInvitations: ({
    teamId: string;
    email: string;
    invitedByUserId: string;
    expiresAt: TimestampString;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & TeamInvitation_Key)[];
}

export interface ListPendingTeamInvitationsVariables {
  teamId: string;
  now: TimestampString;
  limit?: number | null;
  offset?: number | null;
}

export interface ListProjectRemindersData {
  reminders: ({
    id: UUIDString;
    teamId: string;
    projectId: UUIDString;
    companyId?: UUIDString | null;
    assignee?: string | null;
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

export interface ListProjectsByCompanyData {
  projects: ({
    id: UUIDString;
    teamId: string;
    assignee?: string | null;
    companyId?: UUIDString | null;
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

export interface ListProjectsByCompanyVariables {
  companyId: UUIDString;
  limit?: number | null;
  offset?: number | null;
}

export interface ListProjectsByTeamAndSalesStatusData {
  projects: ({
    id: UUIDString;
    teamId: string;
    assignee?: string | null;
    companyId?: UUIDString | null;
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

export interface ListProjectsByTeamAndSalesStatusVariables {
  teamId: string;
  salesStatus: string;
  limit?: number | null;
  offset?: number | null;
}

export interface ListTeamMembersData {
  teamMembers: ({
    teamId: string;
    userId: string;
    role: string;
  } & TeamMember_Key)[];
}

export interface ListTeamMembersVariables {
  teamId: string;
  limit?: number | null;
  offset?: number | null;
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

export interface QuoteAppearance_Key {
  teamId: string;
  __typename?: 'QuoteAppearance_Key';
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

export interface RenameProjectData {
  project_update?: Project_Key | null;
}

export interface RenameProjectVariables {
  id: UUIDString;
  name: string;
}

export interface RevokeTeamInvitationData {
  teamInvitation_delete?: TeamInvitation_Key | null;
}

export interface RevokeTeamInvitationVariables {
  teamId: string;
  email: string;
  now: TimestampString;
}

export interface RotateTeamInvitationData {
  teamInvitation_upsert: TeamInvitation_Key;
}

export interface RotateTeamInvitationVariables {
  teamId: string;
  email: string;
  tokenHash: string;
  invitedByUserId: string;
  expiresAt: TimestampString;
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

export interface TouchProjectData {
  project_update?: Project_Key | null;
}

export interface TouchProjectVariables {
  id: UUIDString;
  status?: string | null;
  processingError?: string | null;
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
  ocrTextContent?: string | null;
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

export interface UpdateProjectExtractedTextData {
  project_update?: Project_Key | null;
}

export interface UpdateProjectExtractedTextVariables {
  id: UUIDString;
  extractedTextJson?: string | null;
}

export interface UpdateProjectQuestionnaireQuestionAiAnswerData {
  projectQuestionnaireQuestion_update?: ProjectQuestionnaireQuestion_Key | null;
}

export interface UpdateProjectQuestionnaireQuestionAiAnswerVariables {
  id: UUIDString;
  answer: string;
  answerSource: string;
}

export interface UpdateProjectVariables {
  id: UUIDString;
  name?: string | null;
  companyId?: UUIDString | null;
  address?: string | null;
  salesStatus?: string | null;
  assignee?: string | null;
  scope?: string | null;
}

export interface UpdateReminderData {
  reminder_update?: Reminder_Key | null;
}

export interface UpdateReminderVariables {
  id: UUIDString;
  companyId?: UUIDString | null;
  assignee?: string | null;
  name?: string | null;
  status?: string | null;
  dueAt?: TimestampString | null;
  completedAt?: TimestampString | null;
}

export interface UpdateTeamNameData {
  team_update?: Team_Key | null;
}

export interface UpdateTeamNameVariables {
  teamId: string;
  name: string;
}

export interface UpsertTeamData {
  team_upsert: Team_Key;
}

export interface UpsertTeamMemberData {
  teamMember_upsert: TeamMember_Key;
}

export interface UpsertTeamMemberVariables {
  teamId: string;
  userId: string;
  role: string;
}

export interface UpsertTeamVariables {
  id: string;
  name: string;
  createdByUserId: string;
}

export interface UserSettings_Key {
  ownerId: string;
  __typename?: 'UserSettings_Key';
}

export interface UserSignature_Key {
  ownerId: string;
  __typename?: 'UserSignature_Key';
}

/** Generated Node Admin SDK operation action function for the 'GetCompanyById' Query. Allow users to execute without passing in DataConnect. */
export function getCompanyById(dc: DataConnect, vars: GetCompanyByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCompanyByIdData>>;
/** Generated Node Admin SDK operation action function for the 'GetCompanyById' Query. Allow users to pass in custom DataConnect instances. */
export function getCompanyById(vars: GetCompanyByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCompanyByIdData>>;

/** Generated Node Admin SDK operation action function for the 'GetCompanyContactById' Query. Allow users to execute without passing in DataConnect. */
export function getCompanyContactById(dc: DataConnect, vars: GetCompanyContactByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCompanyContactByIdData>>;
/** Generated Node Admin SDK operation action function for the 'GetCompanyContactById' Query. Allow users to pass in custom DataConnect instances. */
export function getCompanyContactById(vars: GetCompanyContactByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCompanyContactByIdData>>;

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

/** Generated Node Admin SDK operation action function for the 'UpdateProjectExtractedText' Mutation. Allow users to execute without passing in DataConnect. */
export function updateProjectExtractedText(dc: DataConnect, vars: UpdateProjectExtractedTextVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateProjectExtractedTextData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateProjectExtractedText' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateProjectExtractedText(vars: UpdateProjectExtractedTextVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateProjectExtractedTextData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteFloorplanPages' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteFloorplanPages(dc: DataConnect, vars: DeleteFloorplanPagesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteFloorplanPagesData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteFloorplanPages' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteFloorplanPages(vars: DeleteFloorplanPagesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteFloorplanPagesData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteProject' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteProject(dc: DataConnect, vars: DeleteProjectVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteProjectData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteProject' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteProject(vars: DeleteProjectVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteProjectData>>;

/** Generated Node Admin SDK operation action function for the 'CreateFloorplanPage' Mutation. Allow users to execute without passing in DataConnect. */
export function createFloorplanPage(dc: DataConnect, vars: CreateFloorplanPageVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateFloorplanPageData>>;
/** Generated Node Admin SDK operation action function for the 'CreateFloorplanPage' Mutation. Allow users to pass in custom DataConnect instances. */
export function createFloorplanPage(vars: CreateFloorplanPageVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateFloorplanPageData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateFloorplanPageAnalysis' Mutation. Allow users to execute without passing in DataConnect. */
export function updateFloorplanPageAnalysis(dc: DataConnect, vars: UpdateFloorplanPageAnalysisVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateFloorplanPageAnalysisData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateFloorplanPageAnalysis' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateFloorplanPageAnalysis(vars: UpdateFloorplanPageAnalysisVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateFloorplanPageAnalysisData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateFloorplanPage' Mutation. Allow users to execute without passing in DataConnect. */
export function updateFloorplanPage(dc: DataConnect, vars: UpdateFloorplanPageVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateFloorplanPageData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateFloorplanPage' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateFloorplanPage(vars: UpdateFloorplanPageVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateFloorplanPageData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateFloorplanPages' Mutation. Allow users to execute without passing in DataConnect. */
export function updateFloorplanPages(dc: DataConnect, vars: UpdateFloorplanPagesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateFloorplanPagesData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateFloorplanPages' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateFloorplanPages(vars: UpdateFloorplanPagesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateFloorplanPagesData>>;

/** Generated Node Admin SDK operation action function for the 'ListProjectsByTeamAndSalesStatus' Query. Allow users to execute without passing in DataConnect. */
export function listProjectsByTeamAndSalesStatus(dc: DataConnect, vars: ListProjectsByTeamAndSalesStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListProjectsByTeamAndSalesStatusData>>;
/** Generated Node Admin SDK operation action function for the 'ListProjectsByTeamAndSalesStatus' Query. Allow users to pass in custom DataConnect instances. */
export function listProjectsByTeamAndSalesStatus(vars: ListProjectsByTeamAndSalesStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListProjectsByTeamAndSalesStatusData>>;

/** Generated Node Admin SDK operation action function for the 'ListProjectsByCompany' Query. Allow users to execute without passing in DataConnect. */
export function listProjectsByCompany(dc: DataConnect, vars: ListProjectsByCompanyVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListProjectsByCompanyData>>;
/** Generated Node Admin SDK operation action function for the 'ListProjectsByCompany' Query. Allow users to pass in custom DataConnect instances. */
export function listProjectsByCompany(vars: ListProjectsByCompanyVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListProjectsByCompanyData>>;

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

/** Generated Node Admin SDK operation action function for the 'UpdateProjectQuestionnaireQuestionAiAnswer' Mutation. Allow users to execute without passing in DataConnect. */
export function updateProjectQuestionnaireQuestionAiAnswer(dc: DataConnect, vars: UpdateProjectQuestionnaireQuestionAiAnswerVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateProjectQuestionnaireQuestionAiAnswerData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateProjectQuestionnaireQuestionAiAnswer' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateProjectQuestionnaireQuestionAiAnswer(vars: UpdateProjectQuestionnaireQuestionAiAnswerVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateProjectQuestionnaireQuestionAiAnswerData>>;

/** Generated Node Admin SDK operation action function for the 'GetProjectQuestionnaireQuestionsForProject' Query. Allow users to execute without passing in DataConnect. */
export function getProjectQuestionnaireQuestionsForProject(dc: DataConnect, vars: GetProjectQuestionnaireQuestionsForProjectVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetProjectQuestionnaireQuestionsForProjectData>>;
/** Generated Node Admin SDK operation action function for the 'GetProjectQuestionnaireQuestionsForProject' Query. Allow users to pass in custom DataConnect instances. */
export function getProjectQuestionnaireQuestionsForProject(vars: GetProjectQuestionnaireQuestionsForProjectVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetProjectQuestionnaireQuestionsForProjectData>>;

/** Generated Node Admin SDK operation action function for the 'CreateReminder' Mutation. Allow users to execute without passing in DataConnect. */
export function createReminder(dc: DataConnect, vars: CreateReminderVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateReminderData>>;
/** Generated Node Admin SDK operation action function for the 'CreateReminder' Mutation. Allow users to pass in custom DataConnect instances. */
export function createReminder(vars: CreateReminderVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateReminderData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateReminder' Mutation. Allow users to execute without passing in DataConnect. */
export function updateReminder(dc: DataConnect, vars: UpdateReminderVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateReminderData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateReminder' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateReminder(vars: UpdateReminderVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateReminderData>>;

/** Generated Node Admin SDK operation action function for the 'ListDueReminders' Query. Allow users to execute without passing in DataConnect. */
export function listDueReminders(dc: DataConnect, vars: ListDueRemindersVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListDueRemindersData>>;
/** Generated Node Admin SDK operation action function for the 'ListDueReminders' Query. Allow users to pass in custom DataConnect instances. */
export function listDueReminders(vars: ListDueRemindersVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListDueRemindersData>>;

/** Generated Node Admin SDK operation action function for the 'ListOpenReminders' Query. Allow users to execute without passing in DataConnect. */
export function listOpenReminders(dc: DataConnect, vars: ListOpenRemindersVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListOpenRemindersData>>;
/** Generated Node Admin SDK operation action function for the 'ListOpenReminders' Query. Allow users to pass in custom DataConnect instances. */
export function listOpenReminders(vars: ListOpenRemindersVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListOpenRemindersData>>;

/** Generated Node Admin SDK operation action function for the 'ListProjectReminders' Query. Allow users to execute without passing in DataConnect. */
export function listProjectReminders(dc: DataConnect, vars: ListProjectRemindersVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListProjectRemindersData>>;
/** Generated Node Admin SDK operation action function for the 'ListProjectReminders' Query. Allow users to pass in custom DataConnect instances. */
export function listProjectReminders(vars: ListProjectRemindersVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListProjectRemindersData>>;

/** Generated Node Admin SDK operation action function for the 'GetReminderById' Query. Allow users to execute without passing in DataConnect. */
export function getReminderById(dc: DataConnect, vars: GetReminderByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetReminderByIdData>>;
/** Generated Node Admin SDK operation action function for the 'GetReminderById' Query. Allow users to pass in custom DataConnect instances. */
export function getReminderById(vars: GetReminderByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetReminderByIdData>>;

/** Generated Node Admin SDK operation action function for the 'UpsertTeam' Mutation. Allow users to execute without passing in DataConnect. */
export function upsertTeam(dc: DataConnect, vars: UpsertTeamVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertTeamData>>;
/** Generated Node Admin SDK operation action function for the 'UpsertTeam' Mutation. Allow users to pass in custom DataConnect instances. */
export function upsertTeam(vars: UpsertTeamVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertTeamData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateTeamName' Mutation. Allow users to execute without passing in DataConnect. */
export function updateTeamName(dc: DataConnect, vars: UpdateTeamNameVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTeamNameData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateTeamName' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateTeamName(vars: UpdateTeamNameVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTeamNameData>>;

/** Generated Node Admin SDK operation action function for the 'UpsertTeamMember' Mutation. Allow users to execute without passing in DataConnect. */
export function upsertTeamMember(dc: DataConnect, vars: UpsertTeamMemberVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertTeamMemberData>>;
/** Generated Node Admin SDK operation action function for the 'UpsertTeamMember' Mutation. Allow users to pass in custom DataConnect instances. */
export function upsertTeamMember(vars: UpsertTeamMemberVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertTeamMemberData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteTeamMember' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteTeamMember(dc: DataConnect, vars: DeleteTeamMemberVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTeamMemberData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteTeamMember' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteTeamMember(vars: DeleteTeamMemberVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTeamMemberData>>;

/** Generated Node Admin SDK operation action function for the 'RotateTeamInvitation' Mutation. Allow users to execute without passing in DataConnect. */
export function rotateTeamInvitation(dc: DataConnect, vars: RotateTeamInvitationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RotateTeamInvitationData>>;
/** Generated Node Admin SDK operation action function for the 'RotateTeamInvitation' Mutation. Allow users to pass in custom DataConnect instances. */
export function rotateTeamInvitation(vars: RotateTeamInvitationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RotateTeamInvitationData>>;

/** Generated Node Admin SDK operation action function for the 'RevokeTeamInvitation' Mutation. Allow users to execute without passing in DataConnect. */
export function revokeTeamInvitation(dc: DataConnect, vars: RevokeTeamInvitationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RevokeTeamInvitationData>>;
/** Generated Node Admin SDK operation action function for the 'RevokeTeamInvitation' Mutation. Allow users to pass in custom DataConnect instances. */
export function revokeTeamInvitation(vars: RevokeTeamInvitationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RevokeTeamInvitationData>>;

/** Generated Node Admin SDK operation action function for the 'AcceptTeamInvitation' Mutation. Allow users to execute without passing in DataConnect. */
export function acceptTeamInvitation(dc: DataConnect, vars: AcceptTeamInvitationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AcceptTeamInvitationData>>;
/** Generated Node Admin SDK operation action function for the 'AcceptTeamInvitation' Mutation. Allow users to pass in custom DataConnect instances. */
export function acceptTeamInvitation(vars: AcceptTeamInvitationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AcceptTeamInvitationData>>;

/** Generated Node Admin SDK operation action function for the 'GetTeamMembershipForUser' Query. Allow users to execute without passing in DataConnect. */
export function getTeamMembershipForUser(dc: DataConnect, vars: GetTeamMembershipForUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTeamMembershipForUserData>>;
/** Generated Node Admin SDK operation action function for the 'GetTeamMembershipForUser' Query. Allow users to pass in custom DataConnect instances. */
export function getTeamMembershipForUser(vars: GetTeamMembershipForUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTeamMembershipForUserData>>;

/** Generated Node Admin SDK operation action function for the 'GetTeamMember' Query. Allow users to execute without passing in DataConnect. */
export function getTeamMember(dc: DataConnect, vars: GetTeamMemberVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTeamMemberData>>;
/** Generated Node Admin SDK operation action function for the 'GetTeamMember' Query. Allow users to pass in custom DataConnect instances. */
export function getTeamMember(vars: GetTeamMemberVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTeamMemberData>>;

/** Generated Node Admin SDK operation action function for the 'ListTeamMembers' Query. Allow users to execute without passing in DataConnect. */
export function listTeamMembers(dc: DataConnect, vars: ListTeamMembersVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTeamMembersData>>;
/** Generated Node Admin SDK operation action function for the 'ListTeamMembers' Query. Allow users to pass in custom DataConnect instances. */
export function listTeamMembers(vars: ListTeamMembersVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTeamMembersData>>;

/** Generated Node Admin SDK operation action function for the 'ListPendingTeamInvitations' Query. Allow users to execute without passing in DataConnect. */
export function listPendingTeamInvitations(dc: DataConnect, vars: ListPendingTeamInvitationsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListPendingTeamInvitationsData>>;
/** Generated Node Admin SDK operation action function for the 'ListPendingTeamInvitations' Query. Allow users to pass in custom DataConnect instances. */
export function listPendingTeamInvitations(vars: ListPendingTeamInvitationsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListPendingTeamInvitationsData>>;

/** Generated Node Admin SDK operation action function for the 'FindPendingTeamInvitationsForEmail' Query. Allow users to execute without passing in DataConnect. */
export function findPendingTeamInvitationsForEmail(dc: DataConnect, vars: FindPendingTeamInvitationsForEmailVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<FindPendingTeamInvitationsForEmailData>>;
/** Generated Node Admin SDK operation action function for the 'FindPendingTeamInvitationsForEmail' Query. Allow users to pass in custom DataConnect instances. */
export function findPendingTeamInvitationsForEmail(vars: FindPendingTeamInvitationsForEmailVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<FindPendingTeamInvitationsForEmailData>>;

/** Generated Node Admin SDK operation action function for the 'GetTeamInvitationByTokenHash' Query. Allow users to execute without passing in DataConnect. */
export function getTeamInvitationByTokenHash(dc: DataConnect, vars: GetTeamInvitationByTokenHashVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTeamInvitationByTokenHashData>>;
/** Generated Node Admin SDK operation action function for the 'GetTeamInvitationByTokenHash' Query. Allow users to pass in custom DataConnect instances. */
export function getTeamInvitationByTokenHash(vars: GetTeamInvitationByTokenHashVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTeamInvitationByTokenHashData>>;

/** Generated Node Admin SDK operation action function for the 'GetUserSettings' Query. Allow users to execute without passing in DataConnect. */
export function getUserSettings(dc: DataConnect, vars: GetUserSettingsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetUserSettingsData>>;
/** Generated Node Admin SDK operation action function for the 'GetUserSettings' Query. Allow users to pass in custom DataConnect instances. */
export function getUserSettings(vars: GetUserSettingsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetUserSettingsData>>;

