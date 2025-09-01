import {test, expect, request} from '@playwright/test';
//import { request } from 'http';
import{faker} from '@faker-js/faker' ;   

let authToken;
let apiContext
let bookingId;

test.describe.serial('Restful Booker Test Suite', () => {

    // Create a new APIRequestContext before all tests
    test.beforeAll(async () => {
  // Get Auth Token
  const apiContext = await request.newContext();
  const authResponse = await apiContext.post('https://restful-booker.herokuapp.com/auth', {
    headers: { 'Content-Type': 'application/json' },
    data: {
      username: "admin",
      password: "password123"
    }
  });

  const authBody = await authResponse.json();
  authToken = authBody.token;
  console.log(`Auth Token: ${authToken}`);
  await apiContext.dispose();
});

test('post booking', async ({request}) => {

    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        
        data: {
            "firstname" : "Themba",
            "lastname" : "Masilela",
            "totalprice" : 1000,   
            "depositpaid" : true,
            "bookingdates" : {
            "checkin" : "2025-09-09",
        "checkout" : "2019-10-10"
    },
    "additionalneeds" : "Breakfast"
        }
    })
      expect(response.status()).toBe(200)
      const getText = await response.text()
     
      console.log( await response.json())



 });

test('get booking', async ({request}) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking/');
    //expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    // expect(responseBody.data.first_name).toBe('Janet');
    // expect(responseBody.data.last_name).toBe('Weaver');
});



     test('Verify booking can be updated', async () => {
     const apiContext = await request.newContext();
     const today = new Date();
        const checkin = today.toISOString().split('T')[0];

        const checkoutDate = new Date();
        checkoutDate.setDate(today.getDate() + 5);
        const checkout = checkoutDate.toISOString().split('T')[0];


 const response = await apiContext.put(`https://restful-booker.herokuapp.com/booking/1`, {

             headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${authToken}`
             },
            data: {

                firstname: "Themba",
                lastname: faker.person.lastName(),
                totalprice: 800,
                depositpaid: true,
                bookingdates: {
                checkin: checkin,
                checkout: checkout
                },
                additionalneeds: "Extra Towels"
            }
        });

       // expect(response.ok()).toBeTruthy();
       // expect(response.status()).toBe(200);

        const body = await response.json();
        console.log(body);

        //expect(body.firstName).toBe("Themba");
        //expect(body.totalPrice).toBe(800);
    });

    test('Verify booking can be deleted', async () => {
  const apiContext = await request.newContext();

  const response = await apiContext.delete(`https://restful-booker.herokuapp.com/booking/2`, {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `token=${authToken}`
    }
  });

  console.log(`Status: ${response.status()}`);
  console.log(await response.text()); 

  expect(response.status()).toBe(201); 

  await apiContext.dispose();

});
        
});

    
