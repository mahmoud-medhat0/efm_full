import React, { useState } from 'react';
import './Leaderboard.css';

const Leaderboard = ({ data }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleExpand = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
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
                className={`rank-row ${index === 0 ? 'highlight' : ''}`}
                onClick={() => toggleExpand(index)}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <div className="trophy-icon">{index < 5 ? `🏆 ${index + 1}` : index + 1}</div>
                </td>
                <td>{item.username}</td>
              </tr>
              {expandedRow === index && (
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
