var express = require('express');
var router = express.Router();
//var path = require('path');

const config = require('../config/key')
const Client = require("@notionhq/client").Client;
const NOTION_API_KEY = config.NOTION_API_KEY
const DB_ID = config.manager_DB_ID

const notion = new Client({ auth: NOTION_API_KEY })

const getNotionAPI = async() => {
  const ManagementData = await notion.databases.query({ database_id: DB_ID,
    filter: {
      property: "management",
      select:{
        is_not_empty: true,
      }
    }
  
  })

  const ManagerAPI = ManagementData.results.map((manager) => {
    return {
      year: manager.properties.year.select.name,
      grade: manager.properties.grade.select.name,
      title: manager.properties.name.title[0].plain_text,
      manage: manager.properties.management.select.name,
    };
  });


  return ManagerAPI

}


router.get('/', async(req, res) => {
  res.send("management page")

  const managementData = await getNotionAPI();
  console.log(managementData)

});

module.exports = router;

