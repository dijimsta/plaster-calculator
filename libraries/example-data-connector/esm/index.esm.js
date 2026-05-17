import { validateAdminArgs } from "firebase-admin/data-connect";

export const connectorConfig = {
    connector: "example",
    serviceId: "plaster-calculator",
    location: "australia-southeast2",
};

export function createProjectFromUpload(
    dcOrVarsOrOptions,
    varsOrOptions,
    options,
) {
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

export function renameProject(dcOrVarsOrOptions, varsOrOptions, options) {
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

export function touchProject(dcOrVarsOrOptions, varsOrOptions, options) {
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

export function deleteFloorplanPages(
    dcOrVarsOrOptions,
    varsOrOptions,
    options,
) {
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

export function deleteProject(dcOrVarsOrOptions, varsOrOptions, options) {
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

export function createFloorplanPage(dcOrVarsOrOptions, varsOrOptions, options) {
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

export function updateFloorplanPage(dcOrVarsOrOptions, varsOrOptions, options) {
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

export function updateFloorplanPages(
    dcOrVarsOrOptions,
    varsOrOptions,
    options,
) {
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

export function listProjectsByOwner(dcOrVarsOrOptions, varsOrOptions, options) {
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

export function getProjectDetailsById(
    dcOrVarsOrOptions,
    varsOrOptions,
    options,
) {
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

export function getProjectById(dcOrVarsOrOptions, varsOrOptions, options) {
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

export function getFloorplanPageById(
    dcOrVarsOrOptions,
    varsOrOptions,
    options,
) {
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
