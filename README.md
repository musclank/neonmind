# NEONMIND — AI Tools Hub

A cyberpunk-inspired AI tools directory and launchpad built with React, TypeScript and Vite.

## Getting started
1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and add your Supabase project URL and anon/publishable key.
4. Run `npm run dev`.

## Authentication
The Supabase client supports email/password registration and sign-in, persisted sessions, and sign-out. Configure the environment variables and enable Email authentication in Supabase before using accounts. Run `supabase/schema.sql` in the Supabase SQL Editor to create the user profile table with row-level security.

## Deploy to Cloudflare Pages
See [CLOUDFLARE_DEPLOY.md](./CLOUDFLARE_DEPLOY.md) for the Git integration, build settings, environment variables, and Supabase URL configuration.

Build command: `npm run build`
Output directory: `dist`

## Current scope
The hub interface, tool discovery cards, and account UI scaffold are in place. Individual AI tools and AI provider integrations are not connected yet. Add secure server-side functions before exposing paid or private API keys.
