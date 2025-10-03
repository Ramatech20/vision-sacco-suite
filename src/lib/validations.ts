import { z } from "zod";

// Member validation schema
export const memberSchema = z.object({
  first_name: z.string()
    .trim()
    .min(1, "First name is required")
    .max(100, "First name must be less than 100 characters"),
  last_name: z.string()
    .trim()
    .min(1, "Last name is required")
    .max(100, "Last name must be less than 100 characters"),
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters")
    .optional()
    .or(z.literal("")),
  phone: z.string()
    .trim()
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number format")
    .max(20, "Phone number must be less than 20 characters")
    .optional()
    .or(z.literal("")),
  national_id: z.string()
    .trim()
    .max(50, "National ID must be less than 50 characters")
    .optional()
    .or(z.literal("")),
  date_of_birth: z.string().optional().or(z.literal("")),
  gender: z.enum(["male", "female", "other"]).optional().or(z.literal("")),
  address: z.string()
    .trim()
    .max(500, "Address must be less than 500 characters")
    .optional()
    .or(z.literal("")),
});

// Loan application validation schema
export const loanSchema = z.object({
  principal_amount: z.number()
    .positive("Loan amount must be positive")
    .max(10000000, "Loan amount is too large"),
  interest_rate: z.number()
    .min(0, "Interest rate cannot be negative")
    .max(100, "Interest rate cannot exceed 100%"),
  duration_months: z.number()
    .int("Duration must be a whole number")
    .positive("Duration must be positive")
    .max(360, "Duration cannot exceed 360 months"),
  purpose: z.string()
    .trim()
    .min(10, "Purpose must be at least 10 characters")
    .max(1000, "Purpose must be less than 1000 characters"),
});

// Transaction validation schema
export const transactionSchema = z.object({
  amount: z.number()
    .positive("Amount must be positive")
    .max(10000000, "Amount is too large"),
  transaction_type: z.enum(["deposit", "withdrawal", "loan_payment", "loan_disbursement", "transfer"]),
  description: z.string()
    .trim()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .or(z.literal("")),
});

// Auth validation schemas
export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
});

export type MemberFormData = z.infer<typeof memberSchema>;
export type LoanFormData = z.infer<typeof loanSchema>;
export type TransactionFormData = z.infer<typeof transactionSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
