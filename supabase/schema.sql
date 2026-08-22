-- =============================================
-- GlobeTrotter Supabase Schema
-- Run this ENTIRE script in Supabase SQL Editor
-- =============================================

-- 1. TRIPS TABLE
CREATE TABLE IF NOT EXISTS trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID, -- nullable for MVP (no auth yet)
  name TEXT NOT NULL,
  cover_image TEXT DEFAULT '',
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'Draft' CHECK (status IN ('Upcoming', 'Past', 'Draft')),
  budget NUMERIC NOT NULL DEFAULT 0,
  travel_style TEXT DEFAULT 'Balanced',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. TRIP STOPS TABLE
CREATE TABLE IF NOT EXISTS trip_stops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  city_name TEXT NOT NULL,
  city_country TEXT NOT NULL,
  city_image TEXT DEFAULT '',
  arrival_date TIMESTAMPTZ NOT NULL,
  departure_date TIMESTAMPTZ NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. ACTIVITIES TABLE
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_stop_id UUID NOT NULL REFERENCES trip_stops(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT NOT NULL DEFAULT 'Sightseeing',
  duration INTEGER NOT NULL DEFAULT 60, -- minutes
  cost NUMERIC NOT NULL DEFAULT 0,
  rating NUMERIC DEFAULT 0,
  image TEXT DEFAULT '',
  date DATE NOT NULL, -- the specific day this activity belongs to
  start_time TEXT NOT NULL DEFAULT '09:00', -- HH:mm format
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. EXPENSES TABLE
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('Transport', 'Accommodation', 'Activities', 'Meals', 'Other')),
  amount NUMERIC NOT NULL DEFAULT 0,
  date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. INDEXES
CREATE INDEX IF NOT EXISTS idx_trip_stops_trip_id ON trip_stops(trip_id);
CREATE INDEX IF NOT EXISTS idx_activities_trip_stop_id ON activities(trip_stop_id);
CREATE INDEX IF NOT EXISTS idx_activities_date ON activities(date);
CREATE INDEX IF NOT EXISTS idx_expenses_trip_id ON expenses(trip_id);

-- =============================================
-- SEED DATA — matches existing demo trips
-- =============================================

-- Trip 1: European Summer Escape
INSERT INTO trips (id, name, cover_image, start_date, end_date, status, budget, travel_style)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'European Summer Escape',
  'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800',
  '2026-06-12T00:00:00Z',
  '2026-06-20T00:00:00Z',
  'Upcoming',
  50000,
  'Balanced'
);

-- Trip 2: Bali Retreat
INSERT INTO trips (id, name, cover_image, start_date, end_date, status, budget, travel_style)
VALUES (
  'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  'Bali Retreat',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
  '2025-10-05T00:00:00Z',
  '2025-10-15T00:00:00Z',
  'Past',
  30000,
  'Relaxation'
);

-- Stop 1: Rome (Trip 1)
INSERT INTO trip_stops (id, trip_id, city_name, city_country, city_image, arrival_date, departure_date, order_index)
VALUES (
  'c3d4e5f6-a7b8-9012-cdef-123456789012',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Rome', 'Italy',
  'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800',
  '2026-06-12T00:00:00Z',
  '2026-06-14T00:00:00Z',
  0
);

-- Stop 2: Florence (Trip 1)
INSERT INTO trip_stops (id, trip_id, city_name, city_country, city_image, arrival_date, departure_date, order_index)
VALUES (
  'd4e5f6a7-b8c9-0123-defa-234567890123',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Florence', 'Italy',
  'https://images.pexels.com/photos/1761921/pexels-photo-1761921.jpeg?auto=compress&cs=tinysrgb&w=800',
  '2026-06-14T00:00:00Z',
  '2026-06-16T00:00:00Z',
  1
);

-- Stop 3: Venice (Trip 1)
INSERT INTO trip_stops (id, trip_id, city_name, city_country, city_image, arrival_date, departure_date, order_index)
VALUES (
  'e5f6a7b8-c9d0-1234-efab-345678901234',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Venice', 'Italy',
  'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&q=80&w=800',
  '2026-06-16T00:00:00Z',
  '2026-06-20T00:00:00Z',
  2
);

-- Stop 4: Bali (Trip 2)
INSERT INTO trip_stops (id, trip_id, city_name, city_country, city_image, arrival_date, departure_date, order_index)
VALUES (
  'f6a7b8c9-d0e1-2345-fabc-456789012345',
  'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  'Bali', 'Indonesia',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
  '2025-10-05T00:00:00Z',
  '2025-10-15T00:00:00Z',
  0
);

-- Activities for Rome
INSERT INTO activities (trip_stop_id, name, description, category, duration, cost, rating, image, date, start_time)
VALUES
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Colosseum Tour', 'Guided tour of the iconic Colosseum.', 'Sightseeing', 120, 2500, 4.8, 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800', '2026-06-12', '09:00'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Trastevere Food Tour', 'Taste the best local dishes in Trastevere.', 'Food', 180, 4500, 4.9, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800', '2026-06-13', '12:30'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Roman Forum', 'Explore the ruins of ancient Rome.', 'Sightseeing', 120, 1800, 4.6, 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800', '2026-06-14', '15:00');

-- Activities for Florence
INSERT INTO activities (trip_stop_id, name, description, category, duration, cost, rating, image, date, start_time)
VALUES
  ('d4e5f6a7-b8c9-0123-defa-234567890123', 'Uffizi Gallery', 'World-renowned renaissance art museum.', 'Culture', 180, 2200, 4.8, 'https://images.unsplash.com/photo-1572953109213-3be62398eb95?auto=format&fit=crop&q=80&w=800', '2026-06-14', '10:00');

-- Activities for Venice
INSERT INTO activities (trip_stop_id, name, description, category, duration, cost, rating, image, date, start_time)
VALUES
  ('e5f6a7b8-c9d0-1234-efab-345678901234', 'Gondola Ride', 'Romantic ride through the canals of Venice.', 'Relaxation', 45, 7000, 4.7, 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&q=80&w=800', '2026-06-16', '17:00');

-- Expenses for Trip 1
INSERT INTO expenses (trip_id, category, amount, date)
VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Transport', 12000, '2026-06-12T00:00:00Z'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Accommodation', 18000, '2026-06-12T00:00:00Z'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Activities', 9500, '2026-06-12T00:00:00Z'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Meals', 7000, '2026-06-12T00:00:00Z');

-- =============================================
-- DONE! Verify with: SELECT * FROM trips;
-- =============================================

-- ADD CURRENCY TO EXISTING TRIPS TABLE
ALTER TABLE trips ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'INR';

