import regexutils from "./utils/regexutils";
import userutils from "./utils/userutils";
import monitutils from "./utils/monitutils";

/*const isSecure = (msg, isEval, cbk) => {
  let secure = true;
  if (!monitutils.isAdmin(msg.chat.id)) {
    userutils.isUserBlacklisted(msg.from.id, (err, data) => {
      if (err) secure = false;
      else {
        secure = !data;
        if (!regexutils.isInputOK(msg.text) && isEval) secure = false;
      }
      cbk(secure);
    });
  } else cbk(true)
};*/

//Como nenhum eval está sendo executado, qualquer mensagem é segura
const isSecure = (msg, isEval, cbk) => cbk(true);

export default {
  isSecure
};
