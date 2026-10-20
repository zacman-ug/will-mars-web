import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRound } from 'lucide-react';
import { SITE } from '../constants/data';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const fieldClass =
  'w-full bg-transparent border-0 border-b border-zinc-500 text-zinc-100 py-2 px-0 placeholder:text-zinc-500 focus:border-brand-amber';

export default function AuthPage() {
  const { setCustomer } = useAuth();
  const navigate = useNavigate();
  const [forgotOpen, setForgotOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <Link to="/" className="font-serif italic text-2xl text-brand-amber">
          {SITE.name}
        </Link>
        <Link to="/menu" className="text-xs uppercase tracking-widest font-bold hover:text-brand-amber">
          Back to menu
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16 grid lg:grid-cols-2 gap-12 lg:gap-0">
        <LoginPanel
          forgotOpen={forgotOpen}
          setForgotOpen={setForgotOpen}
          onSuccess={(customer) => {
            setCustomer(customer);
            navigate('/menu');
          }}
        />
        <SignupPanel
          onSuccess={(customer) => {
            setCustomer(customer);
            navigate('/menu');
          }}
        />
      </div>
    </div>
  );
}

function LoginPanel({ onSuccess, forgotOpen, setForgotOpen }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const data = await api.login({ email, password });
      onSuccess(data.customer);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-bold tracking-wide mb-8">LOG IN</h1>
      <form onSubmit={submit} className="space-y-6 max-w-md">
        <input
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="EMAIL ADDRESS"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass}
        />
        <input
          type="password"
          autoComplete="current-password"
          required
          maxLength={72}
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={fieldClass}
        />
        <button type="button" onClick={() => setForgotOpen((v) => !v)} className="text-xs uppercase tracking-widest text-zinc-400 hover:text-brand-amber">
          Forgot password
        </button>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          disabled={busy}
          className="bg-brand-amber text-zinc-950 font-bold px-10 py-2.5 uppercase tracking-widest hover:bg-brand-gold disabled:opacity-50"
        >
          {busy ? 'Please wait' : 'Login'}
        </button>
      </form>

      {forgotOpen && <ForgotForm />}

      <SocialLogins />
    </section>
  );
}

function ForgotForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const data = await api.forgot({ email });
      setMessage(data.message);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mt-8 space-y-3">
      <p className="text-sm text-zinc-400">Enter your email and we’ll send reset instructions if the account exists.</p>
      <input type="email" required maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="EMAIL ADDRESS" className={fieldClass} />
      <button disabled={busy} className="text-xs uppercase tracking-widest font-bold text-brand-amber">
        Send
      </button>
      {message && <p className="text-sm text-zinc-300">{message}</p>}
    </form>
  );
}

function SignupPanel({ onSuccess }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setBusy(true);
    try {
      const data = await api.register(form);
      onSuccess(data.customer);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="lg:border-l lg:border-white/15 lg:pl-16">
      <h1 className="text-3xl font-bold tracking-wide mb-8">CREATE ACCOUNT</h1>
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-400">
          <UserRound size={48} />
        </div>
      </div>
      <form onSubmit={submit} className="space-y-5 max-w-md mx-auto">
        <input name="firstName" required maxLength={80} placeholder="FIRST NAME" value={form.firstName} onChange={onChange} className={fieldClass} />
        <input name="lastName" required maxLength={80} placeholder="LAST NAME" value={form.lastName} onChange={onChange} className={fieldClass} />
        <label className="block">
          <span className="sr-only">Birthday</span>
          <input name="birthday" type="date" value={form.birthday} onChange={onChange} className={fieldClass} />
        </label>
        <div className="flex items-end gap-3">
          <span className="pb-2 text-zinc-400">+256</span>
          <input
            name="phone"
            required
            inputMode="numeric"
            maxLength={10}
            placeholder="MOBILE NUMBER"
            value={form.phone}
            onChange={onChange}
            className={fieldClass}
          />
        </div>
        <input name="email" type="email" required maxLength={254} placeholder="EMAIL ADDRESS" value={form.email} onChange={onChange} className={fieldClass} />
        <input name="password" type="password" required minLength={8} maxLength={72} placeholder="PASSWORD" value={form.password} onChange={onChange} className={fieldClass} />
        <input
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          maxLength={72}
          placeholder="CONFIRM PASSWORD"
          value={form.confirmPassword}
          onChange={onChange}
          className={fieldClass}
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          disabled={busy}
          className="bg-brand-amber text-zinc-950 font-bold px-10 py-2.5 uppercase tracking-widest hover:bg-brand-gold disabled:opacity-50"
        >
          {busy ? 'Please wait' : 'Sign up'}
        </button>
      </form>
    </section>
  );
}

function SocialLogins() {
  const [note, setNote] = useState('');
  const tap = (provider) => {
    setNote(`${provider} login is not enabled on this restaurant yet. Use email and password.`);
  };

  return (
    <div className="mt-12 max-w-md">
      <p className="text-center font-bold mb-6">Login With:</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          type="button"
          onClick={() => tap('Facebook')}
          className="bg-[#3b5998] text-white px-6 py-2.5 rounded-md font-semibold flex items-center gap-2"
        >
          f Facebook
        </button>
        <button
          type="button"
          onClick={() => tap('Google')}
          className="bg-white text-zinc-700 px-4 py-2 rounded-md font-medium border border-zinc-200 flex items-center gap-2"
        >
          <span className="text-[#4285F4] font-bold">G</span> Sign in with Google
        </button>
      </div>
      {note && <p className="text-xs text-zinc-500 text-center mt-4">{note}</p>}
    </div>
  );
}
