# NEONMIND — AI Tools Hub

A cyberpunk-inspired AI tools directory and launchpad built with React, TypeScript and Vite.

## Getting started
1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and add your Supabase project URL and anon key.
4. Run `npm run dev`.

## Authentication
The Supabase client is prepared. Configure the environment variables and enable Email authentication in your Supabase project before using account registration and sign-in.

## Build
Run `npm run build`. The production output is generated in `dist`, ready for Cloudflare Pages.

## Current scope
The initial release provides the responsive hub interface, tool discovery cards, and authentication UI scaffold. Individual AI tools and provider/API integrations are not connected yet; add secure server-side functions before exposing paid or private API keys.
