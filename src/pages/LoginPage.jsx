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
        <div className="min-h-[100dvh] py-8 sm:py-0 bg-[#0f0e0d] flex flex-col items-center justify-center px-4 selection:bg-amber-100 selection:text-amber-900 relative overflow-x-hidden">
            
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-900/5 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Logo / Marca */}
            <div className="text-center mb-6 sm:mb-10 relative z-10">
                <p className="text-[10px] uppercase tracking-[0.6em] text-amber-700/80 mb-3 font-medium">
                    Cocina Mediterránea
                </p>
                <h1 className="text-5xl sm:text-6xl font-display italic text-[#fdfaf6] leading-none">
                    La Terraza
                </h1>
                <div className="mt-6 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-amber-800/40 to-transparent" />
            </div>

            {/* Card del formulario */}
            <div className="w-full max-w-sm bg-[#1c1a19] border border-white/5 rounded-3xl p-6 sm:p-10 flex flex-col gap-6 sm:gap-8 shadow-2xl shadow-black/40 relative z-10">

                <div className="text-center">
                    <h2 className="font-display italic text-white/90 text-2xl leading-tight">
                        Acceso admin
                    </h2>
                    <p className="text-stone-300 text-sm mt-1">
                        Solo personal autorizado
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-widest text-stone-400">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="admin@laterraza.com"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 sm:py-3.5 text-sm text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-700/50 focus:bg-white/[0.07] transition-all"
                        />
                    </div>

                    {/* Contraseña */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-widest text-stone-400">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 sm:py-3.5 text-sm text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-700/50 focus:bg-white/[0.07] transition-all"
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl py-2 px-4">
                            <p className="text-red-400 text-[11px] text-center">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Botón */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-1 sm:mt-2 w-full bg-amber-800 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-amber-50 rounded-2xl py-3.5 sm:py-4 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-lg shadow-amber-900/20 active:scale-[0.98]"
                    >
                        {loading ? 'Entrando...' : 'Iniciar Sesión'}
                    </button>

                </form>

            </div>

            {/* Volver a la carta */}
            <button
                onClick={() => navigate('/')}
                className="mt-6 sm:mt-10 text-[10px] text-stone-600 hover:text-amber-700 uppercase tracking-[0.2em] transition-all relative z-10 flex items-center gap-2"
            >
                <span className="text-lg">←</span> Volver a la carta
            </button>

        </div>
    );
};

export default LoginPage;