-- Add document column to profiles (exactly 11 characters for CPF)
ALTER TABLE profiles ADD COLUMN document VARCHAR(11) UNIQUE;
