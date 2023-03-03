import { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../core/features/auth/authSlice';

import TextEditor from '../Editor/TextEditor';
import Button from '../Button/Button';
import ContentMarkdown from '../ContentMarkdown/ContentMarkdown';
import { PostContext } from '../../pages/SinglePostView/PostContainer';

const CommentForm = () => {
  const { picture } = useSelector(selectCurrentUser);
  const { handleSubmitComment, setCommentText } = useContext(PostContext);
  const [btn, setBtn] = useState(false);
  const [previewBtn, setPreviewBtn] = useState(false);
  const [previewContent, setPreviewContent] = useState('');

  function handleInteractCommentForm(data) {
    setPreviewContent(data);
    setCommentText(data);
  }

  async function handleSubmitBtn() {
    await handleSubmitComment(), setBtn(false), setPreviewContent('');
  }

  return (
    <>
      <div className='border rounded-md flex p-2 space-x-2 bg-gray-200'>
        <div className='flex-none'>
          <img src={picture?.url} alt='' className='rounded-full w-12' />
        </div>
        <div className={`w-full`} onFocus={() => setBtn(true)}>
          <div className={`bg-white rounded-md ${previewBtn ? 'p-4' : ''}`}>
            {!previewBtn && (
              <TextEditor
                onInteractCommentForm={handleInteractCommentForm}
                previewContent={previewContent}
              />
            )}
            {previewBtn && <ContentMarkdown children={previewContent} />}
          </div>

          <div className='space-x-2 bg-gray-200 mt-2'>
            {btn && (
              <Button
                hasBg
                disabled={Boolean(!previewContent)}
                onClick={handleSubmitBtn}
              >
                Submit
              </Button>
            )}
            {btn && (
              <Button
                onClick={() => setPreviewBtn(!previewBtn)}
                disabled={Boolean(!previewContent)}
              >
                {previewBtn ? 'Continue editing' : 'Preview'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentForm;
