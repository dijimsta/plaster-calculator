const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'data-connector-web',
  service: 'plaster-calculator',
  location: 'us-west1'
};
exports.connectorConfig = connectorConfig;

const createMyAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMyAccount', inputVars);
}
createMyAccountRef.operationName = 'CreateMyAccount';
exports.createMyAccountRef = createMyAccountRef;

exports.createMyAccount = function createMyAccount(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createMyAccountRef(dcInstance, inputVars));
}
;

const updateMyAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMyAccount', inputVars);
}
updateMyAccountRef.operationName = 'UpdateMyAccount';
exports.updateMyAccountRef = updateMyAccountRef;

exports.updateMyAccount = function updateMyAccount(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateMyAccountRef(dcInstance, inputVars));
}
;

const setMyAccountPrimaryContactRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetMyAccountPrimaryContact', inputVars);
}
setMyAccountPrimaryContactRef.operationName = 'SetMyAccountPrimaryContact';
exports.setMyAccountPrimaryContactRef = setMyAccountPrimaryContactRef;

exports.setMyAccountPrimaryContact = function setMyAccountPrimaryContact(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(setMyAccountPrimaryContactRef(dcInstance, inputVars));
}
;

const clearMyAccountPrimaryContactRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ClearMyAccountPrimaryContact', inputVars);
}
clearMyAccountPrimaryContactRef.operationName = 'ClearMyAccountPrimaryContact';
exports.clearMyAccountPrimaryContactRef = clearMyAccountPrimaryContactRef;

exports.clearMyAccountPrimaryContact = function clearMyAccountPrimaryContact(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(clearMyAccountPrimaryContactRef(dcInstance, inputVars));
}
;

const deleteMyAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteMyAccount', inputVars);
}
deleteMyAccountRef.operationName = 'DeleteMyAccount';
exports.deleteMyAccountRef = deleteMyAccountRef;

exports.deleteMyAccount = function deleteMyAccount(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteMyAccountRef(dcInstance, inputVars));
}
;

const createMyAccountContactRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMyAccountContact', inputVars);
}
createMyAccountContactRef.operationName = 'CreateMyAccountContact';
exports.createMyAccountContactRef = createMyAccountContactRef;

exports.createMyAccountContact = function createMyAccountContact(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createMyAccountContactRef(dcInstance, inputVars));
}
;

const updateMyAccountContactRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMyAccountContact', inputVars);
}
updateMyAccountContactRef.operationName = 'UpdateMyAccountContact';
exports.updateMyAccountContactRef = updateMyAccountContactRef;

exports.updateMyAccountContact = function updateMyAccountContact(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateMyAccountContactRef(dcInstance, inputVars));
}
;

const deleteMyAccountContactRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteMyAccountContact', inputVars);
}
deleteMyAccountContactRef.operationName = 'DeleteMyAccountContact';
exports.deleteMyAccountContactRef = deleteMyAccountContactRef;

exports.deleteMyAccountContact = function deleteMyAccountContact(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteMyAccountContactRef(dcInstance, inputVars));
}
;

const listMyAccountsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyAccounts');
}
listMyAccountsRef.operationName = 'ListMyAccounts';
exports.listMyAccountsRef = listMyAccountsRef;

exports.listMyAccounts = function listMyAccounts(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listMyAccountsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getMyAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyAccount', inputVars);
}
getMyAccountRef.operationName = 'GetMyAccount';
exports.getMyAccountRef = getMyAccountRef;

exports.getMyAccount = function getMyAccount(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getMyAccountRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listMyAccountContactsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyAccountContacts', inputVars);
}
listMyAccountContactsRef.operationName = 'ListMyAccountContacts';
exports.listMyAccountContactsRef = listMyAccountContactsRef;

exports.listMyAccountContacts = function listMyAccountContacts(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listMyAccountContactsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createQuestionnaireTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuestionnaireTemplate', inputVars);
}
createQuestionnaireTemplateRef.operationName = 'CreateQuestionnaireTemplate';
exports.createQuestionnaireTemplateRef = createQuestionnaireTemplateRef;

exports.createQuestionnaireTemplate = function createQuestionnaireTemplate(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createQuestionnaireTemplateRef(dcInstance, inputVars));
}
;

const createQuestionnaireTemplateQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuestionnaireTemplateQuestion', inputVars);
}
createQuestionnaireTemplateQuestionRef.operationName = 'CreateQuestionnaireTemplateQuestion';
exports.createQuestionnaireTemplateQuestionRef = createQuestionnaireTemplateQuestionRef;

exports.createQuestionnaireTemplateQuestion = function createQuestionnaireTemplateQuestion(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createQuestionnaireTemplateQuestionRef(dcInstance, inputVars));
}
;

const updateQuestionnaireTemplateNameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateQuestionnaireTemplateName', inputVars);
}
updateQuestionnaireTemplateNameRef.operationName = 'UpdateQuestionnaireTemplateName';
exports.updateQuestionnaireTemplateNameRef = updateQuestionnaireTemplateNameRef;

exports.updateQuestionnaireTemplateName = function updateQuestionnaireTemplateName(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateQuestionnaireTemplateNameRef(dcInstance, inputVars));
}
;

const updateQuestionnaireTemplateQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateQuestionnaireTemplateQuestion', inputVars);
}
updateQuestionnaireTemplateQuestionRef.operationName = 'UpdateQuestionnaireTemplateQuestion';
exports.updateQuestionnaireTemplateQuestionRef = updateQuestionnaireTemplateQuestionRef;

exports.updateQuestionnaireTemplateQuestion = function updateQuestionnaireTemplateQuestion(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateQuestionnaireTemplateQuestionRef(dcInstance, inputVars));
}
;

const deleteQuestionnaireTemplateQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteQuestionnaireTemplateQuestion', inputVars);
}
deleteQuestionnaireTemplateQuestionRef.operationName = 'DeleteQuestionnaireTemplateQuestion';
exports.deleteQuestionnaireTemplateQuestionRef = deleteQuestionnaireTemplateQuestionRef;

exports.deleteQuestionnaireTemplateQuestion = function deleteQuestionnaireTemplateQuestion(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteQuestionnaireTemplateQuestionRef(dcInstance, inputVars));
}
;

const deleteQuestionnaireTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteQuestionnaireTemplate', inputVars);
}
deleteQuestionnaireTemplateRef.operationName = 'DeleteQuestionnaireTemplate';
exports.deleteQuestionnaireTemplateRef = deleteQuestionnaireTemplateRef;

exports.deleteQuestionnaireTemplate = function deleteQuestionnaireTemplate(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteQuestionnaireTemplateRef(dcInstance, inputVars));
}
;

const ensureProjectQuestionnaireRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EnsureProjectQuestionnaire', inputVars);
}
ensureProjectQuestionnaireRef.operationName = 'EnsureProjectQuestionnaire';
exports.ensureProjectQuestionnaireRef = ensureProjectQuestionnaireRef;

exports.ensureProjectQuestionnaire = function ensureProjectQuestionnaire(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(ensureProjectQuestionnaireRef(dcInstance, inputVars));
}
;

const applyQuestionnaireTemplateToProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ApplyQuestionnaireTemplateToProject', inputVars);
}
applyQuestionnaireTemplateToProjectRef.operationName = 'ApplyQuestionnaireTemplateToProject';
exports.applyQuestionnaireTemplateToProjectRef = applyQuestionnaireTemplateToProjectRef;

exports.applyQuestionnaireTemplateToProject = function applyQuestionnaireTemplateToProject(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(applyQuestionnaireTemplateToProjectRef(dcInstance, inputVars));
}
;

const createProjectQuestionnaireQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProjectQuestionnaireQuestion', inputVars);
}
createProjectQuestionnaireQuestionRef.operationName = 'CreateProjectQuestionnaireQuestion';
exports.createProjectQuestionnaireQuestionRef = createProjectQuestionnaireQuestionRef;

exports.createProjectQuestionnaireQuestion = function createProjectQuestionnaireQuestion(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createProjectQuestionnaireQuestionRef(dcInstance, inputVars));
}
;

const updateProjectQuestionnaireQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProjectQuestionnaireQuestion', inputVars);
}
updateProjectQuestionnaireQuestionRef.operationName = 'UpdateProjectQuestionnaireQuestion';
exports.updateProjectQuestionnaireQuestionRef = updateProjectQuestionnaireQuestionRef;

exports.updateProjectQuestionnaireQuestion = function updateProjectQuestionnaireQuestion(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateProjectQuestionnaireQuestionRef(dcInstance, inputVars));
}
;

const updateProjectQuestionnaireQuestionAnswerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProjectQuestionnaireQuestionAnswer', inputVars);
}
updateProjectQuestionnaireQuestionAnswerRef.operationName = 'UpdateProjectQuestionnaireQuestionAnswer';
exports.updateProjectQuestionnaireQuestionAnswerRef = updateProjectQuestionnaireQuestionAnswerRef;

exports.updateProjectQuestionnaireQuestionAnswer = function updateProjectQuestionnaireQuestionAnswer(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateProjectQuestionnaireQuestionAnswerRef(dcInstance, inputVars));
}
;

const updateProjectQuestionnaireQuestionAnswerSourceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProjectQuestionnaireQuestionAnswerSource', inputVars);
}
updateProjectQuestionnaireQuestionAnswerSourceRef.operationName = 'UpdateProjectQuestionnaireQuestionAnswerSource';
exports.updateProjectQuestionnaireQuestionAnswerSourceRef = updateProjectQuestionnaireQuestionAnswerSourceRef;

exports.updateProjectQuestionnaireQuestionAnswerSource = function updateProjectQuestionnaireQuestionAnswerSource(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateProjectQuestionnaireQuestionAnswerSourceRef(dcInstance, inputVars));
}
;

const deleteProjectQuestionnaireQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProjectQuestionnaireQuestion', inputVars);
}
deleteProjectQuestionnaireQuestionRef.operationName = 'DeleteProjectQuestionnaireQuestion';
exports.deleteProjectQuestionnaireQuestionRef = deleteProjectQuestionnaireQuestionRef;

exports.deleteProjectQuestionnaireQuestion = function deleteProjectQuestionnaireQuestion(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteProjectQuestionnaireQuestionRef(dcInstance, inputVars));
}
;

const listQuestionnaireTemplatesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListQuestionnaireTemplates');
}
listQuestionnaireTemplatesRef.operationName = 'ListQuestionnaireTemplates';
exports.listQuestionnaireTemplatesRef = listQuestionnaireTemplatesRef;

exports.listQuestionnaireTemplates = function listQuestionnaireTemplates(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listQuestionnaireTemplatesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getQuestionnaireTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuestionnaireTemplate', inputVars);
}
getQuestionnaireTemplateRef.operationName = 'GetQuestionnaireTemplate';
exports.getQuestionnaireTemplateRef = getQuestionnaireTemplateRef;

exports.getQuestionnaireTemplate = function getQuestionnaireTemplate(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getQuestionnaireTemplateRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listProjectQuestionnairesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjectQuestionnaires');
}
listProjectQuestionnairesRef.operationName = 'ListProjectQuestionnaires';
exports.listProjectQuestionnairesRef = listProjectQuestionnairesRef;

exports.listProjectQuestionnaires = function listProjectQuestionnaires(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listProjectQuestionnairesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getProjectQuestionnaireRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProjectQuestionnaire', inputVars);
}
getProjectQuestionnaireRef.operationName = 'GetProjectQuestionnaire';
exports.getProjectQuestionnaireRef = getProjectQuestionnaireRef;

exports.getProjectQuestionnaire = function getProjectQuestionnaire(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getProjectQuestionnaireRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const upsertMyUserSettingsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertMyUserSettings', inputVars);
}
upsertMyUserSettingsRef.operationName = 'UpsertMyUserSettings';
exports.upsertMyUserSettingsRef = upsertMyUserSettingsRef;

exports.upsertMyUserSettings = function upsertMyUserSettings(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertMyUserSettingsRef(dcInstance, inputVars));
}
;

const getMyUserSettingsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyUserSettings');
}
getMyUserSettingsRef.operationName = 'GetMyUserSettings';
exports.getMyUserSettingsRef = getMyUserSettingsRef;

exports.getMyUserSettings = function getMyUserSettings(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getMyUserSettingsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;
