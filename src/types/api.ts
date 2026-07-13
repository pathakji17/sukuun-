import { z } from 'zod';
import { MemorySchema, MemoryFilterSchema } from './memory';

// ============================================================================
// API Response Wrapper
// ============================================================================

export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: z.string().optional(),
  timestamp: z.string().optional(),
});

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  timestamp?: string;
};

// ============================================================================
// Memory API Responses
// ============================================================================

export const MemoriesListResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    memories: z.array(MemorySchema),
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
  }),
});

export type MemoriesListResponse = z.infer<typeof MemoriesListResponseSchema>;

export const MemoryDetailResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    memory: MemorySchema,
    related: z.array(MemorySchema).optional(),
  }),
});

export type MemoryDetailResponse = z.infer<typeof MemoryDetailResponseSchema>;

// ============================================================================
// Authentication API
// ============================================================================

export const LoginRequestSchema = z.object({
  password: z.string().min(1),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  sessionToken: z.string().optional(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const AuthStatusResponseSchema = z.object({
  success: z.boolean(),
  authenticated: z.boolean(),
  sessionExpiry: z.number().optional(),
});

export type AuthStatusResponse = z.infer<typeof AuthStatusResponseSchema>;

// ============================================================================
// Configuration API
// ============================================================================

export const ConfigUpdateRequestSchema = z.object({
  path: z.string(), // e.g., "theme.name", "animations.enabled"
  value: z.unknown(),
});

export type ConfigUpdateRequest = z.infer<typeof ConfigUpdateRequestSchema>;

export const ConfigUpdateResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  config: z.record(z.string(), z.unknown()).optional(),
});

export type ConfigUpdateResponse = z.infer<typeof ConfigUpdateResponseSchema>;

// ============================================================================
// Error Response
// ============================================================================

export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  code: z.string().optional(),
  details: z.record(z.string(), z.string()).optional(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

// ============================================================================
// Pagination
// ============================================================================

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(20),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
});

export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;

// ============================================================================
// Memory Query
// ============================================================================

export const MemoryQuerySchema = PaginationQuerySchema.extend({
  filter: MemoryFilterSchema.optional(),
  search: z.string().optional(),
});

export type MemoryQuery = z.infer<typeof MemoryQuerySchema>;
