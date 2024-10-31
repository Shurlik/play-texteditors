const personaData = {
  "Demographic info": {
    keys: [
      "Name",
      "Age",
      "Education level",
      "Occupation",
      "Income class",
      "Relationship Status",
      "Number of Kids",
      "Place of residence",
    ],
    prompt: `Provide concise demographic information. Format the response as a JSON object where each key matches the following list: Name, Age, Education level, Occupation, Income class, Relationship Status, Number of Kids, Place of residence. Each value should be a string except Number of Kids and age, they are Numbers. Example:
    {
      "Name": "value",
      "Age": value,
      "Education level": "value",
      "Occupation": "value",
      "Income class": "value",
      "Relationship Status": "value",
      "Number of Kids": value,
      "Place of residence": "value"
    }
    For place of residence, include both City and Region, unless they are the same, then just mention the City. Ensure all details are brief and directly relevant to the persona.`,
  },
  "Professional Information": {
    keys: ["Job title", "Industry", "Career stage", "Working environment"],
    prompt: `Describe the professional aspects concisely. Format the response as a JSON object where each key matches the following list: Job title, Industry, Career stage, Working environment. Each value should be a string. Example:
    {
      "Job title": "value",
      "Industry": "value",
      "Career stage": "value",
      "Working environment": "value"
    }
    Include specific details that are most relevant to understanding the persona's professional life.`,
  },
  "Psychographic Characteristics": {
    keys: [
      "Limbic Types",
      "Enneagram",
      "Myers-Briggs (MBTI)",
      "DISG",
      "Sinus-Milieus",
      "Spiral Dynamics",
      "Hobbies and Interests",
      "TV Shows / Books",
    ],
    prompt: `Provide brief descriptions for each psychographic characteristic. Format the response as a JSON object where each key matches the following list: Limbic Types, Enneagram, Myers-Briggs (MBTI), DISG, Sinus-Milieus, Spiral Dynamics, Hobbies and Interests, TV Shows / Books. Each value should be a string . Example:
    {
      "Limbic Types": "value",
      "Enneagram": "value",
      "Myers-Briggs (MBTI)": "value",
      "DISG": "value",
      "Sinus-Milieus": "value",
      "Spiral Dynamics": "value",
      "Hobbies and Interests": "value",
      "TV Shows / Books": "value"
    }
    For DISC, use the DISC model. For Sinus-Milieus, use the Sinus-Milieus model. Ensure each characteristic is relevant to the persona and helps paint a comprehensive picture of their personality and preferences.`,
  },
  "Empathy Card": {
    keys: ["Empathy Card"],
    prompt: `Create a concise Empathy Map for the persona. Format the response as a JSON object with a single key "Empathy Card" whose value is a string . Example:
    {
      "Empathy Card": "- Thinks and Feels: [content]\\n- Sees: [content]\\n- Says and Does: [content]\\n- Hears: [content]\\n- Pains: [content]\\n- Gains: [content]"
    }
    Include key thoughts, emotions, observations, actions, words, messages received, frustrations, challenges, desires, and measures of success. Keep each aspect brief, focusing on the most relevant points for the persona.`,
  },
  "Values: What is important": {
    keys: ["Important Values"],
    prompt: `List the 7 most important values of the persona, considering their Limbic Type. Format the response as a JSON object with a single key "Important Values" whose value is a string . Example:
    {
      "Important Values": "1. [Value1]: [brief definition]\\n2. [Value2]: [brief definition]\\n3. [Value3]: [brief definition]\\n4. [Value4]: [brief definition]\\n5. [Value5]: [brief definition]\\n6. [Value6]: [brief definition]\\n7. [Value7]: [brief definition]"
    }
    Provide a brief definition for each value as the persona would describe it, using their own language and perspective.`,
  },
  "Pain Points and Fears": {
    keys: ["Pain Points", "Fears"],
    prompt: `Describe the 5 biggest pain points and 5 deep-seated fears of the persona. Format the response as a JSON object where each key matches the following list: Pain Points, Fears. Each value should be a string . Example:
    {
      "Pain Points": "- [pain point 1]\\n- [pain point 2]\\n- [pain point 3]\\n- [pain point 4]\\n- [pain point 5]",
      "Fears": "- [fear 1]\\n- [fear 2]\\n- [fear 3]\\n- [fear 4]\\n- [fear 5]"
    }
    For pain points, provide brief examples of typical everyday situations. For fears, include emotional, possibly 'dark' fears that could keep the persona awake at night, reflecting worst-case scenarios they might imagine, even if unrealistic.`,
  },
  "Goals, Dreams, and Gains": {
    keys: ["Goals and Dreams", "Materialistic Gains", "Emotional Win"],
    prompt: `Describe the persona's goals, dreams, and desired gains. Format the response as a JSON object where each key matches the following list: Goals and Dreams, Materialistic Gains, Emotional Win. Each value should be a string . Example:
    {
      "Goals and Dreams": "- [goal/dream 1]\\n- [goal/dream 2]\\n- [goal/dream 3]",
      "Materialistic Gains": "- [gain 1]\\n- [gain 2]\\n- [gain 3]",
      "Emotional Win": "- [win 1]\\n- [win 2]\\n- [win 3]"
    }
    For 'Goals and Dreams', list significant aspirations. For 'Materialistic Gains', explain tangible benefits they expect. For 'Emotional Win', describe emotional wins they desire to achieve. Use the persona's own language and focus on how these would improve their life or solve their problems.`,
  },
  "Magical Solution": {
    keys: ["Magical Solution"],
    prompt: `Describe 5 specific and vivid outcomes that a perfect solution would bring to the persona. Format the response as a JSON object with a single key "Magical Solution" whose value is a string . Example:
    {
      "Magical Solution": "1. [outcome 1]\\n2. [outcome 2]\\n3. [outcome 3]\\n4. [outcome 4]\\n5. [outcome 5]"
    }
    Use the persona's own language and focus on how these outcomes would significantly improve their life or solve their problems.`,
  },
  Brand: {
    keys: ["Brand-Values", "Brand-Examples", "Brand Archetype", "Brand-Magnet"],
    prompt: `Describe the brand preferences of the persona. Format the response as a JSON object where each key matches the following list: Brand-Values, Brand-Examples, Brand Archetype, Brand-Magnet. Each value should be a string . Example:
    {
      "Brand-Values": "[content]",
      "Brand-Examples": "[content]",
      "Brand Archetype": "[content]",
      "Brand-Magnet": "1. [aspect 1]\\n2. [aspect 2]\\n3. [aspect 3]"
    }
    For Brand-Values, describe the core values the persona expects from a brand. For Brand-Examples, list real-life brands the persona admires and why. For Brand Archetype, identify the most attractive archetype and explain its appeal. For Brand-Magnet, list 3 key aspects of a product or marketing that would strongly attract this persona.`,
  },
  "Elevator Pitch": {
    keys: ["Elevator Pitch"],
    prompt: `Create a concise, compelling elevator pitch (under 60 seconds) for a brand that would appeal to this persona. Format the response as a JSON object with a single key "Elevator Pitch" whose value is a string . Example:
    {
      "Elevator Pitch": "[Your pitch content here]"
    }
    The pitch should highlight unique benefits and values, address the persona's specific challenges and desires, and explain why this brand is the ideal solution for them. Ensure the entire response is a single paragraph.`,
  },
  "Buying Behavior": {
    keys: ["Buying Behavior", "Buying Motives", "Buying Barriers"],
    prompt: `Describe the persona's buying behavior and motivations. Format the response as a JSON object where each key matches the following list: Buying Behavior, Buying Motives, Buying Barriers. Each value should be a string . Example:
    {
      "Buying Behavior": "[content]",
      "Buying Motives": "- [motive 1]\\n- [motive 2]\\n- [motive 3]",
      "Buying Barriers": "- [barrier 1]\\n- [barrier 2]\\n- [barrier 3]"
    }
    For Buying Behavior, use Henry Assael's framework (Complex, Dissonance-Reducing, Habitual, or Variety-Seeking). Explain their primary buying motives and any significant barriers that might prevent a purchase, even if the product or service is fundamentally interesting to them.`,
  },
  "Media Usage": {
    keys: [
      "Preferred communication channels",
      "Device usage",
      "Online behavior",
    ],
    prompt: `Detail the persona's media and device usage. Format the response as a JSON object where each key matches the following list: Preferred communication channels, Device usage, Online behavior. Each value should be a string . Example:
    {
      "Preferred communication channels": "- [channel 1]\\n- [channel 2]\\n- [channel 3]",
      "Device usage": "- [device usage pattern 1]\\n- [device usage pattern 2]\\n- [device usage pattern 3]",
      "Online behavior": "- [behavior 1]\\n- [behavior 2]\\n- [behavior 3]"
    }
    Include specific examples of preferred communication channels (e.g., specific social media platforms, email, traditional media), device usage patterns (e.g., smartphone, desktop, tablet preferences), and online behavior (e.g., shopping preferences, preferred sources of information).`,
  },
};

export default personaData;
