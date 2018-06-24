//reduces the number of characters in the name of the issues
//takes the "text" to reduce. and "charNum" for how many characters in total in the end
export function reduceParagraph(text, charNum) {
  let paragraphArray = text.split('');
  if (paragraphArray.length >= charNum) {
    paragraphArray.splice(charNum, paragraphArray.length - charNum, '...');
  }
  return paragraphArray.join('');
};