import AuthForm from "@/components/AuthForm";
import Layout from "@/components/Layout";

export default function Page() {
  return (
    <Layout>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow">
          <h1 className="mb-4 text-center text-2xl font-semibold">Register</h1>
          <AuthForm type="register" />
        </div>
      </div>
    </Layout>
  );
}