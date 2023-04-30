import { React, useState, useCallback, useMemo } from "react";

import {
  Pane,
  FileUploader,
  rebaseFiles,
  FileCard,
  Alert,
  MimeType,
  FileRejectionReason,
  majorScale,
} from "evergreen-ui";

const FilePicker = (props) => {
  const acceptedMimeTypes = [MimeType.jpeg, MimeType.pdf, MimeType.png];
  const [fileRejections, setFileRejections] = useState([]);
  const maxSizeInBytes = 5 * 1024 ** 2; // 5 MB
  const maxFiles = props.maxFiles;
  const handleRejected = useCallback(
    (fileRejections) => setFileRejections([fileRejections[0]]),
    []
  );
  const values = useMemo(
    () => [
      ...props.files,
      ...fileRejections.map((fileRejection) => fileRejection.file),
    ],
    [props.files, fileRejections]
  );
  const handleRemove = useCallback(
    (file) => {
      const updatedFiles = props.files.filter(
        (existingFile) => existingFile !== file
      );
      const updatedFileRejections = fileRejections.filter(
        (fileRejection) => fileRejection.file !== file
      );

      // Call rebaseFiles to ensure accepted + rejected files are in sync (some might have previously been
      // rejected for being over the file count limit, but might be under the limit now!)
      const { accepted, rejected } = rebaseFiles(
        [
          ...updatedFiles,
          ...updatedFileRejections.map((fileRejection) => fileRejection.file),
        ],
        { acceptedMimeTypes, maxFiles, maxSizeInBytes }
      );

      props.setFiles(accepted);
      setFileRejections(rejected);
    },
    [acceptedMimeTypes, props.files, fileRejections, maxFiles, maxSizeInBytes]
  );
  const fileCountOverLimit =
    props.files.length + fileRejections.length - maxFiles;
  const fileCountError = `You can upload up to ${maxFiles} files. Please remove ${fileCountOverLimit} ${
    fileCountOverLimit === 1 ? "file" : "files"
  }.`;
  return (
    <Pane width="70%">
      <FileUploader
        width="100%"
        label={props.label}
        description={props.description}
        maxSizeInBytes={50 * 1024 ** 2}
        disabled={props.files.length + fileRejections.length >= maxFiles}
        maxFiles={maxFiles}
        onAccepted={props.setFiles}
        onRejected={handleRejected}
        renderFile={(file, index) => {
          const { name, size, type } = file;
          const renderFileCountError = index === 0 && fileCountOverLimit > 0;
          // We're displaying an <Alert /> component to aggregate files rejected for being over the maxFiles limit,
          // so don't show those errors individually on each <FileCard />
          const fileRejection = fileRejections.find(
            (fileRejection) =>
              fileRejection.file === file &&
              fileRejection.reason !== FileRejectionReason.OverFileLimit
          );
          const { message } = fileRejection || {};
          return (
            <div key={`${file.name}-${index}`}>
              {renderFileCountError && (
                <Alert
                  intent="danger"
                  marginBottom={majorScale(2)}
                  title={fileCountError}
                />
              )}
              <FileCard
                key={name}
                isInvalid={fileRejection != null}
                name={name}
                onRemove={() => handleRemove(file)}
                sizeInBytes={size}
                type={type}
                validationMessage={message}
              />
            </div>
          );
        }}
        values={values}
      />
    </Pane>
  );
};
export default FilePicker;
