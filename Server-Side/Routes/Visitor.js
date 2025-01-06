let express = require('express')
let router = express.Router()
let {saveVisitorDetails,generateIdCard} = require('../controller/Visitors')

router.post('/register' , saveVisitorDetails)
router.post('/generateIdCard' , generateIdCard)

module.exports=router