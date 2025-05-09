import React from 'react';

const callApi = async (endpoint, method = 'GET', body = null) => {
  const res = await fetch(`http://localhost:5000/api/${endpoint}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : null
  });
  const data = await res.json();
  console.log(data);
};

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>MongoDB Ops Demo</h1>
      <button onClick={() => callApi('insertOne', 'POST', { name: "Alice", age: 25, email: "alice@example.com", city: "NY", active: true })}>Insert One</button>
      <button onClick={() => callApi('find')}>Find</button>
      <button onClick={() => callApi('updateOne?name=Alice', 'PATCH', { $set: { age: 30 } })}>Update Alice</button>
      <button onClick={() => callApi('deleteOne?name=Alice', 'DELETE')}>Delete Alice</button>
    </div>
  );
}

export default App;
