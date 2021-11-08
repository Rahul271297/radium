function Trim(){
    let a = ('Rahul    ');
    
    console.log(a.trim());
}
  function changeToUpperCase() {
      let a = ("RaHul");
      console.log(a.toUpperCase());
  }
  function changeToLowerCase() {
      let a = ("RaHul");
      console.log(a.toLowerCase());
}
module.exports.trim1 = Trim
module.exports.uppercase = changeToUpperCase
module.exports.lowercase = changeToLowerCase 