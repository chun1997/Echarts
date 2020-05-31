const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/playground', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'))

const jobSchema = new mongoose.Schema({
    positionID: String,
    title: String,
    address: String,
    time: String,
    jdLink: String,
    money_min: String,
    money_max: String,
    background: String,
    companyName: String,
    companyLink: String,
    industry: String,
    tag: String,
    welfare: String,

})

const Job = mongoose.model('Job', jobSchema)


module.exports = Job