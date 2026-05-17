const { validateAdminArgs } = require("firebase-admin/data-connect");

const connectorConfig = {
    connector: "example",
    serviceId: "plaster-calculator",
    location: "australia-southeast2",
};
exports.connectorConfig = connectorConfig;

function createProjectFromUpload(dcOrVarsOrOptions, varsOrOptions, options) {
    const {
        dc: dcInstance,
        vars: inputVars,
        options: inputOpts,
    } = validateAdminArgs(
        connectorConfig,
        dcOrVarsOrOptions,
        varsOrOptions,
        options,
        true,
        true,
    );
    dcInstance.useGen(true);
    return dcInstance.executeMutation(
        "CreateProjectFromUpload",
        inputVars,
        inputOpts,
    );
}
exports.createProjectFromUpload = createProjectFromUpload;

function renameProject(dcOrVarsOrOptions, varsOrOptions, options) {
    const {
        dc: dcInstance,
        vars: inputVars,
        options: inputOpts,
    } = validateAdminArgs(
        connectorConfig,
        dcOrVarsOrOptions,
        varsOrOptions,
        options,
        true,
        true,
    );
    dcInstance.useGen(true);
    return dcInstance.executeMutation("RenameProject", inputVars, inputOpts);
}
exports.renameProject = renameProject;

function touchProject(dcOrVarsOrOptions, varsOrOptions, options) {
    const {
        dc: dcInstance,
        vars: inputVars,
        options: inputOpts,
    } = validateAdminArgs(
        connectorConfig,
        dcOrVarsOrOptions,
        varsOrOptions,
        options,
        true,
        true,
    );
    dcInstance.useGen(true);
    return dcInstance.executeMutation("TouchProject", inputVars, inputOpts);
}
exports.touchProject = touchProject;

function deleteFloorplanPages(dcOrVarsOrOptions, varsOrOptions, options) {
    const {
        dc: dcInstance,
        vars: inputVars,
        options: inputOpts,
    } = validateAdminArgs(
        connectorConfig,
        dcOrVarsOrOptions,
        varsOrOptions,
        options,
        true,
        true,
    );
    dcInstance.useGen(true);
    return dcInstance.executeMutation(
        "DeleteFloorplanPages",
        inputVars,
        inputOpts,
    );
}
exports.deleteFloorplanPages = deleteFloorplanPages;

function deleteProject(dcOrVarsOrOptions, varsOrOptions, options) {
    const {
        dc: dcInstance,
        vars: inputVars,
        options: inputOpts,
    } = validateAdminArgs(
        connectorConfig,
        dcOrVarsOrOptions,
        varsOrOptions,
        options,
        true,
        true,
    );
    dcInstance.useGen(true);
    return dcInstance.executeMutation("DeleteProject", inputVars, inputOpts);
}
exports.deleteProject = deleteProject;

function createFloorplanPage(dcOrVarsOrOptions, varsOrOptions, options) {
    const {
        dc: dcInstance,
        vars: inputVars,
        options: inputOpts,
    } = validateAdminArgs(
        connectorConfig,
        dcOrVarsOrOptions,
        varsOrOptions,
        options,
        true,
        true,
    );
    dcInstance.useGen(true);
    return dcInstance.executeMutation(
        "CreateFloorplanPage",
        inputVars,
        inputOpts,
    );
}
exports.createFloorplanPage = createFloorplanPage;

function updateFloorplanPage(dcOrVarsOrOptions, varsOrOptions, options) {
    const {
        dc: dcInstance,
        vars: inputVars,
        options: inputOpts,
    } = validateAdminArgs(
        connectorConfig,
        dcOrVarsOrOptions,
        varsOrOptions,
        options,
        true,
        true,
    );
    dcInstance.useGen(true);
    return dcInstance.executeMutation(
        "UpdateFloorplanPage",
        inputVars,
        inputOpts,
    );
}
exports.updateFloorplanPage = updateFloorplanPage;

function updateFloorplanPages(dcOrVarsOrOptions, varsOrOptions, options) {
    const {
        dc: dcInstance,
        vars: inputVars,
        options: inputOpts,
    } = validateAdminArgs(
        connectorConfig,
        dcOrVarsOrOptions,
        varsOrOptions,
        options,
        true,
        true,
    );
    dcInstance.useGen(true);
    return dcInstance.executeMutation(
        "UpdateFloorplanPages",
        inputVars,
        inputOpts,
    );
}
exports.updateFloorplanPages = updateFloorplanPages;

function listProjectsByOwner(dcOrVarsOrOptions, varsOrOptions, options) {
    const {
        dc: dcInstance,
        vars: inputVars,
        options: inputOpts,
    } = validateAdminArgs(
        connectorConfig,
        dcOrVarsOrOptions,
        varsOrOptions,
        options,
        true,
        true,
    );
    dcInstance.useGen(true);
    return dcInstance.executeQuery("ListProjectsByOwner", inputVars, inputOpts);
}
exports.listProjectsByOwner = listProjectsByOwner;

function getProjectDetailsById(dcOrVarsOrOptions, varsOrOptions, options) {
    const {
        dc: dcInstance,
        vars: inputVars,
        options: inputOpts,
    } = validateAdminArgs(
        connectorConfig,
        dcOrVarsOrOptions,
        varsOrOptions,
        options,
        true,
        true,
    );
    dcInstance.useGen(true);
    return dcInstance.executeQuery(
        "GetProjectDetailsById",
        inputVars,
        inputOpts,
    );
}
exports.getProjectDetailsById = getProjectDetailsById;

function getProjectById(dcOrVarsOrOptions, varsOrOptions, options) {
    const {
        dc: dcInstance,
        vars: inputVars,
        options: inputOpts,
    } = validateAdminArgs(
        connectorConfig,
        dcOrVarsOrOptions,
        varsOrOptions,
        options,
        true,
        true,
    );
    dcInstance.useGen(true);
    return dcInstance.executeQuery("GetProjectById", inputVars, inputOpts);
}
exports.getProjectById = getProjectById;

function getFloorplanPageById(dcOrVarsOrOptions, varsOrOptions, options) {
    const {
        dc: dcInstance,
        vars: inputVars,
        options: inputOpts,
    } = validateAdminArgs(
        connectorConfig,
        dcOrVarsOrOptions,
        varsOrOptions,
        options,
        true,
        true,
    );
    dcInstance.useGen(true);
    return dcInstance.executeQuery(
        "GetFloorplanPageById",
        inputVars,
        inputOpts,
    );
}
exports.getFloorplanPageById = getFloorplanPageById;
