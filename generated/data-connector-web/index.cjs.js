const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'data-connector-web',
  service: 'plaster-calculator',
  location: 'us-west1'
};
exports.connectorConfig = connectorConfig;

const createMyCompanyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMyCompany', inputVars);
}
createMyCompanyRef.operationName = 'CreateMyCompany';
exports.createMyCompanyRef = createMyCompanyRef;

exports.createMyCompany = function createMyCompany(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createMyCompanyRef(dcInstance, inputVars));
}
;

const updateMyCompanyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMyCompany', inputVars);
}
updateMyCompanyRef.operationName = 'UpdateMyCompany';
exports.updateMyCompanyRef = updateMyCompanyRef;

exports.updateMyCompany = function updateMyCompany(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateMyCompanyRef(dcInstance, inputVars));
}
;

const setMyCompanyPrimaryContactRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetMyCompanyPrimaryContact', inputVars);
}
setMyCompanyPrimaryContactRef.operationName = 'SetMyCompanyPrimaryContact';
exports.setMyCompanyPrimaryContactRef = setMyCompanyPrimaryContactRef;

exports.setMyCompanyPrimaryContact = function setMyCompanyPrimaryContact(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(setMyCompanyPrimaryContactRef(dcInstance, inputVars));
}
;

const clearMyCompanyPrimaryContactRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ClearMyCompanyPrimaryContact', inputVars);
}
clearMyCompanyPrimaryContactRef.operationName = 'ClearMyCompanyPrimaryContact';
exports.clearMyCompanyPrimaryContactRef = clearMyCompanyPrimaryContactRef;

exports.clearMyCompanyPrimaryContact = function clearMyCompanyPrimaryContact(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(clearMyCompanyPrimaryContactRef(dcInstance, inputVars));
}
;

const deleteMyCompanyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteMyCompany', inputVars);
}
deleteMyCompanyRef.operationName = 'DeleteMyCompany';
exports.deleteMyCompanyRef = deleteMyCompanyRef;

exports.deleteMyCompany = function deleteMyCompany(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteMyCompanyRef(dcInstance, inputVars));
}
;

const createMyCompanyContactRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMyCompanyContact', inputVars);
}
createMyCompanyContactRef.operationName = 'CreateMyCompanyContact';
exports.createMyCompanyContactRef = createMyCompanyContactRef;

exports.createMyCompanyContact = function createMyCompanyContact(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createMyCompanyContactRef(dcInstance, inputVars));
}
;

const updateMyCompanyContactRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMyCompanyContact', inputVars);
}
updateMyCompanyContactRef.operationName = 'UpdateMyCompanyContact';
exports.updateMyCompanyContactRef = updateMyCompanyContactRef;

exports.updateMyCompanyContact = function updateMyCompanyContact(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateMyCompanyContactRef(dcInstance, inputVars));
}
;

const deleteMyCompanyContactRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteMyCompanyContact', inputVars);
}
deleteMyCompanyContactRef.operationName = 'DeleteMyCompanyContact';
exports.deleteMyCompanyContactRef = deleteMyCompanyContactRef;

exports.deleteMyCompanyContact = function deleteMyCompanyContact(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteMyCompanyContactRef(dcInstance, inputVars));
}
;

const listMyCompaniesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyCompanies');
}
listMyCompaniesRef.operationName = 'ListMyCompanies';
exports.listMyCompaniesRef = listMyCompaniesRef;

exports.listMyCompanies = function listMyCompanies(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listMyCompaniesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getMyCompanyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyCompany', inputVars);
}
getMyCompanyRef.operationName = 'GetMyCompany';
exports.getMyCompanyRef = getMyCompanyRef;

exports.getMyCompany = function getMyCompany(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getMyCompanyRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listMyCompanyContactsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyCompanyContacts', inputVars);
}
listMyCompanyContactsRef.operationName = 'ListMyCompanyContacts';
exports.listMyCompanyContactsRef = listMyCompanyContactsRef;

exports.listMyCompanyContacts = function listMyCompanyContacts(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listMyCompanyContactsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
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

const ensureSystemQuoteItemTemplatesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EnsureSystemQuoteItemTemplates');
}
ensureSystemQuoteItemTemplatesRef.operationName = 'EnsureSystemQuoteItemTemplates';
exports.ensureSystemQuoteItemTemplatesRef = ensureSystemQuoteItemTemplatesRef;

exports.ensureSystemQuoteItemTemplates = function ensureSystemQuoteItemTemplates(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(ensureSystemQuoteItemTemplatesRef(dcInstance, inputVars));
}
;

const createQuoteTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuoteTemplate', inputVars);
}
createQuoteTemplateRef.operationName = 'CreateQuoteTemplate';
exports.createQuoteTemplateRef = createQuoteTemplateRef;

exports.createQuoteTemplate = function createQuoteTemplate(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createQuoteTemplateRef(dcInstance, inputVars));
}
;

const createQuoteItemTemplateConfigRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuoteItemTemplateConfig', inputVars);
}
createQuoteItemTemplateConfigRef.operationName = 'CreateQuoteItemTemplateConfig';
exports.createQuoteItemTemplateConfigRef = createQuoteItemTemplateConfigRef;

exports.createQuoteItemTemplateConfig = function createQuoteItemTemplateConfig(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createQuoteItemTemplateConfigRef(dcInstance, inputVars));
}
;

const updateQuoteItemTemplateConfigRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateQuoteItemTemplateConfig', inputVars);
}
updateQuoteItemTemplateConfigRef.operationName = 'UpdateQuoteItemTemplateConfig';
exports.updateQuoteItemTemplateConfigRef = updateQuoteItemTemplateConfigRef;

exports.updateQuoteItemTemplateConfig = function updateQuoteItemTemplateConfig(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateQuoteItemTemplateConfigRef(dcInstance, inputVars));
}
;

const createQuoteItemTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuoteItemTemplate', inputVars);
}
createQuoteItemTemplateRef.operationName = 'CreateQuoteItemTemplate';
exports.createQuoteItemTemplateRef = createQuoteItemTemplateRef;

exports.createQuoteItemTemplate = function createQuoteItemTemplate(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createQuoteItemTemplateRef(dcInstance, inputVars));
}
;

const updateQuoteItemTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateQuoteItemTemplate', inputVars);
}
updateQuoteItemTemplateRef.operationName = 'UpdateQuoteItemTemplate';
exports.updateQuoteItemTemplateRef = updateQuoteItemTemplateRef;

exports.updateQuoteItemTemplate = function updateQuoteItemTemplate(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateQuoteItemTemplateRef(dcInstance, inputVars));
}
;

const deleteQuoteItemTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteQuoteItemTemplate', inputVars);
}
deleteQuoteItemTemplateRef.operationName = 'DeleteQuoteItemTemplate';
exports.deleteQuoteItemTemplateRef = deleteQuoteItemTemplateRef;

exports.deleteQuoteItemTemplate = function deleteQuoteItemTemplate(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteQuoteItemTemplateRef(dcInstance, inputVars));
}
;

const listQuoteItemTemplatesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListQuoteItemTemplates');
}
listQuoteItemTemplatesRef.operationName = 'ListQuoteItemTemplates';
exports.listQuoteItemTemplatesRef = listQuoteItemTemplatesRef;

exports.listQuoteItemTemplates = function listQuoteItemTemplates(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listQuoteItemTemplatesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listQuoteTemplatesForTeamRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListQuoteTemplatesForTeam');
}
listQuoteTemplatesForTeamRef.operationName = 'ListQuoteTemplatesForTeam';
exports.listQuoteTemplatesForTeamRef = listQuoteTemplatesForTeamRef;

exports.listQuoteTemplatesForTeam = function listQuoteTemplatesForTeam(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listQuoteTemplatesForTeamRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listQuoteItemTemplateConfigsForQuoteTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListQuoteItemTemplateConfigsForQuoteTemplate', inputVars);
}
listQuoteItemTemplateConfigsForQuoteTemplateRef.operationName = 'ListQuoteItemTemplateConfigsForQuoteTemplate';
exports.listQuoteItemTemplateConfigsForQuoteTemplateRef = listQuoteItemTemplateConfigsForQuoteTemplateRef;

exports.listQuoteItemTemplateConfigsForQuoteTemplate = function listQuoteItemTemplateConfigsForQuoteTemplate(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listQuoteItemTemplateConfigsForQuoteTemplateRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getMyTeamRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyTeam');
}
getMyTeamRef.operationName = 'GetMyTeam';
exports.getMyTeamRef = getMyTeamRef;

exports.getMyTeam = function getMyTeam(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getMyTeamRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
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

const upsertMyUserSignatureRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertMyUserSignature', inputVars);
}
upsertMyUserSignatureRef.operationName = 'UpsertMyUserSignature';
exports.upsertMyUserSignatureRef = upsertMyUserSignatureRef;

exports.upsertMyUserSignature = function upsertMyUserSignature(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars);
  return executeMutation(upsertMyUserSignatureRef(dcInstance, inputVars));
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

const getMyUserSignatureRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyUserSignature');
}
getMyUserSignatureRef.operationName = 'GetMyUserSignature';
exports.getMyUserSignatureRef = getMyUserSignatureRef;

exports.getMyUserSignature = function getMyUserSignature(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getMyUserSignatureRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;
