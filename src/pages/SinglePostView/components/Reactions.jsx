import {
  RiHeart2Line,
  RiHeart2Fill,
  RiBookmarkLine,
  RiBookmarkFill,
} from 'react-icons/ri';
import { MdOutlineModeComment } from 'react-icons/md';
import { Fragment, useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { isInArray } from '../../../utils/string';

const Reactions = ({ commentRef, post, id, onPostActions, isLoading }) => {
  const scrollToComment = () => {
    if (commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [buttonAnimate, setButtonAnimate] = useState({
    likeAnimate: false,
    bookmarkAnimate: false,
  });

  useEffect(() => {
    if (!isLoading) {
      setButtonAnimate(!buttonAnimate);
    }
  }, [isLoading]);

  const isLiked = isInArray(post.likes, id);
  const isBookmarked = isInArray(post.bookmarks, id);

  const handlePostActions = (type) => {
    let isLikedOrBookmarked;
    const actions = {
      like: () => {
        setButtonAnimate({ likeAnimate: true });
        onPostActions(post.id, type, id, (isLikedOrBookmarked = isLiked));
      },
      bookmark: () => {
        setButtonAnimate({ bookmarkAnimate: true });

        onPostActions(post.id, type, id, (isLikedOrBookmarked = isBookmarked));
      },
    };

    actions[type]();
  };

  return (
    <Fragment>
      <div className='grid fixed top-40 w-16'>
        <div className='grid grid-flow-raw gap-4 justify-stretch top-10'>
          <Tippy
            placement='bottom'
            content={`${isLiked ? 'Unlike this post' : 'Like this post'}`}
          >
            <div className='inline-flex flex-col items-center space-y-4 '>
              <button
                className='inline-flex items-center relative justify-center group'
                onClick={() => handlePostActions('like')}
                disabled={isLoading}
              >
                <div className='z-10'>
                  {isLiked ? (
                    <RiHeart2Fill
                      size={28}
                      className={`
                     ${
                       isLoading && buttonAnimate.likeAnimate
                         ? 'animate-bounce'
                         : ''
                     } text-pink-500 rounded-full `}
                    />
                  ) : (
                    <RiHeart2Line
                      size={28}
                      className={`
                     ${
                       isLoading && buttonAnimate.likeAnimate
                         ? 'animate-bounce'
                         : ''
                     } group-hover:text-pink-500`}
                    />
                  )}
                </div>
                <span
                  className={`${isLiked ? 'border-pink-500 bg-pink-100' : ''} ${
                    isLoading && buttonAnimate.likeAnimate
                      ? 'border-t-2 border-t-pink-500 animate-spin'
                      : ''
                  } p-6 rounded-full hover:text-blue-500 transition-none border-2 border-transparent absolute items-center group-hover:bg-pink-100`}
                />
              </button>
              <span>{post.likes.length}</span>
            </div>
          </Tippy>
          <Tippy placement='bottom' content='Jump to comments'>
            <div className='inline-flex flex-col items-center space-y-4'>
              <button
                className='inline-flex items-center relative justify-center group'
                onClick={scrollToComment}
              >
                <div className='z-10'>
                  <MdOutlineModeComment
                    size={28}
                    className='group-hover:text-orange-500'
                  />
                </div>
                <span className='p-6 rounded-full transition-none border-2 border-transparent absolute items-center group-hover:bg-orange-100' />
              </button>
              <span>{post.comments.length}</span>
            </div>
            {/* <button
              className="inline-flex flex-col flex-1 items-center"
              onClick={scrollToComment}
            >
              <span className="p-2 rounded-full hover:bg-orange-100 hover:text-orange-500 transition-none">
                <MdOutlineModeComment size={28} />
              </span>
              <span>{post.comments.length}</span>
            </button> */}
          </Tippy>
          <Tippy
            placement='bottom'
            content={`${
              isBookmarked ? 'Remove bookmark' : 'Bookmark this post'
            }`}
          >
            <div className='inline-flex flex-col items-center space-y-4'>
              <button
                className='inline-flex items-center relative justify-center group'
                onClick={() => handlePostActions('bookmark')}
                disabled={isLoading}
              >
                <div className='z-10'>
                  {isBookmarked ? (
                    <RiBookmarkFill
                      size={28}
                      className={`
                    ${
                      isLoading && buttonAnimate.bookmarkAnimate
                        ? 'animate-bounce'
                        : ''
                    } text-yellow-500 rounded-full `}
                    />
                  ) : (
                    <RiBookmarkLine
                      size={28}
                      className={`
                    ${
                      isLoading && buttonAnimate.bookmarkAnimate
                        ? 'animate-bounce'
                        : ''
                    } group-hover:text-yellow-500`}
                    />
                  )}
                </div>
                <span
                  className={`${
                    isBookmarked && !buttonAnimate.bookmarkAnimate
                      ? 'border-yellow-500 bg-yellow-50'
                      : ''
                  } ${
                    isLoading && buttonAnimate.bookmarkAnimate
                      ? 'border-t-2 border-t-yellow-500 animate-spin'
                      : ''
                  } p-6 rounded-full transition-none border-2 border-transparent absolute items-center group-hover:bg-yellow-100`}
                />
              </button>
              <span>{post.bookmarks.length}</span>
            </div>
          </Tippy>
        </div>
      </div>
    </Fragment>
  );
};

export default Reactions;
