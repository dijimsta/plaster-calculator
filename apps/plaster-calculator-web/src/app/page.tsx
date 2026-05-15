import AuthGuard from "../components/auth.guard.js";

export default function Page() {
  return (
    <AuthGuard>
      <h1>Plaster Calculator</h1>
    </AuthGuard>
  );
}
