const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8887/api/v1/employees';

// Helper: safely parse JSON body (handles empty-body responses without throwing)
async function safeJson(response) {
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}

test.describe('Employee API - POST /api/v1/employees', () => {

    test('TC_API_01: Positive - Create employee with valid data should return 201', async ({ request }) => {
        const response = await request.post(BASE_URL, {
            data: {
                dob: '1990-01-01',
                email: 'test@example.com',
                firstName: 'Ploy',
                id: 0,
                lastName: 'Pitcha',
            },
        });

        expect(response.status()).toBe(201);

        const body = await safeJson(response);

        // NOTE: current backend returns an empty body on 201 (known issue - see bug report).
        // Once fixed, the assertions below validate the created employee is returned correctly.
        expect(body).not.toBeNull();
        expect(body.email).toBe('test@example.com');
        expect(body.firstName).toBe('Ploy');
        expect(body.lastName).toBe('Pitcha');
    });

    test('TC_API_02: Negative - Create employee with invalid email should return 400', async ({ request }) => {
        const response = await request.post(BASE_URL, {
            data: {
                dob: '1990-01-01',
                email: 'invalid-email-no-at-sign',
                firstName: 'Ploy',
                id: 0,
                lastName: 'Pitcha',
            },
        });

        expect(response.status()).toBe(400);

        const body = await safeJson(response);
        expect(body.defaultMessage).toBe('must be a well-formed email address');
        expect(body.field).toBe('email');
    });
});

test.describe('Employee API - GET /api/v1/employees/{id}', () => {

    test('TC_API_03: Positive - Get employee with existing id should return 200', async ({ request }) => {
        // Arrange: create an employee first so we have a known, existing id to fetch.
        const createResponse = await request.post(BASE_URL, {
            data: {
                dob: '1990-01-01',
                email: 'getcheck@example.com',
                firstName: 'Ploy',
                id: 0,
                lastName: 'Pitcha',
            },
        });
        expect(createResponse.status()).toBe(201);

        const created = await safeJson(createResponse);
        const employeeId = created?.id;
        expect(employeeId).toBeDefined();

        // Act
        const response = await request.get(`${BASE_URL}/${employeeId}`);

        // Assert
        expect(response.status()).toBe(200);

        const body = await safeJson(response);
        expect(body.id).toBe(employeeId);
        expect(body.email).toBe('getcheck@example.com');
    });

    test('TC_API_04: Negative - Get employee with non-existing id should return 404', async ({ request }) => {
        const nonExistingId = 999999999;

        const response = await request.get(`${BASE_URL}/${nonExistingId}`);

        expect(response.status()).toBe(404);

        const body = await safeJson(response);
        expect(body.message).toBe(`Employee not found with ID ${nonExistingId}`);
    });
});