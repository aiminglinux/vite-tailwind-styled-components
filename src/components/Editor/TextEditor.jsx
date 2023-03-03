import { CKEditor } from '@ckeditor/ckeditor5-react';
import InlineEditor from '@aimingnpm/ckeditor5-build-inline';
import { useEffect, useState } from 'react';

const TextEditor = ({ onInteractCommentForm, previewContent }) => {
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
        placeholder: 'Add to discussion...',
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
      }}
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log('Editor is ready to use!', editor);
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
