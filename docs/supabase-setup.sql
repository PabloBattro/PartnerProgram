-- ============================================================
-- Supabase Setup for PartnerProgram
-- Run this in your Supabase SQL Editor (https://supabase.com)
-- ============================================================

-- UP: Create seller_submissions table
CREATE TABLE seller_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  sales_volume TEXT NOT NULL,
  latam_presence TEXT NOT NULL,
  countries_of_interest TEXT[] DEFAULT '{}',
  partner_types_needed TEXT[] DEFAULT '{}',
  timeline TEXT NOT NULL,
  business_type TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- UP: Create partner_applications table
CREATE TABLE partner_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  countries_served TEXT[] DEFAULT '{}',
  services_offered TEXT[] DEFAULT '{}',
  min_client_size TEXT NOT NULL,
  languages_supported TEXT[] DEFAULT '{}',
  credentials TEXT,
  capacity TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- UP: Enable Row Level Security (allow inserts from anon key)
ALTER TABLE seller_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;

-- UP: Allow anonymous inserts (for the public form)
CREATE POLICY "Allow anonymous inserts on seller_submissions"
  ON seller_submissions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts on partner_applications"
  ON partner_applications FOR INSERT
  TO anon
  WITH CHECK (true);

-- DOWN: Rollback
-- DROP POLICY "Allow anonymous inserts on seller_submissions" ON seller_submissions;
-- DROP POLICY "Allow anonymous inserts on partner_applications" ON partner_applications;
-- DROP TABLE seller_submissions;
-- DROP TABLE partner_applications;



