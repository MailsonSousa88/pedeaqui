import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

async function verifyAuth() {
  console.log('--- Starting Auth Verification Flow ---');
  
  const testEmail = `testuser_${Date.now()}@example.com`;
  const testPassword = 'Password123!';
  const testName = 'Test User';
  const testPhone = '11999999999';

  try {
    console.log(`\n[1] Testing Signup with ${testEmail}...`);
    const signupRes = await request.post('/api/auth/signup').send({
      email: testEmail,
      password: testPassword,
      name: testName,
      phone: testPhone,
      document: '52886531863'
    });
    
    console.log(`Signup Response: ${signupRes.status}`);
    console.log(JSON.stringify(signupRes.body, null, 2));

    if (signupRes.status !== 201) {
      console.error('Signup failed, cannot continue test.');
      return;
    }

    console.log(`\n[2] Testing Login with ${testEmail}...`);
    const loginRes = await request.post('/api/auth/login').send({
      email: testEmail,
      password: testPassword
    });

    console.log(`Login Response: ${loginRes.status}`);
    console.log(JSON.stringify(loginRes.body, null, 2));

    if (loginRes.status !== 200 || !loginRes.body.accessToken) {
      console.error('Login failed or missing accessToken, cannot continue test.');
      return;
    }

    const token = loginRes.body.accessToken;

    console.log(`\n[3] Testing Get Me with token...`);
    const meRes = await request.get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    console.log(`Get Me Response: ${meRes.status}`);
    console.log(JSON.stringify(meRes.body, null, 2));

    if (meRes.status === 200) {
      console.log('\n--- Verification Flow Completed Successfully ---');
    } else {
      console.error('\n--- Verification Flow Failed at Get Me ---');
    }

  } catch (error) {
    console.error('An unexpected error occurred during verification:', error);
  }
}

verifyAuth();
