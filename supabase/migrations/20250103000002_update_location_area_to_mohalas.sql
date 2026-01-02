-- Update location_area enum to use mohalas/neighborhoods instead of districts
-- First, we need to drop the old enum and create a new one
-- Note: This will require updating existing data first if you have any

-- Step 1: Create new enum type
DO $$ 
BEGIN
  -- Drop existing enum if it exists (be careful in production!)
  DROP TYPE IF EXISTS location_area_new CASCADE;
  
  -- Create new enum with mohala names
  CREATE TYPE location_area_new AS ENUM (
    'daniyor',
    'khomer',
    'jaglot',
    'nomal',
    'danyore',
    'kargah',
    'singal',
    'minawar',
    'sultanabad',
    'other'
  );
  
  -- Alter the column to use new enum (if table exists)
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name = 'profiles' AND column_name = 'location') THEN
    -- First, update any existing data to 'other' if it doesn't match new values
    UPDATE profiles 
    SET location = 'other'::text::location_area_new
    WHERE location::text NOT IN ('daniyor', 'khomer', 'jaglot', 'nomal', 'danyore', 
                                  'kargah', 'singal', 'minawar', 'sultanabad', 'other');
    
    -- Alter the column type
    ALTER TABLE profiles 
    ALTER COLUMN location TYPE location_area_new 
    USING location::text::location_area_new;
    
    -- Update areas_served array if it exists
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'profiles' AND column_name = 'areas_served') THEN
      ALTER TABLE profiles 
      ALTER COLUMN areas_served TYPE location_area_new[] 
      USING array(
        SELECT unnest(areas_served)::text::location_area_new
      );
    END IF;
  END IF;
  
  -- Drop old enum and rename new one
  DROP TYPE IF EXISTS location_area CASCADE;
  ALTER TYPE location_area_new RENAME TO location_area;
END $$;

