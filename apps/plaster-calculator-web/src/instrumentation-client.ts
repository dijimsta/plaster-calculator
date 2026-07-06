import { FirebaseService } from "@libraries/plaster-calculator-web-core";

if (process.env.NODE_ENV === "development") {
    FirebaseService.connectEmulators();
}
