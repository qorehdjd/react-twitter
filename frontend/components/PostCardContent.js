import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

function PostCardContent({ postData }) {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link legacyBehavior href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}>
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
}

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
