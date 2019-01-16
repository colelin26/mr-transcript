import { enqueueSnackbar } from './Notifier';

const FileSaver = require('file-saver');
const d3 = require('d3');

export const EXPORT_CSV = 'EXPOPT_CSV';
export const EXPORT_JSON = 'EXPOPT_JSON';

export const exportCSV = () => (dispatch, getState) => {
  const { currentData } = getState().Table;
  const currentDataCSV = d3.csvFormat(currentData);
  const blob = new Blob([currentDataCSV], { type: 'text/csv' });
  FileSaver.saveAs(blob, 'TranscriptData.csv');
};

export const exportJSON = () => (dispatch, getState) => {
  const { currentData } = getState().Table;
  const blob = new Blob([currentData], { type: 'application/json' });
  FileSaver.saveAs(blob, 'TranscriptData.json');
};

export const requestExportCSV = () => (dispatch, getState) => {
  dispatch(exportCSV());
  dispatch(
    enqueueSnackbar({
      message: 'Downloading the CSV file',
      options: {
        variant: 'success'
      }
    })
  );
};

export const requestExportJSON = () => (dispatch, getState) => {
  dispatch(exportJSON());
  dispatch(
    enqueueSnackbar({
      message: 'Downloading the JSON file',
      options: {
        variant: 'success'
      }
    })
  );
};
