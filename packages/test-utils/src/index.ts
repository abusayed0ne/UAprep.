export const DEMO_CONTENT_POLICY = Object.freeze({ sourceType:'ORIGINAL_IN_HOUSE', officialQuestion:false });
export function fictionalTenant(overrides:Partial<{id:string;slug:string}> = {}) { return { id:'tenant_test', slug:'fictional-academy', ...overrides }; }
