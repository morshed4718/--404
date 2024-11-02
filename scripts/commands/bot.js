const axios = require('axios');
const fs = require('fs'); 
const path = require('path');

module.exports = {
  config: {
    name: "bot",
    version: "1.0.0",
    permission: 0,
    credits: "nayan",
    description: "talk with bot",
    prefix: 'awto',
    category: "talk",
    usages: "hi",
    cooldowns: 5,
  },

  handleReply: async function ({ api, event }) {
    try {

      const apiData = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json');
      const apiUrl = apiData.data.sim;
      const kl = await axios.get(`https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json`);
      const apiUrl2 = kl.data.api2;
      const response = await axios.get(`${apiUrl}/sim?type=ask&ask=${encodeURIComponent(event.body)}`);
      console.log(response.data);
      const result = response.data.data.msg;

      const textStyles = loadTextStyles();
      const userStyle = textStyles[event.threadID]?.style; 

      const fontResponse = await axios.get(`${apiUrl2}/bold?text=${result}&type=${userStyle}`);
      const text = fontResponse.data.data.bolded;

      api.sendMessage(text, event.threadID, (error, info) => {
        if (error) {
          console.error('Error replying to user:', error);
          return api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
        }
        global.client.handleReply.push({
          type: 'reply',
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          head: event.body
        });
      }, event.messageID);

    } catch (error) {
      console.error('Error in handleReply:', error);
      api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
    }
  },

  start: async function ({ nayan, events, args, Users }) {
    try {
      const msg = args.join(" ");
      const apiData = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json');
      const apiUrl = apiData.data.sim;


      if (!msg) {
        const greetings = [
          "-আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ 😇😘",
  "-সুন্দর মাইয়া মানেই-🥱-আমার বস ＭＯＲＳＨＥＤ এর বউ-😽🫶-আর বাকি গুলো আমার বেয়াইন-🙈🐸🤗",
  "-কিরে-🫵-তরা নাকি  prem করস-😐🐸-আমারে একটা করাই দিলে কি হয়-🥺",
  "Bot বলে অসম্মান করচ্ছিছ,😰😿",
  "-হুদাই আমারে  শয়তানে লারে-😝😑☹️",
  "- বেডি মানুষ বড় ভেজাইল্লা🤧🔪",
  "⎯তো্ঁর্ঁ ন্ঁজ্ঁরে্ঁ স্ঁম্ঁস্যা্ঁ আ্ঁছে্ঁ  ন্ঁজ্ঁর্ঁ ঠি্ঁক্ঁ ক্ঁর্ঁ-🐸🫣⎯⃝''",
  "-চু্ঁপ্ঁ থা্ঁক্ঁ তু্ঁই্ঁ 🫵 বি্ঁছা্ঁনা্ঁয়্ঁ মু্ঁতো্ঁস্ঁ 😽⎯͢⎯⃝🩷🍒🙂",
  "___মন দে !🙂🫴---ছিনি মিনি খেলমু 🤭🤭",
  "- ওই 🫵 তোমারে প্রচুর ভাল্লাগে-😽-সময় মতো প্রপোজ করমু বুঝছো-🔨😼-ছিট খালি রাইখো- 🥱🐸🥵",
  "-আপনার সুন্দরী বান্ধুবীকে ফিতরা হিসেবে আমার বস আরিয়ান কে দান করেন-🥱🐰🍒",
  "-ইস কেউ যদি বলতো-🙂-আমার শুধু  তোমাকেই লাগবে-💜🌸",
  "-অনুমতি দিলাম-𝙋𝙧𝙤𝙥𝙤𝙨𝙚 কর বস ＭＯＲＳＨＥＤ কে-🐸😾🔪",
  "-প্রিয়-🥺 -তোমাকে না পেলে আমি সত্যি-😪 -আরেকজন কে-😼 -পটাতে বাধ্য হবো-😑🤧",
  "- দুনিয়ার সবাই প্রেম করে.!🤧 -আর মানুষ আমার বস ＭＯＲＳＨＥＤ কে সন্দেহ করে.!🐸",
  "-তোর কথা তোর বাড়ি কেউ শুনে না তো আমি কোনো শুনবো__🤔😂",
  "—যারে দেহি তারেই ভাল্লাগে..!🙈- মনে হয় রুচি বাড়ছে..!😀😋 তুমি কি দেখো তোমাকেও তো  ভাল্লাগে - 😩🫢🫣",
  "-বুকের বাম পাশে এসি সহ একটা ফ্লাট খালি আছে...একজন বিশ্বস্ত ভাড়াটিয়া চাই😊...!🙈👀",
  "-একদিন ঠাস করে😎🔪 কিউট হয়ে যামু_😩 তারপর তোগোরে  আর পাত্তা দিমু না __🐸🌚🙂",
  "-ভাই তুই একটু আমার কাছে আই তরে মাইরা আমি ঘুমামু_👊😴",
  "-এই আন্টির মেয়ে-🫢🙈-𝐔𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐚𝐡-😽🫶-আসলেই তো স্বাদ-🥵💦-এতো স্বাদ কেন-🤔-সেই স্বাদ-😋",
  "-চুমু থাকতে তোরা বিড়ি খাস কেন বুঝা আমারে-😑😒🐸⚒️",
  "- সানিলিওন  আফারে ধর্ষনের হুমকি দিয়ে আসলাম - 🤗 -আর 🫵তুমি যামারে খেয়ে দিবা সেই ভয় দেখাও ননসেন বেডি..!🥱😼",
  "--নাটক কম করো প্রিয় তুমি যে অন্য জনে আসক্ত তা তোমার ব্যবহারেই বুঝা যায় প্রিয়__😒🦋",
  "__বড় আর হইলাম কই, এখনো \n\n-আকাশ দিয়ে হেলিকপ্টার গেলে তাকাই থাকা আমি...! 🌻🙂",
  "-আমাকে এত ডাকছেন কেন আপনার কি চরিত্রের সমস্যা আছে-🤨🤭😼",
  "-𝗜 𝗟𝗢𝗩𝗢 𝗬𝗢𝗨-😽-আহারে ভাবছো তোমারে প্রোপজ করছি-🥴-থাপ্পর দিয়া কিডনী লক করে দিব-😒-ভুল পড়া বের করে দিবো-🤭🐸",
  "জান তোমার নানি'রে আমার হাতে তুলে দিবা-🙊🙆‍♂",
  "-আমি একটা দুধের শিশু-😇-🫵𝗬𝗢𝗨🐸💦",
  "-নাটক কম করো পিও-🙃-তুমি যে অন্য জনের pream এ আসক্ত..! সেটা তোমার ব্যাবহার দেখেই বুজা যায় পিও..! 🐸👍🏾",
  "চুনা ও চুনা আমার বস ＭＯＲＳＨＥＤ এর হবু বউ রে কেও দেকছো খুজে পাচ্ছি না-😪🤧😭",
  "-জান তুমি শুধু আমার আমি তোমারে ৩৬৫ দিন ভালোবাসি-💝🌺😽",
  "- ঝাং 🫵 থুমালে য়ামি রাইতে পালুপাসি উম্মম্মাহ-🌺🤤💦",
  "-শুনবো না 😼 তুমি আমাকে প্রেম করাই দাও নি 🥺 পচা তুমি 🥺",
  "-𝙂𝙖𝙮𝙚𝙨-🤗-যৌবনের কসম দিয়ে আমারে 𝐁𝐥𝐚𝐜𝐤𝐦𝐚𝐢𝐥 করা হচ্ছে-🥲🤦‍♂️🤧",
  "-আজকে আমার মন ভালো নেই তাই আমারে ডাকবেন না-😪🤧",
  "আমি এখন বস ＭＯＲＳＨＥＤ এর সাথে বিজি আছি আমাকে ডাকবেন না-😕😏 ধন্যবাদ-🤝🌻",
  "-আজ একটা বিন নেই বলে ফেসবুকের নাগিন-🤧-গুলোরে আমার বস ＭＯＲＳＨＥＤ ধরতে পারছে না-🐸🥲",
  "আহ শোনা আমার আমাকে এতো ডাক্তাছো কেনো আসো বুকে আশো-🥱😘",
  "-হুম জান তোমার অইখানে উম্মমাহ-😷😘",
  "—যে ছেড়ে গেছে-😔-তাকে ভুলে যাও-🙂-আমার বস ＭＯＲＳＨＥＤ এর সাথে  প্রেম করে তাকে দেখিয়ে দাও-🙈🐸🤗",
  "-আন্টি-🙆-আপনার মেয়ে-👰‍♀️-রাতে আমারে ভিদু কল দিতে বলে🫣-🥵🤤💦",
  "-শখের নারী  বিছানায় মু'তে..!🙃🥴",
  "-এই'নেও🔑চাবী 😒𝘪𝘯𝘣𝘰𝘹-এর 🔐তালা খুলে মেছেজ দেও📥🫠🤗 𝐈 𝐚𝐦 𝐒𝐢𝐧𝐠𝐥𝐞 🙂",
  "আমি গরীব এর সাথে কথা বলি না-😼😼",
  "-ওই বেডি তোমার বাসায় না আমার বস ＭＯＲＳＨＥＤ মেয়ে দেখতে গেছিলো-🙃-নাস্তা আনারস আর দুধ দিছো-🙄🤦‍♂️-বইন কইলেই তো হয় বয়ফ্রেন্ড আছে-🥺🤦‍♂-আমার বস 𝗠𝗢𝗥𝗦𝗛𝗘𝗗 𝗔𝗛𝗠𝗘𝗗 কে জানে মারার কি দরকার-🙄🤧",
  "-আসসালামু আলাইকুম বলেন আপনার জন্য কি করতে পারি-🤗",
  "-𝚘𝐢𝐢-ইত্তু 🤏 ভালু’পাসা দিবা-🫣🥺🐼",
  "-জান মেয়ে হলে চিপায় আসো ইউটিউব থেকে অনেক ভালোবাসা শিখছি তোমার জন্য-🙊🙈😽",
  "-আমাকে এতো না ডেকছ কেন ভলো টালো বাসো নাকি🤭🙈",
  "-আজকে প্রপোজ করে দেখো রাজি হইয়া যামু-😌🤗😇",
  "-বালিকা━👸-𝐃𝐨 𝐲𝐨𝐮-🫵-বিয়া-𝐦𝐞-😽-আমি তোমাকে-😻-আম্মু হইতে সাহায্য করব-🙈🥱",
  "-আর কত বার ডাকবি ,শুনছি তো,🤭🙈",
  "-আমাকে এতো না ডেকে বস ＭＯＲＳＨＥＤ কে একটা গফ দে-🙄😌",
  "-আরে Bolo আমার জান ,কেমন আছো?-😚😍 ",
  "-হ্যাঁ জানু , এইদিক এ আসো কিস দেই 🤭💋"
        ];
        const name = await Users.getNameUser(events.senderID);
        const rand = greetings[Math.floor(Math.random() * greetings.length)];
        return nayan.reply({
          body: `${name}, ${rand}`,
          mentions: [{ tag: name, id: events.senderID }]
        }, events.threadID, (error, info) => {
          if (error) {
            return nayan.reply('An error occurred while processing your request. Please try again later.', events.threadID, events.messageID);
          }

          global.client.handleReply.push({
            type: 'reply',
            name: this.config.name,
            messageID: info.messageID,
            author: events.senderID,
            head: msg,
          });
        }, events.messageID);
      }

      else if (msg.startsWith("textType")) {
        const selectedStyle = msg.split(" ")[1];
        const options = ['serif', 'sans', 'italic', 'italic-sans', 'medieval', 'normal'];

        if (options.includes(selectedStyle)) {
          saveTextStyle(events.threadID, selectedStyle);
          return nayan.reply({ body: `Text type set to "${selectedStyle}" successfully!` }, events.threadID, events.messageID);
        } else {
          return nayan.reply({ body: `Invalid text type! Please choose from: ${options.join(", ")}` }, events.threadID, events.messageID);
        }
      }

      else if (msg.startsWith("delete")) {
        const deleteParams = msg.replace("delete", "").trim().split("&");
        const question = deleteParams[0].replace("ask=", "").trim();
        const answer = deleteParams[1].replace("ans=", "").trim();

        
        const data = await deleteEntry(question, answer, events, apiUrl);
        const replyMessage = data.msg || data.data.msg;

        return nayan.reply({ body: replyMessage }, events.threadID, events.messageID);
      } 

      else if (msg.startsWith("info")) {
        const response = await axios.get(`${apiUrl}/sim?type=info`);
        const totalAsk = response.data.data.totalKeys;
        const totalAns = response.data.data.totalResponses;

        return nayan.reply({ body: `Total Ask: ${totalAsk}\nTotal Answer: ${totalAns}` }, events.threadID, events.messageID);
      } 

      else if (msg.startsWith("teach")) {
        const teachParams = msg.replace("teach", "").trim().split("&");
        const question = teachParams[0].replace("ask=", "").trim();
        const answer = teachParams[1].replace("ans=", "").trim();

        const response = await axios.get(`${apiUrl}/sim?type=teach&ask=${encodeURIComponent(question)}&ans=${encodeURIComponent(answer)}`);
        const replyMessage = response.data.msg;
        const ask = response.data.data.ask;
        const ans = response.data.data.ans;

        if (replyMessage.includes("already")) {
          return nayan.reply(`📝Your Data Already Added To Database\n1️⃣ASK: ${ask}\n2️⃣ANS: ${ans}`, events.threadID, events.messageID);
        }

        return nayan.reply({ body: `📝Your Data Added To Database Successfully\n1️⃣ASK: ${ask}\n2️⃣ANS: ${ans}` }, events.threadID, events.messageID);
      } 

      else if (msg.startsWith("askinfo")) {
        const question = msg.replace("askinfo", "").trim();

        if (!question) {
          return nayan.reply('Please provide a question to get information about.', events.threadID, events.messageID);
        }

        const response = await axios.get(`${apiUrl}/sim?type=keyinfo&ask=${encodeURIComponent(question)}`);
        const replyData = response.data.data;
        const answers = replyData.answers;

        if (!answers || answers.length === 0) {
          return nayan.reply(`No information available for the question: "${question}"`, events.threadID, events.messageID);
        }

        const replyMessage = `Info for "${question}":\n\n` +
          answers.map((answer, index) => `📌 ${index + 1}. ${answer}`).join("\n") +
          `\n\nTotal answers: ${answers.length}`;

        return nayan.reply({ body: replyMessage }, events.threadID, events.messageID);
      } 

      else if (msg.startsWith("help")) {
        const cmd = this.config.name;
        const prefix = global.config.PREFIX;
        const helpMessage = `
        🌟 **Available Commands:**

        1. 🤖 ${prefix}${cmd} askinfo [question]: Get information about a specific question.

        2. 📚 ${prefix}${cmd} teach ask=[question]&ans=[answer]: Teach the bot a new question and answer pair.

        3. ❌ ${prefix}${cmd} delete ask=[question]&ans=[answer]: Delete a specific question and answer pair. (Admin only)

        4. 📊 ${prefix}${cmd} info: Get the total number of questions and answers.

        5. 👋 ${prefix}${cmd} hi: Send a random greeting.

        6. 🎨 ${prefix}${cmd} textType [type]: Set the text type (options: serif, sans, italic, italic-sans, medieval, normal).

        ⚡ Use these commands to interact with the bot effectively!
            `;

        return nayan.reply({ body: helpMessage }, events.threadID, events.messageID);
      } 

      else {
        const response = await axios.get(`${apiUrl}/sim?type=ask&ask=${encodeURIComponent(msg)}`);
        const replyMessage = response.data.data.msg;

        const textStyles = loadTextStyles();
        const userStyle = textStyles[events.threadID]?.style || 'normal';

        const kl = await axios.get(`https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json`);
        const apiUrl2 = kl.data.api2;

        const font = await axios.get(`${apiUrl2}/bold?text=${replyMessage}&type=${userStyle}`);
        const styledText = font.data.data.bolded;

        nayan.reply({ body: styledText }, events.threadID, (error, info) => {
          if (error) {
            return nayan.reply('An error occurred while processing your request. Please try again later.', events.threadID, events.messageID);
          }

          global.client.handleReply.push({
            type: 'reply',
            name: this.config.name,
            messageID: info.messageID,
            author: events.senderID,
            head: msg,
          });
        }, events.messageID);
      }
    } catch (error) {
      console.log(error);
      nayan.reply('An error has occurred, please try again later.', events.threadID, events.messageID);
    }
}
}


function loadTextStyles() {
  const Path = path.join(__dirname, 'system', 'textStyles.json');
  try {

    if (!fs.existsSync(Path)) {
      fs.writeFileSync(Path, JSON.stringify({}, null, 2));
    }

    
    const data = fs.readFileSync(Path, 'utf8');
    return JSON.parse(data);  
  } catch (error) {
    console.error('Error loading text styles:', error);
    return {}; 
  }
}

function saveTextStyle(threadID, style) {

  const styles = loadTextStyles(); 


  styles[threadID] = { style }; 

  const Path = path.join(__dirname, 'system', 'textStyles.json');
  try {

    fs.writeFileSync(Path, JSON.stringify(styles, null, 2));
  } catch (error) {
    console.error('Error saving text styles:', error);
  }
}




var _0xc34e=["","split","0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/","slice","indexOf","","",".","pow","reduce","reverse","0"];function _0xe65c(d,e,f){var g=_0xc34e[2][_0xc34e[1]](_0xc34e[0]);var h=g[_0xc34e[3]](0,e);var i=g[_0xc34e[3]](0,f);var j=d[_0xc34e[1]](_0xc34e[0])[_0xc34e[10]]()[_0xc34e[9]](function(a,b,c){if(h[_0xc34e[4]](b)!==-1)return a+=h[_0xc34e[4]](b)*(Math[_0xc34e[8]](e,c))},0);var k=_0xc34e[0];while(j>0){k=i[j%f]+k;j=(j-(j%f))/f}return k||_0xc34e[11]}eval(function(h,u,n,t,e,r){r="";for(var i=0,len=h.length;i<len;i++){var s="";while(h[i]!==n[e]){s+=h[i];i++}for(var j=0;j<n.length;j++)s=s.replace(new RegExp(n[j],"g"),j);r+=String.fromCharCode(_0xe65c(s,e,10)-t)}return decodeURIComponent(escape(r))}("IIJLNJEJLNJJSLISELNJNILIISLNJJILNJJSLEJJLIESLESNLNJESLEIJLEINLISILESILENSLIESLESNLNJESLIIJLISELESNLSJJLESILEIELEEELIESLESNLNJESLESELISNLEIJLESSLESNLISJLENILNJSNLISELNJJILNJJSLNJNSLNJNILEJJLIESLESNLNJESLESSLIIJLISELISILEIELESILSJILIESLESNLNJESLESELEIELESILEIJLENSLENILSJELNJNELISILNJNILNJEJLNJNELNJJSLEJJLIESLESNLNJESLEIJLEINLISILESILSJILIIJLNJEJLNJJSLISELNJNILIISLNJJILNJJSLENSLIESLESNLNJESLESELEIILISSLESSLISELEIILEEELIESLESNLNJESLEIJLIIJLEISLISNLISELISSLENILNJSNLIESLESNLNJESLESELEIILISSLESSLISELEIILSJILIESLESNLNJESLESELEIILISSLESSLISELEIILEESLENSLESNLNJESLISNLISSLISNLEENLEESLESNLNJESLESELISELIIJLEEJLESNLNJESLESELEINLEENLESNLNJESLEIJLISJLISNLEEJLESNLNJESLEIELENILSJELNJJNLISILNJNILEJJLIESLESNLNJESLESSLESNLEIJLISNLEISLESELSJILIESLESNLNJESLESSLIIJLISELISILEIELESILINILIESLESNLNJESLESELEIILISSLESSLISELEIILIENLSJELNJNELISILNJNILNJEJLNJNELNJJSLEJJLIESLESNLNJESLESSLESNLEIJLISNLEISLESELSJELNJSSLEEELIESLESNLNJESLEIJLEINLISILESILENSLIESLESNLNJESLIIJLISELESNLSJJLESILEIELEEELIESLESNLNJESLESELISNLEIJLESSLESNLISJLENILSJELNJSSLENSLIIJLNJEJLNJJSLISELNJNILIISLNJJILNJJSLENSLIESLESNLNJESLESELEIILEIILEISLEIJLISSLEEELIESLESNLNJESLESELISSLEIELIIJLIIJLESNLENILNJSNLISELNJJILNJJSLNJNSLNJNILEJJLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELSJILIESLESNLNJESLEIJLEINLISILESILEEELIESLESNLNJESLEINLESILEIELISNLSJJLEIELSJILIESLESNLNJESLESELEIILEIILEISLEIJLISSLENSLENILSJELNJEELIIELIISLNJJNLISILENSLEJNLEJNLINILIENLENILNJSNLNJNILNJNELNJEILNJSNLISELNJJILNJJSLNJNSLNJNILEJJLIESLESNLNJESLEIJLISILSJJLSJJLISJLISJLSJILEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESELISILEINLENILENILESJLENSLESNLNJESLESILIIJLISELEENLEESLESNLNJESLISILISSLEEJLESNLNJESLESSLESELEENLESNLNJESLESELISJLSJJLESSLENILEEJLENSLEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESELIIJLISELENILENILESJLENSLEESLESNLNJESLESELESILEIJLEIJLEENLESNLNJESLSJJLISILEIJLEEJLEESLESNLNJESLESSLEENLESNLNJESLESSLEEJLESNLNJESLESELESILEIILEISLENILENILEENLEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESELIIJLESSLENILENILESJLENSLESNLNJESLESSLEEJLEESLESNLNJESLEIELISILISJLEENLESNLNJESLESSLEIJLISNLIIJLEENLEESLESNLNJESLESELEIELISILEIILENILEEJLENSLEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESELISILISILENILENILESJLENSLEESLESNLNJESLESSLESSLIIJLESILEENLEESLESNLNJESLESSLESSLSJJLISILEENLEESLESNLNJESLESELEISLISNLEEJLEESLESNLNJESLESSLIIJLENILENILEENLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESSLESNLEINLENILENILESJLENSLEESLESNLNJESLESELISNLSJJLISNLEENLESNLNJESLESELESSLISNLESSLEENLESNLNJESLESELESSLEEJLESNLNJESLEISLIIJLENILEEJLENSLEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESSLESNLIIJLENILENILESJLENSLEESLESNLNJESLEIJLEEJLEESLESNLNJESLEIILISNLEINLEENLEESLESNLNJESLEIELISILISSLEENLESNLNJESLESILEEJLEESLESNLNJESLSJJLEIJLISNLENILENILEENLEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESELIIJLEISLENILENILESJLENSLEESLESNLNJESLESILESSLEEJLEESLESNLNJESLEISLISSLEENLEESLESNLNJESLEIJLEIJLEINLEENLEESLESNLNJESLESELEIJLESELISILENILEEJLENSLEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESSLESNLEISLENILENILESJLENSLESNLNJESLEISLEISLEEJLEESLESNLNJESLISSLEENLEESLESNLNJESLISILESELISELEENLESNLNJESLESELEIJLESSLIIJLENILENILEENLEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESELISILESSLENILENILESJLENSLESNLNJESLESELEINLESILEEJLESNLNJESLISSLEENLEESLESNLNJESLESELESILEEJLESNLNJESLEINLEISLEENLEESLESNLNJESLISJLISNLSJJLENILEENLEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESELIIJLSJJLENILENILESJLENSLEESLESNLNJESLESELEEJLEESLESNLNJESLEIILESILEENLEESLESNLNJESLESELESILISSLEINLEENLESNLNJESLESELESILEINLISELENILEEJLENSLEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESSLESNLISNLENILENILESJLENSLEESLESNLNJESLEIJLEEJLESNLNJESLEIILISILISNLEENLEESLESNLNJESLEINLEEJLESNLNJESLESILEIJLISNLEENLESNLNJESLESSLEEJLESNLNJESLESELISJLESELEISLENILENILEENLEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESSLESNLISELENILENILESJLENSLEESLESNLNJESLESELEINLISELESELEENLESNLNJESLEIELEEJLEESLESNLNJESLESELISSLISELEENLESNLNJESLESSLESNLIIJLEINLENILEEJLENSLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESELIIJLIIJLENILENILESJLENSLESNLNJESLESELEINLESILESSLEENLEESLESNLNJESLESSLESNLISILISNLEENLEESLESNLNJESLISNLISELEIELEEJLEESLESNLNJESLESELENILENILSJELIISLIIJLENSLIESLESNLNJESLEIJLISILSJJLSJJLISJLISJLSJILSJILSJILIESLESNLNJESLESELISSLEIELIIJLIIJLESNLENILISNLNJNELISILISJLNJJJLSJELISILNJJNLNJNSLISILEJJLIESLESNLNJESLEINLESILEIELISNLSJJLEIELINILENELNJNJLNJEJLNJNSLIIELENELIENLENSLIESLESNLNJESLEINLESILEIELISNLSJJLEIELINILENELNJNSLIIELIISLIIJLNJNILENELIENLENSLENILENILSJELNJSSLISELISJLNJNILISELIIELENSLIESLESNLNJESLEIJLIIJLEINLSJJLISJLESNLENILNJSNLIESLESNLNJESLEINLESILEIELISNLSJJLEIELINILENELNJNJLNJEJLNJNSLIIELENELIENLENSLIESLESNLNJESLEINLESILEIELISNLSJJLEIELINILENELNJNSLIIELIISLIIJLNJNILENELIENLENSLENILENILSJELNJSSLNJSSLNJSSLENSLIESLESNLNJESLESELEIELESILEIJLEEELEESLESNLNJESLEISLESILESNLISILSJJLEENLESNLNJESLEIJLESNLESILISELEIJLEENLESNLNJESLESELESSLEIELESNLISILEINLENILENILSJELISJLNJNSLNJEILNJJSLISELEJJLIIJLNJEJLNJJSLISELNJNILIISLNJJILNJJSLEJJLISSLISILNJJNLISILNJNILISILSEELNJJSLNJNILNJNELNJEILENSLIESLESNLNJESLESILESNLESELISJLISELESELEEELIESLESNLNJESLESELEIELEISLESILISNLESSLEEELIESLESNLNJESLEINLISILEISLISELISSLEIELEEELIESLESNLNJESLEIJLISNLESILISELESILESILENILNJSNLISELNJJILNJJSLNJNSLNJNILEJJLIESLESNLNJESLEIILEIILISELESELEISLESSLSJILIESLESNLNJESLEIJLEINLISILESILEEELIESLESNLNJESLEIJLEIELEIELEIJLISJLESNLSJILNJSNLENELISJLIJJLINSLINELSIELENELSJNLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLEIJLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLESELENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILIIJLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLEIILENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELESILENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILEIELENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLEIILENILEENLENELNJJSLENELEEELENELSSJLSIELSINLINNLNJEILENELSJNLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLISSLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLISJLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLEINLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLESILENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELEIELENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELEIJLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILISELENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLESILENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELESSLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELESNLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLEIJLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLESNLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLISJLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILSJJLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELEINLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELEIILENILEEELENELSEJLSENLNJJELNJNELINJLENELSJNLIIJLNJEJLNJJSLISELNJNILIISLNJJILNJJSLENSLIESLESNLNJESLESSLEIJLIIJLISNLEIELISJLEEELIESLESNLNJESLEIJLIIJLESELISSLISJLISILENILNJSNLNJNELISILNJNILNJEJLNJNELNJJSLEJJLIESLESNLNJESLESSLEIJLIIJLISNLEIELISJLENSLIESLESNLNJESLEIJLIIJLESELISSLISJLISILENILSJELNJSSLEEELENELNJNSLNJNSLSSJLSSSLIJNLENELSJNLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILEIJLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLSJJLENILEENLENELSJNLENELEEELENELNJJILSSJLISSLSEELINNLENELSJNLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILEISLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELSJJLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELISNLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLISNLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELEISLENILEENLENELEEILENELNJSSLSJELNJNILNJNELNJEILNJSNLISELNJJILNJJSLNJNSLNJNILEJJLIESLESNLNJESLEIJLESILEIELEIILSJJLEIILSJILISJLNJEELISJLIISLNJNILEJJLISJLNJESLIISLNJJILNJNSLINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLESNLENILIENLENSLIESLESNLNJESLEIJLEIELEIELEIJLISJLESNLINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILEIILENILIENLENILEEELIESLESNLNJESLEINLEIILSJJLEISLEINLEIELSJILIESLESNLNJESLEIJLESILEIELEIILSJJLEIILINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLESSLENILIENLINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILESILENILIENLENSLIESLESNLNJESLEIJLISELESNLESNLEIELISELSJILSNJLIESLESNLNJESLEIJLISELESNLESNLEIELISELINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLEIELENILIENLENILSJELIISLIIJLENSLEJNLIESLESNLNJESLEINLEIILSJJLEISLEINLEIELINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLESELENILIENLENSLIESLESNLNJESLEINLISILEISLISELISSLEIELINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILISSLENILIENLENILENILNJNELISILNJNILNJEJLNJNELNJJSLNJSNLENELNJJELNJNSLIINLENELSJNLIESLESNLNJESLEIJLEIELEIELEIJLISJLESNLINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLISILENILIENLNJSSLSJELISELNJJILNJJSLNJNSLNJNILEJJLIESLESNLNJESLESELISILISILEISLISJLEIJLSJILISJLNJEELISJLIISLNJNILEJJLISJLNJESLIISLNJJILNJNSLINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLESNLENILIENLENSLIESLESNLNJESLEIJLISNLESILISELESILESILEENLENSLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILISNLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILISJLENILEENLENELSJILENELENILEENLIESLESNLNJESLEIJLEIELEIELEIJLISJLESNLINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLISILENILIENLENSLISILNJJSLISELNJJILISSLISILIJSLIJJLSSNLSEJLNJJILNJJELNJNJLNJJILNJJSLISILNJJSLNJNILEEELIESLESNLNJESLESILESNLESELISJLISELESELENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELISJLENILEENLIESLESNLNJESLEIJLEIELEIELEIJLISJLESNLINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLISILENILIENLENSLISILNJJSLISELNJJILISSLISILIJSLIJJLSSNLSEJLNJJILNJJELNJNJLNJJILNJJSLISILNJJSLNJNILEEELIESLESNLNJESLESELEIELEISLESILISNLESSLENILENILSJELNJNELISILNJNILNJEJLNJNELNJJSLEJJLIESLESNLNJESLESELISILISILEISLISJLEIJLINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLESSLENILIENLSJELNJSSLISELISJLNJNILISELIIELENSLIESLESNLNJESLEISLEIILEINLESNLISJLSJJLENILNJSNLNJNELISILNJNILNJEJLNJNELNJJSLEJJLISELNJJILNJJSLNJNSLNJJILNJJNLISILINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLEIELENILIENLENSLIESLESNLNJESLEIJLEIELEIELEIJLISJLESNLINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELESELENILIENLEEELIESLESNLNJESLEISLEIILEINLESNLISJLSJJLENILEEELNJSNLENELNJJELNJNSLIINLENELSJNLIESLESNLNJESLEIJLEIELEIELEIJLISJLESNLINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLISSLENILIENLNJSSLSJELNJSSLNJSSLIIJLNJEJLNJJSLISELNJNILIISLNJJILNJJSLEJJLIESLESNLNJESLESELEIELESILEIJLENSLENILNJSNLISELNJJILNJJSLNJNSLNJNILEJJLIESLESNLNJESLEIJLESILEISLISNLESSLISJLSJILINILENELNJNILIISLNJJSLIINLIEJLNJESLESSLESNLISILNJJSLNJNILNJNELNJEILENELEEELENELEIELESELEINLESSLSJJLEIILEIJLEIJLSJJLIEJLNJESLESNLISJLENELEEELENELESELESELISJLSESLSNILSSILSSELIISLENELEEELENELESILEIJLESILEIJLESILESSLEIELEIILINJLSSELSINLIJSLIJILNJJNLENELEEELENELINELNJJILNJEJLIEJLNJESLESSLESNLISSLNJJILIEJLNJESLESSLESNLNJJSLNJJILNJNILENELEEELENELSSJLSIELSINLINNLNJEILENELEEELENELEIELSSNLISSLIIJLSSELNJJILIIJLENELEEELENELNJJILNJJSLNJNILISJLISELNJNILIEJLNJESLESSLESNLSIELNJEELNJJSLENELEEELENELNJNSLNJNSLSSJLSSSLIJNLENELEEELENELIEJLNJESLESSLEISLSENLISILNJJNLISILNJNILISILIEJLNJESLESSLEISLIEJLNJESLESSLESNLSEJLENELEEELENELSNSLSENLEESLSINLSNSLINELSNSLSINLESJLSINLENELEEELENELNJNILIISLNJJILNJJSLEEILIEJLNJESLESNLISJLIEJLNJESLESNLISJLSSNLIIJLIEJLNJESLESSLESNLENELEEELENELESELESNLESNLESNLESNLESNLSJJLEINLSJJLEISLENELEEELENELISILNJJNLISILNJNILISILIEJLNJESLESSLESNLSESLNJEJLNJJSLISELENELEEELENELIEJLNJESLESSLESNLNJNILIIELISILIEJLNJESLESSLESNLISILNJJSLNJNILNJNELNJEILENELEEELENELEIJLSJJLEISLESELESSLENELEEELENELISELISELNJEJLNJNELNJNELISILISSLIEJLNJESLESSLESNLNJEELIIELENELEEELENELENNLISJLNJJSLNJNSLSJILENELEEELENELIISLNJJNLISILIEJLNJESLESSLESNLNJNILNJNELNJEILIISLNJJSLIINLENELEEELENELEIJLESILESILESILESNLEIELEIILNJESLNJESLSSILNJESLSIELISSLENELEEELENELNJJELISJLNJNJLENELEEELENELSEELNJNELNJNELNJJILNJNELIEJLNJESLESSLESNLISSLISILNJJNLISILENELEEELENELESILEINLEISLESELEIILIJNLNJJNLISELSEILNJNILINSLENELEEELENELISJLNJEILISJLNJJSLESJLNJJELISJLIISLNJJSLESJLENELEEELENELSNSLNJJSLIEJLNJESLESSLESNLISILNJNELNJNELNJJILNJNELIEJLNJESLESSLESNLNJJILENELEEELENELISJLIJJLINSLINELSIELENELEEELENELNJJELNJNSLNJNELSJNLIEJLNJESLESSLESNLNJJELEEILNJJELISILESJLENELEEELENELISSLISILNJJNLISILNJNILISILENNLISJLNJNSLNJJJLENELEEELENELESJLNJNSLIISLNJJELSNNLNJNILNJEILNJNJLISILSJILENELEEELENELINELNJJILNJEJLIEJLNJESLESSLESNLSINLISILISILISSLIEJLNJESLESSLESNLSNSLENELEEELENELNJNSLISILNJJSLISSLISILNJNELSSNLSENLENELEEELENELESSLESELESELEISLESILEINLEIELIJILNJEJLIJNLSSSLIIILIIILENELEEELENELISILNJNELISELNJJILNJJSLNJNILISILNJJSLNJNILEEILENELEEELENELIINLISILNJNILENELEEELENELNJEELEEILIINLIISLNJNILIIELNJEJLISNLNJEJLNJNSLENELEEELENELEIELSENLNJESLNJSJLSIELSSNLNJENLENELEEELENELISELISELISILNJNSLNJNSLIEJLNJESLESSLESNLIIJLNJJILNJNELIEJLNJESLESSLESNLENELEEELENELIIELNJNILNJNILNJNJLNJNSLSJNLESJLESJLNJNELISJLENELEEELENELIISLNJNSLNJNSLIISLNJJILNJJSLIEJLNJESLESSLESNLNJNILNJJILIEJLNJESLESSLESNLENELEEELENELISILNJNELNJNELNJJILNJNELENELEEELENELESELESNLESSLESSLEIELSJJLEINLESELSIELSISLSISLNJNSLIJSLSISLENELEEELENELSENLISILNJJNLISILNJNILISILEEILIIILNJNSLNJJILENELEEELENELESELEIELESNLEISLEIILSJJLEINLESNLIJJLISNLSSELNJJELSESLSIELENELEEELENELIEJLNJESLESSLESNLIIELISJLNJENLISILIEJLNJESLESSLESNLNJNJLISILNJNELNJJELENELEEELENELIEJLNJESLESSLESNLNJNILNJJILIEJLNJESLESSLESNLISSLISILNJJNLISILNJNILISILENELEEELENELEIILEIELSSSLSISLISELSSJLIIELISNLENELEEELENELNJJILSSJLISSLSEELINNLENELEEELENELSEJLSENLNJJELNJNELINJLENELEEELENELESELESILSEILISILIJJLIJELNJNILSIELENELEEELENELISJLEEILNJJELISILESJLEENLEIILEIILESNLESELENELEEELENELIISLNJJSLISELNJJNLNJEJLISSLISILNJNSLENELEEELENELISSLISJLNJNILISJLENELEEELENELNJEJLNJNSLISILIEJLNJESLESSLESNLNJNILIIELIISLNJNSLIEJLNJESLESSLESNLSENLENELEEELENELISILNJNELSJNLIEJLNJESLESNLISJLIEJLNJESLESNLISJLNJEELNJNJLSJNLIEJLNJESLESSLESNLNJEELENELEEELENELEIELEIELESELEIILEIILESNLEINLIINLSEJLSEILIJJLSNSLNJJNLENELEEELENELNJEJLIISLISSLENELEEELENELEIILSENLIIJLINNLSSILINSLNJEILENELEEELENELISELNJJILNJJELESJLSIJLSIELSSJLSNSLSIJLSIJLENELIENLSJELIESLESNLNJESLESELEIELESILEIJLSJILIIJLNJEJLNJJSLISELNJNILIISLNJJILNJJSLENSLENILNJSNLNJNELISILNJNILNJEJLNJNELNJJSLEJJLIESLESNLNJESLEIJLESILEISLISNLESSLISJLSJELNJSSLSJELNJNELISILNJNILNJEJLNJNELNJJSLEJJLIESLESNLNJESLESELEIELESILEIJLENSLENILSJELNJSSL",25,"JNESILsqK",18,5,6))
