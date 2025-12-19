import { GoogleGenAI } from "@google/genai";
import { Goal } from "../types";

// FIX: Removed global AI client instance and API key validation to follow guidelines.
// The client should be instantiated just before use.
export const generateFitnessPlan = async (weight: number, goal: Goal): Promise<{ dietPlan: string; workoutPlan: string }> => {
    // FIX: Instantiate GoogleGenAI inside the function call and use process.env.API_KEY directly.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
    You are an expert fitness and nutrition coach. Generate a simple, beginner-friendly diet and workout plan for a person with the following details:
    - Current Weight: ${weight} kg
    - Goal: ${goal}

    The plan should be for one week.
    The diet should be balanced, easy to follow, and include simple meal ideas.
    The workout plan should be a 3-day split (e.g., Push, Pull, Legs or Full Body) with simple exercises that can be done with basic gym equipment.

    Format the response in Markdown.
    Use '### Diet Plan' as the heading for the diet section.
    Use '### Workout Plan' as the heading for the workout section.
    Under each workout day, list the exercises with sets and reps (e.g., Squats: 3 sets of 10-12 reps).
    Ensure the response contains ONLY the two markdown sections.
  `;
  
  try {
    const response = await ai.models.generateContent({
        // FIX: Updated model from 'gemini-flash-latest' to the recommended 'gemini-3-flash-preview' for this task type.
        model: 'gemini-3-flash-preview',
        contents: prompt,
    });
    
    const text = response.text;
    if(!text) {
        throw new Error("Empty response from Gemini");
    }

    const dietPlanMatch = text.match(/### Diet Plan([\s\S]*?)### Workout Plan/);
    const workoutPlanMatch = text.match(/### Workout Plan([\s\S]*)/);

    const dietPlan = dietPlanMatch ? `### Diet Plan${dietPlanMatch[1]}`.trim() : "Could not generate a diet plan. Please try again.";
    const workoutPlan = workoutPlanMatch ? `### Workout Plan${workoutPlanMatch[1]}`.trim() : "Could not generate a workout plan. Please try again.";

    return { dietPlan, workoutPlan };
  } catch (error) {
    console.error("Error generating fitness plan:", error);
    return {
      dietPlan: "Error: Could not generate a diet plan.",
      workoutPlan: "Error: Could not generate a workout plan."
    };
  }
};
