import "./bootstrap.js";

import { connectorConfig as accountsConnectorConfig } from "@generated/accounts-data-connector-admin";
import { connectorConfig as exampleConnectorConfig } from "@generated/example-data-connector";
import { getApp, type App } from "firebase-admin/app";
import { DataConnect, type ConnectorConfig } from "firebase-admin/data-connect";

const app = getApp();

// The public .d.ts hides DataConnect's constructor (it's @internal-tagged),
// but the runtime class does accept (connectorConfig, app) - see
// firebase-admin/lib/data-connect/data-connect.js. Cast to restore the real
// signature so we can construct instances ourselves.
const DataConnectCtor = DataConnect as unknown as new (
    connectorConfig: ConnectorConfig,
    app: App,
) => DataConnect;

// firebase-admin's getDataConnect() caches instances keyed only by
// `${location}-${serviceId}`, ignoring the connector name, so two connectors
// sharing a service silently collide and route operations to whichever
// connector's client was constructed first in the process. Constructing our
// own instances per connector bypasses that shared cache. Fixed upstream in
// https://github.com/firebase/firebase-admin-node/pull/3055 - once a release
// containing that fix is out, this workaround can be removed.
export const accountsDataConnect = new DataConnectCtor(
    accountsConnectorConfig,
    app,
);
export const exampleDataConnect = new DataConnectCtor(
    exampleConnectorConfig,
    app,
);
