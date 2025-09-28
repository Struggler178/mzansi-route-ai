import fs from 'fs';
import path from 'path';

class TaxiKnowledgeBase {
  constructor() {
    this.data = null;
    this.loadData();
  }

  loadData() {
    try {
      const dataPath = path.resolve('./data/taxi-routes.json');
      const rawData = fs.readFileSync(dataPath, 'utf-8');
      this.data = JSON.parse(rawData);
      console.log('✅ Taxi knowledge base loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load taxi knowledge base:', error);
      this.data = null;
    }
  }

  // Find relevant route information
  findRoute(fromLocation, toLocation) {
    if (!this.data || !this.data.routes) return null;

    return this.data.routes.find(route => {
      const fromMatch = route.from.toLowerCase().includes(fromLocation.toLowerCase()) ||
                       fromLocation.toLowerCase().includes(route.from.toLowerCase());
      const toMatch = route.to.toLowerCase().includes(toLocation.toLowerCase()) ||
                     toLocation.toLowerCase().includes(route.to.toLowerCase());
      return fromMatch && toMatch;
    });
  }

  // Find nearest taxi ranks
  findNearbyRanks(location, city = null) {
    if (!this.data || !this.data.taxiRanks) return [];

    let ranks = [];
    
    if (city) {
      const cityKey = city.toLowerCase().replace(' ', '_');
      ranks = this.data.taxiRanks[cityKey] || [];
    } else {
      // Search all cities
      Object.values(this.data.taxiRanks).forEach(cityRanks => {
        ranks = ranks.concat(cityRanks);
      });
    }

    // Filter by location mentions or destinations
    return ranks.filter(rank => {
      const locationMatch = rank.location.toLowerCase().includes(location.toLowerCase()) ||
                           location.toLowerCase().includes(rank.location.toLowerCase());
      const destinationMatch = rank.destinations.some(dest => 
        dest.toLowerCase().includes(location.toLowerCase()) ||
        location.toLowerCase().includes(dest.toLowerCase())
      );
      return locationMatch || destinationMatch;
    });
  }

  // Get safety information
  getSafetyTips(timeOfDay = 'day', category = 'general') {
    if (!this.data || !this.data.safetyGuidelines) return [];

    const isNight = timeOfDay === 'night' || 
                   (typeof timeOfDay === 'string' && 
                    (timeOfDay.includes('night') || timeOfDay.includes('22:') || timeOfDay.includes('23:')));

    if (isNight && this.data.safetyGuidelines.night_travel) {
      return [...this.data.safetyGuidelines.general, ...this.data.safetyGuidelines.night_travel];
    }

    return this.data.safetyGuidelines[category] || this.data.safetyGuidelines.general || [];
  }

  // Get fare estimates
  getFareInfo(distance = null) {
    if (!this.data || !this.data.fareStructure) return null;

    if (distance) {
      const ranges = this.data.fareStructure.typical_ranges;
      if (distance <= 15) return ranges.short_distance;
      if (distance <= 30) return ranges.medium_distance;
      return ranges.long_distance;
    }

    return this.data.fareStructure;
  }

  // Build context for AI prompt
  buildContext(userLocation, destination, message) {
    let context = [];

    // Add route information if both locations provided
    if (userLocation && destination) {
      const route = this.findRoute(userLocation, destination);
      if (route) {
        context.push(`SPECIFIC ROUTE DATA:`);
        context.push(`Route: ${route.from} → ${route.to}`);
        context.push(`Taxi Rank: ${route.taxiRank}`);
        context.push(`Fare: R${route.fare.min}-${route.fare.max}`);
        context.push(`Duration: ${route.duration}`);
        context.push(`Frequency: ${route.frequency}`);
        context.push(`Route Details: ${route.route_description}`);
        if (route.safety_tips && route.safety_tips.length > 0) {
          context.push(`Safety Tips: ${route.safety_tips.join(', ')}`);
        }
        context.push('');
      }
    }

    // Add nearby taxi ranks
    const searchLocation = destination || userLocation;
    if (searchLocation) {
      const nearbyRanks = this.findNearbyRanks(searchLocation);
      if (nearbyRanks.length > 0) {
        context.push(`NEARBY TAXI RANKS:`);
        nearbyRanks.slice(0, 3).forEach(rank => {
          context.push(`• ${rank.name}: ${rank.location}`);
          context.push(`  Destinations: ${rank.destinations.join(', ')}`);
          context.push(`  Hours: ${rank.operatingHours}`);
          context.push(`  Landmarks: ${rank.landmarks.join(', ')}`);
        });
        context.push('');
      }
    }

    // Add safety information if requested
    if (message && (message.includes('safe') || message.includes('danger') || message.includes('night'))) {
      const isNight = message.includes('night') || message.includes('evening') || message.includes('dark');
      const safetyTips = this.getSafetyTips(isNight ? 'night' : 'day');
      if (safetyTips.length > 0) {
        context.push(`SAFETY GUIDELINES:`);
        safetyTips.forEach(tip => context.push(`• ${tip}`));
        context.push('');
      }
    }

    // Add fare information if requested
    if (message && (message.includes('cost') || message.includes('fare') || message.includes('price') || message.includes('money'))) {
      const fareInfo = this.getFareInfo();
      if (fareInfo) {
        context.push(`FARE INFORMATION:`);
        context.push(`Factors affecting price: ${fareInfo.factors.join(', ')}`);
        context.push(`Typical ranges:`);
        Object.entries(fareInfo.typical_ranges).forEach(([key, range]) => {
          context.push(`• ${range.range}: ${range.fare}`);
        });
        context.push(`Payment tips: ${fareInfo.payment_tips.join(', ')}`);
        context.push('');
      }
    }

    // Add cultural context
    if (this.data && this.data.cultural_context) {
      context.push(`CULTURAL TIPS:`);
      context.push(`Etiquette: ${this.data.cultural_context.etiquette.join(', ')}`);
      context.push('');
    }

    return context.join('\n');
  }

  // Get all data for debugging
  getAllData() {
    return this.data;
  }

  // Reload data (for development)
  reload() {
    this.loadData();
  }
}

export default TaxiKnowledgeBase;