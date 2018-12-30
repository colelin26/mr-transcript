import {
  UPLOAD_MESSAGES,
  TOGGLE_DROPBOX,
  CANCEL_FILE_DIALOG,
  SUBMIT_PDF,
  UPLOAD_ERROR,
  UPLOAD_SUCCESS
} from '../actions/UploadPage';

const PDFInfo = (
  state = {
    pdfDropped: false,
    pdfSubmitted: false,
    message: UPLOAD_MESSAGES.welcome_message,
    files: []
  },
  action
) => {
  switch (action.type) {
    case TOGGLE_DROPBOX:
      if (action.files.length > 0)
        return Object.assign({}, state, {
          message: UPLOAD_MESSAGES.uploaded_message(action.files[0].name, action.files[0].size),
          pdfDropped: true,
          files: action.files
        });
      return Object.assign({}, state, {
        message: UPLOAD_MESSAGES.welcome_message,
        files: []
      });
    case CANCEL_FILE_DIALOG:
      return Object.assign({}, state, {
        message: UPLOAD_MESSAGES.welcome_message,
        pdfDropped: false,
        files: []
      });
    case SUBMIT_PDF:
      return Object.assign({}, state, {
        message: UPLOAD_MESSAGES.submit_button
      });
    case UPLOAD_ERROR:
      return Object.assign({}, state, {
        message: UPLOAD_MESSAGES.upload_error,
        pdfDropped: false,
        files: []
      });
    case UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        message: UPLOAD_MESSAGES.upload_success,
        pdfSubmitted: true,
        files: [],
        Transcript: action.Transcript
      });
    default:
      return state;
  }
};

export default PDFInfo;
