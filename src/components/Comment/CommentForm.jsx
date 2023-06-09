import { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../core/features/auth/authSlice';

import TextEditor from '../Editor/TextEditor';
import Button from '../Button/Button';
import ContentMarkdown from '../ContentMarkdown/ContentMarkdown';
import { PostContext } from '../../pages/SinglePostView/PostContainer';
import Avatar from '../Avatar/Avatar';

const CommentForm = ({
  replyMode = false,
  handleReply,
  placeholder,
  initialState,
}) => {
  const { picture } = useSelector(selectCurrentUser);
  const { handleSubmitComment, handleCommentData } = useContext(PostContext);
  const [btn, setBtn] = useState(false);
  const [previewBtn, setPreviewBtn] = useState(false);
  const [previewContent, setPreviewContent] = useState(initialState || '');

  function handleInteractCommentForm(data) {
    setPreviewContent(data);
    handleCommentData({ text: data });
  }

  function handleDimiss() {
    setBtn(false);
    setPreviewBtn(false);
    setPreviewContent('');
    if (handleReply) {
      handleReply();
    }
  }

  function handleFocus() {
    setBtn(true);
  }

  useEffect(() => {
    if (replyMode) {
      setBtn(true);
    }
  }, [replyMode]);

  async function handleSubmitBtn() {
    await handleSubmitComment();
    setBtn(false);
    setPreviewContent('');
  }

  return (
    <>
      <div
        className={`border rounded-md flex bg-gray-200 w-full space-x-2 ${
          replyMode ? '' : 'p-2'
        }`}
      >
        {!replyMode && <Avatar picture={picture} />}
        <div className={`w-full space-y-2`} onFocus={handleFocus}>
          <div className={`bg-white rounded-md ${previewBtn ? 'p-4' : ''}`}>
            {!previewBtn && (
              <TextEditor
                onInteractCommentForm={handleInteractCommentForm}
                previewContent={previewContent}
                placeholder={placeholder}
              />
            )}
            {previewBtn && <ContentMarkdown children={previewContent} />}
          </div>

          {btn && (
            <div className='space-x-2 bg-gray-200'>
              <Button
                hasBg
                disabled={Boolean(!previewContent)}
                onClick={handleSubmitBtn}
              >
                Submit
              </Button>

              <Button
                onClick={() => setPreviewBtn(!previewBtn)}
                disabled={Boolean(!previewContent)}
              >
                {previewBtn ? 'Continue editing' : 'Preview'}
              </Button>
              <Button isText onClick={handleDimiss}>
                Dismiss
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentForm;
