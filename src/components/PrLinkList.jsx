import React from 'react';
import { extractOwnerAndRepo } from '../services/gitHub';

const PrLinkList = ({ title, pullRequests, color }) => {
  if (pullRequests.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 style={{ marginTop: '1em' }}>{title}</h3>
      {pullRequests.map(pullRequest => (
        <a
          key={pullRequest.id}
          href={pullRequest.html_url}
          target="_blank"
          className={`ui fluid ${color} card`}
          style={{ fontSize: '85%' }}
        >
          <div className="content">
            <div className="header">
              <span className={`ui large ${color} ribbon label`} style={{ width: '90px' }}>#{pullRequest.number}</span>
              <span
                style={{
                  position: 'relative',
                  top: '4px',
                  display: 'inline-block',
                  width: 'calc(100% - 90px)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {pullRequest.title}
              </span>
            </div>
            <div className="meta" style={{ marginLeft: '73px' }}>
              by <strong>{pullRequest.user.login}</strong>
              in <strong>{extractOwnerAndRepo(pullRequest).repo}</strong>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default PrLinkList;
