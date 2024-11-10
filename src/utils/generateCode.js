

function generateCode(n, numericOnly= false) {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  if(numericOnly){
    chars = "0123456789";
  }
  let code = '';
  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }
  return code;
}

export default generateCode;
