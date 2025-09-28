import fetch from 'node-fetch';

// Test the chat API with training data
async function testChatAPI() {
  try {
    console.log('🧪 Testing Chat API with training data...\n');
    
    // Test 1: Basic route query that should match training data
    const response1 = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'How do I get from Johannesburg CBD to Soweto?',
        currentLocation: 'Johannesburg CBD',
        destination: 'Soweto'
      })
    });
    
    const result1 = await response1.json();
    console.log('📍 Query: Johannesburg CBD to Soweto');
    console.log('🤖 Response:', result1.reply);
    console.log('\n' + '='.repeat(60) + '\n');
    
    // Test 2: Safety query
    const response2 = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Is it safe to travel at night?'
      })
    });
    
    const result2 = await response2.json();
    console.log('🛡️ Query: Safety at night');
    console.log('🤖 Response:', result2.reply);
    console.log('\n' + '='.repeat(60) + '\n');
    
    // Test 3: Check training data endpoint
    const response3 = await fetch('http://localhost:3001/api/training-data');
    const trainingData = await response3.json();
    console.log('📚 Training Data Status: ✅ Available');
    console.log('📊 Routes in training data:', trainingData.routes?.length || 0);
    console.log('🏢 Cities with taxi ranks:', Object.keys(trainingData.taxiRanks || {}).join(', '));
    
  } catch (error) {
    console.error('❌ API Test Error:', error.message);
  }
}

testChatAPI();