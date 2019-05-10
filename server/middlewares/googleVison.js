const vision = require('@google-cloud/vision');
const axios = require('axios')

module.exports = function(req, res, next){

const client = new vision.ImageAnnotatorClient({
    keyFilename: process.env.KEYFILE_PATH_1
  });
  
client
    .labelDetection(req.file.cloudStoragePublicUrl)
    .then(results => {

    const labels = results[0].labelAnnotations;
    let flag = false

    labels.map( el => {
        if( el.description == 'Food'){
            flag = true
        } 
    })

    if(flag){
        labels.forEach(el => {
            delete el.locations
            delete el.properties
            delete el.mid
            delete el.locale
            delete el.confidence
            delete el.boundingPoly
            el.text = el.description
            delete el.description
            // el.tiClasses=['ti-valid']
        })
        req.file.labels = labels
        next()
    } else {
        res.status(400).json({ message : 'This is probably not food' })
        
        // let OBJECT_NAME = req.file.cloudStoragePublicUrl.split('/')
        // OBJECT_NAME = OBJECT_NAME[OBJECT_NAME.length - 1]

        // axios.delete(`https://www.googleapis.com/storage/v1/b/foodgasm.michaelryans.club/o/${OBJECT_NAME}`)
        // .then(({data}) => {
        //     console.log(data)
        // })
        // .catch( err => {
        //     res.status(400).json({ message : err.message})
        //     console.log(err)
        // })
    }

    //labels.forEach(label => console.log(label.description));
})
    .catch(err => {
    console.error('ERROR:', err);
});
}


