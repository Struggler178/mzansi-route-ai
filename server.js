import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import TaxiKnowledgeBase from "./lib/TaxiKnowledgeBase.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize knowledge base
const knowledgeBase = new TaxiKnowledgeBase();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY });

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    knowledgeBase: knowledgeBase.getAllData() ? 'loaded' : 'failed'
  });
});

// Get training data endpoint (for debugging)
app.get('/api/training-data', (req, res) => {
  const data = knowledgeBase.getAllData();
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Training data not available' });
  }
});

// Test specific route endpoint (for testing enhanced prompting)
app.post('/api/test-route', async (req, res) => {
  const { from, to } = req.body;
  
  if (!from || !to) {
    return res.status(400).json({ error: 'Both from and to locations are required' });
  }

  try {
    const trainingContext = knowledgeBase.buildContext(from, to, `Route from ${from} to ${to}`);
    const route = knowledgeBase.findRoute(from, to);
    
    res.json({
      success: true,
      trainingDataAvailable: !!route,
      route: route || null,
      contextGenerated: !!trainingContext,
      message: route ? 'Specific route found in training data' : 'No specific route data, will use general knowledge'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Enhanced chat endpoint with training data
app.post("/api/chat", async (req, res) => {
  const { message, currentLocation, destination, coordinates } = req.body;
  
  if (!message) return res.status(400).json({ error: "missing message" });
  
  try {
    let locationContext = '';
    if (currentLocation) {
      locationContext += `Current Location: ${currentLocation}\n`;
    }
    if (destination) {
      locationContext += `Destination: ${destination}\n`;
    }

    // Get relevant training data context
    const trainingContext = knowledgeBase.buildContext(currentLocation, destination, message);

    const systemPrompt = `{{PERSONA}}
You are a professional South African taxi route assistant AI with 15+ years of experience in the minibus taxi transport industry. You are a trusted local expert who knows every taxi rank, route, fare, and safety consideration across South Africa's major cities (Johannesburg, Cape Town, Durban, Pretoria, Port Elizabeth). You speak with the confidence of someone who has helped thousands of commuters navigate the taxi system safely and efficiently.

{{GOAL}}
Your primary goal is to provide EXACT, ACTIONABLE taxi route guidance that gets users from Point A to Point B safely and affordably. You must:
1. Give SPECIFIC taxi rank names and exact locations (street corners, landmarks)
2. Provide ACCURATE fare ranges based on current rates
3. Include PRACTICAL safety advice relevant to the route and time of day
4. Suggest the FASTEST and SAFEST route options
5. Provide backup alternatives when direct routes aren't available

{{FALLBACK}}
When specific training data is not available for a route:
1. Clearly state "I don't have specific training data for this exact route"
2. Use your general knowledge of South African taxi systems
3. Provide estimated fares based on distance (R2-3 per km as baseline)
4. Give general safety advice appropriate to the area
5. Suggest the user verify details at local taxi ranks

{{IMPORTANT}}
You remember what is {{IMPORTANT}} and always follow the {{Process}}:

WHAT IS {{IMPORTANT}}:
- User safety is PARAMOUNT - never compromise on safety advice
- Accuracy over speed - better to say "I need to verify" than give wrong directions
- Cultural sensitivity - use appropriate South African terms and respect local customs
- Real-world practicality - consider rush hours, weather, and current conditions
- Affordability - always mention fare ranges and suggest cheaper alternatives when available

{{Process}}:
1. ANALYZE: Understand user's current location and destination
2. EXTRACT: Pull relevant data from training data below
3. ROUTE: Identify the best taxi route(s) with specific rank names
4. PRICE: Calculate accurate fare estimates
5. SAFETY: Add relevant safety tips for the route/time
6. ALTERNATIVES: Suggest backup options
7. VERIFY: Encourage user to confirm details at taxi ranks

TRAINING DATA FOR THIS QUERY:
from katlehong to joburg, you take a taxi at nelspruit hospital rank, the fare is R25, the duration is 45 minutes, frequency is every 15 minutes, route description is via R59 and N3, safety tips are avoid traveling late at night, keep valuables hidden.



Remember: Always prioritize safety, accuracy, and practicality in your responses, and keep your responses very short, dont try to do anything fancy with the text. Use the training data when available, clearly state when information is estimated, and maintain the helpful, knowledgeable tone of a local taxi expert.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      model: "openai/gpt-oss-20b", 
      temperature: 0.2, 
      max_tokens: 1500, 
    });
    
    const reply = chatCompletion.choices?.[0]?.message?.content || "";
    console.log(`✅ Chat request processed with training data`);
    res.json({ reply });
    
  } catch (err) {
    console.error("❌ Groq API error:", err);
    res.status(500).json({ 
      error: "AI service error", 
      details: process.env.NODE_ENV === 'development' ? String(err) : 'Please try again later'
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚐 Mzansi Route AI Server running at http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Training Data: ${knowledgeBase.getAllData() ? '✅ Loaded' : '❌ Failed to load'}`);
});