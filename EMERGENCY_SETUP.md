# Emergency Button Database Setup

The Emergency Button feature requires two database tables to be created in your Supabase project. These tables handle emergency contacts and location sharing functionality.

## Required Tables

### 1. emergency_contacts
Stores user emergency contacts for automatic notifications.

### 2. location_shares  
Stores shared location data with expiration times.

## Setup Instructions

### Option 1: Run Migration File
1. Navigate to your Supabase project dashboard
2. Go to the SQL Editor
3. Copy and paste the contents of `supabase/migrations/001_create_emergency_tables.sql`
4. Execute the SQL script

### Option 2: Manual Setup via Dashboard
If you prefer to create tables via the Supabase dashboard:

1. **Create emergency_contacts table:**
   - id (UUID, Primary Key, Default: gen_random_uuid())
   - user_id (UUID, Foreign Key to auth.users(id))
   - name (VARCHAR, Required)
   - phone (VARCHAR, Required)
   - email (VARCHAR, Optional)
   - created_at (TIMESTAMP WITH TIME ZONE, Default: now())
   - updated_at (TIMESTAMP WITH TIME ZONE, Default: now())

2. **Create location_shares table:**
   - id (UUID, Primary Key, Default: gen_random_uuid())
   - user_id (UUID, Foreign Key to auth.users(id))
   - latitude (DECIMAL(10,8), Required)
   - longitude (DECIMAL(11,8), Required)
   - address (TEXT, Optional)
   - shared_with (TEXT[], Array of contact identifiers)
   - is_emergency (BOOLEAN, Default: false)
   - expires_at (TIMESTAMP WITH TIME ZONE, Optional)
   - created_at (TIMESTAMP WITH TIME ZONE, Default: now())

3. **Enable Row Level Security (RLS):**
   - Enable RLS on both tables
   - Create policies to ensure users can only access their own data

## Features

### Emergency Button
- **Location**: Fixed position at bottom-right of screen
- **Visibility**: Only appears for authenticated users
- **Animation**: Pulsing red circle to draw attention
- **Functionality**: 
  - Gets current location using browser geolocation
  - Converts coordinates to readable address
  - Saves location share to database
  - Attempts native sharing, falls back to clipboard

### Emergency Contacts Management
- **Add Contacts**: Name and phone required, email optional
- **View Contacts**: All saved contacts displayed in dialog
- **Delete Contacts**: Remove contacts with confirmation
- **Auto-notification**: Contacts are automatically included in location shares

## Permissions Required

The app requests the following permissions:
- **Location Access**: Required for emergency location sharing
- **Clipboard Access**: Fallback for sharing location when native sharing unavailable

## Security

- All data is protected by Row Level Security policies
- Users can only access their own emergency contacts and location shares
- Location shares can be set to expire after 24 hours
- Authentication required for all emergency features

## Usage

1. **Setup**: User must be authenticated to access emergency features
2. **Add Contacts**: Click the settings button below the emergency button to manage contacts
3. **Emergency Use**: Click the red emergency button to immediately share current location
4. **Sharing**: Location is shared via native sharing API or copied to clipboard for manual sharing