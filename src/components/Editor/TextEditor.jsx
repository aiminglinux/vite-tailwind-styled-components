import { CKEditor } from '@ckeditor/ckeditor5-react';
import InlineEditor from '@aimingnpm/ckeditor5-build-inline';
import { useState } from 'react';

const TextEditor = ({ onInteractCommentForm }) => {
  const onBlur = (data) => {
    // onInteractCommentForm(data);
  };
  return (
    <CKEditor
      editor={InlineEditor}
      data=''
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
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
      }}
      onBlur={(event, editor) => {
        const data = editor.getData();
        console.log(event, data);
        onBlur(data);
      }}
      onFocus={(event, editor) => {
        console.log('Focus.', editor);
      }}
    />
  );
};

export default TextEditor;
