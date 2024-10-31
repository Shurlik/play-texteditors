export const personaKeys = [
	"Name",
	"Age",
	"Education level",
	"Occupation",
	"Income class",
	"Relationship Status",
	"Number of Kids",
	"Place of residence",
	"Job title",
	"Industry",
	"Career stage",
	"Working environment",
	"Limbic Types",
	"Enneagram",
	"Myers-Briggs (MBTI)",
	"DISG",
	"Sinus-Milieus",
	"Spiral Dynamics",
	"Hobbies and Interests",
	"TV Shows / Books",
	"Empathy Card",
	"Important Values",
	"Pain Points",
	"Fears",
	"Goals and Dreams",
	"Materialistic Gains",
	"Emotional Win",
	"Magical Solution",
	"Brand-Values",
	"Brand-Examples",
	"Brand Archetype",
	"Brand-Magnet",
	"Elevator Pitch",
	"Buying Behavior",
	"Buying Motives",
	"Buying Barriers",
	"Preferred communication channels",
	"Device usage",
	"Online behavior"
];

export const fullPersonData = `Generate a complete persona profile with all the following fields. Format the response as a single JSON object where each key corresponds to a specific field. Follow the detailed instructions for each field:
{
  "Name": "A typical name for the persona",
  "Age": <A number representing the age>,
  "Education level": "Highest level of education achieved",
  "Occupation": "Current job or primary occupation",
  "Income class": "Economic class (e.g., lower, middle, upper-middle, upper)",
  "Relationship Status": "Current relationship status",
  "Number of Kids": <A number, can be 0>,
  "Place of residence": "City and Region (if different)",
  "Job title": "Specific job title",
  "Industry": "Industry or sector of work",
  "Career stage": "Current stage in career (e.g., entry-level, mid-career, senior)",
  "Working environment": "Type of work environment (e.g., office, remote, field)",
  "Limbic Types": "Primary limbic type based on the Limbic model",
  "Enneagram": "Enneagram personality type (e.g., Type 1: The Reformer)",
  "Myers-Briggs (MBTI)": "MBTI personality type (e.g., INTJ)",
  "DISG": "DISC personality type (e.g., Dominant, Influential, Steady, or Conscientious)",
  "Sinus-Milieus": "Sinus-Milieu category",
  "Spiral Dynamics": "Spiral Dynamics level",
  "Hobbies and Interests": "List of primary hobbies and interests in text format, separate by \n",
  "TV Shows / Books": "Preferred genres or specific titles of TV shows and books",
  "Empathy Card": "- Thinks and Feels: [key thoughts and emotions]\\n- Sees: [what they observe in their environment]\\n- Says and Does: [typical actions and words]\\n- Hears: [messages they receive from others and society]\\n- Pains: [frustrations and challenges]\\n- Gains: [desires and measures of success]",
  "Important Values": "1. [Value1]: [brief definition]\\n2. [Value2]: [brief definition]\\n3. [Value3]: [brief definition]\\n4. [Value4]: [brief definition]\\n5. [Value5]: [brief definition]\\n6. [Value6]: [brief definition]\\n7. [Value7]: [brief definition]",
  "Pain Points": "- [pain point 1]\\n- [pain point 2]\\n- [pain point 3]\\n- [pain point 4]\\n- [pain point 5]",
  "Fears": "- [fear 1]\\n- [fear 2]\\n- [fear 3]\\n- [fear 4]\\n- [fear 5]",
  "Goals and Dreams": "- [goal/dream 1]\\n- [goal/dream 2]\\n- [goal/dream 3]",
  "Materialistic Gains": "- [materialistic gain 1]\\n- [materialistic gain 2]\\n- [materialistic gain 3]",
  "Emotional Win": "- [emotional win 1]\\n- [emotional win 2]\\n- [emotional win 3]",
  "Magical Solution": "1. [outcome 1]\\n2. [outcome 2]\\n3. [outcome 3]\\n4. [outcome 4]\\n5. [outcome 5]",
  "Brand-Values": "Core values the persona expects from a brand",
  "Brand-Examples": "List of real-life brands the persona admires and why",
  "Brand Archetype": "Most attractive brand archetype and explanation of its appeal",
  "Brand-Magnet": "1. [aspect 1]\\n2. [aspect 2]\\n3. [aspect 3]",
  "Elevator Pitch": "A concise, compelling elevator pitch (under 60 seconds) for a brand that would appeal to this persona",
  "Buying Behavior": "Description of buying behavior using Henry Assael's framework (Complex, Dissonance-Reducing, Habitual, or Variety-Seeking)",
  "Buying Motives": "- [motive 1]\\n- [motive 2]\\n- [motive 3]",
  "Buying Barriers": "- [barrier 1]\\n- [barrier 2]\\n- [barrier 3]",
  "Preferred communication channels": "- [channel 1]\\n- [channel 2]\\n- [channel 3]",
  "Device usage": "- [device usage pattern 1]\\n- [device usage pattern 2]\\n- [device usage pattern 3]",
  "Online behavior": "- [behavior 1]\\n- [behavior 2]\\n- [behavior 3]"
}

Instructions:
1. Create a coherent and realistic persona based on the fields provided.
2. Ensure all details are concise yet informative, and directly relevant to the persona.
3. For fields requiring lists (e.g., Pain Points, Fears, Hobbies and Interests), provide the specified number of items, each on a new line.
4. For the Empathy Card, provide brief but insightful content for each category.
5. In the Important Values section, list 7 values with brief definitions that align with the persona's characteristics.
6. For Brand-related fields, ensure the content is specific and relates to the persona's preferences and lifestyle.
7. The Elevator Pitch should be a single paragraph that addresses the persona's needs and desires.
8. For communication channels, device usage, and online behavior, provide specific examples relevant to the persona.
9. All values except Age and Number of kids should be as String. IMPORTANT -> Any arrays or objects!

The response should be a valid JSON object with all fields filled out according to these instructions, creating a comprehensive and cohesive persona profile.`
