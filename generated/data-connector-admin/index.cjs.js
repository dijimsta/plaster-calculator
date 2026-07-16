const { validateAdminArgs } = require('firebase-admin/data-connect');

const connectorConfig = {
  connector: 'data-connector-admin',
  serviceId: 'plaster-calculator',
  location: 'us-west1'
};
exports.connectorConfig = connectorConfig;

function getAccountById(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetAccountById', inputVars, inputOpts);
}
exports.getAccountById = getAccountById;

function getAccountContactById(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetAccountContactById', inputVars, inputOpts);
}
exports.getAccountContactById = getAccountContactById;

function createProjectFromUpload(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateProjectFromUpload', inputVars, inputOpts);
}
exports.createProjectFromUpload = createProjectFromUpload;

function updateProject(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateProject', inputVars, inputOpts);
}
exports.updateProject = updateProject;

function renameProject(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('RenameProject', inputVars, inputOpts);
}
exports.renameProject = renameProject;

function touchProject(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('TouchProject', inputVars, inputOpts);
}
exports.touchProject = touchProject;

function updateProjectExtractedText(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateProjectExtractedText', inputVars, inputOpts);
}
exports.updateProjectExtractedText = updateProjectExtractedText;

function deleteFloorplanPages(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('DeleteFloorplanPages', inputVars, inputOpts);
}
exports.deleteFloorplanPages = deleteFloorplanPages;

function deleteProject(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('DeleteProject', inputVars, inputOpts);
}
exports.deleteProject = deleteProject;

function createFloorplanPage(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateFloorplanPage', inputVars, inputOpts);
}
exports.createFloorplanPage = createFloorplanPage;

function updateFloorplanPageAnalysis(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateFloorplanPageAnalysis', inputVars, inputOpts);
}
exports.updateFloorplanPageAnalysis = updateFloorplanPageAnalysis;

function updateFloorplanPage(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateFloorplanPage', inputVars, inputOpts);
}
exports.updateFloorplanPage = updateFloorplanPage;

function updateFloorplanPages(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateFloorplanPages', inputVars, inputOpts);
}
exports.updateFloorplanPages = updateFloorplanPages;

function listProjectsByOwnerAndSalesStatus(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListProjectsByOwnerAndSalesStatus', inputVars, inputOpts);
}
exports.listProjectsByOwnerAndSalesStatus = listProjectsByOwnerAndSalesStatus;

function listProjectsByAccount(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListProjectsByAccount', inputVars, inputOpts);
}
exports.listProjectsByAccount = listProjectsByAccount;

function getProjectDetailsById(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetProjectDetailsById', inputVars, inputOpts);
}
exports.getProjectDetailsById = getProjectDetailsById;

function getProjectById(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetProjectById', inputVars, inputOpts);
}
exports.getProjectById = getProjectById;

function getFloorplanPageById(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetFloorplanPageById', inputVars, inputOpts);
}
exports.getFloorplanPageById = getFloorplanPageById;

function updateProjectQuestionnaireQuestionAiAnswer(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateProjectQuestionnaireQuestionAiAnswer', inputVars, inputOpts);
}
exports.updateProjectQuestionnaireQuestionAiAnswer = updateProjectQuestionnaireQuestionAiAnswer;

function getProjectQuestionnaireQuestionsForProject(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetProjectQuestionnaireQuestionsForProject', inputVars, inputOpts);
}
exports.getProjectQuestionnaireQuestionsForProject = getProjectQuestionnaireQuestionsForProject;

function createReminder(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateReminder', inputVars, inputOpts);
}
exports.createReminder = createReminder;

function updateReminder(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateReminder', inputVars, inputOpts);
}
exports.updateReminder = updateReminder;

function listDueReminders(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListDueReminders', inputVars, inputOpts);
}
exports.listDueReminders = listDueReminders;

function listProjectReminders(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListProjectReminders', inputVars, inputOpts);
}
exports.listProjectReminders = listProjectReminders;

function getReminderById(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetReminderById', inputVars, inputOpts);
}
exports.getReminderById = getReminderById;

function getUserSettings(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetUserSettings', inputVars, inputOpts);
}
exports.getUserSettings = getUserSettings;

