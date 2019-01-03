import { connect } from 'react-redux';
import { onDrop, onCancel, submitPDF, getDemo } from '../actions/UploadPage';
import UploadPage from '../components/Upload/UploadPage';

const mapStateToProps = state => ({
  pdfDropped: state.PDFInfo.pdfDropped,
  message: state.PDFInfo.message
});

const mapDispatchToProps = {
  onDrop,
  onCancel,
  submitPDF,
  getDemo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadPage);
