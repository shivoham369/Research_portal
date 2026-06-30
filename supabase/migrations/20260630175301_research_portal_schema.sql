/*
# Research Portal Database Schema

1. Purpose
This migration creates the database schema for the Research Wing Portal at IIT Kanpur.
It includes tables for professors, labs, and project vacancies to enable students
to discover research opportunities across various departments.

2. New Tables
- `departments` - List of academic departments at IITK
  - id (uuid, primary key)
  - name (text, unique, not null)
  - code (text, unique, not null) - e.g., 'CSE', 'EE', 'ME'
  - created_at (timestamp)

- `professors` - Faculty members and researchers
  - id (uuid, primary key)
  - name (text, not null)
  - email (text, unique, not null)
  - department_id (uuid, foreign key to departments)
  - designation (text) - e.g., 'Professor', 'Associate Professor'
  - research_interests (text[]) - Array of research areas
  - profile_image_url (text)
  - google_scholar_url (text)
  - is_accepting_students (boolean, default false)
  - created_at (timestamp)

- `labs` - Research laboratories
  - id (uuid, primary key)
  - name (text, not null)
  - department_id (uuid, foreign key to departments)
  - head_professor_id (uuid, foreign key to professors)
  - description (text)
  - location (text)
  - website_url (text)
  - research_areas (text[])
  - created_at (timestamp)

- `project_vacancies` - Live project opportunities in labs
  - id (uuid, primary key)
  - lab_id (uuid, foreign key to labs)
  - professor_id (uuid, foreign key to professors)
  - title (text, not null)
  - description (text)
  - requirements (text[])
  - duration (text) - e.g., '6 months', '1 year'
  - spots_available (integer)
  - deadline (date)
  - is_active (boolean, default true)
  - created_at (timestamp)

3. Security
- Enable RLS on all tables.
- This is a public-facing portal (no sign-in required).
- Allow anon + authenticated users to read all data.
- Insert/update/delete operations require authenticated role for admin purposes.

4. Additional Notes
- The schema supports filtering professors and labs by department.
- Project vacancies can be filtered by lab, professor, and department.
- Research interests and areas stored as text arrays for flexible querying.
*/

-- Departments table
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  code text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Professors table
CREATE TABLE IF NOT EXISTS professors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  designation text,
  research_interests text[],
  profile_image_url text,
  google_scholar_url text,
  is_accepting_students boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Labs table
CREATE TABLE IF NOT EXISTS labs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  head_professor_id uuid REFERENCES professors(id) ON DELETE SET NULL,
  description text,
  location text,
  website_url text,
  research_areas text[],
  created_at timestamptz DEFAULT now()
);

-- Project Vacancies table
CREATE TABLE IF NOT EXISTS project_vacancies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lab_id uuid REFERENCES labs(id) ON DELETE CASCADE,
  professor_id uuid REFERENCES professors(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  requirements text[],
  duration text,
  spots_available integer DEFAULT 1,
  deadline date,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE professors ENABLE ROW LEVEL SECURITY;
ALTER TABLE labs ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_vacancies ENABLE ROW LEVEL SECURITY;

-- Departments policies (public read)
DROP POLICY IF EXISTS "anon_read_departments" ON departments;
CREATE POLICY "anon_read_departments" ON departments FOR SELECT
  TO anon, authenticated USING (true);

-- Professors policies (public read)
DROP POLICY IF EXISTS "anon_read_professors" ON professors;
CREATE POLICY "anon_read_professors" ON professors FOR SELECT
  TO anon, authenticated USING (true);

-- Labs policies (public read)
DROP POLICY IF EXISTS "anon_read_labs" ON labs;
CREATE POLICY "anon_read_labs" ON labs FOR SELECT
  TO anon, authenticated USING (true);

-- Project Vacancies policies (public read, active vacancies only for anon)
DROP POLICY IF EXISTS "anon_read_vacancies" ON project_vacancies;
CREATE POLICY "anon_read_vacancies" ON project_vacancies FOR SELECT
  TO anon, authenticated USING (is_active = true OR auth.uid() IS NOT NULL);

-- Insert sample departments
INSERT INTO departments (name, code) VALUES
  ('Computer Science & Engineering', 'CSE'),
  ('Electrical Engineering', 'EE'),
  ('Mechanical Engineering', 'ME'),
  ('Biological Sciences & Bioengineering', 'BSBE'),
  ('Chemical Engineering', 'CHE'),
  ('Civil Engineering', 'CE'),
  ('Materials Science & Engineering', 'MSE'),
  ('Physics', 'PHY'),
  ('Chemistry', 'CHM'),
  ('Mathematics', 'MTH')
ON CONFLICT (code) DO NOTHING;

-- Insert sample professors
INSERT INTO professors (name, email, department_id, designation, research_interests, is_accepting_students) VALUES
  ('Dr. Amit Sharma', 'amit.sharma@iitk.ac.in', (SELECT id FROM departments WHERE code = 'CSE'), 'Professor', ARRAY['Machine Learning', 'Computer Vision', 'Deep Learning'], true),
  ('Dr. Priya Verma', 'priya.verma@iitk.ac.in', (SELECT id FROM departments WHERE code = 'CSE'), 'Associate Professor', ARRAY['Natural Language Processing', 'AI Ethics'], true),
  ('Dr. Rajesh Kumar', 'rajesh.kumar@iitk.ac.in', (SELECT id FROM departments WHERE code = 'EE'), 'Professor', ARRAY['Signal Processing', 'Communications'], true),
  ('Dr. Sneha Gupta', 'sneha.gupta@iitk.ac.in', (SELECT id FROM departments WHERE code = 'EE'), 'Assistant Professor', ARRAY['VLSI Design', 'Embedded Systems'], false),
  ('Dr. Anand Singh', 'anand.singh@iitk.ac.in', (SELECT id FROM departments WHERE code = 'ME'), 'Professor', ARRAY['Robotics', 'Control Systems', 'Mechatronics'], true),
  ('Dr. Kavita Reddy', 'kavita.reddy@iitk.ac.in', (SELECT id FROM departments WHERE code = 'BSBE'), 'Professor', ARRAY['Biotechnology', 'Genomics', 'Protein Engineering'], true),
  ('Dr. Vikram Patel', 'vikram.patel@iitk.ac.in', (SELECT id FROM departments WHERE code = 'PHY'), 'Associate Professor', ARRAY['Quantum Computing', 'Condensed Matter Physics'], true),
  ('Dr. Meera Nair', 'meera.nair@iitk.ac.in', (SELECT id FROM departments WHERE code = 'CHM'), 'Professor', ARRAY['Organic Chemistry', 'Catalysis', 'Drug Discovery'], false)
ON CONFLICT (email) DO NOTHING;

-- Insert sample labs
INSERT INTO labs (name, department_id, head_professor_id, description, location, research_areas) VALUES
  ('AI & Machine Learning Lab', (SELECT id FROM departments WHERE code = 'CSE'), (SELECT id FROM professors WHERE email = 'amit.sharma@iitk.ac.in'), 'State-of-the-art facility for ML and AI research', 'Room 201, CSE Building', ARRAY['Machine Learning', 'Computer Vision', 'Deep Learning']),
  ('Communication Systems Lab', (SELECT id FROM departments WHERE code = 'EE'), (SELECT id FROM professors WHERE email = 'rajesh.kumar@iitk.ac.in'), 'Advanced research in wireless communications', 'Room 105, Electrical Engineering Building', ARRAY['Signal Processing', '5G/6G Networks', 'IoT']),
  ('Robotics & Automation Lab', (SELECT id FROM departments WHERE code = 'ME'), (SELECT id FROM professors WHERE email = 'anand.singh@iitk.ac.in'), 'Cutting-edge robotics research facility', 'Room 310, ME Building', ARRAY['Robotics', 'Control Systems', 'Autonomous Vehicles']),
  ('Systems Biology Lab', (SELECT id FROM departments WHERE code = 'BSBE'), (SELECT id FROM professors WHERE email = 'kavita.reddy@iitk.ac.in'), 'Interdisciplinary lab for biological systems research', 'Room 402, BSBE Building', ARRAY['Systems Biology', 'Genomics', 'Bioinformatics']),
  ('Quantum Information Lab', (SELECT id FROM departments WHERE code = 'PHY'), (SELECT id FROM professors WHERE email = 'vikram.patel@iitk.ac.in'), 'Research facility for quantum computing and information', 'Room 215, Physics Building', ARRAY['Quantum Computing', 'Quantum Information', 'Cryptography'])
ON CONFLICT DO NOTHING;

-- Insert sample project vacancies
INSERT INTO project_vacancies (lab_id, professor_id, title, description, requirements, duration, spots_available, deadline, is_active) VALUES
  ((SELECT id FROM labs WHERE name = 'AI & Machine Learning Lab'), (SELECT id FROM professors WHERE email = 'amit.sharma@iitk.ac.in'), 'Deep Learning for Medical Imaging', 'Developing AI models for automated diagnosis using medical imaging data. The project involves training state-of-the-art neural networks on hospital datasets.', ARRAY['Python proficiency', 'Basic ML knowledge', 'Interest in healthcare'], '6 months', 2, '2024-08-15', true),
  ((SELECT id FROM labs WHERE name = 'Robotics & Automation Lab'), (SELECT id FROM professors WHERE email = 'anand.singh@iitk.ac.in'), 'Autonomous Drone Navigation', 'Building navigation systems for autonomous drones in indoor environments using SLAM and computer vision.', ARRAY['C++ programming', 'ROS basics', 'Robotics interest'], '1 year', 1, '2024-07-30', true),
  ((SELECT id FROM labs WHERE name = 'Systems Biology Lab'), (SELECT id FROM professors WHERE email = 'kavita.reddy@iitk.ac.in'), 'Drug Discovery Pipeline', 'Computational approaches for identifying potential drug candidates using machine learning on biological datasets.', ARRAY['Python', 'Bioinformatics basics', 'Database knowledge'], '8 months', 2, '2024-08-20', true),
  ((SELECT id FROM labs WHERE name = 'Quantum Information Lab'), (SELECT id FROM professors WHERE email = 'vikram.patel@iitk.ac.in'), 'Quantum Algorithm Development', 'Research on quantum algorithms for optimization problems with applications in logistics and finance.', ARRAY['Linear algebra', 'Quantum mechanics basics', 'Programming'], '6 months', 1, '2024-08-01', true),
  ((SELECT id FROM labs WHERE name = 'Communication Systems Lab'), (SELECT id FROM professors WHERE email = 'rajesh.kumar@iitk.ac.in'), '5G Network Optimization', 'Research on resource allocation and optimization for next-generation wireless networks.', ARRAY['Signals & Systems', 'MATLAB', 'Communication theory'], '4 months', 2, '2024-07-25', true)
ON CONFLICT DO NOTHING;
