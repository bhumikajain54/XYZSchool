/**
 * XYZ School Management System - API Service Layer
 * Centralized fetch utilities for backend integration.
 */

const BASE_URL = 'http://localhost:8080/api'; // Standard Spring Boot port

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(error.message || `HTTP Error: ${response.status}`);
  }
  return response.json();
};

export const api = {
  // Library Dashboard & Inventory
  library: {
    getSummary: () => fetch(`${BASE_URL}/dashboard/summary`).then(handleResponse),
    getBooks: () => fetch(`${BASE_URL}/books`).then(handleResponse),
    getBook: (id) => fetch(`${BASE_URL}/books/${id}`).then(handleResponse),
    addBook: (data) => fetch(`${BASE_URL}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),
    updateBook: (id, data) => fetch(`${BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),
    deleteBook: (id) => fetch(`${BASE_URL}/books/${id}`, {
      method: 'DELETE'
    }).then(handleResponse),
    
    // Circulation
    getIssuedBooks: () => fetch(`${BASE_URL}/library/issued`).then(handleResponse),
    issueBook: (data) => fetch(`${BASE_URL}/library/issue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),
    returnBook: (issueId) => fetch(`${BASE_URL}/library/return/${issueId}`, {
      method: 'POST'
    }).then(handleResponse),
  }
};

