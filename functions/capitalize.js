String.prototype.capitalize = function() {
  let word_list = this.split(" ")
  let newstring = ''
  word_list.forEach(function(word){
    word = word.charAt(0).toUpperCase() + word.slice(1)
    newstring += word + ' '
  });
  return newstring.trim()
}
