import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSignup() {
  const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      full_name: name,
    },
  },
});

console.log(data);
console.log(error);
}

  return (
    <div>
      <h1>Hello Mate, 
        Welcome to GuideMate!</h1>

      <h2>Create your account</h2>

      <input
  type="text"
  placeholder="Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

<input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
<button onClick={handleSignup}>
  Create Account
</button>
      <p>Already have an account? Login</p>
    </div>
  );
}