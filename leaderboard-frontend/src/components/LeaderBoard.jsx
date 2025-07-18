import React, { useEffect, useState } from 'react'

function Leaderboard() {
  const [users, setUsers] = useState([])

  const fetchLeaderboard = async () => {
    const res = await fetch('http://localhost:8080/api/users')
    const data = await res.json()
    const sorted = data.sort((a, b) => b.totalPoints - a.totalPoints)
    setUsers(sorted)
  }

  useEffect(() => {
    fetchLeaderboard()

    // Refresh leaderboard every 2 seconds
    const interval = setInterval(fetchLeaderboard, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className={`rank-${index + 1}`}>
              <td className="emoji-rank">
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
              </td>
              <td>{user.name}</td>
              <td>{user.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard