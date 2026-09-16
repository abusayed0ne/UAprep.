export interface JobEnvelope<T = unknown> { id:string; type:string; tenantId:string; correlationId:string; payload:T; }
export async function handleJob(job:JobEnvelope):Promise<void> {
  // Deliberately fail closed until a typed, idempotent handler is registered.
  throw new Error(`No registered handler for job type: ${job.type}`);
}
if (process.env.NODE_ENV !== 'test') console.info(JSON.stringify({ level:'info', message:'worker_started' }));
