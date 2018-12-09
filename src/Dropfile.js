import React from 'react';
import Dropzone from 'react-dropzone';


const MESSAGES = {
        welcome_message: 'Drop your PDF here or Click to upload',
        uploaded_message: (file) => `${file.name} \n ${file.size} Bytes`,
}

class Dragbox extends React.Component {
    constructor(props) {
      super(props)
      this.state = { 
        files: [] , 
        message: MESSAGES.welcome_message,
        fileDropped: false,
      };
    }
  
    onDrop(files) {
      if (files.length > 0) this.props.togglePDFDropped(files);
      this.setState({
        files,
        message: `${MESSAGES.uploaded_message(files[0])}`,
      });
    }
  
    onCancel() {
      this.props.togglePDFDropped([]);
      this.setState({
        files: [],
        message: MESSAGES.welcome_message,
      });
    }
  
    render() {
      return (
        <section>
          <div className="dropzone">
            <Dropzone
              onDrop={this.onDrop.bind(this)}
              onFileDialogCancel={this.onCancel.bind(this)}
              accept="application/pdf"
              multiple={false}
            >
              <p>{this.state.message}</p>
            </Dropzone>
          </div>
        </section>
      );
    }
  }
  
  
  export default Dragbox;