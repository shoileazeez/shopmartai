export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-neutral-500">
            Access your personalized AI shopping feed.
          </p>

          <button className="btn-outline w-full">Continue with Google</button>
          <button className="btn-outline w-full">Continue with Apple</button>

          <div className="text-center text-sm text-neutral-400">
            Or continue with email
          </div>

          <input className="input" placeholder="Email address" />
          <input
            className="input"
            placeholder="Password"
            type="password"
          />

          <button className="btn-primary w-full">Log In</button>

          <p className="text-sm text-center">
            Don’t have an account?{" "}
            <a href="/register" className="text-purple-600 font-medium">
              Register
            </a>
          </p>
        </div>
      </div>

      {/* Visual */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-12">
        <div className="max-w-md">
          <h2 className="text-2xl font-semibold">
            AI Visual Search
          </h2>
          <p className="mt-4 opacity-90">
            “ShopSmart AI helped me find the jacket I wanted in seconds.”
          </p>
        </div>
      </div>
    </div>
  );
}
