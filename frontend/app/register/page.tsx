export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-md p-8 space-y-6">
        <h1 className="text-3xl font-bold">Create Account</h1>

        <input className="input" placeholder="Name" />
        <input className="input" placeholder="Email" />
        <input className="input" placeholder="Password" type="password" />

        <button className="btn-primary w-full">
          Create Account
        </button>
      </div>
    </div>
  );
}
