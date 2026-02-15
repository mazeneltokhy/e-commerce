'use client'
import React from 'react'
import { Loader2 } from 'lucide-react'

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/70 backdrop-blur-xl">

            <div className="relative flex flex-col items-center gap-6 px-10 py-12 rounded-3xl
                bg-white/5 dark:bg-black/20
                border border-white/10
                shadow-2xl shadow-blue-500/10">

                {/* Glow Background */}
                <div className="absolute -z-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>

                {/* Spinner */}
                <div className="relative">
                    <Loader2 className="h-14 w-14 animate-spin text-blue-500 stroke-[1.8px]" />
                    <span className="absolute inset-0 rounded-full border border-blue-400/20 animate-ping"></span>
                </div>

                {/* Brand */}
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight
                        bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
                        bg-clip-text text-transparent">
                        e-commerce
                    </h2>

                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mt-2">
                        Preparing your style...
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-56 h-[6px] bg-muted/40 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-gradient-to-r from-blue-500 to-indigo-500
                        animate-progress-loading rounded-full">
                    </div>
                </div>

            </div>
        </div>
    )
}
