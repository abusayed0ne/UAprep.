import{ServiceUnavailableException}from'@nestjs/common';
import{describe,expect,it}from'vitest';
import{UnconfiguredGatewayVerifier}from'./commerce.service.js';
describe('payment verification',()=>{it('fails closed until a real gateway verifier is configured',async()=>{
  await expect(new UnconfiguredGatewayVerifier().verify()).rejects.toBeInstanceOf(ServiceUnavailableException);
});});
