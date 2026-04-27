import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin');
        } catch (err) {
            setError('Credenciales incorrectas. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#1a1714] flex flex-col items-center justify-center px-4 selection:bg-amber-100 selection:text-amber-900">

            {/* Logo / Marca */}
            <div className="text-center mb-10">
                <p className="text-xs uppercase tracking-[0.5em] text-amber-700 mb-3">
                    Cocina Mediterránea
                </p>
                <h1 className="text-5xl font-display italic text-[#fdfaf6] leading-none">
                    La Terraza
                </h1>
                <div className="mt-4 mx-auto w-32 h-px bg-gradient-to-r from-transparent via-amber-800/60 to-transparent" />
            </div>

            {/* Card del formulario */}
            <div className="w-full max-w-sm bg-[#fdfaf6] rounded-2xl p-8 flex flex-col gap-6">

                <div>
                    <h2 className="font-display italic text-[#1c1c1c] text-2xl leading-tight">
                        Acceso admin
                    </h2>
                    <p className="text-stone-500 text-sm mt-1">
                        Solo para personal autorizado
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs uppercase tracking-widest text-stone-600">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="admin@laterraza.com"
                            className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#1c1c1c] placeholder:text-stone-300 focus:outline-none focus:border-amber-700 transition-colors"
                        />
                    </div>

                    {/* Contraseña */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs uppercase tracking-widest text-stone-600">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#1c1c1c] placeholder:text-stone-300 focus:outline-none focus:border-amber-700 transition-colors"
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-red-500 text-xs text-center">
                            {error}
                        </p>
                    )}

                    {/* Botón */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full bg-amber-800 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-amber-50 rounded-xl py-3 text-sm uppercase tracking-widest transition-colors duration-200"
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>

                </form>

            </div>

            {/* Volver a la carta */}
            <button
                onClick={() => navigate('/')}
                className="mt-6 text-xs text-stone-600 hover:text-amber-600 uppercase tracking-widest transition-colors"
            >
                ← Volver a la carta
            </button>

        </div>
    );
};

export default LoginPage;