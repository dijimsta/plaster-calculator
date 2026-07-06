import { connectorConfig } from "@generated/questionnaires-data-connector-web";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";

export function register() {
    if (process.env.NODE_ENV === "development") {
        FirebaseService.connectEmulators();
        FirebaseService.connectDataConnectEmulator(
            FirebaseService.getDataConnect(connectorConfig),
        );
    }
}
