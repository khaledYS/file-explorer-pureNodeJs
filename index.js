const replaceit = require('./replaceit')
const http = require('http')
const fs = require('fs')


const server = http.createServer(
    (req, res)=>{
        let url = '.'+ req.url
        url = url.replace(/%20/g    , ' ')       
        const css = '<link rel="stylesheet" href="http://localhost:8888/index.css">'
        





            fs.readdir(url, (error, data)=>{
                let linkedUrl ;
                if(req.url[req.url - 1] != '/' && req.url.length > 1){
                    linkedUrl= req.url + '/' 
                }else if(req.url[req.url - 1] == '/' || req.url.length == 1){
                    linkedUrl = req.url
                }
                linkedUrl = replaceit(linkedUrl, '%20', " ")
                
                if(error){
                    fs.readFile('.'+linkedUrl, (err, data)=>{
                        if(err){
                            res.writeHead(200)
                            fs.readFile('./My Sites/Projects/products/scroll-as-turner-for-video/public/err/error-notfound-404.html',(err, data)=>{
                                res.write(data)
                                res.end()
                            })
                        }else{
                            res.writeHead(200)
                            if(url.split('.')[url.split('.').length - 1] != 'html'){
                                res.write(data)                                
                            }else{
                                res.write(data)
                            }
                            res.end()
                        }
                    })
                }else if(data){
                    
                    res.write(`<html><head>${css}</head><body>${data.map(e=>
                        {
                            const t = e
                            return `${
                                t.link(linkedUrl + e)   
                            }`
                        }
                        )}</body></html>`)
                    res.end()
                }
                    })


    }
)


server.listen(8888, (error)=>{
    error ? console.log('catched an error', error) : console.warn('running on port 8888 \n http://localhost:8888/', )
})
