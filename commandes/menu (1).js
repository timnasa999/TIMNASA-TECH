const util = require('util');

const fs = require('fs-extra');

const { zokou } = require(__dirname + "/../framework/zokou");

const { format } = require(__dirname + "/../framework/mesfonctions");

const os = require("os");

const moment = require("moment-timezone");

const s = require(__dirname + "/../set");



zokou({ nomCom: "list", categorie: "Menu" }, async (dest, zk, commandeOptions) => {

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
╭────✧${s.BOT}✧────◆
𝐓𝐈𝐌𝐍𝐀𝐒𝐀~𝐌𝐃
     ╭──────────────
|❏│   *_Prefix_* : ${s.PREFIXE}
|❏│   *_Propriétaire_* : ${s.OWNER_NAME}
|❏│   _Mode_ : ${mode}
|❏│   *_Commandes_* : ${cm.length}
|❏│   *_Date_* : ${date}
|❏│   *_Hour_* : ${temps}
|❏│   *_RAM_* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
|❏│   *_Plateforme_* : ${os.platform()}
|❏│   *_Developer_* : *𝐓𝐈𝐌𝐍𝐀𝐒𝐀~𝐓𝐄𝐂𝐇*
|❏│   *_Nation_ : 𝐓𝐀𝐍𝐙𝐀𝐍𝐈𝐀*
|❏│   *_location_* :${location}
|❏|    𝘃𝗲𝗿𝘀𝗶𝗼𝗻    : 𝘝10.0.0
    ╰───────────────
╰─────✧𝐓𝐈𝐌𝐍𝐀𝐒𝐀~𝐌𝐃✧─────◆ \n\n`;
    
    let menuMsg = `
👋 𝐓𝐢𝐦𝐧𝐚𝐬𝐚 𝐭𝐞𝐜𝐡 ${nomAuteurMessage}, 𝐓𝐡𝐢𝐬 𝐢𝐬 𝐓𝐈𝐌𝐍𝐀𝐒𝐀~𝐌𝐃 👋

*𝐈'𝐌 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄 𝐁𝐘 𝐓𝐈𝐌𝐍𝐀𝐒𝐀 𝐌𝐃:*
◇                             ◇
`;

    if (commandeOptions.categorie) {
        const categorieSelectionnee = commandeOptions.categorie;
        if (coms[categorieSelectionnee]) {
            menuMsg += `╭────🇹🇿${categorieSelectionnee} ❏ ✧────`;
            for (const cmd of coms[categorieSelectionnee]) {
                menuMsg += `
*☞︎︎︎ ${cmd}*`;
            }
            menuMsg += `
╰═════════════⊷\n`;
        } else {
            menuMsg += `La catégorie "${categorieSelectionnee}" n'existe pas.\n`;
        }
    } else {
        for (const cat in coms) {
            menuMsg += `╭────🇹🇿${cat} ❏ ✧────`;
            for (const cmd of coms[cat]) {
                menuMsg += `
*☞︎︎︎ ${cmd}*`;
            }
            menuMsg += `
╰═════════════⊷ \n`;
        }
    }

    menuMsg += `
◇            ◇
*»»————— ★ —————««*
".🌟🌟🌟🌟🌟🌟🌟."
 
    *𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐝 𝐛𝐲 𝐓𝐈𝐌𝐍𝐀𝐒𝐀 𝐓𝐄𝐀𝐌*
*»»—————    ★   —————««*
`;

    var lien = mybotpic();

    if (lien.match(/\.(mp4|gif)$/i)) {
        try {
            zk.sendMessage(dest, { video: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *TIMNASA-MD*, développé par TIMNASA-TECH" , gifPlayback : true }, { quoted: ms });
        } catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        try {
            zk.sendMessage(dest, { image: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *TIMNASA-MD*, développé par TIMNASA-TECH" }, { quoted: ms });
        } catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } else {
        repondre(infoMsg + menuMsg);
    }
});
