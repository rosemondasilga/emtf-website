console.log('testing...');

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient('https://usfjmohkctzxjizmledb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzZmptb2hrY3R6eGppem1sZWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEyNjQ3MDgsImV4cCI6MjAwNjg0MDcwOH0.Leblc7VH2rYfJTQKwFc3s6mON8-PbNLNzJrZvh94Tlg')

async function fetchSupabase() {
    // getting data from the users table
    const { data, error } = await supabase
        .from('Users')
        .select()

        console.log('fetching data');
        if (error) console.log('error', error)
        console.log('data', data)
}

const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');
const searchForm = document.querySelector('#search-form');
const searchResultsSection = document.querySelector('#search-results');

const signupFormData = new FormData(signupForm);
const searchFormData = new FormData(searchForm);

const username = signupFormData.get('username');
const email = signupFormData.get('email');
const password = signupFormData.get('password');

const search = searchFormData.get('search');

// const loginFormData = new FormData(loginForm);
// const loginEmail = loginFormData.get('email');
// const loginPassword = loginFormData.get('password');


signupForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Validate the form data (if needed)
    // if (!email || !password) {
    //     alert('Please fill in all the fields.');
    //     return;
    // }

    // Construct the data payload to send to Supabase
    const userData = {
        username: username,
        email: email,
        password: password,
    };

    fetchSupabase()
    console.log('Supabase Instance: ', supabase)

    // Use Supabase's auth.signUp() method
    let {data: Users, error} = await supabase.auth.signUp({ username, email, password })
    .then(response => {
        console.log('Sign-up successful:', response);
        // Optionally, you can redirect the user to a login page after successful sign-up.
    })
    .catch(error => {
        console.error('Sign-up error:', error);
    }); 

    // Send the data to Supabase using fetch()
    fetch(supabase, {
        method: 'POST',
        headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        // 'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzZmptb2hrY3R6eGppem1sZWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEyNjQ3MDgsImV4cCI6MjAwNjg0MDcwOH0.Leblc7VH2rYfJTQKwFc3s6mON8-PbNLNzJrZvh94Tlg',
        },
        body: JSON.stringify(userData),
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


});

loginForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission
    if (!email || !password) {
        alert('Please fill in all the fields.');
        return;
    }
    
    // Use Supabase's auth.signIn() method
    let {data, error} = await supabase.auth.signInWithPassword({ email, password })
    .then(response => {
        console.log('Login successful:', response);
        // Optionally, you can redirect the user to a dashboard or protected page after successful login.
    })
    .catch(error => {
        console.error('Login error:', error);
    });     
});