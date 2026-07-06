import * as DataConnector from "@generated/data-connector-web";
import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import {
    connectDataConnectEmulator,
    getDataConnect,
    type ConnectorConfig,
    type DataConnect,
} from "firebase/data-connect";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectStorageEmulator, getStorage } from "firebase/storage";

import { FIREBASE_CONFIG, FIREBASE_REGION } from "./firebase.config.ts";

export class FirebaseService {
    public static app = FirebaseService.getApp();

    public static getApp(): FirebaseApp {
        const app = getApps()?.[0];
        if (app) {
            return app;
        } else {
            return initializeApp(FIREBASE_CONFIG);
        }
    }

    public static getAuth() {
        return getAuth(FirebaseService.app);
    }

    public static getFunctions() {
        return getFunctions(FirebaseService.app, FIREBASE_REGION);
    }

    public static getStorage() {
        return getStorage(FirebaseService.app);
    }

    public static getDataConnect(
        connectorConfig: ConnectorConfig,
    ): DataConnect {
        return getDataConnect(FirebaseService.app, connectorConfig);
    }

    public static connectEmulators(): void {
        connectAuthEmulator(
            FirebaseService.getAuth(),
            "http://127.0.0.1:9099",
            {
                disableWarnings: true,
            },
        );
        connectFunctionsEmulator(
            FirebaseService.getFunctions(),
            "127.0.0.1",
            5001,
        );
        connectStorageEmulator(FirebaseService.getStorage(), "127.0.0.1", 9199);
        connectDataConnectEmulator(
            FirebaseService.getDataConnect(DataConnector.connectorConfig),
            "127.0.0.1",
            9399,
        );
    }
}
