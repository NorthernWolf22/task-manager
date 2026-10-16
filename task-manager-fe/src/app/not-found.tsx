import Wrapper from "@/components/Wrapper";

// If the route does not exist this page renders.

function NotFound() {
    return (
        <Wrapper>
            <div className="min-h-screen bg-gray-50 p-6">
                <h1 className="mb-6 text-3xl font-bold">Oops!</h1>
                <p>Somethings gone wrong, we can't find the page you are looking for</p>
                <a
                    href="/login"
                    className="rounded bg-green-600 ml-5 mt-5 inline-block px-4 py-2 font-semibold text-white hover:bg-green-700"
                >
                    Login
                </a>
            </div>
        </Wrapper>
    );
}

export default NotFound;