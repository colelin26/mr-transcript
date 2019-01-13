import { connect } from 'react-redux';
import { onDrop, onCancel, submitPDF, getDemo } from '../actions/UploadPage';
import UploadPage from '../components/Upload/UploadPage';
import { toggleAbout } from '../actions/HomePage';

const mapStateToProps = state => ({
  pdfDropped: state.PDFInfo.pdfDropped,
  message: state.PDFInfo.message,
  pdfSubmitted: state.PDFInfo.pdfSubmitted
});

const mapDispatchToProps = {
  onDrop,
  onCancel,
  submitPDF,
  getDemo,
  toggleAbout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadPage);
