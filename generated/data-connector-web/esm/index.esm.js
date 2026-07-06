import { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'data-connector',
  service: 'plaster-calculator',
  location: 'us-west1'
};
export const createAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAccount', inputVars);
}
createAccountRef.operationName = 'CreateAccount';

export function createAccount(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createAccountRef(dcInstance, inputVars));
}

export const updateAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAccount', inputVars);
}
updateAccountRef.operationName = 'UpdateAccount';

export function updateAccount(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateAccountRef(dcInstance, inputVars));
}

export const deleteAccountContactsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteAccountContacts', inputVars);
}
deleteAccountContactsRef.operationName = 'DeleteAccountContacts';

export function deleteAccountContacts(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteAccountContactsRef(dcInstance, inputVars));
}

export const deleteAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteAccount', inputVars);
}
deleteAccountRef.operationName = 'DeleteAccount';

export function deleteAccount(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteAccountRef(dcInstance, inputVars));
}

export const createAccountContactRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAccountContact', inputVars);
}
createAccountContactRef.operationName = 'CreateAccountContact';

export function createAccountContact(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createAccountContactRef(dcInstance, inputVars));
}

export const updateAccountContactRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAccountContact', inputVars);
}
updateAccountContactRef.operationName = 'UpdateAccountContact';

export function updateAccountContact(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateAccountContactRef(dcInstance, inputVars));
}

export const deleteAccountContactRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteAccountContact', inputVars);
}
deleteAccountContactRef.operationName = 'DeleteAccountContact';

export function deleteAccountContact(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteAccountContactRef(dcInstance, inputVars));
}

export const listAccountsByOwnerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAccountsByOwner', inputVars);
}
listAccountsByOwnerRef.operationName = 'ListAccountsByOwner';

export function listAccountsByOwner(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listAccountsByOwnerRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getAccountByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAccountById', inputVars);
}
getAccountByIdRef.operationName = 'GetAccountById';

export function getAccountById(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getAccountByIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listAccountContactsByAccountIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAccountContactsByAccountId', inputVars);
}
listAccountContactsByAccountIdRef.operationName = 'ListAccountContactsByAccountId';

export function listAccountContactsByAccountId(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listAccountContactsByAccountIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getAccountContactByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAccountContactById', inputVars);
}
getAccountContactByIdRef.operationName = 'GetAccountContactById';

export function getAccountContactById(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getAccountContactByIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const createProjectFromUploadRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProjectFromUpload', inputVars);
}
createProjectFromUploadRef.operationName = 'CreateProjectFromUpload';

export function createProjectFromUpload(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createProjectFromUploadRef(dcInstance, inputVars));
}

export const updateProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProject', inputVars);
}
updateProjectRef.operationName = 'UpdateProject';

export function updateProject(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateProjectRef(dcInstance, inputVars));
}

export const renameProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RenameProject', inputVars);
}
renameProjectRef.operationName = 'RenameProject';

export function renameProject(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(renameProjectRef(dcInstance, inputVars));
}

export const touchProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'TouchProject', inputVars);
}
touchProjectRef.operationName = 'TouchProject';

export function touchProject(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(touchProjectRef(dcInstance, inputVars));
}

export const deleteFloorplanPagesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteFloorplanPages', inputVars);
}
deleteFloorplanPagesRef.operationName = 'DeleteFloorplanPages';

export function deleteFloorplanPages(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteFloorplanPagesRef(dcInstance, inputVars));
}

export const deleteProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProject', inputVars);
}
deleteProjectRef.operationName = 'DeleteProject';

export function deleteProject(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteProjectRef(dcInstance, inputVars));
}

export const createFloorplanPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateFloorplanPage', inputVars);
}
createFloorplanPageRef.operationName = 'CreateFloorplanPage';

export function createFloorplanPage(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createFloorplanPageRef(dcInstance, inputVars));
}

export const updateFloorplanPageAnalysisRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateFloorplanPageAnalysis', inputVars);
}
updateFloorplanPageAnalysisRef.operationName = 'UpdateFloorplanPageAnalysis';

export function updateFloorplanPageAnalysis(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateFloorplanPageAnalysisRef(dcInstance, inputVars));
}

export const updateFloorplanPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateFloorplanPage', inputVars);
}
updateFloorplanPageRef.operationName = 'UpdateFloorplanPage';

export function updateFloorplanPage(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateFloorplanPageRef(dcInstance, inputVars));
}

export const updateFloorplanPagesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateFloorplanPages', inputVars);
}
updateFloorplanPagesRef.operationName = 'UpdateFloorplanPages';

export function updateFloorplanPages(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateFloorplanPagesRef(dcInstance, inputVars));
}

export const listProjectsByOwnerAndSalesStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjectsByOwnerAndSalesStatus', inputVars);
}
listProjectsByOwnerAndSalesStatusRef.operationName = 'ListProjectsByOwnerAndSalesStatus';

export function listProjectsByOwnerAndSalesStatus(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listProjectsByOwnerAndSalesStatusRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listProjectsByAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjectsByAccount', inputVars);
}
listProjectsByAccountRef.operationName = 'ListProjectsByAccount';

export function listProjectsByAccount(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listProjectsByAccountRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getProjectDetailsByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProjectDetailsById', inputVars);
}
getProjectDetailsByIdRef.operationName = 'GetProjectDetailsById';

export function getProjectDetailsById(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getProjectDetailsByIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getProjectByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProjectById', inputVars);
}
getProjectByIdRef.operationName = 'GetProjectById';

export function getProjectById(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getProjectByIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getFloorplanPageByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetFloorplanPageById', inputVars);
}
getFloorplanPageByIdRef.operationName = 'GetFloorplanPageById';

export function getFloorplanPageById(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getFloorplanPageByIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const createQuestionnaireTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuestionnaireTemplate', inputVars);
}
createQuestionnaireTemplateRef.operationName = 'CreateQuestionnaireTemplate';

export function createQuestionnaireTemplate(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createQuestionnaireTemplateRef(dcInstance, inputVars));
}

export const createQuestionnaireTemplateQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuestionnaireTemplateQuestion', inputVars);
}
createQuestionnaireTemplateQuestionRef.operationName = 'CreateQuestionnaireTemplateQuestion';

export function createQuestionnaireTemplateQuestion(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createQuestionnaireTemplateQuestionRef(dcInstance, inputVars));
}

export const updateQuestionnaireTemplateNameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateQuestionnaireTemplateName', inputVars);
}
updateQuestionnaireTemplateNameRef.operationName = 'UpdateQuestionnaireTemplateName';

export function updateQuestionnaireTemplateName(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateQuestionnaireTemplateNameRef(dcInstance, inputVars));
}

export const updateQuestionnaireTemplateQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateQuestionnaireTemplateQuestion', inputVars);
}
updateQuestionnaireTemplateQuestionRef.operationName = 'UpdateQuestionnaireTemplateQuestion';

export function updateQuestionnaireTemplateQuestion(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateQuestionnaireTemplateQuestionRef(dcInstance, inputVars));
}

export const deleteQuestionnaireTemplateQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteQuestionnaireTemplateQuestion', inputVars);
}
deleteQuestionnaireTemplateQuestionRef.operationName = 'DeleteQuestionnaireTemplateQuestion';

export function deleteQuestionnaireTemplateQuestion(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteQuestionnaireTemplateQuestionRef(dcInstance, inputVars));
}

export const deleteQuestionnaireTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteQuestionnaireTemplate', inputVars);
}
deleteQuestionnaireTemplateRef.operationName = 'DeleteQuestionnaireTemplate';

export function deleteQuestionnaireTemplate(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteQuestionnaireTemplateRef(dcInstance, inputVars));
}

export const createProjectQuestionnaireRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProjectQuestionnaire', inputVars);
}
createProjectQuestionnaireRef.operationName = 'CreateProjectQuestionnaire';

export function createProjectQuestionnaire(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createProjectQuestionnaireRef(dcInstance, inputVars));
}

export const createProjectQuestionnaireAnswerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProjectQuestionnaireAnswer', inputVars);
}
createProjectQuestionnaireAnswerRef.operationName = 'CreateProjectQuestionnaireAnswer';

export function createProjectQuestionnaireAnswer(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createProjectQuestionnaireAnswerRef(dcInstance, inputVars));
}

export const listQuestionnaireTemplatesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListQuestionnaireTemplates');
}
listQuestionnaireTemplatesRef.operationName = 'ListQuestionnaireTemplates';

export function listQuestionnaireTemplates(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listQuestionnaireTemplatesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getQuestionnaireTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuestionnaireTemplate', inputVars);
}
getQuestionnaireTemplateRef.operationName = 'GetQuestionnaireTemplate';

export function getQuestionnaireTemplate(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getQuestionnaireTemplateRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const createQuantitySourceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuantitySource', inputVars);
}
createQuantitySourceRef.operationName = 'CreateQuantitySource';

export function createQuantitySource(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createQuantitySourceRef(dcInstance, inputVars));
}

export const createQuoteItemTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuoteItemTemplate', inputVars);
}
createQuoteItemTemplateRef.operationName = 'CreateQuoteItemTemplate';

export function createQuoteItemTemplate(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createQuoteItemTemplateRef(dcInstance, inputVars));
}

export const updateQuoteItemTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateQuoteItemTemplate', inputVars);
}
updateQuoteItemTemplateRef.operationName = 'UpdateQuoteItemTemplate';

export function updateQuoteItemTemplate(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateQuoteItemTemplateRef(dcInstance, inputVars));
}

export const deleteQuoteItemTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteQuoteItemTemplate', inputVars);
}
deleteQuoteItemTemplateRef.operationName = 'DeleteQuoteItemTemplate';

export function deleteQuoteItemTemplate(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteQuoteItemTemplateRef(dcInstance, inputVars));
}

export const upsertQuoteItemTemplateConfigRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertQuoteItemTemplateConfig', inputVars);
}
upsertQuoteItemTemplateConfigRef.operationName = 'UpsertQuoteItemTemplateConfig';

export function upsertQuoteItemTemplateConfig(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertQuoteItemTemplateConfigRef(dcInstance, inputVars));
}

export const createSupplierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSupplier', inputVars);
}
createSupplierRef.operationName = 'CreateSupplier';

export function createSupplier(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createSupplierRef(dcInstance, inputVars));
}

export const updateSupplierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSupplier', inputVars);
}
updateSupplierRef.operationName = 'UpdateSupplier';

export function updateSupplier(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateSupplierRef(dcInstance, inputVars));
}

export const deleteSupplierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteSupplier', inputVars);
}
deleteSupplierRef.operationName = 'DeleteSupplier';

export function deleteSupplier(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteSupplierRef(dcInstance, inputVars));
}

export const upsertSupplierQuoteItemPriceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertSupplierQuoteItemPrice', inputVars);
}
upsertSupplierQuoteItemPriceRef.operationName = 'UpsertSupplierQuoteItemPrice';

export function upsertSupplierQuoteItemPrice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertSupplierQuoteItemPriceRef(dcInstance, inputVars));
}

export const deleteSupplierQuoteItemPriceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteSupplierQuoteItemPrice', inputVars);
}
deleteSupplierQuoteItemPriceRef.operationName = 'DeleteSupplierQuoteItemPrice';

export function deleteSupplierQuoteItemPrice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteSupplierQuoteItemPriceRef(dcInstance, inputVars));
}

export const createQuoteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuote', inputVars);
}
createQuoteRef.operationName = 'CreateQuote';

export function createQuote(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createQuoteRef(dcInstance, inputVars));
}

export const updateQuoteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateQuote', inputVars);
}
updateQuoteRef.operationName = 'UpdateQuote';

export function updateQuote(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateQuoteRef(dcInstance, inputVars));
}

export const deleteQuoteItemsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteQuoteItems', inputVars);
}
deleteQuoteItemsRef.operationName = 'DeleteQuoteItems';

export function deleteQuoteItems(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteQuoteItemsRef(dcInstance, inputVars));
}

export const createQuoteItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuoteItem', inputVars);
}
createQuoteItemRef.operationName = 'CreateQuoteItem';

export function createQuoteItem(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createQuoteItemRef(dcInstance, inputVars));
}

export const updateQuoteItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateQuoteItem', inputVars);
}
updateQuoteItemRef.operationName = 'UpdateQuoteItem';

export function updateQuoteItem(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateQuoteItemRef(dcInstance, inputVars));
}

export const createReminderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateReminder', inputVars);
}
createReminderRef.operationName = 'CreateReminder';

export function createReminder(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createReminderRef(dcInstance, inputVars));
}

export const updateReminderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateReminder', inputVars);
}
updateReminderRef.operationName = 'UpdateReminder';

export function updateReminder(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateReminderRef(dcInstance, inputVars));
}

export const listDueRemindersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListDueReminders', inputVars);
}
listDueRemindersRef.operationName = 'ListDueReminders';

export function listDueReminders(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listDueRemindersRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listProjectRemindersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjectReminders', inputVars);
}
listProjectRemindersRef.operationName = 'ListProjectReminders';

export function listProjectReminders(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listProjectRemindersRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getReminderByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetReminderById', inputVars);
}
getReminderByIdRef.operationName = 'GetReminderById';

export function getReminderById(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getReminderByIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const upsertUserSettingsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUserSettings', inputVars);
}
upsertUserSettingsRef.operationName = 'UpsertUserSettings';

export function upsertUserSettings(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertUserSettingsRef(dcInstance, inputVars));
}

export const getUserSettingsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserSettings', inputVars);
}
getUserSettingsRef.operationName = 'GetUserSettings';

export function getUserSettings(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserSettingsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

