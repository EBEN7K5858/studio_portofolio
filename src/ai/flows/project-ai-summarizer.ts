'use server';
/**
 * @fileOverview A Genkit flow for generating a concise AI-powered summary of a project.
 *
 * - projectAISummarizer - A function that generates a summary of a project.
 * - ProjectAISummarizerInput - The input type for the projectAISummarizer function.
 * - ProjectAISummarizerOutput - The return type for the projectAISummarizer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectAISummarizerInputSchema = z.object({
  title: z.string().describe('The title of the project.'),
  subtitle: z.string().describe('A one-liner subtitle for the project.'),
  description: z.string().describe('The full description of the project.'),
  tags: z.array(z.string()).describe('A list of key technologies or tags associated with the project.'),
  technicalArchitecture: z.string().describe('A textual description of the project\u0027s technical architecture, outlining the flow and main components.'),
  challenges: z.string().describe('A summary of key challenges encountered and solved during the project, typically as concatenated bullet points.'),
  whatWasLearned: z.string().describe('A summary of key takeaways and learnings from the project, typically as concatenated bullet points.'),
  nextSteps: z.string().describe('A summary of future plans or next steps for the project, typically as concatenated bullet points.'),
});
export type ProjectAISummarizerInput = z.infer<typeof ProjectAISummarizerInputSchema>;

const ProjectAISummarizerOutputSchema = z.string().describe('A concise, high-level summary of the project focusing on technical aspects and GenAI components.');
export type ProjectAISummarizerOutput = z.infer<typeof ProjectAISummarizerOutputSchema>;

export async function projectAISummarizer(input: ProjectAISummarizerInput): Promise<ProjectAISummarizerOutput> {
  return projectAISummarizerFlow(input);
}

const projectAISummarizerPrompt = ai.definePrompt({
  name: 'projectAISummarizerPrompt',
  input: {schema: ProjectAISummarizerInputSchema},
  output: {schema: ProjectAISummarizerOutputSchema},
  prompt: `You are an expert technical writer and AI project summarizer. Your task is to provide a concise, high-level summary of a software project, focusing on its core technical aspects and any integrated GenAI components. This summary is intended for potential employers or collaborators to quickly grasp the project's complexity and innovation.\n\nIdentify and highlight:\n- The project's main purpose.\n- Key technologies used, especially emphasizing GenAI components (e.g., Gemini API, Faster-Whisper, Google Colab).\n- Any unique technical challenges or solutions.\n- The impact or achievements of the project.\n\nKeep the summary to 2-3 paragraphs, around 150-200 words.\n\n---\nProject Details:\n\nProject Title: {{{title}}}\nProject Subtitle: {{{subtitle}}}\nProject Description: {{{description}}}\nKey Technologies/Tags: {{#each tags}}- {{this}}\n{{/each}}\nTechnical Architecture Overview: {{{technicalArchitecture}}}\nChallenges Faced: {{{challenges}}}\nWhat was Learned: {{{whatWasLearned}}}\nNext Steps: {{{nextSteps}}}\n---\n\nProvide the summary below:`,
});

const projectAISummarizerFlow = ai.defineFlow(
  {
    name: 'projectAISummarizerFlow',
    inputSchema: ProjectAISummarizerInputSchema,
    outputSchema: ProjectAISummarizerOutputSchema,
  },
  async (input) => {
    const {output} = await projectAISummarizerPrompt(input);
    return output!;
  }
);
