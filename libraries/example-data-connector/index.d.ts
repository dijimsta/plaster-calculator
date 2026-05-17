import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


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
  name: string;
  originalFileName: string;
  uploadType: string;
  originalPath: string;
  status: string;
  pageCount: number;
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
    name: string;
    originalFileName: string;
    uploadType: string;
    originalPath: string;
    status: string;
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

export interface GetProjectByIdVariables {
  id: UUIDString;
}

export interface GetProjectDetailsByIdData {
  project?: {
    id: UUIDString;
    ownerId: string;
    name: string;
    originalFileName: string;
    uploadType: string;
    originalPath: string;
    status: string;
    processingError?: string | null;
    pageCount: number;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Project_Key;
}

export interface GetProjectDetailsByIdVariables {
  id: UUIDString;
}

export interface ListProjectsByOwnerData {
  projects: ({
    id: UUIDString;
    ownerId: string;
    name: string;
    originalFileName: string;
    uploadType: string;
    originalPath: string;
    status: string;
    processingError?: string | null;
    pageCount: number;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Project_Key)[];
}

export interface ListProjectsByOwnerVariables {
  ownerId: string;
}

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
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

/** Generated Node Admin SDK operation action function for the 'CreateProjectFromUpload' Mutation. Allow users to execute without passing in DataConnect. */
export function createProjectFromUpload(dc: DataConnect, vars: CreateProjectFromUploadVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateProjectFromUploadData>>;
/** Generated Node Admin SDK operation action function for the 'CreateProjectFromUpload' Mutation. Allow users to pass in custom DataConnect instances. */
export function createProjectFromUpload(vars: CreateProjectFromUploadVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateProjectFromUploadData>>;

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

/** Generated Node Admin SDK operation action function for the 'ListProjectsByOwner' Query. Allow users to execute without passing in DataConnect. */
export function listProjectsByOwner(dc: DataConnect, vars: ListProjectsByOwnerVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListProjectsByOwnerData>>;
/** Generated Node Admin SDK operation action function for the 'ListProjectsByOwner' Query. Allow users to pass in custom DataConnect instances. */
export function listProjectsByOwner(vars: ListProjectsByOwnerVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListProjectsByOwnerData>>;

/** Generated Node Admin SDK operation action function for the 'GetProjectById' Query. Allow users to execute without passing in DataConnect. */
export function getProjectById(dc: DataConnect, vars: GetProjectByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetProjectByIdData>>;
/** Generated Node Admin SDK operation action function for the 'GetProjectById' Query. Allow users to pass in custom DataConnect instances. */
export function getProjectById(vars: GetProjectByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetProjectByIdData>>;

/** Generated Node Admin SDK operation action function for the 'GetProjectDetailsById' Query. Allow users to execute without passing in DataConnect. */
export function getProjectDetailsById(dc: DataConnect, vars: GetProjectDetailsByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetProjectDetailsByIdData>>;
/** Generated Node Admin SDK operation action function for the 'GetProjectDetailsById' Query. Allow users to pass in custom DataConnect instances. */
export function getProjectDetailsById(vars: GetProjectDetailsByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetProjectDetailsByIdData>>;

/** Generated Node Admin SDK operation action function for the 'GetFloorplanPageById' Query. Allow users to execute without passing in DataConnect. */
export function getFloorplanPageById(dc: DataConnect, vars: GetFloorplanPageByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetFloorplanPageByIdData>>;
/** Generated Node Admin SDK operation action function for the 'GetFloorplanPageById' Query. Allow users to pass in custom DataConnect instances. */
export function getFloorplanPageById(vars: GetFloorplanPageByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetFloorplanPageByIdData>>;

