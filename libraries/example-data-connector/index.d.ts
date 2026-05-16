import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface AddReviewData {
  review_upsert: Review_Key;
}

export interface AddReviewVariables {
  movieId: UUIDString;
  rating: number;
  reviewText: string;
}

export interface CreateMovieData {
  movie_insert: Movie_Key;
}

export interface CreateMovieVariables {
  title: string;
  genre: string;
  imageUrl: string;
}

export interface CreatePlanFromUploadData {
  plan_insert: Plan_Key;
}

export interface CreatePlanFromUploadVariables {
  ownerId: string;
  name: string;
  originalFileName: string;
  uploadType: string;
  originalPath: string;
  status: string;
  pageCount: number;
}

export interface CreatePlanPageData {
  planPage_insert: PlanPage_Key;
}

export interface CreatePlanPageVariables {
  planId: UUIDString;
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

export interface DeleteMovieData {
  movie_delete?: Movie_Key | null;
}

export interface DeleteMovieVariables {
  id: UUIDString;
}

export interface DeletePlanData {
  plan_delete?: Plan_Key | null;
}

export interface DeletePlanPagesData {
  planPage_deleteMany: number;
}

export interface DeletePlanPagesVariables {
  planId: UUIDString;
}

export interface DeletePlanVariables {
  id: UUIDString;
}

export interface DeleteReviewData {
  review_delete?: Review_Key | null;
}

export interface DeleteReviewVariables {
  movieId: UUIDString;
}

export interface GetMovieByIdData {
  movie?: {
    id: UUIDString;
    title: string;
    imageUrl: string;
    genre?: string | null;
    metadata?: {
      rating?: number | null;
      releaseYear?: number | null;
      description?: string | null;
    };
      reviews: ({
        reviewText?: string | null;
        reviewDate: DateString;
        rating?: number | null;
        user: {
          id: string;
          username: string;
        } & User_Key;
      })[];
  } & Movie_Key;
}

export interface GetMovieByIdVariables {
  id: UUIDString;
}

export interface GetPlanByIdData {
  plan?: {
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
      planId: UUIDString;
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
    } & PlanPage_Key)[];
  } & Plan_Key;
}

export interface GetPlanByIdVariables {
  id: UUIDString;
}

export interface GetPlanPageByIdData {
  planPage?: {
    id: UUIDString;
    planId: UUIDString;
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
  } & PlanPage_Key;
}

export interface GetPlanPageByIdVariables {
  planId: UUIDString;
  pageId: UUIDString;
}

export interface ListMoviesData {
  movies: ({
    id: UUIDString;
    title: string;
    imageUrl: string;
    genre?: string | null;
  } & Movie_Key)[];
}

export interface ListPlansByOwnerData {
  plans: ({
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
  } & Plan_Key)[];
}

export interface ListPlansByOwnerVariables {
  ownerId: string;
}

export interface ListUserReviewsData {
  user?: {
    id: string;
    username: string;
    reviews: ({
      rating?: number | null;
      reviewDate: DateString;
      reviewText?: string | null;
      movie: {
        id: UUIDString;
        title: string;
      } & Movie_Key;
    })[];
  } & User_Key;
}

export interface ListUsersData {
  users: ({
    id: string;
    username: string;
  } & User_Key)[];
}

export interface MovieMetadata_Key {
  id: UUIDString;
  __typename?: 'MovieMetadata_Key';
}

export interface Movie_Key {
  id: UUIDString;
  __typename?: 'Movie_Key';
}

export interface PlanPage_Key {
  id: UUIDString;
  __typename?: 'PlanPage_Key';
}

export interface Plan_Key {
  id: UUIDString;
  __typename?: 'Plan_Key';
}

export interface RenamePlanData {
  plan_update?: Plan_Key | null;
}

export interface RenamePlanVariables {
  id: UUIDString;
  name: string;
}

export interface Review_Key {
  userId: string;
  movieId: UUIDString;
  __typename?: 'Review_Key';
}

export interface SearchMovieData {
  movies: ({
    id: UUIDString;
    title: string;
    genre?: string | null;
    imageUrl: string;
  } & Movie_Key)[];
}

export interface SearchMovieVariables {
  titleInput?: string | null;
  genre?: string | null;
}

export interface TouchPlanData {
  plan_update?: Plan_Key | null;
}

export interface TouchPlanVariables {
  id: UUIDString;
  status?: string | null;
  processingError?: string | null;
}

export interface UpdatePlanPageData {
  planPage_update?: PlanPage_Key | null;
}

export interface UpdatePlanPageVariables {
  id: UUIDString;
  overlayJson?: string | null;
  scaleMmPerPx?: number | null;
  ceilingHeightMm?: number | null;
  referencePointsJson?: string | null;
  referenceLengthMm?: number | null;
}

export interface UpdatePlanPagesData {
  planPage_updateMany: number;
}

export interface UpdatePlanPagesVariables {
  planId: UUIDString;
  scaleMmPerPx?: number | null;
  ceilingHeightMm?: number | null;
}

export interface UpsertUserData {
  user_upsert: User_Key;
}

export interface UpsertUserVariables {
  username: string;
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

/** Generated Node Admin SDK operation action function for the 'CreateMovie' Mutation. Allow users to execute without passing in DataConnect. */
export function createMovie(dc: DataConnect, vars: CreateMovieVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateMovieData>>;
/** Generated Node Admin SDK operation action function for the 'CreateMovie' Mutation. Allow users to pass in custom DataConnect instances. */
export function createMovie(vars: CreateMovieVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateMovieData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteMovie' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteMovie(dc: DataConnect, vars: DeleteMovieVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteMovieData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteMovie' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteMovie(vars: DeleteMovieVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteMovieData>>;

/** Generated Node Admin SDK operation action function for the 'UpsertUser' Mutation. Allow users to execute without passing in DataConnect. */
export function upsertUser(dc: DataConnect, vars: UpsertUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertUserData>>;
/** Generated Node Admin SDK operation action function for the 'UpsertUser' Mutation. Allow users to pass in custom DataConnect instances. */
export function upsertUser(vars: UpsertUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertUserData>>;

/** Generated Node Admin SDK operation action function for the 'AddReview' Mutation. Allow users to execute without passing in DataConnect. */
export function addReview(dc: DataConnect, vars: AddReviewVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AddReviewData>>;
/** Generated Node Admin SDK operation action function for the 'AddReview' Mutation. Allow users to pass in custom DataConnect instances. */
export function addReview(vars: AddReviewVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AddReviewData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteReview' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteReview(dc: DataConnect, vars: DeleteReviewVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteReviewData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteReview' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteReview(vars: DeleteReviewVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteReviewData>>;

/** Generated Node Admin SDK operation action function for the 'CreatePlanFromUpload' Mutation. Allow users to execute without passing in DataConnect. */
export function createPlanFromUpload(dc: DataConnect, vars: CreatePlanFromUploadVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreatePlanFromUploadData>>;
/** Generated Node Admin SDK operation action function for the 'CreatePlanFromUpload' Mutation. Allow users to pass in custom DataConnect instances. */
export function createPlanFromUpload(vars: CreatePlanFromUploadVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreatePlanFromUploadData>>;

/** Generated Node Admin SDK operation action function for the 'RenamePlan' Mutation. Allow users to execute without passing in DataConnect. */
export function renamePlan(dc: DataConnect, vars: RenamePlanVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RenamePlanData>>;
/** Generated Node Admin SDK operation action function for the 'RenamePlan' Mutation. Allow users to pass in custom DataConnect instances. */
export function renamePlan(vars: RenamePlanVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RenamePlanData>>;

/** Generated Node Admin SDK operation action function for the 'TouchPlan' Mutation. Allow users to execute without passing in DataConnect. */
export function touchPlan(dc: DataConnect, vars: TouchPlanVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<TouchPlanData>>;
/** Generated Node Admin SDK operation action function for the 'TouchPlan' Mutation. Allow users to pass in custom DataConnect instances. */
export function touchPlan(vars: TouchPlanVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<TouchPlanData>>;

/** Generated Node Admin SDK operation action function for the 'DeletePlanPages' Mutation. Allow users to execute without passing in DataConnect. */
export function deletePlanPages(dc: DataConnect, vars: DeletePlanPagesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeletePlanPagesData>>;
/** Generated Node Admin SDK operation action function for the 'DeletePlanPages' Mutation. Allow users to pass in custom DataConnect instances. */
export function deletePlanPages(vars: DeletePlanPagesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeletePlanPagesData>>;

/** Generated Node Admin SDK operation action function for the 'DeletePlan' Mutation. Allow users to execute without passing in DataConnect. */
export function deletePlan(dc: DataConnect, vars: DeletePlanVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeletePlanData>>;
/** Generated Node Admin SDK operation action function for the 'DeletePlan' Mutation. Allow users to pass in custom DataConnect instances. */
export function deletePlan(vars: DeletePlanVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeletePlanData>>;

/** Generated Node Admin SDK operation action function for the 'CreatePlanPage' Mutation. Allow users to execute without passing in DataConnect. */
export function createPlanPage(dc: DataConnect, vars: CreatePlanPageVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreatePlanPageData>>;
/** Generated Node Admin SDK operation action function for the 'CreatePlanPage' Mutation. Allow users to pass in custom DataConnect instances. */
export function createPlanPage(vars: CreatePlanPageVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreatePlanPageData>>;

/** Generated Node Admin SDK operation action function for the 'UpdatePlanPage' Mutation. Allow users to execute without passing in DataConnect. */
export function updatePlanPage(dc: DataConnect, vars: UpdatePlanPageVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdatePlanPageData>>;
/** Generated Node Admin SDK operation action function for the 'UpdatePlanPage' Mutation. Allow users to pass in custom DataConnect instances. */
export function updatePlanPage(vars: UpdatePlanPageVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdatePlanPageData>>;

/** Generated Node Admin SDK operation action function for the 'UpdatePlanPages' Mutation. Allow users to execute without passing in DataConnect. */
export function updatePlanPages(dc: DataConnect, vars: UpdatePlanPagesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdatePlanPagesData>>;
/** Generated Node Admin SDK operation action function for the 'UpdatePlanPages' Mutation. Allow users to pass in custom DataConnect instances. */
export function updatePlanPages(vars: UpdatePlanPagesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdatePlanPagesData>>;

/** Generated Node Admin SDK operation action function for the 'ListMovies' Query. Allow users to execute without passing in DataConnect. */
export function listMovies(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListMoviesData>>;
/** Generated Node Admin SDK operation action function for the 'ListMovies' Query. Allow users to pass in custom DataConnect instances. */
export function listMovies(options?: OperationOptions): Promise<ExecuteOperationResponse<ListMoviesData>>;

/** Generated Node Admin SDK operation action function for the 'ListUsers' Query. Allow users to execute without passing in DataConnect. */
export function listUsers(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListUsersData>>;
/** Generated Node Admin SDK operation action function for the 'ListUsers' Query. Allow users to pass in custom DataConnect instances. */
export function listUsers(options?: OperationOptions): Promise<ExecuteOperationResponse<ListUsersData>>;

/** Generated Node Admin SDK operation action function for the 'ListUserReviews' Query. Allow users to execute without passing in DataConnect. */
export function listUserReviews(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListUserReviewsData>>;
/** Generated Node Admin SDK operation action function for the 'ListUserReviews' Query. Allow users to pass in custom DataConnect instances. */
export function listUserReviews(options?: OperationOptions): Promise<ExecuteOperationResponse<ListUserReviewsData>>;

/** Generated Node Admin SDK operation action function for the 'GetMovieById' Query. Allow users to execute without passing in DataConnect. */
export function getMovieById(dc: DataConnect, vars: GetMovieByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetMovieByIdData>>;
/** Generated Node Admin SDK operation action function for the 'GetMovieById' Query. Allow users to pass in custom DataConnect instances. */
export function getMovieById(vars: GetMovieByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetMovieByIdData>>;

/** Generated Node Admin SDK operation action function for the 'SearchMovie' Query. Allow users to execute without passing in DataConnect. */
export function searchMovie(dc: DataConnect, vars?: SearchMovieVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<SearchMovieData>>;
/** Generated Node Admin SDK operation action function for the 'SearchMovie' Query. Allow users to pass in custom DataConnect instances. */
export function searchMovie(vars?: SearchMovieVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<SearchMovieData>>;

/** Generated Node Admin SDK operation action function for the 'ListPlansByOwner' Query. Allow users to execute without passing in DataConnect. */
export function listPlansByOwner(dc: DataConnect, vars: ListPlansByOwnerVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListPlansByOwnerData>>;
/** Generated Node Admin SDK operation action function for the 'ListPlansByOwner' Query. Allow users to pass in custom DataConnect instances. */
export function listPlansByOwner(vars: ListPlansByOwnerVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListPlansByOwnerData>>;

/** Generated Node Admin SDK operation action function for the 'GetPlanById' Query. Allow users to execute without passing in DataConnect. */
export function getPlanById(dc: DataConnect, vars: GetPlanByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPlanByIdData>>;
/** Generated Node Admin SDK operation action function for the 'GetPlanById' Query. Allow users to pass in custom DataConnect instances. */
export function getPlanById(vars: GetPlanByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPlanByIdData>>;

/** Generated Node Admin SDK operation action function for the 'GetPlanPageById' Query. Allow users to execute without passing in DataConnect. */
export function getPlanPageById(dc: DataConnect, vars: GetPlanPageByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPlanPageByIdData>>;
/** Generated Node Admin SDK operation action function for the 'GetPlanPageById' Query. Allow users to pass in custom DataConnect instances. */
export function getPlanPageById(vars: GetPlanPageByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPlanPageByIdData>>;

