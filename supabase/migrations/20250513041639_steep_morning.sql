/*
  # Create session bookings table

  1. New Tables
    - `session_bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `session_date` (timestamptz, required)
      - `session_time` (time, required)
      - `service_type` (text, required)
      - `client_name` (text, required)
      - `client_email` (text, required)
      - `client_phone` (text, optional)
      - `special_requests` (text, optional)
      - `booking_status` (text, default: 'pending')
      - `created_at` (timestamptz, default: now())

  2. Security
    - Enable RLS on `session_bookings` table
    - Add policy for authenticated users to read their own bookings
    - Add policy for public users to create bookings
*/

CREATE TABLE IF NOT EXISTS session_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  session_date timestamptz NOT NULL,
  session_time time NOT NULL,
  service_type text NOT NULL,
  client_name text NOT NULL,
  client_email text NOT NULL,
  client_phone text,
  special_requests text,
  booking_status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_email CHECK (client_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT future_session CHECK (session_date >= CURRENT_TIMESTAMP)
);

ALTER TABLE session_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create bookings"
  ON session_bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view their own bookings"
  ON session_bookings
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());