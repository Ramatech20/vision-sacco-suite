CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email varchar(255) UNIQUE NOT NULL,
  password_hash varchar(255) NOT NULL,
  role varchar(50) NOT NULL DEFAULT 'member',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id uuid REFERENCES users(id),
  balance numeric(14,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid REFERENCES accounts(id),
  amount numeric(14,2) NOT NULL,
  type varchar(10) NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);
