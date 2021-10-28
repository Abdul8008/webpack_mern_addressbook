import React from 'react'

export default function FileUploadFunc({ onDone, labelText, id, error, errorText, disabled, value }) {

    const handleChange = e => {
        // get the files
        let files = e.target.files;

        // 
        var allFiles = [];
        for (var i = 0; i < files.length; i++) {

            let file = files[i];
            // console.log(file, ' fileeeeee')

            // make file_reader
            let reader = new FileReader();

            // base64 
            reader.readAsDataURL(file);

            // console.log(reader, ' rederrrrrrrrrrr')

            // on reader load ...
            reader.onload = () => {
                // console.log(file)
                // data obj
                let fileInfo = {
                    name: file.name,
                    type: file.type,
                    size: Math.round(file.size / 1000) + ' kB', //calculate size to kb 
                    base64: reader.result.split(",")[1],
                    file
                };

                // Push it to the state
                allFiles.push(fileInfo);

                //
                if (allFiles.length == files.length) {
                    //cjheck file types 
                    onDone(allFiles)
                    // if(file.type === 'application/pdf') onDone(allFiles)
                    // else console.log('file type error') 
                }

            }

        }
    }

    return (
        <>
            <label htmlFor={id}>{labelText}</label> <br />
            <div className="fileUpload btn btn-primary">
                <span>Browse</span>
                <input
                    // name={name}
                    onChange={handleChange}
                    id={id}
                    type="file"
                    className="upload"
                    disabled={disabled} />
            </div>
            <input value={value} id="uploadFile" placeholder="Choose File" disabled="disabled" />
            <div>
                {error && <small className="text-danger">{errorText}</small>}
            </div>
        </>
    )
}
