//TODO: Make sure this file is set up correctly for supabase

import Joi from "joi";

// Define validation schemas for different database collections
const validationSchemas = {
  employees: Joi.object({
    // MATCH WITH EMPLOYEE TABLE COLUMNS
    employee_id: Joi.number().integer().optional(), // Primary Key (auto-increment)
    user_id: Joi.string().uuid().optional().allow(null), // Supabase UUID
    first_name: Joi.string().trim().min(1).max(50).required(),
    last_name: Joi.string().trim().min(1).max(50).required(),
    position_id: Joi.number().integer().optional().allow(null),
    location_id: Joi.number().integer().optional().allow(null),
    email: Joi.string().email().required(),
    phone_number: Joi.string()
      .pattern(/^[0-9-]+$/)
      .min(10)
      .max(15)
      .optional()
      .allow(null, ""),
    is_hourly: Joi.boolean().required(),
    is_salaried: Joi.boolean().required(),
    is_active: Joi.boolean().required(),
  }),

  Location: Joi.object({
    // MATCH WITH LOCATION TABLE COLUMNS
    id: Joi.number().integer().optional(), // Primary Key (auto-increment)
    name: Joi.string().trim().min(1).max(100).required(),
    count: Joi.number().integer().optional().allow(null),
    address: Joi.string().trim().max(255).optional().allow(null, ""),
  }),

  Position: Joi.object({
    // MATCH WITH POSITION TABLE COLUMNS
    id: Joi.number().integer().optional(), // Primary Key (auto-increment)
    name: Joi.string().trim().min(1).max(100).required(),
    count: Joi.number().integer().optional().allow(null),
  }),

  Shift: Joi.object({
    id: Joi.number().integer().required(), // Primary Key (required)
    created_at: Joi.date().iso().optional(), // Timestamp with time zone
    start_time: Joi.date().iso().optional().allow(null), // Timestamp without time zone
    end_time: Joi.date().iso().optional().allow(null), // Timestamp without time zone
    up_for_trade: Joi.boolean().optional().allow(null), // Boolean
    duration: Joi.number().integer().optional().allow(null), // bigint
  }),
};

// Function to validate data dynamically based on `dbTitle`
export const validateData = (dbTitle, data) => {
  const schema = validationSchemas[dbTitle];
  if (!schema) {
    throw new Error(`No validation schema found for '${dbTitle}'`);
  }
  return schema.validate(data, { abortEarly: false });
};
