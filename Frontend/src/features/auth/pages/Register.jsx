import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/Register.scss'
import { registerUser } from '../services/auth.api'

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await registerUser(form.username, form.email, form.password)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">✦</div>
        <h1 className="auth-title">Create account</h1>
        <p className="auth-sub">Fill in the details below to get started.</p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit}>

          <div className="auth-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="your_username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

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
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
            />
          </div>

          <button type="submit" className="auth-btn">Create account</button>

        </form>

        <p className="auth-footer">
          Already have an account? <a href="/login">Log in</a>
        </p>

      </div>
    </main>
  )
}

export default Register
