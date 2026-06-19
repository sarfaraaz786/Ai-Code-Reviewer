import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import '../style/Login.scss'
import { loginUser } from '../services/auth.api'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await loginUser(form.email, form.password)
      navigate(redirectTo)
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">✦</div>
        <h1 className="auth-title">Log in</h1>
        <p className="auth-sub">Welcome back! Enter your details below.</p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit}>

          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn">Log in</button>

        </form>

        <p className="auth-footer">
          No account yet? <a href="/register">Create one</a>
        </p>

      </div>
    </main>
  )
}

export default Login
