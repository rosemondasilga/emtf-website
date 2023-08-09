console.log('testing...');

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient('https://usfjmohkctzxjizmledb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzZmptb2hrY3R6eGppem1sZWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEyNjQ3MDgsImV4cCI6MjAwNjg0MDcwOH0.Leblc7VH2rYfJTQKwFc3s6mON8-PbNLNzJrZvh94Tlg')

console.log(supabase);

const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');
const searchForm = document.querySelector('#search-form');
const searchResultsSection = document.querySelector('#search-container');
const header = document.querySelector('h1');

signupForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const signupFormData = new FormData(signupForm);
    const username = signupFormData.get('username');
    const email = signupFormData.get('email');
    const password = signupFormData.get('password');

    // Validate the form data (if needed)
    if (!email || !password) {
        alert('Please fill in all the fields.');
        return;
    }

    // Use Supabase's auth.signUp() method
    try {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            console.error('Login error:', error);
        } else {
            console.log('Login successful:', data);
            // Optionally, you can redirect the user to a dashboard or protected page after successful login.
            // Redirect to the dashboard or protected page
            // window.location.href = '/login.html';

        }
    } catch (error) {
        console.error('An error occurred:', error);
    }

    alert('Please check your email for a verification link.')

    document.getElementById('goToLoginPage').addEventListener('click', function () {
        window.location.href = 'login.html'; // Change 'login.html' to your actual login page URL
    });
});

loginForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const loginFormData = new FormData(loginForm);
    const email = loginFormData.get('email');
    const password = loginFormData.get('password');

    if (!email || !password) {
        alert('Please fill in all the fields.');
        return;
    }
    
    // Use Supabase's auth.signIn() method
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            console.error('Login error:', error);
        } else {
            console.log('Login successful:', data);
            // Optionally, you can redirect the user to a dashboard or protected page after successful login.
            // Redirect to the dashboard or protected page
            window.location.href = '/login.html';

            // User is not authenticated, redirect to login page
            // const user = supabase.auth.user();
            // if (!user) {
            // }

        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
        console.log('User is signed in:', session.user);
        // Redirect to the dashboard or protected page
        window.location.href = '/home.html'; // Replace with your dashboard URL
    } else if (event === 'SIGNED_OUT') {
        console.log('User is signed out.');
        // Redirect to the login page or homepage
        window.location.href = '/login.html'; // Replace with your login page URL
    }
});


searchForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission
    
    const searchFormData = new FormData(searchForm);
    const search = searchFormData.get('search');
    const searchTerm = search.valueOf();    
    
    if (!search) {
        alert('Please enter a school.');
        return;
    }

    console.log(searchTerm);
    
    // Use Supabase's auth.signIn() method
    let {data, error} = await supabase
        .from('List of schools')
        .select()
        .then(response => {
            console.log('Search successful:', response);
            // Optionally, you can redirect the user to a dashboard or protected page after successful login.
        })
        .catch(error => {
            console.error('Search error:', error);
        });   


    header.innerHTML = ``;

    // Display new search results
    if (data && data.length > 0) {
        data.forEach(item => {
            console.log(item);
            // const searchContainer = document.querySelector('#search-container');
            const resultElement = document.createElement('div');
            resultElement.innerHTML = 
                `
                    <div>
                        <p>${item}</p>
                    </div> 
                `;


            //   resultElement.textContent = item.column_name; // Display the relevant column data
            searchResultsSection.appendChild(resultElement);
            // searchContainer.innerHTML = `${resultElement}`;
        });
    } else {
        const noResultsElement = document.createElement('div');
        noResultsElement.textContent = 'No results found.';
        searchResultsSection.appendChild(noResultsElement);
    }
});
