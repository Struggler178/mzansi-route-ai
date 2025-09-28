// Test the enhanced prompting structure for taxi finding

console.log('🧪 Testing Enhanced Prompt Structure for Taxi Finding\n');
console.log('=' .repeat(60));

const testQueries = [
  {
    name: "Route with Training Data",
    message: "How do I get from Johannesburg CBD to Soweto?",
    currentLocation: "Johannesburg CBD", 
    destination: "Soweto"
  },
  {
    name: "Safety Query",
    message: "Is it safe to travel from Cape Town to Khayelitsha at night?",
    currentLocation: "Cape Town CBD",
    destination: "Khayelitsha"
  },
  {
    name: "Fare Inquiry", 
    message: "How much does it cost to get from Durban CBD to Umlazi?",
    currentLocation: "Durban CBD",
    destination: "Umlazi"
  },
  {
    name: "Unknown Route",
    message: "How do I get from Polokwane to Tzaneen?",
    currentLocation: "Polokwane",
    destination: "Tzaneen"
  }
];

async function testEnhancedPrompting() {
  for (const query of testQueries) {
    console.log(`\n📍 Testing: ${query.name}`);
    console.log(`❓ Query: "${query.message}"`);
    console.log(`📍 From: ${query.currentLocation} → To: ${query.destination}`);
    console.log('-'.repeat(50));
    
    try {
      // Test route data availability first
      const routeTest = await fetch('http://localhost:3001/api/test-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: query.currentLocation,
          to: query.destination
        })
      });
      
      const routeResult = await routeTest.json();
      console.log(`📊 Training Data: ${routeResult.trainingDataAvailable ? '✅ Available' : '❌ Not Available'}`);
      
      // Now test the actual chat with enhanced prompting
      const chatResponse = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query.message,
          currentLocation: query.currentLocation,
          destination: query.destination
        })
      });
      
      const chatResult = await chatResponse.json();
      console.log('🤖 AI Response:');
      console.log(chatResult.reply);
      console.log('\n' + '='.repeat(60));
      
      // Add a small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Error testing ${query.name}:`, error.message);
    }
  }
}

// Run the test
testEnhancedPrompting().catch(console.error);