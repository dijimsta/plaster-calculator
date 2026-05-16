const { validateAdminArgs } = require("firebase-admin/data-connect");

const connectorConfig = {
    connector: "example",
    serviceId: "plaster-calculator",
    location: "australia-southeast2",
};
exports.connectorConfig = connectorConfig;

function createMovie(dcOrVarsOrOptions, varsOrOptions, options) {
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
    return dcInstance.executeMutation("CreateMovie", inputVars, inputOpts);
}
exports.createMovie = createMovie;

function deleteMovie(dcOrVarsOrOptions, varsOrOptions, options) {
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
    return dcInstance.executeMutation("DeleteMovie", inputVars, inputOpts);
}
exports.deleteMovie = deleteMovie;

function upsertUser(dcOrVarsOrOptions, varsOrOptions, options) {
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
    return dcInstance.executeMutation("UpsertUser", inputVars, inputOpts);
}
exports.upsertUser = upsertUser;

function addReview(dcOrVarsOrOptions, varsOrOptions, options) {
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
    return dcInstance.executeMutation("AddReview", inputVars, inputOpts);
}
exports.addReview = addReview;

function deleteReview(dcOrVarsOrOptions, varsOrOptions, options) {
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
    return dcInstance.executeMutation("DeleteReview", inputVars, inputOpts);
}
exports.deleteReview = deleteReview;

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

function listMovies(dcOrOptions, options) {
    const { dc: dcInstance, options: inputOpts } = validateAdminArgs(
        connectorConfig,
        dcOrOptions,
        options,
        undefined,
    );
    dcInstance.useGen(true);
    return dcInstance.executeQuery("ListMovies", undefined, inputOpts);
}
exports.listMovies = listMovies;

function listUsers(dcOrOptions, options) {
    const { dc: dcInstance, options: inputOpts } = validateAdminArgs(
        connectorConfig,
        dcOrOptions,
        options,
        undefined,
    );
    dcInstance.useGen(true);
    return dcInstance.executeQuery("ListUsers", undefined, inputOpts);
}
exports.listUsers = listUsers;

function listUserReviews(dcOrOptions, options) {
    const { dc: dcInstance, options: inputOpts } = validateAdminArgs(
        connectorConfig,
        dcOrOptions,
        options,
        undefined,
    );
    dcInstance.useGen(true);
    return dcInstance.executeQuery("ListUserReviews", undefined, inputOpts);
}
exports.listUserReviews = listUserReviews;

function getMovieById(dcOrVarsOrOptions, varsOrOptions, options) {
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
    return dcInstance.executeQuery("GetMovieById", inputVars, inputOpts);
}
exports.getMovieById = getMovieById;

function searchMovie(dcOrVarsOrOptions, varsOrOptions, options) {
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
        false,
    );
    dcInstance.useGen(true);
    return dcInstance.executeQuery("SearchMovie", inputVars, inputOpts);
}
exports.searchMovie = searchMovie;

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
