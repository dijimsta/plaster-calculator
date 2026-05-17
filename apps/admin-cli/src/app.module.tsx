import { MemoryRouter, Route, Routes } from "react-router";

import { HomeModule } from "./home/home.module.js";
import { UsersListApp } from "./users/users.module.js";

export function AppModule() {
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<HomeModule />} />
                <Route path="/users" element={<UsersListApp />} />
            </Routes>
        </MemoryRouter>
    );
}
