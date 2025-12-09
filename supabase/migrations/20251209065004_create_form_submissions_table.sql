/*
  # Create form submissions table

  1. New Tables
    - `form_submissions`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `project_type` (text) - stores which type of project (gypcrete or subfloor)
      - `savings_amount` (integer) - stores the calculated savings
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `form_submissions` table
    - Add policy for public insert (for anonymous form submissions)
*/

CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  project_type text,
  savings_amount integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit form"
  ON form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view submissions"
  ON form_submissions
  FOR SELECT
  TO anon
  USING (true);