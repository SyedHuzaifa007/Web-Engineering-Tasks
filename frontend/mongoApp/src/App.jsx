import React, { useState } from 'react';

const callApi = async (endpoint, method = 'GET', body = null) => {
  const res = await fetch(`http://localhost:5000/api/${endpoint}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : null
  });
  return res.json();
};

function App() {
  const [result, setResult] = useState(null);

  const actions = {
    getAllData: () => callApi('find'),
    insertOne: () => callApi('insertOne', 'POST', { name: "Alice", age: 25, email: "alice@example.com", city: "NY", active: true }),
    insertMany: () => callApi('insertMany', 'POST', [
      { name: "Bob", age: 20, email: "bob@example.com", city: "LA" },
      { name: "Charlie", age: 30, email: "charlie@example.com", city: "SF" }
    ]),
    find: () => callApi('find'),
    findOne: () => callApi('findOne?name=Alice'),
    findLimit: () => callApi('findLimit'),
    findSkip: () => callApi('findSkip'),
    findSort: () => callApi('findSort'),
    distinctCities: () => callApi('distinctCities'),
    countDocs: () => callApi('countDocs'),
    updateOne: () => callApi('updateOne?name=Alice', 'PATCH', { $set: { age: 30 } }),
    updateMany: () => callApi('updateMany', 'PATCH', { $set: { minor: true } }),
    replaceOne: () => callApi('replaceOne?name=Alice', 'PUT', { name: "Alice", age: 35 }),
    deleteOne: () => callApi('deleteOne?name=Bob', 'DELETE'),
    deleteMany: () => callApi('deleteMany', 'DELETE', { inactive: true }),
    aggregate: () => callApi('aggregate', 'POST', [
      { $match: { age: { $gt: 18 } } },
      { $group: { _id: "$city", count: { $sum: 1 } } }
    ]),
    createIndex: () => callApi('createIndex', 'POST', { field: { email: 1 }, options: { unique: true } }),
    dropIndex: () => callApi('dropIndex', 'POST', { name: 'email_1' }),
    getIndexes: () => callApi('getIndexes'),
    findOneAndUpdate: () => callApi('findOneAndUpdate?name=Alice', 'PATCH', { $set: { active: false } }),
    findOneAndDelete: () => callApi('findOneAndDelete?name=Charlie', 'DELETE'),
    bulkWrite: () => callApi('bulkWrite', 'POST', [
      { insertOne: { document: { name: "Dan", email: "dan@example.com" } } },
      { updateOne: { filter: { name: "Alice" }, update: { $set: { age: 29 } } } }
    ]),
    findOneAndReplace: () => callApi('findOneAndReplace?name=Alice', 'PUT', { name: "Alice", age: 35 }),
    renameCollection: () => callApi('renameCollection', 'POST', { newName: 'usersRenamed' }),
    dropCollection: () => callApi('dropCollection', 'DELETE'),
    listCollections: () => callApi('listCollections')
  };

  const handleAction = async (key) => {
    try {
      const data = await actions[key]();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>MongoDB Operations</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: 20 }}>
        {Object.keys(actions).map(key => (
          <button key={key} onClick={() => handleAction(key)}>{key}</button>
        ))}
        <button onClick={() => handleAction('getAllData')}>Show All Data</button>
      </div>

      <h2>Result</h2>
      <pre style={{ background: '#f0f0f0', padding: '10px', borderRadius: '5px', maxHeight: '400px', overflow: 'auto' }}>
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}

export default App;
