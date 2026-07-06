const { validateAdminArgs } = require('firebase-admin/data-connect');

const connectorConfig = {
  connector: 'questionnaires',
  serviceId: 'plaster-calculator',
  location: 'us-west1'
};
exports.connectorConfig = connectorConfig;

function createQuestionnaireTemplate(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateQuestionnaireTemplate', inputVars, inputOpts);
}
exports.createQuestionnaireTemplate = createQuestionnaireTemplate;

function createQuestionnaireTemplateQuestion(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateQuestionnaireTemplateQuestion', inputVars, inputOpts);
}
exports.createQuestionnaireTemplateQuestion = createQuestionnaireTemplateQuestion;

function createProjectQuestionnaire(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateProjectQuestionnaire', inputVars, inputOpts);
}
exports.createProjectQuestionnaire = createProjectQuestionnaire;

function createProjectQuestionnaireAnswer(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateProjectQuestionnaireAnswer', inputVars, inputOpts);
}
exports.createProjectQuestionnaireAnswer = createProjectQuestionnaireAnswer;

function listQuestionnaireTemplates(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListQuestionnaireTemplates', undefined, inputOpts);
}
exports.listQuestionnaireTemplates = listQuestionnaireTemplates;

