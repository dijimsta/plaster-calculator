import HelloWorldMessage from "../../components/hello-world-message.component.js";

export default function AppPage() {
    return (
        <div>
            <h1>Welcome to the Plaster Calculator!</h1>
            <p>
                This is the home page. Please log in to access the calculator.
            </p>
            <HelloWorldMessage />
        </div>
    );
}
