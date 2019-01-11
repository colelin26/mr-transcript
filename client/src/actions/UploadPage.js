import request from 'superagent';

export const UPLOAD_MESSAGES = {
  welcome_message: 'Drop your PDF here or Click to upload',
  uploaded_message: (name, size) => `${name} \n ${size} Bytes`,
  submit_button: 'Uploading Transcript...',
  upload_error:
    'The submitted PDF cannot be scraped. Please check if this is the latest transcript downloaded from Quest.',
  upload_success: 'Transcript has been successfully uploaded and scraped...'
};

// Action Types
export const TOGGLE_DROPBOX = 'ToggleDropbox';
export const CANCEL_FILE_DIALOG = 'CancelFileDialog';
export const SUBMIT_PDF = 'SubmitPDF';
export const UPLOAD_ERROR = 'UploadError';
export const UPLOAD_SUCCESS = 'UploadSuccess';

export const onDrop = files => ({
  type: TOGGLE_DROPBOX,
  files
});

export const onCancel = () => ({
  type: CANCEL_FILE_DIALOG
});

const submitting = () => ({
  type: SUBMIT_PDF
});

const uploadError = () => ({
  type: UPLOAD_ERROR
});

const uploadSuccess = Transcript => ({
  type: UPLOAD_SUCCESS,
  Transcript
});

export const submitPDF = () => (dispatch, getState) => {
  const state = getState();
  const PDFFile = state.PDFInfo.files[0];
  const req = request.post('/upload');
  req.attach('transcript', PDFFile);
  dispatch(submitting());
  req.end((err, res) => {
    if (err) {
      dispatch(uploadError());
      return Promise.resolve();
    }
    dispatch(uploadSuccess(res.body));
    return Promise.resolve();
  });
};

export const getDemo = () => (dispatch, getState) => {
  const req = request.get('/getDemo');
  dispatch(submitting());
  req.end((err, res) => {
    if (err) dispatch(uploadError);
    dispatch(uploadSuccess(res.body));
    return Promise.resolve();
  });
};
