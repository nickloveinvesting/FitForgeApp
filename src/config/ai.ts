/**
 * AI PROVIDER CONFIGURATION
 *
 * Reads API keys from environment variables (EXPO_PUBLIC_ prefix)
 * and initializes the AI plan generator at app startup.
 *
 * Usage: Call `initializeAIProvider()` once in app/_layout.tsx.
 *
 * To set your key: add EXPO_PUBLIC_GEMINI_API_KEY=your-key to .env
 * Get a key at: https://aistudio.google.com/apikey
 */

import { configureAIProvider, AIProviderConfig } from '../engine/aiPlanGenerator';

/** Read env vars and configure the AI provider. Call once at app startup. */
export function initializeAIProvider(): void {
  const geminiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

  if (geminiKey && geminiKey !== 'your-gemini-api-key-here') {
    configureAIProvider({
      provider: 'gemini',
      apiKey: geminiKey,
      model: 'gemini-2.0-flash', // Fast + cheap, good enough for plan generation
    });
    console.log('[AI] Gemini provider configured');
    return;
  }

  // Check for Claude key as fallback
  const claudeKey = process.env.EXPO_PUBLIC_CLAUDE_API_KEY;
  if (claudeKey && claudeKey !== 'your-claude-api-key-here') {
    configureAIProvider({
      provider: 'claude',
      apiKey: claudeKey,
    });
    console.log('[AI] Claude provider configured');
    return;
  }

  console.warn(
    '[AI] No API key found. Plans will use fallback generator.\n' +
    'Add EXPO_PUBLIC_GEMINI_API_KEY=your-key to .env\n' +
    'Get a key at: https://aistudio.google.com/apikey'
  );
}
