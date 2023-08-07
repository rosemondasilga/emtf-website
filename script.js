console.log('testing...');

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient('https://usfjmohkctzxjizmledb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzZmptb2hrY3R6eGppem1sZWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEyNjQ3MDgsImV4cCI6MjAwNjg0MDcwOH0.Leblc7VH2rYfJTQKwFc3s6mON8-PbNLNzJrZvh94Tlg')
// const supabaseUrl = process.env.SUPABASE_URL
// const supabaseKey = process.env.SUPABASE_KEY
// const mySupabase = createClient(supabaseUrl, supabaseKey)

const fetchSupabase = async () => {
    // getting data from the users table
    const { data, error } = await supabase
        .from('Users')
        .select('*')

        console.log('fetching data');
        if (error) console.log('error', error)
        console.log('data', data)
}

console.log('Supabase Instance: ', supabase)
fetchSupabase()

const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');

const signupFormData = new FormData(signupForm);
const username = signupFormData.get('username');
const email = signupFormData.get('email');
const password = signupFormData.get('password');

const loginFormData = new FormData(loginForm);
const loginEmail = loginFormData.get('email');
const loginPassword = loginFormData.get('password');


signupForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Validate the form data (if needed)
    if (!email || !password) {
        alert('Please fill in all the fields.');
        return;
    }

    // Construct the data payload to send to Supabase
    const data = {
        username: username,
        email: email,
        password: password,
    };

    // Send the data to Supabase using fetch()
    fetch('https://usfjmohkctzxjizmledb.supabase.co/Users', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzZmptb2hrY3R6eGppem1sZWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEyNjQ3MDgsImV4cCI6MjAwNjg0MDcwOH0.Leblc7VH2rYfJTQKwFc3s6mON8-PbNLNzJrZvh94Tlg',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        // Handle the response from Supabase
        console.log('Data sent successfully:', result);

        // Optionally, clear the form after successful submission
        form.reset();
    })
    .catch(error => {
        console.error('Error sending data:', error);
    });
    
    // Use Supabase's auth.signUp() method
    
    supabase.auth.signUp({ email, password })
    .then(response => {
        console.log('Sign-up successful:', response);
        // Optionally, you can redirect the user to a login page after successful sign-up.
    })
    .catch(error => {
        console.error('Sign-up error:', error);
    });
    
    // Use Supabase's auth.signIn() method
    supabase.auth.signIn({ loginEmail, loginPassword })
    .then(response => {
        console.log('Login successful:', response);
        // Optionally, you can redirect the user to a dashboard or protected page after successful login.
    })
    .catch(error => {
        console.error('Login error:', error);
    });       
});
