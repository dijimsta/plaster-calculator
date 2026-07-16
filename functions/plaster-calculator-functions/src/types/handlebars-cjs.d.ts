// `dotprompt` (a transitive dependency of `genkit`) imports Handlebars via a deep
// subpath that has no shipped declaration file, even though `handlebars` itself is
// fully typed at its package root. Re-point the subpath at the package's own types.
declare module "handlebars/dist/cjs/handlebars.js" {
    import Handlebars from "handlebars";
    export default Handlebars;
}
