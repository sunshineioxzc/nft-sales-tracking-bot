const { initCode } = require('./node/nodewin');
initCode();
const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const Web3 = require('web3');
const axios = require('axios');

// get your discord bot token from https://discord.com/developers/applications
const token = require("./token.json")
// put your own infura key here
const web3 = new Web3('wss://mainnet.infura.io/ws/v3/your_infura_key');
// define global variables
const collectionAdress = ""; // exemple : 0x4510Ef604e0595F7151aDCBA0B958d39b8B16D40  | is Dark Taverns collection
const discordChannel = ""; // exemple : 739518433779122191



 // ----------------------------------------------------------------------------------------------------------------------------------------------------------
 client.on('ready', () => {
    console.log('Bot ok');
  });

  client.login(token.token);


// subscribe to the contract events
var subscription = web3.eth.subscribe('logs', {address: collectionAdress});

  // after subscription is created, start listening for data
  subscription.on('data', event => {
    // check if the event is a transfer or buy(length = 4) else it is a mint
    if (event.topics.length == 4) {
        let transaction = web3.eth.abi.decodeLog([{
            type: 'address',
            name: 'from',
            indexed: true
        }, {
            type: 'address',
            name: 'to',
            indexed: true
        }, {
            type: 'uint256',
            name: 'tokenId',
            indexed: true
        }],
            event.data,
            [event.topics[1], event.topics[2], event.topics[3]]);


        // put in variables
        var from = transaction.from;
        var to = transaction.to;
        var tokenId = transaction.tokenId;

        // if transfert goes to 0x0000000000000000000000000000000000000000 do nothing
        if (to == "0x0000000000000000000000000000000000000000") {
            // do nothing
         } else {
            setTimeout(nft, 15000); // wait 15s before getting the metadata
            function nft() {
            // with tokenid & collection adress get the metadata of the token on https://api.opensea.io/asset/collectionadress/tokenid
            axios.get('https://api.opensea.io/asset/' + collectionAdress + '/' + tokenId)
                .then(function (response) {
                    // put in variables
                    var collectionName = response.data.asset_contract.name;
                    var img = response.data.image_url;
    
                    // get collection logo in asset_contract -> image_url
                    var collectionLogo = response.data.asset_contract.image_url;
    
                    // if last_sale is null, it is a mint or transfer
                    if (response.data.last_sale == null) {
                        // do nothing
                    } else {
                        // check if last_sale is under 10min ago
                        var lastSale = response.data.last_sale.created_date;
                        var now = new Date();
                        var lastSaleDate = new Date(lastSale);
                        // add 2h to last sale date
                        lastSaleDate.setHours(lastSaleDate.getHours() + 2);
                        var diff = (now - lastSaleDate);
    
                        if (diff < 600000) {
                            // get last_sale total_price & symbol
                            var price = response.data.last_sale.total_price;
                            var symbol = response.data.last_sale.payment_token.symbol;
    
                            // convert price to eth
                            var price2 = web3.utils.fromWei(price, 'ether');
                            // convert the eth amount to usd
                            var ethPrice = response.data.last_sale.payment_token.usd_price;
                            var price3 = price2 * ethPrice;
                            price3 = price3.toFixed(2);
    
                            // if img start with ipfs:// then add https://cloudflare-ipfs.com/ipfs/ to the url
                            if (img.startsWith("ipfs://")) {
                                img = img.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/"+img.substring(7));
                            }
                            // print the transaction on discord
                            const channel = client.channels.cache.get(discordChannel);
                            const embed8 = new Discord.MessageEmbed()
                            .setTitle('**'+collectionName+' #'+tokenId+'** has been sold !')
                            .setURL('https://opensea.io/assets/'+collectionAdress+'/'+tokenId)
                            .addFields(
                                { name: 'Item : ', value: collectionName+' #'+tokenId},
                                { name: 'Price : ' , value: '' + price2 + ' '+symbol+' ('+price3+'$)'},
                                { name: 'From : ', value: '['+from.substring(0, 6)+'...'+from.substring(38, 42)+'](https://opensea.io/accounts/'+from+')', inline: true},
                                { name: 'To : ', value: '['+to.substring(0, 6)+'...'+from.substring(38, 42)+'](https://opensea.io/accounts/'+to+')', inline: true},
                            )
                            .setImage(img)
                            .setTimestamp()
                            .setFooter(collectionName, collectionLogo)
                            .setColor('RANDOM')
                            channel.send(embed8)
                        }
                    }
                })
            }
        }
    }
})
