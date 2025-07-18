import React, { useEffect, useState } from 'react'

function UserSelector() {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState('')
  const [newUserName, setNewUserName] = useState('')

  // Fetch all users from backend
  const fetchUsers = async () => {
    const res = await fetch('https://leaderboard-project-backend.onrender.com/api/users')
    const data = await res.json()
    setUsers(data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Claim points
  const handleClaim = async () => {
    if (!selectedUser) {
      alert('Please select a user first.')
      return
    }

    const res = await fetch('https://leaderboard-project-backend.onrender.com/api/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: selectedUser })
    })

    const data = await res.json()
    alert(`${data.user.name} claimed ${data.claimedPoints} points 🎉`)
    fetchUsers()
  }

  // Add new user
  const handleAddUser = async () => {
  const nameRegex = /^(?![_\d])[A-Za-z][A-Za-z0-9_]{3,}$/;

  if (!newUserName.trim()) {
    alert('Name is required!');
    return;
  }

  if (!nameRegex.test(newUserName)) {
    alert('Invalid name.\nName must:\n• Start with a letter\n• Be at least 4 characters\n• Include only letters, numbers, or underscore\n• Cannot start with number or underscore');
    return;
  }

  try {
    const res = await fetch('https://leaderboard-project-backend.onrender.com/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newUserName })
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert(errorData.message || 'Something went wrong!');
      return;
    }

    setNewUserName('');
    fetchUsers();
  } catch (error) {
    alert('Server error. Please try again later.');
  }
};

  return (
    <div style={{ marginBottom: '1rem' }}>
      <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
      <button onClick={handleClaim} style={{ marginLeft: '10px' }}>Claim Points</button>

      <div style={{ marginTop: '1rem' }}>
        <input
          type="text"
          value={newUserName}
          placeholder="New user name"
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <button onClick={handleAddUser} style={{ marginLeft: '10px' }}>Add User</button>
      </div>
    </div>
  )
}

export default UserSelector