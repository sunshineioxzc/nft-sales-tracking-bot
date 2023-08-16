# Automated NFT Sales Tracking Bot 🤖

This is a Discord bot designed to track NFT sales in various platforms like Opensea, Magic Eden, Gem, etc. It's an open-source project built on Node.js which enables you to display an embed on your Discord server every time there is a purchase on your desired collection. 

The bot functions automatically, and all you need to do is create a Discord bot and get an Infura API key. It is currently working for ERC721 collections. 

__Example:__

![image](https://media.discordapp.net/attachments/854840063988203570/1023270706089308170/sale1.png)
![image](https://media.discordapp.net/attachments/854840063988203570/1023312319536697465/sale3.png)

__Tutorial:__

Watch the following tutorial video to get started: 

https://www.youtube.com/watch?v=TvMOD3AKkXo&ab_channel=Nitr0z

---

### (Server 🎛️) Node Installation on Ubuntu 

You can easily install Node.js and npm using apt install by running the following commands:

```
sudo apt install nodejs
sudo apt install npm
```

### (Server 🎛️) Yarn Installation

After installing Node.js, install yarn using the following command:

```
npm install -g yarn
```

---

## (Server & Localhost 💻) Project Installation

Clone the repository, navigate to the project directory and install all dependencies using yarn: 

```
git clone https://github.com/Nitr0z/nft-tracker-bot
cd nft-tracker-bot
yarn install
```

## (Server 🎛️ & Localhost 💻) Edit Your Settings

Edit your information in token.js and index.js file:

- Discord token 
- Infura API key (choose "Web3 API")
- Collection Address
- Discord Channel

```
token.js (https://discord.com/developers/applications)
API Infura (https://infura.io/create-project)
CollectionAddress
DiscordChannel
```

## (Server 🎛️) Install PM2 to Launch the Bot

Install PM2 using npm to launch the bot: 

```
sudo npm install pm2 -g
pm2 start index.js
```

## (Localhost 💻) Launch the Bot

Use the following command to launch the bot on your localhost:

```
node index.js
```

---
