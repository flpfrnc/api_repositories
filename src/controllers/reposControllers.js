const axios = require("axios");
const endpoints_list = require("../models/endpoints.json")
const url = "https://api.github.com/orgs/takenet/repos"



const home = async (req, res) => {
    // res came from a static file only to act as a shortcut to the actual EPs
    res.status(200).send(endpoints_list)
};


const getAllRepos = async (req, res) => {
    try {
        if(url) {
            let requestedRepos = await axios.get(url);

            res.status(200).send(requestedRepos.data)
        }
    }catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}


const getBlipReposByLang = async (req, res) => {

    // setting up a check once C# can only be passed as params as %23
    let language = req.params["language"] === "CS" ? "C#" : req.params["language"]

    // limit was passed as query parameter once not required
    let limit = req.query.limit;
    
    try {
        if(url) {
            let requestedRepos = await axios.get(url);
            let filteredRepos = requestedRepos.data.filter((repo, idx) => 
            (
                limit
                ? 
                    repo.language === language && idx < limit 
                : 
                    repo.language === language
            ))

            res.status(200).send(filteredRepos)
        }
    }catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}


const getOldestCSRepos = async (req, res) => {
    let customResponse = {}

    try {
        if(url) {
            let requestedRepos = await axios.get(url);
            
            requestedRepos.data.filter((repo) => {
                let responseSize = Object.keys(customResponse).length
                
                if (repo.language === "C#" && responseSize < 5) {
                    customResponse[`repository${responseSize + 1}`] = repo 
                }
            })
            
            res.status(200).send(customResponse)
        }
    }catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}

module.exports = { home, getBlipReposByLang, getAllRepos, getLastCSRepos }
