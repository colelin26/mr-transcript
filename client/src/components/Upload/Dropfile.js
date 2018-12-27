import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

const Dragbox = ({ onDrop, onCancel, message }) => (
  <section>
    <div className="dropzone">
      <Dropzone
        onDrop={onDrop}
        onFileDialogCancel={onCancel}
        accept="application/pdf"
        multiple={false}
      >
        <p>{message}</p>
      </Dropzone>
    </div>
  </section>
);

Dragbox.propTypes = {
  onDrop: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};

export default Dragbox;
