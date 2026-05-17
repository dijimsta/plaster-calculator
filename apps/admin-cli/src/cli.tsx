#!/usr/bin/env node

import { Command } from "commander";
import { render } from "ink";

import { UsersListApp } from "./users-list-app.js";

const program = new Command();

program
    .name("admin-cli")
    .description("Admin tooling for Plaster Calculator")
    .version("0.1.0");

const users = program
    .command("users")
    .description("Manage Firebase Auth users");

users
    .command("list")
    .alias("ls")
    .description("List Firebase Auth users")
    .action(() => {
        render(<UsersListApp />);
    });

program.parseAsync(process.argv);
