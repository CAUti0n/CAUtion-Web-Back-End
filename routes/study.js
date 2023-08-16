var express = require('express');
var router = express.Router();
//var path = require('path');

const config = require('../config/key')
const Client = require("@notionhq/client").Client;
const NOTION_API_KEY = config.NOTION_API_KEY
const DB_ID = config.activity_DB_ID

const notion = new Client({ auth: NOTION_API_KEY })

const getNotionAPI = async() => {
    const notionData = await notion.databases.query({
        database_id: DB_ID,
        filter: {
          property: "Category",
          select: {
            equals: "스터디",
          },
        },
      });
    
      const studyAPI = notionData.results.map((study) => {
        return {
          mento: study.properties.Manager.rich_text[0].plain_text,
          title: study.properties.Name.title[0].plain_text,
          image: study.properties.Image.files[0].file.url,
          startDate: study.properties.Date.date.start,
          endDate: study.properties.Date.date.end,
          url: study.public_url,
        };
      });
    
    return studyAPI

}


router.get('/', async(req, res) => {
    //res.send("study page")

    const studyData = await getNotionAPI();
    res.send(studyData);
    console.log(studyData);

});

module.exports = router;

