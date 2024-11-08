import React, { useState } from 'react';
import './Leaderboard.css';

const Leaderboard = ({ data }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="leaderboard">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th style={{width: '50%'}}>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <tr
                className={`rank-row ${item.id === 1 ? 'highlight' : ''}`}
                onClick={() => toggleExpand(item.id)}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  {item.id <= 5 && <div className="trophy-icon">🏆 {item.id}</div>}
                </td>
                <td>{item.username}</td>
              </tr>
              {expandedRow === item.id && (
                <tr className="details-row">
                  <td colSpan="2">
                    <div className="extra-info">
                      <span>Joining Date: {item.joiningDate}</span>
                      <span style={{ marginLeft: '33%' }}>Days Count: {item.daysCount}</span>
                      <span style={{ marginLeft: '28%' }}>Referrals: {item.referrals}</span>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
