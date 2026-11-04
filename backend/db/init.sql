CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(20),
  department VARCHAR(100),
  year INTEGER CHECK (year >= 1 AND year <= 4),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed data
INSERT INTO students (name, email, phone, department, year) VALUES
  ('Alice Johnson', 'alice@example.com', '555-0101', 'Computer Science', 2),
  ('Bob Smith', 'bob@example.com', '555-0102', 'Mathematics', 3),
  ('Carol White', 'carol@example.com', '555-0103', 'Physics', 1),
  ('David Brown', 'david@example.com', '555-0104', 'Computer Science', 4),
  ('Eva Martinez', 'eva@example.com', '555-0105', 'Chemistry', 2),
  ('Frank Lee', 'frank@example.com', '555-0106', 'Mathematics', 1),
  ('Grace Kim', 'grace@example.com', '555-0107', 'Physics', 3),
  ('Henry Davis', 'henry@example.com', '555-0108', 'Computer Science', 2)
ON CONFLICT (email) DO NOTHING;

