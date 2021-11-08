function printDate() {
    let date_ob = new Date();
    console.log ("Current Date is" + " " + date_ob.getDate())
}
function printMonth() {
    let date_ob = new Date();
    console.log ("Current Month is" + " " + date_ob.getMonth())
}
function getBatchInfo() {
    console.log("I am in radium batch. Week-3.Day-1.Topic-NodeJs")

}
module.exports.date = printDate;
module.exports.month = printMonth;
module.exports.info = getBatchInfo;
   
