import{z}from'zod';
const id=z.string().min(1);
export const scoringPolicySchema=z.object({policyKey:z.string().trim().min(2).max(80),rules:z.object({useQuestionMarks:z.boolean(),correctPoints:z.number(),useQuestionPenalty:z.boolean(),wrongPenalty:z.number().min(0),skipPoints:z.number(),scale:z.number().int().min(0).max(3),roundingMode:z.enum(['HALF_UP','DOWN','UP']),reviewPolicy:z.record(z.string(),z.json()).default({})})});
export const targetSchema=z.object({universityId:id,programId:id.optional(),intake:z.string().max(80).optional(),examDate:z.coerce.date().optional()});
export const startAttemptSchema=z.object({mockVersionId:id,startKey:z.string().min(8).max(120)});
export const saveAnswerSchema=z.object({operationId:z.string().min(8).max(120),questionVersionId:id,revision:z.number().int().positive(),selectedOptionPositions:z.array(z.number().int().positive()).max(20)});
