import AuthGuard from "../components/auth.guard.js";
import AppBar from "../components/appbar.component.js";

export default function Page() {
  return (
    <AuthGuard>
      <AppBar />
      <main>
        <h1>Plaster Calculator</h1>
      </main>
    </AuthGuard>
  );
}
