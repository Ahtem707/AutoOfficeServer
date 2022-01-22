// import { ftpConfig } from "../config/database.js";

export const images = (req, res, next) => {

    const dir = req.params.dir
    const fileName = req.params.imageName

    var options = {
        root: process.cwd() + '/images/' + dir,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    res.sendFile(fileName, options, (err) => {
        if (err) {
            next(err)
        } else {
            console.log('Sent:', fileName)
        }
    });

    // var ftpClient = require('ftp-client')
    // var client = new ftpClient(ftpConfig, options);

    // client.connect({
    //     downloadedFiles: [''],
    //     errors: {
    //         'filename': (error)
    //     }
    // })

    // client.connect({
    //     uploadedFiles: ['filename'],
    //     uploadedDirectories: ['dirname'],
    //     errors: {
    //         'filename/dirname': (error)
    //     }
    // })
}