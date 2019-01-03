import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

const Dragbox = ({ onDrop, onCancel, message }) => (
  <section>
    <Dropzone
      onDrop={onDrop}
      onFileDialogCancel={onCancel}
      accept="application/pdf"
      multiple={false}
    >
      <p>{message}</p>
    </Dropzone>
  </section>
);

Dragbox.propTypes = {
  onDrop: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};

export default Dragbox;
