import { useState } from 'react';
import TextEditor from '../Editor/TextEditor';
import Button from '../Button/Button';
import ContentMarkdown from '../ContentMarkdown/ContentMarkdown';

const CommentForm = ({ picture }) => {
  const [submitBtn, setSubmitBtn] = useState(false);
  const [preview, setPreview] = useState(false);

  function handleInteractCommentForm(data) {
    console.log('Form data: ', data);
    setSubmitBtn(true);
  }
  return (
    <>
      <div className='border rounded-md flex p-2 space-x-2 bg-gray-200'>
        <div className='flex-none'>
          <img src={picture.url} alt='' className='rounded-full w-12' />
        </div>
        <div
          className='bg-white w-full rounded-md'
          onFocus={handleInteractCommentForm}
        >
          {!preview && (
            <TextEditor onInteractCommentForm={handleInteractCommentForm} />
          )}
          {preview && <h1>Preview</h1>}
        </div>
      </div>
      {/* <div>{data && <ContentMarkdown children={data.toString()} />}</div> */}
      <div className='space-x-2'>
        {submitBtn && <Button hasBg>Submit</Button>}
        {submitBtn && (
          <Button onClick={() => setPreview(!preview)}>
            {preview ? 'Continue editing' : 'Preview'}
          </Button>
        )}
      </div>
    </>
  );
};

export default CommentForm;
