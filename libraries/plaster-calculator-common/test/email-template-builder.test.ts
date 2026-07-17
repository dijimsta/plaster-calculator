import assert from "node:assert/strict";
import test from "node:test";

import { EmailTemplateBuilder } from "../src/index.ts";

import type { EmailSignature } from "../src/index.ts";

const FULL_SIGNATURE: EmailSignature = {
    name: "Jane Smith",
    companyName: "F One Plastering",
    address: "1 Example St, Sometown",
    mobile: "0400 000 000",
    phone: "07 0000 0000",
    email: "jane@fone.example",
};

const EMPTY_SIGNATURE: EmailSignature = {
    name: null,
    companyName: null,
    address: null,
    mobile: null,
    phone: null,
    email: null,
};

test("build includes a personalised greeting when a contact name is given", () => {
    const builder = new EmailTemplateBuilder(FULL_SIGNATURE);
    const { body } = builder.build([{ label: "How many bedrooms?" }], "Alex");
    assert.match(body, /^Hi Alex,/);
});

test("build falls back to a generic greeting when no contact name is given", () => {
    const builder = new EmailTemplateBuilder(FULL_SIGNATURE);
    const { body } = builder.build([{ label: "How many bedrooms?" }]);
    assert.match(body, /^Hello,/);
});

test("build lists each unanswered question", () => {
    const builder = new EmailTemplateBuilder(FULL_SIGNATURE);
    const { body } = builder.build([
        { label: "How many bedrooms?" },
        { label: "What is the ceiling height?" },
    ]);
    assert.match(body, /^How many bedrooms\?$/m);
    assert.match(body, /^What is the ceiling height\?$/m);
});

test("build notes when there are no unanswered questions", () => {
    const builder = new EmailTemplateBuilder(FULL_SIGNATURE);
    const { body } = builder.build([]);
    assert.match(body, /All questionnaire questions have been answered/);
});

test("build includes the standard closing and sign-off", () => {
    const builder = new EmailTemplateBuilder(FULL_SIGNATURE);
    const { body } = builder.build([]);
    assert.match(
        body,
        /Should you have any queries or concerns regarding this matter, please feel free to keep in touch with us\./,
    );
    assert.match(body, /Looking forward to hear from you\.\nKind Regards,/);
});

test("build includes the company name in the subject when present", () => {
    const builder = new EmailTemplateBuilder(FULL_SIGNATURE);
    const { subject } = builder.build([]);
    assert.equal(subject, "Scope of Work – F One Plastering");
});

test("build falls back to a generic subject when the signature has no company name", () => {
    const builder = new EmailTemplateBuilder(EMPTY_SIGNATURE);
    const { subject } = builder.build([]);
    assert.equal(subject, "Scope of Work");
});

test("build renders the full signature block when every field is present", () => {
    const builder = new EmailTemplateBuilder(FULL_SIGNATURE);
    const { body } = builder.build([]);
    assert.match(body, /Jane Smith/);
    assert.match(body, /F One Plastering/);
    assert.match(body, /1 Example St, Sometown/);
    assert.match(body, /Mobile: 0400 000 000/);
    assert.match(body, /Phone: 07 0000 0000/);
    assert.match(body, /jane@fone\.example/);
});

test("build omits empty or missing signature fields without leaving blank lines", () => {
    const builder = new EmailTemplateBuilder({
        ...EMPTY_SIGNATURE,
        name: "Jane Smith",
        email: "jane@fone.example",
    });
    const { body } = builder.build([]);
    assert.match(body, /Jane Smith\njane@fone\.example/);
    assert.doesNotMatch(body, /Mobile:/);
    assert.doesNotMatch(body, /Phone:/);
});

test("build produces an empty body section when the signature is entirely empty", () => {
    const builder = new EmailTemplateBuilder(EMPTY_SIGNATURE);
    const { body } = builder.build([]);
    assert.ok(!body.endsWith("\n\n"));
    assert.match(body, /All questionnaire questions have been answered.*$/s);
});
