const util = require('util');

const fs = require('fs-extra');

const { zokou } = require(__dirname + "/../framework/zokou");

const { format } = require(__dirname + "/../framework/mesfonctions");

const os = require("os");

const moment = require("moment-timezone");

const s = require(__dirname + "/../set");



zokou({ nomCom: "menu2", categorie: "Menu" }, async (dest, zk, commandeOptions) => {

    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;

    let { cm } = require(__dirname + "/../framework//zokou");

    var coms = {};

    var mode = "public";

    

    if ((s.MODE).toLocaleLowerCase() != "yes") {

        mode = "private";

    }





    



    cm.map(async (com, index) => {

        if (!coms[com.categorie])

            coms[com.categorie] = [];

        coms[com.categorie].push(com.nomCom);

    });



    moment.tz.setDefault(s.TZ);



// Créer une date et une heure en GMT

const temps = moment().format('HH:mm:ss');

const date = moment().format('DD/MM/YYYY');



  let infoMsg =  `

┏❏ ⌜  𝕋𝕀𝕄ℕ𝔸𝕊𝔸 𝕄𝔻 ⌟ ❐
┃ ⿻𝕄𝕠𝕕𝕖: ${mode}
┃ ⿻𝕌𝕤𝕖𝕣 : ${s.OWNER_NAME}
┃ ⿻𝕃𝕚𝕓𝕣𝕒𝕣𝕪 : Baileys
️┃ ⿻ℙ𝕣𝕖𝕗𝕚𝕩 : ${s.PREFIXE}
️┃ ⿻𝔻𝕒𝕥𝕖 : ${date}
┃ ⿻𝕋𝕚𝕞𝕖 : ${temps}
┃ ⿻𝕋𝕠𝕠𝕝𝕤 : ${cm.length}
┃ ⿻ℝ𝕒𝕞 : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┃ ⿻ℍ𝕠𝕤𝕥 : ${os.platform()}
┗❏\n\n`;


    

let menuMsg = `
┏━━━━━━━━━┓
┣💫 𝚃𝙸𝙼𝙽𝙰𝚂𝙰 𝙲𝙾𝙼𝙰𝙽𝙳𝙸𝙻𝙸𝚂𝚃
┗━━━━━━━━━┛\n


`;



    for (const cat in coms) {

        menuMsg += `┏❏ *${cat}*`;

        for (const cmd of coms[cat]) {

            menuMsg += `
┃ ⚓ ${cmd}`;

        }

        menuMsg += `
┗❏\n`

    }



    menuMsg += `


︎┏━━━━━━━━━━━━━━┓
️┣❏𝚃𝚒𝚖𝚗𝚊𝚜𝚊 𝚖𝚍
┣❏Enjoy life 𝚗𝚘𝚠 
┗┳━━━━━━━━━━━━┳┛
┏┻━━━━━━━━━━━━┻┓
┃powered by 𝚃𝙸𝙼𝙽𝙰𝚂𝙰 𝚃𝙴𝙲𝙷
┗━━━━━━━━━━━━━━┛\n


`;



   var lien = mybotpic();



   if (lien.match(/\.(mp4|gif)$/i)) {

    try {

        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *𝚃𝙸𝙼𝙽𝙰𝚂𝙰-𝙱𝙾𝚃*, déveloper Cod3uchiha" , gifPlayback : true }, { quoted: ms });

    }

    catch (e) {

        console.log("🥵🥵 Menu error " + e);

        repondre("🥵🥵 Menu error " + e);

    }

} 

// Vérification pour .jpeg ou .png

else if (lien.match(/\.(jpeg|png|jpg)$/i)) {

    try {

        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *𝚃𝙸𝙼𝙽𝙰𝚂𝙰-𝚃𝙴𝙲𝙷*, déveloper cod3uchiha" }, { quoted: ms });

    }

    catch (e) {

        console.log("🥵🥵 Menu error " + e);

        repondre("🥵🥵 Menu error " + e);

    }

} 

else {

    

    repondre(infoMsg + menuMsg);

    

}



});
