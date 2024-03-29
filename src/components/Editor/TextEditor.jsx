import { CKEditor } from '@ckeditor/ckeditor5-react';
import InlineEditor from '@aimingnpm/ckeditor5-build-inline';
import { useEffect, useState } from 'react';

const TextEditor = ({ onInteractCommentForm, previewContent, placeholder }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(previewContent);
  }, [previewContent]);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();

    setContent(data);
    onInteractCommentForm(data);
  };

  return (
    <CKEditor
      editor={InlineEditor}
      data={content}
      config={{
        placeholder,
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',

            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'imageUpload',
            'blockQuote',
            'insertTable',

            'mediaEmbed',
            'undo',
            'redo',
          ],
        },
        mention: {
          feeds: [
            {
              marker: '@',
              feed: [
                '@Barney',
                '@Lily',
                '@Marry Ann',
                '@Marshall',
                '@Robin',
                '@Ted',
              ],
              minimumCharacters: 1,
            },
          ],
        },
      }}
      onReady={(editor) => {
        // const mentionMarkers = editor.plugins.get('Mention').editor.getData();
        // You can store the "editor" and use when it is needed.
        console.log('Editor is ready to use!', editor);
        // console.log('Test: ', mentionMarkers);
      }}
      onChange={handleEditorChange}
      onBlur={(event, editor) => {
        console.log('Blur', editor);
      }}
      onFocus={(event, editor) => {
        console.log('Focus.', editor);
      }}
    />
  );
};

export default TextEditor;
