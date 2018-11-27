import React from 'react';
import Dropzone from 'react-dropzone'

class Dragbox extends React.Component {
    constructor() {
      super()
      this.state = { files: [] }
    }
  
    onDrop(files) {
      this.setState({
        files
      });
    }
  
    onCancel() {
      this.setState({
        files: []
      });
    }
  
    render() {
      return (
        <section>
          <div className="dropzone">
            <Dropzone
              onDrop={this.onDrop.bind(this)}
              onFileDialogCancel={this.onCancel.bind(this)}
              accept={{
                    type: 'pdf',
              }}
            >
              <p>Please upload your transcript PDF</p>
            </Dropzone>
          </div>
          <aside>
            <h2>Dropped files</h2>
            <ul>
              {
                this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
              }
            </ul>
          </aside>
        </section>
      );
    }
  }
  
  
  export default Dragbox;