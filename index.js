require("dotenv").config()
const express = require("express")
const path = require('path')
const { EmbedBuilder, WebhookClient } = require('discord.js');

const webhookClient = new WebhookClient({ url: process.env.DISCORD_WEBHOOK });
const app = express()
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.post('/api/post', (req, res) => {
    const embed = new EmbedBuilder()
        .addFields({name:"Lời nhắn đến từ: "+req.body.name,value:req.body.message })
        .setTimestamp()
        .setColor(0x00FFFF);
    
        webhookClient.send({
            username: '#sentona',
            avatarURL: 'https://i.pinimg.com/564x/f9/d1/0b/f9d10ba4c472d11c2506dfc4a6e895ed.jpg',
            embeds: [embed],
        });
    console.log(req.body)
})

app.listen(process.env.PORT||3000)