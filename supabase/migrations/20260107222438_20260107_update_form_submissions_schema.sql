/*
  # Update form submissions table with additional fields

  1. Enhanced form_submissions table
    - Add `building_type` (text) - stores building type (multifamily, hotel, commercial, etc.)
    - Add `project_size` (integer) - stores project size in square feet
    - Add `current_system_cost` (integer) - total cost of current system
    - Add `current_system_cost_per_sf` (numeric) - cost per square foot of current system
    - Add `maxterra_cost` (integer) - total cost of MAXTERRA system
    - Add `maxterra_cost_per_sf` (numeric) - cost per square foot of MAXTERRA system
    - Add `competitor_name` (text) - stores competitor name for subfloor projects (optional)

  2. Important Notes
    - These additions are backward compatible - all new fields are nullable
    - Current RLS policies remain unchanged
    - Date submitted is automatically captured via created_at timestamp
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'form_submissions' AND column_name = 'building_type'
  ) THEN
    ALTER TABLE form_submissions ADD COLUMN building_type text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'form_submissions' AND column_name = 'project_size'
  ) THEN
    ALTER TABLE form_submissions ADD COLUMN project_size integer;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'form_submissions' AND column_name = 'current_system_cost'
  ) THEN
    ALTER TABLE form_submissions ADD COLUMN current_system_cost integer;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'form_submissions' AND column_name = 'current_system_cost_per_sf'
  ) THEN
    ALTER TABLE form_submissions ADD COLUMN current_system_cost_per_sf numeric;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'form_submissions' AND column_name = 'maxterra_cost'
  ) THEN
    ALTER TABLE form_submissions ADD COLUMN maxterra_cost integer;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'form_submissions' AND column_name = 'maxterra_cost_per_sf'
  ) THEN
    ALTER TABLE form_submissions ADD COLUMN maxterra_cost_per_sf numeric;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'form_submissions' AND column_name = 'competitor_name'
  ) THEN
    ALTER TABLE form_submissions ADD COLUMN competitor_name text;
  END IF;
END $$;